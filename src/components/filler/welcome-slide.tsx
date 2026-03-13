"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

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

interface WelcomeSlideProps {
  title: string;
  description: string | null;
  direction: number;
  onStart: () => void;
}

export function WelcomeSlide({
  title,
  description,
  direction,
  onStart,
}: WelcomeSlideProps) {
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
        <h1 className="text-4xl font-bold md:text-5xl">{title}</h1>
        {description && (
          <p className="mt-4 text-lg text-muted-foreground">{description}</p>
        )}
        <Button size="lg" className="mt-8" onClick={onStart}>
          Start
          <ArrowDown className="ml-2 h-4 w-4" />
        </Button>
        <p className="mt-4 text-xs text-muted-foreground">
          Press <kbd className="rounded border px-1.5 py-0.5">Enter</kbd> to
          begin
        </p>
      </div>
    </motion.div>
  );
}
