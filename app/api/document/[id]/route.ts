import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { connectToDatabase } from "@/lib";

interface Params {
  params: { id: string };
}

export async function GET(request: NextRequest, { params: { id } }: Params) {
  try {
    await connectToDatabase();
    const doel = await prisma.document.findUnique({
      where: { id },
    });
    return NextResponse.json(doel, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error }, { status: 400 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function DELETE(request: NextRequest, { params: { id } }: Params) {
  try {
    await connectToDatabase();
    // before deleting the document, delete all comments
    await prisma.document.deleteMany({
      where: {
        id: id,
      },
    });
    // delete the document
    const doel = await prisma.document.delete({
      where: {
        id,
      }
    });
    return NextResponse.json(doel, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error }, { status: 400 });
  } finally {
    prisma.$disconnect();
  }
}
