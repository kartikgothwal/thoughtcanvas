import axios from "axios";
import { JwtPayload } from "jsonwebtoken";
import { NextResponse } from "next/server";

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
    const data = await response.data;
    console.log("🚀 ~ data:", data);
    return data;
  } catch (error: unknown) {
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "Internal Server Error",
        error: error instanceof Error ? error : "Unknown error",
      },
      { status: 500 }
    );
  }
}
