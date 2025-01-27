import mongoose, { model, models, Schema } from "mongoose";

const ReservationSchema = new Schema({
  space: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Space",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  discountCode: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "DiscountCode", // Link to DiscountCode model
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  guests: {
    type: Number,
    required: true,
    default: 1,
  },
  amount: {
    type: Number,
    required: true,
  },
  discountedAmount: {
    type: Number, // Calculated after applying the discount
  },
  status: {
    type: String,
    enum: ["awaiting payment", "confirmed", "active", "cancelled", "completed"],
    default: "awaiting payment",
  },
  referenceNumber: {
    type: String,
  },
  transactionId: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  expires: {
    type: Date,
  },
});

// Pre-save middleware to calculate discounted amount
ReservationSchema.pre("save", async function (next) {
  if (this.isModified("discountCode") || this.isNew) {
    if (this.discountCode) {
      const DiscountCode = mongoose.models.DiscountCode;
      const discount = await DiscountCode.findById(this.discountCode);

      if (discount && discount.isActive) {
        const { discountType, discountAmount, uses, limit } = discount;

        // Check if the discount has a usage limit
        if (limit && uses >= limit) {
          throw new Error("This discount code has reached its usage limit.");
        }

        // Apply discount based on type
        if (discountType.includes("percentage")) {
          this.discountedAmount = this.amount - (this.amount * discountAmount) / 100;
        } else if (discountType.includes("fixed")) {
          this.discountedAmount = Math.max(this.amount - discountAmount, 0);
        }

        // Increment the usage count for the discount
        discount.uses += 1;
        await discount.save();
      } else {
        this.discountedAmount = this.amount; // No valid discount applied
      }
    } else {
      this.discountedAmount = this.amount; // No discount applied
    }
  }

  next();
});

// Set the `expires` field to 10 minutes after `createdAt`
ReservationSchema.pre("save", function (next) {
  if (!this.expires || this.isNew) {
    this.expires = new Date(this.createdAt.getTime() + 60 * 60 * 1000); // Add 1 hour
  }
  next();
});

// Add middleware to update expires if status changes to confirmed
ReservationSchema.pre("save", function (next) {
  if (this.isModified("status") && this.status !== "awaiting payment") {
    this.expires = new Date(Date.now() + 1000 * 365 * 24 * 60 * 60 * 1000); // Far in the future
  }
  next();
});

// TTL index to automatically delete expired reservations
ReservationSchema.index({ expires: 1 }, { expireAfterSeconds: 0 });

// Ensure updatedAt is modified on update
ReservationSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

// Update status based on date
ReservationSchema.pre("save", function (next) {
  const currentDate = new Date();
  const currentDay = currentDate.toDateString();
  const startDay = this.startDate.toDateString();
  const endDay = this.endDate.toDateString();

  if (
    currentDay >= startDay &&
    currentDay <= endDay &&
    !["cancelled", "awaiting payment"].includes(this.status)
  ) {
    this.status = "active";
  } else if (currentDay > endDay) {
    this.status = "completed";
  }

  next();
});

const Reservation =
  models.Reservation || model("Reservation", ReservationSchema);

export default Reservation;
