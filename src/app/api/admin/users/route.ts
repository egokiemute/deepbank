import { dbConnect, dbDisconnect } from "@/config/dbConnect";
import { User } from "@/lib/schemas/UserSchema";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/config/authOptions";

// GET user by email
export async function GET(req: NextRequest) {
  try {
    if (req.method !== "GET") {
      throw new Error("Invalid request method");
    }

    // Get session and check if the user is an admin
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json(
        { error: "Access denied. Admins only." },
        { status: 403 },
      );
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


// DELETE user by email
export async function DELETE(req: NextRequest) {
  try {
    if (req.method !== "DELETE") {
      throw new Error("Invalid request method");
    }

    // Get session and check if the user is an admin
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json(
        { error: "Access denied. Admins only." },
        { status: 403 },
      );
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

    // Find and delete the user by email
    const deletedUser = await User.findOneAndDelete({ email });
    
    if (!deletedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    
    return NextResponse.json({
      message: "User deleted successfully",
      user: deletedUser,
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

// // PATCH user by email
// export async function PATCH(req: NextRequest) {
//   try {
//     // Get session and check if the user is an admin
//     const session = await getServerSession(authOptions);
//     if (!session || session.user.role !== "admin") {
//       return NextResponse.json(
//         { error: "Access denied. Admins only." },
//         { status: 403 },
//       );
//     }

//     await dbConnect();

//     const data = await req.json();
//     const { email, ...updateFields } = data;

//     if (!email) {
//       return NextResponse.json({ error: "Email is required" }, { status: 400 });
//     }

//     const updatedUser = await User.findOneAndUpdate(
//       { email },
//       { $set: updateFields },
//       { new: true }, // Return the updated document
//     );

//     if (!updatedUser) {
//       return NextResponse.json({ error: "User not found" }, { status: 404 });
//     }

//     return NextResponse.json({
//       message: "User updated successfully",
//       user: updatedUser,
//     });
//   } catch (err: unknown) {
//     if (err instanceof Error) {
//       return NextResponse.json({ error: err.message }, { status: 500 });
//     } else {
//       return NextResponse.json(
//         { error: "An unknown error occurred" },
//         { status: 500 },
//       );
//     }
//   } finally {
//     await dbDisconnect();
//   }
// }
