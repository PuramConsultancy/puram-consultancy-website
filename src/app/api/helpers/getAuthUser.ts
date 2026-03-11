import { NextRequest } from "next/server";
import { IJWTPayload, verifyToken } from "./generateToken";

export function getAuthUser(request: NextRequest): IJWTPayload | null {
  try {
    const authHeader = request.headers.get("Authorization");
    const token = authHeader?.startsWith("Bearer ")
      ? authHeader.slice(7)
      : request.cookies.get("pc-user-token")?.value; // ✅ fixed

    if (!token) return null;

    return verifyToken<IJWTPayload>(token);
  } catch {
    return null;
  }
}
