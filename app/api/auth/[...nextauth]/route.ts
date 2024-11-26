import NextAuth from "next-auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import client from "../../../../lib/db";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { Users } from "@/schemas/users";
import { DbConnect } from "@/config/dbConnect";
import { generateJwtToken } from "@/utils";
import { Adapter } from "next-auth/adapters";
const handler: any = NextAuth({
  adapter: MongoDBAdapter(client) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }): Promise<boolean> {
      if (account?.provider === "google" || account?.provider === "github") {
        await DbConnect();

        try {
          const existingUser = await Users.findOne({ email: user.email });

          if (!existingUser) {
            const [firstname, lastname] = user?.name?.split(" ") || ["", ""];
            const { name, ...userDataWithoutName } = user;

            const newUser = new Users({
              ...userDataWithoutName,
              firstname,
              lastname,
            });

            const token = await generateJwtToken(user.email as string);
            newUser.accessToken = token.Accesstoken;
            user.refreshToken = token.RefreshToken;
            await newUser.save();
            return true;
          } else {
            return true;
          }
        } catch (error: any) {
          console.error("Error during signIn callback:", error);
          return false;
        }
      }
      return true;
    },

    async session({ session, user, token }) {
      // console.log("🚀 ~ session ~ session:", token);
      // console.log("🚀 ~ session ~ user:", user);
      session.user.refreshToken = user.refreshToken || "";
      session.user.firstname = user?.firstname ?? "";
      session.user.lastname = user?.lastname ?? "";

      return session;
    },
  },
});
export { handler as GET, handler as POST };
