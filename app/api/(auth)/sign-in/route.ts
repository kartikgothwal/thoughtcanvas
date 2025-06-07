import { dbConnect, redis } from "@/config";
import { UserModel } from "@/schema/users";
import { SignInFormSchema } from "@/zod";
import { z } from "zod";
import bcrypt from "bcrypt";
import {
  HttpStatus,
  ResponseMessages,
  WINDOW_SIZE_IN_SECONDS,
} from "@/constant";
import { IApiResponse, IErrorResponse, IUsersSchema } from "@/types";
import { handleError } from "@/utils";
import { NextResponse } from "next/server";
import { rateLimit } from "@/lib/rateLimit";
import { authHelpers, cachedUser } from "../_utils";

type SignInSchema = z.infer<typeof SignInFormSchema>;

export async function POST(
  request: Request
): Promise<NextResponse<IErrorResponse> | IApiResponse> {
  try {
    const payload: SignInSchema = await request.json();

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
    return authHelpers(isExisted, "sign-in");
  } catch (error) {
    return handleError(error, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
