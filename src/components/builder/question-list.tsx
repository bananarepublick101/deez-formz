"use client";

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { QuestionItem } from "./question-item";

interface Question {
  id: string;
  type: string;
  title: string;
  description: string | null;
  required: boolean;
  options: string[] | null;
  order: number;
}

interface QuestionListProps {
  questions: Question[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onReorder: (questions: Question[]) => void;
  onDelete: (id: string) => void;
}

export function QuestionList({
  questions,
  selectedId,
  onSelect,
  onReorder,
  onDelete,
}: QuestionListProps) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = questions.findIndex((q) => q.id === active.id);
    const newIndex = questions.findIndex((q) => q.id === over.id);

    const newQuestions = [...questions];
    const [moved] = newQuestions.splice(oldIndex, 1);
    newQuestions.splice(newIndex, 0, moved);
    onReorder(newQuestions);
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={questions.map((q) => q.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-2">
          {questions.map((question, index) => (
            <QuestionItem
              key={question.id}
              question={question}
              index={index}
              isSelected={question.id === selectedId}
              onSelect={() => onSelect(question.id)}
              onDelete={() => onDelete(question.id)}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
