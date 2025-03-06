import { handleError } from "@/utils/ErrorHandler";
import { ResetPasswordSchema } from "@/zod";
import { NextResponse } from "next/server";
import { z } from "zod";

type ResetPasswordType = z.infer<typeof ResetPasswordSchema>;

export async function PATCH(request: Request) {
  try {
    const payload: ResetPasswordType = await request.json();
    console.log("🚀 ~ PATCH ~ payload:", payload);
    return NextResponse.json({ message: "Reset Password" });
  } catch (error) {
    console.error("🚀 ~ PATCH ~ error:", error);
    return handleError(error, "Internal Server Error");
  }
}
