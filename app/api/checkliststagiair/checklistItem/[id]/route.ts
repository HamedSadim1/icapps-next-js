import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { connectToDatabase } from "@/lib";

interface Params {
  params: { id: string };
}

export async function GET(request: NextRequest, { params: { id } }: Params) {
  try {
    await connectToDatabase();
    const document = await prisma.checklistItem.findUnique({
      where: { id },
    });
    return NextResponse.json(document, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function DELETE(request: NextRequest, { params: { id } }: Params) {
  try {
    await connectToDatabase();

    await prisma.document.delete({
      where: {
        id: id,
      },
    });

    return NextResponse.json(document, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  } finally {
    prisma.$disconnect();
  }
}

export async function PATCH(request: NextRequest, { params: { id } }: Params) {
  //for items checked
  try {
    await connectToDatabase();
    const data = await request.json();
    const checklist = await prisma.checklistItem.update({
      where: { id: id },
      data: {
        isChecked: data.isChecked,
        title: data.title,
        date: data.date,
      },
    });
    return NextResponse.json(checklist, { status: 201 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
