import { HttpStatus, ResponseMessages } from "@/constant";
import { authenticateJWT } from "@/lib/middlware.ts/authMiddleware";
import { UserModel } from "@/schema/users";
import { IUsersSchema } from "@/types";
import { ApiJsonResponse, PayloadErrorFormat } from "@/utils";
import { handleError } from "@/utils/ErrorHandler";
import { ResetPasswordSchema } from "@/zod";
import { z } from "zod";
import bcrypt from "bcrypt";
type ResetPasswordType = z.infer<typeof ResetPasswordSchema>;

async function handler(request: Request, response: Response, decoded: any) {
  console.log("🚀 ~ handler ~ decoded:", decoded);
  try {
    const payload: ResetPasswordType = await request.json();
    const isValidPayload = ResetPasswordSchema.safeParse(payload);
    if (!isValidPayload.success) {
      const errors:
        | {
            message: string;
          }[]
        | undefined = PayloadErrorFormat(isValidPayload);
      return handleError(
        new Error(
          errors?.[0]?.message || ResponseMessages.UNKNOWN_ERROR_OCCURRED
        ),
        HttpStatus.BAD_REQUEST
      );
    }
    const isExisted: IUsersSchema | null = await UserModel.findOne({
      email: decoded.email,
    });
    if (!isExisted) {
      return handleError(
        new Error(ResponseMessages.USER_NOT_FOUND),
        HttpStatus.NOT_FOUND
      );
    }
    const isOldPassword: boolean = bcrypt.compareSync(
      payload.password,
      isExisted?.password!
    );
    console.log("🚀 ~ handler ~ isOldPassword:", isOldPassword);
    if (!isOldPassword) {
      return handleError(
        new Error("New password must be different from the current one."),
        HttpStatus.BAD_REQUEST
      );
    }
    const hashedPassword: string = bcrypt.hashSync(payload.password, 10);
    isExisted.password = hashedPassword;
    await isExisted.save();
    return ApiJsonResponse("Password has be reset", HttpStatus.OK);
  } catch (error) {
    console.error("🚀 ~ PATCH ~ error:", error);
    return handleError(error, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

export const PATCH = authenticateJWT(handler);
