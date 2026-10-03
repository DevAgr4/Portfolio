"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

type Tab = "intro" | "story" | "stack";

// ── The coding intro that gets typed out. Edit freely. ──
const introCode = `const devisha = {
  name: "Devisha Agrawal",
  role: "Developer",
  builds: ["computer vision", "databases", "clean UI"],
  mindset: "learn it by building it",
  openToWork: true,
};

devisha.sayHello();`;

const helloLine = "Hi, I'm Devisha 👋 Let's build something together.";

// Tiny syntax highlighter (pink theme)
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
      ? "text-[#b79aa8] italic"
      : m[2]
      ? "text-[#d6336c]"
      : m[3]
      ? "text-[#e83e8c] font-semibold"
      : m[4]
      ? "text-[#c2255c]"
      : "text-[#ff4d9d]";
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

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("intro");
  const [copied, setCopied] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [typed, setTyped] = useState(0);
  const [runKey, setRunKey] = useState(0);

  // ── Slide-in trigger ──
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 }
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

      if (current >= introCode.length) {
        window.clearInterval(intervalId);
      }
    }, 30);

    return () => window.clearInterval(intervalId);
  }, [visible, runKey]);

  const done = typed >= introCode.length;
  const shown = introCode.slice(0, typed);
  const lines = shown.split("\n");
  const lastLine = lines[lines.length - 1];

  // ── Cursor parallax ──
  const handleSectionMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    setTilt({
      x: (e.clientX - rect.left) / rect.width - 0.5,
      y: (e.clientY - rect.top) / rect.height - 0.5,
    });
  };
  const resetSection = () => setTilt({ x: 0, y: 0 });

  // ── 3D tilt for small interactive elements ──
  const handleTilt = (e: React.MouseEvent<HTMLElement>, max = 12, lift = 1.04) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(600px) rotateY(${px * max}deg) rotateX(${-py * max}deg) scale(${lift})`;
  };
  const resetTilt = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.transform =
      "perspective(600px) rotateY(0deg) rotateX(0deg) scale(1)";
  };

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

  // Edit these to describe yourself
  const traits = [
    { icon: "🧩", label: "Problem Solving", desc: "Breaking big problems into small, clear steps" },
    { icon: "🎨", label: "Clean UI", desc: "Layouts that look good and feel easy to use" },
    { icon: "👁️", label: "Computer Vision", desc: "Turning video and images into useful data" },
    { icon: "🌱", label: "Always Learning", desc: "Picking up new tools by building with them" },
  ];

  const stack = ["Python", "SQL", "JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS", "OpenCV", "Git"];

  const tabs: { id: Tab; label: string }[] = [
    { id: "intro", label: "intro.ts" },
    { id: "story", label: "story.md" },
    { id: "stack", label: "stack.json" },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      onMouseMove={handleSectionMove}
      onMouseLeave={resetSection}
      className="relative bg-gradient-to-b from-[#fffafc] to-[#fff0f7] text-[#2a1a26] px-5 sm:px-8 md:px-14 py-20 md:py-28 overflow-hidden font-['Outfit',sans-serif] border-t border-[#e83e8c]/10"
    >
      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.3] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#e83e8c 0.75px, transparent 0.75px)",
          backgroundSize: "28px 28px",
        }}
      />
      {/* Soft pink glows in the page (not behind the photo) */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#ff7ab8]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#e83e8c]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10 grid md:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* ── Photo column: slides in from the left ── */}
        <div
          className="md:col-span-5 relative flex justify-center transition-all duration-1000 ease-out"
          style={{
            opacity: visible ? 1 : 0,
            transform: `translateX(${visible ? 0 : -70}px)`,
          }}
        >
          <div
            className="relative w-[260px] sm:w-[330px] md:w-[380px] transition-transform duration-200 ease-out will-change-transform"
            style={{
              transform: `perspective(1000px) rotateY(${tilt.x * 8}deg) rotateX(${-tilt.y * 8}deg)`,
              transformStyle: "preserve-3d",
            }}
          >
            {/* Your photo: transparent PNG at public/about.png.
                For a full-body photo, delete the two mask lines. */}
            <Image
              src="/about.png"
              alt="Devisha Agrawal"
              width={520}
              height={680}
              priority
              className="relative w-full h-auto select-none pointer-events-none drop-shadow-[0_18px_30px_rgba(232,62,140,0.25)]"
              style={{
                transform: "translateZ(25px)",
                maskImage: "linear-gradient(to bottom, black 82%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(to bottom, black 82%, transparent 100%)",
              }}
            />

            {/* Floating code chips */}
            <div className="absolute top-4 -left-2 sm:-left-8 z-20 pointer-events-none" style={{ transform: "translateZ(50px)" }}>
              <div className="animate-float bg-white/95 border border-[#e83e8c]/20 rounded-xl px-3 py-1.5 shadow-lg font-mono text-[10px] sm:text-[11px] font-medium flex items-center gap-2">
                <span className="text-[#e83e8c]">$</span>
                <span className="text-[#2a1a26]">git push</span>
                <span className="text-[#e83e8c]">✓</span>
              </div>
            </div>

            <div className="absolute top-[42%] -right-2 sm:-right-8 z-20 pointer-events-none" style={{ transform: "translateZ(45px)" }}>
              <div className="animate-float bg-white/95 border border-[#e83e8c]/20 rounded-xl px-3 py-1.5 shadow-lg font-mono text-[10px] sm:text-[11px] font-medium flex items-center gap-2" style={{ animationDelay: "1.4s" }}>
                <span className="text-[#e83e8c]">{"</>"}</span>
                <span className="text-[#7a6572]">clean UI</span>
              </div>
            </div>

            <div className="absolute bottom-[26%] -left-2 sm:-left-8 z-20 pointer-events-none" style={{ transform: "translateZ(40px)" }}>
              <div className="animate-float bg-white/95 border border-[#e83e8c]/20 rounded-xl px-3 py-1.5 shadow-lg font-mono text-[10px] sm:text-[11px] font-medium flex items-center gap-2" style={{ animationDelay: "2.6s" }}>
                <span>⚡</span>
                <span className="text-[#2a1a26]">
                  Built <strong>VisualSQL</strong>
                </span>
              </div>
            </div>

            {/* Rotating stamp */}
            <div
              onMouseMove={(e) => handleTilt(e, 18, 1.1)}
              onMouseLeave={resetTilt}
              className="absolute -right-2 -bottom-4 sm:-right-6 sm:-bottom-6 w-24 h-24 sm:w-28 sm:h-28 transition-transform duration-200 ease-out will-change-transform cursor-pointer z-30"
              style={{ transform: "translateZ(60px)", transformStyle: "preserve-3d" }}
            >
              <svg viewBox="0 0 120 120" className="w-full h-full animate-spin-slow overflow-visible">
                <defs>
                  <path id="aboutBadgeCircle" d="M 60,60 m -46,0 a 46,46 0 1,1 92,0 a 46,46 0 1,1 -92,0" />
                </defs>
                <text fill="#e83e8c" fontSize="9" fontWeight="600">
                  <textPath href="#aboutBadgeCircle" startOffset="0" textLength="285" lengthAdjust="spacing">
                    ✦ READABLE CODE ✦ CRAFTED UI ✦
                  </textPath>
                </text>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[#e83e8c] to-[#ff7ab8] text-white text-[10px] font-mono font-semibold flex items-center justify-center shadow-[0_8px_20px_rgba(232,62,140,0.35)]">
                  DA
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Terminal column: slides in from the right ── */}
        <div
          className="md:col-span-7 transition-all duration-1000 ease-out"
          style={{
            opacity: visible ? 1 : 0,
            transform: `translate(${(visible ? 0 : 70) + tilt.x * -6}px, ${tilt.y * -5}px)`,
          }}
        >
          <div className="font-mono text-xs font-semibold tracking-wider text-[#e83e8c] uppercase mb-2">
            About me
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#2a1a26] mb-6 leading-tight">
            Turning ideas into{" "}
            <span className="bg-gradient-to-r from-[#e83e8c] to-[#ff7ab8] bg-clip-text text-transparent">
              working software.
            </span>
          </h2>

          {/* Terminal window */}
          <div className="rounded-2xl overflow-hidden border border-[#e83e8c]/20 bg-white shadow-[0_24px_60px_-14px_rgba(232,62,140,0.3)]">
            {/* Title bar */}
            <div className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-[#fff0f7] to-[#ffe3f0] border-b border-[#e83e8c]/15">
              <span className="w-3 h-3 rounded-full bg-[#e83e8c]" />
              <span className="w-3 h-3 rounded-full bg-[#ff7ab8]" />
              <span className="w-3 h-3 rounded-full bg-[#ffc2de]" />
              <span className="font-mono text-[11px] text-[#7a6572] ml-2 truncate">
                ~/devisha/about
              </span>
            </div>

            {/* File tabs */}
            <div className="flex overflow-x-auto bg-[#fff7fb] border-b border-[#e83e8c]/12">
              {tabs.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id)}
                  className={`shrink-0 px-4 py-2.5 font-mono text-xs border-r border-[#e83e8c]/10 transition-colors ${
                    activeTab === t.id
                      ? "bg-white text-[#e83e8c] font-semibold shadow-[inset_0_-2px_0_#e83e8c]"
                      : "text-[#7a6572] hover:text-[#2a1a26]"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Body */}
            <div className="p-5 sm:p-6 min-h-[320px]">
              {activeTab === "intro" && (
                <div>
                  <div className="font-mono text-[12.5px] sm:text-[13px] leading-6 overflow-x-auto">
                    {lines.map((line, i) => (
                      <div key={i} className="flex">
                        <span className="w-7 shrink-0 select-none text-right pr-3 text-[#e83e8c]/35">
                          {i + 1}
                        </span>
                        <span className="whitespace-pre text-[#2a1a26]">
                          {highlight(line)}
                          {i === lines.length - 1 && (
                            <span className="inline-block w-[7px] h-[1.15em] bg-[#e83e8c] align-middle ml-0.5 animate-blink" />
                          )}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Output after the code finishes typing */}
                  <div
                    className={`mt-4 pt-4 border-t border-dashed border-[#e83e8c]/25 font-mono text-[12.5px] sm:text-[13px] transition-all duration-500 ${
                      done ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                    }`}
                  >
                    <span className="text-[#e83e8c]">›</span>{" "}
                    <span className="text-[#2a1a26]">{helloLine}</span>
                  </div>

                  <button
                    onClick={() => setRunKey((k) => k + 1)}
                    className="mt-4 font-mono text-xs text-[#e83e8c] hover:text-[#c2255c] px-3 py-1.5 rounded-lg border border-[#e83e8c]/25 hover:bg-[#e83e8c]/5 transition-all"
                  >
                    ↻ replay intro
                  </button>
                </div>
              )}

              {activeTab === "story" && (
                <div>
                  {/* Replace this paragraph with your own story */}
                  <p className="text-[#7a6572] text-[15px] leading-relaxed mb-6">
                    I’m Devisha, a developer who enjoys the space where{" "}
                    <strong className="text-[#2a1a26]">solid engineering</strong> meets{" "}
                    <strong className="text-[#2a1a26]">thoughtful design</strong>. I like
                    building projects end to end, from computer vision and databases to
                    clean, responsive web interfaces that are easy to use.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {traits.map((t) => (
                      <div
                        key={t.label}
                        onMouseMove={(e) => handleTilt(e, 8, 1.02)}
                        onMouseLeave={resetTilt}
                        className="bg-[#fff7fb] border border-[#e83e8c]/12 rounded-xl p-4 transition-colors duration-200 hover:border-[#e83e8c]/40 hover:bg-white will-change-transform"
                        style={{ transformStyle: "preserve-3d" }}
                      >
                        <div className="text-xl mb-1">{t.icon}</div>
                        <div className="font-semibold text-sm text-[#2a1a26] mb-0.5">{t.label}</div>
                        <div className="text-xs text-[#7a6572]">{t.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "stack" && (
                <div>
                  <div className="font-mono text-xs text-[#7a6572] mb-3">
                    <span className="text-[#e83e8c]">{"// "}</span>tools I work with
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {stack.map((s) => (
                      <span
                        key={s}
                        className="font-mono text-xs px-3 py-1.5 rounded-lg bg-[#fff0f7] hover:bg-white text-[#2a1a26] border border-[#e83e8c]/15 transition-all hover:border-[#e83e8c]/45 hover:-translate-y-0.5 cursor-default"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Status bar */}
            <div className="flex items-center justify-between px-4 py-2 bg-gradient-to-r from-[#e83e8c] to-[#ff7ab8] text-white font-mono text-[10.5px]">
              <span className="flex items-center gap-3">
                <span>⎇ main</span>
                <span>✓ no errors</span>
              </span>
              <span className="hidden sm:inline">
                {activeTab === "intro" ? `Ln ${lines.length}, Col ${lastLine.length + 1}` : "UTF-8"}
              </span>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap items-center gap-4 mt-6">
            <a
              href="#projects"
              onMouseMove={(e) => handleTilt(e, 8, 1.04)}
              onMouseLeave={resetTilt}
              className="bg-gradient-to-r from-[#e83e8c] to-[#ff7ab8] text-white text-xs font-medium px-6 py-3 rounded-xl shadow-[0_8px_20px_-4px_rgba(232,62,140,0.4)] hover:brightness-105 transition-all flex items-center gap-2 will-change-transform"
              style={{ transformStyle: "preserve-3d" }}
            >
              <span>View projects</span>
              <span>→</span>
            </a>
            <button
              onClick={copyEmail}
              className="font-mono text-xs text-[#7a6572] hover:text-[#2a1a26] px-4 py-2.5 rounded-xl border border-[#e83e8c]/20 hover:border-[#e83e8c]/45 transition-all bg-white"
            >
              {copied ? "✓ Copied!" : "📋 Copy email"}
            </button>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow { animation: spin-slow 10s linear infinite; }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-7px); }
        }
        .animate-float { animation: float 4s ease-in-out infinite; }
        @keyframes blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
        .animate-blink { animation: blink 1s steps(1) infinite; }
        @media (prefers-reduced-motion: reduce) {
          .animate-spin-slow, .animate-float, .animate-blink { animation: none; }
        }
      `}</style>
    </section>
  );
}