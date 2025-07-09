// app/api/products/[id]/route.ts

export const runtime = "nodejs";

import { prisma } from "@/lib/prisma";

import { NextRequest, NextResponse } from "next/server";

// GET /api/products/:id
export async function GET(
  req: NextRequest,
  context: Promise<{ params: { id: string } }>
) {
  const { params } = await context;
  const id = params.id;

  try {
    const product = await prisma.product.findUnique({
      where: { id },
      include: { variants: true },
    });

    if (!product) {
      return NextResponse.json(
        { message: "Produk tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json(product, {
      status: 200,
    });
  } catch (error) {
    console.error("❌ Error GET /products/:id", error);
    return NextResponse.json(
      { message: "Gagal mengambil produk" },
      { status: 500 }
    );
  }
}

// PUT /api/products/:id
// app/api/products/[id]/route.ts

export async function PUT(
  req: NextRequest,
  context: Promise<{ params: { id: string } }>
) {
  const { params } = await context;
  const id = params.id;

  try {
    const data = await req.json();

    // Update produk utama
    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        name: data.name,
        category: data.category,
        price: Number(data.price),
        description: data.description,
        imageUrl: data.imageUrl,
        status: data.status ?? "tersedia",
      },
    });

    // Jika ada field `variants` dari client
    if (Array.isArray(data.variants)) {
      // Hapus semua varian lama
      await prisma.variant.deleteMany({ where: { productId: id } });

      // Tambahkan varian baru
      await prisma.variant.createMany({
        data: data.variants.map((v: { label: string; price: number }) => ({
          label: v.label,
          price: v.price,
          productId: id,
        })),
      });
    }

    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error("❌ Error PUT /products/:id", error);
    return NextResponse.json(
      { message: "Gagal update produk" },
      { status: 500 }
    );
  }
}


// DELETE /api/products/:id
export async function DELETE(
  request: NextRequest,
  context: Promise<{ params: { id: string } }>
) {
  const { params } = await context;
  const id = params.id;

  try {
    await prisma.variant.deleteMany({
      where: { productId: id },
    });

    await prisma.product.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Produk berhasil dihapus" });
  } catch (error) {
    console.error("❌ Error DELETE /products/:id", error);
    return NextResponse.json(
      { message: "Gagal menghapus produk" },
      { status: 500 }
    );
  }
}
