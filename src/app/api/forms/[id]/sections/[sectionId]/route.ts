import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getAuthUser } from "@/app/api/helpers/getAuthUser";

export async function PATCH(
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
    const { title, order } = await request.json();
    const section = await prisma.formSection.update({
      where: { id: sectionId },
      data: {
        ...(title !== undefined && { title }),
        ...(order !== undefined && { order }),
      },
    });
    return NextResponse.json({ success: true, data: section });
  } catch (error) {
    console.error("PATCH /sections/[sectionId] error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update section" },
      { status: 500 },
    );
  }
}

export async function DELETE(
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
      select: { id: true },
    });
    const questionIds = questions.map((q) => q.id);

    if (questionIds.length > 0) {
      await prisma.option.deleteMany({
        where: { questionId: { in: questionIds } },
      });
    }
    await prisma.question.deleteMany({ where: { sectionId } });
    await prisma.formSection.delete({ where: { id: sectionId } });

    return NextResponse.json({ success: true, message: "Section deleted" });
  } catch (error) {
    console.error("DELETE /sections/[sectionId] error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete section" },
      { status: 500 },
    );
  }
}
