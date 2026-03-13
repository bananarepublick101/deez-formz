import {
  Type,
  AlignLeft,
  List,
  CheckSquare,
  ChevronDown,
  Star,
  ThumbsUp,
  Mail,
  Hash,
  SlidersHorizontal,
  ImageUp,
  Share2,
} from "lucide-react";

export const QUESTION_TYPES = [
  "short_text",
  "long_text",
  "multiple_choice",
  "checkbox",
  "dropdown",
  "rating",
  "yes_no",
  "email",
  "number",
  "likert",
  "image_upload",
  "social_media",
] as const;

export type QuestionType = (typeof QUESTION_TYPES)[number];

export const QUESTION_TYPE_CONFIG: Record<
  QuestionType,
  { label: string; icon: typeof Type }
> = {
  short_text: { label: "Short Text", icon: Type },
  long_text: { label: "Long Text", icon: AlignLeft },
  multiple_choice: { label: "Multiple Choice", icon: List },
  checkbox: { label: "Checkbox", icon: CheckSquare },
  dropdown: { label: "Dropdown", icon: ChevronDown },
  rating: { label: "Rating", icon: Star },
  yes_no: { label: "Yes / No", icon: ThumbsUp },
  email: { label: "Email", icon: Mail },
  number: { label: "Number", icon: Hash },
  likert: { label: "Likert Scale", icon: SlidersHorizontal },
  image_upload: { label: "Image Upload", icon: ImageUp },
  social_media: { label: "Social Media", icon: Share2 },
};
