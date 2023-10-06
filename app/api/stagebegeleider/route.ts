import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import schema from "./schema";
import { connectToDatabase } from "@/lib";

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    const stageBegeleiders = await prisma.stageBegeleider.findMany();
    return NextResponse.json(stageBegeleiders, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error }, { status: 400 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedBody = schema.parse(body);

    await connectToDatabase();
    const stageBegeleider = await prisma.stageBegeleider.create({
      data: validatedBody,
    });
    return NextResponse.json(stageBegeleider, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error }, { status: 400 });
  } finally {
    await prisma.$disconnect();
  }
}
