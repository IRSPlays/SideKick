"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BookMarked } from "lucide-react";

interface Note {
  id: string;
  title: string;
  isPublic: boolean;
  updatedAt: string;
  user: {
      name: string;
  }
}

export default function LibraryPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/notes?mode=public")
      .then((res) => res.json())
      .then((data) => {
        setNotes(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading library...</div>;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Community Library</h1>
        <p className="text-slate-500">Explore notes shared by other students.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.map((note) => (
          <Link
            key={note.id}
            href={`/dashboard/notes/view/${note.id}`}
            className="block bg-white p-6 rounded-lg shadow-sm border border-slate-200 hover:shadow-md transition-shadow group"
          >
            <div className="flex justify-between items-start mb-4">
              <BookMarked className="text-blue-500 h-8 w-8 group-hover:scale-110 transition-transform" />
            </div>
            <h3 className="font-semibold text-lg text-slate-900 mb-2 truncate">
              {note.title}
            </h3>
            <div className="flex justify-between items-center mt-4 pt-4 border-t border-slate-100">
                <span className="text-xs text-slate-500">
                    By {note.user?.name || "Anonymous"}
                </span>
                <span className="text-xs text-slate-400">
                    {new Date(note.updatedAt).toLocaleDateString()}
                </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
