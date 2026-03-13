"use client";

import { motion } from "framer-motion";

function getQuote(progress: number, quotes: string[]): string {
  const index = Math.floor((progress / 100) * (quotes.length - 1));
  return quotes[Math.min(index, quotes.length - 1)];
}

export function ProgressBar({ progress, quotes }: { progress: number; quotes: string[] }) {
  const quote = getQuote(progress, quotes);
  const showMotivation = progress > 0 && progress < 100;

  return (
    <>
      {/* Top thin bar */}
      <div
        className="fixed top-0 left-0 right-0 z-50 h-1.5"
        style={{ backgroundColor: "var(--theme-progress-bg, rgba(34,197,94,0.3))" }}
      >
        <motion.div
          className="h-full"
          style={{ backgroundColor: "var(--theme-progress-bar, #22c55e)" }}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      </div>

      {/* Bottom progress bar with percentage + motivational quote */}
      <div className="fixed bottom-0 left-0 right-0 z-50">
        {showMotivation && (
          <motion.p
            key={quote}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{
              opacity: 1,
              y: [0, -6, 0],
              scale: 1,
            }}
            transition={{
              opacity: { duration: 0.3 },
              y: { duration: 1.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" },
              scale: { duration: 0.3 },
            }}
            className="mx-auto mb-3 w-fit max-w-lg rounded-full px-6 py-2 text-center text-base font-medium"
            style={{
              backgroundColor: "var(--theme-progress-bg, rgba(34,197,94,0.1))",
              color: "var(--theme-progress-text, #4ade80)",
            }}
          >
            {quote}
          </motion.p>
        )}
        <div className="flex items-center gap-3 border-t bg-background/80 px-4 py-3 backdrop-blur-sm">
          <div
            className="h-4 flex-1 overflow-hidden rounded-full"
            style={{ backgroundColor: "var(--theme-progress-bg, rgba(34,197,94,0.3))" }}
          >
            <motion.div
              className="h-full rounded-full"
              style={{
                background: `linear-gradient(to right, var(--theme-progress-bar, #22c55e), var(--theme-progress-bar-to, #4ade80))`,
              }}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>
          <span
            className="w-10 text-right text-sm font-semibold tabular-nums"
            style={{ color: "var(--theme-progress-text, #4ade80)" }}
          >
            {Math.round(progress)}%
          </span>
        </div>
      </div>
    </>
  );
}
