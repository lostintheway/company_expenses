// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { lucia } from "./lib/auth";
import { cookies } from "next/headers";

// List of public routes that don't require authentication
const publicRoutes = ["/login", "/register", "/signup", "/404"];

export async function middleware(request: NextRequest) {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
  if (!sessionId) return null;
  const { user, session } = await lucia.validateSession(sessionId);

  const pathname = request.nextUrl.pathname;

  // Allow access to public routes without authentication
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // Redirect to login if there's no valid session
  if (!session) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Allow access to protected routes for authenticated users
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
