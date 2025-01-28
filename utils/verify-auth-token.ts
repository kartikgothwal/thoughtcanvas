import axios from "axios";
import { JwtPayload } from "jsonwebtoken";
import { handleError } from "./ErrorHandler";

export async function VerifyJwtToken(
  token: string
): Promise<string | JwtPayload | undefined> {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_APP_API_URL}/verify-user`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    return handleError(error, 500);
  }
}
