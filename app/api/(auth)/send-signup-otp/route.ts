import { dbConnect, redis } from "@/config";
import { HttpStatus, ResponseMessages } from "@/constant";
import { UserModel } from "@/schema";
import { ApiJsonResponse, handleError } from "@/utils";
import { generateOTP } from "../_utils";
import path from "path";
import fs from "fs";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    dbConnect();
    const isExisted = await UserModel.findOne({
      email: payload.email,
    });
    if (!!isExisted) {
      return handleError(
        new Error(ResponseMessages.USER_ALREADY_EXISTS),
        HttpStatus.UNAUTHORIZED
      );
    }
    const otp: string = generateOTP(6);
    redis.set(`sign-up-otp:${payload.email}`, otp, "EX", 300);
    const emailTemplatePath: string = path.join(
      process.cwd(),
      "/assets/template/otp-verification.html"
    );
    let emailTemplate: string = fs.readFileSync(emailTemplatePath, "utf-8");
    const userName = `${isExisted.firstname} ${isExisted.lastname}`;
    emailTemplate = emailTemplate
      .replace("{{OTP_CODE}}", otp)
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

    return ApiJsonResponse("OTP sent to your email", HttpStatus.OK);
  } catch (error: unknown) {
    console.log("🚀 ~ POST ~ error:", error);
    return handleError(
      new Error(error instanceof Error ? error.message : String(error)),
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
}
