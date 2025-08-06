"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronUp, ChevronDown } from "lucide-react";
import Image from "next/image";
import * as AlertDialog from "@radix-ui/react-alert-dialog";

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

type Props = {
  product: Product;
  onClose: () => void;
};

const paymentMethods = [
  { id: "qris", name: "QRIS", logo: "/img/qris.png" },
  { id: "gopay", name: "GoPay", logo: "/img/GoPay Logo.jpeg" },
  // { id: "dana", name: "Dana", logo: "/img/dana.png" },
  { id: "bri", name: "BRI", logo: "/img/BRI_2020.svg.png" },
  { id: "shopeepay", name: "ShopeePay", logo: "/img/shope.jpeg" },
  { id: "seabank", name: "SeaBank", logo: "/img/SeaBank.svg.png" },
];

export default function CheckoutModal({ product, onClose }: Props) {
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(
    product.variants?.[0] ?? null
  );

  const [quantity, setQuantity] = useState(1);
  const [selectedPayment, setSelectedPayment] = useState("qris");
  const [receiver, setReceiver] = useState("");
  const [showDesc, setShowDesc] = useState(true);
  const [showMissingReceiverAlert, setShowMissingReceiverAlert] =
    useState(false);

  const subtotal = selectedVariant ? selectedVariant.price * quantity : 0;

  const adminNumber = "6285841825827";

  const handleBuy = () => {
    if (!receiver) {
      setShowMissingReceiverAlert(true);
      return;
    }

    const message = `Halo kak!, Saya ingin melakukan pemesanan. Apakah *${
      product.name
    }${selectedVariant ? " - " + selectedVariant.label : ""}* / Rp ${
      selectedVariant
        ? selectedVariant.price.toLocaleString("id-ID")
        : product.price.toLocaleString("id-ID")
    } masih tersedia?\n\n*Info:*\n- *Jumlah Item:* ${quantity}\n- *Metode Pembayaran:* ${selectedPayment.toUpperCase()}\n- *Total Harga:* Rp ${subtotal.toLocaleString(
      "id-ID"
    )}\n- *Dengan Nomor :* ${receiver}\n\nMohon konfirmasi untuk ketersediaan produk, agar saya bisa melakukan pembayaran secepatnya. Terima kasih banyak!`;

    const waLink = `https://wa.me/${adminNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(waLink, "_blank");
  };

  return (
    <AnimatePresence>
      {/* BACKDROP */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center px-4"
      >
        {/* MODAL CARD */}
        <motion.div
          initial={{ y: 40, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 40, opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.25 }}
          className="bg-white w-full max-w-md rounded-xl shadow-xl p-5 relative max-h-[90vh] overflow-y-auto"
        >
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-600 hover:text-black"
          >
            <X />
          </button>

          <h2 className="text-lg font-bold mb-2">{product.name}</h2>

          <button
            onClick={() => setShowDesc(!showDesc)}
            className="text-sm text-white bg-black px-3 py-1 rounded mb-2"
          >
            {showDesc ? "Sembunyikan deskripsi" : "Lihat deskripsi"}
          </button>

          {showDesc && product.description && (
            <div className="text-sm border p-3 rounded mb-4 whitespace-pre-line">
              {/* Make sure to replace URLs with anchor tags */}
              <span
                dangerouslySetInnerHTML={{
                  __html: product.description.replace(
                    /(https?:\/\/[^\s]+)/g,
                    '<a href="$1" target="_blank" class="text-blue-500 underline">$1</a>'
                  ),
                }}
              />
            </div>
          )}

          {product.variants?.length > 0 && (
            <div className="border-t pt-4 mb-4">
              <label className="block text-sm font-medium mb-1">
                1. Pilih varian
              </label>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((variant) => {
                  const isActive = selectedVariant?.id === variant.id;
                  return (
                    <motion.button
                      key={variant.id}
                      onClick={() => setSelectedVariant(variant)}
                      whileTap={{ scale: 0.95 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      }}
                      animate={{
                        backgroundColor: isActive ? "#2563eb" : "#fff",
                        color: isActive ? "#fff" : "#374151",
                        borderColor: isActive ? "#2563eb" : "#d1d5db",
                      }}
                      className="px-3 py-1 border rounded-full text-sm"
                    >
                      {variant.label}
                    </motion.button>
                  );
                })}
              </div>
            </div>
          )}

          <div className="border-t pt-4 mb-4">
            <label className="block text-sm font-medium mb-1">
              2. Jumlah item
            </label>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="p-2 border rounded"
                aria-label="Kurangi jumlah"
              >
                <ChevronDown size={16} />
              </button>
              <div className="px-4 min-w-[24px] text-center">{quantity}</div>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="p-2 border rounded"
                aria-label="Tambah jumlah"
              >
                <ChevronUp size={16} />
              </button>
              <div className="ml-auto text-sm">
                Subtotal: <strong>Rp {subtotal.toLocaleString("id-ID")}</strong>
              </div>
            </div>
          </div>

          <div className="border-t pt-4 mb-4">
            <label className="block text-sm font-medium mb-2">
              3. Metode pembayaran
            </label>
            <div className="grid grid-cols-2 gap-2">
              {paymentMethods.map((pm) => {
                const active = selectedPayment === pm.id;
                return (
                  <motion.button
                    key={pm.id}
                    onClick={() => setSelectedPayment(pm.id)}
                    whileTap={{ scale: 0.97 }}
                    transition={{ duration: 0.2 }}
                    animate={{
                      backgroundColor: active ? "#eff6ff" : "#fff",
                      borderColor: active ? "#3b82f6" : "#d1d5db",
                    }}
                    className="border rounded p-2 flex items-center justify-center gap-2"
                  >
                    <Image src={pm.logo} alt={pm.name} width={24} height={24} />
                    <span className="text-sm">{pm.name}</span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          <div className="border-t pt-4 mb-6">
            <label className="block text-sm font-medium mb-1">
              4. Nomor Handphone penerima
            </label>
            <input
              type="text"
              value={receiver}
              onChange={(e) => setReceiver(e.target.value)}
              placeholder="contoh: 0854xxxx"
              className="w-full border px-4 py-2 rounded"
            />
          </div>

          <div className="flex items-center justify-end border-t pt-4 gap-2">
            <button
              onClick={handleBuy}
              className="bg-blue-600 text-white px-4 py-2 rounded text-sm font-medium flex items-center gap-1"
            >
              🛒 Beli Sekarang
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded bg-gray-100 text-gray-700 hover:bg-gray-200"
              aria-label="Tutup"
            >
              <X size={14} />
            </button>
          </div>
        </motion.div>

        {/* Missing receiver alert dialog */}
        <AlertDialog.Root
          open={showMissingReceiverAlert}
          onOpenChange={setShowMissingReceiverAlert}
        >
          <AlertDialog.Portal>
            <AlertDialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50" />
            <AlertDialog.Content className="fixed z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-xl shadow-lg w-full max-w-sm">
              <AlertDialog.Title className="text-lg font-semibold mb-2">
                Nomor handphone belum diisi
              </AlertDialog.Title>
              <AlertDialog.Description className="text-sm text-gray-600 mb-4">
                Mohon isi nomor handphone penerima sebelum melanjutkan
                pembelian.
              </AlertDialog.Description>
              <div className="flex justify-end">
                <AlertDialog.Action asChild>
                  <button className="px-4 py-2 text-sm rounded bg-blue-600 text-white hover:bg-blue-700">
                    Oke
                  </button>
                </AlertDialog.Action>
              </div>
            </AlertDialog.Content>
          </AlertDialog.Portal>
        </AlertDialog.Root>
      </motion.div>
    </AnimatePresence>
  );
}
