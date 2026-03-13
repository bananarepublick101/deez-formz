"use client";

import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  value: string;
  onChange: (v: string) => void;
}

export function RatingField({ value, onChange }: Props) {
  const rating = parseInt(value) || 0;

  return (
    <div className="flex gap-2">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          onClick={() => onChange(String(n))}
          className="transition-transform hover:scale-110"
        >
          <Star
            className={cn(
              "h-10 w-10",
              n <= rating
                ? "fill-primary text-primary"
                : "text-muted-foreground"
            )}
          />
        </button>
      ))}
    </div>
  );
}
