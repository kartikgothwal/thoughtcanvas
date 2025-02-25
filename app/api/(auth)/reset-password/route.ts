import { handleError } from "@/utils";
import { NextRequest } from "next/server";

export async function PATCH(request: NextRequest) {
  try {
    return request;
  } catch (error) {
    console.error("🚀 ~ PATCH ~ error:", error);
    return handleError(error, "Internal Server Error");
  }
}
