import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

const isDev = process.env.NODE_ENV === "development";

export async function getSessionOrDev() {
  const session = await auth();
  if (session?.user?.id) return session;

  if (!isDev) return null;

  // In dev mode, return the first user in the database as a fallback
  const user = await prisma.user.findFirst();
  if (!user) return null;

  return {
    user: { id: user.id, name: user.name, email: user.email, image: user.image },
    expires: new Date(Date.now() + 86400000).toISOString(),
  };
}
