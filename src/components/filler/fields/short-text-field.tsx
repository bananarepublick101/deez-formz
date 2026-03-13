"use client";

import { Input } from "@/components/ui/input";

interface Props {
  value: string;
  onChange: (v: string) => void;
}

export function ShortTextField({ value, onChange }: Props) {
  return (
    <Input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Type your answer here..."
      className="border-0 border-b-2 rounded-none bg-transparent text-xl focus-visible:ring-0 focus-visible:border-primary px-0"
      autoFocus
    />
  );
}
