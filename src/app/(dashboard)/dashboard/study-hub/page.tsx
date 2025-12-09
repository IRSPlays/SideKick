"use client";

import { useState } from "react";
import { Sparkles, GraduationCap, ArrowLeft } from "lucide-react";
import AINoteMaker from "@/components/AINoteMaker";
import ExamGenerator from "@/components/ExamGenerator";
import Link from "next/link";

type Tool = "notes" | "exam" | null;

export default function StudyHubPage() {
  const [activeTool, setActiveTool] = useState<Tool>(null);

  if (activeTool === "notes") {
    return (
      <div>
        <button
          onClick={() => setActiveTool(null)}
          className="mb-6 flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Study Hub
        </button>
        <AINoteMaker />
      </div>
    );
  }

  if (activeTool === "exam") {
    return (
      <div>
        <button
          onClick={() => setActiveTool(null)}
          className="mb-6 flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Study Hub
        </button>
        <ExamGenerator />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-900 mb-2">AI Study Hub</h1>
        <p className="text-slate-600">Supercharge your learning with AI-powered tools</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* AI Note Maker */}
        <button
          onClick={() => setActiveTool("notes")}
          className="group relative overflow-hidden bg-linear-to-br from-purple-500 to-blue-600 rounded-2xl p-8 text-left shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1"
        >
          <div className="relative z-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-4 group-hover:scale-110 transition-transform">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">AI Note Maker</h2>
            <p className="text-purple-100 mb-4">
              Generate comprehensive notes from any topic, file, or media. Supports PDFs, images, videos, and audio.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-white/20 rounded-full text-xs text-white font-medium">
                📄 PDF Support
              </span>
              <span className="px-3 py-1 bg-white/20 rounded-full text-xs text-white font-medium">
                🖼️ Image Analysis
              </span>
              <span className="px-3 py-1 bg-white/20 rounded-full text-xs text-white font-medium">
                🎥 Video/Audio
              </span>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
        </button>

        {/* Exam Generator */}
        <button
          onClick={() => setActiveTool("exam")}
          className="group relative overflow-hidden bg-linear-to-br from-green-500 to-teal-600 rounded-2xl p-8 text-left shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1"
        >
          <div className="relative z-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-4 group-hover:scale-110 transition-transform">
              <GraduationCap className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Exam Generator</h2>
            <p className="text-green-100 mb-4">
              Create custom exams with MCQs, open-ended questions, and flashcards. Get instant AI feedback on your answers.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-white/20 rounded-full text-xs text-white font-medium">
                ✅ MCQ Questions
              </span>
              <span className="px-3 py-1 bg-white/20 rounded-full text-xs text-white font-medium">
                📝 Open-Ended
              </span>
              <span className="px-3 py-1 bg-white/20 rounded-full text-xs text-white font-medium">
                🤖 AI Feedback
              </span>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
        </button>
      </div>

      {/* Quick Actions */}
      <div className="mt-12 bg-white rounded-2xl p-8 shadow-lg border border-slate-200">
        <h3 className="text-xl font-bold text-slate-900 mb-4">Or continue with your existing content</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/dashboard/notes"
            className="p-4 border-2 border-slate-200 rounded-xl hover:border-purple-300 hover:bg-purple-50 transition-all"
          >
            <p className="font-semibold text-slate-900 mb-1">My Notes</p>
            <p className="text-sm text-slate-600">View and edit your saved notes</p>
          </Link>
          <Link
            href="/chat"
            className="p-4 border-2 border-slate-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all"
          >
            <p className="font-semibold text-slate-900 mb-1">AI Tutor Chat</p>
            <p className="text-sm text-slate-600">Ask questions about your notes</p>
          </Link>
          <Link
            href="/dashboard/library"
            className="p-4 border-2 border-slate-200 rounded-xl hover:border-green-300 hover:bg-green-50 transition-all"
          >
            <p className="font-semibold text-slate-900 mb-1">Community Library</p>
            <p className="text-sm text-slate-600">Browse public notes</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
