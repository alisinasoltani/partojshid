import { NextRequest } from "next/server";

const GO_API = "http://localhost:8080/api";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page") || "1";
  const per_page = searchParams.get("per_page") || "10";

  const url = `${GO_API}/projects?page=${page}&per_page=${per_page}`;

  const res = await fetch(url, {
    headers: { Accept: "application/json" },
    cache: "no-store",
  });

  const data = await res.json();

  return new Response(JSON.stringify(data), {
    status: res.status,
    headers: { "Content-Type": "application/json" },
  });
}