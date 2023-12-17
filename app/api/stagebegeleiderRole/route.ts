import { connectToDatabase } from "@/lib";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    // const name = request.nextUrl.searchParams.get("name") as string | undefined;
    // const page = parseInt(request.nextUrl.searchParams.get("page") || "1", 10);
    // const pageSize = parseInt(request.nextUrl.searchParams.get("pageSize") || "10", 10);

    // let whereClause = {};

    // if (name) {
    //   whereClause = {
    //     name: {
    //       contains: name,
    //       mode: "insensitive",
    //     },
    //   };
    // }

    const stagiairs = await prisma.stagiair.findMany({
      // where: whereClause,
      include: {
        stagebegeleider: true,
        stagebeschriving: true,
        checklistSectionStagebegeleider: true,
        posts: {
          include: {
            comments: true,
          },
        },
        documents: { include: { comments: true } },
        checklistsection: {
          include: {
            items: true,
          },
        },
      },
      // skip: (page - 1) * pageSize,
      // take: pageSize,
      orderBy: {
        startDate: "asc",
      },
    });

    // const totalStagiairs = await prisma.stagiair.count();
    // const totalPage = Math.ceil(totalStagiairs / pageSize);

    return NextResponse.json( stagiairs, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
