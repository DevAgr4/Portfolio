"use client";

import { useState } from "react";

interface Project {
  id: string;
  title: string;
  category: "Full-Stack" | "AI & 3D" | "DevTools";
  description: string;
  stats: string;
  stack: string[];
  gradient: string;
  accent: string;

  // Optional so projects without links don't break the build
  demoUrl?: string;
  githubUrl?: string;

  featured?: boolean;
}

const projects: Project[] = [
  {
    id: "01",
    title: "Nova AI Studio",
    category: "AI & 3D",
    description:
      "Autonomous multimodal AI playground with real-time prompt streaming, interactive node-based workflows, and creative canvas generation.",
    stats: "Streaming LLMs · 99.8% Test Coverage",
    stack: [
      "Next.js 15",
      "TypeScript",
      "OpenAI API",
      "Tailwind CSS",
      "tRPC",
    ],
    gradient:
      "from-[#ec4899]/15 via-[#8b5cf6]/15 to-transparent",
    accent: "#ec4899",
    demoUrl: "",
    githubUrl: "",
    featured: true,
  },

  {
    id: "02",
    title: "CyberPulse 3D",
    category: "AI & 3D",
    description:
      "Immersive 3D audio-visualizer and synthesizer built with custom GLSL shaders, spatial audio synthesis, and 60 FPS particle physics.",
    stats: "60 FPS WebGL · Real-Time FFT Analysis",
    stack: [
      "React",
      "Three.js",
      "GLSL Shaders",
      "Web Audio API",
      "Framer Motion",
    ],
    gradient:
      "from-[#8b5cf6]/15 via-[#3b82f6]/15 to-transparent",
    accent: "#8b5cf6",
    demoUrl: "",
    githubUrl: "",
    featured: true,
  },

  {
    id: "03",
    title: "DevFlora UI",
    category: "DevTools",
    description:
      "Open-source cyber-luxe component library engineered with micro-interactions, dark/light theme tokens, and strict WCAG AA accessibility.",
    stats: "1.4k+ GitHub Stars · Zero Runtime CSS",
    stack: [
      "TypeScript",
      "React",
      "Tailwind CSS",
      "Radix UI",
      "Figma",
    ],
    gradient:
      "from-[#06b6d4]/15 via-[#10b981]/15 to-transparent",
    accent: "#06b6d4",
    demoUrl: "",
    githubUrl: "",
  },

  {
    id: "04",
    title: "Krypton Telemetry",
    category: "Full-Stack",
    description:
      "High-throughput DevOps observability dashboard monitoring serverless edge clusters, query latencies, and real-time deployment logs.",
    stats: "< 8ms WebSocket Latency · Dockerized",
    stack: [
      "Next.js",
      "Node.js",
      "PostgreSQL",
      "WebSockets",
      "Docker",
    ],
    gradient:
      "from-[#10b981]/15 via-[#06b6d4]/15 to-transparent",
    accent: "#10b981",
    demoUrl: "",
    githubUrl: "",
  },

  {
    id: "05",
    title: "Synapse Graph",
    category: "DevTools",
    description:
      "Local-first markdown second-brain with interactive 3D bidirectional knowledge graphs, instant search, and offline-first IndexedDB sync.",
    stats: "Local-First · Interactive Force Graph",
    stack: [
      "React",
      "TypeScript",
      "D3.js",
      "IndexedDB",
      "Tailwind",
    ],
    gradient:
      "from-[#f59e0b]/15 via-[#ec4899]/15 to-transparent",
    accent: "#f59e0b",
    demoUrl: "",
    githubUrl: "",
  },
];

const categories = [
  "All",
  "Full-Stack",
  "AI & 3D",
  "DevTools",
] as const;

export default function Projects() {
  const [selectedCategory, setSelectedCategory] =
    useState<string>("All");

  /* ---------------------------------------------------------------------- */
  /* Magnetic 3D tilt handler                                               */
  /* ---------------------------------------------------------------------- */

  const handleTilt = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    const element = e.currentTarget;
    const rect = element.getBoundingClientRect();

    const x =
      (e.clientX - rect.left) / rect.width - 0.5;

    const y =
      (e.clientY - rect.top) / rect.height - 0.5;

    element.style.transform = `
      perspective(800px)
      rotateY(${x * 8}deg)
      rotateX(${-y * 8}deg)
      translateY(-4px)
    `;
  };

  const resetTilt = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    e.currentTarget.style.transform =
      "perspective(800px) rotateY(0deg) rotateX(0deg) translateY(0px)";
  };

  /* ---------------------------------------------------------------------- */
  /* Filtering                                                              */
  /* ---------------------------------------------------------------------- */

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter(
          (project) =>
            project.category === selectedCategory
        );

  /* ---------------------------------------------------------------------- */
  /* Render                                                                 */
  /* ---------------------------------------------------------------------- */

  return (
    <section
      id="projects"
      className="relative bg-[#FAFAF9] text-[#18181B] px-4 sm:px-8 md:px-14 py-20 md:py-28 overflow-hidden font-['Outfit',sans-serif] border-t border-[#E4E4E7]"
    >
      {/* Background Dot Matrix Pattern */}
      <div
        className="absolute inset-0 opacity-[0.25] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(#18181B 0.7px, transparent 0.7px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Soft Background Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#EC4899]/5 blur-[100px] rounded-full" />

        <div className="absolute right-0 top-1/3 w-96 h-96 bg-[#8B5CF6]/5 blur-[110px] rounded-full" />

        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#06B6D4]/5 blur-[100px] rounded-full" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* ---------------------------------------------------------------- */}
        {/* Section Header                                                    */}
        {/* ---------------------------------------------------------------- */}

        <div className="text-center md:text-left mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-white border border-[#E4E4E7] px-3.5 py-1.5 rounded-full mb-4 shadow-sm">
            <span className="relative w-2 h-2 rounded-full bg-[#EC4899]">
              <span className="absolute inset-0 rounded-full bg-[#EC4899] animate-ping" />
            </span>

            <span className="font-mono text-xs font-semibold text-[#18181B] uppercase tracking-wider">
              ✦ Featured Deployments
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#18181B] leading-[1.15]">
                Curated{" "}
                <span className="bg-gradient-to-r from-[#EC4899] via-[#8B5CF6] to-[#06B6D4] bg-clip-text text-transparent">
                  Digital Artifacts
                </span>
                .
              </h2>

              <p className="mt-3 text-sm sm:text-base text-[#52525B] max-w-lg font-normal leading-relaxed">
                Explore a selection of full-stack web platforms,
                3D interactive tools, and open-source applications
                I&apos;ve architected and shipped.
              </p>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() =>
                    setSelectedCategory(category)
                  }
                  className={`font-mono text-xs px-3.5 py-1.5 rounded-xl border transition-all ${
                    selectedCategory === category
                      ? "bg-[#18181B] text-white border-[#18181B] shadow-sm"
                      : "bg-white hover:bg-[#F4F4F5] text-[#52525B] border-[#E4E4E7] hover:border-[#A1A1AA]"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* Projects Grid                                                     */}
        {/* ---------------------------------------------------------------- */}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onMouseMove={handleTilt}
              onMouseLeave={resetTilt}
              className="bg-white border border-[#E4E4E7] rounded-3xl p-6 shadow-sm hover:shadow-[0_18px_40px_-10px_rgba(18,18,20,0.12)] transition-all duration-300 flex flex-col justify-between will-change-transform group"
            >
              <div>
                {/* Terminal Header */}
                <div className="flex items-center justify-between pb-4 border-b border-[#E4E4E7] mb-5">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#F43F5E]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#EAB308]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
                  </div>

                  <span className="font-mono text-[11px] text-[#71717A]">
                    sys_id: #{project.id}
                  </span>
                </div>

                {/* Project Preview */}
                <div
                  className={`relative h-44 rounded-2xl bg-gradient-to-br ${project.gradient} border border-[#E4E4E7] p-4 flex flex-col justify-between overflow-hidden mb-5`}
                >
                  <div className="flex justify-between items-start">
                    <span
                      className="font-mono text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-white shadow-sm"
                      style={{
                        color: project.accent,
                      }}
                    >
                      {project.category}
                    </span>

                    {project.featured && (
                      <span className="font-mono text-[10px] px-2 py-0.5 rounded-md bg-[#18181B] text-white flex items-center gap-1">
                        <span>★</span>
                        Top Project
                      </span>
                    )}
                  </div>

                  {/* Stats */}
                  <div className="bg-white/90 backdrop-blur-sm border border-[#E4E4E7] rounded-xl p-2.5 shadow-sm">
                    <div className="font-mono text-[11px] text-[#18181B] font-medium flex items-center gap-1.5">
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{
                          background: project.accent,
                        }}
                      />

                      {project.stats}
                    </div>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-[#18181B] group-hover:text-[#EC4899] transition-colors mb-2">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-[#52525B] leading-relaxed mb-6 font-normal">
                  {project.description}
                </p>
              </div>

              <div>
                {/* Tech Stack */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-[10.5px] px-2.5 py-1 rounded-lg bg-[#F4F4F5] text-[#3F3F46] border border-[#E4E4E7]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Links */}
                <div className="flex items-center gap-3 pt-4 border-t border-[#E4E4E7]">
                  {project.demoUrl ? (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-[#18181B] hover:bg-black text-white text-xs font-medium py-2.5 px-4 rounded-xl text-center flex items-center justify-center gap-1.5 transition-all shadow-sm"
                    >
                      <span>Live Demo</span>
                      <span className="text-xs">↗</span>
                    </a>
                  ) : (
                    <span className="flex-1 bg-[#F4F4F5] text-[#A1A1AA] text-xs font-medium py-2.5 px-4 rounded-xl text-center cursor-not-allowed">
                      Demo Coming Soon
                    </span>
                  )}

                  {project.githubUrl ? (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white hover:bg-[#F4F4F5] text-[#18181B] border border-[#E4E4E7] text-xs font-mono py-2.5 px-4 rounded-xl text-center transition-all flex items-center gap-1.5"
                    >
                      <span>&lt;/&gt; Code</span>
                    </a>
                  ) : (
                    <span className="bg-[#F4F4F5] text-[#A1A1AA] border border-[#E4E4E7] text-xs font-mono py-2.5 px-4 rounded-xl text-center cursor-not-allowed">
                      Code Soon
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* Bottom Callout                                                    */}
        {/* ---------------------------------------------------------------- */}

        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-white border border-[#E4E4E7] backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left shadow-sm">
          <div>
            <div className="font-bold text-lg text-[#18181B]">
              Have an innovative project in mind?
            </div>

            <div className="text-sm text-[#71717A] mt-1">
              Check out my open-source repositories and experimental
              projects on GitHub.
            </div>
          </div>

          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#18181B] hover:bg-black text-white text-xs font-medium px-6 py-3.5 rounded-2xl flex items-center gap-2 shadow-sm transition-all flex-shrink-0"
          >
            <span>View All Repositories on GitHub</span>
            <span>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}