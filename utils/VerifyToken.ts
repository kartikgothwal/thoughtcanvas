import { PostRequestHandler } from "@/axios/PostRequestHandler";
import { HttpStatus } from "@/constant";
import { AxiosError } from "axios";

export async function VerifyJwtToken(token: string): Promise<boolean> {
  try {
    if (!token || typeof token !== "string" || token.split(".").length !== 3) {
      console.log("Invalid token format");
      return false;
    }
    const response = await PostRequestHandler("verify-user", {}, token);
    if (!response?.data || typeof response.data !== "object") {
      return false;
    }
    const data: { success: boolean } = response.data;
    return data.success;
  } catch (error) {
    if (
      error instanceof AxiosError &&
      error.response?.status === HttpStatus.UNAUTHORIZED
    ) {
    } else {
      console.log(
        "Verification error:",
        error instanceof Error ? error.message : "Unknown error"
      );
    }
    return false;
  }
}
