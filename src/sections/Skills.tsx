"use client";

import { useEffect, useRef, useState } from "react";

/* ------------------------------------------------------------------
   Neumorphic skills section
   - Same rose surface as the hero: every element is pushed out or pressed in.
   - Category cards on one side, an interactive radar on the other.
   - The radar plots each category's average level; tap a node or a card
     to light up its links.
------------------------------------------------------------------- */

type Skill = { name: string; level: number };
type Category = { id: string; label: string; color: string; skills: Skill[] };

const skillCategories: Category[] = [
  {
    id: "frontend",
    label: "Frontend",
    color: "#d6286f",
    skills: [
      { name: "React 19", level: 95 },
      { name: "Next.js 15", level: 92 },
      { name: "TypeScript", level: 88 },
      { name: "Tailwind CSS", level: 96 },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    color: "#7c3aed",
    skills: [
      { name: "Node.js", level: 85 },
      { name: "REST / tRPC", level: 88 },
      { name: "PostgreSQL", level: 80 },
      { name: "Prisma / ORM", level: 82 },
    ],
  },
  {
    id: "ai",
    label: "AI / ML",
    color: "#0891b2",
    skills: [
      { name: "Python", level: 84 },
      { name: "LangChain / AI", level: 78 },
      { name: "PyTorch", level: 72 },
      { name: "OpenAI / Anthropic APIs", level: 90 },
    ],
  },
  {
    id: "design",
    label: "UI/UX",
    color: "#d97706",
    skills: [
      { name: "Figma", level: 90 },
      { name: "Design Systems", level: 86 },
      { name: "Wireframing", level: 84 },
      { name: "Accessibility", level: 88 },
    ],
  },
  {
    id: "tools",
    label: "DevOps & Tools",
    color: "#059669",
    skills: [
      { name: "Git / GitHub", level: 92 },
      { name: "VS Code", level: 98 },
      { name: "Docker", level: 70 },
      { name: "Vercel / Cloud", level: 88 },
    ],
  },
  {
    id: "motion",
    label: "Creative Motion",
    color: "#2563eb",
    skills: [
      { name: "Framer Motion", level: 88 },
      { name: "Three.js / 3D", level: 74 },
      { name: "CSS Keyframes", level: 94 },
      { name: "Micro-Interactions", level: 90 },
    ],
  },
];

/* ---------- radar geometry ---------- */
const CX = 240;
const CY = 220;
const R = 140;
const NODE_R = 21;
const RINGS = [0.25, 0.5, 0.75, 1];
const N = skillCategories.length;

const nodes = skillCategories.map((cat, i) => {
  const angle = (2 * Math.PI * i) / N - Math.PI / 2;
  const ux = Math.cos(angle);
  const uy = Math.sin(angle);
  return {
    id: cat.id,
    angle,
    ux,
    uy,
    cx: +(CX + R * ux).toFixed(1),
    cy: +(CY + R * uy).toFixed(1),
  };
});

const connections: [string, string][] = [];
for (let i = 0; i < N; i++) {
  for (let j = i + 1; j < N; j++) {
    connections.push([skillCategories[i].id, skillCategories[j].id]);
  }
}

const getNode = (id: string) => nodes.find((n) => n.id === id)!;
const getCategory = (id: string | null) =>
  id ? skillCategories.find((c) => c.id === id) : undefined;
const average = (c: Category) =>
  Math.round(c.skills.reduce((sum, s) => sum + s.level, 0) / c.skills.length);
const pointAt = (angle: number, fraction: number) =>
  `${(CX + R * fraction * Math.cos(angle)).toFixed(1)},${(
    CY +
    R * fraction * Math.sin(angle)
  ).toFixed(1)}`;

const prefersReduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- small line icons, one per category ---------- */
function CatIcon({
  id,
  size = 20,
  color = "currentColor",
  x,
  y,
}: {
  id: string;
  size?: number;
  color?: string;
  x?: number;
  y?: number;
}) {
  let body: React.ReactNode;
  switch (id) {
    case "frontend": // monitor
      body = (
        <>
          <rect x="3" y="4" width="18" height="12" rx="2" />
          <path d="M8 20h8M12 16v4" />
        </>
      );
      break;
    case "backend": // database
      body = (
        <>
          <ellipse cx="12" cy="5.5" rx="8" ry="3" />
          <path d="M4 5.5v13c0 1.7 3.6 3 8 3s8-1.3 8-3v-13" />
          <path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" />
        </>
      );
      break;
    case "ai": // flask
      body = (
        <>
          <path d="M9 3h6" />
          <path d="M10 3v6l-5.5 9.5A1.5 1.5 0 0 0 5.8 21h12.4a1.5 1.5 0 0 0 1.3-2.5L14 9V3" />
          <path d="M7.5 15h9" />
        </>
      );
      break;
    case "design": // pen tool
      body = (
        <>
          <path d="M12 19l7-7-4-4-7 7-1 5 5-1z" />
          <path d="M15 8l1-4 4 4-4 1" />
          <circle cx="9.5" cy="14.5" r="1" />
        </>
      );
      break;
    case "tools": // terminal
      body = (
        <>
          <rect x="3" y="4" width="18" height="16" rx="3" />
          <path d="M7 10l3 2-3 2" />
          <path d="M13 15h4" />
        </>
      );
      break;
    default: // motion: play
      body = (
        <>
          <circle cx="12" cy="12" r="9" />
          <path d="M10 8.5l5.5 3.5-5.5 3.5z" />
        </>
      );
  }
  return (
    <svg
      x={x}
      y={y}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      style={{ pointerEvents: "none" }}
    >
      {body}
    </svg>
  );
}

/* ============================================================
   Skills
============================================================ */
export default function Skills() {
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState<string>("frontend");
  const [hovered, setHovered] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  /* bars and the radar shape animate in once the section is on screen */
  useEffect(() => {
    if (prefersReduced()) {
      setVisible(true);
      return;
    }
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const activeCategory = getCategory(active)!;
  const focusId = hovered ?? active;
  const focusCategory = getCategory(focusId);

  const mouseEnter = (id: string) => (e: React.PointerEvent) => {
    if (e.pointerType === "mouse") setHovered(id);
  };
  const keyPick = (id: string) => (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setActive(id);
    }
  };

  const shape = skillCategories
    .map((c, i) => pointAt(nodes[i].angle, average(c) / 100))
    .join(" ");

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="skills-nm relative overflow-hidden px-4 py-20 font-['Outfit',sans-serif] text-[#4a2a3d] sm:px-8 md:px-14 md:py-28"
    >
      <style>{`
        .skills-nm {
          --bg: #f8e5ee;
          --hi: #fffafd;
          --lo: #e0b9cc;
          background: var(--bg);
        }
        .nm-raised {
          background: var(--bg);
          box-shadow: 9px 9px 20px var(--lo), -9px -9px 20px var(--hi);
        }
        .nm-raised-sm {
          background: var(--bg);
          box-shadow: 6px 6px 13px var(--lo), -6px -6px 13px var(--hi);
        }
        .nm-inset {
          background: var(--bg);
          box-shadow: inset 6px 6px 12px var(--lo), inset -6px -6px 12px var(--hi);
        }
        .sk-card {
          transition: box-shadow .25s ease, transform .25s ease;
        }
        .sk-card:hover { transform: translateY(-2px); }
        .sk-track {
          background: var(--bg);
          box-shadow: inset 2px 2px 4px var(--lo), inset -2px -2px 4px var(--hi);
        }
        .sk-fill {
          transition: width 1s cubic-bezier(.2,.8,.2,1);
        }
        .sk-node { cursor: pointer; outline: none; }
        .sk-node:focus-visible .sk-node-body {
          stroke: #e83e8c;
          stroke-width: 2.5;
        }
        .sk-pulse {
          transform-box: fill-box;
          transform-origin: center;
          animation: sk-pulse 2.4s ease-out infinite;
        }
        @keyframes sk-pulse {
          from { transform: scale(.85); opacity: .55; }
          to { transform: scale(1.6); opacity: 0; }
        }
        @keyframes sk-pop {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .sk-pop { animation: sk-pop .35s ease-out both; }
        @media (prefers-reduced-motion: reduce) {
          .sk-pulse, .sk-pop { animation: none; }
          .sk-fill, .sk-card { transition: none; }
        }
      `}</style>

      {/* Background shapes (kept off the left edge) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-14 top-16 sm:-right-16">
          <div className="nm-inset h-32 w-32 rounded-full sm:h-44 sm:w-44" />
        </div>
        <div className="absolute bottom-10 right-[6%] hidden sm:block">
          <div className="nm-raised-sm h-14 w-14 rotate-12 rounded-2xl" />
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* ================= Header ================= */}
        <div className="mb-12 text-center sm:mb-16 md:text-left">
          <div className="nm-inset mx-auto mb-5 flex w-fit items-center gap-2.5 rounded-full px-4 py-2 md:mx-0">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#e83e8c] opacity-60 motion-reduce:animate-none" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#e83e8c]" />
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#85586f]">
              Skill radar
            </span>
          </div>

          <h2 className="mb-3 text-3xl font-bold leading-[1.15] tracking-tight sm:text-4xl md:text-5xl">
            A web of skills,{" "}
            <span className="bg-gradient-to-r from-[#d6286f] to-[#ee5a9d] bg-clip-text text-transparent">
              built to connect.
            </span>
          </h2>

          <p className="mx-auto max-w-xl text-sm leading-relaxed text-[#85586f] sm:text-base md:mx-0">
            Tap a node on the radar or pick a card to explore each area. The pink
            shape on the radar shows my average level in every category.
          </p>
        </div>

        {/* ================= Layout ================= */}
        <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-12">
          {/* ---------- Radar (first on phones, right on large screens) ---------- */}
          <div className="order-1 lg:order-2 lg:col-span-5 lg:sticky lg:top-24">
            <div className="nm-raised rounded-[2rem] p-5 sm:p-7">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#e83e8c]" />
                  <span className="font-mono text-xs font-semibold">skill radar</span>
                </div>
                <span className="text-[11px] text-[#85586f]">tap a node</span>
              </div>

              <div className="nm-inset rounded-3xl px-2 py-4 sm:px-4">
                <svg
                  viewBox="0 0 480 440"
                  className="mx-auto h-auto w-full max-w-[460px] select-none overflow-visible"
                  aria-label="Skill radar chart"
                >
                  <defs>
                    {/* raised look for nodes */}
                    <filter id="nmUp" x="-60%" y="-60%" width="220%" height="220%">
                      <feGaussianBlur in="SourceAlpha" stdDeviation="4" result="b" />
                      <feOffset in="b" dx="4" dy="4" result="o1" />
                      <feFlood floodColor="#e0b9cc" result="c1" />
                      <feComposite in="c1" in2="o1" operator="in" result="d1" />
                      <feOffset in="b" dx="-4" dy="-4" result="o2" />
                      <feFlood floodColor="#fffafd" result="c2" />
                      <feComposite in="c2" in2="o2" operator="in" result="d2" />
                      <feMerge>
                        <feMergeNode in="d1" />
                        <feMergeNode in="d2" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                    {skillCategories.map((c) => (
                      <linearGradient key={c.id} id={`skg-${c.id}`} x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0" stopColor={c.color} stopOpacity="0.78" />
                        <stop offset="1" stopColor={c.color} />
                      </linearGradient>
                    ))}
                  </defs>

                  {/* rings */}
                  {RINGS.map((f, i) => (
                    <polygon
                      key={f}
                      points={nodes.map((n) => pointAt(n.angle, f)).join(" ")}
                      fill="none"
                      stroke="#d9aec4"
                      strokeOpacity={i === 3 ? 0.9 : 0.6}
                      strokeWidth="1"
                      strokeDasharray={i === 3 ? undefined : "4 5"}
                    />
                  ))}

                  {/* spokes */}
                  {nodes.map((n) => (
                    <line
                      key={n.id}
                      x1={CX}
                      y1={CY}
                      x2={n.cx}
                      y2={n.cy}
                      stroke="#d9aec4"
                      strokeOpacity="0.7"
                      strokeWidth="1"
                    />
                  ))}

                  {/* links between categories; the focused node's links light up */}
                  {connections.map(([a, b]) => {
                    const na = getNode(a);
                    const nb = getNode(b);
                    const hot = focusId === a || focusId === b;
                    return (
                      <line
                        key={`${a}-${b}`}
                        x1={na.cx}
                        y1={na.cy}
                        x2={nb.cx}
                        y2={nb.cy}
                        stroke={hot ? focusCategory?.color ?? "#e83e8c" : "#d9aec4"}
                        strokeOpacity={hot ? 0.9 : 0.55}
                        strokeWidth={hot ? 2 : 1}
                        strokeLinecap="round"
                        strokeDasharray={hot ? undefined : "3 5"}
                        style={{ transition: "stroke .3s ease, stroke-opacity .3s ease" }}
                      />
                    );
                  })}

                  {/* average-level shape */}
                  <g
                    style={{
                      opacity: visible ? 1 : 0,
                      transition: "opacity .8s ease .4s",
                    }}
                  >
                    <polygon
                      points={shape}
                      fill="#e83e8c"
                      fillOpacity="0.14"
                      stroke="#e83e8c"
                      strokeWidth="1.8"
                      strokeLinejoin="round"
                    />
                    {skillCategories.map((c, i) => {
                      const [px, py] = pointAt(nodes[i].angle, average(c) / 100).split(",");
                      return (
                        <circle
                          key={c.id}
                          cx={px}
                          cy={py}
                          r={focusId === c.id ? 5 : 3.5}
                          fill={c.color}
                          stroke="#fffafd"
                          strokeWidth="1.5"
                          style={{ transition: "r .25s ease" }}
                        />
                      );
                    })}
                  </g>

                  {/* ring percentages */}
                  {RINGS.slice(0, 3).map((f) => (
                    <text
                      key={f}
                      x={CX + 5}
                      y={CY - R * f - 3}
                      fontSize="9"
                      fontFamily="'JetBrains Mono', monospace"
                      fill="#b99aab"
                    >
                      {f * 100}%
                    </text>
                  ))}

                  {/* centre hub */}
                  <circle cx={CX} cy={CY} r={9} fill="#f8e5ee" filter="url(#nmUp)" />
                  <circle cx={CX} cy={CY} r={3} fill="#e83e8c" />

                  {/* nodes */}
                  {skillCategories.map((c) => {
                    const n = getNode(c.id);
                    const isActive = active === c.id;
                    const isHover = hovered === c.id;
                    const lit = isActive || isHover;
                    const lx = n.cx + n.ux * (NODE_R + 10);
                    const ly = n.cy + n.uy * (NODE_R + 10);
                    const anchor = n.ux > 0.3 ? "start" : n.ux < -0.3 ? "end" : "middle";
                    const dy = Math.abs(n.ux) <= 0.3 ? (n.uy < 0 ? -4 : 12) : 4;
                    return (
                      <g
                        key={c.id}
                        className="sk-node"
                        role="button"
                        tabIndex={0}
                        aria-pressed={isActive}
                        aria-label={`${c.label}, average ${average(c)} percent`}
                        onClick={() => setActive(c.id)}
                        onKeyDown={keyPick(c.id)}
                        onPointerEnter={mouseEnter(c.id)}
                        onPointerLeave={() => setHovered(null)}
                      >
                        {isActive && (
                          <circle
                            cx={n.cx}
                            cy={n.cy}
                            r={NODE_R + 4}
                            fill="none"
                            stroke={c.color}
                            strokeWidth="1.5"
                            className="sk-pulse"
                          />
                        )}
                        <circle
                          className="sk-node-body"
                          cx={n.cx}
                          cy={n.cy}
                          r={lit ? NODE_R + 2 : NODE_R}
                          fill={isActive ? `url(#skg-${c.id})` : "#f8e5ee"}
                          stroke={isHover && !isActive ? c.color : "none"}
                          strokeWidth="1.5"
                          filter="url(#nmUp)"
                          style={{ transition: "r .25s ease" }}
                        />
                        <CatIcon
                          id={c.id}
                          size={lit ? 20 : 18}
                          color={isActive ? "#ffffff" : c.color}
                          x={n.cx - (lit ? 10 : 9)}
                          y={n.cy - (lit ? 10 : 9)}
                        />
                        <text
                          x={lx}
                          y={ly + dy}
                          textAnchor={anchor}
                          fontSize="12.5"
                          fontFamily="'Outfit', sans-serif"
                          fontWeight={lit ? 700 : 500}
                          fill={lit ? c.color : "#85586f"}
                          style={{ pointerEvents: "none", userSelect: "none" }}
                        >
                          {c.label}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>

              {/* selected category detail */}
              <div aria-live="polite" className="mt-5">
                <div key={activeCategory.id} className="sk-pop">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <span
                        className="nm-inset flex h-9 w-9 items-center justify-center rounded-full"
                        style={{ color: activeCategory.color }}
                      >
                        <CatIcon id={activeCategory.id} size={18} />
                      </span>
                      <span className="text-sm font-bold">{activeCategory.label}</span>
                    </div>
                    <span
                      className="font-mono text-xs font-semibold"
                      style={{ color: activeCategory.color }}
                    >
                      {average(activeCategory)}% avg
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {activeCategory.skills.map((s) => (
                      <span
                        key={s.name}
                        className="nm-raised-sm rounded-xl px-3 py-1.5 font-mono text-[11px] text-[#4a2a3d]"
                      >
                        {s.name}
                        <span className="ml-1.5 text-[#b8226a]">{s.level}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ---------- Category cards ---------- */}
          <div className="order-2 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:order-1 lg:col-span-7">
            {skillCategories.map((c, ci) => {
              const selected = active === c.id;
              return (
                <div
                  key={c.id}
                  role="button"
                  tabIndex={0}
                  aria-pressed={selected}
                  onClick={() => setActive(c.id)}
                  onKeyDown={keyPick(c.id)}
                  onPointerEnter={mouseEnter(c.id)}
                  onPointerLeave={() => setHovered(null)}
                  className={`sk-card cursor-pointer rounded-3xl p-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e83e8c] sm:p-6 ${
                    selected ? "nm-inset" : "nm-raised-sm"
                  }`}
                >
                  <div className="mb-5 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span
                        className={`flex h-10 w-10 items-center justify-center rounded-full ${
                          selected ? "" : "nm-inset"
                        }`}
                        style={
                          selected
                            ? {
                                background: `linear-gradient(135deg, ${c.color}c7, ${c.color})`,
                                color: "#fff",
                                boxShadow: `4px 4px 10px ${c.color}55, -3px -3px 8px #fffafd`,
                              }
                            : { color: c.color }
                        }
                      >
                        <CatIcon id={c.id} size={19} />
                      </span>
                      <h3 className="text-sm font-bold sm:text-base">{c.label}</h3>
                    </div>
                    <span
                      className="font-mono text-xs font-semibold"
                      style={{ color: selected ? c.color : "#85586f" }}
                    >
                      {average(c)}%
                    </span>
                  </div>

                  <div className="space-y-3.5">
                    {c.skills.map((s, si) => (
                      <div key={s.name}>
                        <div className="mb-1.5 flex items-center justify-between font-mono text-[11px] sm:text-xs">
                          <span className="text-[#4a2a3d]">{s.name}</span>
                          <span className="text-[#85586f]">{s.level}%</span>
                        </div>
                        <div className="sk-track h-2.5 w-full overflow-hidden rounded-full p-[2px]">
                          <div
                            className="sk-fill h-full rounded-full"
                            style={{
                              width: visible ? `${s.level}%` : "0%",
                              transitionDelay: `${300 + ci * 100 + si * 60}ms`,
                              background: `linear-gradient(90deg, ${c.color}aa, ${c.color})`,
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
        </div>
      </div>
    </section>
  );
}