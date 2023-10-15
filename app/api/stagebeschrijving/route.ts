import { connectToDatabase } from "@/lib";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    const stagebeschriving = await prisma.stageBeschrijving.findMany();
    return NextResponse.json(stagebeschriving, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error }, { status: 400 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    await connectToDatabase();
    const stagebeschriving = await prisma.stageBeschrijving.create({
      data: body,
    });
    return NextResponse.json(stagebeschriving, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error }, { status: 400 });
  } finally {
    await prisma.$disconnect();
  }
}
