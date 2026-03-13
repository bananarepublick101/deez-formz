"use client";

import { useEffect, useState, use } from "react";
import { FormFiller } from "@/components/filler/form-filler";

interface Question {
  id: string;
  type: string;
  title: string;
  description: string | null;
  required: boolean;
  options: string[] | null;
  order: number;
}

interface Form {
  id: string;
  title: string;
  description: string | null;
  questions: Question[];
}

export default function FormPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [form, setForm] = useState<Form | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function load() {
      const res = await fetch(`/api/forms/${id}/public`);
      if (!res.ok) {
        setNotFound(true);
        return;
      }
      setForm(await res.json());
    }
    load();
  }, [id]);

  if (notFound) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Form not found</h1>
          <p className="mt-2 text-muted-foreground">
            This form doesn&apos;t exist or is no longer available.
          </p>
        </div>
      </div>
    );
  }

  if (!form) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return <FormFiller form={form} />;
}
