import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const payload = await request.json();
  console.log("🚀 ~ POST ~ payload:", payload);
  return new Response("Hello world");
}
