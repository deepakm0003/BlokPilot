import { NextRequest } from "next/server";
import { algoliasearch } from "algoliasearch";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = (searchParams.get("q") || "").trim();
  if (!q) return Response.json({ hits: [] });

  const appId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || "";
  const adminKey = process.env.ALGOLIA_ADMIN_KEY || "";
  if (appId && adminKey) {
    // Use Algolia if configured
    const client = algoliasearch(appId, adminKey);
    const indexName = "stories";
    const res = await client.searchSingleIndex({ indexName, searchParams: { query: q, hitsPerPage: 10 } });
    return Response.json({ hits: res.hits });
  }

  // Fallback: Storyblok CDN full-text search
  const token = process.env.NEXT_PUBLIC_STORYBLOK_PREVIEW_TOKEN || process.env.STORYBLOK_ACCESS_TOKEN;
  const region = (process.env.NEXT_PUBLIC_STORYBLOK_REGION || "").toLowerCase();
  const base = region === "us" ? "https://api-us.storyblok.com" : "https://api.storyblok.com";
  if (!token) return Response.json({ hits: [] });
  const url = `${base}/v2/cdn/stories?version=draft&search_term=${encodeURIComponent(q)}&token=${token}`;
  const res = await fetch(url);
  const data = await res.json();
  let stories = (data.stories || []) as any[];
  let hits = stories.map((s: any) => ({ id: s.id, title: s.name, slug: s.full_slug || s.slug }));

  // Secondary fallback: if CDN full-text returns nothing, fetch a page and filter locally
  if (hits.length === 0) {
    const listUrl = `${base}/v2/cdn/stories?version=draft&per_page=100&token=${token}`;
    const listRes = await fetch(listUrl);
    const listData = await listRes.json();
    const all = (listData.stories || []) as any[];
    const qLower = q.toLowerCase();
    const filtered = all.filter((s: any) => {
      const name = (s.name || "").toLowerCase();
      const slug = (s.full_slug || s.slug || "").toLowerCase();
      const content = JSON.stringify(s.content || {}).toLowerCase();
      return name.includes(qLower) || slug.includes(qLower) || content.includes(qLower);
    });
    hits = filtered.map((s: any) => ({ id: s.id, title: s.name, slug: s.full_slug || s.slug }));
  }

  return Response.json({ hits });
}


