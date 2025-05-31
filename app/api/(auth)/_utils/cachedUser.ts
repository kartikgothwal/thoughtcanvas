import { HttpStatus, ResponseMessages } from "@/constant";
import { IUserSignInResponse } from "@/types";
import { ApiJsonResponse } from "@/utils";
import { JwtGenerator } from "@/utils/JwtGenerator";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { cookies } from "next/headers";

export async function cachedUser(isCachedUser:string) {
  const parsedUser: IUserSignInResponse = JSON.parse(isCachedUser);
  const token: string = JwtGenerator({
    email: parsedUser.email,
    expiresIn: "1d",
  });
  const cookieStore: ReadonlyRequestCookies = await cookies();
  cookieStore.set("token", token, { secure: true, httpOnly: true });
  cookieStore.set("userId", String(parsedUser.id), {
    secure: true,
    httpOnly: true,
  });
  return ApiJsonResponse(
    ResponseMessages.SIGN_IN_SUCCESS,
    HttpStatus.OK,
    JSON.parse(isCachedUser)
  );
}
