import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { SubmitFormSchema } from "@/schemas/form.schemas";
import { Prisma } from "@prisma/client";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id: formId } = await params;
    const body = await request.json();
    const validated = SubmitFormSchema.parse(body);
    const submission = await prisma.submission.create({
      data: {
        formId,
        userId: validated.userId ?? null,
        data: validated.data as Prisma.InputJsonValue,
      },
    });
    return NextResponse.json(
      { success: true, data: submission },
      { status: 201 },
    );
  } catch (error) {
    console.error("POST /submit error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to submit form" },
      { status: 500 },
    );
  }
}
