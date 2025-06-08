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
