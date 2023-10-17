import { connectToDatabase } from "@/lib";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

interface Params {
  params: { id: string };
}

export async function GET(request: NextRequest, { params: { id } }: Params) {
  try {
    await connectToDatabase();
    const users = await prisma.user.findUnique({
      where: { id },
    });
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error }, { status: 400 });
  }
}

export async function PATCH(request: NextRequest, { params: { id } }: Params) {
  try {
    const body = await request.json();
    await connectToDatabase();

    const user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        name: body.name,
        email: body.email,
        img: body.img,
        stagiairID: body.stagiairID,
      },
    });

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error }, { status: 400 });
  } finally {
    await prisma.$disconnect();
  }
}
