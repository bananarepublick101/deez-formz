"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp, Check } from "lucide-react";
import { ShortTextField } from "./fields/short-text-field";
import { LongTextField } from "./fields/long-text-field";
import { MultipleChoiceField } from "./fields/multiple-choice-field";
import { CheckboxField } from "./fields/checkbox-field";
import { DropdownField } from "./fields/dropdown-field";
import { RatingField } from "./fields/rating-field";
import { YesNoField } from "./fields/yes-no-field";
import { EmailField } from "./fields/email-field";
import { NumberField } from "./fields/number-field";
import { LikertField } from "./fields/likert-field";
import { ImageUploadField } from "./fields/image-upload-field";
import { SocialMediaField } from "./fields/social-media-field";

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

interface Question {
  id: string;
  type: string;
  title: string;
  description: string | null;
  required: boolean;
  options: string[] | null;
}

interface QuestionSlideProps {
  question: Question;
  index: number;
  total: number;
  value: string;
  onChange: (value: string) => void;
  onNext: () => void;
  onPrev: () => void;
  direction: number;
  isLast: boolean;
}

const FIELD_MAP: Record<
  string,
  React.ComponentType<{
    value: string;
    onChange: (v: string) => void;
    options?: string[] | null;
  }>
> = {
  short_text: ShortTextField,
  long_text: LongTextField,
  multiple_choice: MultipleChoiceField,
  checkbox: CheckboxField,
  dropdown: DropdownField,
  rating: RatingField,
  yes_no: YesNoField,
  email: EmailField,
  number: NumberField,
  likert: LikertField,
  image_upload: ImageUploadField,
  social_media: SocialMediaField,
};

export function QuestionSlide({
  question,
  index,
  total,
  value,
  onChange,
  onNext,
  onPrev,
  direction,
  isLast,
}: QuestionSlideProps) {
  const Field = FIELD_MAP[question.type] ?? ShortTextField;

  return (
    <motion.div
      custom={direction}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={transition}
      className="flex min-h-screen flex-col items-center justify-center px-4 pb-16"
    >
      <div className="w-full max-w-xl space-y-6">
        <div>
          <p className="text-sm text-muted-foreground">
            {index + 1} of {total}
            {question.required && <span className="ml-1 text-destructive">*</span>}
          </p>
          <h2 className="mt-2 text-2xl font-bold md:text-3xl">
            {question.title}
          </h2>
          {question.description && (
            <p className="mt-2 text-muted-foreground">{question.description}</p>
          )}
        </div>

        <Field
          value={value}
          onChange={onChange}
          options={question.options}
        />

        <div className="flex items-center gap-3">
          <Button onClick={onNext} size="lg">
            {isLast ? (
              <>
                Submit <Check className="ml-2 h-4 w-4" />
              </>
            ) : (
              <>
                OK <ArrowDown className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
          <p className="text-xs text-muted-foreground">
            Press <kbd className="rounded border px-1.5 py-0.5">Enter</kbd>
          </p>
        </div>

        <div className="flex gap-1">
          <Button variant="ghost" size="sm" onClick={onPrev} disabled={index === 0}>
            <ArrowUp className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={onNext}>
            <ArrowDown className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
