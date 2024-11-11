import NextAuth from "next-auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import client from "../../../../lib/db";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import axios, { AxiosResponse } from "axios";
import { USER_LOGIN } from "@/constant";
const handler: any = NextAuth({
  adapter: MongoDBAdapter(client),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }): Promise<boolean> {
      try {
        console.log("🚀 ~ signIn ~ user:", user);
        const response: AxiosResponse<any> = await axios.post(
          `${process.env.APP_URL}${USER_LOGIN}`,
          {
            ...user,
            providerSignIn:true
          }
        );
        console.log(">>>>", response);
        return true;
      } catch (error) {
        console.error("Error in signIn callback:", error);
        return false;
      }
    },

    //  async session({ session, token, user }) {
    //   // Attach any additional data to the session here
    //   session.user.customData = user.customData || null; // Pass custom data to the session
    //   return session;
    // },
  },
});
export { handler as GET, handler as POST };
