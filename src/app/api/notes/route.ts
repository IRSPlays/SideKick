import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { z } from "zod";

const noteSchema = z.object({
  title: z.string().min(1),
  content: z.string(),
  isPublic: z.boolean().default(false),
});

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { title, content, isPublic } = noteSchema.parse(body);

    const note = await prisma.note.create({
      data: {
        title,
        content,
        isPublic,
        userId: session.user.id,
      },
    });

    return NextResponse.json(note);
  } catch {
    return NextResponse.json({ error: "Failed to create note" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const mode = searchParams.get("mode"); // "personal" or "public"

  try {
    let notes;
    if (mode === "public") {
      notes = await prisma.note.findMany({
        where: { isPublic: true },
        include: { user: { select: { name: true } } },
        orderBy: { createdAt: "desc" },
      });
    } else {
        // Default to personal
        notes = await prisma.note.findMany({
            where: { userId: session.user.id },
            orderBy: { updatedAt: "desc" },
        });
    }

    return NextResponse.json(notes);
  } catch {
    return NextResponse.json({ error: "Failed to fetch notes" }, { status: 500 });
  }
}
