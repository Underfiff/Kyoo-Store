import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Toko Sosmed & Premium App | KyoStore",
  description:
    "Jual followers, likes, views, dan akses premium aplikasi dengan harga terjangkau!",
  icons: {
    icon: "/favicon.ico", // atau .png / .svg
  },
  keywords: [
    "followers",
    "jasa sosmed",
    "aplikasi premium",
    "likes",
    "views",
    "instagram",
    "tiktok",
    "facebook",
    "youtube",
  ],
  openGraph: {
    title: "Toko Sosmed & Premium App | KyoStore",
    description:
      "Solusi lengkap untuk kebutuhan sosial media & aplikasi premium Anda.",

    type: "website",
    url: "https://kyooo.my.id/", // ganti dengan domain kamu
    images: [
      {
        url: "",
        width: 1200,
        height: 630,
        alt: "KyoStore Banner",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster richColors position="top-center" /> {/* ✅ Pasang di sini */}
      </body>
    </html>
  );
}
