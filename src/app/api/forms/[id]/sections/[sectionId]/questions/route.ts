import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import handleError from "../../../../../helpers/handleError";
import { getAuthUser } from "../../../../../helpers/getAuthUser";
import { Prisma } from "@prisma/client";
import { CreateQuestionSchema } from "@/schemas/form.schemas";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; sectionId: string }> },
) {
  try {
    const user = getAuthUser(request);
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    const { sectionId } = await params;
    const body = await request.json();
    const validated = CreateQuestionSchema.parse(body);

    const question = await prisma.question.create({
      data: {
        sectionId,
        label: validated.label,
        type: validated.type,
        required: validated.required,
        order: validated.order,
        validationRules: validated.validationRules
          ? (validated.validationRules as Prisma.InputJsonValue)
          : null,
        visibilityRules: validated.visibilityRules
          ? (validated.visibilityRules as Prisma.InputJsonValue)
          : null,
        options: validated.options?.length
          ? { create: validated.options }
          : undefined,
      },
      include: { options: true },
    });

    return NextResponse.json({ success: true, data: question });
  } catch (error) {
    return handleError(error, "Failed to create question");
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; sectionId: string }> },
) {
  try {
    const { sectionId } = await params;

    const questions = await prisma.question.findMany({
      where: { sectionId },
      orderBy: { order: "asc" },
      include: { options: true },
    });

    return NextResponse.json({ success: true, data: questions });
  } catch (error) {
    return handleError(error, "Failed to fetch questions");
  }
}
