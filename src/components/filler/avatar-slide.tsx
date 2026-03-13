"use client";

import { motion } from "framer-motion";

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

const AVATARS = [
  { id: "dog", emoji: "\uD83D\uDC36", label: "Dog" },
  { id: "cat", emoji: "\uD83D\uDC31", label: "Cat" },
  { id: "snake", emoji: "\uD83D\uDC0D", label: "Snake" },
  { id: "cockerel", emoji: "\uD83D\uDC13", label: "Cockerel" },
] as const;

export type AvatarId = (typeof AVATARS)[number]["id"];

export const AVATAR_EMOJI_MAP: Record<AvatarId, string> = Object.fromEntries(
  AVATARS.map((a) => [a.id, a.emoji])
) as Record<AvatarId, string>;

interface AvatarSlideProps {
  direction: number;
  onSelect: (avatar: AvatarId) => void;
  selected: AvatarId | null;
}

export function AvatarSlide({ direction, onSelect, selected }: AvatarSlideProps) {
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
        <h1 className="text-4xl font-bold md:text-5xl">Choose your companion</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Pick an avatar to guide you through this questionnaire
        </p>

        <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
          {AVATARS.map((avatar) => (
            <motion.button
              key={avatar.id}
              onClick={() => onSelect(avatar.id)}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className={`flex flex-col items-center gap-3 rounded-2xl border-2 p-6 transition-colors ${
                selected === avatar.id
                  ? "border-primary bg-primary/10 shadow-lg"
                  : "border-border hover:border-primary/50 hover:bg-muted/50"
              }`}
            >
              <span className="text-6xl">{avatar.emoji}</span>
              <span className="text-sm font-medium">{avatar.label}</span>
            </motion.button>
          ))}
        </div>

        {selected && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 text-sm text-muted-foreground"
          >
            Press <kbd className="rounded border px-1.5 py-0.5">Enter</kbd> to continue
          </motion.p>
        )}
      </div>
    </motion.div>
  );
}
