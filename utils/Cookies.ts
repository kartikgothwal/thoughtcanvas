"use server";

import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { cookies } from "next/headers";

export async function getCookies(name: string): Promise<string | undefined> {
  const cookieHeader: ReadonlyRequestCookies = await cookies();
  const data: string | undefined = cookieHeader.get(name)?.value;
  return data;
}
export async function deleteCookies(name: string): Promise<void> {
  const cookieHeader: ReadonlyRequestCookies = await cookies();
  if (name.toLowerCase() == "all") {
    const allCookies: RequestCookie[] = cookieHeader.getAll();
    allCookies.forEach((item: RequestCookie) => {
      cookieHeader.delete(item.name);
    });
  } else {
    cookieHeader.delete(name);
  }
}
