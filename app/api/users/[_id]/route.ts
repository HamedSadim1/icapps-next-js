import { connectToDatabase } from "@/lib";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

interface Params {
  params: { _id: string };
}

export async function GET(request: NextRequest, { params }: Params) {
  try {
    await connectToDatabase();
    const users = await prisma.user.findUnique({
      where: { id: params._id },
    });
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error }, { status: 400 });
  }
}

// export async function PUT(request: NextRequest, { params: { id } }: Params) {
//   const body = await request.json();
//   if (!body.name) {
//     return NextResponse.json({ message: "Invalid Request" }, { status: 400 });
//   }
//   return NextResponse.json({ message: `Hello, ${id}!` });
// }

// export async function DELETE(request: NextRequest, { params: { id } }: Params) {
//   const body = await request.json();
//   if (!body.name) {
//     return NextResponse.json({ message: "Invalid Request" }, { status: 400 });
//   }
//   return NextResponse.json({ message: `Hello, ${id}!` });
// }
