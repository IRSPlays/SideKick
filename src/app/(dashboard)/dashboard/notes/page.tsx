"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FileText, Lock, Globe } from "lucide-react";

interface Note {
  id: string;
  title: string;
  isPublic: boolean;
  updatedAt: string;
}

export default function MyNotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/notes?mode=personal")
      .then((res) => res.json())
      .then((data) => {
        setNotes(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading notes...</div>;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-slate-900">My Personal Notes</h1>
        <Link
          href="/dashboard/notes/new"
          className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
        >
          + New Note
        </Link>
      </div>

      {notes.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border border-slate-200">
            <p className="text-slate-500">You haven&apos;t written any notes yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map((note) => (
            <Link
              key={note.id}
              href={`/dashboard/notes/view/${note.id}`}
              className="block bg-white p-6 rounded-lg shadow-sm border border-slate-200 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <FileText className="text-emerald-500 h-8 w-8" />
                {note.isPublic ? (
                    <Globe className="text-blue-400 h-4 w-4" />
                ) : (
                    <Lock className="text-slate-400 h-4 w-4" />
                )}
              </div>
              <h3 className="font-semibold text-lg text-slate-900 mb-2 truncate">
                {note.title}
              </h3>
              <p className="text-xs text-slate-500">
                Last updated: {new Date(note.updatedAt).toLocaleDateString()}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
