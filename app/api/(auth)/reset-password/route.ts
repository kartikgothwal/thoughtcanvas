import { HttpStatus, ResponseMessages } from "@/constant";
import { authenticateJWT } from "@/lib/middlware.ts/authMiddleware";
import { UserModel } from "@/schema/users";
import { IApiResponse, IErrorResponse, IUsersSchema } from "@/types";
import { ApiJsonResponse, handleError, PayloadErrorFormat } from "@/utils";
import { ResetPasswordSchema } from "@/zod";
import { z } from "zod";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

type ResetPasswordType = z.infer<typeof ResetPasswordSchema>;
/**
 * @swagger
 * /api/reset-password:
 *   patch:
 *     summary: Reset user password using token
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - password
 *             properties:
 *               password:
 *                 type: string
 *                 example: NewSecurePassword123!
 *     responses:
 *       200:
 *         description: Password updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Password has be updated
 *       400:
 *         description: Invalid input or password already used
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

async function handler(
  request: Request,
  response: Response,
  decoded: { email: string }
): Promise<NextResponse<IApiResponse | IErrorResponse>> {
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
      isExisted.password
    );
    if (isOldPassword) {
      return handleError(
        new Error("Choose a password you have not used before"),
        HttpStatus.BAD_REQUEST
      );
    }
    const hashedPassword: string = bcrypt.hashSync(payload.password, 10);
    isExisted.password = hashedPassword;
    await isExisted.save();
    return ApiJsonResponse("Password has be updated", HttpStatus.OK);
  } catch (error) {
    console.error("🚀 ~ PATCH ~ error:", error);
    return handleError(error, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

export const PATCH = authenticateJWT(handler);
