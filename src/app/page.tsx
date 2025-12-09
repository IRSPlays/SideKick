"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck, Zap, Sparkles, GraduationCap, Brain, FileText } from "lucide-react";
import { motion } from "framer-motion";
import GlassCard from "@/components/ui/GlassCard";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Decorative Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
         <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-teal-300/30 rounded-full mix-blend-multiply filter blur-[128px] animate-blob"></div>
         <div className="absolute top-[10%] right-[-10%] w-[50%] h-[50%] bg-purple-300/30 rounded-full mix-blend-multiply filter blur-[128px] animate-blob animation-delay-2000"></div>
         <div className="absolute bottom-[-20%] left-[20%] w-[60%] h-[60%] bg-emerald-300/30 rounded-full mix-blend-multiply filter blur-[128px] animate-blob animation-delay-4000"></div>
      </div>

      <header className="sticky top-0 z-50 border-b border-white/20 bg-white/10 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="font-display font-bold text-2xl text-slate-800 tracking-tighter">
            SG Notes
          </div>
          <div className="flex gap-4">
            <Link href="/login" className="text-sm font-medium text-slate-600 hover:text-slate-900 px-4 py-2 transition-colors">
              Sign In
            </Link>
            <Link href="/register" className="text-sm font-medium bg-slate-900 text-white px-5 py-2 rounded-full hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20 hover:shadow-slate-900/40">
              Get Started Free
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <div className="relative pt-20 pb-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full mb-8">
                  <Sparkles className="h-4 w-4 text-purple-600" />
                  <span className="text-sm font-semibold text-purple-900">Powered by Google Gemini AI</span>
                </div>
                
                <h1 className="text-6xl md:text-8xl font-display font-extrabold text-slate-900 tracking-tight mb-8 leading-[1.1]">
                Study Smarter with <br />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-600 via-blue-500 to-teal-600">
                    AI-Powered Tools
                </span>
                </h1>
                <p className="mt-6 max-w-3xl mx-auto text-xl text-slate-600 leading-relaxed font-light">
                Generate notes from any content. Create custom exams. Get instant AI feedback.
                <br />The complete AI study companion built for Singapore students.
                </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="mt-12 flex flex-col sm:flex-row justify-center gap-6"
            >
              <Link href="/register" className="group inline-flex items-center px-8 py-4 text-lg font-medium rounded-full text-white bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all shadow-xl shadow-purple-500/30 hover:shadow-purple-500/50 hover:-translate-y-1">
                Start Learning Free
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/login" className="inline-flex items-center px-8 py-4 text-lg font-medium rounded-full text-slate-700 bg-white/80 hover:bg-white border-2 border-slate-200 hover:border-slate-300 transition-all shadow-lg">
                Sign In
              </Link>
            </motion.div>
          </div>
        </div>

        {/* AI Features Showcase */}
        <div className="py-24 bg-white/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-display font-bold text-slate-900 mb-4">
                AI-Powered Study Tools
              </h2>
              <p className="text-xl text-slate-600">
                Everything you need to excel in your studies
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {/* AI Note Maker */}
              <GlassCard hoverEffect className="bg-linear-to-br from-purple-50 to-blue-50 border-purple-200">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 bg-purple-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Sparkles className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-display font-bold text-slate-900 mb-2">AI Note Maker</h3>
                    <p className="text-slate-600">Generate comprehensive notes from ANY content</p>
                  </div>
                </div>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-center gap-2 text-slate-700">
                    <FileText className="h-4 w-4 text-purple-600" />
                    <span>Upload PDFs, images, videos, or audio files</span>
                  </li>
                  <li className="flex items-center gap-2 text-slate-700">
                    <Brain className="h-4 w-4 text-purple-600" />
                    <span>AI analyzes and creates structured notes</span>
                  </li>
                  <li className="flex items-center gap-2 text-slate-700">
                    <Zap className="h-4 w-4 text-purple-600" />
                    <span>Multiple formats: summary, detailed, visual, flashcards</span>
                  </li>
                </ul>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-purple-100 rounded-full text-xs text-purple-800 font-medium">PDF</span>
                  <span className="px-3 py-1 bg-blue-100 rounded-full text-xs text-blue-800 font-medium">Images</span>
                  <span className="px-3 py-1 bg-teal-100 rounded-full text-xs text-teal-800 font-medium">Video</span>
                  <span className="px-3 py-1 bg-indigo-100 rounded-full text-xs text-indigo-800 font-medium">Audio</span>
                </div>
              </GlassCard>

              {/* Exam Generator */}
              <GlassCard hoverEffect className="bg-linear-to-br from-green-50 to-teal-50 border-green-200">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 bg-green-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <GraduationCap className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-display font-bold text-slate-900 mb-2">Exam Generator</h3>
                    <p className="text-slate-600">Practice with AI-generated exams</p>
                  </div>
                </div>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-center gap-2 text-slate-700">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <span>MCQ, open-ended, and flashcard questions</span>
                  </li>
                  <li className="flex items-center gap-2 text-slate-700">
                    <Brain className="h-4 w-4 text-green-600" />
                    <span>Instant AI feedback on your answers</span>
                  </li>
                  <li className="flex items-center gap-2 text-slate-700">
                    <Zap className="h-4 w-4 text-green-600" />
                    <span>Customizable difficulty and topics</span>
                  </li>
                </ul>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-green-100 rounded-full text-xs text-green-800 font-medium">MCQ</span>
                  <span className="px-3 py-1 bg-teal-100 rounded-full text-xs text-teal-800 font-medium">Open-Ended</span>
                  <span className="px-3 py-1 bg-emerald-100 rounded-full text-xs text-emerald-800 font-medium">AI Grading</span>
                </div>
              </GlassCard>
            </div>
          </div>
        </div>

        {/* Core Features */}
        <div className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-display font-bold text-slate-900 mb-4">
                Everything You Need
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <GlassCard hoverEffect className="bg-linear-to-br from-white/60 to-white/30">
                <div className="w-14 h-14 bg-teal-100/50 rounded-2xl flex items-center justify-center mb-6 text-teal-700 backdrop-blur-sm">
                  <Zap className="h-7 w-7" />
                </div>
                <h3 className="text-2xl font-display font-bold text-slate-900 mb-3">AI Tutor Chat</h3>
                <p className="text-slate-600 leading-relaxed">Context-aware AI that reads your notes and helps you understand complex topics.</p>
              </GlassCard>

              <GlassCard hoverEffect className="bg-linear-to-br from-white/60 to-white/30 delay-100">
                <div className="w-14 h-14 bg-purple-100/50 rounded-2xl flex items-center justify-center mb-6 text-purple-700 backdrop-blur-sm">
                  <CheckCircle2 className="h-7 w-7" />
                </div>
                <h3 className="text-2xl font-display font-bold text-slate-900 mb-3">Smart Editor</h3>
                <p className="text-slate-600 leading-relaxed">Block-based editor with AI commands. Type <code className="bg-slate-100 px-1 rounded">/</code> to summon AI assistance.</p>
              </GlassCard>

              <GlassCard hoverEffect className="bg-linear-to-br from-white/60 to-white/30 delay-200">
                <div className="w-14 h-14 bg-blue-100/50 rounded-2xl flex items-center justify-center mb-6 text-blue-700 backdrop-blur-sm">
                  <ShieldCheck className="h-7 w-7" />
                </div>
                <h3 className="text-2xl font-display font-bold text-slate-900 mb-3">Secure & Private</h3>
                <p className="text-slate-600 leading-relaxed">Your notes are yours. Industry-standard encryption and privacy-first design.</p>
              </GlassCard>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-24 bg-linear-to-br from-purple-600 to-blue-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
              Ready to Transform Your Studies?
            </h2>
            <p className="text-xl text-purple-100 mb-8">
              Join thousands of Singapore students using AI to study smarter
            </p>
            <Link
              href="/register"
              className="inline-flex items-center px-8 py-4 text-lg font-bold rounded-full text-purple-600 bg-white hover:bg-purple-50 transition-all shadow-2xl hover:-translate-y-1"
            >
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </main>

      <footer className="border-t border-white/20 bg-white/30 backdrop-blur-md py-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-500 text-sm font-medium">
          &copy; {new Date().getFullYear()} SG Notes. Crafted with ❤️ in Singapore. Powered by Google Gemini AI.
        </div>
      </footer>
    </div>
  );
}
