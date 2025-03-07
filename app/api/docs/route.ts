import { NextResponse } from "next/server";
import swaggerSpec from "@/lib/swagger";
export async function GET(): Promise<NextResponse<object>> {
  return NextResponse.json(swaggerSpec);
}
