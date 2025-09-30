"use client";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,0,0,0.04),transparent_50%)]" />
      <div className="max-w-7xl mx-auto px-6 py-20">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl font-semibold tracking-tight text-neutral-900"
        >
          BlokPilot — Orchestrate World‑Class Content with AI
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-6 text-lg md:text-xl text-neutral-600 max-w-3xl"
        >
          Ship premium, conversion‑driven experiences at startup speed. AI‑assisted creation, localized delivery, and an editor marketers love—backed by blazing‑fast search and a bulletproof preview workflow.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <a
            href="#content"
            className="inline-flex h-12 items-center justify-center rounded-full bg-neutral-900 px-6 text-white shadow-sm transition hover:shadow-md"
          >
            Launch a Demo Space
          </a>
          <a
            href="#design-system"
            className="inline-flex h-12 items-center justify-center rounded-full border border-neutral-200 px-6 text-neutral-900 transition hover:bg-neutral-50"
          >
            Explore Features
          </a>
        </motion.div>
      </div>
    </section>
  );
}


