import dbConnect from "@/config/dbConnect";
import { UserModel } from "@/schema/users";
import { JwtGenerator } from "@/utils/JwtGenerator";
import { SignUpFormSchema } from "@/zod";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcrypt";
import { IUsersSchema } from "@/types";
import { cookies } from "next/headers";
import { handleError } from "@/utils/ErrorHandler";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { HttpStatus, ResponseMessages } from "@/constant";
type SignUpFormSchemaType = z.infer<typeof SignUpFormSchema>;
/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: Create a new user account
 *     description: Register a new user with an email and password. Returns a JWT token and user details.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "john@example.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Account successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Account Successfully Created"
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "60c72b2f5f1b2c001c8e4d6c"
 *                     name:
 *                       type: string
 *                       example: "John Doe"
 *                     email:
 *                       type: string
 *                       example: "john@example.com"
 *       400:
 *         description: Bad request - Validation error or user already exists
 *       500:
 *         description: Internal server error
 */
export async function POST(request: NextRequest) {
  try {
    const payload: SignUpFormSchemaType = await request.json();
    const validatedData = SignUpFormSchema.safeParse(payload);
    if (!validatedData.success) {
      return handleError(
        new Error(validatedData.error.errors[0].message),
        "",
        HttpStatus.BAD_REQUEST
      );
    }
    await dbConnect();
    const isExisted: IUsersSchema | null = await UserModel.findOne({
      email: payload.email,
    });
    if (!!isExisted) {
      return handleError(
        new Error(ResponseMessages.USER_ALREADY_EXISTS),
        "",
        HttpStatus.UNAUTHORIZED
      );
    }

    const hashPassword: string = bcrypt.hashSync(payload.password, 10);
    const NewUsers: IUsersSchema = new UserModel({
      ...payload,
      password: hashPassword,
    });
    const token: string = JwtGenerator({ email: NewUsers.email });
    NewUsers.password = hashPassword;
    const cookieStore: ReadonlyRequestCookies = await cookies();
    cookieStore.set("token", token, { secure: true, httpOnly: true });
    cookieStore.set("userId", String(NewUsers?._id), {
      secure: true,
      httpOnly: true,
    });
    const user: IUsersSchema = await NewUsers.save();
    return NextResponse.json(
      { message: ResponseMessages.SIGN_UP_SUCCESS, user: user },
      {
        status: HttpStatus.CREATED,
      }
    );
  } catch (error: unknown) {
    return handleError(
      error,
      ResponseMessages.INTERNAL_SERVER_ERROR,
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
}
