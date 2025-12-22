import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import api from "@/lib/api";
import { cookies } from 'next/headers';

const GO_API = 'http://localhost:8080/api';

export async function DELETE(
  req: NextRequest,
  { params }: { params: { projectId: string; imageId: string } }
) {
  // Fetch image details from Go API
  let images;
  try {
    const { data } = await api.get(`/projects/${params.projectId}/images`);
    images = data;
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch images" },
      { status: 500 }
    );
  }

  const image = images.find((img: any) => img.id === parseInt(params.imageId));
  if (!image) {
    return NextResponse.json({ error: "Image not found" }, { status: 404 });
  }

  const filePath = path.join(process.cwd(), "public", image.image_url);
  await fs.unlink(filePath).catch((err) => {
    console.error("Failed to delete file:", err);
    // Continue even if file not found
  });

  // Delete from Go API
  try {
    await api.delete(`/projects/${params.projectId}/images/${params.imageId}`);
    return NextResponse.json({}, { status: 204 });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to delete image from backend" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { projectId: string; imageId: string } }
) {
  try {
    const body = await req.json();

    // Read the token from the incoming request cookies (sent by browser)
    const token = (await cookies()).get('jeyshid')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const response = await fetch(`${GO_API}/projects/${params.projectId}/images/${params.imageId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    console.error('Image update proxy error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}