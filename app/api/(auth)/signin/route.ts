import dbConnect from "@/config/dbConnect";
import { UserModel } from "@/schema/users";
import { JwtGenerator } from "@/utils/JwtGenerator";
import { handleError } from "@/utils/ErrorHandler";
import { SignInFormSchema } from "@/zod";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcrypt";
import { ERROR_400, ERROR_404, STATUS_CODE_200 } from "@/constant";

type SignInSchema = z.infer<typeof SignInFormSchema>;
export async function POST(request: Request) {
  try {
    const payload: SignInSchema = await request.json();
    const validatedData = SignInFormSchema.safeParse(payload);
    if (!validatedData.success) {
      return handleError(
        new Error(validatedData.error.errors[0].message),
        "",
        ERROR_400
      );
    }
    await dbConnect();
    const isExisted = await UserModel.findOne({ email: payload.email });
    if (!isExisted) {
      return handleError(
        new Error("User with this email doesn't exits"),
        "",
        ERROR_404
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
    const userResponse = {
      id: isExisted._id,
      name: isExisted.firstname + " " + isExisted.lastname,
      email: isExisted.email,
      profilePicture: isExisted.isExisted,
      role: isExisted.role,
      isActive: isExisted.isactive,
      status: isExisted.status,
    };
    return NextResponse.json(
      { message: "Successfully Logged In", user: userResponse },
      {
        status: STATUS_CODE_200,
      }
    );
  } catch (error) {
    console.error("🚀 ~ POST ~ error:", error);
    return handleError(error, "Internal Server Error");
  }
}
