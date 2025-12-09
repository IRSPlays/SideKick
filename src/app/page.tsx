"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck, Zap } from "lucide-react";
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
              Get Started
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
                <h1 className="text-6xl md:text-8xl font-display font-extrabold text-slate-900 tracking-tight mb-8 leading-[1.1]">
                Study Smarter, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-emerald-500 to-teal-600 animate-gradient-x">
                    Singapore Style.
                </span>
                </h1>
                <p className="mt-6 max-w-2xl mx-auto text-xl text-slate-600 leading-relaxed font-light">
                The intelligent, context-aware workspace built for students.
                Seamlessly integrated with local syllabus understanding.
                </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="mt-12 flex justify-center gap-6"
            >
              <Link href="/register" className="group inline-flex items-center px-8 py-4 text-lg font-medium rounded-full text-white bg-teal-600 hover:bg-teal-500 transition-all shadow-xl shadow-teal-500/30 hover:shadow-teal-500/50 hover:-translate-y-1">
                Start Learning Free
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Features */}
        <div className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <GlassCard hoverEffect className="bg-gradient-to-br from-white/60 to-white/30">
                <div className="w-14 h-14 bg-teal-100/50 rounded-2xl flex items-center justify-center mb-6 text-teal-700 backdrop-blur-sm">
                  <Zap className="h-7 w-7" />
                </div>
                <h3 className="text-2xl font-display font-bold text-slate-900 mb-3">AI Powered Context</h3>
                <p className="text-slate-600 leading-relaxed">&quot;Cikgu AI&quot; doesn&apos;t just chat. It reads your notes, understands the MOE syllabus, and helps you summarize and simplify complex topics instantly.</p>
              </GlassCard>

              <GlassCard hoverEffect className="bg-gradient-to-br from-white/60 to-white/30 delay-100">
                <div className="w-14 h-14 bg-purple-100/50 rounded-2xl flex items-center justify-center mb-6 text-purple-700 backdrop-blur-sm">
                  <CheckCircle2 className="h-7 w-7" />
                </div>
                <h3 className="text-2xl font-display font-bold text-slate-900 mb-3">Interactive Editor</h3>
                <p className="text-slate-600 leading-relaxed">A powerful block-based editor. Type <code>/</code> to summon AI, format text, or generate quizzes on the fly. Distraction-free by design.</p>
              </GlassCard>

              <GlassCard hoverEffect className="bg-gradient-to-br from-white/60 to-white/30 delay-200">
                <div className="w-14 h-14 bg-blue-100/50 rounded-2xl flex items-center justify-center mb-6 text-blue-700 backdrop-blur-sm">
                  <ShieldCheck className="h-7 w-7" />
                </div>
                <h3 className="text-2xl font-display font-bold text-slate-900 mb-3">Secure & Private</h3>
                <p className="text-slate-600 leading-relaxed">Your notes are yours. We use industry-standard encryption and local-first principles where possible. Study with peace of mind.</p>
              </GlassCard>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-white/20 bg-white/30 backdrop-blur-md py-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-500 text-sm font-medium">
          &copy; {new Date().getFullYear()} SG Notes. Crafted with ❤️ in Singapore.
        </div>
      </footer>
    </div>
  );
}
