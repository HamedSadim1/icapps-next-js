import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { connectToDatabase } from "@/lib";

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    const documents = await prisma.document.findMany();
    return NextResponse.json(documents, { status: 200 });
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
    const document = await prisma.document.create({
      data: {
        title: body.title,
        url: body.url,
        stagiairID: body.stagiairID,
      },
    });
    return NextResponse.json(document, { status: 201 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  } finally {
    prisma.$disconnect();
  }
}
