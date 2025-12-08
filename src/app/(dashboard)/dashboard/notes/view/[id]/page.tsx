import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { notFound, redirect } from "next/navigation";
import StudyTools from "@/components/StudyTools";

export default async function NoteViewPage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const note = await prisma.note.findUnique({
    where: { id: params.id },
    include: { user: true },
  });

  if (!note) notFound();

  // Access check
  if (note.userId !== session.user.id && !note.isPublic) {
    return (
        <div className="p-8 text-center text-red-500 font-bold">
            Access Denied. This note is private.
        </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-sm border border-slate-200 rounded-lg p-8">
      <div className="mb-6 border-b border-slate-100 pb-6">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">{note.title}</h1>
        <div className="flex items-center text-sm text-slate-500 gap-4">
            <span>By {note.user.name || note.user.email}</span>
            <span>•</span>
            <span>{new Date(note.createdAt).toLocaleDateString()}</span>
            {note.isPublic && (
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Public</span>
            )}
        </div>
      </div>

      <div
        className="prose prose-emerald max-w-none"
        dangerouslySetInnerHTML={{ __html: note.content }}
      />

      {/* Only show study tools if it's my note, or maybe allow for public too? Let's say yes for now */}
      <StudyTools noteId={note.id} />
    </div>
  );
}
