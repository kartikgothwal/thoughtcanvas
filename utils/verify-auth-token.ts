import jwt from "jsonwebtoken";

export function VerifyJwtToken(token: string): string | jwt.JwtPayload {
   if (!process.env.NEXT_JWT_PUBLIC_KEY) {
    throw new Error("Missing private key in environment variables.");
  }
  return jwt.verify(token, process.env.NEXT_JWT_PUBLIC_KEY);
}
