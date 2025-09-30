import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { spaceId, storyId, slug, name, content, devToken } = body || {};

    const managementToken = process.env.STORYBLOK_MANAGEMENT_TOKEN || (process.env.NODE_ENV !== "production" ? devToken : undefined);
    if (!managementToken) {
      return new Response(
        JSON.stringify({ error: "Missing STORYBLOK_MANAGEMENT_TOKEN on server" }),
        { status: 400 }
      );
    }
    if (!spaceId || !slug || !name || !content) {
      return new Response(
        JSON.stringify({ error: "spaceId, slug, name, content are required" }),
        { status: 400 }
      );
    }

    const headers = {
      Authorization: managementToken as string,
      "Content-Type": "application/json",
    };

    const base = `https://mapi.storyblok.com/v1/spaces/${spaceId}/stories`;

    const payload = {
      story: {
        name,
        slug,
        content,
        is_folder: false,
        default_root: false,
        is_startpage: false,
        path: null,
        published: false,
      },
    };

    const res = await fetch(storyId ? `${base}/${storyId}` : base, {
      method: storyId ? "PUT" : "POST",
      headers,
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (!res.ok) {
      return new Response(JSON.stringify({ error: data, status: res.status }), {
        status: 500,
      });
    }

    return Response.json({ ok: true, story: data.story || data });
  } catch (e) {
    return new Response(
      JSON.stringify({ error: `Storyblok write error: ${e}` }),
      { status: 500 }
    );
  }
}



