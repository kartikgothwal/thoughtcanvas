import {
  SignUpFormSchema,
  SignUpFormSchemaType,
} from "@/components/layout/Signup";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const payload: SignUpFormSchemaType = await request.json();
    const validatedData = await SignUpFormSchema.parseAsync(payload);
    console.log("🚀 ~ POST ~ validatedData:", validatedData);
    return new Response("hello world");
  } catch (error: unknown) {
    return NextResponse.json(
      { message: "Validation failed", errors: error },
      { status: 400 }
    );
  }
}
