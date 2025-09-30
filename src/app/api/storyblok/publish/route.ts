import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { spaceId, storyId, devToken } = body || {};

    const managementToken = process.env.STORYBLOK_MANAGEMENT_TOKEN || (process.env.NODE_ENV !== "production" ? devToken : undefined);
    if (!managementToken) {
      return new Response(
        JSON.stringify({ error: "Missing STORYBLOK_MANAGEMENT_TOKEN on server" }),
        { status: 400 }
      );
    }
    if (!spaceId || !storyId) {
      return new Response(
        JSON.stringify({ error: "spaceId and storyId are required" }),
        { status: 400 }
      );
    }

    const headers = {
      Authorization: managementToken as string,
      "Content-Type": "application/json",
    } as const;

    const url = `https://mapi.storyblok.com/v1/spaces/${spaceId}/stories/${storyId}/publish`;
    const res = await fetch(url, { method: "PUT", headers });
    const data = await res.json();
    if (!res.ok) {
      return new Response(JSON.stringify({ error: data, status: res.status }), {
        status: 500,
      });
    }

    return Response.json({ ok: true, story: data.story || data });
  } catch (e) {
    return new Response(
      JSON.stringify({ error: `Storyblok publish error: ${e}` }),
      { status: 500 }
    );
  }
}


