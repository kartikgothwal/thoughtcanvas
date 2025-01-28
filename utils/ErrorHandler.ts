import { NextRequest, NextResponse } from "next/server";

// Error handling middleware
export function handleError(
  request: NextRequest,
  error: { message: string },
  statusCode: number
) {
  console.log("🚀 ~ error:", error.message);
  console.log("🚀 ~ statusCode:", statusCode);
  const errorMessage = "An unexpected error occurred.";
  return NextResponse.json(
    {
      success:false,
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
