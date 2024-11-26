import { NextResponse } from "next/server";
import { Users } from "@/schemas/users";
import { TryCatch } from "@/utils/TryCatch";
import { DbConnect } from "@/config/dbConnect";
import { generateJwtToken } from "@/utils/JwtToken";
import Error from "next/error";
import { expertError } from "@/utils/ErrorExpert";
type userPayload = {
  id?: string;
  name: string;
  email: string;
  image?: string;
  providerSignIn?: string;
};
export const POST = async (request: Request): Promise<any> => {
  try {
    return Response.json({ message: "Hello" }, { status: 201 });
  } catch (error) {
    (error as { status: number }).status = 500;
    expertError(error);
  }
};
