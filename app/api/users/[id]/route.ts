import { NextRequest, NextResponse } from "next/server";

interface Params {
  params: { id: string };
}

export function GET(request: NextRequest, { params: { id } }: Params) {
  return NextResponse.json({ message: `Hello, ${id}!` });
}

export async function PUT(request: NextRequest, { params: { id } }: Params) {
  const body = await request.json();
  if (!body.name) {
    return NextResponse.json({ message: "Invalid Request" }, { status: 400 });
  }
  return NextResponse.json({ message: `Hello, ${id}!` });
}

export async function DELETE(request: NextRequest, { params: { id } }: Params) {
  const body = await request.json();
  if (!body.name) {
    return NextResponse.json({ message: "Invalid Request" }, { status: 400 });
  }
  return NextResponse.json({ message: `Hello, ${id}!` });
}
