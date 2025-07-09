"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import Image from "next/image";

export default function TambahProdukPage() {
  const router = useRouter();
  const [preview, setPreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  // ⬇️ State baru untuk variants
  const [variants, setVariants] = useState([{ label: "", price: "" }]);

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
    newVariants[index][field] = value;
    setVariants(newVariants);
  };

  const addVariant = () => {
    setVariants([...variants, { label: "", price: "" }]);
  };

  const removeVariant = (index: number) => {
    const newVariants = variants.filter((_, i) => i !== index);
    setVariants(newVariants);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    let imageUrl = "";

    try {
      if (imageFile) {
        const cloudData = new FormData();
        cloudData.append("file", imageFile);
        cloudData.append(
          "upload_preset",
          process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
        );

        const upload = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
          {
            method: "POST",
            body: cloudData,
          }
        );

        const result = await upload.json();
        imageUrl = result.secure_url;
      }

      const cleanVariants = variants
        .filter((v) => v.label && v.price)
        .map((v) => ({
          label: v.label,
          price: Number(v.price),
        }));

      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          category: formData.get("category"),
          price: formData.get("price"),
          description: formData.get("description"),
          imageUrl,
          variants: cleanVariants,
        }),
      });

      if (res.ok) {
        toast.success("Produk berhasil ditambahkan!");
        router.push("/admin/dashboard");
      } else {
        toast.error("Gagal menambahkan produk");
      }
    } catch {
      toast.error("Terjadi kesalahan saat menambahkan produk");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Card className="max-w-xl mx-auto p-6 space-y-4">
        <h2 className="text-2xl font-bold">Tambah Produk</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Nama Produk</Label>
            <Input type="text" name="name" id="name" required />
          </div>
          <div>
            <Label htmlFor="category">Kategori</Label>
            <select
              name="category"
              id="category"
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
            <Label htmlFor="price">Harga Default (Rp)</Label>
            <Input type="number" name="price" id="price" required />
          </div>
          <div>
            <Label htmlFor="description">Deskripsi</Label>
            <textarea
              name="description"
              id="description"
              rows={3}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <Label htmlFor="image">Upload Gambar</Label>
            <Input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full"
            />
            {preview && (
              <div className="mt-2 w-32 h-32 relative">
                <Image
                  src={preview}
                  alt="Preview"
                  fill
                  className="object-contain rounded-md shadow"
                />
              </div>
            )}
          </div>

          {/* ⬇️ Varian Produk */}
          <div>
            <Label className="block mb-2">Varian Produk</Label>
            {variants.map((variant, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <Input
                  placeholder="Label"
                  value={variant.label}
                  onChange={(e) =>
                    handleVariantChange(index, "label", e.target.value)
                  }
                  className="w-1/2"
                />
                <Input
                  type="number"
                  placeholder="Harga"
                  value={variant.price}
                  onChange={(e) =>
                    handleVariantChange(index, "price", e.target.value)
                  }
                  className="w-1/2"
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
            <Button
              type="button"
              onClick={addVariant}
              className="mt-1 text-sm"
              variant="outline"
            >
              + Tambah Varian
            </Button>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Menyimpan..." : "Tambah Produk"}
          </Button>
        </form>
      </Card>
    </div>
  );
}
