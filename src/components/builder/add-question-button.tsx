"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { QUESTION_TYPES, QUESTION_TYPE_CONFIG } from "@/lib/types";
import type { QuestionType } from "@/lib/types";
import { Plus } from "lucide-react";

interface AddQuestionButtonProps {
  onAdd: (type: QuestionType) => void;
  disabled?: boolean;
}

export function AddQuestionButton({ onAdd, disabled }: AddQuestionButtonProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={<Button variant="outline" className="w-full" disabled={disabled} />}
      >
        <Plus className="mr-2 h-4 w-4" />
        Add Question
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {QUESTION_TYPES.map((type) => {
          const config = QUESTION_TYPE_CONFIG[type];
          const Icon = config.icon;
          return (
            <DropdownMenuItem key={type} onClick={() => onAdd(type)}>
              <Icon className="mr-2 h-4 w-4" />
              {config.label}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
