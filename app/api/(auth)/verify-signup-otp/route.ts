import { HttpStatus } from "@/constant";
import { ApiJsonResponse, handleError } from "@/utils";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    console.log("🚀 ~ POST ~ payload:", payload);
    return ApiJsonResponse("OTP sent to your email", HttpStatus.OK);
  } catch (error: unknown) {
    console.log("🚀 ~ POST ~ error:", error);
    return handleError(
      new Error(error instanceof Error ? error.message : String(error)),
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
}
