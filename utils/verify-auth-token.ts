import jwt, { JwtPayload } from "jsonwebtoken";

export function VerifyJwtToken(token: string): string | JwtPayload | undefined {
  try {
    if (!process.env.NEXT_JWT_PUBLIC_KEY) {
      throw new Error("Missing public key in environment variables.");
    }
    return jwt.verify(token, process.env.NEXT_JWT_PUBLIC_KEY);
  } catch (error: unknown) {
    console.log("🚀 ~ VerifyJwtToken ~ error:", error);
  }
}
