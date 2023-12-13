import { NextResponse, NextRequest } from "next/server";
import prisma from "@/prisma/client";
import { connectToDatabase } from "@/lib";

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    const checklistStageBegeleider =
      await prisma.checkListSectionStageBegeleider.findMany({});
    return NextResponse.json(checklistStageBegeleider, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  } finally {
    prisma.$disconnect();
  }
}


export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    await connectToDatabase();
    const checklist = await prisma.checkListSectionStageBegeleider.create({
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
