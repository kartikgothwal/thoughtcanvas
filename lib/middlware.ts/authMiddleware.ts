import { ERROR_401, ERROR_500 } from "@/constant";
import { JwtValidator } from "@/utils/JwtValidator";
import { JwtPayload } from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

export function authenticateJWT(handler: any) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const token: string | undefined = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(ERROR_401).json({ error: "No token provided" });
    }
    try {
      const decoded: string | JwtPayload = JwtValidator(token);
      if (!decoded) {
        return res.status(ERROR_401).json({ error: "Invalid token" });
      }
      (req as any).user = decoded;
      return handler(req, res);
    } catch (error) {
      return res.status(ERROR_500).json({ error: "Failed to verify token" });
    }
  };
}
