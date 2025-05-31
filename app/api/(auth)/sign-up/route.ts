import { dbConnect, redis } from "@/config";
import { JwtGenerator } from "@/utils/JwtGenerator";
import { SignUpFormSchema } from "@/zod";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcrypt";
import {
  IApiResponse,
  IErrorResponse,
  IUserSignInResponse,
  IUsersSchema,
} from "@/types";
import { cookies } from "next/headers";
import { handleError } from "@/utils/ErrorHandler";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { HttpStatus, ResponseMessages } from "@/constant";
import { ApiJsonResponse, PayloadErrorFormat } from "@/utils";
import { authHelpers, cachedUser } from "../_utils";
import { UserModel } from "@/schema";

type SignUpFormSchemaType = z.infer<typeof SignUpFormSchema>;
/**
 * @swagger
 * /sign-up:
 *   post:
 *     summary: Create a new user account
 *     description: Register a new user with an email and password. Returns a JWT token and user details.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "john@example.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Account successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Account Successfully Created"
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "60c72b2f5f1b2c001c8e4d6c"
 *                     name:
 *                       type: string
 *                       example: "John Doe"
 *                     email:
 *                       type: string
 *                       example: "john@example.com"
 *       400:
 *         description: Bad request - Validation error or user already exists
 *       500:
 *         description: Internal server error
 */
export async function POST(
  request: NextRequest
): Promise<NextResponse<IErrorResponse> | IApiResponse> {
  try {
    const payload: SignUpFormSchemaType = await request.json();

    const isOAuth =
      payload.authProvider === "google" || payload.authProvider === "github";
    console.log("🚀 ~ isOAuth:", isOAuth);
    if (isOAuth) {
      const isCachedUser: string | null = await redis.get(payload.email);
      console.log("🚀 ~ isCachedUser:", isCachedUser);
      if (isCachedUser) {
        return cachedUser(isCachedUser);
      }
      await dbConnect();
      const isExisted: IUsersSchema | null = await UserModel.findOne({
        email: payload.email,
      });
      if (!!isExisted) {
        return authHelpers(isExisted, "sign-in");
      } else {
        const NewUsers: IUsersSchema = new UserModel({
          ...payload,
        });
        const user: IUsersSchema = await NewUsers.save();
        return authHelpers(user, "sign-up");
      }
    }

    const isValidPayload = SignUpFormSchema.safeParse(payload);
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
    await dbConnect();
    const isExisted: IUsersSchema | null = await UserModel.findOne({
      email: payload.email,
    });
    if (!!isExisted) {
      return handleError(
        new Error(ResponseMessages.USER_ALREADY_EXISTS),
        HttpStatus.UNAUTHORIZED
      );
    }
    const hashPassword: string = bcrypt.hashSync(payload.password, 10);
    const NewUsers: IUsersSchema = new UserModel({
      ...payload,
      password: hashPassword,
    });
    const token: string = JwtGenerator({ email: NewUsers.email });
    NewUsers.password = hashPassword;
    const cookieStore: ReadonlyRequestCookies = await cookies();
    cookieStore.set("token", token, { secure: true, httpOnly: true });
    cookieStore.set("userId", String(NewUsers?._id), {
      secure: true,
      httpOnly: true,
    });
    const user: IUsersSchema = await NewUsers.save();
    const userResponse: IUserSignInResponse = {
      id: user._id,
      name: user.firstname + " " + user.lastname,
      email: user.email,
      profilePicture: user.profilePicture,
      role: user.role,
      isActive: user.isactive,
      status: user.status,
    };

    redis.setex(userResponse.email, 60 * 60 * 1, JSON.stringify(userResponse));

    return ApiJsonResponse(
      ResponseMessages.SIGN_UP_SUCCESS,
      HttpStatus.CREATED,
      userResponse
    );
  } catch (error: unknown) {
    console.log("🚀 ~ error:", error);
    return handleError(error, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
