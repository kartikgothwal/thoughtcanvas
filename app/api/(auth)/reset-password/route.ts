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
    console.log("🚀 ~ PATCH ~ payload:", payload);
    return NextResponse.json({ message: "Reset Password" });
  } catch (error) {
    console.error("🚀 ~ PATCH ~ error:", error);
    return handleError(error, "Internal Server Error");
  }
}

export const PATCH = authenticateJWT(handler);
