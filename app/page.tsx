"use client";

import { motion } from "framer-motion";
import PosterCard from "./components/PosterCard";
import FAQ from "./components/FAQ";

export default function LandingPage() {
  const nomorWhatsApp = "6288286353470";

  const posterData = [
    {
      src: "/Kyo Fb.png",
      pesan: "Halo, saya tertarik dengan jasa Followers/Likes untuk Facebook.",
    },
    {
      src: "/Kyo Ig.png",
      pesan: "Halo, saya tertarik dengan jasa Followers/Likes untuk Instagram.",
    },
    {
      src: "/Kyo Tt.png",
      pesan:
        "Halo, saya tertarik dengan jasa Followers/Likes/Views untuk Tiktok.",
    },
    {
      src: "/Kyo Tl.png",
      pesan:
        "Halo, saya tertarik dengan jasa Subscribers/Reactions/Views untuk Telegram.",
    },
    {
      src: "/Kyo Yt.png",
      pesan:
        "Halo, saya tertarik dengan jasa Subscribers/Likes/Views untuk Youtube.",
    },
    {
      src: "/Kyo Sp.png",
      pesan: "Halo, saya tertarik dengan jasa Followers untuk Shopee.",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center py-20 bg-gradient-to-b from-pink-600 to-[#121212] text-white"
      >
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Tingkatkan Sosial Media & Akses Premium
        </h1>
        <p className="text-lg mt-4 font-light">
          Followers, Likes, Views & Aplikasi Berbayar
        </p>
        <a
          href={`https://wa.me/${nomorWhatsApp}`}
          className="mt-6 inline-block bg-green-500 text-white px-8 py-3 rounded-full hover:bg-green-600 transition-all shadow-lg"
        >
          Chat via WhatsApp
        </a>
      </motion.section>

      {/* Poster Grid */}
      <main className="max-w-7xl mx-auto py-16 px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 bg-[#121212]">
        {posterData.map((poster, index) => {
          const pesanEncoded = encodeURIComponent(poster.pesan);
          const linkUnik = `https://wa.me/${nomorWhatsApp}?text=${pesanEncoded}`;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <PosterCard src={poster.src} link={linkUnik} />
            </motion.div>
          );
        })}
      </main>

      {/* FAQ Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="bg-[#121212] text-white py-12 px-4"
      >
        <div className="max-w-4xl mx-auto">
          <FAQ />
        </div>
      </motion.section>

      {/* Floating WhatsApp Button */}
      <a
        href={`https://wa.me/${nomorWhatsApp}`}
        target="_blank"
        className="fixed bottom-5 right-5 bg-green-500 hover:bg-green-600 text-white px-5 py-3 rounded-full shadow-lg z-50 transition"
      >
        Chat WA
      </a>
      {/* Footer */}
      <footer className="bg-[#1a1a1a] text-gray-300 py-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-6 text-center md:text-left">
          {/* Info Kiri */}
          <div>
            <h3 className="text-xl font-bold text-white mb-2">Tentang Kami</h3>
            <p className="text-sm text-gray-400">
              Kami menyediakan jasa peningkatan sosial media dan akses aplikasi
              premium dengan layanan cepat & terpercaya.
            </p>
          </div>

          {/* Navigasi */}
          <div>
            <h3 className="text-xl font-bold text-white mb-2">Layanan</h3>
            <ul className="space-y-1 text-sm">
              <li>Followers & Likes</li>
              <li>Akun Premium (Netflix, Spotify, dsb)</li>
              <li>Custom Request via WhatsApp</li>
            </ul>
          </div>

          {/* Kontak */}
          <div>
            <h3 className="text-xl font-bold text-white mb-2">Kontak</h3>
            <p className="text-sm">
              WhatsApp:{" "}
              <a
                href={`https://wa.me/${nomorWhatsApp}`}
                className="text-green-400 hover:underline"
              >
                {nomorWhatsApp}
              </a>
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 text-center text-sm text-gray-500 border-t border-gray-700 pt-4">
          &copy; {new Date().getFullYear()} KyoStore. All rights reserved.
        </div>
      </footer>
    </>
  );
}
