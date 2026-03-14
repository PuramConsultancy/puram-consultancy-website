import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import handleError from "../helpers/handleError";
import privateRoute from "../helpers/privateRoute";
import { UserRole } from "@prisma/client";

const DEFAULT_CONFIG = {
  companyName: "Puram Consultancy",
  email: "",
  phone: "",
  address: "",
  facebook: "",
  instagram: "",
  tiktok: "",
  youtube: "",
  linkedin: "",
};

export async function GET() {
  try {
    const records = await prisma.siteConfig.findMany();
    const config = Object.fromEntries(records.map((r) => [r.key, r.value]));
    return NextResponse.json({
      success: true,
      data: { ...DEFAULT_CONFIG, ...config },
    });
  } catch (error) {
    return handleError(error, "Failed to fetch config");
  }
}

export async function PATCH(request: NextRequest) {
  return privateRoute(request, { roles: [UserRole.ADMIN] }, async () => {
    try {
      const body = await request.json();

      // Upsert each key-value pair
      await Promise.all(
        Object.entries(body).map(([key, value]) =>
          prisma.siteConfig.upsert({
            where: { key },
            update: { value: String(value) },
            create: { key, value: String(value) },
          }),
        ),
      );

      const records = await prisma.siteConfig.findMany();
      const config = Object.fromEntries(records.map((r) => [r.key, r.value]));

      return NextResponse.json({
        success: true,
        data: { ...DEFAULT_CONFIG, ...config },
      });
    } catch (error) {
      return handleError(error, "Failed to update config");
    }
  });
}
