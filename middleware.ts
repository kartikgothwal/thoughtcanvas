import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/") {
    const cookieStore = await cookies();
    const token = cookieStore.get("token");
    if (token && token.name.toLowerCase() === "token") {
        try {
            
        } catch (error:unknown) {
            
        }
    }
  }
}

export const config = {
  matcher: "/",
};
