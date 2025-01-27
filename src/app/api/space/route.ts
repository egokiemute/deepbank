import { NextRequest, NextResponse } from "next/server";
import Space from "@/lib/schemas/SpaceSchema";
import { dbConnect, dbDisconnect } from "@/config/dbConnect";
import { User } from "@/lib/schemas/UserSchema";
import { getServerSession } from "next-auth";
import { authOptions } from "@/config/authOptions";

// Helper function to check session and role
async function checkSession() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return {
      error: NextResponse.json(
        { error: "Unauthorized - No session found" },
        { status: 401 },
      ),
    };
  }

  // Type assertion for TypeScript
  const user = session?.user;

  if (!user._id) {
    return {
      error: NextResponse.json(
        { error: "Unauthorized - Invalid user data" },
        { status: 401 },
      ),
    };
  }

  if (user.role && !["host", "admin"].includes(user.role)) {
    return {
      error: NextResponse.json(
        { error: "Unauthorized - Insufficient permissions" },
        { status: 401 },
      ),
    };
    // console.log(user.role);
  }

  return { session, userId: user._id, role: user.role };
}

// const userId = "67861a7ecabc687bdebca6ab";

// POST: Create a new space
export async function POST(req: NextRequest) {
  try {
    // Check session and get userId
    const sessionCheck = await checkSession();
    if (sessionCheck.error) {
      return sessionCheck.error;
    }

    const { userId } = sessionCheck;

    // Connect to database
    await dbConnect();

    // Parse request body
    const { name } = await req.json();

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    // Create new space
    const newSpace = await Space.create({
      name,
      createdBy: userId,
    });

    // Update user's spaces array
    await User.findByIdAndUpdate(
      userId,
      { $push: { spaces: newSpace._id } },
      { new: true },
    );

    return NextResponse.json(newSpace, { status: 201 });
  } catch (error) {
    console.error("Error creating space:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  } finally {
    await dbDisconnect();
  }
}
// PATCH: Update a space by ID or slug
export async function PATCH(req: NextRequest) {
  try {
    // Check session and get userId
    const sessionCheck = await checkSession();
    if (sessionCheck.error) {
      return sessionCheck.error;
    }

    // const { userId } = sessionCheck;

    await dbConnect();
    const data = await req.json();
    const { id, slug, ...updateFields } = data;

    if (!id && !slug) {
      return NextResponse.json(
        { error: "ID or slug is required" },
        { status: 400 },
      );
    }

    const updatedSpace = await Space.findOneAndUpdate(
      id ? { _id: id } : { slug },
      { $set: updateFields },
      { new: true },
    );

    if (!updatedSpace) {
      return NextResponse.json({ error: "Space not found" }, { status: 404 });
    }

    return NextResponse.json(updatedSpace);
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 },
    );
  } finally {
    await dbDisconnect();
  }
}

// GET: Get a space by slug or ID, or all spaces if no ID or slug is provided
export async function GET(req: NextRequest) {
  try {
    const sessionCheck = await checkSession();
    if (sessionCheck.error) {
      return sessionCheck.error;
    }
    const { userId } = sessionCheck;

    // console.log("session out", role);
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const slug = searchParams.get("slug");

    if (!id && !slug) {
      const spaces = await Space.find({
        createdBy: userId,
        // createdBy: "6784e5756b6c0a7ccfc22e20",
      });
      return NextResponse.json(spaces);
    }

    const space = await Space.findOne(id ? { _id: id } : { slug });

    if (!space) {
      return NextResponse.json({ error: "Space not found" }, { status: 404 });
    }

    return NextResponse.json(space);
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 },
    );
  } finally {
    await dbDisconnect();
  }
}
// DELETE: Delete a space by ID or slug// DELETE: Delete a space by ID or slug
export async function DELETE(req: NextRequest) {
  const sessionCheck = await checkSession();
  if (sessionCheck.error) {
    return sessionCheck.error;
  }

  const { userId } = sessionCheck;

  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const slug = searchParams.get("slug");

    if (!id && !slug) {
      return NextResponse.json(
        { error: "ID or slug is required" },
        { status: 400 },
      );
    }

    // Step 1: Delete the space from the database
    // const deletedSpace = await Space.findOne(
    //   id ? { _id: id } : { slug },
    // );
    const deletedSpace = await Space.findOneAndDelete(
      id ? { _id: id } : { slug },
    );

    if (!deletedSpace) {
      return NextResponse.json({ error: "Space not found" }, { status: 404 });
    }

    // Step 2: Remove the space ID from the user's spaces array
    await User.updateOne(
      { _id: userId },
      { $pull: { spaces: deletedSpace._id } }, // Assuming the spaces array contains space IDs
    );

    return NextResponse.json({ message: "Space deleted successfully" });
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 },
    );
  } finally {
    await dbDisconnect();
  }
}
