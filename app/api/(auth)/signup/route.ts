import dbConnect from "@/config/dbConnect";
import { UserModel } from "@/schema/users";
import { jwtKeysGenerator } from "@/utils/jwt-generator";
import { SignUpFormSchema } from "@/zod";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcrypt";
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
    const isExisted = await UserModel.findOne({ email: payload.email });
    if (!!isExisted) {
      return NextResponse.json(
        { message: "User with this email already exits" },
        {
          status: 400,
        }
      );
    }
    const NewUsers = new UserModel(payload);
    const token: string = await jwtKeysGenerator(NewUsers.email);
    const hashPassword = await bcrypt.hashSync(NewUsers.password, 10);
    NewUsers.password = hashPassword;
    return NextResponse.json(
      { message: "Account Successfully Created", user: NewUsers },
      {
        status: 201,
      }
    );
  } catch (error: unknown) {
    console.log("🚀 ~ POST ~ error:", error);
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "Internal Server Error",
        error: error instanceof Error ? error : "Unknown error",
      },
      { status: 500 }
    );
  }
}
