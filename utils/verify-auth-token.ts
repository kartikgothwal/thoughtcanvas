import { JwtPayload } from "jsonwebtoken";
import { PostRequestHandler } from "@/axios/PostRequestHandler";

export async function VerifyJwtToken(
  token: string
): Promise<string | JwtPayload | boolean> {
  try {
    const response = await PostRequestHandler("verify-user", {}, token);
    if (response.data?.error) {
      return false;
    }

    return (
      response.data && typeof response.data === "object" && !response.data.error
    );
  } catch (error: unknown) {
    console.error("Token verification failed:", error);
    return false;
  }
}
