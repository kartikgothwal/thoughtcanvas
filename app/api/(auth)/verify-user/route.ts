import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { handleError } from "@/utils/ErrorHandler";
import { ERROR_400, ERROR_401 } from "@/constant";
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
        ERROR_401
      );
    }

    const publicKey = process.env.NEXT_JWT_PUBLIC_KEY;
    if (!publicKey) {
      return handleError(new Error("Public key not found"), "", ERROR_401);
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
        return handleError(jwtError, jwtError.message, ERROR_401);
      }
      throw jwtError;
    }
  } catch (error: unknown) {
    return handleError(error, "Internal Server Error");
  }
}
