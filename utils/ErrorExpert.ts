import { NextResponse } from "next/server";

export const expertError = (error: any) => {
  const status: number = error.status || 500;
  let message;

  if (status === 500) {
    message = "Something went wrong!!";
  } else if (status === 401) {
    message = error.message || "Unauthorized Access";
  } else if (status === 404) {
    message = error.message || "Not Found";
  } else {
    message = error.message || "Something went wrong!!";
  }
  return new NextResponse(JSON.stringify({ message: message }), {
    status: status,
  });
};
