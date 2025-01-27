import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

interface JwtPayload {
  userId: string;
}

export const generateTokenAndSetCookie = (userId: string): NextResponse => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in the environment variables");
  }

  const token = jwt.sign({ userId } as JwtPayload, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  const response = new NextResponse(
    JSON.stringify({ success: true, message: "Token generated" }),
    { status: 200 }
  );

  response.cookies.set({
    name: "token",
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "development",
    sameSite: "lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
  });
 console.log("response", response);
  return response;
};
