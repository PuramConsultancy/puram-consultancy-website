import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import cookieKeys from "./app/config/cookieKeys";

type SessionUser = {
  id: string;
  email: string;
  role: string;
  firstName?: string | null;
  lastName?: string | null;
};

export async function middleware(request: NextRequest, _: NextResponse) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin-dashboard")) {
    const session = request.cookies.get(cookieKeys.USER_TOKEN);
    const sessionUser = request.cookies.get(cookieKeys.USER);
    const user = JSON.parse(sessionUser?.value || "null") as SessionUser | null;

    // Not logged in → redirect to login
    if (!session) {
      const url = new URL("/login", request.url);
      url.searchParams.set("redirect_to", pathname);
      return NextResponse.redirect(url);
    }

    // Logged in but not ADMIN → redirect to home
    if (user?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin-dashboard", "/admin-dashboard/:path*"],
};
