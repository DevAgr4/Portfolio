"use client";

import { useEffect, useRef, useState } from "react";

const skillCategories = [
  {
    id: "frontend",
    label: "Frontend",
    icon: "⚡",
    color: "#ec4899", // Electric Fuchsia
    bg: "rgba(236, 72, 153, 0.08)",
    border: "rgba(236, 72, 153, 0.35)",
    skills: [
      { name: "React 19",     level: 95 },
      { name: "Next.js 15",   level: 92 },
      { name: "TypeScript",   level: 88 },
      { name: "Tailwind CSS", level: 96 },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    icon: "⬡",
    color: "#8b5cf6", // Electric Violet
    bg: "rgba(139, 92, 246, 0.08)",
    border: "rgba(139, 92, 246, 0.35)",
    skills: [
      { name: "Node.js",    level: 85 },
      { name: "REST / tRPC",level: 88 },
      { name: "PostgreSQL", level: 80 },
      { name: "Prisma / ORM", level: 82 },
    ],
  },
  {
    id: "ai",
    label: "AI / ML",
    icon: "🔮",
    color: "#06b6d4", // Cyber Cyan
    bg: "rgba(6, 182, 212, 0.08)",
    border: "rgba(6, 182, 212, 0.35)",
    skills: [
      { name: "Python",        level: 84 },
      { name: "LangChain / AI", level: 78 },
      { name: "PyTorch",       level: 72 },
      { name: "OpenAI / Anthropic APIs", level: 90 },
    ],
  },
  {
    id: "design",
    label: "UI/UX",
    icon: "✨",
    color: "#f59e0b", // Amber Gold
    bg: "rgba(245, 158, 11, 0.08)",
    border: "rgba(245, 158, 11, 0.35)",
    skills: [
      { name: "Figma",         level: 90 },
      { name: "Design Systems",level: 86 },
      { name: "Wireframing",   level: 84 },
      { name: "Accessibility", level: 88 },
    ],
  },
  {
    id: "tools",
    label: "DevOps & Tools",
    icon: "⌨️",
    color: "#10b981", // Terminal Mint
    bg: "rgba(16, 185, 129, 0.08)",
    border: "rgba(16, 185, 129, 0.35)",
    skills: [
      { name: "Git / GitHub", level: 92 },
      { name: "VS Code",      level: 98 },
      { name: "Docker",       level: 70 },
      { name: "Vercel / Cloud", level: 88 },
    ],
  },
  {
    id: "motion",
    label: "Creative Motion",
    icon: "🚀",
    color: "#3b82f6", // Cobalt Blue
    bg: "rgba(59, 130, 246, 0.08)",
    border: "rgba(59, 130, 246, 0.35)",
    skills: [
      { name: "Framer Motion", level: 88 },
      { name: "Three.js / 3D", level: 74 },
      { name: "CSS Keyframes", level: 94 },
      { name: "Micro-Interactions", level: 90 },
    ],
  },
];

// Spider web math: 6 nodes arranged circularly
const WEB_CX = 220;
const WEB_CY = 215;
const WEB_R  = 145;

const nodes = skillCategories.map((cat, i) => {
  const angle = (2 * Math.PI * i) / skillCategories.length - Math.PI / 2;
  return {
    id:  cat.id,
    cx:  Math.round(WEB_CX + WEB_R * Math.cos(angle)),
    cy:  Math.round(WEB_CY + WEB_R * Math.sin(angle)),
    angle,
  };
});

// All connections between categories
const connections: [string, string][] = [];
for (let i = 0; i < skillCategories.length; i++) {
  for (let j = i + 1; j < skillCategories.length; j++) {
    connections.push([skillCategories[i].id, skillCategories[j].id]);
  }
}

function getNode(id: string) {
  return nodes.find((n) => n.id === id)!;
}

const RINGS = [0.25, 0.5, 0.75, 1.0];

export default function Skills() {
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState<string | null>("frontend");
  const [animated, setAnimated] = useState<Set<string>>(new Set());
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    skillCategories.forEach((cat, ci) => {
      cat.skills.forEach((_, si) => {
        setTimeout(() => {
          setAnimated((prev) => new Set(prev).add(`${cat.id}-${si}`));
        }, 300 + ci * 100 + si * 60);
      });
    });
  }, [visible]);

  const activeCategory = skillCategories.find((c) => c.id === active);

  function ringPolygon(fraction: number) {
    return nodes.map((n) => {
      const dx = n.cx - WEB_CX;
      const dy = n.cy - WEB_CY;
      return `${WEB_CX + dx * fraction},${WEB_CY + dy * fraction}`;
    }).join(" ");
  }

  return (
    <section
      id="skills"
      ref={sectionRef}
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

      {/* Subtle Ambient Color Blobs */}
      <div className="absolute -top-12 -right-12 w-96 h-96 bg-[#ec4899]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-12 w-96 h-96 bg-[#8b5cf6]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* ── Section Header ── */}
        <div className="text-center md:text-left mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-white/90 border border-[#121214]/10 px-3.5 py-1.5 rounded-full mb-4 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#ec4899] animate-ping" />
            <span className="font-mono text-xs font-semibold text-[#121214] uppercase tracking-wider">
              ✦ Neural Skill Radar
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#121214] leading-[1.15] mb-3">
            Full-Stack <span className="bg-gradient-to-r from-[#ec4899] via-[#8b5cf6] to-[#06b6d4] bg-clip-text text-transparent">Spider Web</span> of Skills.
          </h2>

          <p className="text-sm sm:text-base text-[#52525b] max-w-xl mx-auto md:mx-0 font-normal">
            Hover over or tap any node on the radar to inspect my proficiency, interconnected tools, and full-stack stack coverage.
          </p>
        </div>

        {/* ── Main Layout: Cards & Radar ── */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* ── Left: Skill Category Cards (7 Cols) ── */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {skillCategories.map((cat) => {
              const isSelected = active === cat.id;
              const isHovered = hoveredNode === cat.id;

              return (
                <div
                  key={cat.id}
                  onClick={() => setActive(cat.id)}
                  onMouseEnter={() => setHoveredNode(cat.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                  className={`relative p-5 rounded-2xl border transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? "bg-white shadow-[0_12px_30px_-5px_rgba(18,18,20,0.1)] border-l-4"
                      : "bg-white/70 hover:bg-white border-[#121214]/10 hover:border-[#121214]/20 shadow-sm"
                  }`}
                  style={{
                    borderLeftColor: isSelected ? cat.color : undefined,
                  }}
                >
                  {/* Category Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2.5">
                      <span
                        className="w-8 h-8 rounded-xl flex items-center justify-center text-sm shadow-inner"
                        style={{ background: cat.bg, color: cat.color }}
                      >
                        {cat.icon}
                      </span>
                      <h3 className="font-semibold text-sm text-[#121214]">{cat.label}</h3>
                    </div>
                    {isSelected && (
                      <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#121214] text-white">
                        Active
                      </span>
                    )}
                  </div>

                  {/* Skill Progress Bars */}
                  <div className="space-y-3">
                    {cat.skills.map((sk, si) => (
                      <div key={sk.name}>
                        <div className="flex justify-between items-center text-xs mb-1 font-mono">
                          <span className="text-[#3f3f46]">{sk.name}</span>
                          <span className="text-[#71717a]">{sk.level}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-[#121214]/6 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-1000 ease-out"
                            style={{
                              width: animated.has(`${cat.id}-${si}`) ? `${sk.level}%` : "0%",
                              background: `linear-gradient(90deg, ${cat.color}99, ${cat.color})`,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── Right: Interactive Radar Spider Web (5 Cols) ── */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <div className="bg-white/80 backdrop-blur-md border border-[#121214]/10 rounded-3xl p-5 sm:p-7 shadow-[0_16px_40px_-10px_rgba(18,18,20,0.08)]">
              
              {/* Radar Header / Status */}
              <div className="flex items-center justify-between pb-4 border-b border-[#121214]/8 mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#10b981] animate-pulse" />
                  <span className="font-mono text-xs font-semibold text-[#121214]">radar.matrix()</span>
                </div>
                <span className="font-mono text-[11px] text-[#71717a]">
                  tap node to link
                </span>
              </div>

              {/* Spider Web SVG */}
              <div className="relative w-full max-w-[400px] mx-auto select-none">
                <svg
                  viewBox="0 0 440 430"
                  className="w-full h-auto overflow-visible"
                  aria-label="Skill Spider Web"
                >
                  <defs>
                    <filter id="radarGlow" x="-30%" y="-30%" width="160%" height="160%">
                      <feGaussianBlur stdDeviation="4" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  {/* Ring Grid */}
                  {RINGS.map((f, idx) => (
                    <polygon
                      key={f}
                      points={ringPolygon(f)}
                      fill="none"
                      stroke="rgba(18, 18, 20, 0.08)"
                      strokeWidth="1"
                      strokeDasharray={idx === 3 ? "none" : "4 4"}
                    />
                  ))}

                  {/* Axis Spokes (Center -> Each Node) */}
                  {nodes.map((n) => (
                    <line
                      key={n.id}
                      x1={WEB_CX}
                      y1={WEB_CY}
                      x2={n.cx}
                      y2={n.cy}
                      stroke="rgba(18, 18, 20, 0.1)"
                      strokeWidth="1"
                    />
                  ))}

                  {/* Neural Connection Lines */}
                  {connections.map(([a, b]) => {
                    const na = getNode(a);
                    const nb = getNode(b);
                    const highlight = hoveredNode || active;
                    const isHot = highlight && (highlight === a || highlight === b);
                    const isDim = highlight && !isHot;

                    return (
                      <line
                        key={`${a}-${b}`}
                        x1={na.cx}
                        y1={na.cy}
                        x2={nb.cx}
                        y2={nb.cy}
                        stroke={isHot ? (hoveredNode ? getNode(hoveredNode) : activeCategory)?.color || "#ec4899" : "rgba(18, 18, 20, 0.08)"}
                        strokeWidth={isHot ? 2 : 1}
                        strokeDasharray={isHot ? "none" : "4 4"}
                        opacity={isDim ? 0.25 : 1}
                        className="transition-all duration-300"
                        filter={isHot ? "url(#radarGlow)" : undefined}
                      />
                    );
                  })}

                  {/* Active Highlight Coverage Polygon */}
                  {activeCategory && (() => {
                    const n = getNode(activeCategory.id);
                    const neighbors = connections
                      .filter(([a, b]) => a === activeCategory.id || b === activeCategory.id)
                      .map(([a, b]) => (a === activeCategory.id ? b : a));

                    const pts = [
                      `${n.cx},${n.cy}`,
                      ...neighbors.map((nid) => {
                        const nn = getNode(nid);
                        return `${(n.cx + nn.cx) / 2},${(n.cy + nn.cy) / 2}`;
                      }),
                    ].join(" ");

                    return (
                      <polygon
                        points={pts}
                        fill={activeCategory.color}
                        fillOpacity="0.12"
                        stroke={activeCategory.color}
                        strokeWidth="1.5"
                        className="transition-all duration-500"
                      />
                    );
                  })()}

                  {/* Ring Percentage Markers */}
                  {RINGS.map((f, i) => (
                    <text
                      key={f}
                      x={WEB_CX}
                      y={WEB_CY - WEB_R * f - 4}
                      fontSize="9"
                      fontFamily="'JetBrains Mono', monospace"
                      fill="#a1a1aa"
                      textAnchor="middle"
                    >
                      {[25, 50, 75, 100][i]}%
                    </text>
                  ))}

                  {/* Center Hub */}
                  <circle cx={WEB_CX} cy={WEB_CY} r={4} fill="#121214" opacity="0.3" />

                  {/* Interactive Outer Nodes */}
                  {skillCategories.map((cat) => {
                    const n = getNode(cat.id);
                    const isAct = active === cat.id;
                    const isHov = hoveredNode === cat.id;
                    const lit = isAct || isHov;

                    const dx = n.cx - WEB_CX;
                    const dy = n.cy - WEB_CY;
                    const dist = Math.hypot(dx, dy);
                    const labelX = n.cx + (dx / dist) * 22;
                    const labelY = n.cy + (dy / dist) * 22;

                    return (
                      <g
                        key={cat.id}
                        className="cursor-pointer"
                        onClick={() => setActive(cat.id)}
                        onMouseEnter={() => setHoveredNode(cat.id)}
                        onMouseLeave={() => setHoveredNode(null)}
                      >
                        {/* Outer Glow Pulse when Active */}
                        {lit && (
                          <circle
                            cx={n.cx}
                            cy={n.cy}
                            r={32}
                            fill="none"
                            stroke={cat.color}
                            strokeWidth="1.5"
                            opacity="0.3"
                            filter="url(#radarGlow)"
                            className="animate-ping"
                            style={{ animationDuration: "2.5s" }}
                          />
                        )}

                        {/* Node Halo Circle */}
                        <circle
                          cx={n.cx}
                          cy={n.cy}
                          r={lit ? 24 : 18}
                          fill="white"
                          stroke={cat.color}
                          strokeWidth={lit ? 2.5 : 1.5}
                          className="transition-all duration-300"
                          filter={lit ? "url(#radarGlow)" : undefined}
                        />

                        {/* Node Icon Emoji */}
                        <text
                          x={n.cx}
                          y={n.cy + 1}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          fontSize={lit ? "14" : "12"}
                          style={{ pointerEvents: "none", userSelect: "none" }}
                        >
                          {cat.icon}
                        </text>

                        {/* Node Outer Text Label */}
                        <text
                          x={labelX}
                          y={labelY + (n.cy > WEB_CY + 20 ? 14 : n.cy < WEB_CY - 20 ? -14 : 0)}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          fontSize="11.5"
                          fontFamily="'Outfit', sans-serif"
                          fontWeight={lit ? "700" : "500"}
                          fill={lit ? cat.color : "#52525b"}
                          className="transition-colors duration-200"
                          style={{ pointerEvents: "none", userSelect: "none" }}
                        >
                          {cat.label}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>

              {/* Active Category Detail Pill Box */}
              {activeCategory && (
                <div className="mt-5 pt-4 border-t border-[#121214]/8 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-base">{activeCategory.icon}</span>
                    <span className="font-semibold text-sm text-[#121214]">
                      {activeCategory.label} Core
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 justify-end">
                    {activeCategory.skills.slice(0, 3).map((sk) => (
                      <span
                        key={sk.name}
                        className="font-mono text-[10px] px-2 py-0.5 rounded-md bg-[#121214]/5 text-[#3f3f46]"
                      >
                        {sk.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}