// app/api/projects/[id]/inquiries/route.ts
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import handleError from "../../../helpers/handleError";
import privateRoute from "../../../helpers/privateRoute";
import { ProjectInquirySchema } from "@/schemas/project.schema";
import { UserRole } from "@prisma/client";

type RouteContext = { params: Promise<{ id: string }> };

// POST /api/projects/[id]/inquiries — public: submit inquiry
export async function POST(request: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params;

    const project = await prisma.project.findUnique({
      where: { id, published: true },
    });

    if (!project) {
      return NextResponse.json(
        { success: false, error: { message: "Project not found" } },
        { status: 404 },
      );
    }

    const body = await request.json();
    const data = ProjectInquirySchema.parse(body);

    const inquiry = await prisma.projectInquiry.create({
      data: { ...data, projectId: id },
    });

    return NextResponse.json({ success: true, data: inquiry }, { status: 201 });
  } catch (error) {
    return handleError(error, "Failed to submit inquiry");
  }
}

// GET /api/projects/[id]/inquiries — admin: list all inquiries for a project
export async function GET(request: NextRequest, { params }: RouteContext) {
  return privateRoute(request, { roles: [UserRole.ADMIN] }, async () => {
    try {
      const { id } = await params;

      const inquiries = await prisma.projectInquiry.findMany({
        where: { projectId: id },
        orderBy: { createdAt: "desc" },
      });

      return NextResponse.json({ success: true, data: inquiries });
    } catch (error) {
      return handleError(error, "Failed to fetch inquiries");
    }
  });
}
