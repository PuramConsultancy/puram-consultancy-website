import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import handleError from "../../../helpers/handleError";
import { getAuthUser } from "../../../helpers/getAuthUser";
import { CreateSectionSchema } from "@/schemas/form.schemas";

export async function POST(
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

    const { id: formId } = await params;
    const body = await request.json();
    const { title, order } = CreateSectionSchema.parse(body);

    const section = await prisma.formSection.create({
      data: { formId, title, order },
      include: { questions: true },
    });

    return NextResponse.json({ success: true, data: section });
  } catch (error) {
    return handleError(error, "Failed to create section");
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id: formId } = await params;

    const sections = await prisma.formSection.findMany({
      where: { formId },
      orderBy: { order: "asc" },
      include: {
        questions: {
          orderBy: { order: "asc" },
          include: { options: true },
        },
      },
    });

    return NextResponse.json({ success: true, data: sections });
  } catch (error) {
    return handleError(error, "Failed to fetch sections");
  }
}
