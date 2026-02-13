import prisma from "@/lib/prisma";
import { RegisterUserSchema } from "@/schemas/user.schema";
import { UserRole } from "@prisma/client";
import argon2 from "argon2";
import { NextRequest, NextResponse } from "next/server";
import generateToken, { IJWTPayload } from "../../helpers/generateToken";
import handleError from "../../helpers/handleError";

/**
 * @route   POST /api/auth/register
 * @desc    Authenticate user and return JWT token
 * @access  Public
 */

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = RegisterUserSchema.parse(body);

    const isUserExist = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });
    if (isUserExist) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "USER_ALREADY_EXISTS",
            message: "User is already exist",
          },
        },
        { status: 409 },
      );
    }


    const { firstName, lastName, email, password} =
      validatedData;

    // Hashed the password securely
    const hashedPassword = await argon2.hash(password);

    //created a user using the validated data
    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role: UserRole.USER,
      },
    });

    const token = generateToken<IJWTPayload>({
      id: user.id,
      role: user.role,
    });

    const { password: _, ...userResponse } = user;

    return NextResponse.json(
      {
        success: true,
        data: {
          user: {
            ...userResponse,
          },
         
        },
        token,
        message: "User created successfully.",
      },
      { status: 201 },
    );
  } catch (error) {
    return handleError(error, "Failed to register user");
  }
}
