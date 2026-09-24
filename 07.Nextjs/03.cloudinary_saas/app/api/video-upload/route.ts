import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { auth } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

interface CloudinaryUploadResult {
  public_id: string;
  bytes: number;
  duration?: number;
  [key: string]: any;
}
const cleanString = (value: unknown): string => {
  return String(value ?? "")
    .replace(/\u0000/g, "")
    .replace(/[\uFFFE\uFFFF]/g, "");
};
export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (
      !process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ||
      !process.env.CLOUDINARY_API_KEY ||
      !process.env.CLOUDINARY_API_SECRET
    ) {
      console.error("Cloudinary credentials are missing");

      return NextResponse.json(
        { error: "Cloudinary credentials not found" },
        { status: 500 },
      );
    }

    const formData = await request.formData();

    const file = formData.get("file") as File | null;
    const title = formData.get("title") as string | null;
    const description = formData.get("description") as string | null;
    const originalSize = formData.get("originalSize") as string | null;

    if (!file) {
      return NextResponse.json({ error: "File not found" }, { status: 400 });
    }

    console.log("Starting video upload...");
    console.log("File:", file.name);
    console.log("Size:", file.size);

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const result = await new Promise<CloudinaryUploadResult>(
      (resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            resource_type: "video",
            folder: "video-uploads",
            transformation: [
              {
                quality: "auto",
                fetch_format: "mp4",
              },
            ],
          },
          (error, result) => {
            if (error) {
              console.error("Cloudinary Error:", error);
              reject(error);
            } else {
              console.log("Cloudinary Upload Successful");
              resolve(result as CloudinaryUploadResult);
            }
          },
        );

        uploadStream.end(buffer);
      },
    );

    console.log("Cloudinary result:", result);

    const cleanTitle = cleanString(title);
    const cleanDescription = cleanString(description);
    const cleanOriginalSize = cleanString(originalSize);
    const cleanPublicId = cleanString(result.public_id);
    const cleanCompressedSize = cleanString(result.bytes);

    console.log("DB DATA:", {
      title: JSON.stringify(cleanTitle),
      description: JSON.stringify(cleanDescription),
      publicId: JSON.stringify(cleanPublicId),
      originalSize: JSON.stringify(cleanOriginalSize),
      compressedSize: JSON.stringify(cleanCompressedSize),
      duration: result.duration || 0,
    });

    console.log("Saving video to database...");
    const video = await prisma.video.create({
      data: {
        title: cleanTitle.replace(/\u0000/g, ""),
        description: cleanDescription
          ? cleanDescription.replace(/\u0000/g, "")
          : null,
        publicId: cleanPublicId.replace(/\u0000/g, ""),
        originalSize: String(file.size),
        compressedSize: String(result.bytes),
        duration: String(result.duration || 0),
      },
    });
    console.log("DATABASE VIDEO:", video);

    return NextResponse.json(video, { status: 201 });
  } catch (error) {
    console.error("UPLOAD VIDEO FAILED:", error);

    return NextResponse.json(
      {
        error: "Upload video failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
