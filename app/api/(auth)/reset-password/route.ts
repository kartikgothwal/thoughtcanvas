import { HttpStatus, ResponseMessages } from "@/constant";
import { authenticateJWT } from "@/lib/middlware.ts/authMiddleware";
import { handleError } from "@/utils/ErrorHandler";
import { ResetPasswordSchema } from "@/zod";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import { z } from "zod";

type ResetPasswordType = z.infer<typeof ResetPasswordSchema>;

async function handler(request: NextApiRequest) {
  try {
    const payload: ResetPasswordType = request.body;
    const isValidPayload = ResetPasswordSchema.safeParse(payload);
    // console.log("🚀 ~ handler ~ isValidPayload:", isValidPayload.error);
    return NextResponse.json({
      message: "Hey",
      isValidPayload: isValidPayload?.error?.errors[0],
    });
    if (!isValidPayload.success) {  
      return handleError(
        new Error(isValidPayload?.error?.format()),
        HttpStatus.BAD_REQUEST
      );
    }
  } catch (error) {
    console.error("🚀 ~ PATCH ~ error:", error);
    return handleError(error, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

export const PATCH = authenticateJWT(handler);
