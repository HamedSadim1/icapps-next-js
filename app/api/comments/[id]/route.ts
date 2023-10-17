import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { connectToDatabase } from "@/lib";

interface Params {
  params: { id: string };
}

export async function GET(request: NextRequest, { params: { id } }: Params) {
  try {
    await connectToDatabase();
    const comments = await prisma.comment.findUnique({
      where: { id },
    });
    return NextResponse.json(comments, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  } finally {
    prisma.$disconnect();
  }
}

export async function PATCH(request: NextRequest, { params: { id } }: Params) {
  try {
    await connectToDatabase();
    const body = await request.json();
    const comment = await prisma.comment.update({
      where: {
        id,
      },
      data: {
        comment: body.comment,
        postId: body.postId,
      },
    });
    return NextResponse.json(comment, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  } finally {
  }
}
