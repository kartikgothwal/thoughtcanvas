import { IUserSignInResponse } from "@/types";
import { NextResponse } from "next/server";

export function ApiJsonResponse(
  message: string,
  statusCode: number,
  data?: IUserSignInResponse | any
) {
  return NextResponse.json(
    { code: statusCode, message, data, success: true },
    {
      status: statusCode,
    }
  );
}
