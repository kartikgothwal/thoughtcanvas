import dbConnect from "@/config/dbConnect";
import { UserModel } from "@/schema/users";
import { JwtGenerator } from "@/utils/JwtGenerator";
import { handleError } from "@/utils/ErrorHandler";
import { SignInFormSchema } from "@/zod";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcrypt";
import { HttpStatus, ResponseMessages } from "@/constant";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { IUserSignInResponse, IUsersSchema } from "@/types";
import { ApiJsonResponse } from "@/utils";

type SignInSchema = z.infer<typeof SignInFormSchema>;
export async function POST(request: Request) {
  try {
    const payload: SignInSchema = await request.json();
    const isValidPayload = SignInFormSchema.safeParse(payload);
    if (!isValidPayload.success) {
      return handleError(
        new Error(isValidPayload.error.errors[0].message),
        HttpStatus.BAD_REQUEST
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
    const token: string = JwtGenerator({ email: isExisted.email });
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

    return ApiJsonResponse(
      ResponseMessages.SIGN_IN_SUCCESS,
      HttpStatus.CREATED,
      userResponse
    );
  } catch (error) {
    return handleError(error, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
