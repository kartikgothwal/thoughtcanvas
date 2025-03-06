import jwt, { JwtPayload } from "jsonwebtoken";
const PRIVATE_KEY: string = process.env.NEXT_JWT_PUBLIC_KEY!;
export function JwtValidator(token: string): string | JwtPayload {
  return jwt.verify(token, PRIVATE_KEY);
}
