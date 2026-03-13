"use client";

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface Props {
  value: string;
  onChange: (v: string) => void;
  options?: string[] | null;
}

export function CheckboxField({ value, onChange, options }: Props) {
  const selected = value ? value.split(",") : [];

  function toggle(option: string) {
    const next = selected.includes(option)
      ? selected.filter((s) => s !== option)
      : [...selected, option];
    onChange(next.join(","));
  }

  return (
    <div className="space-y-3">
      {(options ?? []).map((option, i) => {
        const isSelected = selected.includes(option);
        return (
          <button
            key={i}
            onClick={() => toggle(option)}
            className={cn(
              "flex w-full items-center gap-3 rounded-lg border-2 p-4 text-left transition-colors hover:border-primary/50",
              isSelected && "border-primary bg-primary/10"
            )}
          >
            <span
              className={cn(
                "flex h-6 w-6 items-center justify-center rounded border-2",
                isSelected && "border-primary bg-primary text-primary-foreground"
              )}
            >
              {isSelected && <Check className="h-4 w-4" />}
            </span>
            <span className="text-lg">{option}</span>
          </button>
        );
      })}
    </div>
  );
}
