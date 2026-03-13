"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DeleteFormDialog } from "./delete-form-dialog";
import { MoreHorizontal, Pencil, Trash2, Eye, MessageSquare } from "lucide-react";

interface FormCardProps {
  form: {
    id: string;
    title: string;
    description: string | null;
    published: boolean;
    createdAt: string;
    _count: { questions: number; responses: number };
  };
  onDeleted: () => void;
}

export function FormCard({ form, onDeleted }: FormCardProps) {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      <Card
        className="cursor-pointer transition-colors hover:border-primary/50"
        onClick={() => router.push(`/builder/${form.id}`)}
      >
        <CardHeader className="flex flex-row items-start justify-between space-y-0">
          <div className="space-y-1">
            <CardTitle className="text-lg">{form.title}</CardTitle>
            {form.description && (
              <CardDescription>{form.description}</CardDescription>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={form.published ? "default" : "secondary"}>
              {form.published ? "Published" : "Draft"}
            </Badge>
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={(e) => e.stopPropagation()}
                  />
                }
              >
                <MoreHorizontal className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/builder/${form.id}`);
                  }}
                >
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/forms/${form.id}/responses`);
                  }}
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Responses
                </DropdownMenuItem>
                {form.published && (
                  <DropdownMenuItem
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(`/form/${form.id}`, "_blank");
                    }}
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    View
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    setDeleteOpen(true);
                  }}
                  className="text-destructive"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Pencil className="h-3 w-3" />
              {form._count.questions} question{form._count.questions !== 1 && "s"}
            </span>
            <span className="flex items-center gap-1">
              <MessageSquare className="h-3 w-3" />
              {form._count.responses} response{form._count.responses !== 1 && "s"}
            </span>
          </div>
        </CardContent>
      </Card>

      <DeleteFormDialog
        formId={form.id}
        formTitle={form.title}
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        onDeleted={onDeleted}
      />
    </>
  );
}
