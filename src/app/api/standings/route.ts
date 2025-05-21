// app/api/standings/route.ts
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");

  if (!code)
    return new Response(JSON.stringify({ error: "Missing code param" }), {
      status: 400,
    });

  const res = await fetch(
    `https://api.football-data.org/v4/competitions/${code}/standings`,
    {
      headers: {
        "X-Auth-Token": process.env.FOOTBALL_API_KEY!,
      },
    }
  );

  const data = await res.json();

  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
    status: res.status,
  });
}
