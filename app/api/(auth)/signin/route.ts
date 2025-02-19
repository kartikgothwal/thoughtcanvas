import dbConnect from "@/config/dbConnect";
import { UserModel } from "@/schema/users";
import { handleError, JwtGenerator } from "@/utils";
import { SignInFormSchema } from "@/zod";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { z } from "zod";
type SignInSchema = z.infer<typeof SignInFormSchema>;
export async function POST(request: Request) {
  try {
    const payload: SignInSchema = await request.json();
    const validatedData = SignInFormSchema.safeParse(payload);
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
    if (!isExisted) {
      return handleError(
        new Error("User with this email doesn't exits"),
        "",
        404
      );
    }
    const token: string = JwtGenerator(isExisted.email);
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
