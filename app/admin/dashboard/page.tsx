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
import { signOut } from "next-auth/react";
import { CustomAlertDialog } from "@/components/ui/AlertDialog";

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
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("SEMUA");
  const [categories, setCategories] = useState<string[]>([]);

  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/products?page=${page}&limit=10&category=${
            selectedCategory !== "SEMUA" ? selectedCategory : ""
          }`
        );
        const data = await res.json();
        setProducts(Array.isArray(data.products) ? data.products : []);
        setTotalPages(data.totalPages || 1);
      } catch (err) {
        console.error("Gagal mengambil produk:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page, selectedCategory]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/products"); // kamu bisa ganti ke /api/categories jika tersedia
        const data = await res.json();
       const allCategories = (data.products?.map((p: Product) => p.category) ||
         []) as string[];
       const unique = Array.from(new Set(allCategories));

        setCategories(["SEMUA", ...unique]);
      } catch (err) {
        console.error("Gagal mengambil kategori:", err);
      }
    };

    fetchCategories();
  }, []);

  const confirmDelete = async () => {
    if (!pendingDeleteId) return;
    try {
      await fetch(`/api/products/${pendingDeleteId}`, { method: "DELETE" });
      setProducts(products.filter((p) => p.id !== pendingDeleteId));
      toast.success("Produk berhasil dihapus");
      setPendingDeleteId(null);
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
    <>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Admin Panel - KyooStore</h1>
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

          <div className="flex items-center gap-4 mb-4">
            <label className="text-sm font-medium">Filter Kategori:</label>
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setPage(1);
              }}
              className="border px-3 py-2 rounded-md text-sm"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
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
              {loading ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center text-muted-foreground"
                  >
                    Memuat data produk...
                  </TableCell>
                </TableRow>
              ) : Array.isArray(products) && products.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center text-muted-foreground"
                  >
                    Belum ada produk.
                  </TableCell>
                </TableRow>
              ) : (
                products.map((product, index) => (
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
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          product.status === "TERSEDIA"
                            ? "bg-green-600 text-white"
                            : "bg-red-600 text-white"
                        }`}
                      >
                        {product.status === "TERSEDIA" ? "Tersedia" : "Habis"}
                      </Badge>
                    </TableCell>
                    <TableCell className="min-w-[150px]">
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
                              onClick={() => setPendingDeleteId(product.id)}
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
                      <div className="hidden sm:flex gap-2 justify-end">
                        <Link href={`/admin/edit/${product.id}`}>
                          <Button
                            size="sm"
                            className="bg-yellow-400 hover:bg-yellow-500 text-black"
                          >
                            Edit
                          </Button>
                        </Link>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => setPendingDeleteId(product.id)}
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
                ))
              )}
            </TableBody>
          </Table>

          <div className="flex justify-between items-center mt-4">
            <Button
              variant="outline"
              disabled={page === 1}
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            >
              ⬅ Sebelumnya
            </Button>
            <span className="text-sm text-muted-foreground">
              Halaman {page} dari {totalPages}
            </span>
            <Button
              variant="outline"
              disabled={page === totalPages}
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            >
              Selanjutnya ➡
            </Button>
          </div>
        </Card>
      </div>
      <CustomAlertDialog
        open={!!pendingDeleteId}
        onOpenChange={() => setPendingDeleteId(null)}
        onConfirm={confirmDelete}
      />
    </>
  );
}
