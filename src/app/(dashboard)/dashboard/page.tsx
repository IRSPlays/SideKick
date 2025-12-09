"use client";

import Link from "next/link";
import { Sparkles, GraduationCap, Zap, MessageSquare } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-900 mb-2">Welcome Back!</h1>
        <p className="text-lg text-slate-600">Ready to supercharge your learning today?</p>
      </div>

      {/* AI Study Tools */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">🤖 AI-Powered Study Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* AI Note Maker */}
          <Link
            href="/dashboard/study-hub"
            className="group relative overflow-hidden bg-linear-to-br from-purple-500 to-blue-600 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1"
          >
            <div className="relative z-10">
              <Sparkles className="h-12 w-12 text-white mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-bold text-white mb-2">AI Note Maker</h3>
              <p className="text-purple-100">
                Generate comprehensive notes from topics, PDFs, images, videos & audio
              </p>
            </div>
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-2xl -mr-12 -mt-12"></div>
          </Link>

          {/* Exam Generator */}
          <Link
            href="/dashboard/study-hub"
            className="group relative overflow-hidden bg-linear-to-br from-green-500 to-teal-600 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1"
          >
            <div className="relative z-10">
              <GraduationCap className="h-12 w-12 text-white mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-bold text-white mb-2">Exam Generator</h3>
              <p className="text-green-100">
                Create custom exams with MCQs, open-ended questions & instant AI feedback
              </p>
            </div>
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-2xl -mr-12 -mt-12"></div>
          </Link>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
          <Zap className="h-10 w-10 text-emerald-600 mb-3" />
          <h3 className="font-semibold text-lg text-emerald-800 mb-2">Quick Write</h3>
          <p className="text-slate-500 text-sm mb-4">Capture your thoughts instantly with our smart editor.</p>
          <Link href="/dashboard/notes/new" className="text-sm font-medium text-emerald-600 hover:text-emerald-700">
            Create Note &rarr;
          </Link>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
          <MessageSquare className="h-10 w-10 text-blue-600 mb-3" />
          <h3 className="font-semibold text-lg text-blue-800 mb-2">Ask Cikgu AI</h3>
          <p className="text-slate-500 text-sm mb-4">Get instant help with your homework and studies.</p>
          <Link href="/chat" className="text-sm font-medium text-blue-600 hover:text-blue-700">
            Start Chat &rarr;
          </Link>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
          <GraduationCap className="h-10 w-10 text-purple-600 mb-3" />
          <h3 className="font-semibold text-lg text-purple-800 mb-2">Study Hub</h3>
          <p className="text-slate-500 text-sm mb-4">Access all AI study tools in one place.</p>
          <Link href="/dashboard/study-hub" className="text-sm font-medium text-purple-600 hover:text-purple-700">
            Explore Tools &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
