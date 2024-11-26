import { NextResponse } from "next/server";

export const expertError = (error: any) => {
  const status: number = error.status || 500;
  let message: string;

  switch (status) {
    case 500:
      message = "Something went wrong!!";
      break;
    case 401:
      message = error.message || "Unauthorized Access";
      break;
    case 404:
      message = error.message || "Not Found";
      break;
    default:
      message = error.message || "Something went wrong!!";
  }

  return new NextResponse(JSON.stringify({ error: message }), {
    status: status,
    headers: { "Content-Type": "application/json" },
  });
};
