/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/upload/route.ts
import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { connection, dbConnect, dbDisconnect } from "@/config/dbConnect";
import { User } from "@/lib/schemas/UserSchema";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Handle POST requests
export async function PATCH(req: Request) {
  try {
    if (!connection.isConnected) {
      await dbConnect();
    }
    // Extract the email and profilePicture from the request body
    const { email, profilePicture } = await req.json();

    if (!email || !profilePicture) {
      return NextResponse.json(
        { error: "Invalid request data" },
        { status: 400 },
      );
    }

    // Upload the image to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(profilePicture, {
      upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET, // Replace with your preset
    });

    if (uploadResponse.secure_url && connection.isConnected) {
      // Find the user by email and update the image field
      const updatedUser = await User.findOneAndUpdate(
        { email },
        { profilePicture: uploadResponse.secure_url }, // Update the image field
        { new: true }, // Return the updated document
      );

      if (!updatedUser) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }

      return NextResponse.json(
        {
          user: updatedUser,
          imageUrl: uploadResponse.secure_url, // Include the secure URL in the response object
        },
        { status: 200 }, // Set the status in the options parameter
      );
    }

    return NextResponse.json(
      { error: "Failed to upload image" },
      { status: 500 },
    );
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    return NextResponse.json(
      { error: "Failed to upload image" },
      { status: 500 },
    );
  } finally {
    dbDisconnect();
  }
}
