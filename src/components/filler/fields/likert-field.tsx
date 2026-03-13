"use client";

import { cn } from "@/lib/utils";

const DEFAULT_LABELS = [
  "Strongly Disagree",
  "Disagree",
  "Neutral",
  "Agree",
  "Strongly Agree",
];

interface Props {
  value: string;
  onChange: (v: string) => void;
  options?: string[] | null;
}

export function LikertField({ value, onChange, options }: Props) {
  const labels = options?.length ? options : DEFAULT_LABELS;

  return (
    <div className="space-y-3">
      <div className="flex justify-between gap-2">
        {labels.map((label, i) => {
          const val = String(i + 1);
          const isSelected = value === val;
          return (
            <button
              key={i}
              onClick={() => onChange(val)}
              className={cn(
                "flex flex-1 flex-col items-center gap-2 rounded-lg border-2 p-3 transition-colors hover:border-primary/50",
                isSelected && "border-primary bg-primary/10"
              )}
            >
              <span
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full border-2 text-lg font-semibold transition-colors",
                  isSelected
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-muted-foreground/30"
                )}
              >
                {i + 1}
              </span>
              <span className="text-center text-xs leading-tight text-muted-foreground">
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
