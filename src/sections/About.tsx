"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function About() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const traits = [
    { icon: "✦", label: "Clean Code",       desc: "Readable, maintainable, scalable" },
    { icon: "◈", label: "Modern Design",     desc: "Pixel-perfect, aesthetic UI" },
    { icon: "⟡", label: "Performance",       desc: "Fast, optimized experiences" },
    { icon: "◎", label: "Accessibility",     desc: "Inclusive by default" },
  ];

  const stack = ["React", "Next.js", "TypeScript", "Tailwind", "Figma", "Node.js"];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&family=DM+Sans:wght@300;400;500&display=swap');

        .about-section {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: stretch;
          overflow: hidden;
          background: linear-gradient(155deg, #fff5f7 0%, #fdf6f0 40%, #fef9fb 70%, #fff0f4 100%);
        }

        /* ── Left: image flush to background ── */
        .about-image-side {
          position: relative;
          width: 48%;
          flex-shrink: 0;
          overflow: hidden;
        }

        .about-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
          display: block;
        }

        /* Soft right-edge fade so image bleeds into the glass panel */
        .about-image-side::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to right,
            transparent 55%,
            rgba(253,246,240,0.55) 78%,
            rgba(253,246,240,0.92) 100%
          );
          pointer-events: none;
        }

        /* Subtle top/bottom fade */
        .about-image-side::before {
          content: '';
          position: absolute;
          inset: 0;
          z-index: 1;
          background:
            linear-gradient(to bottom, rgba(255,245,247,0.5) 0%, transparent 12%),
            linear-gradient(to top,    rgba(255,240,244,0.5) 0%, transparent 12%);
          pointer-events: none;
        }

        /* ── Right: glass card ── */
        .about-glass-side {
          flex: 1;
          display: flex;
          align-items: center;
          padding: 80px 56px 80px 40px;
          position: relative;
          z-index: 10;
        }

        .glass-panel {
          background: rgba(255, 250, 252, 0.55);
          backdrop-filter: blur(22px) saturate(1.5);
          -webkit-backdrop-filter: blur(22px) saturate(1.5);
          border: 1px solid rgba(244, 184, 200, 0.22);
          border-radius: 28px;
          padding: 52px 44px;
          width: 100%;
          max-width: 520px;
          box-shadow:
            0 8px 48px rgba(192,68,92,0.07),
            inset 0 1px 0 rgba(255,255,255,0.7);
          opacity: 0;
          transform: translateX(40px);
          transition: opacity 0.9s cubic-bezier(0.4,0,0.2,1) 0.2s,
                      transform 0.9s cubic-bezier(0.4,0,0.2,1) 0.2s;
        }

        .glass-panel.visible {
          opacity: 1;
          transform: translateX(0);
        }

        /* Section label */
        .about-label {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #c0445c;
          margin-bottom: 20px;
          opacity: 0;
          transform: translateY(12px);
          transition: opacity 0.6s 0.4s both, transform 0.6s 0.4s both;
        }

        .about-label.visible { opacity: 1; transform: translateY(0); }

        .label-line {
          width: 28px;
          height: 1px;
          background: #c0445c;
          border-radius: 1px;
        }

        /* Heading */
        .about-heading {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(36px, 4vw, 56px);
          font-weight: 600;
          line-height: 1.08;
          color: #2e1420;
          letter-spacing: -0.02em;
          margin-bottom: 6px;
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.7s 0.5s both, transform 0.7s 0.5s both;
        }

        .about-heading.visible { opacity: 1; transform: translateY(0); }
        .about-heading em { font-style: italic; color: #c0445c; }

        /* Name accent */
        .about-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(18px, 2.2vw, 26px);
          font-weight: 400;
          font-style: italic;
          color: #b07080;
          margin-bottom: 24px;
          display: block;
          opacity: 0;
          transition: opacity 0.6s 0.6s both;
        }

        .about-name.visible { opacity: 1; }

        /* Divider */
        .about-divider {
          width: 48px;
          height: 1.5px;
          background: linear-gradient(to right, #c0445c, transparent);
          border-radius: 1px;
          margin-bottom: 24px;
          opacity: 0;
          transition: opacity 0.6s 0.65s both, width 0.8s 0.65s both;
        }

        .about-divider.visible { opacity: 1; width: 48px; }

        /* Bio text */
        .about-bio {
          font-family: 'DM Sans', sans-serif;
          font-size: clamp(14px, 1.5vw, 16px);
          font-weight: 300;
          color: #7a4858;
          line-height: 1.85;
          margin-bottom: 32px;
          opacity: 0;
          transform: translateY(12px);
          transition: opacity 0.7s 0.7s both, transform 0.7s 0.7s both;
        }

        .about-bio.visible { opacity: 1; transform: translateY(0); }

        /* Traits grid */
        .traits-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-bottom: 32px;
          opacity: 0;
          transform: translateY(12px);
          transition: opacity 0.7s 0.85s both, transform 0.7s 0.85s both;
        }

        .traits-grid.visible { opacity: 1; transform: translateY(0); }

        .trait-card {
          background: rgba(255,255,255,0.5);
          border: 1px solid rgba(192,68,92,0.12);
          border-radius: 14px;
          padding: 14px 16px;
          transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
        }

        .trait-card:hover {
          background: rgba(255,255,255,0.75);
          border-color: rgba(192,68,92,0.28);
          transform: translateY(-2px);
        }

        .trait-icon {
          font-size: 16px;
          color: #c0445c;
          margin-bottom: 6px;
          display: block;
        }

        .trait-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          color: #2e1420;
          display: block;
          margin-bottom: 2px;
        }

        .trait-desc {
          font-family: 'DM Sans', sans-serif;
          font-size: 11.5px;
          font-weight: 300;
          color: #a07080;
          display: block;
        }

        /* Stack pills */
        .stack-row {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 36px;
          opacity: 0;
          transform: translateY(12px);
          transition: opacity 0.7s 1s both, transform 0.7s 1s both;
        }

        .stack-row.visible { opacity: 1; transform: translateY(0); }

        .stack-pill {
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 400;
          color: #b03555;
          background: rgba(192,68,92,0.07);
          border: 1px solid rgba(192,68,92,0.18);
          padding: 5px 14px;
          border-radius: 999px;
          letter-spacing: 0.04em;
          transition: background 0.2s, border-color 0.2s, transform 0.2s;
        }

        .stack-pill:hover {
          background: rgba(192,68,92,0.13);
          border-color: rgba(192,68,92,0.4);
          transform: translateY(-1px);
        }

        /* CTA */
        .about-cta-row {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          opacity: 0;
          transform: translateY(12px);
          transition: opacity 0.7s 1.1s both, transform 0.7s 1.1s both;
        }

        .about-cta-row.visible { opacity: 1; transform: translateY(0); }

        .btn-primary {
          font-family: 'DM Sans', sans-serif;
          font-size: 13.5px;
          font-weight: 500;
          color: #fff;
          background: linear-gradient(135deg, #e07090 0%, #c0445c 100%);
          padding: 12px 28px;
          border-radius: 999px;
          border: none;
          cursor: pointer;
          letter-spacing: 0.04em;
          box-shadow: 0 4px 20px rgba(192,68,92,0.26);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        .btn-primary:hover {
          transform: translateY(-2px) scale(1.03);
          box-shadow: 0 8px 28px rgba(192,68,92,0.32);
        }

        .btn-outline {
          font-family: 'DM Sans', sans-serif;
          font-size: 13.5px;
          font-weight: 400;
          color: #b03555;
          background: transparent;
          padding: 12px 24px;
          border-radius: 999px;
          border: 1.5px solid rgba(192,68,92,0.28);
          cursor: pointer;
          letter-spacing: 0.04em;
          transition: background 0.2s, border-color 0.2s, transform 0.2s;
          text-decoration: none;
        }

        .btn-outline:hover {
          background: rgba(192,68,92,0.06);
          border-color: rgba(192,68,92,0.5);
          transform: translateY(-2px);
        }

        /* ── Mobile: stack vertically ── */
        @media (max-width: 768px) {
          .about-section {
            flex-direction: column;
            min-height: auto;
          }

          .about-image-side {
            width: 100%;
            height: 60vw;
            max-height: 420px;
            flex-shrink: 0;
            position: relative;
          }

          .about-image-side::after {
            background: linear-gradient(
              to bottom,
              transparent 50%,
              rgba(253,246,240,0.7) 80%,
              rgba(253,246,240,0.97) 100%
            );
          }

          .about-glass-side {
            padding: 32px 20px 60px;
            justify-content: center;
          }

          .glass-panel {
            padding: 36px 28px;
            border-radius: 20px;
          }

          .traits-grid { grid-template-columns: 1fr 1fr; }
        }

        @media (max-width: 420px) {
          .traits-grid { grid-template-columns: 1fr; }
          .about-cta-row { flex-direction: column; }
          .btn-primary, .btn-outline { text-align: center; justify-content: center; }
        }
      `}</style>

      <section id="about" className="about-section" ref={sectionRef}>

        {/* ── Left: your photo flush to background ── */}
        <div className="about-image-side">
          {/*
            Replace src with your actual image.
            Put your photo in /public/about.jpg (or .png / .webp).
            The image fills the entire left half with no frame.
          */}
          <Image
            src="/about.jpg"
            alt="Portrait photo"
            fill
            className="about-img"
            style={{ objectFit: "cover", objectPosition: "center top" }}
            priority
          />
        </div>

        {/* ── Right: glass intro panel ── */}
        <div className="about-glass-side">
          <div className={`glass-panel ${visible ? "visible" : ""}`}>

            {/* Label */}
            <div className={`about-label ${visible ? "visible" : ""}`}>
              <span className="label-line" />
              About Me
            </div>

            {/* Heading */}
            <h2 className={`about-heading ${visible ? "visible" : ""}`}>
              Crafting with <em>passion</em>
            </h2>

            {/* Your name */}
            <span className={`about-name ${visible ? "visible" : ""}`}>
              — Your Name Here
            </span>

            <div className={`about-divider ${visible ? "visible" : ""}`} />

            {/* Bio */}
            <p className={`about-bio ${visible ? "visible" : ""}`}>
              I&apos;m a frontend developer and UI/UX enthusiast who loves turning
              ideas into elegant, pixel-perfect digital products. With a keen eye
              for design and a love for clean code, I bridge the gap between
              beautiful visuals and seamless functionality.
              <br /><br />
              When I&apos;m not coding, I&apos;m exploring design trends, experimenting
              with new technologies, or sketching out my next creative concept.
            </p>

            {/* Traits */}
            <div className={`traits-grid ${visible ? "visible" : ""}`}>
              {traits.map((t) => (
                <div key={t.label} className="trait-card">
                  <span className="trait-icon">{t.icon}</span>
                  <span className="trait-label">{t.label}</span>
                  <span className="trait-desc">{t.desc}</span>
                </div>
              ))}
            </div>

            {/* Stack */}
            <div className={`stack-row ${visible ? "visible" : ""}`}>
              {stack.map((s) => (
                <span key={s} className="stack-pill">{s}</span>
              ))}
            </div>

            {/* CTA */}
            <div className={`about-cta-row ${visible ? "visible" : ""}`}>
              <a href="#projects" className="btn-primary">
                View Projects →
              </a>
              <a href="/resume.pdf" target="_blank" className="btn-outline">
                Download CV
              </a>
            </div>

          </div>
        </div>

      </section>
    </>
  );
}