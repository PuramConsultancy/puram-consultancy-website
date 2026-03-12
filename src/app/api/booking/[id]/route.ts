import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import handleError from "../../helpers/handleError";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const { status } = await request.json();

    const booking = await prisma.booking.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json({ success: true, data: booking });
  } catch (error) {
    return handleError(error, "Failed to update booking status");
  }
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    await prisma.booking.delete({ where: { id } });

    return NextResponse.json({ success: true, message: "Booking deleted" });
  } catch (error) {
    return handleError(error, "Failed to delete booking");
  }
}
