import { connectToDatabase } from "@/lib";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import schema from "./schema";

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    const stagiairs = await prisma.stagiair.findMany({
      include: {
        stagebegeleider: true,
        stagebeschriving: true,
        checkliststagebegeleider: true,
        posts: {
          include: {
            comments: true,
          },
        },
        checkListStagiair: true,
        documents:true
      },
      orderBy: {
        startDate: "asc",
      },
    });
    return NextResponse.json(stagiairs, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    // const validatedBody = schema.parse(body);
    await connectToDatabase();

    const stagiairCreated = await prisma.stagiair.create({
      data: body,
    });
    return NextResponse.json(stagiairCreated, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error }, { status: 400 });
  } finally {
    await prisma.$disconnect();
  }
}
