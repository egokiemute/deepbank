import { NextRequest, NextResponse } from "next/server";
import { dbConnect, dbDisconnect } from "@/config/dbConnect";
import Otp from "@/lib/schemas/OtpSchema";
import { sendVerificationEmail } from "@/nodemailer/email";
import { verificationToken } from "@/utils/Helpers";

export const POST = async (req: NextRequest) => {
  await dbConnect(); // Ensure database connection

  const data = await req.json();

  if (!data.email) {
    return NextResponse.json({ message: "Bad Request" }, { status: 400 });
  }

  const expires = Date.now() + 300000; // OTP expires in 5 minutes

  const otp = verificationToken; // Generate the OTP token

  try {
    const updatedOtp = await Otp.findOneAndUpdate(
      { email: data.email },
      { otp, expires },
      { upsert: true, new: true, setDefaultsOnInsert: true }, // Insert if not exists and return the new document with defaults
    );

    if (!updatedOtp) {
      await Otp.create({ email: data.email, otp, expires });
    }

    sendVerificationEmail(data.email);

    return NextResponse.json(
      { message: "OTP sent successfully" },
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
