import { storyblokEditable } from "@storyblok/react";

export default function Page({ blok }: { blok: any }) {
  const headline = blok?.headline || blok?.title || "Untitled";
  const body = blok?.body || blok?.description || "";
  const image = blok?.image || "https://picsum.photos/seed/sb/1200/600";
  const cta = blok?.cta || "Learn more";

  return (
    <section {...storyblokEditable(blok)} className="border border-neutral-200 rounded-2xl overflow-hidden">
      <img src={image} alt="hero" className="w-full h-64 object-cover" />
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-2">{headline}</h1>
        <p className="text-neutral-600 mb-4">{body}</p>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm">{cta}</button>
      </div>
    </section>
  );
}


