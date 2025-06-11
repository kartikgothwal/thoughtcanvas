import { cookies } from "next/headers";
import { JwtGenerator } from "@/utils/JwtGenerator";
import { redis } from "@/config";
import { IUsersSchema, IUserSignInResponse } from "@/types";
import { ApiJsonResponse } from "@/utils";
import { HttpStatus, ResponseMessages } from "@/constant";

export default async function authHelpers(user: IUsersSchema, method: string) {
  const token = JwtGenerator({
    email: user.email,
    expiresIn: "1d",
  });

  const cookieStore = await cookies();
  cookieStore.set("token", token, { secure: true, httpOnly: true });
  cookieStore.set("userId", String(user._id), { secure: true, httpOnly: true });

  const userResponse: IUserSignInResponse = {
    id: user._id,
    name: `${user.firstname} ${user.lastname}`,
    email: user.email,
    profilePicture: user.profilePicture,
    role: user.role,
    isActive: user.isactive,
    status: user.status,
  };

  await redis.setex(user.email, 60 * 60 * 1, JSON.stringify(userResponse));

  return ApiJsonResponse(
    method === "sign-in"
      ? ResponseMessages.SIGN_IN_SUCCESS
      : ResponseMessages.SIGN_UP_SUCCESS,
    HttpStatus.OK,
    userResponse
  );
}
