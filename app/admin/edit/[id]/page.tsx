import { Product } from "@/types/product";
import { prisma } from "@/lib/prisma";
import EditProductForm from "./EditProductForm";

interface Props {
  params: { id: string };
}

export default async function EditProductPage({ params }: Props) {
  const product = await prisma.product.findUnique({
    where: { id: params.id },
  });

  if (!product) {
    return <div className="p-6 text-red-600">Produk tidak ditemukan.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-4">Edit Produk</h1>
        <EditProductForm product={product as Product} />
      </div>
    </div>
  );
}
