// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from "next-auth";
// next-auth.d.ts
import "next-auth";
declare module "next-auth" {
  interface User {
    _id: string;
    firstname?: string;
    lastname?: string;
    email: string;
    companyEmail?: string;
    phone?: string;
    password?: string;
    google?: boolean; // Added for Google authentication
    nin?: string;
    skillSet?: string;
    isNinVerified?: boolean;
    isVerified?: boolean;
    profilePicture?: string;
    bio?: string;
    redirectUrl?: string;
    reservations?: string[]; // Array of references to Reservation objects
    role?: "user" | "admin" | "host" | ""; // Restrict to specific roles
    createdAt?: Date; // Timestamps added by Mongoose
    updatedAt?: Date; // Timestamps added by Mongoose
    redirectUrl?: string; // Added for redirecting after login
  }
  
  interface Session {
    user: User;
  }

  interface JWT {
    _id: string;
    firstname?: string;
    lastname?: string;
    email: string;
    companyEmail?: string;
    phone?: string;
    password?: string;
    google?: string; // Added for Google authentication
    nin?: string;
    skillSet?: string;
    isNinVerified?: boolean;
    isVerified?: boolean;
    profilePicture?: string;
    bio?: string;
    reservations?: string[]; // Array of references to Reservation objects
    role?: string;
    createdAt?: Date; // Timestamps added by Mongoose
    updatedAt?: Date; // Timestamps added by Mongoose
    redirectUrl?: string; // Added for redirecting after login
  }
}
