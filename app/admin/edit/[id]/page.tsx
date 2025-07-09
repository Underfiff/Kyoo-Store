"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import Image from "next/image";

type Variant = {
  id?: string; // opsional saat belum disimpan
  label: string;
  price: number | string;
};

type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  description?: string;
  imageUrl?: string;
  variants: Variant[];
};

export default function Page() {
  const { id } = useParams();
  const router = useRouter();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [variants, setVariants] = useState<Variant[]>([]);

  useEffect(() => {
    async function fetchProduct() {
      const res = await fetch(`/api/products/${id}`);
      const data = await res.json();
      setProduct(data);
      setPreview(data.imageUrl ?? null);
      setVariants(data.variants ?? []);
    }
    if (id) fetchProduct();
  }, [id]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleVariantChange = (
    index: number,
    field: "label" | "price",
    value: string
  ) => {
    const newVariants = [...variants];

    if (field === "label") {
      newVariants[index].label = value;
    } else if (field === "price") {
      newVariants[index].price = Number(value);
    }

    setVariants(newVariants);
  };
  
  const addVariant = () => {
    setVariants([...variants, { label: "", price: "" }]);
  };

  const removeVariant = (index: number) => {
    const updated = variants.filter((_, i) => i !== index);
    setVariants(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;
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

    const cleanVariants = variants
      .filter((v) => v.label && v.price !== "")
      .map((v) => ({
        id: v.id,
        label: v.label,
        price: Number(v.price),
      }));

    const res = await fetch("/api/products/" + product.id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.get("name"),
        category: formData.get("category"),
        price: Number(formData.get("price")),
        description: formData.get("description"),
        imageUrl,
        variants: cleanVariants,
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

  if (!product) return <div className="p-6">Memuat data produk...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-xl mx-auto bg-white p-6 rounded shadow space-y-4">
        <h1 className="text-2xl font-bold">Edit Produk</h1>
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
              <option value="VPN">VPN</option>
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
            <label className="block mb-1 font-medium">
              Gambar Baru (Opsional)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full"
            />
            {typeof preview === "string" && (
              <div className="mt-2 w-32 h-32 relative">
                <Image
                  src={preview}
                  alt="Preview"
                  fill
                  className="object-contain rounded-md shadow"
                  sizes="128px"
                />
              </div>
            )}
          </div>

          {/* ⬇️ Varian Produk */}
          <div>
            <label className="block mb-2 font-medium">Varian Produk</label>
            {variants.map((variant, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Label"
                  value={variant.label}
                  onChange={(e) =>
                    handleVariantChange(index, "label", e.target.value)
                  }
                  className="w-1/2 border px-3 py-2 rounded"
                />
                <input
                  type="number"
                  placeholder="Harga"
                  value={variant.price}
                  onChange={(e) =>
                    handleVariantChange(index, "price", e.target.value)
                  }
                  className="w-1/2 border px-3 py-2 rounded"
                />
                {variants.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeVariant(index)}
                    className="text-red-600 font-bold px-2"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addVariant}
              className="text-sm text-blue-600"
            >
              + Tambah Varian
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded disabled:opacity-50"
          >
            {loading ? "Menyimpan..." : "Simpan Perubahan"}
          </button>
        </form>
      </div>
    </div>
  );
}
