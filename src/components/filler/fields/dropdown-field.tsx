"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  value: string;
  onChange: (v: string) => void;
  options?: string[] | null;
}

export function DropdownField({ value, onChange, options }: Props) {
  return (
    <Select value={value} onValueChange={(v) => v && onChange(v)}>
      <SelectTrigger className="h-auto min-h-14 w-full whitespace-normal text-lg">
        <SelectValue placeholder="Select an option..." />
      </SelectTrigger>
      <SelectContent className="min-w-64">
        {(options ?? []).map((option, i) => (
          <SelectItem key={i} value={option} className="text-lg whitespace-normal py-2">
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
