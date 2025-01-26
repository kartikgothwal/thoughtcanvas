import axios from "axios";
import { JwtPayload } from "jsonwebtoken";

export async function VerifyJwtToken(
  token: string
): Promise<string | JwtPayload | undefined> {
  try {
    return await axios.post(
      `${process.env.NEXT_PUBLIC_APP_API_URL}/verify-user`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error: unknown) {
    console.log("🚀 ~ VerifyJwtToken ~ error:", error);
  }
}
