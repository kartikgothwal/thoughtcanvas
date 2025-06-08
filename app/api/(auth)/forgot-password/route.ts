import { UserModel } from "@/schema/users";
import { JwtGenerator } from "@/utils/JwtGenerator";
import { handleError } from "@/utils";
import { ForgotPasswordSchema } from "@/zod";
import { z } from "zod";
import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import { IApiResponse, IErrorResponse, IUsersSchema } from "@/types";
import fs from "fs";
import path from "path";
import {
  HttpStatus,
  WINDOW_SIZE_IN_SECONDS,
  ResponseMessages,
} from "@/constant";
import { ApiJsonResponse, PayloadErrorFormat } from "@/utils";
import { NextResponse } from "next/server";
import { dbConnect } from "@/config";
import { rateLimit } from "@/lib/rateLimit";

type ForgotPasswordType = z.infer<typeof ForgotPasswordSchema>;

export async function POST(
  request: Request
): Promise<NextResponse<IErrorResponse> | IApiResponse> {
  try {
    const payload: ForgotPasswordType = await request.json();
    const isValidPayload = ForgotPasswordSchema.safeParse(payload);
    if (!isValidPayload.success) {
      const errors:
        | {
            message: string;
          }[]
        | undefined = PayloadErrorFormat(isValidPayload);
      return handleError(
        new Error(
          errors?.[0]?.message || ResponseMessages.UNKNOWN_ERROR_OCCURRED
        ),
        HttpStatus.BAD_REQUEST
      );
    }
    await dbConnect();
    const isExisted: IUsersSchema | null = await UserModel.findOne({
      email: payload.email,
    });
    if (!isExisted) {
      return handleError(
        new Error(ResponseMessages.USER_NOT_FOUND),
        HttpStatus.NOT_FOUND
      );
    }
    const ip: string | null =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("remote-addr");

    let isLimitReached: boolean = await rateLimit({
      identifier: ip ? ip : (isExisted._id as string),
      maxRequest: 3,
      windowSizeInSeconds: WINDOW_SIZE_IN_SECONDS,
    });
    if (!isLimitReached) {
      return handleError(
        new Error(ResponseMessages.TOO_MANY_REQUESTS),
        HttpStatus.TOO_MANY_REQUESTS
      );
    }
    const token: string = JwtGenerator(
      { email: isExisted.email, id: isExisted._id },
      "10m"
    );
    const resetLink: string = `${process.env.NEXT_PUBLIC_APP_URL}/forgot-password/${token}`;
    const emailTemplatePath: string = path.join(
      process.cwd(),
      "/assets/template/forgot-password.html"
    );
    let emailTemplate: string = fs.readFileSync(emailTemplatePath, "utf-8");
    const userName = `${isExisted.firstname} ${isExisted.lastname}`;
    emailTemplate = emailTemplate
      .replace("{{RESET_LINK}}", resetLink)
      .replace(/{{USER_NAME}}/g, userName);
    const transporter: nodemailer.Transporter<
      SMTPTransport.SentMessageInfo,
      SMTPTransport.Options
    > = nodemailer.createTransport({
      service: "gmail",
      port: 465,
      secure: true,
      auth: {
        user: process.env.NODEMAILER_AUTH_USER,
        pass: process.env.NODEMAILER_AUTH_PASSWORD,
      },
    });
    const mailOptions = {
      from: "donotreply.thoughtcanvas.com",
      to: isExisted.email,
      subject: "ThoughtCanvas: Reset Password",
      html: emailTemplate,
    };
    await transporter.sendMail(mailOptions);

    return ApiJsonResponse(
      "Link to Reset you password is sent to your email",
      HttpStatus.OK
    );
  } catch (error: unknown) {
    console.log("🚀 ~ POST ~ error:", error);
    return handleError(
      new Error(error instanceof Error ? error.message : String(error)),
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
}
