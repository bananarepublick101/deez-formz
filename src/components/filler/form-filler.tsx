"use client";

import { useState, useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AvatarSlide, type AvatarId, AVATAR_EMOJI_MAP } from "./avatar-slide";
import { WelcomeSlide } from "./welcome-slide";
import { QuestionSlide } from "./question-slide";
import { ThankYouSlide } from "./thank-you-slide";
import { ProgressBar } from "./progress-bar";

interface Question {
  id: string;
  type: string;
  title: string;
  description: string | null;
  required: boolean;
  options: string[] | null;
  order: number;
}

interface Form {
  id: string;
  title: string;
  description: string | null;
  questions: Question[];
}

export function FormFiller({ form }: { form: Form }) {
  // -2 = avatar, -1 = welcome, 0..n = questions, n+1 = thank you
  const [currentIndex, setCurrentIndex] = useState(-2);
  const [direction, setDirection] = useState(1);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [avatar, setAvatar] = useState<AvatarId | null>(null);

  const totalQuestions = form.questions.length;
  const isAvatarSelect = currentIndex === -2;
  const isWelcome = currentIndex === -1;
  const isThankYou = currentIndex === totalQuestions;
  const currentQuestion = form.questions[currentIndex] ?? null;

  const progress =
    isAvatarSelect || isWelcome ? 0 : isThankYou ? 100 : ((currentIndex + 1) / totalQuestions) * 100;

  const goNext = useCallback(() => {
    if (currentIndex < totalQuestions) {
      setDirection(1);
      setCurrentIndex((i) => i + 1);
    }
  }, [currentIndex, totalQuestions]);

  const goPrev = useCallback(() => {
    if (currentIndex > -2 && !submitted) {
      setDirection(-1);
      setCurrentIndex((i) => i - 1);
    }
  }, [currentIndex, submitted]);

  function setAnswer(questionId: string, value: string) {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  }

  async function handleSubmit() {
    if (submitted) return;
    setSubmitted(true);
    await fetch(`/api/forms/${form.id}/responses`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answers }),
    });
    goNext();
  }

  function handleNext() {
    if (currentQuestion?.required && !answers[currentQuestion.id]?.trim()) return;
    if (currentIndex === totalQuestions - 1) {
      handleSubmit();
    } else {
      goNext();
    }
  }

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Enter" || e.key === "ArrowDown") {
        e.preventDefault();
        if (isAvatarSelect && avatar) goNext();
        else if (isWelcome) goNext();
        else if (!isThankYou) handleNext();
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        goPrev();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, answers, isAvatarSelect, isWelcome, isThankYou, avatar]);

  function handleAvatarSelect(selectedAvatar: AvatarId) {
    setAvatar(selectedAvatar);
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <ProgressBar progress={progress} />

      {/* Persistent avatar in top-right corner */}
      {avatar && !isAvatarSelect && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="fixed top-4 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 shadow-lg ring-2 ring-primary/20"
        >
          <span className="text-4xl">{AVATAR_EMOJI_MAP[avatar]}</span>
        </motion.div>
      )}

      <AnimatePresence mode="wait" custom={direction}>
        {isAvatarSelect && (
          <AvatarSlide
            key="avatar"
            direction={direction}
            onSelect={(a) => {
              handleAvatarSelect(a);
              goNext();
            }}
            selected={avatar}
          />
        )}
        {isWelcome && (
          <WelcomeSlide
            key="welcome"
            title={form.title}
            description={form.description}
            direction={direction}
            onStart={goNext}
          />
        )}
        {currentQuestion && !isThankYou && (
          <QuestionSlide
            key={currentIndex}
            question={currentQuestion}
            index={currentIndex}
            total={totalQuestions}
            value={answers[currentQuestion.id] ?? ""}
            onChange={(value) => setAnswer(currentQuestion.id, value)}
            onNext={handleNext}
            onPrev={goPrev}
            direction={direction}
            isLast={currentIndex === totalQuestions - 1}
          />
        )}
        {isThankYou && (
          <ThankYouSlide key="thankyou" direction={direction} />
        )}
      </AnimatePresence>
    </div>
  );
}
