import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import handleError from "../../helpers/handleError";
import privateRoute from "../../helpers/privateRoute";
import { UpdateBlogSchema } from "@/schemas/blog.schema";
import { UserRole } from "@prisma/client";

// MongoDB ObjectId is exactly 24 hex characters
const isObjectId = (str: string) => /^[a-f\d]{24}$/i.test(str);

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    // Only include id condition if it looks like a valid ObjectId
    const blog = await prisma.blog.findFirst({
      where: isObjectId(id) ? { OR: [{ id }, { slug: id }] } : { slug: id },
    });

    if (!blog) {
      return NextResponse.json(
        { success: false, message: "Blog not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, data: blog });
  } catch (error) {
    return handleError(error, "Failed to fetch blog");
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  return privateRoute(request, { roles: [UserRole.ADMIN] }, async () => {
    try {
      const { id } = await params;
      const body = await request.json();
      const validated = UpdateBlogSchema.parse(body);

      const blog = await prisma.blog.update({
        where: { id },
        data: validated,
      });

      return NextResponse.json({ success: true, data: blog });
    } catch (error) {
      return handleError(error, "Failed to update blog");
    }
  });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  return privateRoute(request, { roles: [UserRole.ADMIN] }, async () => {
    try {
      const { id } = await params;
      await prisma.blog.delete({ where: { id } });
      return NextResponse.json({ success: true, message: "Blog deleted" });
    } catch (error) {
      return handleError(error, "Failed to delete blog");
    }
  });
}
