import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { connectToDatabase } from "@/lib";

interface Params {
  params: { id: string };
}

export async function GET(request: NextRequest, { params }: Params) {
  try {
    // if (!params || !params.users.stagebegeleider.id) {
    //   return NextResponse.json({ message: "Invalid request" }, { status: 400 });
    // }
    await connectToDatabase();
    const stagebegeleider = await prisma.stageBegeleider.findUnique({
      where: { id: params.id },
    });

    if (!stagebegeleider) {
      return NextResponse.json(
        { message: "Stagebegeleider not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(stagebegeleider, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error }, { status: 400 });
  } finally {
    prisma.$disconnect();
  }
}
