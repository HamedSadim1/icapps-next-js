import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { connectToDatabase } from "@/lib";

interface Params {
  params: { id: string };
}

export async function GET(request: NextRequest, { params: { id } }: Params) {
  try {
    await connectToDatabase();
    const document = await prisma.document.findUnique({
      where: { id },
    });
    return NextResponse.json(document, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error }, { status: 400 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function DELETE(request: NextRequest, { params: { id } }: Params) {
  try {
    await connectToDatabase();

    // Check if the document exists
    const existingDocument = await prisma.document.findUnique({
      where: {
        id,
      },
      include: {
        comments: true,
      },
    });

    if (!existingDocument) {
      return NextResponse.json(
        { error: "Document not found" },
        { status: 404 }
      );
    }

    // Delete all comments related to the document
    await prisma.documentComment.deleteMany({
      where: {
        documentID: id,
      },
    });

    // Delete the document
    const deletedDocument = await prisma.document.delete({
      where: {
        id,
      },
      include: {
        comments: true,
      },
    });

    return NextResponse.json(deletedDocument, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error }, { status: 400 });
  } finally {
    prisma.$disconnect();
  }
}
