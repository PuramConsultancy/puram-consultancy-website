import jwt, { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { IJWTPayload } from "./generateToken";
import { UserRole } from "@prisma/client";

interface PrivateRouteCheck {
  roles?: UserRole[];
}

export default async function privateRoute(
  _: NextRequest,
  checkFor: PrivateRouteCheck,
  cb: (user: IJWTPayload, token: string) => Promise<NextResponse>,
) {
  try {
    const authorization = (await headers()).get("Authorization");
    const token = authorization?.split("Bearer ")[1];

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "MISSING_AUTH_TOKEN",
            message: "Authorization token is required",
          },
        },
        { status: 401 },
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as IJWTPayload;

    /**
     * Role Authorization Check
     */
    if (checkFor.roles && checkFor.roles.length > 0) {
      if (!checkFor.roles.includes(decoded.role)) {
        return NextResponse.json(
          {
            success: false,
            error: {
              code: "FORBIDDEN",
              message: "You do not have permission to perform this action",
            },
          },
          { status: 403 },
        );
      }
    }

    return cb(decoded, token);
  } catch (error) {
    if (error instanceof JsonWebTokenError) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code:
              error instanceof TokenExpiredError
                ? "TOKEN_EXPIRED"
                : "INVALID_TOKEN",
            message: error.message,
          },
        },
        { status: 401 },
      );
    }

    console.error("privateRoute error:", error);

    return NextResponse.json(
      {
        success: false,
        error: {
          code: "SERVER_ERROR",
          message: "Unexpected server error",
        },
      },
      { status: 500 },
    );
  }
}
