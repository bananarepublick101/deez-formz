"use client";

import { useState, useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AvatarSlide, type AvatarId, AVATAR_EMOJI_MAP } from "./avatar-slide";
import { WelcomeSlide } from "./welcome-slide";
import { QuestionSlide } from "./question-slide";
import { ThankYouSlide } from "./thank-you-slide";
import { ThemeSlide, THEMES } from "./theme-slide";
import { ProgressBar } from "./progress-bar";
import { LanguageSlide } from "./language-slide";
import { type Language, translations } from "@/lib/i18n";

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
  // -4 = avatar, -3 = theme, -2 = language, -1 = welcome, 0..n = questions, n+1 = thank you
  const [currentIndex, setCurrentIndex] = useState(-4);
  const [direction, setDirection] = useState(1);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [avatar, setAvatar] = useState<AvatarId | null>(null);
  const [selectedTheme, setSelectedTheme] = useState("forest-green");
  const [lang, setLang] = useState<Language>("en");

  const t = translations[lang];
  const totalQuestions = form.questions.length;
  const isAvatarSelect = currentIndex === -4;
  const isThemePicker = currentIndex === -3;
  const isLanguage = currentIndex === -2;
  const isWelcome = currentIndex === -1;
  const isThankYou = currentIndex === totalQuestions;
  const currentQuestion = form.questions[currentIndex] ?? null;

  const progress =
    isAvatarSelect || isThemePicker || isLanguage || isWelcome
      ? 0
      : isThankYou
        ? 100
        : ((currentIndex + 1) / totalQuestions) * 100;

  const goNext = useCallback(() => {
    if (currentIndex < totalQuestions) {
      setDirection(1);
      setCurrentIndex((i) => i + 1);
    }
  }, [currentIndex, totalQuestions]);

  const goPrev = useCallback(() => {
    if (currentIndex > -4 && !submitted) {
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

  function handleAvatarSelect(selectedAvatar: AvatarId) {
    setAvatar(selectedAvatar);
  }

  function handleLanguageSelect(selectedLang: Language) {
    setLang(selectedLang);
    goNext();
  }

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Enter" || e.key === "ArrowDown") {
        e.preventDefault();
        if (isAvatarSelect && avatar) goNext();
        else if (isThemePicker) goNext();
        else if (isLanguage) return; // language selection requires a click
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
  }, [currentIndex, answers, isAvatarSelect, isThemePicker, isLanguage, isWelcome, isThankYou, avatar]);

  const activeTheme = THEMES.find((t) => t.id === selectedTheme) ?? THEMES[2];

  // Apply theme CSS variables to document root so fixed-position elements can access them
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--theme-primary", activeTheme.primary);
    root.style.setProperty("--theme-accent", activeTheme.accent);
    root.style.setProperty("--theme-progress-bar", activeTheme.progressBar);
    root.style.setProperty("--theme-progress-bar-to", activeTheme.progressBarTo);
    root.style.setProperty("--theme-progress-bg", activeTheme.progressBg);
    root.style.setProperty("--theme-progress-text", activeTheme.progressText);
    return () => {
      root.style.removeProperty("--theme-primary");
      root.style.removeProperty("--theme-accent");
      root.style.removeProperty("--theme-progress-bar");
      root.style.removeProperty("--theme-progress-bar-to");
      root.style.removeProperty("--theme-progress-bg");
      root.style.removeProperty("--theme-progress-text");
    };
  }, [activeTheme]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <ProgressBar progress={progress} quotes={t.quotes} />

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
        {isThemePicker && (
          <ThemeSlide
            key="theme"
            direction={direction}
            selectedTheme={selectedTheme}
            onSelectTheme={setSelectedTheme}
            onNext={goNext}
          />
        )}
        {isLanguage && (
          <LanguageSlide
            key="language"
            direction={direction}
            t={t}
            onSelect={handleLanguageSelect}
          />
        )}
        {isWelcome && (
          <WelcomeSlide
            key="welcome"
            title={form.title}
            description={form.description}
            direction={direction}
            onStart={goNext}
            t={t}
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
            t={t}
          />
        )}
        {isThankYou && (
          <ThankYouSlide key="thankyou" direction={direction} t={t} />
        )}
      </AnimatePresence>
    </div>
  );
}
