"use client";

import { cn } from "@/lib/utils";

interface Props {
  value: string;
  onChange: (v: string) => void;
  options?: string[] | null;
}

export function MultipleChoiceField({ value, onChange, options }: Props) {
  return (
    <div className="space-y-3">
      {(options ?? []).map((option, i) => (
        <button
          key={i}
          onClick={() => onChange(option)}
          className={cn(
            "flex w-full items-center gap-3 rounded-lg border-2 p-4 text-left transition-colors hover:border-primary/50",
            value === option && "border-primary bg-primary/10"
          )}
        >
          <span className="flex h-7 w-7 items-center justify-center rounded border text-sm font-medium">
            {String.fromCharCode(65 + i)}
          </span>
          <span className="text-lg">{option}</span>
        </button>
      ))}
    </div>
  );
}
