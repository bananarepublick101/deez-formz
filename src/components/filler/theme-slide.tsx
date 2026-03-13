"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowDown, Check, Palette } from "lucide-react";

const variants = {
  enter: (direction: number) => ({
    y: direction > 0 ? 100 : -100,
    opacity: 0,
  }),
  center: { y: 0, opacity: 1 },
  exit: (direction: number) => ({
    y: direction > 0 ? -100 : 100,
    opacity: 0,
  }),
};

const transition = { duration: 0.4, ease: [0.32, 0.72, 0, 1] as const };

export interface ThemeOption {
  id: string;
  name: string;
  primary: string;
  accent: string;
  progressBar: string;
  progressBarTo: string;
  progressBg: string;
  progressText: string;
}

export const THEMES: ThemeOption[] = [
  {
    id: "ocean-blue",
    name: "Ocean Blue",
    primary: "#3b82f6",
    accent: "#06b6d4",
    progressBar: "#3b82f6",
    progressBarTo: "#06b6d4",
    progressBg: "rgba(59,130,246,0.2)",
    progressText: "#60a5fa",
  },
  {
    id: "sunset-orange",
    name: "Sunset Orange",
    primary: "#f97316",
    accent: "#eab308",
    progressBar: "#f97316",
    progressBarTo: "#eab308",
    progressBg: "rgba(249,115,22,0.2)",
    progressText: "#fb923c",
  },
  {
    id: "forest-green",
    name: "Forest Green",
    primary: "#22c55e",
    accent: "#10b981",
    progressBar: "#22c55e",
    progressBarTo: "#10b981",
    progressBg: "rgba(34,197,94,0.2)",
    progressText: "#4ade80",
  },
  {
    id: "royal-purple",
    name: "Royal Purple",
    primary: "#a855f7",
    accent: "#8b5cf6",
    progressBar: "#a855f7",
    progressBarTo: "#8b5cf6",
    progressBg: "rgba(168,85,247,0.2)",
    progressText: "#c084fc",
  },
  {
    id: "rose-pink",
    name: "Rose Pink",
    primary: "#ec4899",
    accent: "#f43f5e",
    progressBar: "#ec4899",
    progressBarTo: "#f43f5e",
    progressBg: "rgba(236,72,153,0.2)",
    progressText: "#f472b6",
  },
];

interface ThemeSlideProps {
  direction: number;
  selectedTheme: string;
  onSelectTheme: (themeId: string) => void;
  onNext: () => void;
}

export function ThemeSlide({
  direction,
  selectedTheme,
  onSelectTheme,
  onNext,
}: ThemeSlideProps) {
  return (
    <motion.div
      custom={direction}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={transition}
      className="flex min-h-screen flex-col items-center justify-center px-4"
    >
      <div className="max-w-2xl text-center">
        <Palette className="mx-auto mb-4 h-10 w-10 text-muted-foreground" />
        <h1 className="text-3xl font-bold md:text-4xl">Pick a color theme</h1>
        <p className="mt-2 text-muted-foreground">
          Choose a vibe for your form experience
        </p>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
          {THEMES.map((theme) => {
            const isSelected = selectedTheme === theme.id;
            return (
              <motion.button
                key={theme.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onSelectTheme(theme.id)}
                className={`relative flex flex-col items-center gap-3 rounded-xl border-2 p-4 transition-colors ${
                  isSelected
                    ? "border-white bg-white/10"
                    : "border-transparent bg-card hover:border-muted-foreground/30"
                }`}
              >
                <div
                  className="h-12 w-12 rounded-full"
                  style={{
                    background: `linear-gradient(135deg, ${theme.primary}, ${theme.accent})`,
                  }}
                />
                <span className="text-sm font-medium">{theme.name}</span>
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -right-1.5 -top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-white"
                  >
                    <Check className="h-4 w-4 text-black" />
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </div>

        <Button size="lg" className="mt-8" onClick={onNext}>
          Continue
          <ArrowDown className="ml-2 h-4 w-4" />
        </Button>
        <p className="mt-4 text-xs text-muted-foreground">
          Press <kbd className="rounded border px-1.5 py-0.5">Enter</kbd> to
          continue
        </p>
      </div>
    </motion.div>
  );
}
