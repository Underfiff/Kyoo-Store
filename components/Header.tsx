"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="flex justify-between items-center px-6 py-4 bg-white shadow fade-in-up">
      <Link href="/" className="text-2xl font-bold hover:opacity-80 transition">
        KyooPremium
      </Link>

      <div className="flex items-center gap-2">
        <svg
          className="w-5 h-5 text-gray-700"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17 20h5v-2a4 4 0 00-3-3.87M9 20h6m-3-4a4 4 0 100-8 4 4 0 000 8zm6 4H6a2 2 0 01-2-2v-1a4 4 0 013-3.87"
          />
        </svg>
        <Link href="/contact" className="hover:opacity-80 transition">
          Contact
        </Link>
      </div>
    </header>
  );
}
