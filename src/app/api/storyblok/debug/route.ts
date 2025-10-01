import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { spaceId, devToken } = body || {};

    console.log("Debug request:", { spaceId, devToken: devToken ? "present" : "missing" });

    const managementToken = process.env.STORYBLOK_MANAGEMENT_TOKEN || (process.env.NODE_ENV !== "production" ? devToken : undefined);
    
    console.log("Token check:", {
      envToken: process.env.STORYBLOK_MANAGEMENT_TOKEN ? "present" : "missing",
      devToken: devToken ? "present" : "missing",
      finalToken: managementToken ? "present" : "missing"
    });

    if (!managementToken) {
      return new Response(
        JSON.stringify({ 
          error: "Missing STORYBLOK_MANAGEMENT_TOKEN on server",
          debug: {
            envToken: process.env.STORYBLOK_MANAGEMENT_TOKEN ? "present" : "missing",
            devToken: devToken ? "present" : "missing",
            nodeEnv: process.env.NODE_ENV
          }
        }),
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

    // Test the connection with a simple request
    const url = new URL(`https://mapi.storyblok.com/v1/spaces/${spaceId}/stories`);
    url.searchParams.set("page", "1");
    url.searchParams.set("per_page", "10");
    url.searchParams.set("with_drafts", "true");

    console.log("Making request to:", url.toString());
    console.log("Headers:", { Authorization: managementToken.substring(0, 20) + "..." });

    const res = await fetch(url.toString(), { headers });
    const data = await res.json();
    
    console.log("Response status:", res.status);
    console.log("Response data:", JSON.stringify(data, null, 2));

    if (!res.ok) {
      return new Response(JSON.stringify({ 
        error: "Storyblok API error", 
        status: res.status,
        details: data,
        url: url.toString()
      }), {
        status: 500,
      });
    }

    return Response.json({ 
      ok: true, 
      stories: data.stories || data,
      total: data.total || 0,
      debug: {
        url: url.toString(),
        status: res.status,
        hasStories: Array.isArray(data.stories) ? data.stories.length : 0
      }
    });
  } catch (e) {
    console.error("Debug error:", e);
    return new Response(
      JSON.stringify({ error: `Debug error: ${e}` }),
      { status: 500 }
    );
  }
}
