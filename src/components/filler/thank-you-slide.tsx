"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Share2, Check } from "lucide-react";
import { type Translations } from "@/lib/i18n";

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

export function ThankYouSlide({ direction, t }: { direction: number; t: Translations }) {
  const [copied, setCopied] = useState(false);

  function handleShare() {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

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
        <h1 className="mt-6 text-3xl font-bold">{t.thankYou}</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          {t.responseRecorded}
        </p>

        <button
          onClick={handleShare}
          className="mt-6 inline-flex items-center gap-2 rounded-lg border border-border bg-background px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
        >
          {copied ? (
            <Check className="h-4 w-4" />
          ) : (
            <Share2 className="h-4 w-4" />
          )}
          {copied ? t.linkCopied : t.shareThisSurvey}
        </button>

        <div className="mt-10 border-t border-border pt-6">
          <p className="text-sm text-muted-foreground">
            {t.likeThisSurvey}{" "}
            <a
              href="/"
              className="font-medium text-primary underline underline-offset-4 hover:text-primary/80"
            >
              {t.createYourOwn}
            </a>
          </p>
        </div>
      </div>
    </motion.div>
  );
}
