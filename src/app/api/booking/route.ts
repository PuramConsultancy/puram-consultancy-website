import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import handleError from "../helpers/handleError";
import { BookingContactSchema } from "@/schemas/contact.schema";

/**
 * @route   POST /api/contact
 * @desc    Create contact / booking enquiry submission
 * @access  Public
 */

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = BookingContactSchema.parse(body);

    const {
      firstName,
      lastName,
      phone,
      message,
      serviceName,
      appointmentDate,
    } = validatedData;

    const notes = JSON.stringify({
      firstName,
      lastName,
      phone,
      message,
      serviceName,
    });

    const booking = await prisma.booking.create({
      data: {
        notes,
        appointmentDate: appointmentDate ? new Date(appointmentDate) : null,
        status: "PENDING",
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Booking created successfully",
        data: { booking },
      },
      { status: 201 },
    );
  } catch (error) {
    return handleError(error, "Failed to create booking");
  }
}

export async function GET() {
  try {
    const bookings = await prisma.booking.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, data: bookings });
  } catch (error) {
    return handleError(error, "Failed to fetch bookings");
  }
}
