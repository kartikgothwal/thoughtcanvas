import { handleError } from "@/utils/ErrorHandler";
import { HttpStatus } from "@/constant";
import { authenticateJWT } from "@/lib/middlware.ts/authMiddleware";
import { ApiJsonResponse } from "@/utils";
import { NextResponse } from "next/server";
import { IApiResponse, IErrorResponse } from "@/types";

async function handler(
  request: Request,
  response: Response,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  decoded: any
): Promise<NextResponse<IErrorResponse | IApiResponse>> {
  try {
    return ApiJsonResponse("Token is verified", HttpStatus.OK, decoded);
  } catch (error: unknown) {
    return handleError(error, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
export const POST = authenticateJWT(handler);
