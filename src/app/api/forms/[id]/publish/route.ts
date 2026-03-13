import { NextResponse } from "next/server";
import { getSessionOrDev } from "@/lib/dev-auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = await getSessionOrDev();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const form = await prisma.form.findUnique({
    where: { id, userId: session.user.id },
  });

  if (!form) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const updated = await prisma.form.update({
    where: { id },
    data: { published: !form.published },
  });

  return NextResponse.json(updated);
}
