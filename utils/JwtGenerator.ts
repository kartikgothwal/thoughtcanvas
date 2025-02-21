import jwt from "jsonwebtoken";

export function JwtGenerator(data: object, expiresIn?: string): string {
  if (!process.env.NEXT_JWT_PRIVATE_KEY) {
    throw new Error("Missing private key in environment variables.");
  }
  return jwt.sign(data, process.env.NEXT_JWT_PRIVATE_KEY, {
    algorithm: "RS256",
    expiresIn: expiresIn ?? "30d",
  });
}
