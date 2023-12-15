import { NextResponse, NextRequest } from "next/server";
import prisma from "@/prisma/client";
import { connectToDatabase } from "@/lib";

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    const checklist = await prisma.checklistSection.findMany({
      include: {
        items: true,
      },
    });
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
    const checklist = await prisma.checklistSection.create({
      data: {
        sectionTitle: data.sectionTitle,
        stagiairID: data.stagiairID,
      },
    });

    return NextResponse.json(checklist, { status: 201 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  } finally {
    prisma.$disconnect();
  }
}
