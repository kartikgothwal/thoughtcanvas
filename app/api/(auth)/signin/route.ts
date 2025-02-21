import dbConnect from "@/config/dbConnect";
import { UserModel } from "@/schema/users";
import { handleError, JwtGenerator } from "@/utils";
import { SignInFormSchema } from "@/zod";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcrypt";

type SignInSchema = z.infer<typeof SignInFormSchema>;
export async function POST(request: Request) {
  try {
    const payload: SignInSchema = await request.json();
    const validatedData = SignInFormSchema.safeParse(payload);
    if (!validatedData.success) {
      return handleError(
        new Error(validatedData.error.errors[0].message),
        "",
        401
      );
    }
    await dbConnect();
    const isExisted = await UserModel.findOne({ email: payload.email });
    if (!isExisted) {
      return handleError(
        new Error("User with this email doesn't exits"),
        "",
        404
      );
    }
    const isPasswordValid: boolean = await bcrypt.compare(
      payload.password,
      isExisted.password
    );
    if (!isPasswordValid) {
      return handleError(new Error("Password doesn't Match"), "", 401);
    }
    const token: string = JwtGenerator({ email: isExisted.email });
    const cookieStore = await cookies();
    cookieStore.set("token", token, { secure: true, httpOnly: true });
    cookieStore.set("userId", String(isExisted._id), {
      secure: true,
      httpOnly: true,
    });
    return NextResponse.json(
      { message: "Successfully Logged In", user: isExisted },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("🚀 ~ POST ~ error:", error);
    return handleError(error, "Internal Server Error");
  }
}
