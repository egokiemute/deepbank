/* eslint-disable @typescript-eslint/no-explicit-any */
import IUser from "@/types";
import mongoose, { Schema } from "mongoose";

// User Schema
const userSchema: Schema = new Schema(
  {
    firstname: {
      type: String,
    },
    lastname: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: function (this: any) {
        return !this.google;
      },
    },
    position: {
      type: String,
      required: function (this: any) {
        return this.role === "host";
      },
    },
    companyEmail: {
      type: String,
      required: function (this: any) {
        return this.role === "host";
      },
    },
    phone: {
      type: String,
    },
    google: {
      type: Boolean,
      required: true,
      default: false,
    },
    nin: {
      type: String,
    },
    isNinVerified: {
      type: Boolean,
      default: false,
    },
    skillSet: {
      type: String,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
    },
    reservations: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Space",
      },
    ],
    spaces: [
      {
        required: function (this: any) {
          return this.role === "host";
        },
        type: mongoose.Schema.Types.ObjectId,
        ref: "Space",
      },
    ],
    role: {
      type: String,
      enum: ["user", "admin", "host", ""],
      default: "",
    },
    resetPasswordToken: {
      type: String,
    },
    resetPasswordTokenExpiresAt: {
      type: Date,
    },
  },
  { timestamps: true }, // Automatically manage createdAt and updatedAt
);

// Prevent model overwrite in development environments
const User = mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export { User };
