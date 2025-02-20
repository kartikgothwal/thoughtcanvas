import { handleError } from "@/utils";
import { ForgotPasswordSchema } from "@/zod";
import { NextResponse } from "next/server";
import { z } from "zod";

type ForgotPasswordType = z.infer<typeof ForgotPasswordSchema>;

export async function POST(request: Request) {
  try {
    const payload: ForgotPasswordType = await request.json();
    const isValidPayload = ForgotPasswordSchema.safeParse(payload);
    if (!isValidPayload.success) {
      return handleError(
        new Error(isValidPayload.error.errors[0].message),
        "",
        400
      );
    }
    return NextResponse.json({ email: payload });
  } catch (error) {
    console.error("🚀 ~ POST ~ error:", error);
    return handleError(error, "Internal Server Error");
  }
}
