"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/footer";
import CheckoutModal from "@/components/CheckoutModal"; // 🆕 Pastikan komponen ini tersedia
import { Button } from "@/components/ui/button";



type Variant = {
  id: string;
  label: string;
  price: number;
};

type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  imageUrl?: string;
  status: string;
  description?: string;
  variants: Variant[];
};

export default function ProductPage() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null); // 🆕
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products", { cache: "no-store" });
        if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
        const data = await res.json();
        setProducts(Array.isArray(data.products) ? data.products : []);
      } catch (err) {
        console.error("❌ Gagal ambil produk:", err);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) &&
      (categoryFilter ? p.category === categoryFilter : true)
  );

  const categories = [
    "EDITING APPS",
    "JASA SOSMED",
    "MUSIC APPS",
    "STREAMING APPS",
    "VPN",
  ];

  return (
    <div className="bg-gray-50 text-gray-900 font-sans min-h-screen flex flex-col">
      <Header />

      <section className="px-6 pt-6 fade-in-up relative z-20">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 relative z-30">
          <input
            type="text"
            placeholder="Cari produk favorit"
            className="border rounded px-4 py-2 w-full md:w-1/2"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="relative" ref={dropdownRef}>
            <Button
              className="bg-gray-700 text-white"
              onClick={() => setShowDropdown((prev) => !prev)}
            >
              {categoryFilter || "Category"} ▼
            </Button>
            <AnimatePresence>
              {showDropdown && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-40"
                >
                  <div className="py-1">
                    <button
                      onClick={() => {
                        setCategoryFilter(null);
                        setShowDropdown(false);
                      }}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    >
                      Semua
                    </button>
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => {
                          setCategoryFilter(cat);
                          setShowDropdown(false);
                        }}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      <section className="px-6 py-6 fade-in-up z-10 relative flex-1">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {filtered.map((product) => (
            <ProductCard
              key={product.id}
              name={product.name}
              price={product.variants?.[0]?.price ?? product.price}
              category={product.category}
              img={product.imageUrl!}
              status={product.status === "TERSEDIA" ? "tersedia" : "habis"}
              onClick={() => setSelectedProduct(product)}
            />
          ))}
        </div>
      </section>

      <Footer />

      {/* 🆕 Checkout Modal */}
      {selectedProduct && (
        <CheckoutModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      <style jsx global>{`
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .fade-in-up {
          animation: fadeInUp 0.7s ease-out both;
        }
      `}</style>
    </div>
  );
}

type ProductCardProps = {
  name: string;
  price: number;
  originalPrice?: number | null;
  category: string;
  img: string;
  status: "tersedia" | "habis";
  onClick?: () => void;
};

function ProductCard({
  name,
  price,
  originalPrice,
  category,
  img,
  status,
  onClick,
}: ProductCardProps) {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer bg-white rounded-xl shadow p-4 flex flex-col transform transition duration-300 hover:scale-105 fade-in-up ${
        status === "habis" ? "opacity-60 grayscale pointer-events-none" : ""
      }`}
    >
      <Image
        src={img}
        alt={name}
        width={300}
        height={160}
        className="w-full h-40 object-contain mb-2"
      />
      <span className="text-xs bg-gray-200 px-2 py-1 rounded mb-1">
        PROSES INSTANT
      </span>
      <h3 className="text-sm font-semibold uppercase text-gray-600">
        {category}
      </h3>
      <p className="font-bold text-black">{name}</p>
      {originalPrice ? (
        <>
          <p className="line-through text-red-500 text-sm">
            Rp {originalPrice.toLocaleString("id-ID")}
          </p>
          <p className="text-blue-600 font-semibold">
            Rp {price.toLocaleString("id-ID")}
          </p>
        </>
      ) : (
        <p className="text-blue-600 font-semibold">
          Rp {price.toLocaleString("id-ID")}
        </p>
      )}
      <span
        className={`text-xs mt-auto ${
          status === "tersedia" ? "text-green-600" : "text-red-600"
        }`}
      >
        {status === "tersedia" ? "✔ TERSEDIA" : "❌ HABIS"}
      </span>
    </div>
  );
}
