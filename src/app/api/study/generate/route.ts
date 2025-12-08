import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { GoogleGenerativeAI } from "@google/generative-ai";
import prisma from "@/lib/prisma";
import { z } from "zod";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");
const generateSchema = z.object({
  noteId: z.string(),
  type: z.enum(["flashcards", "quiz"]),
});

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { noteId, type } = generateSchema.parse(body);

    const note = await prisma.note.findUnique({
      where: { id: noteId },
    });

    if (!note || (note.userId !== session.user.id && !note.isPublic)) {
      return NextResponse.json({ error: "Note not found or access denied" }, { status: 404 });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    if (type === "flashcards") {
      const prompt = `
        Based on the following text, generate 5 flashcards.
        Return ONLY a JSON array of objects with "front" and "back" keys.
        Do not wrap in markdown code blocks.

        Text: ${note.content}
      `;

      const result = await model.generateContent(prompt);
      const text = result.response.text();
      // Simple cleaning of markdown code blocks if AI puts them
      const cleanJson = text.replace(/```json/g, "").replace(/```/g, "").trim();
      const flashcardsData = JSON.parse(cleanJson);

      // Save to DB
      const savedCards = await Promise.all(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        flashcardsData.map((card: any) =>
          prisma.flashcard.create({
            data: {
              front: card.front,
              back: card.back,
              noteId: note.id,
            }
          })
        )
      );

      return NextResponse.json(savedCards);
    } else if (type === "quiz") {
       const prompt = `
        Based on the following text, generate a quiz with 3 Multiple Choice Questions.
        Return ONLY a JSON array of objects with "question", "options" (array of strings), "correctAnswer" (index number).
        Do not wrap in markdown code blocks.

        Text: ${note.content}
      `;

      const result = await model.generateContent(prompt);
      const text = result.response.text();
      const cleanJson = text.replace(/```json/g, "").replace(/```/g, "").trim();

      const quiz = await prisma.quiz.create({
          data: {
              title: `Quiz for ${note.title}`,
              questions: cleanJson,
              noteId: note.id
          }
      });

      return NextResponse.json(quiz);
    }

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to generate study materials" }, { status: 500 });
  }
}
