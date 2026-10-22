"use client";

import { useEffect, useRef, useState } from "react";

/* ------------------------------------------------------------------
   Neumorphic hero: designer, full stack developer, prompt engineer, data analyst
   - Flat rose-white surface; every element is pushed out or pressed in.
   - The 3D wireframe model sits on a neumorphic plate (drag to rotate).
   - Typed headline cycles through the four roles.
   - Four role cards: press one to read what it covers.
------------------------------------------------------------------- */

const ROLES = [
  {
    name: "Graphic Designer",
    note: "Brand, layout and visuals that look intentional and communicate clearly.",
  },
  {
    name: "Full Stack Developer",
    note: "Front end to database: web apps built and shipped end to end.",
  },
  {
    name: "Prompt Engineer",
    note: "Prompts and workflows that make AI tools give reliable, useful results.",
  },
  {
    name: "Data Analyst",
    note: "Cleaning, querying and visualising data so the answer is easy to see.",
  },
];

const CANVAS = 420; // logical canvas size (scaled for sharp screens)
const prefersReduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- small line icons, one per role ---------- */
function RoleIcon({ index }: { index: number }) {
  const common = {
    width: 22,
    height: 22,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  if (index === 0) {
    // pen tool
    return (
      <svg {...common}>
        <path d="M12 19l7-7-4-4-7 7-1 5 5-1z" />
        <path d="M15 8l1-4 4 4-4 1" />
        <circle cx="9.5" cy="14.5" r="1" />
      </svg>
    );
  }
  if (index === 1) {
    // code brackets
    return (
      <svg {...common}>
        <path d="M8 7l-5 5 5 5" />
        <path d="M16 7l5 5-5 5" />
        <path d="M14 5l-4 14" />
      </svg>
    );
  }
  if (index === 2) {
    // terminal prompt
    return (
      <svg {...common}>
        <rect x="3" y="4" width="18" height="16" rx="3" />
        <path d="M7 10l3 2-3 2" />
        <path d="M13 15h4" />
      </svg>
    );
  }
  // bar chart
  return (
    <svg {...common}>
      <path d="M4 20V10" />
      <path d="M10 20V4" />
      <path d="M16 20v-7" />
      <path d="M22 20H2" />
    </svg>
  );
}

/* ============================================================
   Hero
============================================================ */
export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [selected, setSelected] = useState<number | null>(null);
  const [typed, setTyped] = useState(ROLES[0].name);
  const [dragging, setDragging] = useState(false);

  // Refs so the canvas loop reads live values without re-rendering
  const tiltRef = useRef({ x: 0, y: 0 });
  const draggingRef = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const manualRot = useRef({ x: 0.35, y: 0.55 });
  const rotVelocity = useRef({ x: 0, y: 0 });

  /* ---------- cursor parallax: sets CSS variables, no re-render ---------- */
  const onSectionMove = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse" || prefersReduced()) return;
    const r = sectionRef.current?.getBoundingClientRect();
    if (!r) return;
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    tiltRef.current = { x, y };
    sectionRef.current?.style.setProperty("--mx", x.toFixed(3));
    sectionRef.current?.style.setProperty("--my", y.toFixed(3));
  };
  const onSectionLeave = () => {
    tiltRef.current = { x: 0, y: 0 };
    sectionRef.current?.style.setProperty("--mx", "0");
    sectionRef.current?.style.setProperty("--my", "0");
  };

  /* ---------- drag the 3D model (mouse, touch and pen) ---------- */
  const onDragStart = (e: React.PointerEvent<HTMLDivElement>) => {
    draggingRef.current = true;
    setDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY };
    rotVelocity.current = { x: 0, y: 0 };
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onDragMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    manualRot.current.y += dx * 0.009;
    manualRot.current.x += dy * 0.009;
    rotVelocity.current = { x: dy * 0.002, y: dx * 0.002 };
    dragStart.current = { x: e.clientX, y: e.clientY };
  };
  const onDragEnd = () => {
    draggingRef.current = false;
    setDragging(false);
  };

  /* ---------- typed role ---------- */
  useEffect(() => {
    if (prefersReduced()) return; // keeps the first role, static
    let i = ROLES[0].name.length;
    let p = 0;
    let del = true;
    let t: ReturnType<typeof setTimeout>;
    const tick = () => {
      const full = ROLES[p].name;
      if (!del) {
        i++;
        setTyped(full.slice(0, i));
        if (i === full.length) {
          del = true;
          t = setTimeout(tick, 1700);
          return;
        }
        t = setTimeout(tick, 55);
      } else {
        i--;
        setTyped(full.slice(0, i));
        if (i === 0) {
          del = false;
          p = (p + 1) % ROLES.length;
          t = setTimeout(tick, 350);
          return;
        }
        t = setTimeout(tick, 26);
      }
    };
    t = setTimeout(tick, 1800);
    return () => clearTimeout(t);
  }, []);

  /* ---------- 3D wireframe model on the canvas ---------- */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = CANVAS * dpr;
    canvas.height = CANVAS * dpr;
    ctx.scale(dpr, dpr);

    const reduce = prefersReduced();
    let animId = 0;
    let time = 0;

    // Icosahedron outer shell
    const phi = (1 + Math.sqrt(5)) / 2;
    const icoVertices = [
      [-1, phi, 0], [1, phi, 0], [-1, -phi, 0], [1, -phi, 0],
      [0, -1, phi], [0, 1, phi], [0, -1, -phi], [0, 1, -phi],
      [phi, 0, -1], [phi, 0, 1], [-phi, 0, -1], [-phi, 0, 1],
    ].map(([x, y, z]) => {
      const len = Math.hypot(x, y, z);
      return [x / len, y / len, z / len];
    });
    const icoEdges: [number, number][] = [];
    for (let i = 0; i < icoVertices.length; i++) {
      for (let j = i + 1; j < icoVertices.length; j++) {
        const d = Math.hypot(
          icoVertices[i][0] - icoVertices[j][0],
          icoVertices[i][1] - icoVertices[j][1],
          icoVertices[i][2] - icoVertices[j][2]
        );
        if (d < 1.15) icoEdges.push([i, j]);
      }
    }

    // Inner octahedron
    const octVertices = [
      [1, 0, 0], [-1, 0, 0],
      [0, 1, 0], [0, -1, 0],
      [0, 0, 1], [0, 0, -1],
    ];
    const octEdges = [
      [0, 2], [0, 3], [0, 4], [0, 5],
      [1, 2], [1, 3], [1, 4], [1, 5],
      [2, 4], [4, 3], [3, 5], [5, 2],
    ];

    // Orbital particles
    const particles = Array.from({ length: 28 }, (_, i) => ({
      r: 1.45 + (i % 4) * 0.15,
      speed: 0.012 + (i % 3) * 0.008,
      offset: (i / 28) * Math.PI * 2,
      phiAngle: (Math.sin(i * 3.7) * Math.PI) / 3,
      size: 1.5 + (i % 3),
      color: i % 2 === 0 ? "#e83e8c" : "#ff9cc9",
    }));

    const render = () => {
      if (!reduce) time += 0.016;
      const tiltNow = tiltRef.current;

      if (!draggingRef.current) {
        manualRot.current.x += rotVelocity.current.x;
        manualRot.current.y += rotVelocity.current.y;
        rotVelocity.current.x *= 0.94;
        rotVelocity.current.y *= 0.94;
      }

      ctx.clearRect(0, 0, CANVAS, CANVAS);
      const cx = CANVAS / 2;
      const cy = CANVAS / 2;
      const radius = CANVAS * 0.3;

      const rx = manualRot.current.x + tiltNow.y * 0.7 + time * 0.3;
      const ry = manualRot.current.y + tiltNow.x * 0.7 + time * 0.45;

      const project = (x: number, y: number, z: number, rad = radius) => {
        const x1 = x * Math.cos(ry) + z * Math.sin(ry);
        const z1 = -x * Math.sin(ry) + z * Math.cos(ry);
        const y2 = y * Math.cos(rx) - z1 * Math.sin(rx);
        const z2 = y * Math.sin(rx) + z1 * Math.cos(rx);
        const fov = 3.4;
        const scale = fov / (fov + z2);
        return { x: cx + x1 * rad * scale, y: cy + y2 * rad * scale, z: z2, scale };
      };

      // Orbit rings
      const ringSteps = 56;
      const drawRing = (tiltAngle: number, color: string, speedMult: number, ringRad = 1.35) => {
        ctx.beginPath();
        for (let i = 0; i <= ringSteps; i++) {
          const theta = (i / ringSteps) * Math.PI * 2;
          const rX = Math.cos(theta) * ringRad;
          const rY = Math.sin(theta) * Math.cos(tiltAngle + time * speedMult) * ringRad;
          const rZ = Math.sin(theta) * Math.sin(tiltAngle + time * speedMult) * ringRad;
          const p = project(rX, rY, rZ);
          if (i === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.2;
        ctx.stroke();
      };
      ctx.shadowBlur = 0;
      drawRing(0.5, "rgba(232, 62, 140, 0.45)", 0.5, 1.4);
      drawRing(-0.7, "rgba(255, 122, 184, 0.5)", -0.4, 1.35);
      drawRing(1.2, "rgba(214, 51, 108, 0.4)", 0.3, 1.45);

      // Icosahedron wireframe
      const projectedIco = icoVertices.map(([x, y, z]) => project(x, y, z));
      ctx.shadowBlur = 8;
      ctx.shadowColor = "rgba(232, 62, 140, 0.6)";
      icoEdges.forEach(([i, j]) => {
        const p1 = projectedIco[i];
        const p2 = projectedIco[j];
        const depthAlpha = Math.max(0.18, (p1.scale + p2.scale) / 2 - 0.35);
        const grad = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
        grad.addColorStop(0, `rgba(232, 62, 140, ${depthAlpha * 0.95})`);
        grad.addColorStop(1, `rgba(255, 122, 184, ${depthAlpha * 0.95})`);
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.6;
        ctx.stroke();
      });
      projectedIco.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(2, 3.5 * p.scale), 0, Math.PI * 2);
        ctx.fillStyle = p.z > 0 ? "#e83e8c" : "#ff9cc9";
        ctx.fill();
      });

      // Counter-rotating inner octahedron
      const innerRad = radius * 0.55;
      const projectedOct = octVertices.map(([x, y, z]) => {
        const revRx = -rx * 1.2;
        const revRy = -ry * 1.2;
        const x1 = x * Math.cos(revRy) + z * Math.sin(revRy);
        const z1 = -x * Math.sin(revRy) + z * Math.cos(revRy);
        const y2 = y * Math.cos(revRx) - z1 * Math.sin(revRx);
        const z2 = y * Math.sin(revRx) + z1 * Math.cos(revRx);
        const fov = 3.4;
        const scale = fov / (fov + z2);
        return { x: cx + x1 * innerRad * scale, y: cy + y2 * innerRad * scale };
      });
      ctx.shadowBlur = 6;
      octEdges.forEach(([i, j]) => {
        const p1 = projectedOct[i];
        const p2 = projectedOct[j];
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = "rgba(214, 51, 108, 0.75)";
        ctx.lineWidth = 1.2;
        ctx.stroke();
      });

      // Orbital particles
      particles.forEach((part) => {
        const a = part.offset + time * part.speed * 60;
        const pX = Math.cos(a) * Math.cos(part.phiAngle) * part.r;
        const pY = Math.sin(part.phiAngle) * part.r;
        const pZ = Math.sin(a) * Math.cos(part.phiAngle) * part.r;
        const p = project(pX, pY, pZ);
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(1, part.size * p.scale), 0, Math.PI * 2);
        ctx.fillStyle = part.color;
        ctx.shadowBlur = 5;
        ctx.shadowColor = part.color;
        ctx.fill();
      });

      // Pulsing core
      const centerScale = 1 + Math.sin(time * 3.5) * 0.2;
      ctx.beginPath();
      ctx.arc(cx, cy, 7 * centerScale, 0, Math.PI * 2);
      ctx.fillStyle = "#e83e8c";
      ctx.shadowBlur = 16;
      ctx.shadowColor = "#ff7ab8";
      ctx.fill();
      ctx.shadowBlur = 0;

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  const current = selected !== null ? ROLES[selected] : null;

  return (
    <section
      id="home"
      ref={sectionRef}
      onPointerMove={onSectionMove}
      onPointerLeave={onSectionLeave}
      className="hero-nm relative overflow-hidden px-4 pb-16 pt-24 font-['Outfit',sans-serif] text-[#4a2a3d] sm:px-8 sm:pb-24 sm:pt-32 md:px-14 md:pb-28"
    >
      <style>{`
        .hero-nm {
          --bg: #f8e5ee;
          --hi: #fffafd;
          --lo: #e0b9cc;
          --mx: 0;
          --my: 0;
          background: var(--bg);
        }
        .nm-raised {
          background: var(--bg);
          box-shadow: 9px 9px 20px var(--lo), -9px -9px 20px var(--hi);
        }
        .nm-raised-sm {
          background: var(--bg);
          box-shadow: 5px 5px 11px var(--lo), -5px -5px 11px var(--hi);
          transition: box-shadow .25s ease, color .25s ease, transform .2s ease;
        }
        .nm-inset {
          background: var(--bg);
          box-shadow: inset 6px 6px 12px var(--lo), inset -6px -6px 12px var(--hi);
          transition: box-shadow .25s ease, color .25s ease;
        }
        .nm-btn {
          background: var(--bg);
          box-shadow: 6px 6px 14px var(--lo), -6px -6px 14px var(--hi);
          transition: transform .2s ease, box-shadow .2s ease;
        }
        .nm-btn:hover { transform: translateY(-2px); }
        .nm-btn:active {
          transform: translateY(0);
          box-shadow: inset 5px 5px 10px var(--lo), inset -5px -5px 10px var(--hi);
        }
        .nm-btn-primary {
          background: linear-gradient(135deg, #e5388a, #cf2a77);
          color: #fff;
          box-shadow: 6px 6px 16px rgba(207, 42, 119, 0.4), -6px -6px 14px var(--hi);
        }
        .nm-btn-primary:active {
          box-shadow: inset 5px 5px 10px rgba(120, 10, 60, 0.45), inset -5px -5px 8px rgba(255, 150, 200, 0.5);
        }
        .role-card:hover { transform: translateY(-2px); }

        .hero-caret {
          display: inline-block;
          width: 2px;
          height: 0.95em;
          margin-left: 3px;
          vertical-align: -0.1em;
          background: #e83e8c;
          animation: hero-blink 1s steps(1) infinite;
        }
        @keyframes hero-blink { 50% { opacity: 0; } }
        @keyframes hero-pop {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes hero-float {
          0%, 100% { translate: 0 0; }
          50% { translate: 0 -8px; }
        }
        .hero-pop { animation: hero-pop .35s ease-out both; }
        .hero-float { animation: hero-float 5s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .hero-caret, .hero-pop, .hero-float { animation: none; }
          .nm-btn, .nm-raised-sm { transition: none; }
        }
      `}</style>

      {/* Background shapes: raised and pressed forms that drift with the cursor */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -right-14 top-[34%] sm:-right-16"
          style={{ transform: "translate(calc(var(--mx) * 26px), calc(var(--my) * 26px))" }}
        >
          <div className="nm-inset h-32 w-32 rounded-full sm:h-44 sm:w-44" />
        </div>
        <div
          className="absolute bottom-[24%] left-[4%] hidden sm:block"
          style={{ transform: "translate(calc(var(--mx) * 40px), calc(var(--my) * 40px))" }}
        >
          <div className="hero-float nm-raised-sm h-12 w-12 rotate-12 rounded-2xl" />
        </div>
        <div
          className="absolute bottom-8 right-[8%]"
          style={{ transform: "translate(calc(var(--mx) * 30px), calc(var(--my) * 30px))" }}
        >
          <div className="nm-inset h-12 w-12 rounded-2xl sm:h-16 sm:w-16" />
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* No order classes: the 3D model comes first, so it sits on top on phones */}
        <div className="grid items-center gap-10 md:grid-cols-12 md:gap-10 lg:gap-14">
          {/* ================= 3D model ================= */}
          <div className="flex justify-center md:col-span-6">
            <div
              className="relative aspect-square w-full max-w-[260px] sm:max-w-[340px] md:max-w-[340px] lg:max-w-[420px] xl:max-w-[450px]"
              style={{ perspective: "1000px" }}
            >
              <div
                className="absolute inset-0 will-change-transform"
                style={{
                  transformStyle: "preserve-3d",
                  transform:
                    "rotateY(calc(var(--mx) * 10deg)) rotateX(calc(var(--my) * -10deg))",
                  transition: "transform .2s ease-out",
                }}
              >
                {/* back plate: pushed out */}
                <div
                  className="nm-raised absolute inset-0 rounded-full"
                  style={{ transform: "translateZ(-30px)" }}
                />
                {/* pressed-in well */}
                <div
                  className="nm-inset absolute inset-[9%] rounded-full"
                  style={{ transform: "translateZ(-14px)" }}
                />

                {/* interactive canvas */}
                <div
                  onPointerDown={onDragStart}
                  onPointerMove={onDragMove}
                  onPointerUp={onDragEnd}
                  onPointerCancel={onDragEnd}
                  className={`absolute inset-0 select-none ${
                    dragging ? "cursor-grabbing" : "cursor-grab"
                  }`}
                  style={{ transform: "translateZ(20px)", touchAction: "pan-y" }}
                >
                  <canvas
                    ref={canvasRef}
                    aria-label="Interactive 3D wireframe model. Drag to rotate."
                    role="img"
                    className="h-full w-full"
                  />
                </div>

                {/* chips (large screens only, so small screens stay clean) */}
                <div
                  className="pointer-events-none absolute -right-[8%] top-[4%] hidden lg:block"
                  style={{ transform: "translateZ(70px)" }}
                >
                  <div className="hero-float nm-raised-sm rounded-xl px-3.5 py-2 font-mono text-[11px] text-[#4a2a3d]">
                    {"<FullStack />"}
                  </div>
                </div>
                <div
                  className="pointer-events-none absolute -left-[8%] top-[40%] hidden lg:block"
                  style={{ transform: "translateZ(60px)" }}
                >
                  <div
                    className="hero-float nm-raised-sm rounded-xl px-3.5 py-2 font-mono text-[11px] text-[#4a2a3d]"
                    style={{ animationDelay: "-2s" }}
                  >
                    {"SELECT insight;"}
                  </div>
                </div>
                <div
                  className="pointer-events-none absolute -right-[6%] bottom-[10%] hidden lg:block"
                  style={{ transform: "translateZ(65px)" }}
                >
                  <div
                    className="hero-float nm-raised-sm rounded-xl px-3.5 py-2 font-mono text-[11px] text-[#4a2a3d]"
                    style={{ animationDelay: "-3.5s" }}
                  >
                    {"prompt → result"}
                  </div>
                </div>
              </div>

              {/* hint, outside the tilting scene */}
              <div className="nm-inset pointer-events-none absolute -bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full px-4 py-1.5 text-[11px] text-[#85586f] sm:text-xs">
                <span className="h-1.5 w-1.5 rounded-full bg-[#e83e8c]" />
                drag to rotate
              </div>
            </div>
          </div>

          {/* ================= Text + CTAs ================= */}
          <div className="mt-4 text-center md:col-span-6 md:mt-0 md:text-left">
            {/* Logo lockup: small screens only */}
            <a
              href="#home"
              className="mb-5 mt-2 inline-flex items-center gap-3 md:hidden"
              aria-label="Devisha Agrawal"
            >
              <span className="nm-raised-sm flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold text-[#b8226a]">
                DA
              </span>
              <span className="text-left leading-tight">
                <span className="block text-lg font-bold text-[#4a2a3d]">Devisha Agrawal</span>
                <span className="block text-xs text-[#b8226a]">Design · Code · Data</span>
              </span>
            </a>

            {/* Status */}
            <div className="nm-inset mx-auto mb-6 flex w-fit items-center gap-2.5 rounded-full px-4 py-2 md:mx-0">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#e83e8c] opacity-60 motion-reduce:animate-none" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#e83e8c]" />
              </span>
              <span className="text-xs text-[#85586f]">Open to opportunities</span>
            </div>

            {/* Headline with typed role */}
            <h1
              className="text-3xl font-bold leading-[1.15] tracking-tight text-[#4a2a3d] sm:text-5xl md:text-4xl lg:text-[3.3rem]"
              aria-label="Hi, I’m Devisha Agrawal. Graphic designer, full stack developer, prompt engineer and data analyst."
            >
              <span aria-hidden="true">
                Hi, I’m{" "}
                <span className="bg-gradient-to-r from-[#d6286f] to-[#ee5a9d] bg-clip-text text-transparent">
                  Devisha Agrawal.
                </span>
                <span className="mt-1 block min-h-[2.3em]">
                  I’m a{" "}
                  <span className="bg-gradient-to-r from-[#d6286f] to-[#ee5a9d] bg-clip-text text-transparent">
                    {typed}
                  </span>
                  <span className="hero-caret" />
                </span>
              </span>
            </h1>

            <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-[#85586f] sm:mt-6 sm:text-base md:mx-0">
              I design visuals, build full stack web apps, write prompts that get
              dependable results, and turn data into answers people can act on.
            </p>

            {/* Buttons */}
            <div className="mt-8 flex flex-col items-stretch justify-center gap-4 sm:mt-10 sm:flex-row sm:items-center md:justify-start">
              <a
                href="#projects"
                className="nm-btn nm-btn-primary inline-flex items-center justify-center gap-2 rounded-2xl px-8 py-3.5 text-sm font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e83e8c] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f8e5ee]"
              >
                View my work
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="M7 17L17 7" />
                  <path d="M8 7h9v9" />
                </svg>
              </a>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="nm-btn inline-flex items-center justify-center rounded-2xl px-8 py-3.5 text-sm font-semibold text-[#4a2a3d] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e83e8c]"
              >
                Resume
              </a>
            </div>

            {/* Stats: replace with your own numbers */}
            <div className="mt-9 grid grid-cols-3 gap-3 sm:gap-4">
              {[
                { v: "1+", l: "Hackathon projects", c: "#4a2a3d" },
                { v: "5+", l: "Projects built", c: "#b8226a" },
                { v: "100%", l: "Curiosity", c: "#4a2a3d" },
              ].map((s) => (
                <div
                  key={s.l}
                  className="nm-inset flex flex-col items-center rounded-2xl px-2 py-3.5 text-center"
                >
                  <div className="text-xl font-bold tabular-nums sm:text-2xl" style={{ color: s.c }}>
                    {s.v}
                  </div>
                  <div className="mt-0.5 text-[11px] leading-tight text-[#85586f] sm:text-xs">
                    {s.l}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ================= Role cards ================= */}
        <div className="mt-16 sm:mt-24">
          <div className="mb-5 text-center md:text-left">
            <h2 className="text-base font-bold sm:text-lg">What I do</h2>
            <p className="text-xs text-[#85586f]">Press a card to see what it covers.</p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
            {ROLES.map((r, i) => {
              const on = selected === i;
              return (
                <button
                  key={r.name}
                  onClick={() => setSelected(on ? null : i)}
                  aria-pressed={on}
                  className={`role-card flex flex-col items-center gap-3 rounded-3xl px-3 py-5 text-center text-sm font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e83e8c] sm:py-7 ${
                    on ? "nm-inset text-[#b8226a]" : "nm-raised-sm text-[#4a2a3d]"
                  }`}
                >
                  <span
                    className={`flex h-11 w-11 items-center justify-center rounded-full sm:h-12 sm:w-12 ${
                      on ? "nm-raised-sm text-[#b8226a]" : "nm-inset text-[#e83e8c]"
                    }`}
                  >
                    <RoleIcon index={i} />
                  </span>
                  <span className="leading-tight">{r.name}</span>
                </button>
              );
            })}
          </div>

          {/* readout well */}
          <div
            aria-live="polite"
            className="nm-inset mx-auto mt-6 flex min-h-[4.5rem] w-full max-w-2xl items-center justify-center rounded-2xl px-5 py-3 text-center"
          >
            {current ? (
              <div key={selected} className="hero-pop">
                <p className="text-sm font-bold text-[#b8226a]">{current.name}</p>
                <p className="mt-0.5 text-sm leading-snug text-[#85586f]">{current.note}</p>
              </div>
            ) : (
              <p className="text-sm text-[#85586f]">
                Design, code, prompts and data, all in one place.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}