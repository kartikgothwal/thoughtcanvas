import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { handleError } from "@/utils/ErrorHandler";
import { HttpStatus, ResponseMessages } from "@/constant";
import { JwtValidator } from "@/utils/JwtValidator";
import { IApiResponse, IErrorResponse } from "@/types";

export async function POST(
  request: NextRequest
)  {
  try {
    const authHeader: string | null = request.headers.get("Authorization");
    if (!authHeader) {
      return handleError(
        new Error(ResponseMessages.AUTHORIZATION_TOKEN_MISSING),
        HttpStatus.UNAUTHORIZED
      );
    }
    const token: string = authHeader.split(" ")[1];
    if (!token) {
      return handleError(
        new Error(ResponseMessages.AUTHORIZATION_TOKEN_MISSING),
        HttpStatus.UNAUTHORIZED
      );
    }
    const decoded: string | JwtPayload | null = JwtValidator(token);
    if (!decoded) {
      return handleError(
        new Error(ResponseMessages.INVALID_TOKEN),
        HttpStatus.UNAUTHORIZED
      );
    }
    return NextResponse.json({
      success: true,
      isValid: true,
      decoded,
    });
  } catch (error: unknown) {
    return handleError(error, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
