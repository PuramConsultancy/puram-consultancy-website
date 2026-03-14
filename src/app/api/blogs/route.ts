import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import handleError from "../helpers/handleError";
import privateRoute from "../helpers/privateRoute";
import { CreateBlogSchema } from "@/schemas/blog.schema";
import { UserRole } from "@prisma/client";

export async function GET() {
  try {
    const blogs = await prisma.blog.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ success: true, data: blogs });
  } catch (error) {
    return handleError(error, "Failed to fetch blogs");
  }
}

export async function POST(request: NextRequest) {
  return privateRoute(request, { roles: [UserRole.ADMIN] }, async () => {
    try {
      const body = await request.json();
      const { title, content, published } = CreateBlogSchema.parse(body);

      const baseSlug = title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");

      const existing = await prisma.blog.findUnique({
        where: { slug: baseSlug },
      });
      const slug = existing ? `${baseSlug}-${Date.now()}` : baseSlug;

      const blog = await prisma.blog.create({
        data: { title, content, slug, published },
      });

      return NextResponse.json({ success: true, data: blog }, { status: 201 });
    } catch (error) {
      return handleError(error, "Failed to create blog");
    }
  });
}
