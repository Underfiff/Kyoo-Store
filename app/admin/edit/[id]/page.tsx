// app/admin/edit/[id]/page.tsx

import { Product } from "@/types/product";
import { prisma } from "@/lib/prisma";
import EditProductForm from "./EditProductForm";
import { notFound } from "next/navigation";

interface EditPageProps {
  params: {
    id: string;
  };
}

export default async function EditProductPage({ params }: EditPageProps) {
  const product = await prisma.product.findUnique({
    where: { id: params.id },
  });

  if (!product) return notFound();

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-4">Edit Produk</h1>
        <EditProductForm product={product as Product} />
      </div>
    </div>
  );
}
