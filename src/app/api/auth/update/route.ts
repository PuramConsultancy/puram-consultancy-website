import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import handleError from "../../helpers/handleError";
import privateRoute from "../../helpers/privateRoute";
import { IJWTPayload } from "../../helpers/generateToken";
import { UserRole } from "@prisma/client";
import argon2 from "argon2";
import { UpdateCredentialsSchema } from "@/schemas/user.schema";

export async function PATCH(request: NextRequest) {
  return privateRoute(
    request,
    { roles: [UserRole.ADMIN] },
    async (user: IJWTPayload) => {
      try {
        const body = await request.json();
        const { email, currentPassword, newPassword } =
          UpdateCredentialsSchema.parse(body);

        const admin = await prisma.user.findUnique({
          where: { id: user.id },
        });

        if (!admin) {
          return NextResponse.json(
            { success: false, error: { message: "User not found" } },
            { status: 404 },
          );
        }

        // Verify current password
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
        if (email && email !== admin.email) updateData.email = email;
        if (newPassword) updateData.password = await argon2.hash(newPassword);

        const updated = await prisma.user.update({
          where: { id: user.id },
          data: updateData,
        });

        const { password: _, ...userData } = updated;
        return NextResponse.json({ success: true, data: userData });
      } catch (error) {
        return handleError(error, "Failed to update credentials");
      }
    },
  );
}
