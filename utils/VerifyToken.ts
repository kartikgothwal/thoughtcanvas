import { PostRequestHandler } from "@/axios/PostRequestHandler";
import { ERROR_401 } from "@/constant";
import { AxiosError } from "axios";

export async function VerifyJwtToken(token: string): Promise<boolean> {
  try {
    if (!token || typeof token !== "string" || token.split(".").length !== 3) {
      console.error("Invalid token format");
      return false;
    }
    const response = await PostRequestHandler("verify-user", {}, token);
    if (!response?.data || typeof response.data !== "object") {
      return false;
    }
    const data = response.data;
    return data.success;
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === ERROR_401) {
      console.error(
        "Token invalid:",
        error.response.data?.message || "Unknown error"
      );
    } else {
      console.error(
        "Verification error:",
        error instanceof Error ? error.message : "Unknown error"
      );
    }
    return false;
  }
}
