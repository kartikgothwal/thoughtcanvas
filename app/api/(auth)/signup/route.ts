import dbConnect from "@/config/dbConnect";
import { UserModel } from "@/schema/users";
import { jwtKeysGenerator } from "@/utils/jwt-generator";
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
    await dbConnect();
    const isExisted = await UserModel.findOne({ email: payload.email }, N);
    if (!!isExisted) {
      return NextResponse.json(
        { message: "User with this email already exits" },
        {
          status: 400,
        }
      );
    }
    const NewUsers = new UserModel(payload);
    const  = await jwtKeysGenerator(NewUsers.email)
    return new Response(NewUsers);
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
