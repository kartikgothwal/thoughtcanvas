import { JwtPayload } from "jsonwebtoken";
import { handleError } from "./ErrorHandler";
import { PostRequestHandler } from "@/axios/PostRequestHandler";

export async function VerifyJwtToken(
  token: string
): Promise<string | JwtPayload | boolean> {
  try {
    const response = await PostRequestHandler("verify-user", {}, token);
    console.log("🚀 ~ response:", response);
    return !!response.data;
  } catch (error: any) {
    return handleError(error, 500);
  }
}
