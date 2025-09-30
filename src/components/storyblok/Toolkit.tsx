"use client";
import { useState } from "react";

export default function StoryblokToolkit() {
  const [spaceId, setSpaceId] = useState<string>(process.env.NEXT_PUBLIC_STORYBLOK_SPACE_ID || "");
  const [stories, setStories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [devToken, setDevToken] = useState<string>("");

  const refresh = async () => {
    if (!spaceId) return;
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch("/api/storyblok/list", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ spaceId, with_drafts: true, per_page: 100, devToken }),
      });
      const data = await res.json();
      if (!res.ok || data.error) setMessage(`Error: ${JSON.stringify(data.error || data)}`);
      let items = Array.isArray(data.stories) ? data.stories : [];

      // Verify published status via CDN (truth source for "published")
      const token = process.env.NEXT_PUBLIC_STORYBLOK_PREVIEW_TOKEN as string | undefined;
      const region = (process.env.NEXT_PUBLIC_STORYBLOK_REGION || "").toLowerCase();
      const base = region === "us" ? "https://api-us.storyblok.com" : "https://api.storyblok.com";
      if (token) {
        const verified = await Promise.all(
          items.map(async (s: any) => {
            const slug = s.full_slug || s.slug;
            try {
              const r = await fetch(`${base}/v2/cdn/stories/${slug}?version=published&token=${token}`);
              const ok = r.ok;
              return { ...s, __isPublished: ok };
            } catch {
              return { ...s, __isPublished: false };
            }
          })
        );
        items = verified;
      }

      setStories(items);
    } catch (e) {
      setMessage(`Network error: ${e}`);
    } finally {
      setLoading(false);
    }
  };

  const publishSelected = async () => {
    const ids = Object.keys(selected).filter((k) => selected[k]);
    if (!ids.length) return;
    setLoading(true);
    setMessage("");
    try {
      for (const id of ids) {
        await fetch("/api/storyblok/publish", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ spaceId, storyId: id, devToken }),
        });
      }
      setMessage(`Published ${ids.length} stor${ids.length === 1 ? "y" : "ies"}.`);
      await refresh();
    } catch (e) {
      setMessage(`Network error: ${e}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Storyblok Toolkit</h2>
      </div>
      <div className="mb-4 flex gap-2 items-center">
        <input
          className="border border-neutral-300 rounded-md px-3 py-2 text-sm w-72"
          placeholder="Space ID"
          value={spaceId}
          onChange={(e) => setSpaceId(e.target.value)}
        />
        <input
          className="border border-neutral-300 rounded-md px-3 py-2 text-sm w-[32rem]"
          placeholder="Dev Management Token (optional in dev)"
          value={devToken}
          onChange={(e) => setDevToken(e.target.value)}
        />
        <button onClick={refresh} disabled={!spaceId || loading} className="px-3 py-2 text-sm rounded-md bg-neutral-100">{loading ? "Loading…" : "List Stories"}</button>
        <button onClick={publishSelected} disabled={!spaceId || loading} className="px-3 py-2 text-sm rounded-md bg-blue-600 text-white">Publish Selected</button>
      </div>
      {message && <div className="text-sm mb-3 text-neutral-700">{message}</div>}
      <div className="border border-neutral-200 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-neutral-50">
            <tr>
              <th className="text-left p-2 w-10">Select</th>
              <th className="text-left p-2">Name</th>
              <th className="text-left p-2">Slug</th>
              <th className="text-left p-2">Status</th>
              <th className="text-left p-2">ID</th>
            </tr>
          </thead>
          <tbody>
            {stories.length === 0 ? (
              <tr><td className="p-3 text-neutral-500" colSpan={5}>No stories yet.</td></tr>
            ) : (
              stories.map((s) => (
                <tr key={s.id} className="border-t">
                  <td className="p-2"><input type="checkbox" checked={!!selected[s.id]} onChange={(e) => setSelected({ ...selected, [s.id]: e.target.checked })} /></td>
                  <td className="p-2">{s.name}</td>
                  <td className="p-2">/{s.full_slug || s.slug}</td>
                  <td className="p-2">
                    {s.__isPublished || s.published_at ? (
                      <span className="inline-flex items-center rounded-md bg-green-50 text-green-700 px-2 py-0.5">Published</span>
                    ) : (
                      <span className="inline-flex items-center rounded-md bg-yellow-50 text-yellow-800 px-2 py-0.5">Draft</span>
                    )}
                  </td>
                  <td className="p-2">{s.id}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}


