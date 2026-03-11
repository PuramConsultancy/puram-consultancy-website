import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getAuthUser } from "@/app/api/helpers/getAuthUser";
import { CreateFormSchema } from "@/schemas/form.schemas";

export async function POST(request: NextRequest) {
  try {
    const user = getAuthUser(request);
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }
    const body = await request.json();
    const validated = CreateFormSchema.parse(body);
    const form = await prisma.form.create({
      data: {
        title: validated.title,
        description: validated.description,
        createdBy: user.id,
      },
    });
    return NextResponse.json({ success: true, data: form }, { status: 201 });
  } catch (error) {
    console.error("POST /api/forms error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create form" },
      { status: 500 },
    );
  }
}

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
    });
    return NextResponse.json({ success: true, data: forms });
  } catch (error) {
    console.error("GET /api/forms error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch forms" },
      { status: 500 },
    );
  }
}
