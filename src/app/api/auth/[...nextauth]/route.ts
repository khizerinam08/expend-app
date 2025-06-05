import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// 1. Define authOptions
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
};

// 2. Pass it to NextAuth
const handler = NextAuth(authOptions);

// 3. Export handler for GET and POST requests
export { handler as GET, handler as POST };


