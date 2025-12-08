import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { z } from "zod";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");

const aiRequestSchema = z.object({
  prompt: z.string(),
  command: z.enum(["summarize", "explain", "simplify", "continue"]),
  context: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { prompt, command, context } = aiRequestSchema.parse(body);

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    let systemInstruction = "";
    switch (command) {
      case "summarize":
        systemInstruction = "You are a helpful Singaporean tutor. Summarize the following text concisely.";
        break;
      case "explain":
        systemInstruction = "You are a helpful Singaporean tutor. Explain the following concept simply, using local analogies if possible.";
        break;
      case "simplify":
        systemInstruction = "You are a helpful Singaporean tutor. Simplify this text for a student, maybe use simple English.";
        break;
      case "continue":
        systemInstruction = "You are a helpful assistant. Continue writing the following text.";
        break;
    }

    const fullPrompt = `${systemInstruction}\n\nContext (if any): ${context || ""}\n\nText to process: ${prompt}`;

    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ text });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "AI generation failed" }, { status: 500 });
  }
}
