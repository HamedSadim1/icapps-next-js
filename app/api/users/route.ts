import { connectToDatabase } from "@/lib";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

interface Params {
  params: { id: string };
}

export function GET(request: NextRequest) {
  return NextResponse.json({ message: "Hello, world!" });
}

export async function POST(request: NextRequest) {
  try {
    const { name, email } = await request.json();
    if (!name || !email) {
      return NextResponse.json({ message: "Invalid Request" }, { status: 400 });
    }
    await connectToDatabase();
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
      },
    });
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
