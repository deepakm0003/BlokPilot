"use client";
import { useState } from "react";
import { motion } from "framer-motion";

export function StoryblokPlayground({
  defaultSpaceId,
  defaultSlug = "home",
}: {
  defaultSpaceId?: string;
  defaultSlug?: string;
}) {
  const [spaceId, setSpaceId] = useState<string>(defaultSpaceId || "");
  const [name, setName] = useState<string>("Home");
  const [slug, setSlug] = useState<string>(defaultSlug);
  const [headline, setHeadline] = useState<string>("Storyblok Playground");
  const [body, setBody] = useState<string>("Compose content here and push to your space.");
  const [cta, setCta] = useState<string>("Publish Draft");
  const [image, setImage] = useState<string>("https://picsum.photos/seed/sb/800/400");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [stories, setStories] = useState<any[]>([]);
  const [loadingStories, setLoadingStories] = useState(false);
  const [selectedStoryId, setSelectedStoryId] = useState<string | null>(null);
  const [devToken, setDevToken] = useState<string>("");

  const contentJson = {
    component: "page",
    headline,
    body,
    image,
    cta,
  };

  const pushToStoryblok = async () => {
    setSaving(true);
    setMessage("");
    try {
      const res = await fetch("/api/storyblok/write", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          spaceId,
          slug,
          name,
          content: contentJson,
          devToken: devToken || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        setMessage(`Error: ${JSON.stringify(data.error || data)}`);
      } else {
        setMessage("Draft saved to Storyblok (preview mode). Open your space to see it.");
      }
    } catch (e) {
      setMessage(`Network error: ${e}`);
    } finally {
      setSaving(false);
    }
  };

  const fetchStories = async () => {
    if (!spaceId) return;
    setLoadingStories(true);
    setMessage("");
    try {
      const res = await fetch("/api/storyblok/list", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          spaceId, 
          with_drafts: true, 
          per_page: 50,
          devToken: devToken || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        setMessage(`Error: ${JSON.stringify(data.error || data)}`);
      } else {
        const storiesArray = Array.isArray(data.stories) ? data.stories : [];
        setStories(storiesArray);
        setMessage(`Loaded ${storiesArray.length} stories`);
      }
    } catch (e) {
      setMessage(`Network error: ${e}`);
    } finally {
      setLoadingStories(false);
    }
  };

  const debugConnection = async () => {
    if (!spaceId) return;
    setLoadingStories(true);
    setMessage("");
    try {
      const res = await fetch("/api/storyblok/debug", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          spaceId,
          devToken: devToken || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        setMessage(`Debug Error: ${JSON.stringify(data.error || data)}`);
      } else {
        setMessage(`Debug Success: ${data.debug?.hasStories || 0} stories found. Total: ${data.total || 0}`);
        if (data.stories) {
          setStories(Array.isArray(data.stories) ? data.stories : []);
        }
      }
    } catch (e) {
      setMessage(`Debug Network error: ${e}`);
    } finally {
      setLoadingStories(false);
    }
  };

  const loadStoryIntoEditor = (story: any) => {
    setSelectedStoryId(String(story.id));
    setName(story.name || name);
    setSlug(story.slug || slug);
    const c = story.content || {};
    if (c.headline) setHeadline(c.headline);
    if (c.body) setBody(c.body);
    if (c.cta) setCta(c.cta);
    if (c.image) setImage(c.image);
    setMessage("Loaded story into editor.");
  };

  const publishStory = async () => {
    if (!selectedStoryId || !spaceId) {
      setMessage("Select a story first.");
      return;
    }
    setSaving(true);
    setMessage("");
    try {
      const res = await fetch("/api/storyblok/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          spaceId, 
          storyId: selectedStoryId,
          devToken: devToken || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        setMessage(`Error: ${JSON.stringify(data.error || data)}`);
      } else {
        setMessage("Story published.");
      }
    } catch (e) {
      setMessage(`Network error: ${e}`);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="rounded-2xl border border-neutral-200 p-6">
      <motion.h3 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="text-2xl font-semibold mb-4">
        🧱 Storyblok Playground (Local Draft Builder)
      </motion.h3>
      <p className="text-sm text-neutral-600 mb-6">Build a draft block and push it to your space as a Story. Add your dev token below if server tokens are missing.</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Space ID</label>
              <input value={spaceId} onChange={(e) => setSpaceId(e.target.value)} placeholder="287490777580041" className="w-full border border-neutral-300 rounded-md px-3 py-2 text-sm" />
              <div className="mt-2 flex gap-2">
                <button onClick={fetchStories} disabled={!spaceId || loadingStories} className="px-3 py-1.5 bg-neutral-100 text-neutral-700 rounded-md text-xs font-medium disabled:opacity-50">
                  {loadingStories ? "Loading…" : "List Stories"}
                </button>
                <button onClick={debugConnection} disabled={!spaceId || loadingStories} className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-md text-xs font-medium disabled:opacity-50">
                  Debug
                </button>
                <button onClick={publishStory} disabled={!selectedStoryId || saving} className="px-3 py-1.5 bg-green-600 text-white rounded-md text-xs font-medium disabled:opacity-50">Publish Selected</button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Dev Management Token (optional)</label>
              <input 
                value={devToken} 
                onChange={(e) => setDevToken(e.target.value)} 
                placeholder="ckWxdls3BOdatw8LE6mxGwtt-96250502841037-Nd_ADfyJfeEfL557Nis4" 
                className="w-full border border-neutral-300 rounded-md px-3 py-2 text-sm" 
              />
              <p className="text-xs text-neutral-500 mt-1">Use this if server tokens are missing</p>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Story Name</label>
              <input value={name} onChange={(e) => setName(e.target.value)} className="w-full border border-neutral-300 rounded-md px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Slug</label>
              <input value={slug} onChange={(e) => setSlug(e.target.value)} className="w-full border border-neutral-300 rounded-md px-3 py-2 text-sm" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Headline</label>
            <input value={headline} onChange={(e) => setHeadline(e.target.value)} className="w-full border border-neutral-300 rounded-md px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Body</label>
            <textarea value={body} onChange={(e) => setBody(e.target.value)} className="w-full border border-neutral-300 rounded-md px-3 py-2 text-sm h-24" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">CTA</label>
              <input value={cta} onChange={(e) => setCta(e.target.value)} className="w-full border border-neutral-300 rounded-md px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Image URL</label>
              <input value={image} onChange={(e) => setImage(e.target.value)} className="w-full border border-neutral-300 rounded-md px-3 py-2 text-sm" />
            </div>
          </div>

          <div className="flex gap-2">
            <button onClick={pushToStoryblok} disabled={saving || !spaceId} className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium disabled:opacity-50">
              {saving ? "Saving…" : "Push to Storyblok (Draft)"}
            </button>
            <button onClick={() => navigator.clipboard.writeText(JSON.stringify(contentJson, null, 2))} className="px-4 py-2 bg-neutral-100 text-neutral-700 rounded-md text-sm font-medium">
              Copy JSON
            </button>
          </div>
          {message && <div className="text-sm mt-2 text-neutral-700">{message}</div>}
        </div>

        <div className="lg:col-span-1 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Stories in Space</label>
            <div className="border border-neutral-200 rounded-xl max-h-64 overflow-auto">
              {stories.length === 0 ? (
                <div className="p-3 text-sm text-neutral-500">No stories loaded yet.</div>
              ) : (
                <ul className="divide-y divide-neutral-200">
                  {stories.map((s: any) => (
                    <li key={s.id} className={`p-3 text-sm cursor-pointer ${selectedStoryId === String(s.id) ? "bg-blue-50" : ""}`} onClick={() => loadStoryIntoEditor(s)}>
                      <div className="font-medium">{s.name}</div>
                      <div className="text-neutral-500">/{s.full_slug || s.slug}</div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <label className="block text-sm font-medium mb-2">Live Preview</label>
          <div className="border border-neutral-200 rounded-xl overflow-hidden">
            <img src={image} alt="preview" className="w-full h-36 object-cover" />
            <div className="p-4">
              <div className="text-base font-semibold mb-1">{headline}</div>
              <div className="text-sm text-neutral-600 mb-3">{body}</div>
              <button className="px-3 py-1.5 bg-blue-600 text-white rounded-md text-sm">{cta}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



