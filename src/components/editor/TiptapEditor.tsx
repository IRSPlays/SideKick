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
    immediatelyRender: false,
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
    <div className="relative border border-slate-200/60 rounded-xl p-6 bg-white/80 shadow-sm min-h-[600px] backdrop-blur-sm">
      {editable && (
        <BubbleMenu
          editor={editor}
          // @ts-expect-error - tippyOptions are valid but types might be mismatching in this version
          tippyOptions={{ duration: 100 }}
          className="flex bg-slate-900 shadow-2xl border border-white/10 rounded-lg overflow-hidden divide-x divide-white/10"
        >
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`p-2 hover:bg-white/10 ${editor.isActive("bold") ? "text-teal-400" : "text-slate-300"}`}
          >
            <Bold size={16} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`p-2 hover:bg-white/10 ${editor.isActive("italic") ? "text-teal-400" : "text-slate-300"}`}
          >
            <Italic size={16} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={`p-2 hover:bg-white/10 ${editor.isActive("strike") ? "text-teal-400" : "text-slate-300"}`}
          >
            <Strikethrough size={16} />
          </button>
          <div className="flex items-center">
             <button
                onClick={() => handleAiCommand("explain")}
                disabled={isAiLoading}
                className="p-2 hover:bg-white/10 text-purple-400 flex items-center gap-1 text-xs font-medium"
              >
                <Wand2 size={14} /> Explain
             </button>
             <button
                onClick={() => handleAiCommand("summarize")}
                disabled={isAiLoading}
                className="p-2 hover:bg-white/10 text-blue-400 text-xs font-medium"
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
          className="flex bg-slate-900 shadow-2xl border border-white/10 rounded-lg overflow-hidden divide-x divide-white/10"
        >
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={`p-2 hover:bg-white/10 ${editor.isActive("heading", { level: 1 }) ? "text-teal-400" : "text-slate-300"}`}
          >
            <Heading1 size={16} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={`p-2 hover:bg-white/10 ${editor.isActive("heading", { level: 2 }) ? "text-teal-400" : "text-slate-300"}`}
          >
            <Heading2 size={16} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`p-2 hover:bg-white/10 ${editor.isActive("bulletList") ? "text-teal-400" : "text-slate-300"}`}
          >
            <List size={16} />
          </button>
        </FloatingMenu>
      )}

      <EditorContent editor={editor} />
    </div>
  );
}
