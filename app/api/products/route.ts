export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const start = Date.now();
  const logTime = (label: string) =>
    console.log(`⏱️ ${label}: ${Date.now() - start}ms`);

  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);
  const skip = (page - 1) * limit;

  try {
    logTime("Start");

    const totalItems = await prisma.product.count();
    logTime("Count query");

    const products = await prisma.product.findMany({
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
      include: {
        variants: true, // ✅ Sertakan relasi variants
      },
    });
    logTime("FindMany query");

    const totalPages = Math.ceil(totalItems / limit);
    logTime("Total pages calculated");

    return NextResponse.json(
      { products, totalPages },
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
