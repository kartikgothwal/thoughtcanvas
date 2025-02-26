import { handleError } from "@/utils/ErrorHandler";
import {  NextResponse } from "next/server";

export async function PATCH() {
  try {
    return NextResponse.json({ message: "Reset Password" });
  } catch (error) {
    console.error("🚀 ~ PATCH ~ error:", error);
    return handleError(error, "Internal Server Error");
  }
}
