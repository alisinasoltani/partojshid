import { NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import formidable from 'formidable';
import api from '@/lib/api';
import { cookies } from 'next/headers';

console.log('🔥 THIS FILE WAS LOADED BY NEXT.JS 🔥');

export async function POST(req: NextRequest, { params }: { params: { projectId: string } }) {
  const form = formidable({ maxFileSize: 5 * 1024 * 1024 });
  let fields;
  let files;
  try {
    [fields, files] = await form.parse(req as any);
  } catch (err) {
    return NextResponse.json({ error: 'Failed to parse form' }, { status: 400 });
  }

  const imageFile = files.image?.[0];
  if (!imageFile) {
    return NextResponse.json({ error: 'Image file required' }, { status: 400 });
  }

  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
  if (!allowedTypes.includes(imageFile.mimetype || '')) {
    return NextResponse.json({ error: 'Invalid file type: only jpg, png, webp allowed' }, { status: 400 });
  }

  // Fetch project slug from Go API
  let project;
  try {
    const { data } = await api.get(`/projects/${params.projectId}`);
    project = data;
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch project' }, { status: 500 });
  }
  const slug = project.slug;

  const dir = path.join(process.cwd(), 'public/images/projects', slug);
  await fs.mkdir(dir, { recursive: true });

  const filename = `${uuidv4()}.avif`;
  const destPath = path.join(dir, filename);

  try {
    await sharp(imageFile.filepath).avif({ quality: 80 }).toFile(destPath);
  } catch (err) {
    return NextResponse.json({ error: 'Failed to convert image to AVIF' }, { status: 500 });
  }

  const relativePath = `/images/projects/${slug}/${filename}`;

  // Call Go API to store path
  try {
    const { data } = await api.post(`/projects/${params.projectId}/images`, {
      image_path: relativePath,
      alt_text: fields.alt_text?.[0] || '',
      sort_order: fields.sort_order?.[0] ? parseInt(fields.sort_order[0]) : 999,
    });
    return NextResponse.json(data, { status: 201 });
  } catch (err) {
    // Cleanup file on failure
    await fs.unlink(destPath).catch(() => {});
    return NextResponse.json({ error: 'Failed to save image path in backend' }, { status: 500 });
  }
}

// PUT handler for updating image (sort_order, alt_text, etc.)
export async function PUT(
  req: NextRequest,
  { params }: { params: { projectId: string; imageId: string } }
) {
  console.log('PUT METHOD CALLED - THIS MUST APPEAR');
  console.log('=== IMAGE REORDER PROXY HIT ===');
  console.log('projectId:', params.projectId);
  console.log('imageId:', params.imageId);

  const body = await req.json();
  console.log('Request body:', body);

  try {
    const body = await req.json();

    // Securely read the token cookie from the incoming request
    const token = (await cookies()).get('jeyshid')?.value;  // or 'token' if you use that name
    console.log('Token present:', !!token);

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const response = await fetch(`/projects/${params.projectId}/images/${params.imageId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Go backend rejected:', data);
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    console.error('Proxy error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}