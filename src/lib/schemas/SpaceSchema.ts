import mongoose, { model, models, Schema } from "mongoose";
import slugify from "slugify";

const operatingHoursSchema = new Schema({
  day: {
    type: String,
    required: true,
  },
  open: {
    type: String,
    required: true,
  },
  close: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["Open", "Closed"],
  },
});

const spaceSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    unique: true,
  },
  description: String,
  city: String,
  state: String,
  street: String,
  capacity: {
    type: Number,
    default: 0,
  },
  amenities: [
    {
      type: String,
      enum: [
        "wifi",
        "ac",
        "fans",
        "projector",
        "printer",
        "cafe",
        "parking",
        "whiteboard",
        "power backup",
        "smart tv",
        "locker storage",
        "screen",
        "kitchen",
        "chill room",
      ],
    },
  ],
  categories: [
    {
      type: String,
      enum: [
        "studios",
        "bars",
        "galleries",
        "restaurants",
        "warehouses",
        "halls",
        "coworking",
        "conference",
      ],
    },
  ],
  price: {
    type: Number,
    default: 0,
  },
  discount: {
    type: Number,
    default: 0,
  },
  duration: {
    daily: { price: Number, description: String, days: Number },
    weekly: { price: Number, description: String, days: Number },
    monthly: { price: Number, description: String, days: Number },
  },
  images: [
    {
      url: {
        type: String,
        required: true,
      },
    },
  ],
  status: {
    type: String,
    enum: ["pending", "active", "deactivated", "suspended"],
    default: "pending",
  },
  views: {
    type: Number,
    default: 0,
  },
  category: String,
  subCategory: [String],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  discountCodes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DiscountCode",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  operatingHours: [operatingHoursSchema],
});

// Pre-save middleware to generate a unique slug
spaceSchema.pre("save", async function (next) {
  if (this.isModified("name") || this.isNew) {
    let slug = slugify(this.name, { lower: true, strict: true });
    const existingSpace = await mongoose.models.Space.findOne({ slug });

    if (existingSpace) {
      slug = `${slug}-${Date.now()}`;
    }

    this.slug = slug;
  }
  next();
});

// Model Export
const Space = models.Space || model("Space", spaceSchema);

export default Space;
