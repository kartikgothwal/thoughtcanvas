import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { VerifyJwtToken } from "./utils/VerifyToken";
import { deleteCookies } from "./utils/Cookies";
const publicRoutes: string[] = ["/"];
const protectedRoutes: string[] = ["/dashboard"];
export async function middleware(request: NextRequest) {
  try {
    const path: string = request.nextUrl.pathname;

    const cookieStore = await cookies();
    let token: string | undefined = cookieStore.get("token")?.value.trim();
    const isProtectedRoute: boolean = protectedRoutes.includes(path);
    const isPublicRoute: boolean = publicRoutes.includes(path);
    const isForgotPasswordRoute: boolean = path.includes("/forgot-password/");
    if (isForgotPasswordRoute) {
      console.log("Inside ");
      token = path.split("/forgot-password/")[1];
    }
    if (token && (!token.includes(".") || token.split(".").length !== 3)) {
      deleteCookies("all");
      return NextResponse.redirect(new URL("/", request.url));
    }
    console.log(
      "I am here 🖼️🖼️🖼️🖼️",
      token,
      "",
      isProtectedRoute,
      isPublicRoute
    );
    if (token && isPublicRoute) {
      const isValidToken = await VerifyJwtToken(token);
      if (isValidToken) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
      return NextResponse.redirect(new URL("/", request.url));
    } else if (isProtectedRoute || isForgotPasswordRoute) {
      if (!token) {
        return NextResponse.redirect(new URL("/", request.url));
      }
      const isValidToken = await VerifyJwtToken(token);
      if (!isValidToken) {
        deleteCookies("all");
        return NextResponse.redirect(new URL("/", request.url));
      }
      return NextResponse.next();
    }
  } catch (error: unknown) {
    console.error("🚀 ~ middleware error:", error);
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: ["/", "/dashboard", "/forgot-password/:path*"],
};
