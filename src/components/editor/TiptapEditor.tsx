"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react/menus";
import { FloatingMenu } from "@tiptap/react/menus";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Typography from "@tiptap/extension-typography";
import { useState } from "react";
import {
  Bold, Italic, Strikethrough, Code, Heading1, Heading2, List, ListOrdered, Quote, Wand2
} from "lucide-react";

interface EditorProps {
  content?: string;
  onChange?: (content: string) => void;
  editable?: boolean;
}

export default function TiptapEditor({ content = "", onChange, editable = true }: EditorProps) {
  const [isAiLoading, setIsAiLoading] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Write something amazing...",
      }),
      Typography,
    ],
    content,
    editable,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "prose prose-emerald max-w-none focus:outline-none min-h-[500px]",
      },
    },
  });

  if (!editor) {
    return null;
  }

  const handleAiCommand = async (command: string) => {
    const { from, to } = editor.state.selection;
    const text = editor.state.doc.textBetween(from, to);

    if (!text) return;

    setIsAiLoading(true);
    try {
      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: text,
          command,
        }),
      });

      const data = await res.json();
      if (data.text) {
        editor.chain().focus().insertContentAt(to, `\n\n> **AI Response:** ${data.text}\n\n`).run();
      }
    } catch (e) {
      console.error(e);
      alert("Failed to get AI response");
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div className="relative border border-slate-200 rounded-lg p-4 bg-white shadow-sm min-h-[600px]">
      {editable && (
        <BubbleMenu
          editor={editor}
          // @ts-expect-error - tippyOptions are valid but types might be mismatching in this version
          tippyOptions={{ duration: 100 }}
          className="flex bg-white shadow-lg border border-slate-200 rounded-lg overflow-hidden divide-x divide-slate-200"
        >
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`p-2 hover:bg-slate-50 ${editor.isActive("bold") ? "text-emerald-600 bg-emerald-50" : "text-slate-600"}`}
          >
            <Bold size={16} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`p-2 hover:bg-slate-50 ${editor.isActive("italic") ? "text-emerald-600 bg-emerald-50" : "text-slate-600"}`}
          >
            <Italic size={16} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={`p-2 hover:bg-slate-50 ${editor.isActive("strike") ? "text-emerald-600 bg-emerald-50" : "text-slate-600"}`}
          >
            <Strikethrough size={16} />
          </button>
          <div className="flex items-center">
             <button
                onClick={() => handleAiCommand("explain")}
                disabled={isAiLoading}
                className="p-2 hover:bg-purple-50 text-purple-600 flex items-center gap-1 text-xs font-medium"
              >
                <Wand2 size={14} /> Explain
             </button>
             <button
                onClick={() => handleAiCommand("summarize")}
                disabled={isAiLoading}
                className="p-2 hover:bg-blue-50 text-blue-600 text-xs font-medium"
              >
                Summarize
             </button>
          </div>
        </BubbleMenu>
      )}

      {editable && (
        <FloatingMenu
          editor={editor}
          // @ts-expect-error - tippyOptions are valid but types might be mismatching in this version
          tippyOptions={{ duration: 100 }}
          className="flex bg-white shadow-lg border border-slate-200 rounded-lg overflow-hidden divide-x divide-slate-200"
        >
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={`p-2 hover:bg-slate-50 ${editor.isActive("heading", { level: 1 }) ? "text-emerald-600" : "text-slate-600"}`}
          >
            <Heading1 size={16} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={`p-2 hover:bg-slate-50 ${editor.isActive("heading", { level: 2 }) ? "text-emerald-600" : "text-slate-600"}`}
          >
            <Heading2 size={16} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`p-2 hover:bg-slate-50 ${editor.isActive("bulletList") ? "text-emerald-600" : "text-slate-600"}`}
          >
            <List size={16} />
          </button>
        </FloatingMenu>
      )}

      <EditorContent editor={editor} />
    </div>
  );
}
