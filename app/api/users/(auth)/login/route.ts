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
    await DbConnect();
    const data: userPayload = await request.json();
    console.log("🚀 ~ POST ~ data:", data);
    if (!data.providerSignIn) {
      const isPresent = await Users.findOne({ email: data.email });
      if (!isPresent) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }
    }
    const newUser = await Users.create(data);
    console.log("🚀 ~ POST ~ newUser:", newUser);
    const token = generateJwtToken(data.email);
    console.log("🚀 ~ POST ~ token:", token);

    return NextResponse.json({ isPresent: "isPresent" }, { status: 200 });
  } catch (error) {
    (error as { status: number }).status = 500;
    expertError(error);
    // NextResponse.json({ error }, { status: 500 });
  }
};
