import { SbBlokData, storyblokEditable } from "@storyblok/react";

type FeatureListProps = {
  blok: SbBlokData & { title?: string; features?: Array<{ name?: string; description?: string }>; };
};

export default function FeatureList({ blok }: FeatureListProps) {
  return (
    <section {...storyblokEditable(blok)} className="max-w-7xl mx-auto px-6 py-16">
      {blok.title && <h2 className="text-2xl font-semibold mb-6">{blok.title}</h2>}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {(blok.features || []).map((f, idx) => (
          <div key={idx} className="rounded-2xl border border-neutral-200 p-6">
            <div className="font-semibold">{f.name || "Feature"}</div>
            <div className="text-sm text-neutral-600 mt-2">{f.description || "Description"}</div>
          </div>
        ))}
      </div>
    </section>
  );
}


