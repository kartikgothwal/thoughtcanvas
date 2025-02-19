import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const payload = await request.json();
  console.log("🚀 ~ POST ~ payload:", payload);
  return NextResponse.json({ payload: payload });
}
