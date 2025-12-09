import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { GoogleGenerativeAI } from "@google/generative-ai";
import prisma from "@/lib/prisma";
import { z } from "zod";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY || "");

const submitSchema = z.object({
  examId: z.string(),
  answers: z.record(z.union([z.string(), z.number()])),
});

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { examId, answers } = submitSchema.parse(body);

    const exam = await prisma.exam.findUnique({ where: { id: examId } });
    if (!exam) {
      return NextResponse.json({ error: "Exam not found" }, { status: 404 });
    }

    const questions = JSON.parse(exam.questions);
    let correctCount = 0;
    const feedback: string[] = [];

    // Process each question
    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];
      const userAnswer = answers[i];

      if (question.type === "mcq") {
        if (userAnswer === question.correctAnswer) {
          correctCount++;
          feedback.push("Correct! Well done.");
        } else {
          feedback.push(
            `Incorrect. The correct answer was: ${question.options[question.correctAnswer]}`
          );
        }
      } else if (question.type === "open") {
        // Use AI to grade open-ended answers
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
        const prompt = `Grade this answer and provide constructive feedback.

Question: ${question.question}
Expected Answer: ${question.correctAnswer}
Student's Answer: ${userAnswer || "No answer provided"}

Provide:
1. Whether it's correct/partially correct/incorrect
2. What was good
3. What could be improved
4. A score out of 100

Format: [Score]/100 - Brief feedback`;

        const result = await model.generateContent(prompt);
        const aiFeedback = result.response.text();
        
        // Extract score from AI feedback (rough estimation)
        const scoreMatch = aiFeedback.match(/(\d+)\/100/);
        if (scoreMatch && parseInt(scoreMatch[1]) >= 70) {
          correctCount += 0.7; // Partial credit
        }
        
        feedback.push(aiFeedback);
      }
    }

    const score = (correctCount / questions.length) * 100;

    // Save the attempt
    await prisma.examAttempt.create({
      data: {
        examId,
        userId: session.user.id,
        answers: JSON.stringify(answers),
        score,
        feedback: JSON.stringify(feedback),
      },
    });

    return NextResponse.json({
      score,
      feedback,
      totalQuestions: questions.length,
      correctAnswers: Math.round(correctCount),
    });
  } catch (error) {
    console.error("Exam Submission Error:", error);
    return NextResponse.json(
      { error: "Failed to submit exam" },
      { status: 500 }
    );
  }
}
