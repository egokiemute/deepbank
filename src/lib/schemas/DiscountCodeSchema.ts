import mongoose, { model, models, Schema } from "mongoose";

const DiscountCodeSchema = new Schema({
    code: {
      type: String,
      required: true,
      unique: true,
    },
    discountAmount: {
      type: Number,
      required: true,
    },
    limit: Number,
    uses: {
      type: Number,
      default: 0,
    },
    discountType: {
      type: String,
      enum: ["percentage", "fixed"],
      required: true,
    },
    images: [
      {
        url: String,
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
    allSpaces: {
      type: Boolean,
      default: false,
    },
    spaces: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Space",
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  });
  

// Model Export
const DiscountCode =
  models.DiscountCode || model("DiscountCode", DiscountCodeSchema);

export default DiscountCode;
