import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import handleError from "../../helpers/handleError";
import privateRoute from "../../helpers/privateRoute";
import { IJWTPayload } from "../../helpers/generateToken";
import { UserRole } from "@prisma/client";
import argon2 from "argon2";
import { z } from "zod";

const UpdateCredentialsSchema = z.object({
  email: z.string().email().optional(),
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z
    .string()
    .min(8)
    .regex(/[A-Z]/, "Must contain uppercase")
    .regex(/[a-z]/, "Must contain lowercase")
    .regex(/\d/, "Must contain number")
    .regex(/[!@#$%^&*]/, "Must contain special character")
    .optional(),
});

export async function PATCH(request: NextRequest) {
  return privateRoute(
    request,
    { roles: [UserRole.ADMIN] },
    async (user: IJWTPayload) => {
      try {
        const body = await request.json();
        const { email, currentPassword, newPassword } =
          UpdateCredentialsSchema.parse(body);

        const admin = await prisma.user.findUnique({ where: { id: user.id } });
        if (!admin) {
          return NextResponse.json(
            { success: false, error: { message: "User not found" } },
            { status: 404 },
          );
        }

        const isValid = await argon2.verify(admin.password, currentPassword);
        if (!isValid) {
          return NextResponse.json(
            {
              success: false,
              error: {
                code: "INVALID_PASSWORD",
                message: "Current password is incorrect",
              },
            },
            { status: 401 },
          );
        }

        const updateData: Record<string, string> = {};
        if (email) updateData.email = email;
        if (newPassword) updateData.password = await argon2.hash(newPassword);

        const updated =
          Object.keys(updateData).length > 0
            ? await prisma.user.update({
                where: { id: user.id },
                data: updateData,
              })
            : admin;

        // ← Sync email to SiteConfig so footer/contact page stays in sync
        if (email) {
          await prisma.siteConfig.upsert({
            where: { key: "email" },
            update: { value: email },
            create: { key: "email", value: email },
          });
        }

        const { password: _, ...userData } = updated;
        return NextResponse.json({ success: true, data: { user: userData } });
      } catch (error) {
        return handleError(error, "Failed to update credentials");
      }
    },
  );
}
