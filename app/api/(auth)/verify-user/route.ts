import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
export async function POST(request: NextRequest) {
  try {
    const headers = request.headers;
    const authorization = headers.get("Authorization")?.split(" ")[1];
    if (!authorization) {
        
    }
    if (!process.env.NEXT_JWT_PUBLIC_KEY) {
      throw new Error("Missing public key in environment variables.");
    }
    return jwt.verify("token", process.env.NEXT_JWT_PUBLIC_KEY);
  } catch (error: unknown) {
    console.log("🚀 ~ VerifyJwtToken ~ error:", error);
  }
}
