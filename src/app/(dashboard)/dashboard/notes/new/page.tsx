"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import TiptapEditor from "@/components/editor/TiptapEditor";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";

const noteSchema = z.object({
  title: z.string().min(1, "Title is required"),
  isPublic: z.boolean(),
});

type NoteForm = z.infer<typeof noteSchema>;

export default function NewNotePage() {
  const router = useRouter();
  const [content, setContent] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<NoteForm>({
    resolver: zodResolver(noteSchema),
    defaultValues: {
      isPublic: false
    }
  });

  const onSubmit = async (data: NoteForm) => {
    setIsSaving(true);
    try {
      const res = await fetch("/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          content,
        }),
      });

      if (!res.ok) throw new Error("Failed to save note");

      await res.json();
      router.push(`/dashboard/notes`); // Redirect to list
    } catch {
      alert("Error saving note");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center justify-between mb-6">
          <input
            {...register("title")}
            placeholder="Note Title"
            className="text-4xl font-bold bg-transparent border-none focus:outline-none placeholder-slate-300 w-full"
          />
          <button
            type="submit"
            disabled={isSaving}
            className="flex items-center px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 disabled:opacity-50"
          >
            <Save className="mr-2 h-4 w-4" />
            {isSaving ? "Saving..." : "Save Note"}
          </button>
        </div>

        {errors.title && (
          <p className="text-red-500 mb-4">{errors.title.message}</p>
        )}

        <div className="flex items-center gap-2 mb-4">
            <label className="flex items-center gap-2 text-sm text-slate-600">
                <input type="checkbox" {...register("isPublic")} className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500" />
                Make Public (Share with Community)
            </label>
        </div>

        <TiptapEditor content={content} onChange={setContent} />
      </form>
    </div>
  );
}
