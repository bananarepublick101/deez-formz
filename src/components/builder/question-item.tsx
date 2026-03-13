"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "@/components/ui/button";
import { QUESTION_TYPE_CONFIG } from "@/lib/types";
import type { QuestionType } from "@/lib/types";
import { GripVertical, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuestionItemProps {
  question: { id: string; type: string; title: string };
  index: number;
  isSelected: boolean;
  onSelect: () => void;
  onDelete: () => void;
}

export function QuestionItem({
  question,
  index,
  isSelected,
  onSelect,
  onDelete,
}: QuestionItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: question.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const config = QUESTION_TYPE_CONFIG[question.type as QuestionType];
  const Icon = config?.icon;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "flex items-center gap-2 rounded-lg border p-3 transition-colors",
        isSelected && "border-primary bg-primary/5",
        isDragging && "opacity-50"
      )}
    >
      <button
        className="cursor-grab text-muted-foreground hover:text-foreground"
        {...attributes}
        {...listeners}
      >
        <GripVertical className="h-4 w-4" />
      </button>
      <button
        className="flex flex-1 items-center gap-2 text-left"
        onClick={onSelect}
      >
        {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
        <div className="min-w-0 flex-1">
          <p className="text-xs text-muted-foreground">
            {index + 1}. {config?.label}
          </p>
          <p className="truncate text-sm font-medium">{question.title}</p>
        </div>
      </button>
      <Button
        variant="ghost"
        size="sm"
        className="h-7 w-7 p-0 text-muted-foreground hover:text-destructive"
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
      >
        <Trash2 className="h-3.5 w-3.5" />
      </Button>
    </div>
  );
}
