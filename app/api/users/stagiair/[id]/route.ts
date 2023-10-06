import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { connectToDatabase } from "@/lib";

interface Params {
  params: { id: string };
}

export async function GET({ params: { id: id } }: Params) {
  try {
    await connectToDatabase();
    const stagiair = await prisma.stagiair.findUnique({
      where: { id: id },
    });

    if (!stagiair) {
      return NextResponse.json(
        { message: "Stagiair not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(stagiair, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error }, { status: 400 });
  } finally {
    prisma.$disconnect();
  }
}
