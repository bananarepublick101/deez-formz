"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, MessageSquare, Calendar, ChevronDown, ChevronUp } from "lucide-react";

interface Answer {
  id: string;
  value: string;
  question: {
    id: string;
    title: string;
    type: string;
    order: number;
  };
}

interface Response {
  id: string;
  createdAt: string;
  answers: Answer[];
}

interface Form {
  id: string;
  title: string;
  questions: { id: string; title: string; type: string; order: number }[];
}

export default function ResponsesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { status } = useSession();
  const router = useRouter();
  const [form, setForm] = useState<Form | null>(null);
  const [responses, setResponses] = useState<Response[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/signin");
    if (status === "authenticated") {
      Promise.all([
        fetch(`/api/forms/${id}`).then((r) => r.json()),
        fetch(`/api/forms/${id}/responses`).then((r) => r.json()),
      ]).then(([formData, responsesData]) => {
        setForm(formData);
        setResponses(Array.isArray(responsesData) ? responsesData : []);
        setLoading(false);
      });
    }
  }, [status, id, router]);

  if (loading || !form) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <header className="border-b">
        <div className="container mx-auto flex h-14 items-center gap-3 px-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push(`/builder/${id}`)}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex-1">
            <h1 className="text-lg font-semibold">{form.title}</h1>
          </div>
          <Badge variant="secondary">
            <MessageSquare className="mr-1 h-3 w-3" />
            {responses.length} response{responses.length !== 1 && "s"}
          </Badge>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {responses.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-16">
            <MessageSquare className="mb-4 h-12 w-12 text-muted-foreground" />
            <h3 className="text-lg font-semibold">No responses yet</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Share your form to start collecting responses
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Summary table */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">All Responses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b text-left">
                        <th className="pb-3 pr-4 font-medium text-muted-foreground">#</th>
                        <th className="pb-3 pr-4 font-medium text-muted-foreground">Submitted</th>
                        {form.questions
                          .sort((a, b) => a.order - b.order)
                          .map((q) => (
                            <th
                              key={q.id}
                              className="max-w-48 truncate pb-3 pr-4 font-medium text-muted-foreground"
                            >
                              {q.title}
                            </th>
                          ))}
                        <th className="pb-3 font-medium text-muted-foreground"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {responses.map((response, i) => {
                        const answerMap = new Map(
                          response.answers.map((a) => [a.question.id, a.value])
                        );
                        return (
                          <tr
                            key={response.id}
                            className="border-b last:border-0 hover:bg-muted/50"
                          >
                            <td className="py-3 pr-4 text-muted-foreground">
                              {responses.length - i}
                            </td>
                            <td className="whitespace-nowrap py-3 pr-4 text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {new Date(response.createdAt).toLocaleDateString(
                                  undefined,
                                  {
                                    month: "short",
                                    day: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  }
                                )}
                              </span>
                            </td>
                            {form.questions
                              .sort((a, b) => a.order - b.order)
                              .map((q) => (
                                <td
                                  key={q.id}
                                  className="max-w-48 truncate py-3 pr-4"
                                >
                                  {answerMap.get(q.id) || "—"}
                                </td>
                              ))}
                            <td className="py-3">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                  setExpandedId(
                                    expandedId === response.id
                                      ? null
                                      : response.id
                                  )
                                }
                              >
                                {expandedId === response.id ? (
                                  <ChevronUp className="h-4 w-4" />
                                ) : (
                                  <ChevronDown className="h-4 w-4" />
                                )}
                              </Button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Expanded response detail */}
            {expandedId && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Response Detail</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {responses
                    .find((r) => r.id === expandedId)
                    ?.answers.sort(
                      (a, b) => a.question.order - b.question.order
                    )
                    .map((answer) => (
                      <div key={answer.id}>
                        <p className="text-sm font-medium text-muted-foreground">
                          {answer.question.title}
                        </p>
                        <p className="mt-1">{answer.value || "—"}</p>
                        <Separator className="mt-4" />
                      </div>
                    ))}
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
