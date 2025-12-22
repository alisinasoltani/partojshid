import { NextRequest } from "next/server";

const GO_API = "http://localhost:8080/api";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  // Forward ALL query params (page, per_page, editor, etc.)
  const params = new URLSearchParams(searchParams);
  const url = `${GO_API}/projects?${params.toString()}`;

  console.log('Proxying projects list:', url); // debug log

  const res = await fetch(url, {
    headers: { 
      Accept: "application/json",
      // Forward cookie/token if needed (but axios in panel already does it)
    },
    cache: "no-store",
  });

  const data = await res.json();

  return new Response(JSON.stringify(data), {
    status: res.status,
    headers: { "Content-Type": "application/json" },
  });
}