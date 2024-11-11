import { NextResponse } from "next/server";
import { Users } from "@/schemas/users";
import { TryCatch } from "@/utils/TryCatch";
import { DbConnect } from "@/config/dbConnect";
type userPayload = {
  id?: string;
  name: string;
  email: string;
  image?: string;
  providerSignIn?: string;
};
export const POST = TryCatch(async (request: Request): Promise<any> => {
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

  return NextResponse.json({ isPresent: "isPresent" }, { status: 200 });
});
