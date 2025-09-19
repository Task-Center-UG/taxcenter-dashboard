import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const AUTH_COOKIE_NAME = "sid";
const publicRoutes = ["/sign-in"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionCookie = request.cookies.get(AUTH_COOKIE_NAME);

  const isUserLoggedIn = !!sessionCookie;

  if (isUserLoggedIn) {
    if (publicRoutes.includes(pathname)) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  if (!isUserLoggedIn) {
    if (!publicRoutes.includes(pathname)) {
      const signInUrl = new URL("/sign-in", request.url);
      signInUrl.searchParams.set("next", pathname);
      return NextResponse.redirect(signInUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
