import { NextRequest, NextResponse } from "next/server";
import Reservation from "@/lib/schemas/ReservationSchema";
import { dbConnect, dbDisconnect } from "@/config/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "@/config/authOptions";
import Space from "@/lib/schemas/SpaceSchema";
import { User } from "@/lib/schemas/UserSchema";
import { sendOrderConfirmationEmail } from "@/nodemailer/email";

// Helper function to check session and role
async function checkSession() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return {
      error: NextResponse.json(
        { error: "Login to continue booking" },
        { status: 401 },
      ),
    };
  }

  const user = session?.user;

  if (!user._id) {
    return {
      error: NextResponse.json(
        { error: "Unauthorized - Invalid user data" },
        { status: 401 },
      ),
    };
  }

  return { session, userId: user._id };
}

// const userId = "67861a7ecabc687bdebca6ab";
// POST: Create a new reservation
export async function POST(req: NextRequest) {
  try {
    const sessionCheck = await checkSession();
    if (sessionCheck.error) {
      return sessionCheck.error;
    }

    const { userId } = sessionCheck;

    await dbConnect();
    const { space, startDate, endDate, duration, guests, amount } =
      await req.json();

    if (!space || !startDate || !endDate || !duration || !amount) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 },
      );
    }

    const newReservation = await Reservation.create({
      user: userId,
      space,
      startDate,
      endDate,
      duration,
      guests,
      amount,
    });

    // Update user's reservations array
    await User.findByIdAndUpdate(
      userId,
      { $push: { reservations: newReservation._id } },
      { new: true },
    );

    return NextResponse.json(newReservation, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 },
    );
  } finally {
    await dbDisconnect();
  }
}
// PATCH: Update a reservation
export async function PATCH(req: NextRequest) {
  try {
    const sessionCheck = await checkSession();
    if (sessionCheck.error) {
      return sessionCheck.error;
    }

    const { userId } = sessionCheck;

    await dbConnect();
    const { id, ...updateFields } = await req.json();

    console.log("id:", id, updateFields);

    if (!id) {
      return NextResponse.json(
        { error: "Reservation ID is required" },
        { status: 400 },
      );
    }

    const updatedReservation = await Reservation.findOneAndUpdate(
      { _id: id, user: userId },
      { $set: updateFields },
      { new: true },
    );

    // Fetch user details and send email
    const user = await User.findById(userId);
    if (user && user?.email) {
      sendOrderConfirmationEmail(
        user?.firstName,
        user?.email,
        updatedReservation._id,
        updatedReservation.space,
        updatedReservation.amount,
        updatedReservation.startDate,
      );
    }

    if (!updatedReservation) {
      return NextResponse.json(
        { error: "Reservation not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(updatedReservation);
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 },
    );
  } finally {
    await dbDisconnect();
  }
}

// GET: Fetch reservations (single or list)
export async function GET(req: NextRequest) {
  try {
    const sessionCheck = await checkSession();
    if (sessionCheck.error) {
      return sessionCheck.error;
    }

    const { userId } = sessionCheck;

    await dbConnect();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const status = searchParams.get("status");

    if (id) {
      const reservation = await Reservation.findOne({
        _id: id,
        user: userId,
      }).populate({
        path: "space",
        model: Space,
      });

      if (!reservation) {
        return NextResponse.json(
          { error: "Reservation not found" },
          { status: 404 },
        );
      }

      return NextResponse.json(reservation);
    }

    const reservations = await Reservation.find({
      user: userId,
      ...(status && { status }),
    }).populate({
      path: "space",
      model: Space, // Explicitly specify the model
    });

    return NextResponse.json(reservations);
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 },
    );
  } finally {
    await dbDisconnect();
  }
}

// DELETE: Delete a reservation
export async function DELETE(req: NextRequest) {
  try {
    const sessionCheck = await checkSession();
    if (sessionCheck.error) {
      return sessionCheck.error;
    }

    const { userId } = sessionCheck;
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { error: "Reservation ID is required" },
        { status: 400 },
      );
    }

    const deletedReservation = await Reservation.findOneAndDelete({
      _id: id,
      user: userId,
    });

    if (!deletedReservation) {
      return NextResponse.json(
        { error: "Reservation not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ message: "Reservation deleted successfully" });
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 },
    );
  } finally {
    await dbDisconnect();
  }
}
