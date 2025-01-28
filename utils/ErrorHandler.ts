import { NextRequest, NextResponse } from "next/server";

// Error handling middleware
export function handleError(
  request: NextRequest,
  error: unknown,
  statusCode: number = 500
) {
  const errorMessage = "An unexpected error occurred.";
  return new NextResponse(
    JSON.stringify({
      message:
        error instanceof Error ? error.message : error ?? errorMessage,
      error,
    }),
    {
      status: statusCode,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
