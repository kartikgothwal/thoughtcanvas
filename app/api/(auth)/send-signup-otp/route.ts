import { dbConnect, redis } from "@/config";
import { HttpStatus, ResponseMessages } from "@/constant";
import { UserModel } from "@/schema";
import { handleError } from "@/utils";
import { generateOTP } from "../_utils";

export async function POST(request: Request) {
  const payload = await request.json();
  dbConnect();
  const isExisted = await UserModel.findOne({
    email: payload.email,
  });
  if (!!isExisted) {
    return handleError(
      new Error(ResponseMessages.USER_ALREADY_EXISTS),
      HttpStatus.UNAUTHORIZED
    );
  }
  const otp: number = generateOTP(6);
  redis.set(`otp:${payload.email}`, otp, "EX", 300);
}
