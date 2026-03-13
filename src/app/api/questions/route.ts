import { NextResponse } from "next/server";
import { getSessionOrDev } from "@/lib/dev-auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const session = await getSessionOrDev();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { formId, type, title, description, required, options, order } =
    await req.json();

  const form = await prisma.form.findUnique({
    where: { id: formId, userId: session.user.id },
  });

  if (!form) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const question = await prisma.question.create({
    data: { formId, type, title, description, required, options, order },
  });

  return NextResponse.json(question, { status: 201 });
}
