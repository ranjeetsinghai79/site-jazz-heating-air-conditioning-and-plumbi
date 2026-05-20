"use client"

import { config } from "@/lib/config"

type Chapter = { index: string; label: string; headline: string; body: string; bg: string; fg: string }

export default function BrandStorySection() {
  const chapters: Chapter[] = (config as any).brandStoryChapters ?? []

  return (
    <section aria-label="Brand story" className="relative">
      {chapters.map((c: Chapter) => (
        <div
          key={c.index}
          className="min-h-screen flex flex-col px-6 py-24"
          style={{ background: c.bg, color: c.fg }}
        >
          <p
            className="text-xs font-bold uppercase tracking-[0.2em] mb-2"
            style={{ color: c.bg === "var(--brand-accent)" ? "#fff" : "var(--brand-accent)" }}
          >
            {c.index} — {c.label}
          </p>
          <h2 className="text-5xl font-bold leading-tight mb-6">{c.headline}</h2>
          <p className="max-w-2xl text-lg leading-relaxed opacity-80">{c.body}</p>
        </div>
      ))}
    </section>
  )
}

