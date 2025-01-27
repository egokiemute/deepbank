/* eslint-disable @typescript-eslint/no-explicit-any */
import { dbConnect, dbDisconnect } from "@/config/dbConnect";
import Otp from "@/lib/schemas/OtpSchema";
import { User } from "@/lib/schemas/UserSchema";
import { loginValidationSchema } from "@/lib/validations/userValidations";
import { sendVerificationEmail } from "@/nodemailer/email";
import { verificationToken } from "@/utils/Helpers";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    if (req.method !== "POST") {
      throw new Error("Invalid request method");
    }

    await dbConnect();

    // Get the user data from the request body
    const body = await req.json();

    // Validate the request body
    try {
      await loginValidationSchema.validate(body, { abortEarly: false });
    } catch (error: any) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 },
      );
    }

    const { email, password } = body;

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "Email is already registered" },
        { status: 400 },
      );
    }

    // Hash the password before saving the user
    const hashedPassword = await hash(password, 12);

    // Create the new user in the database
    const newUser = await User.create({
      email,
      password: hashedPassword, // Store the hashed password
    });

    if (newUser) {
      const expires = Date.now() + 300000; // OTP expires in 5 minutes

      const otp = verificationToken; // Generate the OTP token

      const updatedOtp = await Otp.findOneAndUpdate(
        { email },
        { otp, expires },
        { upsert: true, new: true, setDefaultsOnInsert: true }, // Insert if not exists and return the new document with defaults
      );

      if (!updatedOtp) {
        await Otp.create({ email, otp, expires });
      }
      sendVerificationEmail(email);
    }

    // Return the response with the created user data (excluding the password)
    return NextResponse.json({
      message: "Otp sent successfully",
      user: newUser,
    });
  } catch (err: unknown) {
    // Check if the error is an instance of Error and handle it accordingly
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    } else {
      // Fallback for unknown errors
      return NextResponse.json(
        { error: "An unknown error occurred" },
        { status: 500 },
      );
    }
  } finally {
    // Ensure disconnection happens after the response or error
    await dbDisconnect();
  }
}