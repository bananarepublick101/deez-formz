"use client";

import { motion } from "framer-motion";

const MOTIVATIONAL_QUOTES = [
  "You're doing amazing — keep going! 🔥",
  "Almost there, you absolute legend! 🏆",
  "Your answers are chef's kiss 👨‍🍳💋",
  "This form won't fill itself... oh wait, you're doing it! 💪",
  "Halfway there! Livin' on a prayer 🎸",
  "You're faster than a caffeinated cheetah ⚡",
  "The finish line can smell your determination 🏁",
  "Keep going — free dopamine at the end! 🧠",
  "You're crushing it harder than a hydraulic press 🫡",
  "Just a few more — you've got this! 🚀",
  "Your dedication is bringing a tear to our server's eye 🥲",
  "Fun fact: finishing forms burns 0 calories but feels great 😎",
];

function getQuote(progress: number): string {
  const index = Math.floor((progress / 100) * (MOTIVATIONAL_QUOTES.length - 1));
  return MOTIVATIONAL_QUOTES[Math.min(index, MOTIVATIONAL_QUOTES.length - 1)];
}

export function ProgressBar({ progress }: { progress: number }) {
  const quote = getQuote(progress);
  const showMotivation = progress > 0 && progress < 100;

  return (
    <>
      {/* Top thin bar — green */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1.5 bg-green-200/30">
        <motion.div
          className="h-full bg-green-500"
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
            className="mx-auto mb-3 w-fit max-w-lg rounded-full bg-green-500/10 px-6 py-2 text-center text-base font-medium text-green-600 dark:text-green-400"
          >
            {quote}
          </motion.p>
        )}
        <div className="flex items-center gap-3 border-t bg-background/80 px-4 py-3 backdrop-blur-sm">
          <div className="h-4 flex-1 overflow-hidden rounded-full bg-green-200/30">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-green-500 to-green-400"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>
          <span className="w-10 text-right text-sm font-semibold tabular-nums text-green-600 dark:text-green-400">
            {Math.round(progress)}%
          </span>
        </div>
      </div>
    </>
  );
}
