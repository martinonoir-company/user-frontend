import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Routes that require authentication
const PROTECTED_PREFIXES = ["/account", "/wishlist", "/checkout", "/order-confirmation"];

// Routes that should redirect to /account if already authenticated
const AUTH_ROUTES = ["/login", "/register"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check for stored access token in cookies (set by auth-context on login)
  // Since tokens live in localStorage (not cookies), we cannot check them here.
  // The middleware provides a secondary layer; primary protection is in the page components.
  // We handle the case where users try to access protected routes without JS by
  // checking for a session indicator cookie set by the auth context.

  const hasSession = request.cookies.has("mn_session");

  // Redirect unauthenticated users away from protected routes
  if (PROTECTED_PREFIXES.some((prefix) => pathname.startsWith(prefix))) {
    if (!hasSession) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      url.searchParams.set("redirect", pathname);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/account/:path*",
    "/wishlist/:path*",
    "/checkout/:path*",
    "/order-confirmation/:path*",
    "/login",
    "/register",
  ],
};
