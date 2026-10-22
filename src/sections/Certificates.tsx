"use client";

import { useEffect, useState } from "react";

/* -------------------------------------------------------------------------- */
/* Data                                                                        */
/* -------------------------------------------------------------------------- */

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  year: string;
  credentialId: string;
  accent: string;
  sealColor: string;
  pdfSrc: string;
  skills: string[];
}

const certificates: Certificate[] = [
  {
    id: "01",
    title: "Geodata Processing using Python and Machine Learning",
    issuer: "ISRO / IIRS",
    year: "2025",
    credentialId: "ISRO-IIRS-2025-GEO",
    accent: "#0284c7",
    sealColor: "#f59e0b",
    pdfSrc: "/certificates/isro.pdf",
    skills: ["Python", "Geospatial ML", "GIS", "Satellite Imagery"],
  },
  {
    id: "02",
    title: "Data Processing and Visualisation",
    issuer: "NASSCOM",
    year: "2026",
    credentialId: "NASSCOM-DPV-2026",
    accent: "#7c3aed",
    sealColor: "#d97706",
    pdfSrc: "/certificates/nasscom.pdf",
    skills: ["Data Wrangling", "Pandas", "Interactive Dashboards", "NumPy"],
  },
  {
    id: "03",
    title: "Software Engineering Fundamentals",
    issuer: "Infosys / Springboard",
    year: "2026",
    credentialId: "INFY-SB-SEF-2026",
    accent: "#db2777",
    sealColor: "#e11d48",
    pdfSrc: "/certificates/infosys.pdf",
    skills: ["SDLC", "Agile / Scrum", "Clean Architecture", "OOP Design"],
  },
  {
    id: "04",
    title: "Data Science for Beginners",
    issuer: "Board Infinity",
    year: "2026",
    credentialId: "BI-DS-BEG-2026",
    accent: "#d97706",
    sealColor: "#b45309",
    pdfSrc: "/certificates/board.pdf",
    skills: ["Regression", "EDA", "Data Pipelines", "Python"],
  },
  {
    id: "05",
    title: "GuideWire DEVTrails Hackathon",
    issuer: "Guidewire Hackathon",
    year: "2026",
    credentialId: "GW-DEVTRAILS-2026",
    accent: "#db2777",
    sealColor: "#f59e0b",
    pdfSrc: "/certificates/guidewire.pdf",
    skills: ["Rapid Prototyping", "Full-Stack Dev", "Team Leadership"],
  },
  {
    id: "06",
    title: "Demystifying Networking",
    issuer: "NPTEL • IIT",
    year: "2025",
    credentialId: "NPTEL-IIT-NET-2025",
    accent: "#2563eb",
    sealColor: "#1d4ed8",
    pdfSrc: "/certificates/nptel.pdf",
    skills: ["TCP/IP Protocols", "Network Topology", "Socket Programming"],
  },
  {
    id: "07",
    title: "MongoDB Skill Badge Suite",
    issuer: "MongoDB",
    year: "2026",
    credentialId: "MDB-AI-VECTOR-2026",
    accent: "#059669",
    sealColor: "#047857",
    pdfSrc: "/certificates/mongodb.pdf",
    skills: ["Vector Search", "AI Agents", "RAG Architecture", "NoSQL"],
  },
  {
    id: "08",
    title: "Cybersecurity Essentials",
    issuer: "Cisco Networking Academy",
    year: "2024",
    credentialId: "CISCO-SEC-ESS-2024",
    accent: "#e11d48",
    sealColor: "#be123c",
    pdfSrc: "/certificates/cisco.pdf",
    skills: ["Threat Intelligence", "Vulnerability Defense", "Cryptography"],
  },
  {
    id: "09",
    title: "Deep Learning for Computer Vision",
    issuer: "Coursera",
    year: "2026",
    credentialId: "COURSERA-DLCV-2026",
    accent: "#7c3aed",
    sealColor: "#6d28d9",
    pdfSrc: "/certificates/coursera.pdf",
    skills: ["CNNs", "Object Detection", "Image Segmentation", "PyTorch"],
  },
];

/* -------------------------------------------------------------------------- */
/* Neumorphic tokens (same as Projects)                                        */
/* -------------------------------------------------------------------------- */

const BASE = "#F4E9EF";
const raised = "shadow-[9px_9px_20px_#D8C3CF,-9px_-9px_20px_#FFFFFF]";
const raisedSm = "shadow-[5px_5px_11px_#D8C3CF,-5px_-5px_11px_#FFFFFF]";
const inset = "shadow-[inset_6px_6px_13px_#D8C3CF,inset_-6px_-6px_13px_#FFFFFF]";
const insetSm = "shadow-[inset_3px_3px_7px_#D8C3CF,inset_-3px_-3px_7px_#FFFFFF]";
const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B4456A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F4E9EF]";

/* -------------------------------------------------------------------------- */
/* Component                                                                   */
/* -------------------------------------------------------------------------- */

export default function Certificates() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const active = certificates[activeIndex];

  const next = () => setActiveIndex((i) => (i + 1) % certificates.length);
  const prev = () =>
    setActiveIndex((i) => (i - 1 + certificates.length) % certificates.length);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const copyId = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(active.credentialId).catch(() => {});
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <section
      id="certificates"
      className="relative overflow-hidden px-4 py-16 sm:px-8 sm:py-20 md:px-14 md:py-28 text-[#4A2C40]"
      style={{ background: BASE, fontFamily: "'DM Sans', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Fraunces:ital,opsz,wght@0,9..144,500;1,9..144,500&display=swap');
        .c-serif { font-family: 'Fraunces', serif; }
        @keyframes c-swap { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
        .c-swap { animation: c-swap .4s ease both; }
        .c-hide-scroll { scrollbar-width: none; }
        .c-hide-scroll::-webkit-scrollbar { display: none; }
        .c-clamp2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        @media (prefers-reduced-motion: reduce) { .c-swap { animation: none; } }
      `}</style>

      <div className="relative mx-auto max-w-6xl">
        {/* Header */}
        <header className="mb-10 text-center md:mb-14">
          <h2 className="c-serif text-4xl leading-[1.1] sm:text-5xl md:text-6xl">
            Things I&rsquo;ve <em className="text-[#B4456A]">learned</em>
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-[#7A5B6E]">
            {certificates.length} certifications across data, software engineering, machine
            learning and networking.
          </p>
        </header>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-10">
          {/* Spotlight */}
          <div
            onTouchStart={(e) => setTouchStart(e.touches[0].clientX)}
            onTouchEnd={(e) => {
              if (touchStart === null) return;
              const diff = touchStart - e.changedTouches[0].clientX;
              if (diff > 45) next();
              if (diff < -45) prev();
              setTouchStart(null);
            }}
            id="certificate-panel"
            role="tabpanel"
            aria-labelledby={`cert-tab-${active.id}`}
            className={`relative rounded-[36px] p-5 sm:p-8 ${raised}`}
            style={{ background: BASE }}
          >
            <div key={active.id} className="c-swap flex h-full flex-col">
              {/* Certificate plate */}
              <div
                className={`relative rounded-[28px] p-6 sm:p-8 ${inset}`}
                style={{
                  background: `linear-gradient(145deg, ${active.accent}1f, ${BASE})`,
                }}
              >
                {/* Seal */}
                <div className="absolute right-5 top-5 flex flex-col items-center sm:right-7 sm:top-7">
                  <span
                    className={`flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold text-white sm:h-14 sm:w-14 ${raisedSm}`}
                    style={{
                      background: `radial-gradient(circle at 35% 30%, ${active.sealColor}, ${active.accent})`,
                    }}
                    aria-hidden
                  >
                    ✓
                  </span>
                  <span className="mt-1.5 text-xs font-medium text-[#7A5B6E]">Verified</span>
                </div>

                {/* Issuer */}
                <div className="flex items-center gap-3 pr-20 sm:pr-24">
                  <span
                    className={`c-serif flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-xl ${raisedSm}`}
                    style={{ background: BASE, color: active.accent }}
                    aria-hidden
                  >
                    {active.issuer.charAt(0)}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-base font-semibold">{active.issuer}</p>
                    <p className="text-sm text-[#7A5B6E]">{active.year}</p>
                  </div>
                </div>

                {/* Title */}
                <h3 className="c-serif mt-6 max-w-xl text-2xl leading-snug sm:text-3xl md:text-4xl">
                  {active.title}
                </h3>
              </div>

              {/* Skills */}
              <div className="mt-7">
                <p className="mb-3 text-sm font-semibold text-[#7A5B6E]">Skills covered</p>
                <ul className="flex flex-wrap gap-2.5">
                  {active.skills.map((skill) => (
                    <li
                      key={skill}
                      className={`rounded-full px-4 py-1.5 text-sm ${raisedSm}`}
                      style={{ background: BASE, color: active.accent }}
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Actions */}
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <button
                  onClick={copyId}
                  aria-label={`Copy credential ID ${active.credentialId}`}
                  className={`flex min-w-0 items-center justify-between gap-3 rounded-full px-5 py-3 text-left text-sm text-[#6A4C5F] ${insetSm} ${focusRing}`}
                  style={{ background: BASE }}
                >
                  <span className="truncate">ID: {active.credentialId}</span>
                  <span
                    className="shrink-0 text-xs font-semibold"
                    style={{ color: copied ? "#2f8f6f" : "#B4456A" }}
                    aria-live="polite"
                  >
                    {copied ? "Copied" : "Copy"}
                  </span>
                </button>

                <a
                  href={active.pdfSrc}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`rounded-full px-7 py-3.5 text-center text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0 motion-reduce:transition-none ${focusRing}`}
                  style={{
                    background: `linear-gradient(135deg, ${active.accent}, #B4456A)`,
                    boxShadow: "6px 6px 14px #D8C3CF, -6px -6px 14px #FFFFFF",
                  }}
                >
                  View certificate
                </a>
              </div>
            </div>
          </div>

          {/* Selector */}
          <div
            role="tablist"
            aria-label="Certificates"
            aria-orientation="vertical"
            className="c-hide-scroll -mx-4 flex gap-4 overflow-x-auto px-4 py-3 sm:-mx-8 sm:px-8 lg:mx-0 lg:max-h-[600px] lg:flex-col lg:gap-4 lg:overflow-x-visible lg:overflow-y-auto lg:p-3"
          >
            {certificates.map((c, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={c.id}
                  role="tab"
                  id={`cert-tab-${c.id}`}
                  aria-selected={isActive}
                  aria-controls="certificate-panel"
                  onClick={() => setActiveIndex(index)}
                  className={`flex w-[250px] shrink-0 items-center gap-3.5 rounded-[24px] px-4 py-3.5 text-left transition-shadow duration-300 motion-reduce:transition-none lg:w-full ${focusRing} ${
                    isActive ? inset : raised
                  }`}
                  style={{ background: BASE }}
                >
                  <span
                    className={`c-serif flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-base ${
                      isActive ? raisedSm : insetSm
                    }`}
                    style={{ color: c.accent, background: BASE }}
                    aria-hidden
                  >
                    {c.issuer.charAt(0)}
                  </span>
                  <span className="min-w-0">
                    <span className="c-clamp2 text-sm font-semibold leading-snug">{c.title}</span>
                    <span className="mt-0.5 block truncate text-xs text-[#7A5B6E]">
                      {c.issuer} · {c.year}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-10 flex items-center justify-center gap-5">
          <button
            onClick={prev}
            aria-label="Previous certificate"
            className={`flex h-12 w-12 items-center justify-center rounded-full text-[#B4456A] active:shadow-[inset_3px_3px_7px_#D8C3CF,inset_-3px_-3px_7px_#FFFFFF] ${raisedSm} ${focusRing}`}
            style={{ background: BASE }}
          >
            <span aria-hidden>❮</span>
          </button>

          <div
            className={`flex items-center gap-1.5 rounded-full px-4 py-3 ${insetSm}`}
            aria-hidden
          >
            {certificates.map((c, index) => (
              <span
                key={c.id}
                className="h-1.5 rounded-full transition-all duration-300 motion-reduce:transition-none"
                style={{
                  width: index === activeIndex ? 22 : 6,
                  background: index === activeIndex ? active.accent : "#D2BCC9",
                }}
              />
            ))}
          </div>

          <button
            onClick={next}
            aria-label="Next certificate"
            className={`flex h-12 w-12 items-center justify-center rounded-full text-[#B4456A] active:shadow-[inset_3px_3px_7px_#D8C3CF,inset_-3px_-3px_7px_#FFFFFF] ${raisedSm} ${focusRing}`}
            style={{ background: BASE }}
          >
            <span aria-hidden>❯</span>
          </button>
        </div>
      </div>
    </section>
  );
}