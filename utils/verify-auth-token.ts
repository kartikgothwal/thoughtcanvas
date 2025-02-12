import { PostRequestHandler } from "@/axios/PostRequestHandler";
import { AxiosError } from "axios";

interface TokenVerificationResponse {
  success: boolean;
  isValid: boolean;
  message?: string;
  decoded?: any;
}

export async function VerifyJwtToken(token: string): Promise<boolean> {
  try {
    if (!token || typeof token !== 'string' || token.split('.').length !== 3) {
      console.error("Invalid token format");
      return false;
    }

    const response = await PostRequestHandler("verify-user", {}, token);
    
    if (!response?.data || typeof response.data !== 'object') {
      return false;
    }

    const data = response.data as TokenVerificationResponse;
    return data.success && data.isValid;

  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 401) {
      console.error("Token invalid:", error.response.data?.message || "Unknown error");
    } else {
      console.error("Verification error:", 
        error instanceof Error ? error.message : "Unknown error"
      );
    }
    return false;
  }
}