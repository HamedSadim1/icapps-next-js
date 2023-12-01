import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { connectToDatabase } from "@/lib";

interface Params {
  params: { id: string };
}

export async function GET(
  request: NextRequest,
  { params: { id: id } }: Params
) {
  try {
    await connectToDatabase();
    const stagiair = await prisma.stagiair.findUnique({
      where: { id: id },
      include: {
        stagebegeleider: true,
        stagebeschriving: true,
        checkliststagebegeleider: true,
        user: true,
        documents: { include: { comments: true } },
        posts: {
          include: {
            comments: true,
          },
        },
        checklistsection: {
          include: {
            items: true,
          },
        },
      },
    });

    if (!stagiair) {
      return NextResponse.json(
        { message: "Stagiair not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(stagiair, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error }, { status: 400 });
  } finally {
    prisma.$disconnect();
  }
}

export async function PATCH(request: NextRequest, { params: { id } }: Params) {
  try {
    const body = await request.json();
    await connectToDatabase();

    const stagiair = await prisma.stagiair.update({
      where: { id: id },
      data: {
        name: body.name,
        email: body.email,
        role: body.role,
        startDate: body.startDate,
        endDate: body.endDate,
        stagebegeleiderId: {
          set: body.stagebegeleiderId,
        },
      },
    });

    if (!stagiair) {
      return NextResponse.json(
        { message: "Stagiair not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(stagiair, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error }, { status: 400 });
  } finally {
    prisma.$disconnect();
  }
}
