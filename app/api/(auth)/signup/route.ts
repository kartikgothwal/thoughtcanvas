import { UserModel } from "@/schema/users";
import { SignUpFormSchema } from "@/zod";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

type SignUpFormSchemaType = z.infer<typeof SignUpFormSchema>;

export async function POST(request: NextRequest) {
  try {
    const payload: SignUpFormSchemaType = await request.json();
    const validatedData = SignUpFormSchema.safeParse(payload);
    if (!validatedData.success) {
      return NextResponse.json(
        { error: validatedData.error.errors[0] },
        {
          status: 400,
        }
      );
    }
    const isExisted = await UserModel.find({ email: payload.email });
    console.log("🚀 ~ POST ~ isExisted:", isExisted);
    return new Response("hello world");
  } catch (error: unknown) {
    console.log("🚀 ~ POST ~ error:", error);
    return NextResponse.json(
      {
        message: "error happened",
        errors: error ? error : "internal server error",
      },
      { status: 500 }
    );
  }
}
