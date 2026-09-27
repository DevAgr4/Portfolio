"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<"story" | "code">("story");
  const [copied, setCopied] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  // ── Intersection Observer for Entrance Animation ──
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

  // ── Cursor Parallax Tracking ──
  const handleSectionMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = sectionRef.current?.getBoundingClientRect();

    if (!rect) return;

    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    setTilt({ x, y });
  };

  const resetSection = () => setTilt({ x: 0, y: 0 });

  // ── 3D Tilt for Interactive Elements ──
  const handleTilt = (
    e: React.MouseEvent<HTMLElement>,
    max = 12,
    lift = 1.04
  ) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();

    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;

    el.style.transform = `perspective(600px) rotateY(${
      px * max
    }deg) rotateX(${-py * max}deg) scale(${lift})`;
  };

  const resetTilt = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.transform =
      "perspective(600px) rotateY(0deg) rotateX(0deg) scale(1)";
  };

  // ── Copy Email ──
  const copyEmail = () => {
    navigator.clipboard.writeText("devishaagrawal@gmail.com");
    setCopied(true);

    setTimeout(() => setCopied(false), 2000);
  };

  const traits = [
    {
      icon: "⚡",
      label: "Full-Stack Craft",
      desc: "React, Next.js 15 & scalable Node backends",
    },
    {
      icon: "✨",
      label: "Motion & Polish",
      desc: "Silky 60fps micro-interactions & fluid UI",
    },
    {
      icon: "🚀",
      label: "Performance First",
      desc: "Sub-second load times & 99+ Lighthouse",
    },
    {
      icon: "🔮",
      label: "AI & Innovation",
      desc: "Modern LLMs, agents & generative tooling",
    },
  ];

  const stack = [
    "TypeScript",
    "React",
    "Next.js",
    "TailwindCSS",
    "Node.js",
    "Python / AI",
    "PostgreSQL",
    "Framer Motion",
    "Git",
    "Figma",
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      onMouseMove={handleSectionMove}
      onMouseLeave={resetSection}
      className="relative bg-[#f8f7f4] text-[#121214] px-6 md:px-14 py-20 md:py-28 overflow-hidden font-['Outfit',sans-serif] border-t border-[#121214]/8"
    >
      {/* Background Dot Matrix Pattern */}
      <div
        className="absolute inset-0 opacity-[0.45] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(#121214 0.75px, transparent 0.75px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10 grid md:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* ── Left Side: Photo with 3D Tilt, Floating Badges & Rotating Stamp ── */}
        <div className="md:col-span-5 relative flex justify-center">
          <div
            className="relative w-[280px] sm:w-[330px] md:w-[360px] transition-transform duration-200 ease-out will-change-transform"
            style={{
              transform: `perspective(1000px) rotateY(${
                tilt.x * 10
              }deg) rotateX(${-tilt.y * 10}deg)`,
              transformStyle: "preserve-3d",
            }}
          >
            {/* Ambient Shadow */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#8b5cf6]/15 via-[#ec4899]/15 to-transparent rounded-3xl blur-2xl transform rotate-2 scale-95" />

            {/* Photo Card Frame */}
            <div
              className="relative rounded-3xl overflow-hidden border border-[#121214]/10 bg-white/70 backdrop-blur-md p-2 shadow-[0_20px_45px_-10px_rgba(18,18,20,0.15)]"
              style={{ transform: "translateZ(25px)" }}
            >
              <Image
                src="/about.jpg"
                alt="About Devisha Agrawal"
                width={360}
                height={450}
                className="w-full h-auto object-cover rounded-2xl select-none pointer-events-none"
              />
            </div>

            {/* Floating Commits Badge: Top Left */}
            <div
              className="absolute -top-4 -left-4 bg-white/90 backdrop-blur-md border border-[#121214]/10 rounded-2xl px-3.5 py-2 shadow-lg flex items-center gap-2 font-mono text-[11px] font-medium"
              style={{ transform: "translateZ(50px)" }}
            >
              <span>⌨️</span>
              <span className="text-[#121214]">
                <strong>2.8k+</strong> git commits
              </span>
            </div>

            {/* Rotating Stamp Motif */}
            <div
              onMouseMove={(e) => handleTilt(e, 18, 1.1)}
              onMouseLeave={resetTilt}
              className="absolute -right-6 -bottom-6 w-28 h-28 transition-transform duration-200 ease-out will-change-transform cursor-pointer"
              style={{
                transform: "translateZ(60px)",
                transformStyle: "preserve-3d",
              }}
            >
              <svg
                viewBox="0 0 120 120"
                className="w-full h-full animate-spin-slow"
              >
                <defs>
                  <path
                    id="aboutBadgeCircle"
                    d="M 60,60 m -46,0 a 46,46 0 1,1 92,0 a 46,46 0 1,1 -92,0"
                  />
                </defs>

                <text
                  fill="#121214"
                  fontSize="9.5"
                  fontWeight="600"
                  letterSpacing="1.8"
                >
                  <textPath
                    href="#aboutBadgeCircle"
                    startOffset="0%"
                  >
                    ✦ READABLE CODE ✦ CRAFTED UI ✦
                  </textPath>
                </text>
              </svg>

              <div className="absolute inset-0 flex items-center justify-center">
                <span className="w-12 h-12 rounded-full bg-[#121214] text-white text-[10px] font-mono font-semibold flex items-center justify-center shadow-md">
                  100%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Right Side: Story & Terminal IDE Card ── */}
        <div
          className="md:col-span-7 transition-all duration-700 ease-out"
          style={{
            transform: `translate(${tilt.x * -6}px, ${
              tilt.y * -5
            }px)`,
            opacity: visible ? 1 : 0,
          }}
        >
          {/* Card Container */}
          <div className="bg-white/80 backdrop-blur-md border border-[#121214]/10 rounded-3xl p-6 sm:p-10 shadow-[0_16px_40px_-10px_rgba(18,18,20,0.08)]">
            {/* Terminal Header Bar with Tab Controls */}
            <div className="flex items-center justify-between pb-5 border-b border-[#121214]/8 mb-7">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#f43f5e]" />
                <span className="w-3 h-3 rounded-full bg-[#eab308]" />
                <span className="w-3 h-3 rounded-full bg-[#10b981]" />

                <span className="font-mono text-xs text-[#71717a] ml-2">
                  ~/developer/about.tsx
                </span>
              </div>

              {/* Story vs Code Toggle */}
              <div className="flex bg-[#f3f2ee] p-1 rounded-full border border-[#121214]/8">
                <button
                  onClick={() => setActiveTab("story")}
                  className={`px-3 py-1 text-xs font-mono rounded-full transition-all ${
                    activeTab === "story"
                      ? "bg-white text-[#121214] shadow-sm font-semibold"
                      : "text-[#71717a] hover:text-[#121214]"
                  }`}
                >
                  Story
                </button>

                <button
                  onClick={() => setActiveTab("code")}
                  className={`px-3 py-1 text-xs font-mono rounded-full transition-all ${
                    activeTab === "code"
                      ? "bg-white text-[#121214] shadow-sm font-semibold"
                      : "text-[#71717a] hover:text-[#121214]"
                  }`}
                >
                  bio.ts
                </button>
              </div>
            </div>

            {/* Header / Subtitle */}
            <div className="font-mono text-xs font-semibold tracking-wider text-[#ec4899] uppercase mb-2">
              ✦ About Me
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#121214] mb-4">
              Turning complex problems into{" "}
              <span className="bg-gradient-to-r from-[#ec4899] to-[#8b5cf6] bg-clip-text text-transparent">
                effortless code.
              </span>
            </h2>

            {/* TAB CONTENT: Story View */}
            {activeTab === "story" ? (
              <>
                <p className="text-[#52525b] text-[15px] leading-relaxed mb-8">
                  I’m a software engineer who loves the sweet spot where{" "}
                  <strong>bulletproof engineering</strong> meets{" "}
                  <strong>thoughtful, modern design</strong>. From
                  structuring scalable backend systems in Next.js and Node,
                  to tuning 60fps animations in Framer Motion, I build
                  products that are fast, intuitive, and visually memorable.
                </p>

                {/* Traits Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-8">
                  {traits.map((t) => (
                    <div
                      key={t.label}
                      onMouseMove={(e) => handleTilt(e, 8, 1.02)}
                      onMouseLeave={resetTilt}
                      className="bg-[#faf9f6] border border-[#121214]/8 rounded-2xl p-4 transition-all duration-200 hover:border-[#ec4899]/40 hover:bg-white will-change-transform"
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      <div className="text-xl mb-1.5">{t.icon}</div>

                      <div className="font-semibold text-sm text-[#121214] mb-0.5">
                        {t.label}
                      </div>

                      <div className="text-xs text-[#71717a]">
                        {t.desc}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              /* TAB CONTENT: Interactive Code View */
              <div className="bg-[#141416] text-[#e4e4e7] p-5 rounded-2xl font-mono text-xs leading-relaxed mb-8 border border-black/10 overflow-x-auto shadow-inner">
                <pre>
                  <code>
                    <span className="text-[#f43f5e]">const</span>{" "}
                    <span className="text-[#38bdf8]">
                      developer
                    </span>{" "}
                    = &#123;{"\n"}
                    {"  "}name:{" "}
                    <span className="text-[#a7f3d0]">
                      &quot;Devisha Agrawal&quot;
                    </span>
                    ,{"\n"}
                    {"  "}handle:{" "}
                    <span className="text-[#a7f3d0]">
                      &quot;@devishaagrawal&quot;
                    </span>
                    ,{"\n"}
                    {"  "}email:{" "}
                    <span className="text-[#a7f3d0]">
                      &quot;devishaagrawal@gmail.com&quot;
                    </span>
                    ,{"\n"}
                    {"  "}stack: [
                    <span className="text-[#a7f3d0]">
                      &quot;Next.js 15&quot;
                    </span>
                    ,{" "}
                    <span className="text-[#a7f3d0]">
                      &quot;TypeScript&quot;
                    </span>
                    ,{" "}
                    <span className="text-[#a7f3d0]">
                      &quot;Tailwind&quot;
                    </span>
                    ],{"\n"}
                    {"  "}coffeeCup:{" "}
                    <span className="text-[#fbbf24]">
                      &quot;Espresso &amp; Oat Milk&quot;
                    </span>
                    ,{"\n"}
                    {"  "}superpower:{" "}
                    <span className="text-[#a7f3d0]">
                      &quot;Turning caffeine into clean architecture
                      ✨&quot;
                    </span>
                    ,{"\n"}
                    {"  "}openForRoles:{" "}
                    <span className="text-[#818cf8]">true</span>
                    {"\n"}
                    &#125;;
                  </code>
                </pre>
              </div>
            )}

            {/* Stack Pills */}
            <div className="font-mono text-xs uppercase tracking-wider text-[#71717a] mb-3">
              Tools &amp; Technologies
            </div>

            <div className="flex flex-wrap gap-2 mb-8">
              {stack.map((s) => (
                <span
                  key={s}
                  className="font-mono text-xs px-3 py-1.5 rounded-xl bg-[#f3f2ee] hover:bg-white text-[#121214] border border-[#121214]/10 transition-all hover:border-[#ec4899]/40 hover:-translate-y-0.5 cursor-default"
                >
                  {s}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#projects"
                onMouseMove={(e) => handleTilt(e, 8, 1.04)}
                onMouseLeave={resetTilt}
                className="bg-[#121214] text-white text-xs font-medium px-6 py-3 rounded-xl shadow-md hover:bg-black transition-all flex items-center gap-2 will-change-transform"
                style={{ transformStyle: "preserve-3d" }}
              >
                <span>View Projects</span>
                <span>→</span>
              </a>

              <button
                onClick={copyEmail}
                className="font-mono text-xs text-[#52525b] hover:text-[#121214] px-4 py-2.5 rounded-xl border border-[#121214]/10 hover:border-[#121214]/25 transition-all bg-white"
              >
                {copied ? "✓ Copied!" : "📋 Copy Email"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}