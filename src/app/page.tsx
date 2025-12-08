import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck, Zap } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      <header className="border-b border-slate-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="font-bold text-2xl text-emerald-700 tracking-tighter">
            SG Notes
          </div>
          <div className="flex gap-4">
            <Link href="/login" className="text-sm font-medium text-slate-600 hover:text-slate-900 px-4 py-2">
              Sign In
            </Link>
            <Link href="/register" className="text-sm font-medium bg-emerald-600 text-white px-4 py-2 rounded-full hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-200">
              Get Started
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <div className="relative overflow-hidden pt-16 pb-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-6">
              Study Smarter, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">
                Singapore Style.
              </span>
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-500">
              The AI-powered note-taking platform built for students and professionals. Secure, local, and context-aware.
            </p>

            <div className="mt-10 flex justify-center gap-4">
              <Link href="/register" className="group inline-flex items-center px-8 py-3 text-base font-medium rounded-full text-white bg-slate-900 hover:bg-slate-800 transition-all">
                Start Learning Free
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Decorative background blobs */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-30 pointer-events-none">
             <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
             <div className="absolute top-20 right-10 w-72 h-72 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
             <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
          </div>
        </div>

        {/* Features */}
        <div className="bg-slate-50 py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-6 text-emerald-600">
                  <Zap className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">AI Powered Context</h3>
                <p className="text-slate-600">Our &quot;Cikgu AI&quot; understands your notes and helps you summarize, simplify, and study efficiently.</p>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-6 text-emerald-600">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Interactive Editor</h3>
                <p className="text-slate-600">A Notion-style editor that&apos;s clean, fast, and lets you focus on your content without distractions.</p>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-6 text-emerald-600">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Hacker Safe</h3>
                <p className="text-slate-600">Built with security first. Your private notes stay private, with encrypted passwords and protected routes.</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-slate-100 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-400 text-sm">
          &copy; {new Date().getFullYear()} SG Notes. Made in Singapore.
        </div>
      </footer>
    </div>
  );
}
