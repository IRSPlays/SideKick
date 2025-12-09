"use client";

import { useState } from "react";
import { Brain, FileQuestion, GraduationCap, Zap, Loader2, Check, X } from "lucide-react";
import { useRouter } from "next/navigation";

const DIFFICULTY_LEVELS = ["easy", "medium", "hard"];
const QUESTION_TYPES = [
  { value: "mcq", label: "Multiple Choice", icon: FileQuestion },
  { value: "open", label: "Open Ended", icon: Brain },
  { value: "flashcard", label: "Flashcards", icon: Zap },
  { value: "mixed", label: "Mixed", icon: GraduationCap },
];

interface Question {
  type: "mcq" | "open";
  question: string;
  options?: string[];
  correctAnswer?: number | string;
}

interface ExamAttemptState {
  answers: Record<number, string | number>;
  currentQuestion: number;
  showResults: boolean;
  score: number;
  feedback: string[];
}

export default function ExamGenerator({ noteId }: { noteId?: string }) {
  const router = useRouter();
  const [topic, setTopic] = useState("");
  const [subject, setSubject] = useState("General");
  const [difficulty, setDifficulty] = useState("medium");
  const [questionType, setQuestionType] = useState("mixed");
  const [questionCount, setQuestionCount] = useState(10);
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Exam taking state
  const [exam, setExam] = useState<{ id: string; questions: Question[] } | null>(null);
  const [attempt, setAttempt] = useState<ExamAttemptState>({
    answers: {},
    currentQuestion: 0,
    showResults: false,
    score: 0,
    feedback: [],
  });

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const res = await fetch("/api/ai/generate-exam", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic,
          subject,
          difficulty,
          questionType,
          questionCount,
          noteId,
        }),
      });

      if (!res.ok) throw new Error("Failed to generate exam");

      const data = await res.json();
      setExam({ id: data.examId, questions: JSON.parse(data.questions) });
      setAttempt({
        answers: {},
        currentQuestion: 0,
        showResults: false,
        score: 0,
        feedback: [],
      });
    } catch (error) {
      console.error(error);
      alert("Failed to generate exam");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAnswer = (questionIndex: number, answer: string | number) => {
    setAttempt(prev => ({
      ...prev,
      answers: { ...prev.answers, [questionIndex]: answer },
    }));
  };

  const handleSubmit = async () => {
    if (!exam) return;

    try {
      const res = await fetch("/api/ai/submit-exam", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          examId: exam.id,
          answers: attempt.answers,
        }),
      });

      if (!res.ok) throw new Error("Failed to submit exam");

      const data = await res.json();
      setAttempt(prev => ({
        ...prev,
        showResults: true,
        score: data.score,
        feedback: data.feedback,
      }));
    } catch (error) {
      console.error(error);
      alert("Failed to submit exam");
    }
  };

  if (exam && !attempt.showResults) {
    const currentQ = exam.questions[attempt.currentQuestion];
    
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-slate-900">
              Question {attempt.currentQuestion + 1} of {exam.questions.length}
            </h2>
            <span className="text-sm text-slate-600">
              {Object.keys(attempt.answers).length} answered
            </span>
          </div>

          <div className="mb-8">
            <p className="text-lg text-slate-800 font-medium mb-4">{currentQ.question}</p>

            {currentQ.type === "mcq" && currentQ.options && (
              <div className="space-y-3">
                {currentQ.options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(attempt.currentQuestion, idx)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                      attempt.answers[attempt.currentQuestion] === idx
                        ? "border-blue-500 bg-blue-50"
                        : "border-slate-200 hover:border-blue-300"
                    }`}
                  >
                    <span className="font-medium">{String.fromCharCode(65 + idx)}.</span> {option}
                  </button>
                ))}
              </div>
            )}

            {currentQ.type === "open" && (
              <textarea
                value={(attempt.answers[attempt.currentQuestion] as string) || ""}
                onChange={(e) => handleAnswer(attempt.currentQuestion, e.target.value)}
                placeholder="Type your answer here..."
                className="w-full h-32 px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 resize-none"
              />
            )}
          </div>

          <div className="flex justify-between gap-4">
            <button
              onClick={() => setAttempt(prev => ({ ...prev, currentQuestion: Math.max(0, prev.currentQuestion - 1) }))}
              disabled={attempt.currentQuestion === 0}
              className="px-6 py-3 border border-slate-300 rounded-xl hover:bg-slate-50 disabled:opacity-50"
            >
              Previous
            </button>
            
            {attempt.currentQuestion < exam.questions.length - 1 ? (
              <button
                onClick={() => setAttempt(prev => ({ ...prev, currentQuestion: prev.currentQuestion + 1 }))}
                className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700"
              >
                Submit Exam
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (attempt.showResults && exam) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
              <GraduationCap className="h-10 w-10 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Exam Complete!</h2>
            <p className="text-5xl font-bold text-green-600 mb-2">{attempt.score.toFixed(1)}%</p>
            <p className="text-slate-600">
              You got {Math.round((attempt.score / 100) * exam.questions.length)} out of {exam.questions.length} correct
            </p>
          </div>

          <div className="space-y-6">
            {exam.questions.map((q, idx) => (
              <div key={idx} className="p-6 bg-slate-50 rounded-xl">
                <div className="flex gap-3 mb-3">
                  {attempt.feedback[idx]?.includes("Correct") || attempt.feedback[idx]?.includes("Good") ? (
                    <Check className="h-6 w-6 text-green-600 flex-shrink-0" />
                  ) : (
                    <X className="h-6 w-6 text-red-600 flex-shrink-0" />
                  )}
                  <div className="flex-1">
                    <p className="font-medium text-slate-900 mb-2">{q.question}</p>
                    <p className="text-sm text-slate-700 mb-2">
                      <span className="font-medium">Your answer:</span>{" "}
                      {q.type === "mcq" && q.options
                        ? q.options[attempt.answers[idx] as number]
                        : attempt.answers[idx]}
                    </p>
                    <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-900">
                        <span className="font-medium">AI Feedback:</span> {attempt.feedback[idx]}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex gap-4">
            <button
              onClick={() => setExam(null)}
              className="flex-1 px-6 py-3 border border-slate-300 rounded-xl hover:bg-slate-50"
            >
              Create New Exam
            </button>
            <button
              onClick={() => router.push("/dashboard")}
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-linear-to-br from-blue-50 to-purple-50 rounded-2xl p-8 shadow-lg border border-blue-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-blue-500 p-3 rounded-xl">
            <GraduationCap className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">AI Exam Generator</h2>
            <p className="text-slate-600 text-sm">Create custom exams with instant AI feedback</p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Topic</label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., Calculus Derivatives, Photosynthesis, World War II"
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Difficulty</label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500"
              >
                {DIFFICULTY_LEVELS.map((level) => (
                  <option key={level} value={level}>
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Questions</label>
              <input
                type="number"
                value={questionCount}
                onChange={(e) => setQuestionCount(parseInt(e.target.value))}
                min="5"
                max="50"
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Question Type</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {QUESTION_TYPES.map((type) => (
                <button
                  key={type.value}
                  onClick={() => setQuestionType(type.value)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                    questionType === type.value
                      ? "border-blue-500 bg-blue-50"
                      : "border-slate-200 hover:border-blue-300"
                  }`}
                >
                  <type.icon className={`h-6 w-6 ${questionType === type.value ? "text-blue-600" : "text-slate-500"}`} />
                  <span className={`text-xs font-medium ${questionType === type.value ? "text-blue-900" : "text-slate-600"}`}>
                    {type.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={isGenerating || !topic}
            className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-linear-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 shadow-lg"
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Generating exam...
              </>
            ) : (
              <>
                <GraduationCap className="h-5 w-5" />
                Generate Exam
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
