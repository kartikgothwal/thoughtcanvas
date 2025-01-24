import jwt from "jsonwebtoken";

export function jwtKeysGenerator(data: string): string | jwt.JwtPayload {
  if (!process.env.NEXT_JWT_PRIVATE_KEY) {
    throw new Error("Missing private key in environment variables.");
  }
  return jwt.sign({ email: data }, process.env.NEXT_JWT_PRIVATE_KEY, {
    algorithm: "RS256",
    expiresIn: "30d",
  });
}
