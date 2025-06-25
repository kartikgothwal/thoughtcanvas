import { HttpStatus } from "@/constant";
import { handleError } from "@/utils";
import { verifySignupOTP } from "@/zod";
import { z } from "zod";

type TVerifySignupOTP = z.infer<typeof verifySignupOTP>;

export async function POST(request: Request) {
  try {
    const payload: TVerifySignupOTP = await request.json();
    const isValidPayload = verifySignupOTP.safeParse(payload);
    if (!isValidPayload.success) {
      return handleError(
        new Error(isValidPayload.error.errors[0].message),
        HttpStatus.BAD_REQUEST
      );
    }
  } catch (error: unknown) {
    console.log("🚀 ~ POST ~ error:", error);
    return handleError(
      new Error(error instanceof Error ? error.message : String(error)),
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
}
