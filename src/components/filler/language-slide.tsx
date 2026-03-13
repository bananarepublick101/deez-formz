"use client";

import { motion } from "framer-motion";
import { type Language, type Translations, languageOptions } from "@/lib/i18n";

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

interface LanguageSlideProps {
  direction: number;
  t: Translations;
  onSelect: (lang: Language) => void;
}

export function LanguageSlide({ direction, t, onSelect }: LanguageSlideProps) {
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
      <div className="max-w-md w-full text-center">
        <h1 className="text-3xl font-bold md:text-4xl">{t.chooseLanguage}</h1>
        <div className="mt-8 grid gap-3">
          {languageOptions.map((option) => (
            <motion.button
              key={option.code}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onSelect(option.code)}
              className="flex items-center gap-4 rounded-xl border border-border bg-background px-6 py-4 text-left text-lg font-medium transition-colors hover:bg-muted"
            >
              <span className="text-3xl">{option.flag}</span>
              <span>{option.name}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
