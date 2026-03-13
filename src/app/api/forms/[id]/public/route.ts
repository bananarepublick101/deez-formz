import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const form = await prisma.form.findUnique({
    where: { id, published: true },
    select: {
      id: true,
      title: true,
      description: true,
      questions: {
        orderBy: { order: "asc" },
        select: {
          id: true,
          type: true,
          title: true,
          description: true,
          required: true,
          options: true,
          order: true,
        },
      },
    },
  });

  if (!form) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(form);
}
