// src/app/api/forms/submissions/route.ts

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getAuthUser } from "@/app/api/helpers/getAuthUser";

export async function GET(request: NextRequest) {
  try {
    const user = getAuthUser(request);
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    const forms = await prisma.form.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        description: true,
        createdAt: true,
        sections: {
          orderBy: { order: "asc" },
          select: {
            questions: {
              orderBy: { order: "asc" },
              select: { id: true, label: true, type: true },
            },
          },
        },
        submissions: {
          orderBy: { createdAt: "desc" },
          select: {
            id: true,
            formId: true,
            userId: true,
            data: true,
            createdAt: true,
            updatedAt: true,
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json({ success: true, data: forms });
  } catch (error) {
    console.error("GET /api/forms/submissions error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch submissions" },
      { status: 500 },
    );
  }
}
