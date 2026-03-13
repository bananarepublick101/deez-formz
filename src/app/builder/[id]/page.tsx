"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { BuilderHeader } from "@/components/builder/builder-header";
import { QuestionList } from "@/components/builder/question-list";
import { QuestionEditor } from "@/components/builder/question-editor";
import { AddQuestionButton } from "@/components/builder/add-question-button";
import type { QuestionType } from "@/lib/types";

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
  published: boolean;
  questions: Question[];
}

export default function BuilderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { status } = useSession();
  const router = useRouter();
  const [form, setForm] = useState<Form | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
      return;
    }
    if (status !== "authenticated") return;
    let cancelled = false;
    fetch(`/api/forms/${id}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (cancelled) return;
        if (!data) { router.push("/dashboard"); return; }
        setForm(data);
      });
    return () => { cancelled = true; };
  }, [status, router, id]);

  const selectedQuestion = form?.questions.find((q) => q.id === selectedId) ?? null;

  async function updateTitle(title: string) {
    if (!form) return;
    setForm({ ...form, title });
    await fetch(`/api/forms/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });
  }

  async function togglePublish() {
    if (!form) return;
    const res = await fetch(`/api/forms/${id}/publish`, { method: "PATCH" });
    const updated = await res.json();
    setForm({ ...form, published: updated.published });
  }

  async function addQuestion(type: QuestionType) {
    if (!form) return;
    setSaving(true);
    const res = await fetch("/api/questions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        formId: id,
        type,
        title: "Untitled Question",
        order: form.questions.length,
      }),
    });
    const question = await res.json();
    setForm({ ...form, questions: [...form.questions, question] });
    setSelectedId(question.id);
    setSaving(false);
  }

  async function updateQuestion(questionId: string, data: Partial<Question>) {
    if (!form) return;
    setForm({
      ...form,
      questions: form.questions.map((q) =>
        q.id === questionId ? { ...q, ...data } : q
      ),
    });
    await fetch(`/api/questions/${questionId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  }

  async function deleteQuestion(questionId: string) {
    if (!form) return;
    const updated = form.questions.filter((q) => q.id !== questionId);
    setForm({ ...form, questions: updated });
    if (selectedId === questionId) setSelectedId(null);
    await fetch(`/api/questions/${questionId}`, { method: "DELETE" });
  }

  async function reorderQuestions(questions: Question[]) {
    if (!form) return;
    const reordered = questions.map((q, i) => ({ ...q, order: i }));
    setForm({ ...form, questions: reordered });
    await Promise.all(
      reordered.map((q) =>
        fetch(`/api/questions/${q.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ order: q.order }),
        })
      )
    );
  }

  if (!form) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <BuilderHeader
        form={form}
        onTitleChange={updateTitle}
        onTogglePublish={togglePublish}
      />
      <div className="flex flex-1">
        <div className="w-96 border-r overflow-y-auto p-4 space-y-2">
          <QuestionList
            questions={form.questions}
            selectedId={selectedId}
            onSelect={setSelectedId}
            onReorder={reorderQuestions}
            onDelete={deleteQuestion}
          />
          <AddQuestionButton onAdd={addQuestion} disabled={saving} />
        </div>
        <div className="flex-1 p-6">
          {selectedQuestion ? (
            <QuestionEditor
              question={selectedQuestion}
              onUpdate={(data) => updateQuestion(selectedQuestion.id, data)}
            />
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground">
              Select a question to edit or add a new one
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
