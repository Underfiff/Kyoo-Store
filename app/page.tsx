"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } },
};

export default function HomePage() {
  return (
    <main className="bg-white text-gray-900 font-sans">
      {/* Header */}
      <motion.header
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        className="flex justify-between items-center px-6 py-4 border-b"
      >
        <div className="text-2xl font-bold">KyooPremium</div>
        <div className="flex items-center gap-2">
          <svg
            className="w-5 h-5 text-gray-700"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 20h5v-2a4 4 0 00-3-3.87M9 20h6m-3-4a4 4 0 100-8 4 4 0 000 8zm6 4H6a2 2 0 01-2-2v-1a4 4 0 013-3.87"
            ></path>
          </svg>
          <span>Contact</span>
        </div>
      </motion.header>

      {/* Hero Section */}
      <motion.section
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="flex flex-col lg:flex-row items-center justify-between px-6 lg:px-20 py-20"
      >
        <motion.div variants={fadeInUp} className="max-w-xl">
          <h1 className="text-4xl font-bold mb-4">
            Premium sat-set Anti Ribet
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            Kyoo Premium adalah sebuah website yang menyediakan aplikasi premium
            dan jasa sosmed termurah dan terlengkap
          </p>
          <Button
            asChild
            className="bg-gray-900 text-white px-6 py-3 rounded shadow hover:bg-gray-800 transform hover:scale-105 transition duration-300"
          >
            <Link href="/products">Mulai Sekarang</Link>
          </Button>
        </motion.div>

        <motion.div variants={fadeIn}>
          <Image
            src="/img/Premium Vector.jpeg"
            alt="Shopping Illustration"
            width={400}
            height={400}
            className="w-full max-w-md transition-transform duration-300 hover:scale-105"
          />
        </motion.div>
      </motion.section>

      {/* Feature Section */}
      <motion.section
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="flex flex-col-reverse lg:flex-row items-center justify-between px-6 lg:px-20 py-20"
      >
        <motion.div variants={fadeIn} className="mt-10 lg:mt-0">
          <Image
            src="/img/download (32).jpeg"
            alt="Feature Illustration"
            width={400}
            height={400}
            className="w-full max-w-md transition-transform duration-300 hover:scale-105"
          />
        </motion.div>
        <motion.div variants={fadeInUp} className="max-w-xl lg:ml-12">
          <h2 className="text-3xl font-bold mb-4">
            Produk Berkualitas, Harga Mantap dan Proses Cepat
          </h2>
          <p className="text-lg text-gray-700 mb-4">
            Kami menyediakan berbagai macam produk berkualitas dengan harga
            terjangkau. Kenapa kamu harus membeli produk kami?
          </p>
          <ul className="list-disc pl-5 space-y-2 text-gray-800">
            <li>Premium</li>
            <li>Bergaransi</li>
            <li>Proses Cepat</li>
            <li>Fast Response</li>
          </ul>
        </motion.div>
      </motion.section>

      {/* Payment Methods */}
      <motion.section
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="px-6 lg:px-20 py-20 text-center"
      >
        <h2 className="text-3xl font-bold mb-4">Metode Pembayaran</h2>
        <p className="text-gray-700 mb-10">
          Kami menyediakan bermacam metode pembayaran yang bisa kamu pilih
          sesuai keinginanmu.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
          {[
            "qris.png",
            "dana.png",
            "GoPay Logo.jpeg",
            "ovo.jpg",
            "shope.jpeg",
            "BNI.webp",
          ].map((img, idx) => (
            <Card
              key={idx}
              className="p-6 w-full flex items-center justify-center shadow-sm hover:shadow-md transition transform hover:scale-105"
            >
              <CardContent className="flex items-center justify-center">
                <Image
                  src={`/img/${img}`}
                  alt={img}
                  width={100}
                  height={40}
                  className="h-10 object-contain"
                />
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="bg-white py-20"
      >
        <div
          className="max-w-6xl mx-auto px-6 pb-10 relative rounded-xl overflow-hidden"
          style={{
            backgroundImage: "url('/img/download (36).jpeg')",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-white opacity-50 z-0"></div>
          <div className="relative z-10 text-center py-10 px-4">
            <h3 className="text-sm text-gray-700 font-medium">KYOOPREMIUM</h3>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 my-2">
              Langganan Premium Gak Harus Mahal
            </h2>
            <Button
              asChild
              className="bg-gray-900 text-white px-6 py-3 rounded shadow hover:bg-gray-800 transform hover:scale-105 transition duration-300"
            >
              <Link href="/products">Mulai Sekarang</Link>
            </Button>
          </div>
        </div>
      </motion.footer>
    </main>
  );
}
