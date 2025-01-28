import {  NextResponse } from "next/server";

// Error handling middleware
export function handleError(
  error: { message: string },
  statusCode: number = 500
) {
  const errorMessage = "An unexpected error occurred.";
  return NextResponse.json(
    {
      success: false,
      message:
        error instanceof Error ? error.message : error.message || errorMessage,
      error,
    },
    {
      status: statusCode,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
