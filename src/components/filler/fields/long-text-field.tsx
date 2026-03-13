"use client";

import { Textarea } from "@/components/ui/textarea";

interface Props {
  value: string;
  onChange: (v: string) => void;
}

export function LongTextField({ value, onChange }: Props) {
  return (
    <Textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Type your answer here..."
      className="min-h-[120px] border-0 border-b-2 rounded-none bg-transparent text-lg focus-visible:ring-0 focus-visible:border-primary px-0 resize-none"
      autoFocus
    />
  );
}
