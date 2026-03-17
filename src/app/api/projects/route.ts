import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import handleError from "../helpers/handleError";
import privateRoute from "../helpers/privateRoute";
import { UserRole } from "@prisma/client";
import { CreateProjectSchema } from "@/schemas/project.schema";

// GET /api/projects — public: only published; admin: all
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const adminParam = searchParams.get("admin");

    if (adminParam === "true") {
      return privateRoute(request, { roles: [UserRole.ADMIN] }, async () => {
        const projects = await prisma.project.findMany({
          orderBy: { createdAt: "desc" },
        });
        return NextResponse.json({ success: true, data: projects });
      });
    }

    // Public: only published
    const projects = await prisma.project.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ success: true, data: projects });
  } catch (error) {
    return handleError(error, "Failed to fetch projects");
  }
}

// POST /api/projects — admin only
export async function POST(request: NextRequest) {
  return privateRoute(request, { roles: [UserRole.ADMIN] }, async () => {
    try {
      const body = await request.json();
      const data = CreateProjectSchema.parse(body);

      const project = await prisma.project.create({ data });
      return NextResponse.json(
        { success: true, data: project },
        { status: 201 },
      );
    } catch (error) {
      return handleError(error, "Failed to create project");
    }
  });
}
