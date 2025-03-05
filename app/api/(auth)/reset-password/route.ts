import { handleError } from "@/utils/ErrorHandler";
import { NextResponse } from "next/server";

export async function PATCH(request: Request) {
  try {
    const payload = await request.json();
    return NextResponse.json({ message: "Reset Password" });
  } catch (error) {
    console.error("🚀 ~ PATCH ~ error:", error);
    return handleError(error, "Internal Server Error");
  }
}
