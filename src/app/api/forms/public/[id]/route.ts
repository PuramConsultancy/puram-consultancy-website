import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// ✅ No auth — public visitors can view form structure to fill it out
export async function GET(
  _request: NextRequest,
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
    console.error("GET /api/forms/public/[id] error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch form" },
      { status: 500 },
    );
  }
}
