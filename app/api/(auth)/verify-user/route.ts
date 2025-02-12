import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { handleError } from "@/utils/ErrorHandler";
export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("Authorization");
    if (!authHeader) {
      return handleError(new Error("Authorization header missing"), "", 401);
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
      return handleError(
        new Error("Token missing in Authorization header"),
        "",
        401
      );
    }

    const publicKey = process.env.NEXT_JWT_PUBLIC_KEY;
    if (!publicKey) {
      return handleError(new Error("Public key not found"), "", 500);
    }
    try {
      const decoded = jwt.verify(token, publicKey, {
        algorithms: ["RS256"],
      });

      return NextResponse.json({
        success: true,
        isValid: true,
        decoded,
      });
    } catch (jwtError) {
      if (jwtError instanceof jwt.JsonWebTokenError) {
        return handleError(jwtError, jwtError.message, 401);
      }
      throw jwtError;
    }
  } catch (error: unknown) {
    return handleError(error, "Internal Server Error", 500);
  }
}
