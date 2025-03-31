import { HttpStatus, ResponseMessages } from "@/constant";
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
    try {
      const headersList: ReadonlyHeaders = await headers();
      const token: string | undefined = headersList
        .get("authorization")
        ?.split(" ")[1];
      if (!token) {
        return handleError(
          new Error(ResponseMessages.AUTHORIZATION_TOKEN_MISSING),
          HttpStatus.UNAUTHORIZED
        );
      }
      const decoded: string | JwtPayload | null = JwtValidator(token);
      if (!decoded) {
        return handleError(
          new Error(ResponseMessages.INVALID_TOKEN),
          HttpStatus.UNAUTHORIZED
        );
      }
      return handler(req, res);
    } catch (error: unknown) {
      console.log("🚀 ~ return ~ error:", error);
      return handleError(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  };
}
