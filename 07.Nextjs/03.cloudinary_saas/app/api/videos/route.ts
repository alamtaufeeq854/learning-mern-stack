import { NextRequest, NextResponse } from "next/server";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const videos = await prisma.video.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(videos);
  } catch (error) {
    console.error("FETCH VIDEOS ERROR:", error);

    return NextResponse.json(
      {
        error: "Error fetching videos",
        details: error instanceof Error ? error.message : error,
      },
      { status: 500 },
    );
  } finally {
    await prisma.$disconnect();
  }
}
