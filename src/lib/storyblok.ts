import { storyblokInit, apiPlugin } from "@storyblok/react";
import { components } from "@/components/storyblok";

export function initializeStoryblok() {
  // Prefer public preview token so client and server both work in dev
  const token =
    process.env.NEXT_PUBLIC_STORYBLOK_PREVIEW_TOKEN ||
    process.env.STORYBLOK_ACCESS_TOKEN;

  // Allow switching region via env; default EU (no explicit region required)
  const region = (process.env.NEXT_PUBLIC_STORYBLOK_REGION || "").toLowerCase();

  storyblokInit({
    accessToken: token || undefined,
    use: token ? [apiPlugin] : [],
    components,
    apiOptions: region === "us" ? { region: "us" } : undefined,
  });
}


