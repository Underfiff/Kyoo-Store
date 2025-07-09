// lib/auth.ts

import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Admin Login",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const adminUsername = process.env.ADMIN_USERNAME;
        const adminPassword = process.env.ADMIN_PASSWORD;

        const isValid =
          credentials?.username === adminUsername &&
          credentials?.password === adminPassword;

        if (isValid) {
          return { id: "1", name: "Admin" };
        }

        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 60 * 60, // 1 jam (dalam detik)
  },
  jwt: {
    maxAge: 60 * 60, // 1 jam juga, sinkron dengan session
  },
  pages: {
    signIn: "/admin/login",
  },
};
