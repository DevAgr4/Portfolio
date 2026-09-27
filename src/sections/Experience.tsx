"use client";

import { useEffect, useRef, useState } from "react";

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative bg-[#f8f7f4] text-[#121214] px-4 sm:px-6 md:px-10 lg:px-14 py-16 sm:py-20 md:py-28 overflow-hidden border-t border-[#121214]/8"
    >
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-[0.35] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(#121214 0.75px, transparent 0.75px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div
        className={`max-w-6xl mx-auto relative z-10 transition-all duration-700 ${
          visible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8"
        }`}
      >
        {/* =========================================================
            SECTION HEADER
        ========================================================= */}
        <div className="text-center mb-14 sm:mb-16 md:mb-20">
          <div className="font-mono text-[10px] sm:text-xs font-semibold tracking-[0.2em] text-[#ec4899] uppercase mb-3">
            ✦ Career &amp; Leadership
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            Experience
          </h2>

          <p className="mt-4 text-[#71717a] max-w-2xl mx-auto text-sm sm:text-base leading-relaxed px-2">
            A journey across software development, automation, creative
            leadership, event management, and student initiatives.
          </p>
        </div>

        {/* =========================================================
            TIMELINE
        ========================================================= */}
        <div className="relative">

          {/* Desktop Center Line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-[#121214]/10 -translate-x-1/2" />

          {/* Mobile Left Line */}
          <div className="md:hidden absolute left-[12px] top-0 bottom-0 w-px bg-[#121214]/10" />

          {/* =====================================================
              EXPERIENCE 1 — SIMS
              CARD ON RIGHT
          ===================================================== */}
          <div className="relative grid md:grid-cols-2 mb-16 sm:mb-20 md:mb-24">

            {/* Timeline Dot */}
            <div className="absolute left-[4px] md:left-1/2 top-7 w-[17px] h-[17px] rounded-full bg-[#121214] border-4 border-[#f8f7f4] md:-translate-x-1/2 z-20 shadow-md" />

            {/* Left — Experience Information */}
            <div className="hidden md:flex items-start justify-end pr-12 pt-2">
              <div className="text-right max-w-sm">

                <div className="font-mono text-xs text-[#ec4899] font-semibold uppercase tracking-wider">
                  Internship
                </div>

                <h3 className="text-3xl font-bold mt-2">
                  SIMS
                </h3>

                <p className="text-sm text-[#71717a] mt-1">
                  Software / Automation Intern
                </p>

                <div className="mt-4 inline-flex items-center gap-2 font-mono text-xs text-[#52525b] bg-white border border-[#121214]/10 px-3 py-1.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
                  Automation &amp; Data
                </div>

              </div>
            </div>

            {/* Mobile Experience Information */}
            <div className="md:hidden pl-9 mb-5">
              <div className="font-mono text-[10px] text-[#ec4899] font-semibold uppercase tracking-wider">
                Internship
              </div>

              <h3 className="text-2xl font-bold mt-1">
                SIMS
              </h3>

              <p className="text-sm text-[#71717a] mt-1">
                Software / Automation Intern
              </p>

              <div className="mt-3 inline-flex items-center gap-2 font-mono text-[10px] text-[#52525b] bg-white border border-[#121214]/10 px-3 py-1.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
                Automation &amp; Data
              </div>
            </div>

            {/* Right — Card */}
            <div className="md:pl-12 pl-9">
              <div className="bg-white/85 backdrop-blur-md border border-[#121214]/10 rounded-2xl sm:rounded-3xl p-5 sm:p-7 md:p-8 shadow-[0_16px_40px_-10px_rgba(18,18,20,0.08)] hover:shadow-[0_20px_50px_-12px_rgba(18,18,20,0.13)] transition-all duration-300 hover:-translate-y-1">

                {/* Card Header */}
                <div className="flex items-start justify-between gap-4 mb-5 sm:mb-6">

                  <div className="min-w-0">
                    <div className="font-mono text-[10px] sm:text-xs text-[#71717a] mb-2 truncate">
                      ~/experience/sims
                    </div>

                    <h4 className="text-lg sm:text-xl md:text-2xl font-bold leading-tight">
                      Training Reminder Automation System
                    </h4>
                  </div>

                  <div className="hidden sm:flex shrink-0 w-10 h-10 rounded-xl bg-[#121214] text-white items-center justify-center font-mono text-xs">
                    SIMS
                  </div>

                </div>

                {/* Description */}
                <p className="text-sm text-[#52525b] leading-6 mb-6">
                  Worked on an automated training reminder system designed
                  to reduce manual tracking and follow-up for HR operations.
                  The system manages training-related data, reminder logic,
                  attendance tracking, and reporting workflows.
                </p>

                {/* Responsibilities */}
                <div className="space-y-4">

                  <div className="flex gap-3">
                    <span className="text-[#ec4899] mt-1 shrink-0">
                      ▸
                    </span>

                    <p className="text-sm text-[#52525b] leading-6">
                      Built backend logic for recurring training reminders
                      based on predefined conditions and schedules.
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <span className="text-[#ec4899] mt-1 shrink-0">
                      ▸
                    </span>

                    <p className="text-sm text-[#52525b] leading-6">
                      Worked with PostgreSQL to store, query, and manage
                      training and reminder data.
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <span className="text-[#ec4899] mt-1 shrink-0">
                      ▸
                    </span>

                    <p className="text-sm text-[#52525b] leading-6">
                      Used Excel for data validation, reporting, and
                      cross-checking entries against system records.
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <span className="text-[#ec4899] mt-1 shrink-0">
                      ▸
                    </span>

                    <p className="text-sm text-[#52525b] leading-6">
                      Automated recurring reminder generation to reduce
                      manual tracking effort.
                    </p>
                  </div>

                </div>

                {/* Technologies */}
                <div className="mt-7 pt-6 border-t border-[#121214]/8">

                  <div className="font-mono text-[10px] uppercase tracking-widest text-[#71717a] mb-3">
                    Technologies
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {[
                      "PostgreSQL",
                      "SQL",
                      "Python",
                      "Excel",
                      "Automation",
                      "Data Reporting",
                    ].map((tech) => (
                      <span
                        key={tech}
                        className="font-mono text-[10px] sm:text-xs px-2.5 sm:px-3 py-1.5 rounded-xl bg-[#f3f2ee] border border-[#121214]/10 text-[#121214] hover:border-[#ec4899]/40 hover:bg-white transition-all"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                </div>
              </div>
            </div>
          </div>


          {/* =====================================================
              EXPERIENCE 2 — COLLEGE LEADERSHIP
              CARD ON LEFT
          ===================================================== */}
          <div className="relative grid md:grid-cols-2 mb-16 sm:mb-20 md:mb-24">

            {/* Timeline Dot */}
            <div className="absolute left-[4px] md:left-1/2 top-7 w-[17px] h-[17px] rounded-full bg-[#ec4899] border-4 border-[#f8f7f4] md:-translate-x-1/2 z-20 shadow-md" />

            {/* Mobile Information */}
            <div className="md:hidden pl-9 mb-5">

              <div className="font-mono text-[10px] text-[#8b5cf6] font-semibold uppercase tracking-wider">
                Leadership
              </div>

              <h3 className="text-2xl font-bold mt-1">
                College Leadership
              </h3>

              <p className="text-sm text-[#71717a] mt-1">
                Head of Visual Media &amp; Content
              </p>

              <p className="text-xs text-[#a1a1aa] mt-2 leading-5">
                Previously: Joint Head of Visual Media &amp; People&apos;s
                Officer
              </p>

              <div className="mt-3 inline-flex items-center gap-2 font-mono text-[10px] text-[#52525b] bg-white border border-[#121214]/10 px-3 py-1.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8b5cf6]" />
                Creative &amp; Events
              </div>

            </div>

            {/* LEFT — Card */}
            <div className="md:pr-12 pl-9 md:pl-0">

              <div className="bg-white/85 backdrop-blur-md border border-[#121214]/10 rounded-2xl sm:rounded-3xl p-5 sm:p-7 md:p-8 shadow-[0_16px_40px_-10px_rgba(18,18,20,0.08)] hover:shadow-[0_20px_50px_-12px_rgba(18,18,20,0.13)] transition-all duration-300 hover:-translate-y-1">

                {/* Card Header */}
                <div className="flex items-start justify-between gap-4 mb-5 sm:mb-6">

                  <div className="min-w-0">
                    <div className="font-mono text-[10px] sm:text-xs text-[#71717a] mb-2 truncate">
                      ~/leadership/visual-media
                    </div>

                    <h4 className="text-lg sm:text-xl md:text-2xl font-bold leading-tight">
                      Visual Media &amp; Content Leadership
                    </h4>
                  </div>

                  <div className="hidden sm:flex shrink-0 w-10 h-10 rounded-xl bg-[#8b5cf6] text-white items-center justify-center font-mono text-sm">
                    VM
                  </div>

                </div>

                {/* Description */}
                <p className="text-sm text-[#52525b] leading-6 mb-6">
                  Led visual media and content initiatives while contributing
                  to student engagement, event coordination, and creative
                  communication across college activities.
                </p>

                {/* Responsibilities */}
                <div className="space-y-4">

                  <div className="flex gap-3">
                    <span className="text-[#8b5cf6] mt-1 shrink-0">
                      ▸
                    </span>

                    <p className="text-sm text-[#52525b] leading-6">
                      Served as{" "}
                      <strong>
                        Head of Visual Media &amp; Content
                      </strong>
                      , leading creative planning and content initiatives.
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <span className="text-[#8b5cf6] mt-1 shrink-0">
                      ▸
                    </span>

                    <p className="text-sm text-[#52525b] leading-6">
                      Previously served as{" "}
                      <strong>
                        Joint Head of Visual Media
                      </strong>{" "}
                      and{" "}
                      <strong>People&apos;s Officer</strong>,
                      supporting team coordination and student engagement.
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <span className="text-[#8b5cf6] mt-1 shrink-0">
                      ▸
                    </span>

                    <p className="text-sm text-[#52525b] leading-6">
                      Organised and coordinated{" "}
                      <strong>technical events</strong> as part of
                      college fests, contributing to event planning,
                      execution, and participant engagement.
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <span className="text-[#8b5cf6] mt-1 shrink-0">
                      ▸
                    </span>

                    <p className="text-sm text-[#52525b] leading-6">
                      Collaborated with multiple teams to coordinate
                      creative content, event communication, and
                      on-ground execution.
                    </p>
                  </div>

                </div>

                {/* Skills */}
                <div className="mt-7 pt-6 border-t border-[#121214]/8">

                  <div className="font-mono text-[10px] uppercase tracking-widest text-[#71717a] mb-3">
                    Leadership Skills
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {[
                      "Team Leadership",
                      "Content Strategy",
                      "Visual Media",
                      "Event Management",
                      "Technical Events",
                      "Team Coordination",
                      "Communication",
                    ].map((skill) => (
                      <span
                        key={skill}
                        className="font-mono text-[10px] sm:text-xs px-2.5 sm:px-3 py-1.5 rounded-xl bg-[#f3f2ee] border border-[#121214]/10 text-[#121214] hover:border-[#8b5cf6]/40 hover:bg-white transition-all"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                </div>
              </div>
            </div>

            {/* RIGHT — Leadership Information */}
            <div className="hidden md:flex items-start justify-start pl-12 pt-2">

              <div className="text-left max-w-sm">

                <div className="font-mono text-xs text-[#8b5cf6] font-semibold uppercase tracking-wider">
                  Leadership
                </div>

                <h3 className="text-3xl font-bold mt-2">
                  College Leadership
                </h3>

                <p className="text-sm text-[#71717a] mt-1">
                  Head of Visual Media &amp; Content
                </p>

                <p className="text-xs text-[#a1a1aa] mt-2 leading-5">
                  Previously: Joint Head of Visual Media &amp;
                  People&apos;s Officer
                </p>

                <div className="mt-4 inline-flex items-center gap-2 font-mono text-xs text-[#52525b] bg-white border border-[#121214]/10 px-3 py-1.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8b5cf6]" />
                  Creative &amp; Events
                </div>

              </div>
            </div>
          </div>


          {/* =====================================================
              BOTTOM STATEMENT
          ===================================================== */}
          <div className="relative text-center">

            <div className="inline-flex flex-wrap justify-center items-center gap-2 sm:gap-3 bg-white/70 border border-[#121214]/10 rounded-2xl sm:rounded-full px-4 sm:px-5 py-3">

              <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse shrink-0" />

              <span className="font-mono text-[10px] sm:text-xs text-[#52525b]">
                Building • Leading • Creating • Organising
              </span>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}