import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
export async function POST(request: NextRequest) {
  try {
    const headers = request.headers;
    const authorizationToken: string | undefined = headers
      .get("Authorization")
      ?.split(" ")[1];
    if (!authorizationToken) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    if (!process.env.NEXT_JWT_PUBLIC_KEY) {
      throw new Error("Missing public key in environment variables.");
    }
    const isValidToken = jwt.verify(
      authorizationToken,
      process.env.NEXT_JWT_PUBLIC_KEY,
      {
        algorithms: ["RS256"],
      }
    );

    return NextResponse.json(
      {
        success: true,
        message: "Token is valid.",
        user: isValidToken, // This contains the decoded payload of the JWT
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.log("🚀 ~ VerifyJwtToken ~ error:", error);
  }
}
