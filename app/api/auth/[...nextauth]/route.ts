// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";

// // export default NextAuth({})

// interface Profile {
//   email_verified: boolean;
//   email: string;
//   // Add other properties if available in the profile object
// }

// interface Account {
//   provider: string;
//   // Add other properties if available in the account object
// }
// export const authOption = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     }),
//   ],
//   pages: {
//     signIn: "/auth/signin",
//   },
//   callbacks: {
//     async signIn({ account, profile }: { account: Account; profile: Profile }) {
//       if (account.provider === "google") {
//         return profile.email_verified && profile.email.endsWith("@icapss.be");
//       }
//       return true;
//     },
//   },
// };

// const handler = NextAuth(authOption);

// export { handler as GET, handler as POST };

import NextAuth, { User as NextAuthUser } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

interface GoogleProfile {
  email_verified: boolean;
  email: string;
  // Add other properties if available in the Google profile object
}

interface Account {
  provider: string;
  // Add other properties if available in the account object
}

interface CustomUser extends NextAuthUser {
  emailVerified: boolean;
  // Add other properties if available in your user object
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
