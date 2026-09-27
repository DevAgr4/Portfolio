"use client";

import { useEffect, useState } from "react";

interface Certificate {
  id: string;
  pageNo: string;
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
    pageNo: "01",
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
    pageNo: "02",
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
    pageNo: "03",
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
    pageNo: "04",
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
    pageNo: "05",
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
    pageNo: "06",
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
    pageNo: "07",
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
    pageNo: "08",
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
    pageNo: "09",
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

export default function Certificates() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const active = certificates[activeIndex];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % certificates.length);
  };

  const handlePrev = () => {
    setActiveIndex(
      (prev) => (prev - 1 + certificates.length) % certificates.length
    );
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };

    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  const copyId = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard
        .writeText(active.credentialId)
        .catch(() => {});
    }

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1600);
  };

  return (
    <section
      id="certificates"
      className="relative bg-[#FAFAF9] text-[#18181B] px-4 sm:px-8 md:px-12 py-20 md:py-28 overflow-hidden"
    >
      {/* Soft background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 left-1/4 w-80 h-80 bg-[#EC4899]/5 blur-[90px] rounded-full" />

        <div className="absolute top-1/3 right-0 w-96 h-96 bg-[#8B5CF6]/5 blur-[100px] rounded-full" />

        <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#0284C7]/5 blur-[90px] rounded-full" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">

          <div className="inline-flex items-center gap-2 bg-white border border-[#E4E4E7] px-3.5 py-1.5 rounded-full mb-4 shadow-sm">
            <span className="relative w-2 h-2 rounded-full bg-emerald-500">
              <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping" />
            </span>

            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#52525B]">
              Verified Credentials
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.15]">
            Academic &amp; Professional{" "}
            <span className="bg-gradient-to-r from-[#EC4899] via-[#8B5CF6] to-[#0284C7] bg-clip-text text-transparent">
              Credentials
            </span>
            .
          </h2>

          <p className="mt-3 text-sm sm:text-base text-[#71717A] max-w-lg mx-auto leading-relaxed">
            {certificates.length} certifications spanning data, software
            engineering, machine learning, and technology.
          </p>
        </div>

        {/* Main Certificate Area */}
        <div className="grid lg:grid-cols-[1fr_300px] gap-6 items-start">

          {/* Spotlight Card */}
          <div
            onTouchStart={(e) => {
              setTouchStart(e.touches[0].clientX);
            }}
            onTouchEnd={(e) => {
              if (touchStart === null) return;

              const diff =
                touchStart - e.changedTouches[0].clientX;

              if (diff > 45) handleNext();
              if (diff < -45) handlePrev();

              setTouchStart(null);
            }}
            className="relative rounded-[28px] bg-white border border-[#E4E4E7] shadow-[0_25px_60px_-30px_rgba(24,24,27,0.25)] p-7 sm:p-10 overflow-hidden min-h-[420px] flex flex-col"
          >

            {/* Accent Glow */}
            <div
              key={`glow-${active.id}`}
              className="absolute -top-28 -right-24 w-80 h-80 rounded-full blur-[75px] opacity-20 transition-all duration-500"
              style={{
                background: active.accent,
              }}
            />

            {/* Verified Badge */}
            <div className="absolute top-6 right-6 sm:top-7 sm:right-7 flex flex-col items-center z-10">

              <div
                key={`seal-${active.id}`}
                className="w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-md"
                style={{
                  background: `radial-gradient(circle at 35% 30%, ${active.sealColor}, ${active.accent})`,
                }}
              >
                ✓
              </div>

              <span className="text-[9px] font-mono text-[#A1A1AA] mt-1 uppercase tracking-wide">
                Verified
              </span>
            </div>

            <div
              key={active.id}
              className="relative z-10 flex-1 flex flex-col justify-between animate-[certFade_0.45s_ease]"
            >

              {/* Certificate Information */}
              <div>

                {/* Issuer */}
                <div className="flex items-center gap-3 mb-5 pr-16">

                  <span
                    className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-bold text-lg shrink-0 shadow-sm"
                    style={{
                      background: active.accent,
                    }}
                  >
                    {active.issuer.charAt(0)}
                  </span>

                  <div>
                    <div className="text-sm font-semibold text-[#18181B]">
                      {active.issuer}
                    </div>

                    <div className="text-xs text-[#71717A] font-mono mt-0.5">
                      {active.year}
                    </div>
                  </div>

                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl md:text-[1.75rem] font-bold leading-snug max-w-xl text-[#18181B]">
                  {active.title}
                </h3>

                {/* Skills */}
                <div className="flex flex-wrap gap-2 mt-5">
                  {active.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs font-medium px-3 py-1 rounded-full border"
                      style={{
                        borderColor: `${active.accent}35`,
                        color: active.accent,
                        background: `${active.accent}0a`,
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>

              </div>

              {/* Bottom Actions */}
              <div className="flex items-center justify-between gap-4 flex-wrap mt-8 pt-6 border-t border-[#E4E4E7]">

                {/* Credential ID */}
                <button
                  onClick={copyId}
                  className="font-mono text-xs text-[#71717A] hover:text-[#18181B] transition-colors flex items-center gap-2 min-w-0"
                >
                  <span className="truncate max-w-[180px] sm:max-w-none">
                    ID: {active.credentialId}
                  </span>

                  <span
                    className={`text-[10px] font-semibold ${
                      copied
                        ? "text-emerald-600"
                        : "text-[#A1A1AA]"
                    }`}
                  >
                    {copied ? "Copied ✓" : "Copy"}
                  </span>
                </button>

                {/* PDF Button */}
                <a
                  href={active.pdfSrc}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium px-5 py-2.5 rounded-full text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                  style={{
                    background: active.accent,
                  }}
                >
                  View Certificate
                  <span>↗</span>
                </a>

              </div>
            </div>
          </div>

          {/* Certificate Selector */}
          <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 lg:max-h-[420px] lg:pr-1 lg:overflow-y-auto scrollbar-thin">

            {certificates.map((certificate, index) => {

              const isActive = index === activeIndex;

              return (
                <button
                  key={certificate.id}
                  onClick={() => setActiveIndex(index)}
                  className={`shrink-0 lg:shrink w-[220px] lg:w-full text-left rounded-2xl border p-3.5 transition-all duration-200 ${
                    isActive
                      ? "bg-white shadow-md"
                      : "bg-white/70 border-[#E4E4E7] hover:bg-white hover:-translate-y-0.5 hover:shadow-sm"
                  }`}
                  style={{
                    borderColor: isActive
                      ? certificate.accent
                      : undefined,
                  }}
                >

                  <div className="flex items-center gap-2.5">

                    <span
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0"
                      style={{
                        background: certificate.accent,
                      }}
                    >
                      {certificate.issuer.charAt(0)}
                    </span>

                    <div className="min-w-0">

                      <div className="text-xs font-semibold truncate text-[#18181B]">
                        {certificate.title}
                      </div>

                      <div className="text-[10px] text-[#71717A] font-mono truncate mt-0.5">
                        {certificate.issuer} · {certificate.year}
                      </div>

                    </div>

                  </div>
                </button>
              );
            })}

          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4 mt-8">

          <button
            onClick={handlePrev}
            aria-label="Previous certificate"
            className="w-9 h-9 rounded-full bg-white border border-[#E4E4E7] text-[#18181B] flex items-center justify-center hover:border-[#EC4899] hover:text-[#EC4899] transition-all"
          >
            ❮
          </button>

          {/* Progress */}
          <div className="flex items-center gap-1.5">

            {certificates.map((certificate, index) => (
              <span
                key={certificate.id}
                className="h-1.5 rounded-full transition-all duration-300"
                style={{
                  width: index === activeIndex ? 24 : 6,
                  background:
                    index === activeIndex
                      ? active.accent
                      : "#D4D4D8",
                }}
              />
            ))}

          </div>

          <button
            onClick={handleNext}
            aria-label="Next certificate"
            className="w-9 h-9 rounded-full bg-white border border-[#E4E4E7] text-[#18181B] flex items-center justify-center hover:border-[#8B5CF6] hover:text-[#8B5CF6] transition-all"
          >
            ❯
          </button>

        </div>

      </div>

      {/* Animation */}
      <style jsx global>{`
        @keyframes certFade {
          from {
            opacity: 0;
            transform: translateY(10px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .scrollbar-thin::-webkit-scrollbar {
          width: 5px;
          height: 5px;
        }

        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }

        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: #d4d4d8;
          border-radius: 999px;
        }

        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: #a1a1aa;
        }
      `}</style>
    </section>
  );
}