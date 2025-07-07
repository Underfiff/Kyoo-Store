// app/api/products/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// ✅ Handler POST (Tambah produk)
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, category, price, description, imageUrl } = body;

    const product = await prisma.product.create({
      data: {
        name,
        category,
        price: Number(price),
        description,
        imageUrl,
        status: "TERSEDIA",
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("❌ Error saat tambah produk:", error);
    return NextResponse.json(
      { message: "Gagal menambahkan produk" },
      { status: 500 }
    );
  }
}

// ✅ Handler GET (Ambil semua produk)
export async function GET() {
  try {
    const products = await prisma.product.findMany();
    return NextResponse.json(products);
  } catch (error) {
    console.error("❌ Error ambil produk:", error);
    return NextResponse.json(
      { message: "Gagal mengambil produk" },
      { status: 500 }
    );
  }
}
