import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getAuthUser } from "@/app/api/helpers/getAuthUser";

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
    console.error("GET /api/forms/[id] error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch form" },
      { status: 500 },
    );
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
    const { title, description } = await request.json();
    const form = await prisma.form.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(description !== undefined && { description }),
      },
    });
    return NextResponse.json({ success: true, data: form });
  } catch (error) {
    console.error("PATCH /api/forms/[id] error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update form" },
      { status: 500 },
    );
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
    const { id: formId } = await params;

    const sections = await prisma.formSection.findMany({
      where: { formId },
      select: { id: true },
    });
    const sectionIds = sections.map((s) => s.id);

    if (sectionIds.length > 0) {
      const questions = await prisma.question.findMany({
        where: { sectionId: { in: sectionIds } },
        select: { id: true },
      });
      const questionIds = questions.map((q) => q.id);
      if (questionIds.length > 0) {
        await prisma.option.deleteMany({
          where: { questionId: { in: questionIds } },
        });
      }
      await prisma.question.deleteMany({
        where: { sectionId: { in: sectionIds } },
      });
      await prisma.formSection.deleteMany({ where: { formId } });
    }

    await prisma.form.delete({ where: { id: formId } });
    return NextResponse.json({ success: true, message: "Form deleted" });
  } catch (error) {
    console.error("DELETE /api/forms/[id] error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete form" },
      { status: 500 },
    );
  }
}
