import { dbConnect, redis } from "@/config";
import { UserModel } from "@/schema/users";
import { JwtGenerator } from "@/utils/JwtGenerator";
import { SignInFormSchema } from "@/zod";
import { cookies } from "next/headers";
import { z } from "zod";
import bcrypt from "bcrypt";
import {
  HttpStatus,
  ResponseMessages,
  WINDOW_SIZE_IN_SECONDS,
} from "@/constant";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import {
  IApiResponse,
  IErrorResponse,
  IUserSignInResponse,
  IUsersSchema,
} from "@/types";
import { ApiJsonResponse, handleError } from "@/utils";
import { NextResponse } from "next/server";
import { rateLimit } from "@/lib/rateLimit";
import { cachedUser } from "../_utils";

type SignInSchema = z.infer<typeof SignInFormSchema>;

export async function POST(
  request: Request
): Promise<NextResponse<IErrorResponse> | IApiResponse> {
  try {
    const payload: SignInSchema  = await request.json();
    console.log("🚀 ~ payload:", payload);
    const isValidPayload = SignInFormSchema.safeParse(payload);
    if (!isValidPayload.success) {
      return handleError(
        new Error(isValidPayload.error.errors[0].message),
        HttpStatus.BAD_REQUEST
      );
    }
    const isCachedUser: string | null = await redis.get(payload.email);
    if (isCachedUser) {
      return cachedUser(isCachedUser);
    }

    await dbConnect();
    const isExisted: IUsersSchema | null = await UserModel.findOne({
      email: payload.email,
    });
    if (!isExisted) {
      return handleError(
        new Error(ResponseMessages.USER_NOT_FOUND),
        HttpStatus.NOT_FOUND
      );
    }
    const ip: string | null =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("remote-addr");

    const isLimitReached: boolean = await rateLimit({
      identifier: ip ? ip : (isExisted._id as string),
      maxRequest: 3,
      windowSizeInSeconds: WINDOW_SIZE_IN_SECONDS,
    });

    if (!isLimitReached) {
      return handleError(
        new Error(ResponseMessages.TOO_MANY_REQUESTS),
        HttpStatus.TOO_MANY_REQUESTS
      );
    }
    const isPasswordValid: boolean = await bcrypt.compare(
      payload.password,
      isExisted.password
    );
    if (!isPasswordValid) {
      return handleError(
        new Error(ResponseMessages.PASSWORD_DOESNT_MATCH),
        HttpStatus.UNAUTHORIZED
      );
    }
    const token: string = JwtGenerator({
      email: isExisted.email,
      expiresIn: "1d",
    });
    const cookieStore: ReadonlyRequestCookies = await cookies();
    cookieStore.set("token", token, { secure: true, httpOnly: true });
    cookieStore.set("userId", String(isExisted._id), {
      secure: true,
      httpOnly: true,
    });
    const userResponse: IUserSignInResponse = {
      id: isExisted._id,
      name: isExisted.firstname + " " + isExisted.lastname,
      email: isExisted.email,
      profilePicture: isExisted.profilePicture,
      role: isExisted.role,
      isActive: isExisted.isactive,
      status: isExisted.status,
    };

    redis.setex(userResponse.email, 60 * 60 * 1, JSON.stringify(userResponse));

    return ApiJsonResponse(
      ResponseMessages.SIGN_IN_SUCCESS,
      HttpStatus.OK,
      userResponse
    );
  } catch (error) {
    return handleError(error, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
