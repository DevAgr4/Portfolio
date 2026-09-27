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
  demoUrl: string;
  githubUrl: string;
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
    stack: ["Next.js 15", "TypeScript", "OpenAI API", "Tailwind CSS", "tRPC"],
    gradient: "from-[#ec4899]/15 via-[#8b5cf6]/15 to-transparent",
    accent: "#ec4899",
    demoUrl: "https://example.com",
    githubUrl: "https://github.com",
    featured: true,
  },
  {
    id: "02",
    title: "CyberPulse 3D",
    category: "AI & 3D",
    description:
      "Immersive 3D audio-visualizer and synthesizer built with custom GLSL shaders, spatial audio synthesis, and 60 FPS particle physics.",
    stats: "60 FPS WebGL · Real-Time FFT Analysis",
    stack: ["React", "Three.js", "GLSL Shaders", "Web Audio API", "Framer Motion"],
    gradient: "from-[#8b5cf6]/15 via-[#3b82f6]/15 to-transparent",
    accent: "#8b5cf6",
    demoUrl: "https://example.com",
    githubUrl: "https://github.com",
    featured: true,
  },
  {
    id: "03",
    title: "DevFlora UI",
    category: "DevTools",
    description:
      "Open-source cyber-luxe component library engineered with micro-interactions, dark/light theme tokens, and strict WCAG AA accessibility.",
    stats: "1.4k+ GitHub Stars · Zero Runtime CSS",
    stack: ["TypeScript", "React", "Tailwind CSS", "Radix UI", "Figma"],
    gradient: "from-[#06b6d4]/15 via-[#10b981]/15 to-transparent",
    accent: "#06b6d4",
    demoUrl: "https://example.com",
    githubUrl: "https://github.com",
  },
  {
    id: "04",
    title: "Krypton Telemetry",
    category: "Full-Stack",
    description:
      "High-throughput DevOps observability dashboard monitoring serverless edge clusters, query latencies, and real-time deployment logs.",
    stats: "< 8ms WebSocket Latency · Dockerized",
    stack: ["Next.js", "Node.js", "PostgreSQL", "WebSockets", "Docker"],
    gradient: "from-[#10b981]/15 via-[#06b6d4]/15 to-transparent",
    accent: "#10b981",
    demoUrl: "https://example.com",
    githubUrl: "https://github.com",
  },
  {
    id: "05",
    title: "Aura FashionTech",
    category: "Full-Stack",
    description:
      "High-fashion digital commerce platform featuring real-time 3D interactive garment inspection, headless CMS, and instant Stripe checkout.",
    stats: "3D Product Viewer · Headless Architecture",
    stack: ["Next.js 15", "Three.js", "Stripe API", "Sanity CMS", "Tailwind"],
    gradient: "from-[#ec4899]/15 via-[#f59e0b]/15 to-transparent",
    accent: "#ec4899",
  },
  {
    id: "06",
    title: "Synapse Graph",
    category: "DevTools",
    description:
      "Local-first markdown second-brain with interactive 3D bidirectional knowledge graphs, instant search, and offline-first IndexedDB sync.",
    stats: "Local-First · Interactive Force Graph",
    stack: ["React", "TypeScript", "D3.js", "IndexedDB", "Tailwind"],
    gradient: "from-[#f59e0b]/15 via-[#ec4899]/15 to-transparent",
    accent: "#f59e0b",
  },
];

const categories = ["All", "Full-Stack", "AI & 3D", "DevTools"] as const;

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // Magnetic 3D tilt handler
  const handleTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-4px)`;
  };

  const resetTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform =
      "perspective(800px) rotateY(0deg) rotateX(0deg) translateY(0px)";
  };

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  return (
    <section
      id="projects"
      className="relative bg-[#f8f7f4] text-[#121214] px-4 sm:px-8 md:px-14 py-20 md:py-28 overflow-hidden font-['Outfit',sans-serif] border-t border-[#121214]/8"
    >
      {/* Background Dot Matrix Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.4] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#121214 0.8px, transparent 0.8px)",
          backgroundSize: "28px 28px"
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* ── Section Header ── */}
        <div className="text-center md:text-left mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-white/90 border border-[#121214]/10 px-3.5 py-1.5 rounded-full mb-4 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#ec4899] animate-ping" />
            <span className="font-mono text-xs font-semibold text-[#121214] uppercase tracking-wider">
              ✦ Featured Deployments
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#121214] leading-[1.15]">
                Curated <span className="bg-gradient-to-r from-[#ec4899] via-[#8b5cf6] to-[#06b6d4] bg-clip-text text-transparent">Digital Artifacts</span>.
              </h2>
              <p className="mt-3 text-sm sm:text-base text-[#52525b] max-w-lg font-normal">
                Explore a selection of full-stack web platforms, 3D interactive tools, and open-source applications I’ve architected and shipped.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`font-mono text-xs px-3.5 py-1.5 rounded-xl border transition-all ${
                    selectedCategory === cat
                      ? "bg-[#121214] text-white border-[#121214] shadow-sm"
                      : "bg-white/80 hover:bg-white text-[#52525b] border-[#121214]/10 hover:border-[#121214]/25"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Projects Grid ── */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onMouseMove={handleTilt}
              onMouseLeave={resetTilt}
              className="bg-white/80 backdrop-blur-md border border-[#121214]/10 rounded-3xl p-6 shadow-sm hover:shadow-[0_18px_40px_-10px_rgba(18,18,20,0.12)] transition-all duration-300 flex flex-col justify-between will-change-transform group"
            >
              <div>
                {/* Mac Terminal Header Bar on Card */}
                <div className="flex items-center justify-between pb-4 border-b border-[#121214]/8 mb-5">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#f43f5e]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#eab308]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]" />
                  </div>
                  <span className="font-mono text-[11px] text-[#71717a]">
                    sys_id: #{project.id}
                  </span>
                </div>

                {/* Project Visual Canvas / Glow Preview Header */}
                <div
                  className={`relative h-44 rounded-2xl bg-gradient-to-br ${project.gradient} border border-[#121214]/6 p-4 flex flex-col justify-between overflow-hidden mb-5`}
                >
                  <div className="flex justify-between items-start">
                    <span
                      className="font-mono text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-white/90 shadow-sm"
                      style={{ color: project.accent }}
                    >
                      {project.category}
                    </span>
                    {project.featured && (
                      <span className="font-mono text-[10px] px-2 py-0.5 rounded-md bg-[#121214] text-white flex items-center gap-1">
                        <span>★</span> Top Project
                      </span>
                    )}
                  </div>

                  {/* High-Tech Spec / Stats Badge */}
                  <div className="bg-white/80 backdrop-blur-sm border border-[#121214]/8 rounded-xl p-2.5 shadow-sm">
                    <div className="font-mono text-[11px] text-[#121214] font-medium flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: project.accent }} />
                      {project.stats}
                    </div>
                  </div>
                </div>

                {/* Title & Description */}
                <h3 className="text-xl font-bold text-[#121214] group-hover:text-[#ec4899] transition-colors mb-2">
                  {project.title}
                </h3>
                <p className="text-sm text-[#52525b] leading-relaxed mb-6 font-normal">
                  {project.description}
                </p>
              </div>

              <div>
                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-[10.5px] px-2.5 py-1 rounded-lg bg-[#f3f2ee] text-[#3f3f46] border border-[#121214]/6"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Card Action Links */}
                <div className="flex items-center gap-3 pt-4 border-t border-[#121214]/8">
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-[#121214] hover:bg-black text-white text-xs font-medium py-2.5 px-4 rounded-xl text-center flex items-center justify-center gap-1.5 transition-all shadow-sm"
                  >
                    <span>Live Demo</span>
                    <span className="text-xs">↗</span>
                  </a>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white hover:bg-[#f3f2ee] text-[#121214] border border-[#121214]/12 text-xs font-mono py-2.5 px-4 rounded-xl text-center transition-all flex items-center gap-1.5"
                  >
                    <span>&lt;/&gt; Code</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Bottom Callout: Github Link ── */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-white/60 border border-[#121214]/10 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <div className="font-bold text-lg text-[#121214]">Have an innovative project in mind?</div>
            <div className="text-sm text-[#71717a]">Check out my open-source repositories and experimental repos on GitHub.</div>
          </div>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#121214] hover:bg-black text-white text-xs font-medium px-6 py-3.5 rounded-2xl flex items-center gap-2 shadow-sm transition-all flex-shrink-0"
          >
            <span>View All Repositories on GitHub</span>
            <span>→</span>
          </a>
        </div>

      </div>
    </section>
  );
}