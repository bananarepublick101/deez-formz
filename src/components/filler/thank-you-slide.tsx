"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

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

export function ThankYouSlide({ direction }: { direction: number }) {
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
      <div className="text-center">
        <CheckCircle2 className="mx-auto h-16 w-16 text-primary" />
        <h1 className="mt-6 text-3xl font-bold">Thank you!</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Your response has been recorded.
        </p>
      </div>
    </motion.div>
  );
}
