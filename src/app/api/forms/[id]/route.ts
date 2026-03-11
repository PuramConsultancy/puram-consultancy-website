import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import handleError from "../../helpers/handleError";
import { getAuthUser } from "../../helpers/getAuthUser";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const form = await prisma.form.findUnique({
      where: { id },
      include: {
        sections: {
          orderBy: { order: "asc" },
          include: {
            questions: {
              orderBy: { order: "asc" },
              include: { options: true },
            },
          },
        },
      },
    });

    if (!form) {
      return NextResponse.json(
        { success: false, message: "Form not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, data: form });
  } catch (error) {
    return handleError(error, "Failed to fetch form");
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const user = getAuthUser(request);
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    const { id } = await params;
    const body = await request.json();

    const form = await prisma.form.update({
      where: { id },
      data: {
        title: body.title,
        description: body.description,
      },
    });

    return NextResponse.json({ success: true, data: form });
  } catch (error) {
    return handleError(error, "Failed to update form");
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const user = getAuthUser(request);
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    const { id } = await params;

    await prisma.form.delete({ where: { id } });

    return NextResponse.json({ success: true, message: "Form deleted" });
  } catch (error) {
    return handleError(error, "Failed to delete form");
  }
}
