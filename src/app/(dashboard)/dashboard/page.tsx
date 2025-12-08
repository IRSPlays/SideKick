export default function DashboardPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Welcome Back</h1>
        <p className="mt-2 text-slate-600">Start learning today. The Singaporean way.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
          <h3 className="font-semibold text-lg text-emerald-800">Quick Write</h3>
          <p className="text-slate-500 text-sm mt-1">Capture your thoughts instantly.</p>
          <a href="/dashboard/notes/new" className="mt-4 inline-block text-sm font-medium text-emerald-600 hover:text-emerald-700">
            Create Note &rarr;
          </a>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
          <h3 className="font-semibold text-lg text-emerald-800">Review Flashcards</h3>
          <p className="text-slate-500 text-sm mt-1">Spaced repetition for exams.</p>
          <span className="mt-4 inline-block text-sm font-medium text-slate-400 cursor-not-allowed">
            Coming Soon
          </span>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
          <h3 className="font-semibold text-lg text-emerald-800">Ask Cikgu AI</h3>
          <p className="text-slate-500 text-sm mt-1">Get help with your homework.</p>
          <a href="/chat" className="mt-4 inline-block text-sm font-medium text-emerald-600 hover:text-emerald-700">
            Start Chat &rarr;
          </a>
        </div>
      </div>
    </div>
  );
}
