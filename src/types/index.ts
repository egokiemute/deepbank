import mongoose, { Document, ObjectId, Types } from "mongoose";

export type statusEnum = "pending" | "active" | "deactivated" | "suspended";

export type reservationStatusEnum =
  | "awaiting payment"
  | "confirmed"
  | "cancelled";

interface IUser extends Document {
  firstname?: string;
  lastname?: string;
  email: string;
  companyEmail?: string;
  password?: string;
  phone?: string;
  google?: boolean; // Added for Google authentication
  nin?: string;
  isNinVerified?: boolean;
  skillSet?: string;
  isVerified?: boolean;
  profilePicture?: string;
  bio?: string;
  redirectUrl?: string;
  reservations?: ObjectId[]; // Array of references to Reservation objects
  role?: "user" | "admin" | "host" | ""; // Restrict to specific roles
  createdAt?: Date; // Timestamps added by Mongoose
  updatedAt?: Date; // Timestamps added by Mongoose
}

export default IUser;

export interface IDuration {
  price: number;
  description: string;
  days: number;
}

export interface ISpace extends Document {
  // space?: string; // ObjectId reference as a string
  _id: string;
  name: string;
  slug: string;
  description?: string;
  city?: string;
  state?: string;
  street?: string;
  capacity?: number;
  amenities?: Array<
    | "wifi"
    | "ac"
    | "fans"
    | "projector"
    | "printer"
    | "cafe"
    | "parking"
    | "whiteboard"
    | "power backup"
    | "smart tv"
    | "locker storage"
    | "screen"
    | "kitchen"
  >;
  categories?: Array<
    | "studios"
    | "bars"
    | "galleries"
    | "restaurants"
    | "warehouses"
    | "halls"
    | "coworking"
    | "conference"
  >;
  price?: number;
  discount?: number;
  duration?: {
    daily?: IDuration;
    weekly?: IDuration;
    monthly?: IDuration;
  };
  images?: { url: string }[];
  // status?: Array<"pending" | "active" | "deactivated" | "suspended">;
  status?: statusEnum;
  seoTitle?: string;
  seoDescription?: string;
  seoSlug?: string;
  seoPrice?: number;
  user_id?: string;
  views?: number;
  category?: string;
  subCategory?: ICategory[];
  createdBy: mongoose.Schema.Types.ObjectId; // Reference to User
  createdAt: Date;
  updatedAt: Date;
}

export interface IReservation extends Document {
  space: Types.ObjectId; // Reference to the "Space" model
  user: Types.ObjectId; // Reference to the "User" model
  startDate: Date;
  endDate: Date;
  duration: string;
  guests: number;
  amount: number;
  status: reservationStatusEnum;
  referenceNumber?: string;
  transactionId?: string;
  createdAt: Date;
  updatedAt: Date;
  expires?: Date; // Optional field for expiration
}

export interface ICategory {
  name?: string;
  description?: string;
  slug?: string;
  image?: string;
  status?: string;
  totalSpaces?: number;
  user_id?: string;
  subCategories?: string[];
}

export interface MailOptions {
  from: string;
  to: string;
  subject: string;
  text?: string;
  html?: string;
}
export interface ILogin {
  email: string;
  password: string;
}

export interface IOtp extends Document {
  email: string;
  otp: string;
  expires?: number; // Timestamp for expiration
}
