"use client";

import { useState } from "react";
import { Sparkles, FileText, Upload, Mic, Video, Image as ImageIcon, BookOpen, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

const SUBJECTS = [
  "Mathematics", "Physics", "Chemistry", "Biology", "History", 
  "Geography", "English", "Literature", "Economics", "Computer Science",
  "Art", "Music", "General"
];

const NOTE_TYPES = [
  { value: "summary", label: "Summary Notes", icon: FileText },
  { value: "detailed", label: "Detailed Explanation", icon: BookOpen },
  { value: "visual", label: "Visual/Diagram Based", icon: ImageIcon },
  { value: "flashcards", label: "Flashcard Format", icon: Sparkles },
];

export default function AINoteMaker() {
  const router = useRouter();
  const [input, setInput] = useState("");
  const [subject, setSubject] = useState("General");
  const [noteType, setNoteType] = useState("summary");
  const [file, setFile] = useState<File | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!input.trim() && !file) {
      alert("Please provide a topic or upload a file");
      return;
    }

    setIsGenerating(true);
    try {
      const formData = new FormData();
      formData.append("topic", input);
      formData.append("subject", subject);
      formData.append("noteType", noteType);
      if (file) {
        formData.append("file", file);
      }

      const res = await fetch("/api/ai/generate-note", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to generate note");

      const data = await res.json();
      // Redirect to the generated note
      router.push(`/dashboard/notes/view/${data.noteId}`);
    } catch (error) {
      console.error(error);
      alert("Failed to generate note. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-8 shadow-lg border border-purple-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-purple-500 p-3 rounded-xl">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">AI Note Maker</h2>
            <p className="text-slate-600 text-sm">Generate comprehensive notes from any content</p>
          </div>
        </div>

        {/* Topic Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            What would you like to learn about?
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g., Explain photosynthesis in detail, Summary of World War II, How does TCP/IP work?"
            className="w-full h-32 px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
          />
        </div>

        {/* File Upload */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Or upload content (PDF, Image, Video, Audio)
          </label>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 px-4 py-3 bg-white border-2 border-dashed border-slate-300 rounded-xl cursor-pointer hover:border-purple-400 transition-colors">
              <Upload className="h-5 w-5 text-slate-500" />
              <span className="text-sm text-slate-600">
                {file ? file.name : "Choose file"}
              </span>
              <input
                type="file"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="hidden"
                accept=".pdf,.png,.jpg,.jpeg,.mp4,.mp3,.wav,.m4a"
              />
            </label>
            {file && (
              <button
                onClick={() => setFile(null)}
                className="text-sm text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            )}
          </div>
          <div className="flex gap-2 mt-2">
            <span className="inline-flex items-center gap-1 text-xs text-slate-500">
              <FileText className="h-3 w-3" /> PDF
            </span>
            <span className="inline-flex items-center gap-1 text-xs text-slate-500">
              <ImageIcon className="h-3 w-3" /> Images
            </span>
            <span className="inline-flex items-center gap-1 text-xs text-slate-500">
              <Video className="h-3 w-3" /> Videos
            </span>
            <span className="inline-flex items-center gap-1 text-xs text-slate-500">
              <Mic className="h-3 w-3" /> Audio
            </span>
          </div>
        </div>

        {/* Subject Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Subject
          </label>
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            {SUBJECTS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {/* Note Type */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Note Type
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {NOTE_TYPES.map((type) => (
              <button
                key={type.value}
                onClick={() => setNoteType(type.value)}
                className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                  noteType === type.value
                    ? "border-purple-500 bg-purple-50 shadow-md"
                    : "border-slate-200 hover:border-purple-300"
                }`}
              >
                <type.icon className={`h-6 w-6 ${noteType === type.value ? "text-purple-600" : "text-slate-500"}`} />
                <span className={`text-xs font-medium ${noteType === type.value ? "text-purple-900" : "text-slate-600"}`}>
                  {type.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          disabled={isGenerating || (!input.trim() && !file)}
          className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl"
        >
          {isGenerating ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Generating your notes...
            </>
          ) : (
            <>
              <Sparkles className="h-5 w-5" />
              Generate AI Notes
            </>
          )}
        </button>

        {isGenerating && (
          <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
            <p className="text-sm text-blue-800 text-center">
              🤖 AI is analyzing your content and generating comprehensive notes...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
