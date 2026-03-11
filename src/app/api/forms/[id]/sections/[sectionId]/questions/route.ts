import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getAuthUser } from "@/app/api/helpers/getAuthUser";
import { CreateQuestionSchema } from "@/schemas/form.schemas";
import { Prisma } from "@prisma/client";

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
          ? {
              create: validated.options.map((o) => ({
                label: o.label,
                value: o.value,
              })),
            }
          : undefined,
      },
      include: { options: true },
    });

    return NextResponse.json(
      { success: true, data: question },
      { status: 201 },
    );
  } catch (error) {
    console.error("POST /questions error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create question" },
      { status: 500 },
    );
  }
}

export async function GET(
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
    const questions = await prisma.question.findMany({
      where: { sectionId },
      orderBy: { order: "asc" },
      include: { options: true },
    });
    return NextResponse.json({ success: true, data: questions });
  } catch (error) {
    console.error("GET /questions error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch questions" },
      { status: 500 },
    );
  }
}
