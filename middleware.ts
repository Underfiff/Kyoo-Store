import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const isLoggedIn = !!req.nextauth.token;
    const pathname = req.nextUrl.pathname;

    // Belum login → redirect ke /login
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // Sudah login dan akses /admin → redirect ke /dashboard
    if (pathname === "/admin") {
      return NextResponse.redirect(new URL("/admin/dashboard", req.url));
    }

    // Lainnya lanjut
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: () => true, // Biarkan semua request masuk supaya bisa dicek manual di atas
    },
  }
);

export const config = {
  matcher: ["/admin", "/dashboard/:path*"],
};
