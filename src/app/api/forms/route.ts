import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const forms = await prisma.form.findMany({
    where: { userId: session.user.id },
    include: {
      _count: { select: { questions: true, responses: true } },
    },
    orderBy: { updatedAt: "desc" },
  });

  return NextResponse.json(forms);
}

export async function POST(req: Request) {
  const session = await auth();
  console.log("POST /api/forms session:", JSON.stringify(session?.user));
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized", debug: { hasSession: !!session, hasUser: !!session?.user, userId: session?.user?.id } }, { status: 401 });
  }

  try {
    const { title, description } = await req.json();

    const form = await prisma.form.create({
      data: {
        title: title || "Untitled Form",
        description,
        userId: session.user.id,
      },
    });

    return NextResponse.json(form, { status: 201 });
  } catch (error) {
    console.error("POST /api/forms error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    );
  }
}
