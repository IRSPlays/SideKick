import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { GoogleGenerativeAI } from "@google/generative-ai";
import prisma from "@/lib/prisma";
import { z } from "zod";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY || "");

const examSchema = z.object({
  topic: z.string().min(1),
  subject: z.string().default("General"),
  difficulty: z.enum(["easy", "medium", "hard"]),
  questionType: z.enum(["mcq", "open", "flashcard", "mixed"]),
  questionCount: z.number().min(5).max(50),
  noteId: z.string().optional(),
});

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { topic, subject, difficulty, questionType, questionCount, noteId } = examSchema.parse(body);

    let context = "";
    if (noteId) {
      const note = await prisma.note.findUnique({ where: { id: noteId } });
      if (note) {
        context = `\n\nBased on this note content: ${note.content.substring(0, 1000)}...`;
      }
    }

    const prompt = `Generate an exam with ${questionCount} questions about: ${topic}
Subject: ${subject}
Difficulty: ${difficulty}
Type: ${questionType === "mixed" ? "mix of MCQ and open-ended questions" : questionType}
${context}

Return ONLY a JSON array with this exact structure (no markdown, no code blocks):
${questionType === "mcq" || questionType === "mixed" ? `
[
  {
    "type": "mcq",
    "question": "Question text here?",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctAnswer": 0
  }
]` : ""}
${questionType === "open" || questionType === "mixed" ? `
[
  {
    "type": "open",
    "question": "Question text here?",
    "correctAnswer": "Expected answer or key points"
  }
]` : ""}

Make questions challenging and relevant to the topic.`;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    
    // Clean JSON response
    const cleanJson = text.replace(/```json/g, "").replace(/```/g, "").trim();
    
    // Validate it's valid JSON
    JSON.parse(cleanJson);

    const exam = await prisma.exam.create({
      data: {
        title: `${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} Exam: ${topic}`,
        subject,
        difficulty,
        questions: cleanJson,
        userId: session.user.id,
        noteId: noteId || null,
      },
    });

    return NextResponse.json({
      examId: exam.id,
      questions: cleanJson,
    });
  } catch (error) {
    console.error("Exam Generation Error:", error);
    return NextResponse.json(
      { error: "Failed to generate exam", details: error instanceof Error ? error.message : "Unknown" },
      { status: 500 }
    );
  }
}
