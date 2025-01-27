import { dbConnect, dbDisconnect } from "@/config/dbConnect";
import { User } from "@/lib/schemas/UserSchema";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    if (req.method !== "GET") {
      throw new Error("Invalid request method");
    }

    // Extract query parameters
    const url = new URL(req.url);
    const email = url.searchParams.get("email");

    if (!email) {
      return NextResponse.json(
        { error: "Email query parameter is required" },
        { status: 400 },
      );
    }

    await dbConnect();

    const user = await User.findOne({ email });

    // Return the response with the user data
    return NextResponse.json(user);
  } catch (err: unknown) {
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    } else {
      return NextResponse.json(
        { error: "An unknown error occurred" },
        { status: 500 },
      );
    }
  } finally {
    await dbDisconnect();
  }
}

export async function PATCH(req: NextRequest) {
  try {
    await dbConnect();

    const data = await req.json();
    const { email, ...updateFields } = data;

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const updatedUser = await User.findOneAndUpdate(
      { email },
      { $set: updateFields },
      { new: true }, // Return the updated document
    );

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }


    return NextResponse.json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    } else {
      return NextResponse.json(
        { error: "An unknown error occurred" },
        { status: 500 },
      );
    }
  } finally {
    await dbDisconnect();
  }
}
