import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import handleError from "../helpers/handleError";
import { CreateFormSchema } from "@/schemas/form.schemas";
import { getAuthUser } from "../helpers/getAuthUser";

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
    const validatedData = CreateFormSchema.parse(body);

    const form = await prisma.form.create({
      data: {
        title: validatedData.title,
        description: validatedData.description,
        createdBy: user.id,
      },
    });

    return NextResponse.json({
      success: true,
      data: form,
      message: "Form created successfully",
    });
  } catch (error) {
    return handleError(error, "Failed to create form");
  }
}

export async function GET() {
  try {
    const forms = await prisma.form.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, data: forms });
  } catch (error) {
    return handleError(error, "Failed to fetch forms");
  }
}
