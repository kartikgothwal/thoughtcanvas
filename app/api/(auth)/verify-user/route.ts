import { handleError } from "@/utils/ErrorHandler";
import { HttpStatus } from "@/constant";
import { authenticateJWT } from "@/lib/middlware.ts/authMiddleware";
import { ApiJsonResponse } from "@/utils";
import { NextResponse } from "next/server";
import { IApiResponse, IErrorResponse } from "@/types";

async function handler(
  request: Request,
  response: Response,
  decoded: any
): Promise<NextResponse<IErrorResponse | IApiResponse>> {
  try {
    // const authHeader: string | null = request.headers.get("Authorization");
    // if (!authHeader) {
    //   return handleError(
    //     new Error(ResponseMessages.AUTHORIZATION_TOKEN_MISSING),
    //     HttpStatus.UNAUTHORIZED
    //   );
    // }
    // const token: string = authHeader.split(" ")[1];
    // if (!token) {
    //   return handleError(
    //     new Error(ResponseMessages.AUTHORIZATION_TOKEN_MISSING),
    //     HttpStatus.UNAUTHORIZED
    //   );
    // }
    // const decoded: string | JwtPayload | null = JwtValidator(token);
    // if (!decoded) {
    //   return handleError(
    //     new Error(ResponseMessages.INVALID_TOKEN),
    //     HttpStatus.UNAUTHORIZED
    //   );
    // }
    // return NextResponse.json({
    //   success: true,
    //   isValid: true,
    //   decoded,
    // });
    return ApiJsonResponse("Token is verified", HttpStatus.OK, decoded);
  } catch (error: unknown) {
    return handleError(error, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
export const POST = authenticateJWT(handler);
