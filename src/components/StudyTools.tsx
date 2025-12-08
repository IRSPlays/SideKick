"use client";

import { useState } from "react";
import { BrainCircuit, BookOpen } from "lucide-react";

export default function StudyTools({ noteId }: { noteId: string }) {
  const [loading, setLoading] = useState(false);

  const generate = async (type: "flashcards" | "quiz") => {
    setLoading(true);
    try {
      const res = await fetch("/api/study/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ noteId, type }),
      });
      if (res.ok) {
        alert(`${type === "flashcards" ? "Flashcards" : "Quiz"} generated successfully! Check your dashboard.`);
      } else {
        alert("Failed to generate.");
      }
    } catch (e) {
      alert("Error generating content.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-4 mt-6 border-t border-slate-200 pt-6">
      <button
        onClick={() => generate("flashcards")}
        disabled={loading}
        className="flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-800 rounded-lg hover:bg-emerald-200 transition-colors disabled:opacity-50"
      >
        <BookOpen className="h-4 w-4" />
        Generate Flashcards
      </button>
      <button
        onClick={() => generate("quiz")}
        disabled={loading}
        className="flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-800 rounded-lg hover:bg-purple-200 transition-colors disabled:opacity-50"
      >
        <BrainCircuit className="h-4 w-4" />
        Generate Quiz
      </button>
    </div>
  );
}
