import { NextResponse } from "next/server";
import { getSessionOrDev } from "@/lib/dev-auth";
import { prisma } from "@/lib/prisma";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = await getSessionOrDev();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const question = await prisma.question.findUnique({
    where: { id },
    include: { form: true },
  });

  if (!question || question.form.userId !== session.user.id) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const data = await req.json();

  const updated = await prisma.question.update({
    where: { id },
    data: {
      type: data.type,
      title: data.title,
      description: data.description,
      required: data.required,
      options: data.options,
      order: data.order,
    },
  });

  return NextResponse.json(updated);
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = await getSessionOrDev();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const question = await prisma.question.findUnique({
    where: { id },
    include: { form: true },
  });

  if (!question || question.form.userId !== session.user.id) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await prisma.question.delete({ where: { id } });

  return NextResponse.json({ success: true });
}
