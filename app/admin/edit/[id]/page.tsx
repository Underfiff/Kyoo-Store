import { prisma } from "@/lib/prisma";
import { Product } from "@/types/product";
import EditProductForm from "./EditProductForm";
import { notFound } from "next/navigation";

// Fungsi utama async
async function EditProductPage({ id }: { id: string }) {
  const product = await prisma.product.findUnique({
    where: { id },
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

// Export default wrapper (tidak async!)
export default function PageWrapper({ params }: { params: { id: string } }) {
  return <EditProductPage id={params.id} />;
}
