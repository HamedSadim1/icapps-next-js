import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { connectToDatabase } from "@/lib";

interface Params {
  params: { id: string };
}

export async function GET(request: NextRequest, { params: { id } }: Params) {
  try {
    await connectToDatabase();
    const doel = await prisma.doelen.findUnique({
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

export async function PATCH(request: NextRequest, { params: { id } }: Params) {
  try {
    await connectToDatabase();
    const body = await request.json();
    const doel = await prisma.doelen.update({
      where: {
        id,
      },
      data: {
        title: body.title,
        body: body.body,
      },
    });
    return NextResponse.json(doel, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error }, { status: 400 });
  } finally {
    prisma.$disconnect();
  }
}

export async function DELETE(request: NextRequest, { params: { id } }: Params) {
  try {
    await connectToDatabase();
    const doel = await prisma.doelen.delete({
      where: {
        id,
      },
      include: {
        comments: true,
      },
    });
    return NextResponse.json(doel, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error }, { status: 400 });
  } finally {
    prisma.$disconnect();
  }
}
