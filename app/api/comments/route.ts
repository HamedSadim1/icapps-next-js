import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { connectToDatabase } from "@/lib";

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    const comments = await prisma.comment.findMany();
    return NextResponse.json(comments, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  } finally {
    prisma.$disconnect();
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    await connectToDatabase();
    const comment = await prisma.comment.create({
      data: body,
    });
    return NextResponse.json(comment, { status: 201 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  } finally {
    prisma.$disconnect();
  }
}
