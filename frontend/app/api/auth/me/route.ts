// app/api/auth/me/route.ts
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const token = request.cookies.get('jeyshid')?.value;  // Fixed: was 'token'

  if (!token) {
    return new Response('Unauthorized', { status: 401 });
  }

  const res = await fetch(`${process.env.API_URL}/api/auth/me`, {
    headers: { 
      Authorization: `Bearer ${token}`,
      // Optional: forward cookies if your Go backend needs them
      // Cookie: request.headers.get('cookie') || '',
    },
  });

  if (!res.ok) {
    return new Response('Unauthorized', { status: 401 });
  }

  const data = await res.json();
  return Response.json(data);
}