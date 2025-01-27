/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { dbConnect, dbDisconnect } from "@/config/dbConnect";
import bcrypt from "bcryptjs";
import { User } from "@/lib/schemas/UserSchema";
import { loginValidationSchema } from "@/lib/validations/userValidations";

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    await dbConnect();

    const {  password, cPassword, email } = body;

 try {
      await loginValidationSchema.validate({email, password}, { abortEarly: false });
    } catch (error: any) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 },
      );
    }



    if (password !== cPassword) {
      return new NextResponse(
        JSON.stringify({ error: "Passwords do not match" }),
        { status: 400 },
      );
    }

    const user = await User.findOne({ email });

    if (!user) {
      return new NextResponse(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });
    }

    if (
      !user.resetPasswordToken ||
      !user.resetPasswordTokenExpiresAt ||
      user.resetPasswordTokenExpiresAt < Date.now()
    ) {
      return new NextResponse(
        JSON.stringify({ error: "Reset token is invalid or has expired" }),
        { status: 400 },
      );
    }


    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpiresAt = undefined;

    await user.save();

    return new NextResponse(
      JSON.stringify({ message: "Password has been reset successfully" }),
      { status: 200 },
    );
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error : "Unknown error";
    return new NextResponse("Error resetting password: " + errorMessage, {
      status: 500,
    });
  } finally{
    dbDisconnect()
  }
};
