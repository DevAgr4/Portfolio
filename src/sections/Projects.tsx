"use client";

import { useState } from "react";

/* -------------------------------------------------------------------------- */
/* Data                                                                        */
/* Put your screenshots in /public/projects/ and set `image` to match.        */
/* If an image is missing or fails to load, a soft placeholder is shown.      */
/* -------------------------------------------------------------------------- */

interface Project {
  id: string;
  mark: string; // short monogram for the selector
  title: string;
  kind: string;
  tagline: string;
  description: string;
  highlights: string[];
  stack: string[];
  accent: string;
  soft: string;
  githubUrl: string;
  image?: string;
}

const projects: Project[] = [
  {
    id: "blog",
    mark: "AB",
    title: "AI-Powered Blog Platform",
    kind: "Full-stack · AI",
    tagline: "Full-stack blogging with AI moderation",
    description:
      "A modern full-stack blog platform featuring AI-powered content moderation, image classification, and intelligent commenting using Ollama models.",
    highlights: [
      "AI content moderation",
      "Image classification",
      "Intelligent commenting with Ollama",
    ],
    stack: ["Next.js", "FastAPI", "PostgreSQL", "Tailwind CSS", "Ollama", "REST API"],
    accent: "#D6657F",
    soft: "#F9DCE4",
    githubUrl: "https://github.com/DevAgr4/blog-",
    image: "/projects/blog.png",
  },
  {
    id: "vericlaim",
    mark: "VC",
    title: "VeriClaim AI",
    kind: "InsurTech · AI",
    tagline: "Real-time fraud-aware insurance automation platform",
    description:
      "An AI-powered parametric insurance system for gig workers that automates risk detection, fraud analysis, trigger-based claims, and instant payouts using real-time weather, traffic, and location intelligence.",
    highlights: [
      "Trigger-based automatic claims",
      "Hybrid fraud detection",
      "Instant payouts",
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "FastAPI",
      "PostgreSQL",
      "Custom ML Models",
      "Hybrid Fraud Detection",
      "WeatherAPI",
      "REST API",
    ],
    accent: "#9B7BD6",
    soft: "#E8DEF8",
    githubUrl: "https://github.com/DevAgr4/ai-payout",
    image: "/projects/vericlaim.png",
  },
  {
    id: "operations",
    mark: "AO",
    title: "AI-Driven Application Support & Operations",
    kind: "AIOps · ML",
    tagline: "Enterprise-grade intelligent incident management platform",
    description:
      "An AI-powered AIOps platform that automates IT support workflows using NLP-based ticket classification, semantic similarity search, ML-driven confidence scoring, and governance-based auto-resolution with human-in-the-loop controls.",
    highlights: [
      "NLP ticket classification",
      "Semantic similarity search",
      "Auto-resolution with human-in-the-loop",
    ],
    stack: [
      "FastAPI",
      "Python",
      "Scikit-learn",
      "Sentence Transformers",
      "Machine Learning",
      "FAISS / Cosine Similarity",
      "Admin Dashboard",
      "Tailwind",
    ],
    accent: "#5FAE97",
    soft: "#D9F0E7",
    githubUrl: "https://github.com/SarthakAag/operations",
    image: "/projects/operations.png",
  },
  {
    id: "stocks",
    mark: "SP",
    title: "Stock Price Prediction",
    kind: "Machine learning",
    tagline: "ML-powered market insights",
    description:
      "An interactive stock market analysis web app providing real-time and historical stock insights using predictive modelling.",
    highlights: [
      "Real-time and historical insights",
      "Predictive modelling",
      "Interactive Streamlit app",
    ],
    stack: ["Python", "Streamlit", "Yahoo Finance API", "Pandas", "Matplotlib"],
    accent: "#E58E6D",
    soft: "#FBE3D8",
    githubUrl: "https://github.com/DevAgr4/aapl",
    image: "/projects/stocks.png",
  },
];

/* -------------------------------------------------------------------------- */
/* Neumorphic tokens                                                           */
/* -------------------------------------------------------------------------- */

const BASE = "#F4E9EF";
const raised = "shadow-[9px_9px_20px_#D8C3CF,-9px_-9px_20px_#FFFFFF]";
const raisedSm = "shadow-[5px_5px_11px_#D8C3CF,-5px_-5px_11px_#FFFFFF]";
const inset = "shadow-[inset_6px_6px_13px_#D8C3CF,inset_-6px_-6px_13px_#FFFFFF]";
const insetSm = "shadow-[inset_3px_3px_7px_#D8C3CF,inset_-3px_-3px_7px_#FFFFFF]";
const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B4456A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F4E9EF]";

const repoName = (url: string) => url.replace("https://github.com/", "");

/* -------------------------------------------------------------------------- */
/* Component                                                                   */
/* -------------------------------------------------------------------------- */

export default function Projects() {
  const [activeId, setActiveId] = useState(projects[0].id);
  const [failed, setFailed] = useState<Record<string, boolean>>({});
  const active = projects.find((p) => p.id === activeId) ?? projects[0];
  const showImage = !!active.image && !failed[active.id];

  return (
    <section
      id="projects"
      className="relative overflow-hidden px-4 py-16 sm:px-8 sm:py-20 md:px-14 md:py-28 text-[#4A2C40]"
      style={{ background: BASE, fontFamily: "'DM Sans', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Fraunces:ital,opsz,wght@0,9..144,500;1,9..144,500&display=swap');
        .p-serif { font-family: 'Fraunces', serif; }
        @keyframes p-swap { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
        .p-swap { animation: p-swap .4s ease both; }
        .p-hide-scroll { scrollbar-width: none; }
        .p-hide-scroll::-webkit-scrollbar { display: none; }
        .p-clamp2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        @media (prefers-reduced-motion: reduce) { .p-swap { animation: none; } }
      `}</style>

      <div className="relative mx-auto max-w-6xl">
        {/* Header */}
        <header className="mb-10 text-center md:mb-14 md:text-left">
          <h2 className="p-serif text-4xl leading-[1.1] sm:text-5xl md:text-6xl">
            Things I&rsquo;ve <em className="text-[#B4456A]">made</em>
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-[#7A5B6E] md:mx-0">
            Four projects from my GitHub. Pick one to see what it does and how it&rsquo;s built.
          </p>
        </header>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          {/* Selector */}
          <div
            role="tablist"
            aria-label="Projects"
            aria-orientation="vertical"
            className="p-hide-scroll -mx-4 flex gap-4 overflow-x-auto px-4 py-3 sm:-mx-8 sm:px-8 lg:mx-0 lg:flex-col lg:gap-5 lg:overflow-visible lg:p-3"
          >
            {projects.map((p) => {
              const isActive = p.id === active.id;
              return (
                <button
                  key={p.id}
                  role="tab"
                  id={`tab-${p.id}`}
                  aria-selected={isActive}
                  aria-controls="project-panel"
                  onClick={() => setActiveId(p.id)}
                  className={`flex min-w-[250px] shrink-0 items-center gap-4 rounded-[28px] px-5 py-4 text-left transition-shadow duration-300 motion-reduce:transition-none lg:min-w-0 ${focusRing} ${
                    isActive ? inset : raised
                  }`}
                  style={{ background: BASE }}
                >
                  <span
                    className={`p-serif flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-lg ${
                      isActive ? raisedSm : insetSm
                    }`}
                    style={{ color: p.accent, background: BASE }}
                    aria-hidden
                  >
                    {p.mark}
                  </span>
                  <span className="min-w-0">
                    <span className="p-clamp2 text-base font-semibold leading-snug">{p.title}</span>
                    <span className="block truncate text-sm text-[#7A5B6E]">{p.kind}</span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* Detail panel */}
          <div
            id="project-panel"
            role="tabpanel"
            aria-labelledby={`tab-${active.id}`}
            className={`rounded-[36px] p-5 sm:p-8 ${raised}`}
            style={{ background: BASE }}
          >
            <div key={active.id} className="p-swap">
              {/* Image well */}
              <div
                className={`relative aspect-[2/1] w-full overflow-hidden rounded-[28px] p-3 ${inset}`}
                style={{ background: `linear-gradient(145deg, ${active.soft}, ${BASE})` }}
              >
                {showImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={active.image}
                    alt={`Screenshot of ${active.title}`}
                    loading="lazy"
                    onError={() => setFailed((f) => ({ ...f, [active.id]: true }))}
                    className="h-full w-full rounded-[20px] object-cover object-center"
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center text-center">
                    <span
                      className="p-serif text-7xl opacity-40 sm:text-8xl"
                      style={{ color: active.accent }}
                      aria-hidden
                    >
                      {active.mark}
                    </span>
                    <span className="mt-2 text-sm text-[#7A5B6E]">Screenshot coming soon</span>
                  </div>
                )}
                <span
                  className={`absolute left-6 top-6 rounded-full px-3.5 py-1 text-sm font-medium ${raisedSm}`}
                  style={{ background: BASE, color: active.accent }}
                >
                  {active.kind}
                </span>
              </div>

              {/* Text */}
              <h3 className="p-serif mt-7 text-2xl leading-tight sm:text-4xl">{active.title}</h3>
              <p className="p-serif mt-2 text-lg italic text-[#B4456A]">{active.tagline}</p>
              <p className="mt-4 max-w-prose text-base leading-relaxed text-[#6A4C5F]">
                {active.description}
              </p>

              {/* Highlights */}
              <ul className="mt-6 grid gap-3 sm:grid-cols-3">
                {active.highlights.map((h) => (
                  <li
                    key={h}
                    className={`flex items-start gap-2.5 rounded-2xl px-4 py-3 text-sm leading-snug ${insetSm}`}
                  >
                    <span
                      className="mt-1.5 h-2 w-2 shrink-0 rounded-full"
                      style={{ background: active.accent }}
                      aria-hidden
                    />
                    {h}
                  </li>
                ))}
              </ul>

              {/* Stack */}
              <div className="mt-6">
                <p className="mb-3 text-sm font-semibold text-[#7A5B6E]">Built with</p>
                <ul className="flex flex-wrap gap-2.5">
                  {active.stack.map((t) => (
                    <li
                      key={t}
                      className={`rounded-full px-4 py-1.5 text-sm ${raisedSm}`}
                      style={{ background: BASE }}
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </div>

              {/* GitHub link */}
              <div className="mt-8">
                <a
                  href={active.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block w-full rounded-full px-6 py-3.5 text-center text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0 motion-reduce:transition-none ${focusRing}`}
                  style={{
                    background: `linear-gradient(135deg, ${active.accent}, #B4456A)`,
                    boxShadow: `6px 6px 14px #D8C3CF, -6px -6px 14px #FFFFFF`,
                  }}
                >
                  View code on GitHub
                  <span className="sr-only"> ({repoName(active.githubUrl)})</span>
                </a>
                <p className="mt-4 text-center text-xs text-[#A58A99]">
                  {repoName(active.githubUrl)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer callout */}
        <div
          className={`mt-14 flex flex-col items-center justify-between gap-5 rounded-[32px] px-6 py-7 text-center sm:flex-row sm:px-9 sm:text-left ${raised}`}
          style={{ background: BASE }}
        >
          <div>
            <p className="p-serif text-2xl">There&rsquo;s more on GitHub</p>
            <p className="mt-1 text-sm text-[#7A5B6E]">
              Smaller experiments and work in progress live there too.
            </p>
          </div>
          <a
            href="https://github.com/DevAgr4"
            target="_blank"
            rel="noopener noreferrer"
            className={`shrink-0 rounded-full px-7 py-3.5 text-sm font-semibold ${raisedSm} ${focusRing}`}
            style={{ background: BASE, color: "#B4456A" }}
          >
            Browse all repositories
          </a>
        </div>
      </div>
    </section>
  );
}