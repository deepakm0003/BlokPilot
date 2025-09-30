import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { spaceId, page = 1, per_page = 25, with_drafts = true, devToken } = body || {};

    const managementToken = process.env.STORYBLOK_MANAGEMENT_TOKEN || (process.env.NODE_ENV !== "production" ? devToken : undefined);
    if (!managementToken) {
      return new Response(
        JSON.stringify({ error: "Missing STORYBLOK_MANAGEMENT_TOKEN on server" }),
        { status: 400 }
      );
    }
    if (!spaceId) {
      return new Response(
        JSON.stringify({ error: "spaceId is required" }),
        { status: 400 }
      );
    }

    const headers = {
      Authorization: managementToken as string,
      "Content-Type": "application/json",
    } as const;

    const url = new URL(`https://mapi.storyblok.com/v1/spaces/${spaceId}/stories`);
    url.searchParams.set("page", String(page));
    url.searchParams.set("per_page", String(per_page));
    if (with_drafts) url.searchParams.set("with_drafts", "true");

    const res = await fetch(url.toString(), { headers });
    const data = await res.json();
    if (!res.ok) {
      return new Response(JSON.stringify({ error: data, status: res.status }), {
        status: 500,
      });
    }

    return Response.json({ ok: true, stories: data.stories || data });
  } catch (e) {
    return new Response(
      JSON.stringify({ error: `Storyblok list error: ${e}` }),
      { status: 500 }
    );
  }
}


