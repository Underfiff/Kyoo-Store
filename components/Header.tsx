"use client";

import { FC } from "react";

import Link from "next/link";

const Header: FC = () => {
  return (
    <header className="flex justify-between items-center px-6 py-4 bg-white border-b shadow-sm">
      <Link href="/">
        <span className="text-2xl font-bold tracking-wide text-gray-900">
          KyooPremium
        </span>
      </Link>
      <div className="flex items-center gap-2 text-gray-700">
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17 20h5v-2a4 4 0 00-3-3.87M9 20h6m-3-4a4 4 0 100-8 4 4 0 000 8zm6 4H6a2 2 0 01-2-2v-1a4 4 0 013-3.87"
          />
        </svg>
        <span className="text-sm">Contact</span>
      </div>
    </header>
  );
};

export default Header;
