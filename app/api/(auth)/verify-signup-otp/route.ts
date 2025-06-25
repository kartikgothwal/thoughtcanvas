import { redis } from "@/config";
import { HttpStatus } from "@/constant";
import { handleError } from "@/utils";
import { verifySignupOTP } from "@/zod";
import { z } from "zod";

type TVerifySignupOTP = z.infer<typeof verifySignupOTP>;

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    console.log("🚀 ~ POST ~ payload:", payload);
  } catch (error: unknown) {
    console.log("🚀 ~ POST ~ error:", error);
    return handleError(
      new Error(error instanceof Error ? error.message : String(error)),
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
}
