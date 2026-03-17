// app/api/projects/inquiry-counts/route.ts
// Returns unseen inquiry counts per project for the notification badges
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import handleError from "../../helpers/handleError";
import privateRoute from "../../helpers/privateRoute";
import { UserRole } from "@prisma/client";

export async function GET(request: NextRequest) {
  return privateRoute(request, { roles: [UserRole.ADMIN] }, async () => {
    try {
      // Group unseen inquiries by projectId
      const unseenGroups = await prisma.projectInquiry.groupBy({
        by: ["projectId"],
        where: { seenAt: null },
        _count: { _all: true },
      });

      // Also get total counts per project
      const totalGroups = await prisma.projectInquiry.groupBy({
        by: ["projectId"],
        _count: { _all: true },
      });

      // Build a map: { projectId: { unseen, total } }
      const result: Record<string, { unseen: number; total: number }> = {};

      totalGroups.forEach((g) => {
        result[g.projectId] = { unseen: 0, total: g._count._all };
      });

      unseenGroups.forEach((g) => {
        if (result[g.projectId]) {
          result[g.projectId].unseen = g._count._all;
        } else {
          result[g.projectId] = { unseen: g._count._all, total: g._count._all };
        }
      });

      return NextResponse.json({ success: true, data: result });
    } catch (error) {
      return handleError(error, "Failed to fetch inquiry counts");
    }
  });
}
