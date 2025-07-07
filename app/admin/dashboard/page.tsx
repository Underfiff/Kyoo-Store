"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";

import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react"; // ✅ Tambahkan ini

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  status: "TERSEDIA" | "HABIS";
  imageUrl: string;
}

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Gagal mengambil produk:", err);
      }
    };
    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    const confirmDelete = confirm("Yakin ingin menghapus produk ini?");
    if (!confirmDelete) return;

    try {
      await fetch(`/api/products/${id}`, { method: "DELETE" });
      setProducts(products.filter((p) => p.id !== id));
      toast.success("Produk berhasil dihapus");
    } catch (err) {
      console.error("Gagal hapus produk:", err);
      toast.error("Gagal menghapus produk");
    }
  };

  const handleToggleStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === "TERSEDIA" ? "HABIS" : "TERSEDIA";

    try {
      const res = await fetch(`/api/products/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        setProducts((prev) =>
          prev.map((p) => (p.id === id ? { ...p, status: newStatus } : p))
        );
        toast.success("Status produk berhasil diperbarui");
      } else {
        toast.error("Gagal mengubah status produk");
      }
    } catch (err) {
      console.error("Gagal ubah status:", err);
      toast.error("Terjadi kesalahan saat mengubah status");
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Admin Panel - KyooPremium</h1>
        {/* ✅ Tombol logout aktif */}
        <Button
          variant="destructive"
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
        >
          Logout
        </Button>
      </div>

      <Card className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">📦 Daftar Produk</h2>
          <Link href="/admin/add">
            <Button variant="default">+ Tambah Produk</Button>
          </Link>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>No</TableHead>
              <TableHead>Gambar</TableHead>
              <TableHead>Nama Produk</TableHead>
              <TableHead>Kategori</TableHead>
              <TableHead>Harga</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center text-muted-foreground"
                >
                  Belum ada produk.
                </TableCell>
              </TableRow>
            )}
            {products.map((product, index) => (
              <TableRow key={product.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    width={40}
                    height={40}
                    className="rounded"
                  />
                </TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>
                  Rp {product.price.toLocaleString("id-ID")}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      product.status === "TERSEDIA" ? "default" : "destructive"
                    }
                  >
                    {product.status === "TERSEDIA" ? "Tersedia" : "Habis"}
                  </Badge>
                </TableCell>
                <TableCell className="min-w-[150px]">
                  {/* Mobile dropdown menu (visible on small screen) */}
                  <div className="flex sm:hidden justify-end">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="w-5 h-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() =>
                            router.push(`/admin/edit/${product.id}`)
                          }
                        >
                          ✏ Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDelete(product.id)}
                        >
                          🗑 Hapus
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            handleToggleStatus(product.id, product.status)
                          }
                        >
                          {product.status === "TERSEDIA"
                            ? "❌ Tandai Habis"
                            : "✔ Tandai Tersedia"}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  {/* Desktop buttons (hidden on small screen) */}
                  <div className="hidden sm:flex gap-2 justify-end">
                    <Link href={`/admin/edit/${product.id}`}>
                      <Button
                        size="sm"
                        variant="outline"
                        className="bg-yellow-400 text-white hover:bg-yellow-500"
                      >
                        Edit
                      </Button>
                    </Link>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(product.id)}
                    >
                      Hapus
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() =>
                        handleToggleStatus(product.id, product.status)
                      }
                    >
                      {product.status === "TERSEDIA"
                        ? "Tandai Habis"
                        : "Tandai Tersedia"}
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
