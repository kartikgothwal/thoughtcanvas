// types/next-auth.d.ts
import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      firstname: string;
      lastname: string;
      email: string;
      image: string;
      refreshToken?: string;
    };
  }

  interface User extends DefaultUser {
    firstname: string;
    lastname: string;
    accessToken?: string;
    refreshToken?: string;
  }
}
