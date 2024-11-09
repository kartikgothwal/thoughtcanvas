import { NextResponse } from "next/server";

export async function POST(request: Request):Promise<any> {
  const data = await request.json();
  console.log(data);
  return NextResponse.json({ message: "Data", data: data });
}
