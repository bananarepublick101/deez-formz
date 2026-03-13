"use client";

import { useState, useCallback, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
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
  // -1 = welcome, 0..n = questions, n+1 = thank you
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [direction, setDirection] = useState(1);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const totalQuestions = form.questions.length;
  const isWelcome = currentIndex === -1;
  const isThankYou = currentIndex === totalQuestions;
  const currentQuestion = form.questions[currentIndex] ?? null;

  const progress =
    isWelcome ? 0 : isThankYou ? 100 : ((currentIndex + 1) / totalQuestions) * 100;

  const goNext = useCallback(() => {
    if (currentIndex < totalQuestions) {
      setDirection(1);
      setCurrentIndex((i) => i + 1);
    }
  }, [currentIndex, totalQuestions]);

  const goPrev = useCallback(() => {
    if (currentIndex > -1 && !submitted) {
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
        if (isWelcome) goNext();
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
  }, [currentIndex, answers, isWelcome, isThankYou]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <ProgressBar progress={progress} />
      <AnimatePresence mode="wait" custom={direction}>
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
