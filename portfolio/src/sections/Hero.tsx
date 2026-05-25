"use client";

import { useEffect, useState, useRef } from "react";

const roles = [
  "Creative Developer",
  "UI/UX Designer",
  "Frontend Engineer",
  "Digital Craftsman",
];

const floatingShapes = [
  { size: 320, top: "8%",  left: "-6%",  delay: "0s",   duration: "18s", opacity: 0.13 },
  { size: 200, top: "60%", left: "80%",  delay: "3s",   duration: "14s", opacity: 0.10 },
  { size: 140, top: "75%", left: "10%",  delay: "1.5s", duration: "20s", opacity: 0.08 },
  { size: 90,  top: "20%", left: "75%",  delay: "0.5s", duration: "12s", opacity: 0.12 },
  { size: 60,  top: "45%", left: "50%",  delay: "4s",   duration: "16s", opacity: 0.07 },
];

export default function Hero() {
  const [roleIndex, setRoleIndex]   = useState(0);
  const [displayed, setDisplayed]   = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex]   = useState(0);
  const [visible, setVisible]       = useState(false);

  // Mouse parallax
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  // Scroll progress 0–1
  const [scrollProgress, setScrollProgress] = useState(0);
  // Custom cursor
  const [cursor, setCursor] = useState({ x: -100, y: -100 });
  const [cursorHover, setCursorHover] = useState(false);

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  /* ── Fade-in ── */
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  /* ── Typewriter ── */
  useEffect(() => {
    const current = roles[roleIndex];
    if (!isDeleting && charIndex <= current.length) {
      setDisplayed(current.slice(0, charIndex));
      timeoutRef.current = setTimeout(() => setCharIndex(c => c + 1), 80);
    } else if (!isDeleting && charIndex > current.length) {
      timeoutRef.current = setTimeout(() => setIsDeleting(true), 1800);
    } else if (isDeleting && charIndex >= 0) {
      setDisplayed(current.slice(0, charIndex));
      timeoutRef.current = setTimeout(() => setCharIndex(c => c - 1), 45);
    } else {
      setIsDeleting(false);
      setRoleIndex(i => (i + 1) % roles.length);
      setCharIndex(0);
    }
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, [charIndex, isDeleting, roleIndex]);

  /* ── Mouse parallax + custom cursor ── */
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const cx = (e.clientX / window.innerWidth  - 0.5) * 2;  // -1 to 1
      const cy = (e.clientY / window.innerHeight - 0.5) * 2;
      setMouse({ x: cx, y: cy });
      setCursor({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  /* ── Scroll progress ── */
  useEffect(() => {
    const onScroll = () => {
      const section = sectionRef.current;
      if (!section) return;
      const h = section.offsetHeight;
      const p = Math.min(window.scrollY / h, 1);
      setScrollProgress(p);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Cursor hover detection on interactive elements ── */
  useEffect(() => {
    const els = document.querySelectorAll("a, button, .stat-item");
    const on  = () => setCursorHover(true);
    const off = () => setCursorHover(false);
    els.forEach(el => { el.addEventListener("mouseenter", on); el.addEventListener("mouseleave", off); });
    return () => els.forEach(el => { el.removeEventListener("mouseenter", on); el.removeEventListener("mouseleave", off); });
  }, [visible]);

  // Parallax helpers
  const px = (factor: number) => `${mouse.x * factor}px`;
  const py = (factor: number) => `${mouse.y * factor}px`;

  // Scroll-driven fade/scale for content
  const contentOpacity  = Math.max(0, 1 - scrollProgress * 2.2);
  const contentScale    = Math.max(0.88, 1 - scrollProgress * 0.12);
  const contentTranslateY = scrollProgress * -60;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&family=DM+Sans:wght@300;400;500&display=swap');

        *, *::before, *::after { cursor: none !important; }

        .custom-cursor {
          position: fixed;
          pointer-events: none;
          z-index: 99999;
          mix-blend-mode: multiply;
          transition: width 0.25s ease, height 0.25s ease, background 0.25s ease, opacity 0.25s ease;
        }

        .cursor-dot {
          width: 8px;
          height: 8px;
          background: #c0445c;
          border-radius: 50%;
          transform: translate(-50%, -50%);
        }

        .cursor-ring {
          width: 36px;
          height: 36px;
          border: 1.5px solid rgba(192, 68, 92, 0.5);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          transition: width 0.3s ease, height 0.3s ease, border-color 0.3s ease, transform 0.1s ease;
        }

        .cursor-ring.hovered {
          width: 56px;
          height: 56px;
          border-color: rgba(192, 68, 92, 0.8);
          background: rgba(192, 68, 92, 0.06);
        }

        .hero-section {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: linear-gradient(155deg, #fff5f7 0%, #fdf6f0 40%, #fef9fb 70%, #fff0f4 100%);
          padding: 100px 24px 60px;
        }

        .hero-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(60px);
          pointer-events: none;
          will-change: transform;
          transition: transform 0.12s ease-out;
        }

        .hero-ring {
          position: absolute;
          border-radius: 50%;
          border: 1.5px solid rgba(192, 68, 92, 0.18);
          pointer-events: none;
          will-change: transform;
          transition: transform 0.18s ease-out;
        }

        .hero-grain {
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
          opacity: 0.4;
          pointer-events: none;
        }

        .hero-content {
          position: relative;
          z-index: 10;
          text-align: center;
          max-width: 780px;
          width: 100%;
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.9s cubic-bezier(0.4,0,0.2,1), transform 0.9s cubic-bezier(0.4,0,0.2,1);
          will-change: transform, opacity;
        }

        .hero-content.visible { opacity: 1; transform: translateY(0); }

        .hero-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #c0445c;
          background: rgba(192, 68, 92, 0.07);
          border: 1px solid rgba(192, 68, 92, 0.18);
          padding: 7px 18px;
          border-radius: 999px;
          margin-bottom: 28px;
          animation: fadeSlideUp 0.7s 0.2s both;
        }

        .eyebrow-dot {
          width: 6px; height: 6px;
          background: #c0445c;
          border-radius: 50%;
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.5; transform: scale(0.75); }
        }

        .hero-heading {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(44px, 8vw, 88px);
          font-weight: 600;
          line-height: 1.06;
          color: #2e1420;
          letter-spacing: -0.02em;
          margin-bottom: 0;
          animation: fadeSlideUp 0.7s 0.35s both;
          will-change: transform;
          transition: transform 0.1s ease-out;
        }

        .hero-heading em { font-style: italic; color: #c0445c; }

        .typewriter-row {
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 12px 0 28px;
          animation: fadeSlideUp 0.7s 0.5s both;
          min-height: 56px;
        }

        .typewriter-label {
          font-family: 'DM Sans', sans-serif;
          font-size: clamp(14px, 2.5vw, 18px);
          color: #b07080;
          font-weight: 300;
          margin-right: 10px;
          white-space: nowrap;
        }

        .typewriter-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(22px, 4.5vw, 42px);
          font-weight: 600;
          color: #c0445c;
          letter-spacing: -0.01em;
        }

        .typewriter-cursor {
          display: inline-block;
          width: 2.5px;
          height: 1em;
          background: #c0445c;
          border-radius: 2px;
          margin-left: 3px;
          vertical-align: middle;
          animation: blink 0.85s step-end infinite;
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }

        .hero-desc {
          font-family: 'DM Sans', sans-serif;
          font-size: clamp(15px, 2vw, 18px);
          font-weight: 300;
          color: #9a6070;
          line-height: 1.75;
          max-width: 520px;
          margin: 0 auto 40px;
          animation: fadeSlideUp 0.7s 0.65s both;
        }

        .hero-cta-group {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
          flex-wrap: wrap;
          animation: fadeSlideUp 0.7s 0.8s both;
        }

        .btn-primary {
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 500;
          color: #fff;
          background: linear-gradient(135deg, #e07090 0%, #c0445c 100%);
          padding: 14px 32px;
          border-radius: 999px;
          border: none;
          cursor: none;
          letter-spacing: 0.04em;
          box-shadow: 0 4px 24px rgba(192,68,92,0.28);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        .btn-primary:hover {
          transform: translateY(-2px) scale(1.03);
          box-shadow: 0 10px 32px rgba(192,68,92,0.34);
        }

        .btn-arrow {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 22px; height: 22px;
          background: rgba(255,255,255,0.22);
          border-radius: 50%;
          font-size: 13px;
          transition: transform 0.2s ease;
        }

        .btn-primary:hover .btn-arrow { transform: translateX(3px); }

        .btn-secondary {
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 400;
          color: #b03555;
          background: transparent;
          padding: 14px 28px;
          border-radius: 999px;
          border: 1.5px solid rgba(192,68,92,0.28);
          cursor: none;
          letter-spacing: 0.04em;
          transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
          text-decoration: none;
        }

        .btn-secondary:hover {
          background: rgba(192,68,92,0.06);
          border-color: rgba(192,68,92,0.5);
          transform: translateY(-2px);
        }

        /* ── Scroll progress bar ── */
        .scroll-progress-bar {
          position: fixed;
          top: 0; left: 0;
          height: 2.5px;
          background: linear-gradient(90deg, #e07090, #c0445c);
          z-index: 9999;
          transition: width 0.05s linear;
          border-radius: 0 2px 2px 0;
          box-shadow: 0 0 8px rgba(192,68,92,0.4);
        }

        /* ── Scroll mouse widget ── */
        .scroll-mouse {
          position: absolute;
          bottom: 36px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          animation: fadeSlideUp 0.7s 1.2s both;
          z-index: 20;
        }

        .mouse-body {
          width: 24px;
          height: 38px;
          border: 1.5px solid rgba(192,68,92,0.45);
          border-radius: 12px;
          display: flex;
          justify-content: center;
          padding-top: 6px;
          background: rgba(255,255,255,0.3);
          backdrop-filter: blur(4px);
        }

        .mouse-wheel {
          width: 3px;
          height: 7px;
          background: #c0445c;
          border-radius: 99px;
          animation: mouseScroll 1.8s ease-in-out infinite;
        }

        @keyframes mouseScroll {
          0%   { opacity: 1; transform: translateY(0); }
          60%  { opacity: 0; transform: translateY(10px); }
          61%  { opacity: 0; transform: translateY(0); }
          100% { opacity: 1; transform: translateY(0); }
        }

        .scroll-arrows {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2px;
        }

        .scroll-arrow {
          width: 8px;
          height: 8px;
          border-right: 1.5px solid rgba(192,68,92,0.5);
          border-bottom: 1.5px solid rgba(192,68,92,0.5);
          transform: rotate(45deg);
          animation: arrowFade 1.8s ease-in-out infinite;
        }

        .scroll-arrow:nth-child(2) { animation-delay: 0.2s; opacity: 0.6; }
        .scroll-arrow:nth-child(3) { animation-delay: 0.4s; opacity: 0.3; }

        @keyframes arrowFade {
          0%, 100% { opacity: 0.2; }
          50%       { opacity: 1; }
        }

        .hero-stats {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 64px;
          animation: fadeSlideUp 0.7s 1s both;
        }

        .stat-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 0 32px;
          position: relative;
        }

        .stat-item:not(:last-child)::after {
          content: '';
          position: absolute;
          right: 0; top: 50%;
          transform: translateY(-50%);
          height: 36px; width: 1px;
          background: rgba(192,68,92,0.18);
        }

        .stat-number {
          font-family: 'Cormorant Garamond', serif;
          font-size: 36px;
          font-weight: 600;
          color: #c0445c;
          line-height: 1;
        }

        .stat-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          font-weight: 400;
          color: #b07080;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-top: 4px;
        }

        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 600px) {
          .hero-section { padding: 110px 20px 90px; }
          .typewriter-row { flex-wrap: wrap; gap: 4px; }
          .stat-item { padding: 0 18px; }
          .stat-number { font-size: 28px; }
          .custom-cursor { display: none; }
          *, *::before, *::after { cursor: auto !important; }
        }

        @media (max-width: 400px) {
          .hero-cta-group { flex-direction: column; width: 100%; }
          .btn-primary, .btn-secondary { width: 100%; justify-content: center; }
          .stat-item { padding: 0 12px; }
        }
      `}</style>

      {/* ── Scroll progress bar ── */}
      <div
        className="scroll-progress-bar"
        style={{ width: `${scrollProgress * 100}%` }}
      />

      {/* ── Custom cursor ── */}
      <div
        className="custom-cursor cursor-dot"
        style={{ left: cursor.x, top: cursor.y }}
      />
      <div
        className={`custom-cursor cursor-ring ${cursorHover ? "hovered" : ""}`}
        style={{
          left: cursor.x,
          top: cursor.y,
          // lag behind for ring effect
          transitionDuration: cursorHover ? "0.3s" : "0.15s",
        }}
      />

      <section id="home" className="hero-section" ref={sectionRef}>

        {/* ── Blobs — parallax ── */}
        <div
          className="hero-blob"
          style={{
            width: 500, height: 500,
            top: "-10%", left: "-8%",
            background: "radial-gradient(circle, rgba(244,184,200,0.35) 0%, transparent 70%)",
            transform: `translate(${px(18)}, ${py(14)})`,
          }}
        />
        <div
          className="hero-blob"
          style={{
            width: 380, height: 380,
            bottom: "0%", right: "-5%",
            background: "radial-gradient(circle, rgba(255,220,200,0.28) 0%, transparent 70%)",
            transform: `translate(${px(-14)}, ${py(-10)})`,
          }}
        />
        <div
          className="hero-blob"
          style={{
            width: 240, height: 240,
            top: "55%", left: "40%",
            background: "radial-gradient(circle, rgba(255,192,210,0.18) 0%, transparent 70%)",
            transform: `translate(${px(8)}, ${py(6)})`,
          }}
        />

        {/* ── Rings — parallax ── */}
        {floatingShapes.map((s, i) => (
          <div
            key={i}
            className="hero-ring"
            style={{
              width: s.size, height: s.size,
              top: s.top, left: s.left,
              opacity: s.opacity,
              transform: `translate(${px((i + 1) * 5)}, ${py((i + 1) * 4)})`,
            }}
          />
        ))}

        <div className="hero-grain" />

        {/* ── Content — scroll parallax ── */}
        <div
          className={`hero-content ${visible ? "visible" : ""}`}
          style={{
            opacity: visible ? contentOpacity : 0,
            transform: visible
              ? `translateY(${contentTranslateY}px) scale(${contentScale})`
              : "translateY(28px)",
          }}
        >
          <div className="hero-eyebrow">
            <span className="eyebrow-dot" />
            Welcome to my portfolio
          </div>

          <h1
            className="hero-heading"
            style={{ transform: `translate(${px(-6)}, ${py(-4)})` }}
          >
            Crafting <em>beautiful</em>
            <br />digital experiences
          </h1>

          <div className="typewriter-row">
            <span className="typewriter-label">I am a —</span>
            <span className="typewriter-text">
              {displayed}
              <span className="typewriter-cursor" aria-hidden="true" />
            </span>
          </div>

          <p className="hero-desc">
            I design and build elegant interfaces with modern technologies,
            turning complex ideas into intuitive, memorable user experiences.
          </p>

          <div className="hero-cta-group">
            <a href="#projects" className="btn-primary">
              Explore Projects
              <span className="btn-arrow">→</span>
            </a>
            <a href="#contact" className="btn-secondary">
              Get in touch
            </a>
          </div>

          <div className="hero-stats">
            {[
              { number: "3+", label: "Projects" },
              { number: "1+", label: "Years Exp." },
            ].map((s) => (
              <div key={s.label} className="stat-item">
                <span className="stat-number">{s.number}</span>
                <span className="stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Scroll mouse widget ── */}
        <div className="scroll-mouse" aria-hidden="true">
          <div className="mouse-body">
            <div className="mouse-wheel" />
          </div>
          <div className="scroll-arrows">
            <div className="scroll-arrow" />
            <div className="scroll-arrow" />
            <div className="scroll-arrow" />
          </div>
        </div>

      </section>
    </>
  );
}