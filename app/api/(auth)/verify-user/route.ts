import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
export async function POST(request: NextRequest): Promise<unknown> {
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
    const decodedHeader: any = jwt.decode(authorizationToken, {
      complete: true,
    });
    console.log("🚀 ~ Token Header:", decodedHeader);

    if (!decodedHeader) {
      return NextResponse.json({ message: "Invalid Token" }, { status: 401 });
    }

    const algorithm = decodedHeader.header.alg;
    console.log("🚀 ~ POST ~ algorithm:", algorithm);

    // Handle based on algorithm
    let isValidToken;
    if (algorithm === "RS256") {
      isValidToken = jwt.verify(
        authorizationToken,
        process.env.NEXT_JWT_PUBLIC_KEY,
        {
          algorithms: ["RS256"],
        }
      );
    } else if (algorithm === "HS256") {
      if (!process.env.NEXT_JWT_PUBLIC_KEY) {
        throw new Error("Missing secret key in environment variables.");
      }
      isValidToken = jwt.verify(
        authorizationToken,
        process.env.NEXT_JWT_PUBLIC_KEY,
        {
          algorithms: ["HS256"],
        }
      );
    }
    console.log("🚀 ~ POST ~ isValidToken:", isValidToken);
  } catch (error: unknown) {
    console.log("🚀 ~ VerifyJwtToken ~ error:", error);
  }
}
