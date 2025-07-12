export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const start = Date.now();
  const logTime = (label: string) =>
    console.log(`⏱️ ${label}: ${Date.now() - start}ms`);

  try {
    logTime("Start");

    const products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        variants: true,
      },
    });

    logTime("FindMany query");

    return NextResponse.json(
      { products },
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
        },
      }
    );
  } catch (error) {
    console.error("❌ Error ambil produk:", error);
    return NextResponse.json(
      { message: "Gagal mengambil produk" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, category, price, description, imageUrl, variants } = body;

    const product = await prisma.product.create({
      data: {
        name,
        category,
        price: Number(price),
        description,
        imageUrl,
        status: "TERSEDIA",
        variants: {
          create: variants.map(
            (variant: { label: string; price: number | string }) => ({
              label: variant.label,
              price: Number(variant.price),
            })
          ),
        },
      },
      include: {
        variants: true,
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
