"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { QUESTION_TYPES, QUESTION_TYPE_CONFIG } from "@/lib/types";
import type { QuestionType } from "@/lib/types";
import { Plus, X } from "lucide-react";

interface Question {
  id: string;
  type: string;
  title: string;
  description: string | null;
  required: boolean;
  options: string[] | null;
}

interface QuestionEditorProps {
  question: Question;
  onUpdate: (data: Partial<Question>) => void;
}

const TYPES_WITH_OPTIONS: QuestionType[] = [
  "multiple_choice",
  "checkbox",
  "dropdown",
];

export function QuestionEditor({ question, onUpdate }: QuestionEditorProps) {
  const showOptions = TYPES_WITH_OPTIONS.includes(
    question.type as QuestionType
  );

  function addOption() {
    const options = [...(question.options ?? []), `Option ${(question.options?.length ?? 0) + 1}`];
    onUpdate({ options });
  }

  function updateOption(index: number, value: string) {
    const options = [...(question.options ?? [])];
    options[index] = value;
    onUpdate({ options });
  }

  function removeOption(index: number) {
    const options = (question.options ?? []).filter((_, i) => i !== index);
    onUpdate({ options });
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="space-y-2">
        <Label>Question Title</Label>
        <Input
          value={question.title}
          onChange={(e) => onUpdate({ title: e.target.value })}
          placeholder="Enter your question"
          className="text-lg"
        />
      </div>

      <div className="space-y-2">
        <Label>Description (optional)</Label>
        <Textarea
          value={question.description ?? ""}
          onChange={(e) => onUpdate({ description: e.target.value || null })}
          placeholder="Add a description"
          rows={2}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Question Type</Label>
          <Select
            value={question.type}
            onValueChange={(type) => {
              if (!type) return;
              const update: Partial<Question> = { type };
              if (
                TYPES_WITH_OPTIONS.includes(type as QuestionType) &&
                !question.options?.length
              ) {
                update.options = ["Option 1", "Option 2"];
              }
              onUpdate(update);
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="min-w-56">
              {QUESTION_TYPES.map((type) => {
                const config = QUESTION_TYPE_CONFIG[type];
                const Icon = config.icon;
                return (
                  <SelectItem key={type} value={type}>
                    <span className="flex items-center gap-2">
                      <Icon className="h-4 w-4" />
                      {config.label}
                    </span>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-end space-x-2">
          <div className="flex items-center space-x-2">
            <Switch
              id="required"
              checked={question.required}
              onCheckedChange={(required) => onUpdate({ required })}
            />
            <Label htmlFor="required">Required</Label>
          </div>
        </div>
      </div>

      {showOptions && (
        <div className="space-y-3">
          <Label>Options</Label>
          {(question.options ?? []).map((option, index) => (
            <div key={index} className="flex items-center gap-2">
              <Input
                value={option}
                onChange={(e) => updateOption(index, e.target.value)}
                placeholder={`Option ${index + 1}`}
              />
              <Button
                variant="ghost"
                size="sm"
                className="h-9 w-9 p-0"
                onClick={() => removeOption(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button variant="outline" size="sm" onClick={addOption}>
            <Plus className="mr-2 h-4 w-4" />
            Add Option
          </Button>
        </div>
      )}
    </div>
  );
}
