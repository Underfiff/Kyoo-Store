import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await req.json();

    const updated = await prisma.product.update({
      where: { id: params.id },
      data: {
        name: data.name,
        category: data.category,
        price: Number(data.price),
        description: data.description,
        imageUrl: data.imageUrl,
        status: data.status ?? "TERSEDIA",
      },
    });

    return NextResponse.json(updated);
  } catch (err) {
    // ⛑️ Gunakan safe check & logging yang bersih
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2025"
    ) {
      return NextResponse.json(
        { message: "Produk tidak ditemukan" },
        { status: 404 }
      );
    }

    console.error("❌ Update error:", err instanceof Error ? err.message : err);

    return NextResponse.json(
      { message: "Gagal update produk" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.product.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: "Produk berhasil dihapus" });
  } catch (error) {
    console.error("❌ Error hapus produk:", error);
    return NextResponse.json(
      { message: "Gagal menghapus produk" },
      { status: 500 }
    );
  }
}
