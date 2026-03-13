"use client";

import { Input } from "@/components/ui/input";

interface Props {
  value: string;
  onChange: (v: string) => void;
}

export function NumberField({ value, onChange }: Props) {
  return (
    <Input
      type="number"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Type a number..."
      className="border-0 border-b-2 rounded-none bg-transparent text-xl focus-visible:ring-0 focus-visible:border-primary px-0"
      autoFocus
    />
  );
}
