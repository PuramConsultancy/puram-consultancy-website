// app/api/projects/[id]/inquiries/seen/route.ts
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import handleError from "../../../../helpers/handleError";
import privateRoute from "../../../../helpers/privateRoute";
import { UserRole } from "@prisma/client";

type RouteContext = { params: Promise<{ id: string }> };

// PATCH /api/projects/[id]/inquiries/seen — admin: mark all unseen as seen
export async function PATCH(request: NextRequest, { params }: RouteContext) {
  return privateRoute(request, { roles: [UserRole.ADMIN] }, async () => {
    try {
      const { id } = await params;

      await prisma.projectInquiry.updateMany({
        where: { projectId: id, seenAt: null },
        data: { seenAt: new Date() },
      });

      return NextResponse.json({ success: true });
    } catch (error) {
      return handleError(error, "Failed to mark inquiries as seen");
    }
  });
}
