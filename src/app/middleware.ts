import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { UserRole } from "@prisma/client";
import cookieKeys from "./config/cookieKeys";

type SessionUser = {
  id: string;
  email: string;
  role: UserRole;
  firstName?: string | null;
  lastName?: string | null;
};

export async function middleware(request: NextRequest, _: NextResponse) {
  const session = request.cookies.get(cookieKeys.USER_TOKEN);
  const sessionUser = request.cookies.get(cookieKeys.USER);
  const user = JSON.parse(sessionUser?.value || "null") as SessionUser | null;

  const onlyPublicRoutes = ["/login", "/register"];
  const isOnlyPublic = onlyPublicRoutes.includes(request.nextUrl.pathname);

  // Not logged in → redirect to login
  if (!session && !isOnlyPublic) {
    const url = new URL("/login", request.url);
    for (const [key, value] of request.nextUrl.searchParams.entries()) {
      url.searchParams.append(key, value);
    }
    if (!url.searchParams.has("redirect_to")) {
      url.searchParams.set("redirect_to", request.nextUrl.pathname);
    }
    return NextResponse.redirect(url);
  }

  // Logged in → redirect away from public routes
  if (session && isOnlyPublic) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Logged in, protected routes
  if (session && !isOnlyPublic) {
    // Admin dashboard: ADMIN only
    if (request.nextUrl.pathname.includes("admin-dashboard")) {
      if (user?.role !== UserRole.ADMIN) {
        return NextResponse.redirect(new URL("/", request.url));
      }
    }

    // User dashboard: USER only (admins use admin-dashboard)
    if (request.nextUrl.pathname.includes("user-dashboard")) {
      if (user?.role !== UserRole.USER) {
        return NextResponse.redirect(new URL("admin-dashboard", request.url));
      }
    }

    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    "/",
    "/login/:path*",
    "/register/:path*",
    "/admin-dashboard/:path*",
    "/user-dashboard/:path*",
    "/profile/:path*",
    "/bookings/:path*",
    "/forms/:path*",
  ],
};
