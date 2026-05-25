"use client";

import { useEffect, useRef, useState } from "react";

const skillCategories = [
  {
    id: "frontend",
    label: "Frontend",
    icon: "◈",
    color: "#c0445c",
    bg: "rgba(192,68,92,0.08)",
    border: "rgba(192,68,92,0.25)",
    skills: [
      { name: "React",        level: 90 },
      { name: "Next.js",      level: 88 },
      { name: "TypeScript",   level: 82 },
      { name: "Tailwind CSS", level: 92 },
    ],
  },
  {
    id: "design",
    label: "Design",
    icon: "✦",
    color: "#b05070",
    bg: "rgba(176,80,112,0.08)",
    border: "rgba(176,80,112,0.25)",
    skills: [
      { name: "Figma",         level: 85 },
      { name: "Canva",         level: 90 },
      { name: "UI/UX Design",  level: 78 },
      { name: "CSS Animation", level: 82 },
    ],
  },
  {
    id: "ai",
    label: "AI / ML",
    icon: "⬡",
    color: "#8a3055",
    bg: "rgba(138,48,85,0.08)",
    border: "rgba(138,48,85,0.25)",
    skills: [
      { name: "Python",      level: 80 },
      { name: "PyTorch",     level: 70 },
      { name: "TensorFlow",  level: 68 },
      { name: "Data Analyst",level: 75 },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    icon: "⟡",
    color: "#8a4060",
    bg: "rgba(138,64,96,0.08)",
    border: "rgba(138,64,96,0.25)",
    skills: [
      { name: "Node.js",    level: 72 },
      { name: "REST APIs",  level: 78 },
      { name: "MongoDB",    level: 65 },
      { name: "PostgreSQL", level: 60 },
    ],
  },
  {
    id: "tools",
    label: "Tools",
    icon: "◎",
    color: "#a06070",
    bg: "rgba(160,96,112,0.08)",
    border: "rgba(160,96,112,0.25)",
    skills: [
      { name: "Git / GitHub", level: 88 },
      { name: "VS Code",      level: 95 },
      { name: "Vercel",       level: 82 },
      { name: "Docker",       level: 55 },
    ],
  },
  {
    id: "motion",
    label: "Motion",
    icon: "◉",
    color: "#c0607a",
    bg: "rgba(192,96,122,0.08)",
    border: "rgba(192,96,122,0.25)",
    skills: [
      { name: "Framer Motion", level: 78 },
      { name: "GSAP",          level: 65 },
      { name: "Lottie",        level: 60 },
      { name: "CSS Keyframes", level: 88 },
    ],
  },
];

// Spider web: 6 nodes evenly on a circle, center = 220,220, r=155
const WEB_CX = 220;
const WEB_CY = 215;
const WEB_R  = 148;

const nodes = skillCategories.map((cat, i) => {
  const angle = (2 * Math.PI * i) / skillCategories.length - Math.PI / 2;
  return {
    id:  cat.id,
    cx:  Math.round(WEB_CX + WEB_R * Math.cos(angle)),
    cy:  Math.round(WEB_CY + WEB_R * Math.sin(angle)),
    angle,
  };
});

// All pairs
const connections: [string, string][] = [];
for (let i = 0; i < skillCategories.length; i++) {
  for (let j = i + 1; j < skillCategories.length; j++) {
    connections.push([skillCategories[i].id, skillCategories[j].id]);
  }
}

function getNode(id: string) { return nodes.find((n) => n.id === id)!; }

// Spider ring levels
const RINGS = [0.25, 0.5, 0.75, 1.0];

export default function Skills() {
  const [visible,  setVisible]  = useState(false);
  const [active,   setActive]   = useState<string | null>(null);
  const [animated, setAnimated] = useState<Set<string>>(new Set());
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.12 }
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
        }, 400 + ci * 120 + si * 70);
      });
    });
  }, [visible]);

  const activeCategory = skillCategories.find((c) => c.id === active);

  // Build spider polygon for a category's skill levels
  function spiderPolygon(cat: typeof skillCategories[0]) {
    const pts = cat.skills.map((sk, si) => {
      const angle = (2 * Math.PI * si) / cat.skills.length - Math.PI / 2;
      const r = (sk.level / 100) * 60;
      return `${80 + r * Math.cos(angle)},${80 + r * Math.sin(angle)}`;
    });
    return pts.join(" ");
  }

  // Ring polygon for spider chart axes
  function ringPolygon(fraction: number) {
    return nodes.map((n) => {
      const dx = n.cx - WEB_CX;
      const dy = n.cy - WEB_CY;
      return `${WEB_CX + dx * fraction},${WEB_CY + dy * fraction}`;
    }).join(" ");
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=DM+Sans:wght@300;400;500&display=swap');

        .skills-section {
          position: relative;
          padding: 120px 24px 100px;
          overflow: hidden;
          background: linear-gradient(160deg, #fff5f7 0%, #fdf6f0 45%, #fff0f4 100%);
        }

        .skills-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(70px);
          pointer-events: none;
        }

        .skills-inner {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 10;
        }

        /* ── Header ── */
        .skills-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #c0445c;
          margin-bottom: 14px;
          opacity: 0;
          transform: translateY(10px);
          transition: opacity 0.6s 0.1s both, transform 0.6s 0.1s both;
        }
        .skills-eyebrow.vis { opacity: 1; transform: translateY(0); }
        .eyebrow-line { width: 28px; height: 1px; background: #c0445c; }

        .skills-heading {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(36px, 5vw, 60px);
          font-weight: 600;
          color: #2e1420;
          letter-spacing: -0.02em;
          line-height: 1.08;
          margin-bottom: 10px;
          opacity: 0;
          transform: translateY(14px);
          transition: opacity 0.7s 0.2s both, transform 0.7s 0.2s both;
        }
        .skills-heading.vis { opacity: 1; transform: translateY(0); }
        .skills-heading em { font-style: italic; color: #c0445c; }

        .skills-sub {
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          font-weight: 300;
          color: #9a6070;
          margin-bottom: 64px;
          opacity: 0;
          transition: opacity 0.6s 0.35s both;
        }
        .skills-sub.vis { opacity: 1; }

        /* ── Layout ── */
        .skills-layout {
          display: grid;
          grid-template-columns: 1fr 480px;
          gap: 52px;
          align-items: start;
        }

        /* ── Cards ── */
        .skills-cards {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 18px;
        }

        .skill-card {
          background: rgba(255,250,252,0.72);
          backdrop-filter: blur(12px);
          border-radius: 20px;
          padding: 24px 20px;
          border: 1px solid rgba(244,184,200,0.2);
          box-shadow: 0 4px 24px rgba(192,68,92,0.05);
          opacity: 0;
          transform: translateY(20px);
          transition:
            opacity 0.6s both,
            transform 0.6s both,
            box-shadow 0.25s ease,
            border-color 0.25s ease,
            background 0.25s ease;
          cursor: pointer;
        }
        .skill-card.vis   { opacity: 1; transform: translateY(0); }
        .skill-card:hover { box-shadow: 0 8px 32px rgba(192,68,92,0.11); border-color: rgba(192,68,92,0.22); }
        .skill-card.act   {
          box-shadow: 0 8px 36px rgba(192,68,92,0.15);
          background: rgba(255,250,252,0.95);
        }

        .card-header {
          display: flex;
          align-items: center;
          gap: 9px;
          margin-bottom: 18px;
        }
        .card-icon  { font-size: 18px; line-height: 1; }
        .card-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 19px;
          font-weight: 600;
          color: #2e1420;
        }

        .skill-bar-row   { margin-bottom: 11px; }
        .skill-bar-top   { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 4px; }
        .skill-name      { font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 400; color: #7a4858; }
        .skill-pct       { font-family: 'DM Sans', sans-serif; font-size: 10.5px; font-weight: 300; color: #b07080; }
        .bar-track       { height: 3.5px; background: rgba(192,68,92,0.1); border-radius: 99px; overflow: hidden; }
        .bar-fill        { height: 100%; border-radius: 99px; width: 0%; transition: width 0.9s cubic-bezier(0.4,0,0.2,1); }

        /* ── Spider web panel ── */
        .web-panel {
          position: sticky;
          top: 96px;
          opacity: 0;
          transform: translateX(24px);
          transition: opacity 0.8s 0.45s both, transform 0.8s 0.45s both;
        }
        .web-panel.vis { opacity: 1; transform: translateX(0); }

        .web-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #c0748a;
          margin-bottom: 14px;
          font-weight: 400;
        }

        .web-svg-wrap {
          background: rgba(255,250,252,0.62);
          backdrop-filter: blur(18px);
          border: 1px solid rgba(244,184,200,0.22);
          border-radius: 24px;
          padding: 20px 16px;
          box-shadow: 0 8px 44px rgba(192,68,92,0.07);
        }

        /* Spider ring */
        .spider-ring {
          fill: none;
          stroke: rgba(192,68,92,0.12);
          stroke-width: 1;
          stroke-dasharray: 4 3;
          transition: stroke 0.25s;
        }
        .spider-axis {
          stroke: rgba(192,68,92,0.14);
          stroke-width: 1;
        }

        /* Web connections */
        .web-conn {
          stroke: rgba(192,68,92,0.12);
          stroke-width: 1;
          stroke-dasharray: 5 4;
          transition: stroke 0.25s, stroke-width 0.25s, stroke-dasharray 0.25s;
        }
        .web-conn.hot {
          stroke: rgba(192,68,92,0.5);
          stroke-width: 1.8;
          stroke-dasharray: none;
        }
        .web-conn.dim {
          stroke: rgba(192,68,92,0.05);
          stroke-dasharray: 5 4;
        }

        /* Nodes */
        .web-node { cursor: pointer; }
        .web-node:hover { filter: drop-shadow(0 0 7px rgba(192,68,92,0.3)); }

        /* Detail panel */
        .active-detail {
          margin-top: 18px;
          background: rgba(255,250,252,0.78);
          border: 1px solid rgba(192,68,92,0.16);
          border-radius: 16px;
          padding: 18px 20px;
          animation: slideUp 0.3s ease both;
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .detail-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 18px;
          font-weight: 600;
          color: #2e1420;
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .detail-pills { display: flex; flex-wrap: wrap; gap: 7px; }
        .detail-pill {
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          color: #b03555;
          background: rgba(192,68,92,0.08);
          border: 1px solid rgba(192,68,92,0.16);
          padding: 4px 13px;
          border-radius: 999px;
        }

        /* Mini spider chart inside detail */
        .mini-spider-wrap {
          margin-bottom: 14px;
        }

        /* Responsive */
        @media (max-width: 960px) {
          .skills-layout { grid-template-columns: 1fr; }
          .web-panel { position: static; order: -1; }
        }
        @media (max-width: 540px) {
          .skills-cards   { grid-template-columns: 1fr; }
          .skills-section { padding: 80px 18px 80px; }
          .skills-layout  { gap: 32px; }
        }
      `}</style>

      <section id="skills" className="skills-section" ref={sectionRef}>
        {/* Blobs */}
        <div className="skills-blob" style={{
          width: 440, height: 440, top: "-8%", right: "-4%",
          background: "radial-gradient(circle, rgba(244,184,200,0.22) 0%, transparent 70%)",
        }} />
        <div className="skills-blob" style={{
          width: 320, height: 320, bottom: "5%", left: "-4%",
          background: "radial-gradient(circle, rgba(255,220,200,0.18) 0%, transparent 70%)",
        }} />
        <div className="skills-blob" style={{
          width: 200, height: 200, top: "45%", left: "35%",
          background: "radial-gradient(circle, rgba(255,192,210,0.14) 0%, transparent 70%)",
        }} />

        <div className="skills-inner">
          {/* Header */}
          <div className={`skills-eyebrow ${visible ? "vis" : ""}`}>
            <span className="eyebrow-line" /> Expertise
          </div>
          <h2 className={`skills-heading ${visible ? "vis" : ""}`}>
            My <em>spider</em> web of skills
          </h2>
          <p className={`skills-sub ${visible ? "vis" : ""}`}>
            Click any node or card to explore — connections light up across the web
          </p>

          <div className="skills-layout">
            {/* ── Left: cards ── */}
            <div className="skills-cards">
              {skillCategories.map((cat, ci) => (
                <div
                  key={cat.id}
                  className={`skill-card ${visible ? "vis" : ""} ${active === cat.id ? "act" : ""}`}
                  style={{
                    transitionDelay: `${0.28 + ci * 0.1}s`,
                    borderColor: active === cat.id ? cat.border : undefined,
                  }}
                  onClick={() => setActive(active === cat.id ? null : cat.id)}
                  onMouseEnter={() => setHoveredNode(cat.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                >
                  <div className="card-header">
                    <span className="card-icon" style={{ color: cat.color }}>{cat.icon}</span>
                    <span className="card-title">{cat.label}</span>
                  </div>
                  {cat.skills.map((sk, si) => (
                    <div key={sk.name} className="skill-bar-row">
                      <div className="skill-bar-top">
                        <span className="skill-name">{sk.name}</span>
                        <span className="skill-pct">{sk.level}%</span>
                      </div>
                      <div className="bar-track">
                        <div
                          className="bar-fill"
                          style={{
                            width: animated.has(`${cat.id}-${si}`) ? `${sk.level}%` : "0%",
                            background: `linear-gradient(90deg, ${cat.color}77, ${cat.color})`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* ── Right: spider web ── */}
            <div className={`web-panel ${visible ? "vis" : ""}`}>
              <p className="web-label">Skill spider web — tap any node</p>

              <div className="web-svg-wrap">
                <svg
                  viewBox="0 0 440 430"
                  width="100%"
                  style={{ display: "block" }}
                  aria-label="Skill spider web diagram"
                >
                  <defs>
                    {skillCategories.map((cat) => (
                      <radialGradient key={cat.id} id={`ng-${cat.id}`} cx="40%" cy="35%" r="60%">
                        <stop offset="0%"   stopColor="#fff5f7" />
                        <stop offset="100%" stopColor={cat.color} stopOpacity="0.25" />
                      </radialGradient>
                    ))}
                    {/* Glow filter */}
                    <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
                      <feGaussianBlur stdDeviation="3" result="blur" />
                      <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                    </filter>
                  </defs>

                  {/* ── Spider rings ── */}
                  {RINGS.map((f) => (
                    <polygon
                      key={f}
                      className="spider-ring"
                      points={ringPolygon(f)}
                    />
                  ))}

                  {/* ── Axis lines (center → each node) ── */}
                  {nodes.map((n) => (
                    <line
                      key={n.id}
                      className="spider-axis"
                      x1={WEB_CX} y1={WEB_CY}
                      x2={n.cx}   y2={n.cy}
                    />
                  ))}

                  {/* ── Web connections ── */}
                  {connections.map(([a, b]) => {
                    const na = getNode(a);
                    const nb = getNode(b);
                    const highlight = hoveredNode || active;
                    const isHot = highlight && (highlight === a || highlight === b);
                    const isDim = highlight && !isHot;
                    return (
                      <line
                        key={`${a}-${b}`}
                        className={`web-conn ${isHot ? "hot" : ""} ${isDim ? "dim" : ""}`}
                        x1={na.cx} y1={na.cy}
                        x2={nb.cx} y2={nb.cy}
                      />
                    );
                  })}

                  {/* ── Active fill polygon ── */}
                  {activeCategory && (() => {
                    const n = getNode(activeCategory.id);
                    const angle = n.angle;
                    const neighbors = connections
                      .filter(([a, b]) => a === activeCategory.id || b === activeCategory.id)
                      .map(([a, b]) => (a === activeCategory.id ? b : a));
                    const pts = [
                      `${n.cx},${n.cy}`,
                      ...neighbors.map((nid) => {
                        const nn = getNode(nid);
                        // midpoint between active node and neighbor
                        return `${(n.cx + nn.cx) / 2},${(n.cy + nn.cy) / 2}`;
                      }),
                    ].join(" ");
                    return (
                      <polygon
                        points={pts}
                        fill={activeCategory.color}
                        fillOpacity="0.07"
                        stroke={activeCategory.color}
                        strokeOpacity="0.2"
                        strokeWidth="1"
                      />
                    );
                  })()}

                  {/* ── Ring level labels ── */}
                  {RINGS.map((f, i) => (
                    <text
                      key={f}
                      x={WEB_CX + 4}
                      y={WEB_CY - WEB_R * f - 4}
                      fontSize="9"
                      fontFamily="'DM Sans', sans-serif"
                      fill="rgba(160,96,112,0.45)"
                      textAnchor="middle"
                    >
                      {[25, 50, 75, 100][i]}%
                    </text>
                  ))}

                  {/* ── Center dot ── */}
                  <circle cx={WEB_CX} cy={WEB_CY} r={3} fill="rgba(192,68,92,0.3)" />

                  {/* ── Nodes ── */}
                  {skillCategories.map((cat) => {
                    const n     = getNode(cat.id);
                    const isAct = active === cat.id;
                    const isHov = hoveredNode === cat.id;
                    const lit   = isAct || isHov;

                    // Label offset: push label away from center
                    const dx = n.cx - WEB_CX;
                    const dy = n.cy - WEB_CY;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    const labelX = n.cx + (dx / dist) * 22;
                    const labelY = n.cy + (dy / dist) * 22;

                    return (
                      <g
                        key={cat.id}
                        className="web-node"
                        onClick={() => setActive(active === cat.id ? null : cat.id)}
                        onMouseEnter={() => setHoveredNode(cat.id)}
                        onMouseLeave={() => setHoveredNode(null)}
                        filter={lit ? "url(#glow)" : undefined}
                        role="button"
                        aria-label={cat.label}
                      >
                        {/* Outer halo */}
                        <circle
                          cx={n.cx} cy={n.cy}
                          r={lit ? 34 : 26}
                          fill="none"
                          stroke={cat.color}
                          strokeWidth={lit ? 1.5 : 0.8}
                          opacity={lit ? 0.3 : 0.12}
                          style={{ transition: "r 0.35s ease, opacity 0.3s" }}
                        />
                        {/* Mid ring (active only) */}
                        {isAct && (
                          <circle
                            cx={n.cx} cy={n.cy} r={26}
                            fill="none"
                            stroke={cat.color}
                            strokeWidth={1}
                            opacity={0.2}
                          />
                        )}
                        {/* Node body */}
                        <circle
                          cx={n.cx} cy={n.cy}
                          r={lit ? 20 : 16}
                          fill={`url(#ng-${cat.id})`}
                          stroke={cat.color}
                          strokeWidth={lit ? 1.5 : 1}
                          opacity={lit ? 1 : 0.7}
                          style={{ transition: "r 0.3s ease, opacity 0.3s" }}
                        />
                        {/* Icon */}
                        <text
                          x={n.cx} y={n.cy + 1}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          fontSize="13"
                          fill={cat.color}
                          style={{ userSelect: "none", pointerEvents: "none" }}
                        >
                          {cat.icon}
                        </text>
                        {/* Label — pushed outward */}
                        <text
                          x={labelX}
                          y={labelY + (n.cy > WEB_CY + 20 ? 18 : n.cy < WEB_CY - 20 ? -18 : 0)}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          fontSize="11"
                          fontFamily="'DM Sans', sans-serif"
                          fontWeight={lit ? "500" : "400"}
                          fill={lit ? cat.color : "#9a6070"}
                          style={{ transition: "fill 0.2s", userSelect: "none", pointerEvents: "none" }}
                        >
                          {cat.label}
                        </text>
                      </g>
                    );
                  })}

                  {/* Center hint */}
                  {!active && !hoveredNode && (
                    <text
                      x={WEB_CX} y={WEB_CY + 1}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fontSize="10"
                      fontFamily="'DM Sans', sans-serif"
                      fill="rgba(160,96,112,0.4)"
                      style={{ userSelect: "none", pointerEvents: "none" }}
                    >
                      tap node
                    </text>
                  )}
                </svg>
              </div>

              {/* Detail panel */}
              {activeCategory && (
                <div className="active-detail">
                  <div className="detail-title">
                    <span style={{ color: activeCategory.color }}>{activeCategory.icon}</span>
                    {activeCategory.label}
                  </div>

                  {/* Mini bar chart inside detail */}
                  <div className="mini-spider-wrap">
                    {activeCategory.skills.map((sk, si) => (
                      <div key={sk.name} className="skill-bar-row">
                        <div className="skill-bar-top">
                          <span className="skill-name">{sk.name}</span>
                          <span className="skill-pct">{sk.level}%</span>
                        </div>
                        <div className="bar-track">
                          <div
                            className="bar-fill"
                            style={{
                              width: `${sk.level}%`,
                              background: `linear-gradient(90deg, ${activeCategory.color}77, ${activeCategory.color})`,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="detail-pills">
                    {activeCategory.skills.map((sk) => (
                      <span key={sk.name} className="detail-pill">{sk.name}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}