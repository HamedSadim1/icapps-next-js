import NextAuth, { User as NextAuthUser } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

interface GoogleProfile {
  email_verified: boolean;
  email: string;

}

interface Account {
  provider: string;
}

interface CustomUser extends NextAuthUser {
  emailVerified: boolean;
}

export const authOption = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  // authOptions: {
  //   async signIn(account: Account, profile: GoogleProfile) {
  //     if (
  //       account.provider === "google" &&
  //       profile.email.endsWith("@icapps.be")
  //     ) {
  //       return profile.email_verified;
  //     }
  //     return false;
  //   },
  // },
};

const handler = NextAuth(authOption);

export { handler as GET, handler as POST };
