import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { GoogleGenerativeAI } from "@google/generative-ai";
import prisma from "@/lib/prisma";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY || "");

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const topic = formData.get("topic") as string;
    const subject = formData.get("subject") as string;
    const noteType = formData.get("noteType") as string;
    const file = formData.get("file") as File | null;

    let contentToAnalyze = topic;

    // If file is provided, process it
    if (file) {
      const fileType = file.type;
      
      // Handle different file types
      if (fileType.includes("pdf")) {
        // For PDF, we'd need a PDF parser library
        // For now, we'll just note that a PDF was uploaded
        contentToAnalyze += `\n\n[PDF file uploaded: ${file.name}. Please analyze the content.]`;
      } else if (fileType.includes("image")) {
        // For images, we can use Gemini's vision capabilities
        const bytes = await file.arrayBuffer();
        const base64 = Buffer.from(bytes).toString("base64");
        
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
        const response = await model.generateContent([
          {
            inlineData: {
              mimeType: fileType,
              data: base64,
            },
          },
          `Analyze this image and create detailed notes about it. Topic: ${topic || "General analysis"}`,
        ]);
        
        contentToAnalyze = response.response.text() || "";
      } else if (fileType.includes("audio") || fileType.includes("video")) {
        // For audio/video, note that it was uploaded
        contentToAnalyze += `\n\n[${fileType.includes("video") ? "Video" : "Audio"} file uploaded: ${file.name}. Please create comprehensive notes.]`;
      }
    }

    // Generate notes based on the type
    let prompt = "";
    let noteTitle = "";

    switch (noteType) {
      case "summary":
        noteTitle = `Summary: ${topic || "AI Generated Notes"}`;
        prompt = `Create concise summary notes about: ${contentToAnalyze}
        
Subject: ${subject}

Format the notes in HTML with:
- Clear headings (<h2>, <h3>)
- Bullet points (<ul>, <li>) for key points
- Bold (<strong>) for important terms
- Use simple, student-friendly language
- Include 3-5 main points

Make it suitable for quick revision.`;
        break;

      case "detailed":
        noteTitle = `Detailed Notes: ${topic || "AI Generated Notes"}`;
        prompt = `Create comprehensive, detailed notes about: ${contentToAnalyze}
        
Subject: ${subject}

Format the notes in HTML with:
- Structured sections with clear headings
- Detailed explanations of concepts
- Examples where relevant
- Step-by-step breakdowns
- Use <p>, <h2>, <h3>, <ul>, <ol>, <strong>, <em> tags appropriately

Make it thorough and educational.`;
        break;

      case "visual":
        noteTitle = `Visual Guide: ${topic || "AI Generated Notes"}`;
        prompt = `Create visual-based notes about: ${contentToAnalyze}
        
Subject: ${subject}

Format the notes in HTML with:
- Describe diagrams and visual representations
- Use tables (<table>) for comparisons
- Include ASCII art or text-based diagrams where helpful
- Flowcharts described in text
- Color-coded sections (use inline styles)

Focus on visual learning.`;
        break;

      case "flashcards":
        noteTitle = `Flashcards: ${topic || "AI Generated Notes"}`;
        prompt = `Create notes in flashcard format about: ${contentToAnalyze}
        
Subject: ${subject}

Format as HTML with Q&A structure:
- Use <h3> for questions
- Use <p> with answer after each question
- 10-15 flashcards
- Cover key concepts
- Include memory aids

Make it perfect for active recall.`;
        break;

      default:
        noteTitle = `Notes: ${topic || "AI Generated Notes"}`;
        prompt = `Create comprehensive notes about: ${contentToAnalyze}\n\nSubject: ${subject}`;
    }

    // Generate content with Gemini
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
    const result = await model.generateContent(prompt);
    const generatedContent = result.response.text() || "<p>Failed to generate content</p>";

    // Save to database
    const note = await prisma.note.create({
      data: {
        title: noteTitle,
        content: generatedContent,
        userId: session.user.id,
        isPublic: false,
      },
    });

    return NextResponse.json({ 
      noteId: note.id,
      title: note.title,
      message: "Note generated successfully!" 
    });

  } catch (error) {
    console.error("AI Note Generation Error:", error);
    return NextResponse.json(
      { 
        error: "Failed to generate notes", 
        details: error instanceof Error ? error.message : "Unknown error" 
      },
      { status: 500 }
    );
  }
}
