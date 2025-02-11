import { IErrorResponse } from "@/types";
import { NextResponse } from "next/server";

export function handleError(
  error: Error | { message: string } | unknown,
  statusCode: number = 500
): NextResponse<IErrorResponse> {
  const defaultMessage = "An unexpected error occurred.";
  let errorMessage: string;
  if (error instanceof Error) {
    errorMessage = error.message;
  } else if (
    typeof error === "object" &&
    error !== null &&
    "message" in error
  ) {
    errorMessage = (error as { message: string }).message;
  } else {
    errorMessage = defaultMessage;
  }

  const errorResponse: IErrorResponse = {
    success: false,
    message: errorMessage,
    error: error instanceof Error ? error : { message: errorMessage },
    statusCode,
  };

  return NextResponse.json(errorResponse, {
    status: statusCode,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
