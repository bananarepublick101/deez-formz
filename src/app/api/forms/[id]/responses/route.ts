import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const form = await prisma.form.findUnique({
    where: { id, published: true },
    include: { questions: true },
  });

  if (!form) {
    return NextResponse.json({ error: "Form not found" }, { status: 404 });
  }

  const { answers } = await req.json();

  const response = await prisma.response.create({
    data: {
      formId: id,
      answers: {
        create: Object.entries(answers as Record<string, string>).map(
          ([questionId, value]) => ({
            questionId,
            value: String(value),
          })
        ),
      },
    },
    include: { answers: true },
  });

  return NextResponse.json(response, { status: 201 });
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const form = await prisma.form.findUnique({
    where: { id, userId: session.user.id },
  });

  if (!form) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const responses = await prisma.response.findMany({
    where: { formId: id },
    include: { answers: { include: { question: true } } },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(responses);
}
