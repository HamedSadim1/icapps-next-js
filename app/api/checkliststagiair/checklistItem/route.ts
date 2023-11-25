import { NextResponse, NextRequest } from "next/server";
import prisma from "@/prisma/client";
import { connectToDatabase } from "@/lib";

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    const checklist = await prisma.checklistItem.findMany({});
    return NextResponse.json(checklist, { status: 200 });
  } catch (error) {
  } finally {
    prisma.$disconnect();
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    await connectToDatabase();
    const checklist = await prisma.checklistItem.create({
      data: {
        title: data.title,
        isChecked: data.isChecked,
        checklistItemSectionID: data.checklistItemSectionID,
        date: data.date,

      },
    });

    return NextResponse.json(checklist, { status: 201 });
  } catch (error) {
    NextResponse.json(error, { status: 500 });
  } finally {
    prisma.$disconnect();
  }
}
