import crypto from "crypto";
import { sendPasswordResetEmail } from "@/nodemailer/email";
import { NextResponse } from "next/server";
import { dbConnect } from "@/config/dbConnect";
import { User } from "@/lib/schemas/UserSchema";

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    await dbConnect();

    const { email } = body;
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return new NextResponse(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000; // 1 hour

    existingUser.resetPasswordToken = resetToken;
    existingUser.resetPasswordTokenExpiresAt = resetTokenExpiresAt;

    await existingUser.save();

    // Send email
    await sendPasswordResetEmail(
      existingUser.email,
      `${process.env.NEXT_PUBLIC_SERVER_URL}/reset-password?email=${email}`,
    );

    return new NextResponse(
      JSON.stringify({ message: "Reset password link sent to your email" }),
      { status: 200 },
    );
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return new NextResponse(
      "Error sending reset password link: " + errorMessage,
      {
        status: 500,
      },
    );
  } finally {
    await dbConnect();
  }
};
