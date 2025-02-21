import dbConnect from "@/config/dbConnect";
import { UserModel } from "@/schema/users";
import { handleError, JwtGenerator } from "@/utils";
import { ForgotPasswordSchema } from "@/zod";
import { NextResponse } from "next/server";
import { z } from "zod";
import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import { IUsersSchema } from "@/types";
type ForgotPasswordType = z.infer<typeof ForgotPasswordSchema>;

export async function POST(request: Request) {
  try {
    const payload: ForgotPasswordType = await request.json();
    const isValidPayload = ForgotPasswordSchema.safeParse(payload);
    if (!isValidPayload.success) {
      return handleError(
        new Error(isValidPayload.error.errors[0].message),
        "",
        400
      );
    }
    await dbConnect();
    const isExisted: IUsersSchema | null = await UserModel.findOne({
      email: payload.email,
    });
    if (!isExisted) {
      return handleError(
        new Error("User with this email doesn't exits"),
        "",
        401
      );
    }
    const token: string = JwtGenerator(
      { email: isExisted.email, id: isExisted._id },
      "10m"
    );
    const link: string = `${process.env.NEXT_PUBLIC_APP_URL}/forgot-password/${token}`;
    const transporter: nodemailer.Transporter<
      SMTPTransport.SentMessageInfo,
      SMTPTransport.Options
    > = nodemailer.createTransport({
      host: "gmail",
      port: 465,
      secure: false,
      auth: {
        user: process.env.NODEMAILER_AUTH_USER,
        pass: process.env.NODEMAILER_AUTH_PASSWORD,
      },
    });
    const mailOptions = {
      from: "donotreply.thoughtcanvas.com",
      to: isExisted.email,
      subject: "ThoughtCanvas: Reset Password",
      text: link,
    };
    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        return handleError(
          new Error("Failed to send the password reset mail"),
          "",
          400
        );
      }
    });
    return NextResponse.json({
      message: "Link to Reset you password is sent to your email",
    });
  } catch (error) {
    console.error("🚀 ~ POST ~ error:", error);
    return handleError(error, "Internal Server Error");
  }
}
