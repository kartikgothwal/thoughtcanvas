import { IErrorResponse } from "@/types";
import { NextResponse } from "next/server";

// In handleError function
export function handleError(
  error: Error | { message: string } | unknown,
  statusCode: number = 500
): NextResponse<IErrorResponse> {
  const defaultMessage = "An unexpected error occurred.";
  let errorMessage: string;
  let errorDetails: { name?: string; message: string; stack?: string };

  if (error instanceof Error) {
    errorMessage = error.message;
    errorDetails = {
      name: error.name,
      message: error.message,
      // Optionally include stack in development
      ...(process.env.NODE_ENV === 'development' && { stack: error.stack }),
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
    statusCode,
  };

  return NextResponse.json(errorResponse, {
    status: statusCode,
    headers: {
      "Content-Type": "application/json",
    },
  });
}