import { connectToDatabase } from "@/lib";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    const stagiairs = await prisma.stagiair.findMany();
    return NextResponse.json(stagiairs, { status: 200 });
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

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    const { name, email } = await request.json();
    if (!name || !email) {
      return NextResponse.json({ message: "Invalid Request" }, { status: 400 });
    }

    await connectToDatabase();

    // const stagiair = await prisma.stagiair.create({
    //   data: {
    //     name,
    //     email,
    //   },
    // });
    // return NextResponse.json(stagiair, { status: 201 });
  } catch (error) {
  } finally {
  }
}
