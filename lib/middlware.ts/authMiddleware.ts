import { ERROR_401, ERROR_500 } from "@/constant";
import { handleError } from "@/utils/ErrorHandler";
import { JwtValidator } from "@/utils/JwtValidator";
import { JwtPayload } from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

interface AuthenticatedRequest extends NextApiRequest {
  user?: string | JwtPayload;
}

export function authenticateJWT(
  handler: (request: NextApiRequest, response: NextApiResponse) => any
) {
  return async (req: NextApiRequest, res: NextApiResponse): Promise<any> => {
    const token: string | undefined = req.headers.authorization?.split(" ")[1];
    try {
      if (!token) {
        return handleError(new Error("No token provided"), "", ERROR_401);
      }
      const decoded: string | JwtPayload = JwtValidator(token);
      if (!decoded) {
        return handleError(new Error("Invalid JWT token"), "", ERROR_401);
      }
      (req as AuthenticatedRequest).user = decoded;
      return handler(req, res);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error: unknown) {
      return res.status(ERROR_500).json({ error: "Failed to verify token" });
    }
  };
}
