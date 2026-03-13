"use client";

import { cn } from "@/lib/utils";
import { ThumbsUp, ThumbsDown } from "lucide-react";

interface Props {
  value: string;
  onChange: (v: string) => void;
}

export function YesNoField({ value, onChange }: Props) {
  return (
    <div className="flex gap-4">
      {[
        { label: "Yes", icon: ThumbsUp, val: "yes" },
        { label: "No", icon: ThumbsDown, val: "no" },
      ].map(({ label, icon: Icon, val }) => (
        <button
          key={val}
          onClick={() => onChange(val)}
          className={cn(
            "flex flex-1 flex-col items-center gap-3 rounded-lg border-2 p-6 transition-colors hover:border-primary/50",
            value === val && "border-primary bg-primary/10"
          )}
        >
          <Icon className="h-8 w-8" />
          <span className="text-lg font-medium">{label}</span>
        </button>
      ))}
    </div>
  );
}
