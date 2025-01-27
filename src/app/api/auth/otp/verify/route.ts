import { dbConnect, dbDisconnect } from "@/config/dbConnect";
import Otp from "@/lib/schemas/OtpSchema";// Assuming you have a User schema
import { User } from "@/lib/schemas/UserSchema";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  await dbConnect(); // Ensure database connection
  try {
    const data = await req.json();

    if (!data.email || !data.otp) {
      return NextResponse.json({ message: "Bad Request" }, { status: 400 });
    }

    // Retrieve the OTP from MongoDB
    const storedData = await Otp.findOne({ email: data.email });

    // Check if OTP exists and verify it
    if (!storedData || Date.now() > storedData.expires) {
      return NextResponse.json(
        { message: "OTP has expired or does not exist" },
        { status: 400 },
      );
    }

    if (data.otp !== storedData.otp) {
      return NextResponse.json({ message: "Invalid OTP" }, { status: 400 });
    }

    // OTP is valid; clear it from the database if desired
    await Otp.deleteOne({ email: data.email }); // Remove the OTP after successful verification

    // Update the user's isVerified field to true
    const updatedUser = await User.findOneAndUpdate(
      { email: data.email },
      { isVerified: true },
      { new: true }, // Return the updated user
    );

    if (!updatedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Return the verified user
    return NextResponse.json(
      { message: "OTP verified successfully", user: updatedUser },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 400 },
    );
  } finally {
    await dbDisconnect();
  }
};
