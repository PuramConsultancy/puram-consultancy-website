import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// ✅ No auth — public list for home & contact pages
export async function GET() {
  try {
    const forms = await prisma.form.findMany({
      orderBy: { createdAt: "desc" },
      select: { id: true, title: true, description: true, createdAt: true },
    });
    return NextResponse.json({ success: true, data: forms });
  } catch (error) {
    console.error("GET /api/forms/public error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch forms" },
      { status: 500 },
    );
  }
}
