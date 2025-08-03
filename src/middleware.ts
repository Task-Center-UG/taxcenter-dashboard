import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // 1. Get the token from cookies
  const token = request.cookies.get("jwt_access_token");

  // 2. If no token, redirect to the sign-in page
  if (!token) {
    const signInUrl = new URL("/sign-in", request.url);
    return NextResponse.redirect(signInUrl);
  }

  // 3. If token exists, allow the request to proceed
  return NextResponse.next();
}

export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico|sign-in).*)",
};
