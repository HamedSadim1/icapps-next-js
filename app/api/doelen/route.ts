import { NextResponse, NextRequest } from "next/server";
import prisma from "@/prisma/client";
import { connectToDatabase } from "@/lib";

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    const doelen = await prisma.doelen.findMany();
    return NextResponse.json(doelen, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  } finally {
    prisma.$disconnect();
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    await connectToDatabase();
    const doel = await prisma.doelen.create({
      data: body,
    });
    return NextResponse.json(doel, { status: 201 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  } finally {
    prisma.$disconnect();
  }
}
