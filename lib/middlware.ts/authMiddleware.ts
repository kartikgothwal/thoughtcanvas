import { HttpStatus } from "@/constant";
import { handleError } from "@/utils/ErrorHandler";
import { JwtValidator } from "@/utils/JwtValidator";
import { JwtPayload } from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";
import { headers } from "next/headers";

interface AuthenticatedRequest extends NextApiRequest {
  user?: string | JwtPayload;
}

export function authenticateJWT(
  handler: (request: NextApiRequest, response: NextApiResponse) => any
) {
  return async (req: NextApiRequest, res: NextApiResponse): Promise<any> => {
    const headersList: ReadonlyHeaders = await headers();
    const token: string | undefined = headersList
      .get("authorization")
      ?.split(" ")[1];
    try {
      if (!token) {
        return handleError(
          new Error("No token provided"),
          "",
          HttpStatus.UNAUTHORIZED
        );
      }
      const decoded: string | JwtPayload = JwtValidator(token);
      if (!decoded) {
        return handleError(
          new Error("Invalid JWT token"),
          "",
          HttpStatus.UNAUTHORIZED
        );
      }
      (req as AuthenticatedRequest).user = decoded;
      return handler(req, res);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error: unknown) {
      return handleError(
        new Error("Internal server error"),
        "",
        HttpStatus.UNAUTHORIZED
      );
    }
  };
}
