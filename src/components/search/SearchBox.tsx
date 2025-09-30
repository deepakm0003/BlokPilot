"use client";
import { algoliasearch } from "algoliasearch";
import { useEffect, useRef } from "react";
import { autocomplete } from "@algolia/autocomplete-js";

export function SearchBox() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const appId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || "";
    const searchKey = process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY || "";
    if (!containerRef.current) return;
    const hasAlgolia = !!appId && !!searchKey;
    const searchClient = hasAlgolia ? algoliasearch(appId, searchKey) : null as any;

    const ac = autocomplete({
      container: containerRef.current,
      placeholder: "Search content…",
      openOnFocus: true,
      detachedMediaQuery: "none",
      onSubmit({ event }) {
        event.preventDefault(); // never navigate on enter
      },
      navigator: {
        navigate() {
          /* disable navigation from items */
        },
      },
      getSources() {
        return [
          {
            sourceId: "stories",
            async getItems({ query }) {
              if (!query) return [];
              const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`).then((r) => r.json());
              return (res.hits as any[]) || [];
            },
            onSelect({ event }) {
              event.preventDefault(); // disable default navigation
            },
            templates: {
              header() {
                return `<div class=\"aa-SourceHeader\">Results</div>`;
              },
              item({ item }: any) {
                const title = item.title || item.name || "Untitled";
                const slug = item.slug ? `/${item.slug}` : "";
                return `<div class=\"aa-ItemWrapper\"><div class=\"aa-ItemContent\"><div class=\"aa-ItemContentTitle\">${title}</div><div class=\"aa-ItemContentDescription\">${slug}</div></div></div>`;
              },
              noResults({ state }: any) {
                return `<div class=\"aa-ItemWrapper\">No results for “${state.query}”.</div>`;
              },
            },
          },
        ];
      },
    });

    return () => {
      ac?.destroy();
    };
  }, []);

  return <div ref={containerRef} className="autocomplete w-full max-w-xl border border-neutral-300 rounded-md px-2 py-1" />;
}


