import { HttpStatus, ResponseMessages } from "@/constant";
import { IErrorResponse } from "@/types";
import { NextResponse } from "next/server";

export function handleError(
  error: Error | unknown,
  statusCode: number = HttpStatus.INTERNAL_SERVER_ERROR
): NextResponse<IErrorResponse> {
  const defaultMessage: string = ResponseMessages.UNEXPECTED_ERROR;
  let errorMessage: string;
  let errorDetails: { name?: string; message: string };

  if (error instanceof Error) {
    errorMessage = error.message;
    errorDetails = {
      name: error.name,
      message: error.message,
    };
  } else if (
    typeof error === "object" &&
    error !== null &&
    "message" in error
  ) {
    errorMessage = (error as { message: string }).message;
    errorDetails = { message: errorMessage };
  } else {
    errorMessage = defaultMessage;
    errorDetails = { message: defaultMessage };
  }

  const errorResponse: IErrorResponse = {
    success: false,
    message: errorMessage,
    error: errorDetails,
    code: statusCode,
  };

  return NextResponse.json(errorResponse, {
    status: statusCode,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
