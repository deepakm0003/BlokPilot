"use client";
import { useEffect, useState } from "react";
import { useStoryblokState, StoryblokComponent } from "@storyblok/react";
import { Shell } from "@/components/layout/Shell";
import { Hero } from "@/components/marketing/Hero";
import { Assistant } from "@/components/ai/Assistant";
import StoryblokToolkit from "@/components/storyblok/Toolkit";
import { ProjectsSection } from "@/components/projects/ProjectsSection";
import { DesignSystemGenerator } from "@/components/design-system/DesignSystemGenerator";
import { MultilingualLocalizer } from "@/components/localization/MultilingualLocalizer";
import { BrandIdentityGenerator } from "@/components/brand-identity/BrandIdentityGenerator";
import { ContentAutopilot } from "@/components/content-autopilot/ContentAutopilot";
import { StoryblokPlayground } from "@/components/storyblok/Playground";
import PredictiveIntelligence from "@/components/predictive/PredictiveIntelligence";


export default function Home() {
  const [story, setStory] = useState<any>(null);

  useEffect(() => {
    async function fetchStory() {
      // In client components, only NEXT_PUBLIC_* env vars are available
      const token = process.env.NEXT_PUBLIC_STORYBLOK_PREVIEW_TOKEN || process.env.STORYBLOK_ACCESS_TOKEN;
      if (!token) return;
      try {
        const region = (process.env.NEXT_PUBLIC_STORYBLOK_REGION || "").toLowerCase();
        const base = region === "us" ? "https://api-us.storyblok.com" : "https://api.storyblok.com";
        const res = await fetch(`${base}/v2/cdn/stories/home?version=draft&token=${token}`);
        const data = await res.json();
        setStory(data.story);
      } catch {
        // noop when unauthenticated or offline
      }
    }
    fetchStory();
  }, []);

  const liveStory = useStoryblokState(story);

  return (
    <Shell>
      <Hero />
      <ProjectsSection />
      <section id="ai" className="max-w-7xl mx-auto px-6 py-16">
        <Assistant />
      </section>
      <PredictiveIntelligence />
      <section id="content" className="max-w-7xl mx-auto px-6 py-16">
        {!liveStory ? (
          <StoryblokPlayground defaultSpaceId={process.env.NEXT_PUBLIC_STORYBLOK_SPACE_ID} />
        ) : (
          <StoryblokComponent blok={liveStory.content} />
        )}
      </section>
      <section id="toolkit" className="max-w-7xl mx-auto px-6 py-16">
        <StoryblokToolkit />
      </section>
      <section id="design-system" className="max-w-7xl mx-auto px-6 py-16">
        <DesignSystemGenerator />
      </section>
      <section id="localization" className="max-w-7xl mx-auto px-6 py-16">
        <MultilingualLocalizer />
      </section>
      <section id="brand-identity" className="max-w-7xl mx-auto px-6 py-16">
        <BrandIdentityGenerator />
      </section>
      <section id="content-autopilot" className="max-w-7xl mx-auto px-6 py-16">
        <ContentAutopilot />
      </section>
    </Shell>
  );
}
