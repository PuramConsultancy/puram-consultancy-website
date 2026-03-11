import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getAuthUser } from "@/app/api/helpers/getAuthUser";
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
    const validated = CreateSectionSchema.parse(body);
    const section = await prisma.formSection.create({
      data: { formId, title: validated.title, order: validated.order },
    });
    return NextResponse.json({ success: true, data: section }, { status: 201 });
  } catch (error) {
    console.error("POST /sections error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create section" },
      { status: 500 },
    );
  }
}

export async function GET(
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
    const sections = await prisma.formSection.findMany({
      where: { formId },
      orderBy: { order: "asc" },
      include: {
        questions: { orderBy: { order: "asc" }, include: { options: true } },
      },
    });
    return NextResponse.json({ success: true, data: sections });
  } catch (error) {
    console.error("GET /sections error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch sections" },
      { status: 500 },
    );
  }
}
