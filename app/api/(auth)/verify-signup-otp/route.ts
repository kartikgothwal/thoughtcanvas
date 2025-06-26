import { redis } from "@/config";
import { HttpStatus } from "@/constant";
import { IVerifySignupOTP } from "@/types";
import { ApiJsonResponse, handleError } from "@/utils";
import { verifySignupOTP } from "@/zod";

export async function POST(request: Request) {
  try {
    const payload: IVerifySignupOTP = await request.json();
    const isValidPayload = verifySignupOTP.safeParse(payload);
    if (!isValidPayload.success) {
      return handleError(
        new Error(isValidPayload.error.errors[0].message),
        HttpStatus.BAD_REQUEST
      );
    }
    const cachedOTP: string | null = await redis.get(
      `sign-up-otp:${payload.email}`
    );
    if (!cachedOTP) {
      return handleError(
        new Error("OTP is expired or invalid"),
        HttpStatus.UNAUTHORIZED
      );
    }
    return ApiJsonResponse("Token is verified", HttpStatus.OK, payload);
  } catch (error: unknown) {
    console.log("🚀 ~ POST ~ error:", error);
    return handleError(
      new Error(error instanceof Error ? error.message : String(error)),
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
}
