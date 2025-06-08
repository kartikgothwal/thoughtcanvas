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
import {
  HttpStatus,
  ResponseMessages,
  WINDOW_SIZE_IN_SECONDS,
} from "@/constant";
import { ApiJsonResponse, PayloadErrorFormat } from "@/utils";
import { authHelpers } from "../_utils";
import { UserModel } from "@/schema";
import { rateLimit } from "@/lib/rateLimit";

type SignUpFormSchemaType = z.infer<typeof SignUpFormSchema>;
/**
 * @swagger
 * /sign-up:
 *   post:
 *     summary: Register a new user or sign in an existing OAuth user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               firstname:
 *                 type: string
 *                 example: John
 *               lastname:
 *                 type: string
 *                 example: Doe
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: SecurePassword123!
 *               authProvider:
 *                 type: string
 *                 enum: [local, google, github]
 *                 example: local
 *               profilePicture:
 *                 type: string
 *                 format: uri
 *                 example: https://example.com/profile.jpg
 *               role:
 *                 type: string
 *                 example: user
 *     responses:
 *       201:
 *         description: User successfully registered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Sign up successful
 *                 statusCode:
 *                   type: integer
 *                   example: 201
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 64e0c0f9b9b1234567890abc
 *                     name:
 *                       type: string
 *                       example: John Doe
 *                     email:
 *                       type: string
 *                       format: email
 *                       example: user@example.com
 *                     profilePicture:
 *                       type: string
 *                       format: uri
 *                       example: https://example.com/profile.jpg
 *                     role:
 *                       type: string
 *                       example: user
 *                     isActive:
 *                       type: boolean
 *                       example: true
 *                     status:
 *                       type: string
 *                       example: active
 *       400:
 *         description: Invalid request body or validation errors
 *       401:
 *         description: User already exists
 *       429:
 *         description: Too many requests, rate limit exceeded
 *       500:
 *         description: Internal server error
 */

export async function POST(
  request: NextRequest
): Promise<NextResponse<IErrorResponse> | IApiResponse> {
  try {
    const payload: SignUpFormSchemaType = await request.json();
    const ip: string | null =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("remote-addr");

    const isLimitReached: boolean = await rateLimit({
      identifier: ip!,
      maxRequest: 3,
      windowSizeInSeconds: WINDOW_SIZE_IN_SECONDS,
    });

    if (!isLimitReached) {
      return handleError(
        new Error(ResponseMessages.TOO_MANY_REQUESTS),
        HttpStatus.TOO_MANY_REQUESTS
      );
    }
    const isOAuth =
      payload.authProvider === "google" || payload.authProvider === "github";
    if (isOAuth) {
      // const isCachedUser: string | null = await redis.get(payload.email);
      // if (isCachedUser) {
      //   return cachedUser(isCachedUser);
      // }
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
