import { NextResponse, NextRequest } from "next/server";
import prisma from "@/prisma/client";
import { connectToDatabase } from "@/lib";

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    const checklistStageBegeleider =
      await prisma.checkListStageBegeleider.findMany();
    return NextResponse.json(checklistStageBegeleider, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  } finally {
    prisma.$disconnect();
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    await connectToDatabase();
    const checklistStageBegeleider =
      await prisma.checkListStageBegeleider.create({
        data: {
          sectionTitle: body.sectionTitle,
          stagiairID: body.stagiairID,
        },
      });
    return NextResponse.json(checklistStageBegeleider, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  } finally {
    prisma.$disconnect();
  }
}
