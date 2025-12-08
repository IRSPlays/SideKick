import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { GoogleGenerativeAI } from "@google/generative-ai";
import prisma from "@/lib/prisma";
import { z } from "zod";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");
const chatSchema = z.object({
  message: z.string().min(1),
});

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { message } = chatSchema.parse(body);

    // Fetch user's recent notes for context (RAG-lite)
    const recentNotes = await prisma.note.findMany({
        where: { userId: session.user.id },
        orderBy: { updatedAt: 'desc' },
        take: 3, // Take last 3 notes for context window
        select: { title: true, content: true }
    });

    const contextText = recentNotes.map((n: { title: string; content: string }) => `Title: ${n.title}\nContent: ${n.content}`).join("\n---\n");

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const chat = model.startChat({
        history: [
            {
                role: "user",
                parts: [{ text: "You are Cikgu AI, a helpful and friendly Singaporean tutor. You use local context and simple English. You have access to the user's notes." }],
            },
            {
                role: "model",
                parts: [{ text: "Boleh! I am ready to help you learn." }],
            }
        ]
    });

    const prompt = `
    Context from my notes:
    ${contextText}

    My Question: ${message}
    `;

    const result = await chat.sendMessage(prompt);
    const response = await result.response;
    const reply = response.text();

    // Ideally, save the chat history to DB here (Skipping for MVP speed, but good for "History")
    await prisma.chatMessage.create({
        data: {
            role: 'user',
            content: message,
            userId: session.user.id
        }
    });

    await prisma.chatMessage.create({
        data: {
            role: 'model',
            content: reply,
            userId: session.user.id
        }
    });

    return NextResponse.json({ reply });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to process chat" }, { status: 500 });
  }
}
