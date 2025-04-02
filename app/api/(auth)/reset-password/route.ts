import { HttpStatus, ResponseMessages } from "@/constant";
import { authenticateJWT } from "@/lib/middlware.ts/authMiddleware";
import { ApiJsonResponse, PayloadErrorFormat } from "@/utils";
import { handleError } from "@/utils/ErrorHandler";
import { ResetPasswordSchema } from "@/zod";
import { NextApiRequest } from "next";
import { z } from "zod";

type ResetPasswordType = z.infer<typeof ResetPasswordSchema>;

async function handler(request: Request) {
  try {
    const payload: ResetPasswordType = await request.json();
    const isValidPayload = ResetPasswordSchema.safeParse(payload);
    if (!isValidPayload.success) {
      const errors:
        | {
            message: string;
          }[]
        | undefined = PayloadErrorFormat(isValidPayload);
      return handleError(
        new Error(
          errors?.[0]?.message || ResponseMessages.UNKNOWN_ERROR_OCCURRED
        ),
        HttpStatus.BAD_REQUEST
      );
    }
    return ApiJsonResponse("hello", HttpStatus.OK);
  } catch (error) {
    console.error("🚀 ~ PATCH ~ error:", error);
    return handleError(error, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

export const PATCH = authenticateJWT(handler);
