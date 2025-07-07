"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Product } from "@/types/product";
import { toast } from "sonner";

export default function EditProductForm({ product }: { product: Product }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [preview, setPreview] = useState<string | null>(
    product.imageUrl ?? null
  );

  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    let imageUrl = product.imageUrl;

    if (imageFile) {
      const cloudData = new FormData();
      cloudData.append("file", imageFile);
      cloudData.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
      );

      const upload = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        { method: "POST", body: cloudData }
      );

      const result = await upload.json();
      imageUrl = result.secure_url;
    }

    const res = await fetch("/api/products/" + product.id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.get("name"),
        category: formData.get("category"),
        price: Number(formData.get("price")),
        description: formData.get("description"),
        imageUrl,
      }),
    });

    if (res.ok) {
      toast.success("Produk berhasil diperbarui!");
      router.push("/admin/dashboard");
    } else {
      toast.error("Gagal update produk.");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-1 font-medium">Nama Produk</label>
        <input
          defaultValue={product.name}
          type="text"
          name="name"
          className="w-full border rounded px-3 py-2"
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Kategori</label>
        <select
          name="category"
          defaultValue={product.category}
          className="w-full border rounded px-3 py-2"
        >
          <option value="STREAMING APPS">Streaming Apps</option>
          <option value="MUSIC">Music Apps</option>
          <option value="JASA SOSMED">Jasa Sosmed</option>
          <option value="EDITING APPS">Editing Apps</option>
        </select>
      </div>
      <div>
        <label className="block mb-1 font-medium">Harga</label>
        <input
          defaultValue={product.price}
          type="number"
          name="price"
          className="w-full border rounded px-3 py-2"
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Deskripsi</label>
        <textarea
          defaultValue={product.description ?? ""}
          name="description"
          rows={3}
          className="w-full border rounded px-3 py-2"
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Gambar Baru (Opsional)</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full"
        />
        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="mt-2 w-32 h-32 object-contain"
          />
        )}
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded disabled:opacity-50"
      >
        {loading ? "Menyimpan..." : "Simpan Perubahan"}
      </button>
    </form>
  );
}
