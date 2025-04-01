import { NextResponse } from "next/server";

export function ApiJsonResponse(
  message: string,
  statusCode: number,
  data?: any
) {
  return NextResponse.json(
    { message: message, data: data, success: true },
    {
      status: statusCode,
    }
  );
}
