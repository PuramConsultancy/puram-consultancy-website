// app/api/forms/[id]/submissions/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id: formId } = await params;

    const form = await prisma.form.findUnique({
      where: { id: formId },
      select: {
        id: true,
        title: true,
        sections: {
          select: {
            questions: {
              select: {
                id: true,
                label: true,
                type: true,
              },
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

    const submissions = await prisma.submission.findMany({
      where: { formId },
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      data: { form, submissions },
    });
  } catch (error) {
    console.error("GET /api/forms/[id]/submissions error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch submissions" },
      { status: 500 },
    );
  }
}
