"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/* ------------------------------------------------------------------
   About: neumorphic base + frosted-glass terminal
   - Soft pushed-out / pressed-in surfaces (matches the Hero).
   - The light follows your cursor; shadows, a glass shine and the
     background shapes all move with it.
   - Your photo stays a free-standing cutout (no frame, no backing plate).
   - Glass chips float around the photo at different depths in 3D.
   - Trait cards flip in 3D (hover on desktop, tap on touch screens).

   Responsive layout
   - < lg  : single column (photo on top, terminal below, centred and
             capped to a readable width). Sections slide up.
   - >= lg : two columns (5fr / 7fr). Sections slide in from the sides.
------------------------------------------------------------------- */

type Tab = "intro" | "story" | "stack";

// The coding intro that gets typed out. Edit freely.
const introCode = `const devisha = {
  name: "Devisha Agrawal",
  role: "Developer",
  builds: ["graphic designer", "full stack developer", "UI/UX", "data analytics"],
  mindset: "learn it by building it",
  openToWork: true,
};

devisha.sayHello();`;

const helloLine = "Hi, I'm Devisha. Let's build something together.";

// Total number of lines in the finished snippet. Used to reserve the code
// box height up front so the layout doesn't jump while the text types out.
const TOTAL_LINES = introCode.split("\n").length;

// Tiny syntax highlighter (pink / plum / violet)
function highlight(line: string) {
  const re =
    /(\/\/.*)|("(?:[^"\\]|\\.)*"?)|\b(const|true|false)\b|\b([A-Za-z_]\w*)(?=\s*:)|\b([A-Za-z_]\w*)(?=\()/g;
  const parts: React.ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  let k = 0;
  while ((m = re.exec(line)) !== null) {
    if (m.index > last) parts.push(line.slice(last, m.index));
    const cls = m[1]
      ? "ab-c"
      : m[2]
      ? "ab-s"
      : m[3]
      ? "ab-k"
      : m[4]
      ? "ab-p"
      : "ab-f";
    parts.push(
      <span key={k++} className={cls}>
        {m[0]}
      </span>
    );
    last = m.index + m[0].length;
  }
  if (last < line.length) parts.push(line.slice(last));
  return parts;
}

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));

// Edit these to describe yourself
const traits = [
  { label: "Problem Solving", desc: "Breaking big problems into small, clear steps." },
  { label: "Clean UI", desc: "Layouts that look good and feel easy to use." },
  { label: "Computer Vision", desc: "Turning video and images into useful data." },
  { label: "Always Learning", desc: "Picking up new tools by building with them." },
];

const stack = [
  "Python",
  "SQL",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Tailwind CSS",
  "OpenCV",
  "Git",
];

const tabs: { id: Tab; label: string }[] = [
  { id: "intro", label: "intro.ts" },
  { id: "story", label: "story.md" },
  { id: "stack", label: "stack.json" },
];

/* ---------- 3D flip card ---------- */
function FlipCard({ label, desc }: { label: string; desc: string }) {
  const [on, setOn] = useState(false);
  return (
    <button
      type="button"
      data-on={on}
      onClick={() => setOn((v) => !v)}
      aria-label={`${label}. ${desc}`}
      className="ab-flip h-28 w-full rounded-2xl text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e83e8c] min-[420px]:h-32 sm:h-36"
    >
      <span className="ab-flip-inner relative block h-full w-full">
        {/* front: pushed-out neumorphic key */}
        <span className="ab-face ab-raised-sm absolute inset-0 flex flex-col justify-between rounded-2xl p-3.5 sm:p-4">
          <span className="text-sm font-bold text-[#4a2a3d] sm:text-base">{label}</span>
          <span className="text-[11px] text-[#85586f]">Flip to read more</span>
        </span>
        {/* back: frosted pink glass */}
        <span
          className="ab-face absolute inset-0 flex items-center rounded-2xl border border-white/80 p-3.5 text-[13px] leading-snug text-[#4a2a3d] sm:p-4 sm:text-sm"
          style={{
            transform: "rotateY(180deg)",
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.7), rgba(255,182,214,0.6))",
            boxShadow: "0 14px 30px -14px rgba(190,24,93,0.45)",
          }}
        >
          {desc}
        </span>
      </span>
    </button>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const termRef = useRef<HTMLDivElement>(null);

  const [visible, setVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("intro");
  const [copied, setCopied] = useState(false);
  const [typed, setTyped] = useState(0);
  const [runKey, setRunKey] = useState(0);

  const st = useRef({
    tx: 0, ty: 0, cx: 0, cy: 0,
    tlx: 9, tly: 9, lx: 9, ly: 9,
  });

  // ── Slide-in trigger ──
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // ── Typewriter for the coding intro ──
  useEffect(() => {
    if (!visible) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      setTyped(introCode.length);
      return;
    }

    setTyped(0);
    let current = 0;
    const intervalId = window.setInterval(() => {
      current = Math.min(current + 2, introCode.length);
      setTyped(current);
      if (current >= introCode.length) window.clearInterval(intervalId);
    }, 30);

    return () => window.clearInterval(intervalId);
  }, [visible, runKey]);

  // ── Smooth tilt + moving light (written straight to CSS, no re-renders) ──
  useEffect(() => {
    if (!visible) return;
    const section = sectionRef.current;
    const scene = sceneRef.current;
    if (!section || !scene) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;

    const loop = () => {
      const s = st.current;
      s.cx += (s.tx - s.cx) * 0.08;
      s.cy += (s.ty - s.cy) * 0.08;
      s.lx += (s.tlx - s.lx) * 0.1;
      s.ly += (s.tly - s.ly) * 0.1;
      section.style.setProperty("--sx", s.lx.toFixed(2));
      section.style.setProperty("--sy", s.ly.toFixed(2));
      if (!reduce) {
        section.style.setProperty("--mx", s.cx.toFixed(3));
        section.style.setProperty("--my", s.cy.toFixed(3));
        scene.style.transform = `rotateY(${(s.cx * 14).toFixed(2)}deg) rotateX(${(
          -s.cy * 10
        ).toFixed(2)}deg)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [visible]);

  // Mouse only: touch screens keep the default light angle
  const onSectionMove = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse") return;
    const r = sectionRef.current?.getBoundingClientRect();
    if (!r) return;
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    const s = st.current;
    s.tx = px;
    s.ty = py;
    s.tlx = clamp(4 - px * 26, -12, 14);
    s.tly = clamp(4 - py * 26, -12, 14);
  };
  const onSectionLeave = () => {
    const s = st.current;
    s.tx = 0;
    s.ty = 0;
    s.tlx = 9;
    s.tly = 9;
  };

  // Glass shine that follows the pointer over the terminal
  const onTermMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = termRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--gx", `${(((e.clientX - r.left) / r.width) * 100).toFixed(1)}%`);
    el.style.setProperty("--gy", `${(((e.clientY - r.top) / r.height) * 100).toFixed(1)}%`);
  };

  const done = typed >= introCode.length;
  const shown = introCode.slice(0, typed);
  const lines = shown.split("\n");
  const lastLine = lines[lines.length - 1];

  const copyEmail = async () => {
    try {
      if (!navigator.clipboard?.writeText) {
        throw new Error("Clipboard API is unavailable");
      }
      await navigator.clipboard.writeText("devishaagrawal@gmail.com");
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy email:", error);
      setCopied(false);
    }
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      onPointerMove={onSectionMove}
      onPointerLeave={onSectionLeave}
      className="ab-root relative overflow-hidden px-4 py-16 font-['Outfit',sans-serif] text-[#4a2a3d] min-[420px]:px-5 sm:px-8 sm:py-20 md:px-12 lg:px-14 lg:py-28"
    >
      <style>{`
        .ab-root {
          --bg: #f8e5ee;
          --hi: #fffafd;
          --lo: #e0b9cc;
          --sx: 9;
          --sy: 9;
          --mx: 0;
          --my: 0;
          background: var(--bg);
        }
        .ab-raised-sm {
          background: var(--bg);
          box-shadow:
            calc(var(--sx) * 0.55px) calc(var(--sy) * 0.55px) 10px var(--lo),
            calc(var(--sx) * -0.55px) calc(var(--sy) * -0.55px) 10px var(--hi);
          transition: box-shadow .25s ease, transform .25s ease;
        }
        .ab-raised {
          background: var(--bg);
          box-shadow:
            calc(var(--sx) * 1px) calc(var(--sy) * 1px) 20px var(--lo),
            calc(var(--sx) * -1px) calc(var(--sy) * -1px) 20px var(--hi);
        }
        .ab-inset {
          background: var(--bg);
          box-shadow:
            inset calc(var(--sx) * 0.6px) calc(var(--sy) * 0.6px) 12px var(--lo),
            inset calc(var(--sx) * -0.6px) calc(var(--sy) * -0.6px) 12px var(--hi);
        }
        /* pressed-in well that sits on glass */
        .ab-well {
          background: rgba(255, 255, 255, 0.3);
          box-shadow:
            inset calc(var(--sx) * 0.5px) calc(var(--sy) * 0.5px) 10px rgba(190, 120, 160, 0.28),
            inset calc(var(--sx) * -0.5px) calc(var(--sy) * -0.5px) 10px rgba(255, 255, 255, 0.85);
        }
        .ab-btn {
          background: var(--bg);
          box-shadow:
            calc(var(--sx) * 0.7px) calc(var(--sy) * 0.7px) 14px var(--lo),
            calc(var(--sx) * -0.7px) calc(var(--sy) * -0.7px) 14px var(--hi);
          transition: transform .2s ease, box-shadow .2s ease;
        }
        .ab-btn:hover { transform: translateY(-2px); }
        .ab-btn:active {
          transform: translateY(0);
          box-shadow:
            inset calc(var(--sx) * 0.5px) calc(var(--sy) * 0.5px) 10px var(--lo),
            inset calc(var(--sx) * -0.5px) calc(var(--sy) * -0.5px) 10px var(--hi);
        }
        .ab-btn-primary {
          background: linear-gradient(135deg, #e5388a, #cf2a77);
          color: #fff;
          box-shadow:
            calc(var(--sx) * 0.8px) calc(var(--sy) * 0.8px) 16px rgba(207, 42, 119, 0.4),
            calc(var(--sx) * -0.8px) calc(var(--sy) * -0.8px) 14px var(--hi);
        }
        .ab-btn-primary:active {
          box-shadow:
            inset calc(var(--sx) * 0.6px) calc(var(--sy) * 0.6px) 10px rgba(120, 10, 60, 0.45),
            inset calc(var(--sx) * -0.6px) calc(var(--sy) * -0.6px) 8px rgba(255, 150, 200, 0.5);
        }

        /* frosted glass */
        .ab-glass {
          background: rgba(255, 255, 255, 0.4);
          -webkit-backdrop-filter: blur(22px) saturate(1.5);
          backdrop-filter: blur(22px) saturate(1.5);
          border: 1px solid rgba(255, 255, 255, 0.75);
          box-shadow:
            0 30px 70px -22px rgba(190, 24, 93, 0.35),
            inset 0 1px 0 rgba(255, 255, 255, 0.9);
        }
        .ab-chip {
          background: rgba(255, 255, 255, 0.5);
          -webkit-backdrop-filter: blur(14px) saturate(1.4);
          backdrop-filter: blur(14px) saturate(1.4);
          border: 1px solid rgba(255, 255, 255, 0.8);
          box-shadow: 0 12px 28px -12px rgba(190, 24, 93, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.9);
        }

        /* syntax colours */
        .ab-k { color: #b8226a; font-weight: 600; }
        .ab-s { color: #7c3aad; }
        .ab-p { color: #a3205f; }
        .ab-f { color: #6d3bd0; }
        .ab-c { color: #85586f; font-style: italic; }

        /* thin scrollbars for the code box and the tab strip */
        .ab-scroll { scrollbar-width: thin; scrollbar-color: #e0b9cc transparent; }
        .ab-scroll::-webkit-scrollbar { height: 6px; }
        .ab-scroll::-webkit-scrollbar-thumb { background: #e0b9cc; border-radius: 999px; }

        /* 3D flip */
        .ab-flip { perspective: 900px; }
        .ab-flip-inner {
          transform-style: preserve-3d;
          transition: transform .6s cubic-bezier(.2, .7, .2, 1);
        }
        .ab-face {
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
        }
        .ab-flip:focus-visible .ab-flip-inner { transform: rotateY(180deg); }
        @media (hover: hover) {
          .ab-flip:hover .ab-flip-inner { transform: rotateY(180deg); }
        }
        @media (hover: none) {
          .ab-flip[data-on="true"] .ab-flip-inner { transform: rotateY(180deg); }
        }

        /* Lighter shadows on small screens (cheaper to paint, less heavy) */
        @media (max-width: 639px) {
          .ab-raised { box-shadow:
            calc(var(--sx) * 0.7px) calc(var(--sy) * 0.7px) 14px var(--lo),
            calc(var(--sx) * -0.7px) calc(var(--sy) * -0.7px) 14px var(--hi); }
          .ab-glass { -webkit-backdrop-filter: blur(16px) saturate(1.4); backdrop-filter: blur(16px) saturate(1.4); }
        }

        @keyframes ab-spin { to { transform: rotate(360deg); } }
        @keyframes ab-float {
          0%, 100% { translate: 0 0; }
          50% { translate: 0 -8px; }
        }
        @keyframes ab-blink { 0%, 49% { opacity: 1; } 50%, 100% { opacity: 0; } }
        .ab-spin { animation: ab-spin 16s linear infinite; }
        .ab-float { animation: ab-float 5s ease-in-out infinite; }
        .ab-blink { animation: ab-blink 1s steps(1) infinite; }
        @media (prefers-reduced-motion: reduce) {
          .ab-spin, .ab-float, .ab-blink { animation: none; }
          .ab-flip-inner, .ab-btn { transition: none; }
        }
      `}</style>

      {/* Colour for the glass to blur: kept on the right, away from the photo */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-16 top-6 h-48 w-48 rounded-full bg-[#ff9cc9] opacity-70 blur-3xl sm:-right-24 sm:h-80 sm:w-80" />
        <div className="absolute -right-10 bottom-4 h-44 w-44 rounded-full bg-[#d8b4fe] opacity-60 blur-3xl sm:h-72 sm:w-72" />
        <div className="absolute right-1/3 top-1/2 h-40 w-40 rounded-full bg-[#ffc2de] opacity-70 blur-3xl sm:h-56 sm:w-56" />

        {/* neumorphic shapes that drift with the cursor */}
        <div
          className="absolute -left-14 top-12 sm:top-20"
          style={{ transform: "translate(calc(var(--mx) * -30px), calc(var(--my) * -30px))" }}
        >
          <div className="ab-raised h-24 w-24 rounded-full sm:h-36 sm:w-36 lg:h-44 lg:w-44" />
        </div>
        <div
          className="absolute bottom-10 left-[4%] sm:bottom-16"
          style={{ transform: "translate(calc(var(--mx) * 36px), calc(var(--my) * 36px))" }}
        >
          <div className="ab-inset h-12 w-12 rounded-2xl sm:h-16 sm:w-16 lg:h-20 lg:w-20" />
        </div>
      </div>

      {/* Single column below lg, two columns (5fr / 7fr) from lg up */}
      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 sm:gap-16 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        {/* ── Photo column: slides up on small screens, in from the left on lg ── */}
        <div
          className={`relative flex min-w-0 justify-center transition-all duration-1000 ease-out ${
            visible
              ? "translate-x-0 translate-y-0 opacity-100"
              : "translate-y-12 opacity-0 lg:translate-y-0 lg:-translate-x-16"
          }`}
        >
          <div
            className="relative w-full max-w-[220px] min-[420px]:max-w-[260px] sm:max-w-[300px] lg:max-w-[360px] xl:max-w-[380px]"
            style={{ perspective: "1000px" }}
          >
            <div
              ref={sceneRef}
              className="relative will-change-transform"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Your photo: transparent PNG at public/about.png, no frame behind it.
                  For a full-body photo, delete the two mask lines. */}
              <Image
                src="/about.png"
                alt="Devisha Agrawal"
                width={520}
                height={680}
                priority
                sizes="(min-width: 1280px) 380px, (min-width: 1024px) 360px, (min-width: 640px) 300px, 260px"
                className="pointer-events-none relative h-auto w-full select-none drop-shadow-[0_18px_30px_rgba(232,62,140,0.25)]"
                style={{
                  transform: "translateZ(25px)",
                  maskImage: "linear-gradient(to bottom, black 82%, transparent 100%)",
                  WebkitMaskImage: "linear-gradient(to bottom, black 82%, transparent 100%)",
                }}
              />

              {/* Floating glass chips, each at its own depth */}
              <div
                className="pointer-events-none absolute -left-2 top-4 z-20 sm:-left-8 lg:-left-10"
                style={{ transform: "translateZ(70px)" }}
              >
                <div className="ab-chip ab-float whitespace-nowrap rounded-xl px-2.5 py-1 font-mono text-[10px] font-medium text-[#4a2a3d] sm:px-3 sm:py-1.5 sm:text-[11px]">
                  <span className="text-[#b8226a]">$</span> git push
                </div>
              </div>

              <div
                className="pointer-events-none absolute -right-2 top-[42%] z-20 sm:-right-8 lg:-right-10"
                style={{ transform: "translateZ(55px)" }}
              >
                <div
                  className="ab-chip ab-float whitespace-nowrap rounded-xl px-2.5 py-1 font-mono text-[10px] font-medium text-[#4a2a3d] sm:px-3 sm:py-1.5 sm:text-[11px]"
                  style={{ animationDelay: "-1.6s" }}
                >
                  clean UI
                </div>
              </div>

              <div
                className="pointer-events-none absolute bottom-[26%] -left-2 z-20 sm:-left-8 lg:-left-10"
                style={{ transform: "translateZ(45px)" }}
              >
                <div
                  className="ab-chip ab-float whitespace-nowrap rounded-xl px-2.5 py-1 font-mono text-[10px] font-medium text-[#4a2a3d] sm:px-3 sm:py-1.5 sm:text-[11px]"
                  style={{ animationDelay: "-3s" }}
                >
                  Built <strong className="text-[#b8226a]">VisualSQL</strong>
                </div>
              </div>

              {/* Rotating stamp */}
              <div
                className="ab-raised pointer-events-none absolute -bottom-3 -right-2 z-30 flex h-20 w-20 items-center justify-center rounded-full sm:-bottom-6 sm:-right-6 sm:h-28 sm:w-28 lg:-right-8"
                style={{ transform: "translateZ(60px)" }}
              >
                <svg viewBox="0 0 120 120" className="ab-spin h-full w-full overflow-visible" aria-hidden>
                  <defs>
                    <path id="aboutBadgeCircle" d="M 60,60 m -42,0 a 42,42 0 1,1 84,0 a 42,42 0 1,1 -84,0" />
                  </defs>
                  <text fill="#b8226a" fontSize="9.5" fontWeight="600">
                    <textPath href="#aboutBadgeCircle" startOffset="0" textLength="260" lengthAdjust="spacing">
                      READABLE CODE • CRAFTED UI •
                    </textPath>
                  </text>
                </svg>
                <span className="ab-inset absolute flex h-9 w-9 items-center justify-center rounded-full text-[10px] font-bold text-[#b8226a] sm:h-11 sm:w-11">
                  DA
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Terminal column: slides up on small screens, in from the right on lg ── */}
        <div
          className={`mx-auto w-full min-w-0 max-w-2xl transition-all duration-1000 ease-out lg:mx-0 lg:max-w-none ${
            visible
              ? "translate-x-0 translate-y-0 opacity-100"
              : "translate-y-12 opacity-0 lg:translate-y-0 lg:translate-x-16"
          }`}
        >
          <span className="ab-inset mb-4 inline-block rounded-full px-4 py-1.5 text-xs font-semibold text-[#b8226a]">
            About me
          </span>
          <h2 className="mb-5 text-[1.65rem] font-bold leading-tight tracking-tight text-[#4a2a3d] min-[420px]:text-3xl sm:mb-6 sm:text-4xl">
            Turning ideas into{" "}
            <span className="bg-gradient-to-r from-[#d6286f] to-[#ee5a9d] bg-clip-text text-transparent">
              working software.
            </span>
          </h2>

          {/* Glass terminal */}
          <div
            ref={termRef}
            onPointerMove={onTermMove}
            className="ab-glass relative overflow-hidden rounded-3xl sm:rounded-[2rem]"
            style={{ ["--gx" as string]: "25%", ["--gy" as string]: "0%" }}
          >
            {/* moving shine */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at var(--gx) var(--gy), rgba(255,255,255,0.55), rgba(255,255,255,0) 48%)",
              }}
            />

            <div className="relative">
              {/* Path bar */}
              <div className="truncate border-b border-white/60 px-4 py-3 font-mono text-[11px] text-[#85586f] sm:px-5 sm:py-3.5">
                ~/devisha/about
              </div>

              {/* File tabs: a pressed-in track with a raised active key */}
              <div className="px-4 pt-4 sm:px-6">
                <div
                  role="tablist"
                  aria-label="About sections"
                  className="ab-well ab-scroll flex w-fit max-w-full gap-1.5 overflow-x-auto rounded-2xl p-1.5"
                >
                  {tabs.map((t) => (
                    <button
                      key={t.id}
                      role="tab"
                      aria-selected={activeTab === t.id}
                      onClick={() => setActiveTab(t.id)}
                      className={`shrink-0 rounded-xl px-3 py-2 font-mono text-[11px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e83e8c] min-[420px]:px-4 min-[420px]:text-xs ${
                        activeTab === t.id
                          ? "ab-raised-sm font-semibold text-[#b8226a]"
                          : "text-[#85586f] hover:text-[#4a2a3d]"
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Body */}
              <div role="tabpanel" className="min-h-[320px] p-4 sm:min-h-[360px] sm:p-6">
                {activeTab === "intro" && (
                  <div>
                    {/* Height is reserved for the full snippet so nothing jumps while typing */}
                    <div
                      className="ab-well ab-scroll overflow-x-auto rounded-2xl px-3 py-4 font-mono text-[11px] leading-6 min-[420px]:px-4 min-[420px]:text-[12px] sm:text-[13px]"
                      style={{ minHeight: `calc(${TOTAL_LINES} * 1.5rem + 2rem)` }}
                    >
                      {lines.map((line, i) => (
                        <div key={i} className="flex">
                          <span
                            aria-hidden
                            className="mr-2 w-5 shrink-0 select-none text-right text-[#b99aab] min-[420px]:mr-3 min-[420px]:w-6"
                          >
                            {i + 1}
                          </span>
                          <span className="whitespace-pre text-[#4a2a3d]">
                            {highlight(line)}
                            {i === lines.length - 1 && (
                              <span className="ab-blink ml-0.5 inline-block h-[1.15em] w-[7px] bg-[#e83e8c] align-middle" />
                            )}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Output after the code finishes typing */}
                    <div
                      aria-live="polite"
                      className={`ab-well mt-4 rounded-2xl px-4 py-3 font-mono text-[11px] leading-relaxed transition-all duration-500 min-[420px]:text-[12px] sm:text-[13px] ${
                        done ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
                      }`}
                    >
                      <span className="mr-2 text-[#b8226a]">&gt;</span>
                      <span className="text-[#4a2a3d]">{helloLine}</span>
                    </div>

                    <button
                      onClick={() => setRunKey((k) => k + 1)}
                      className="ab-btn mt-4 w-full rounded-xl px-5 py-2.5 text-xs font-semibold text-[#4a2a3d] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e83e8c] min-[420px]:w-auto"
                    >
                      Replay intro
                    </button>
                  </div>
                )}

                {activeTab === "story" && (
                  <div>
                    {/* Replace this paragraph with your own story */}
                    <p className="mb-5 text-sm leading-relaxed text-[#6b4558] sm:mb-6 sm:text-[15px]">
                      I’m Devisha, a developer who enjoys the space where{" "}
                      <strong className="text-[#4a2a3d]">solid engineering</strong> meets{" "}
                      <strong className="text-[#4a2a3d]">thoughtful design</strong>. I like
                      building projects end to end, from computer vision and databases to
                      clean, responsive web interfaces that are easy to use.
                    </p>
                    <div className="grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 sm:gap-4">
                      {traits.map((t) => (
                        <FlipCard key={t.label} label={t.label} desc={t.desc} />
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "stack" && (
                  <div>
                    <div className="mb-4 font-mono text-xs text-[#85586f]">
                      <span className="text-[#b8226a]">{"// "}</span>tools I work with
                    </div>
                    <div className="flex flex-wrap gap-2.5 sm:gap-3">
                      {stack.map((s) => (
                        <span
                          key={s}
                          className="ab-raised-sm cursor-default rounded-xl px-3 py-1.5 font-mono text-[11px] text-[#4a2a3d] hover:-translate-y-0.5 sm:px-4 sm:py-2 sm:text-xs"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Status bar */}
              <div className="flex items-center justify-between bg-gradient-to-r from-[#d6286f] to-[#ee5a9d] px-4 py-2 font-mono text-[11px] text-white sm:px-5">
                <span className="flex items-center gap-4">
                  <span>main</span>
                  <span>0 errors</span>
                </span>
                <span className="hidden sm:inline">
                  {activeTab === "intro" ? `Ln ${lines.length}, Col ${lastLine.length + 1}` : "UTF-8"}
                </span>
              </div>
            </div>
          </div>

          {/* Buttons: stacked full-width on tiny screens, side by side from 420px */}
          <div className="mt-6 flex flex-col gap-3 min-[420px]:flex-row min-[420px]:flex-wrap min-[420px]:items-center min-[420px]:gap-4 sm:mt-8">
            <a
              href="#projects"
              className="ab-btn ab-btn-primary inline-flex items-center justify-center rounded-2xl px-7 py-3 text-sm font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e83e8c] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f8e5ee]"
            >
              View projects
            </a>
            <button
              onClick={copyEmail}
              className="ab-btn inline-flex items-center justify-center rounded-2xl px-7 py-3 text-sm font-semibold text-[#4a2a3d] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e83e8c]"
            >
              {copied ? "Copied" : "Copy email"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}