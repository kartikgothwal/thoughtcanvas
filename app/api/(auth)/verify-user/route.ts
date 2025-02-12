import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

interface VerificationResponse {
  success: boolean;
  isValid: boolean;
  message?: string;
  decoded?: jwt.JwtPayload;
}

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("Authorization");
    if (!authHeader) {
      return NextResponse.json({
        success: false,
        isValid: false,
        message: "Authorization header missing"
      }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return NextResponse.json({
        success: false,
        isValid: false,
        message: "Token missing in Authorization header"
      }, { status: 401 });
    }

    const publicKey = process.env.NEXT_JWT_PUBLIC_KEY;
    if (!publicKey) {
      return NextResponse.json({
        success: false,
        isValid: false,
        message: "Internal server error"
      }, { status: 500 });
    }

    try {
      const decoded = jwt.verify(token, publicKey, {
        algorithms: ["RS256"],
      });

      return NextResponse.json({
        success: true,
        isValid: true,
        decoded
      });

    } catch (jwtError) {
      if (jwtError instanceof jwt.JsonWebTokenError) {
        return NextResponse.json({
          success: false,
          isValid: false,
          message: jwtError.message
        }, { status: 401 });
      }
      throw jwtError;
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      isValid: false,
      message: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
}