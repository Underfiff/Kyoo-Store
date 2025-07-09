// middleware.ts
import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ token }) => !!token, // Cek apakah sudah login
  },
  pages: {
    signIn: "/login", // Halaman login custom
  },
});

export const config = {
  matcher: ["/admin/:path*", "/admin"],
};
