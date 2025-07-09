"use client";

export default function Footer() {
  return (
    <>
      <footer className="py-6 text-center text-sm text-gray-500 w-full border-t">
        © {new Date().getFullYear()} KyooPremium. All Rights Reserved.
      </footer>
    </>
  );
}
