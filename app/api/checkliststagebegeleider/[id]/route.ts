import { connectToDatabase } from "@/lib";
import prisma from "@/prisma/client";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest, { params: { id } }: Params) {
  //for items checked
  try {
    await connectToDatabase();
    const data = await request.json();
    const checklist = await prisma.checkListSectionStageBegeleider.update({
      where: { id: id },
      data: {
       sectionTitle:data.sectionTitle
      },
    });
    return NextResponse.json(checklist, { status: 201 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
