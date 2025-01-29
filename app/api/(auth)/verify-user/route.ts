import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { handleError } from "@/utils/ErrorHandler";
export async function POST(request: NextRequest) {
  try {
    const headers = request.headers;
    const authorizationToken: string | undefined = headers
      .get("Authorization")
      ?.split(" ")[1];
    if (!authorizationToken) {
      return NextResponse.json(
        { message: "Missing Auth token" },
        { status: 401 }
      );
    }
    if (!process.env.NEXT_JWT_PUBLIC_KEY) {
      throw new Error("Missing public key in environment variables.");
    }
    const decoded = jwt.verify(
      authorizationToken,
      process.env.NEXT_JWT_PUBLIC_KEY,
      {
        algorithms: ["RS256"],
      }
    );
    return NextResponse.json(decoded);
  } catch (error: any) {
    // console.log("🚀 ~ VerifyJwtToken ~ error:", error);
    return handleError(error, 401);
  }
}
