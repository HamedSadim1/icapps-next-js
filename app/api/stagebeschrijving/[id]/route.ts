import { connectToDatabase } from "@/lib";
import { NextResponse, NextRequest } from "next/server";
import prisma from "@/prisma/client";

interface Params {
  params: { id: string };
}

export async function GET(request: NextRequest, { params: { id } }: Params) {
  try {
    await connectToDatabase();
    const stagebeschriving = await prisma.stageBeschrijving.findUnique({
      where: { id: id },
    });
    return NextResponse.json(stagebeschriving, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error }, { status: 400 });
  } finally {
    prisma.$disconnect();
  }
}

export async function PATCH(request: NextRequest, { params: { id } }: Params) {
  try {
    const body = await request.json();
    await connectToDatabase();
    const stagebeschriving = await prisma.stageBeschrijving.update({
      where: { id: id },
      data: body,
    });
    return NextResponse.json(stagebeschriving, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error }, { status: 400 });
  } finally {
    prisma.$disconnect();
  }
}
