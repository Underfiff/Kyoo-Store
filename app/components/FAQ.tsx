"use client";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "Apakah layanan ini aman untuk akun saya?",
    answer:
      "Ya, layanan kami menggunakan metode yang aman tanpa meminta password. Kami hanya membutuhkan link profil atau postingan Anda.",
  },
  {
    question: "Berapa lama prosesnya setelah saya melakukan pemesanan?",
    answer:
      "Proses biasanya dimulai dalam 5–30 menit setelah pembayaran, tergantung pada jenis layanan. Estimasi waktu bisa berbeda untuk setiap platform.",
  },
  {
    question: "Apakah bisa order lebih dari satu layanan sekaligus?",
    answer:
      "Tentu! Anda bisa order beberapa layanan sekaligus, misalnya Instagram dan YouTube dalam satu transaksi.",
  },
  {
    question: "Bagaimana cara memesan layanan?",
    answer:
      "Cukup klik Poster, lalu kirim pesan sesuai kebutuhan Anda.",
  },
  {
    question: "Apakah ada garansi jika followers turun?",
    answer:
      "Kami menyediakan garansi untuk layanan tertentu, seperti followers dan likes. Detail garansi akan dijelaskan saat pemesanan.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="max-w-3xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center text-white mb-10">
        Pertanyaan Umum (FAQ)
      </h2>
      <div className="space-y-4">
        {faqData.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className="bg-zinc-900/70 backdrop-blur border border-zinc-700 rounded-xl shadow-md overflow-hidden transition-all duration-300"
            >
              <button
                onClick={() => toggle(index)}
                className="w-full flex justify-between items-center px-6 py-4 text-white text-left text-base font-medium hover:bg-zinc-800 transition-colors"
              >
                <span>{item.question}</span>
                {isOpen ? (
                  <ChevronUp className="w-5 h-5 text-green-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-white/60" />
                )}
              </button>
              <div
                className={`px-6 text-sm text-white/80 pb-4 transition-all duration-300 ${
                  isOpen ? "block" : "hidden"
                }`}
              >
                {item.answer}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
