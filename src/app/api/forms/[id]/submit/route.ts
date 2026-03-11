import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import handleError from "../../../helpers/handleError";
import { SubmitFormSchema } from "@/schemas/form.schemas";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id: formId } = await params;
    const body = await request.json();
    const { userId, data } = SubmitFormSchema.parse(body);

    const submission = await prisma.submission.create({
      data: {
        formId,
        userId: userId ?? null,
        data,
      },
    });

    return NextResponse.json({
      success: true,
      data: submission,
      message: "Form submitted successfully",
    });
  } catch (error) {
    return handleError(error, "Failed to submit form");
  }
}
