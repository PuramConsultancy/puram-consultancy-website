import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import handleError from "../../helpers/handleError";
import privateRoute from "../../helpers/privateRoute";
import { UserRole } from "@prisma/client";
import { UpdateProjectSchema } from "@/schemas/project.schema";

// Next.js 15: params is a Promise — must be awaited
type RouteContext = { params: Promise<{ id: string }> };

// GET /api/projects/[id] — public (only if published)
export async function GET(_request: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params;
    const project = await prisma.project.findUnique({ where: { id } });
    if (!project || !project.published) {
      return NextResponse.json(
        { success: false, error: { message: "Project not found" } },
        { status: 404 },
      );
    }
    return NextResponse.json({ success: true, data: project });
  } catch (error) {
    return handleError(error, "Failed to fetch project");
  }
}

// PATCH /api/projects/[id] — admin only
export async function PATCH(request: NextRequest, { params }: RouteContext) {
  const { id } = await params;
  return privateRoute(request, { roles: [UserRole.ADMIN] }, async () => {
    try {
      const body = await request.json();
      const data = UpdateProjectSchema.parse(body);
      const project = await prisma.project.update({ where: { id }, data });
      return NextResponse.json({ success: true, data: project });
    } catch (error) {
      return handleError(error, "Failed to update project");
    }
  });
}

// DELETE /api/projects/[id] — admin only
export async function DELETE(request: NextRequest, { params }: RouteContext) {
  const { id } = await params;
  return privateRoute(request, { roles: [UserRole.ADMIN] }, async () => {
    try {
      await prisma.project.delete({ where: { id } });
      return NextResponse.json({ success: true });
    } catch (error) {
      return handleError(error, "Failed to delete project");
    }
  });
}
