import jwt, { JwtPayload } from "jsonwebtoken";
const PUBLIC_KEY: string = process.env.NEXT_JWT_PUBLIC_KEY!;

export function JwtValidator(token: string): string | JwtPayload | null {
  try {
    return jwt.verify(token, PUBLIC_KEY);
  } catch (error) {
    console.log("JWT verification failed:", error);
    return null;
  }
}
