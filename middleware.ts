import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { VerifyJwtToken } from "./utils/verify-auth-token";
import { handleError } from "./utils/ErrorHandler";
const publicRoutes: string[] = ["/"];
const protectedRoutes: string[] = ["/dashboard"];
export async function middleware(request: NextRequest) {
  try {
    const path: string = request.nextUrl.pathname;
    const cookieStore = await cookies();
    const token: string | undefined = cookieStore.get("token")?.value.trim();
    const isProtectedRoute: boolean = protectedRoutes.includes(path);
    const isPublicRoute: boolean = publicRoutes.includes(path);

    if (token && isPublicRoute) {
      const isValidToken = await VerifyJwtToken(token);
       console.log("🚀 ~ middleware ~ isValidToken: IDEA", isValidToken)
       return NextResponse.redirect(new URL("/dashboard", request.url));
    } else if (!token && isProtectedRoute) {
      return NextResponse.redirect(new URL("/", request.url));
    } else if (token && isProtectedRoute) {
      const isValidToken = await VerifyJwtToken(token);
      console.log("🚀 ~ middleware ~ isValidToken MERA :", isValidToken);
      return NextResponse.redirect(new URL("/", request.url));
    }
  } catch (error: any) {
    console.error("🚀 ~ middleware error:", error);
    return handleError(error, 500);
  }
}

export const config = {
  matcher: ["/", "/dashboard"],
};
