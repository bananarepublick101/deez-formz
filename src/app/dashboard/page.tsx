"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { FormCard } from "@/components/dashboard/form-card";
import { CreateFormDialog } from "@/components/dashboard/create-form-dialog";
import { FileText } from "lucide-react";

interface Form {
  id: string;
  title: string;
  description: string | null;
  published: boolean;
  createdAt: string;
  _count: { questions: number; responses: number };
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [forms, setForms] = useState<Form[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchForms = useCallback(async () => {
    const res = await fetch("/api/forms");
    if (res.ok) {
      setForms(await res.json());
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
      return;
    }
    if (status !== "authenticated") return;
    let cancelled = false;
    fetch("/api/forms")
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => {
        if (!cancelled) {
          setForms(data);
          setLoading(false);
        }
      });
    return () => { cancelled = true; };
  }, [status, router]);

  if (status === "loading" || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <header className="border-b">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <h1 className="text-xl font-bold text-primary">Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              {session?.user?.name ?? session?.user?.email}
            </span>
            <Button size="sm" onClick={() => signOut({ callbackUrl: "/" })}>
              Sign Out
            </Button>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold">Your Forms</h2>
            <p className="mt-1 text-muted-foreground">
              Create and manage your forms
            </p>
          </div>
          <CreateFormDialog />
        </div>

        {forms.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-16">
            <FileText className="mb-4 h-12 w-12 text-muted-foreground" />
            <h3 className="text-lg font-semibold">No forms yet</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Create your first form to get started
            </p>
            <div className="mt-4">
              <CreateFormDialog />
            </div>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {forms.map((form) => (
              <FormCard key={form.id} form={form} onDeleted={fetchForms} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
