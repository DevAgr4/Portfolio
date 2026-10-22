"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";

/* ------------------------------------------------------------------
   TODO: replace CANVA_PROFILE with your own Canva profile / portfolio link.
   Album images live in /public/design/ (design-1.jpg ... design-6.jpg).
------------------------------------------------------------------- */
const CANVA_PROFILE = "https://www.canva.com/";

type Work = {
  title: string;
  category: string;
  /** Path inside /public, e.g. "/design/design-1.jpg". Leave out for a coloured placeholder. */
  image?: string;
  /** Short note shown in the viewer */
  description?: string;
  /** "contain" for wide banners so nothing is cropped (default: cover) */
  fit?: "cover" | "contain";
  /** Link to this design on Canva */
  canva: string;
};

type Album = {
  title: string;
  hint: string;
  works: Work[];
};

type Explore = {
  title: string;
  hint: string;
  /** true = numbered steps with a "Next step" button */
  sequence?: boolean;
  items: { label: string; detail: string }[];
};

type Exp = {
  id: string;
  tab: string;
  type: string;
  org: string;
  role: string;
  focus: string;
  path: string;
  title: string;
  description: string;
  points: ReactNode[];
  tagsLabel: string;
  tags: string[];
  /** Optional "level up" path shown as small steps */
  steps?: string[];
  /** Optional external links shown in the left column */
  links?: { label: string; href: string }[];
  accent: string; // main colour
  accent2: string; // second colour for gradients
  soft: string; // pastel tint
  deep: string; // darker text tint
  explore?: Explore;
  album?: Album;
};

const EXPERIENCES: Exp[] = [
  {
    id: "sims",
    tab: "SIMS",
    type: "Internship",
    org: "SIMS",
    role: "Software / Automation Intern",
    focus: "Automation & Data",
    path: "~/experience/sims",
    title: "Training Reminder Automation System",
    description:
      "Worked on an automated training reminder system designed to reduce manual tracking and follow-up for HR operations. The system manages training-related data, reminder logic, attendance tracking, and reporting workflows.",
    points: [
      "Built backend logic for recurring training reminders based on predefined conditions and schedules.",
      "Worked with PostgreSQL to store, query, and manage training and reminder data.",
      "Used Excel for data validation, reporting, and cross-checking entries against system records.",
      "Automated recurring reminder generation to reduce manual tracking effort.",
    ],
    tagsLabel: "Technologies",
    tags: ["PostgreSQL", "SQL", "Python", "Excel", "Automation", "Data Reporting"],
    accent: "#ec4899",
    accent2: "#f472b6",
    soft: "#fce7f3",
    deep: "#9d174d",
  },
  {
    id: "leadership",
    tab: "Leadership",
    type: "Leadership",
    org: "College Leadership",
    role: "Head of Visual Media & Content",
    focus: "Creative & Events",
    path: "~/leadership/visual-media",
    title: "Visual Media & Content Leadership",
    description:
      "Led visual media and content initiatives while contributing to student engagement, event coordination, and creative communication across college activities.",
    steps: [
      "Joint Head of Visual Media & People's Officer",
      "Head of Visual Media & Content",
    ],
    points: [
      <>
        Served as <strong>Head of Visual Media &amp; Content</strong>, leading
        creative planning and content initiatives.
      </>,
      <>
        Previously served as <strong>Joint Head of Visual Media</strong> and{" "}
        <strong>People&apos;s Officer</strong>, supporting team coordination
        and student engagement.
      </>,
      <>
        Organised and coordinated <strong>technical events</strong> as part of
        college fests, contributing to event planning, execution, and
        participant engagement.
      </>,
      "Collaborated with multiple teams to coordinate creative content, event communication, and on-ground execution.",
    ],
    tagsLabel: "Leadership skills",
    tags: [
      "Team Leadership",
      "Content Strategy",
      "Visual Media",
      "Event Management",
      "Technical Events",
      "Team Coordination",
      "Communication",
    ],
    accent: "#a855f7",
    accent2: "#c084fc",
    soft: "#f3e8ff",
    deep: "#6b21a8",
  },
  {
    id: "design",
    tab: "Graphic Design",
    type: "Creative",
    org: "Graphic Design",
    role: "Graphic Designer",
    focus: "Visual Design",
    path: "~/creative/graphic-design",
    title: "Visual Identity & Creative Content",
    description:
      "Designed visual content for college activities and events, turning ideas into clear, eye-catching graphics that people notice and remember.",
    links: [{ label: "See my work on Canva", href: CANVA_PROFILE }],
    points: [
      "Created posters, banners, and social media graphics to promote college events and fests.",
      "Kept colours, typography, and layouts consistent so every event had a recognisable identity.",
      "Worked with teams to turn event ideas and requirements into finished visuals.",
      "Brought design thinking into content planning as part of visual media leadership.",
    ],
    tagsLabel: "Design skills",
    tags: [
      "Canva",
      "Graphic Design",
      "Visual Storytelling",
      "Branding",
      "Social Media Creatives",
      "Layout & Typography",
      "Colour Theory",
    ],
    accent: "#fb7185",
    accent2: "#fda4af",
    soft: "#ffe4e6",
    deep: "#9f1239",
    explore: {
      title: "What I design",
      hint: "Tap a topic to explore",
      items: [
        {
          label: "Posters & banners",
          detail:
            "Eye-catching posters and banners that tell people what an event is about at a glance.",
        },
        {
          label: "Social media creatives",
          detail:
            "Graphics sized and styled for social feeds, keeping every post consistent and on-brand.",
        },
        {
          label: "Event branding",
          detail:
            "Matching colours, type, and layouts across an event so it feels like one cohesive identity.",
        },
        {
          label: "Layout & typography",
          detail:
            "Clear hierarchy and readable type so the key message lands first.",
        },
      ],
    },
    // Canva links not used yet (add more designs above to use them):
    //   https://canva.link/yqpdopki5b73s9e
    //   https://canva.link/cnycpdyu8tk6qzt
    album: {
      title: "Design album",
      hint: "Open a design to view it, then jump to Canva",
      works: [
        {
          title: "Happy Ugadi",
          category: "Festival greeting",
          description:
            "A festive Ugadi greeting poster for ACE at SRM Vadapalani, built around a decorated kalasam, fruit platter, hanging lamps and a warm magenta mandala.",
          image: "/events/festival.png",
          canva: "https://canva.link/cnycpdyu8tk6qzt",
        },
        {
          title: "UberTech '24",
          category: "Event banner",
          description:
            "Wide banner for ACE's flagship tech fest on 26 and 27 September 2024, with a chrome title treatment and guest portraits on a blue-to-pink gradient.",
          image: "/events/banner.png",
          fit: "contain",
          canva: "https://canva.link/5v2fop4zmnrdjvc",
        },
        {
          title: "Tech Catalyst",
          category: "Event poster",
          description:
            "Poster for the Tech Catalyst event at UberTech '24: AI Nexus on 27 September 2024 in NS Lab, with a glowing brain-and-chip illustration, entry fee, coordinators and a QR code to register.",
          image: "/events/technical.png",
          canva: "https://canva.link/b0egzy52oifj9aa",
        },
        {
          title: "ACE Hacks",
          category: "Hackathon poster",
          description:
            "Poster for a 24-hour hackathon on 26 and 27 March 2025 with a Rs 15,000 prize pool, in collaboration with CSI Chennai Chapter. Shows team size, fee, coordinators and a QR code.",
          image: "/events/flyer.png",
          canva: "https://canva.link/svgf66wr1p96byy",
        },
        {
          title: "SRMCLIX 2021–2025",
          category: "Farewell poster",
          description:
            "A streaming-style farewell poster for the 2021 batch, with a campus hero image, a short thank-you note and a strip of batch photos.",
          image: "/events/netflix.png",
          canva: "https://canva.link/svgf66wr1p96byy",
        },
        {
          title: "Mines",
          category: "Event poster",
          description:
            "Poster for the Mines event at UberTech '24: AI Nexus on 27 September 2024 in the Auditorium, with emerald gems, a game-grid centrepiece, fees and a QR code.",
          image: "/events/nontech.png",
          canva: "https://canva.link/mjcw1c4eq4eyxi8",
        },
      ],
    },
  },
  {
    id: "events",
    tab: "Tech Events",
    type: "Events",
    org: "Tech Events",
    role: "Technical Events Organiser",
    focus: "Event Management",
    path: "~/events/technical-events",
    title: "Organising Technical Events",
    description:
      "Organised and coordinated technical events as part of college fests, from planning through to on-ground execution and participant engagement.",
    points: [
      "Planned technical events as part of college fests, including format, schedule, and team roles.",
      "Coordinated with multiple teams on creative content, event communication, and logistics.",
      "Handled on-ground execution so events ran smoothly for participants.",
      "Kept participants engaged before, during, and after each event.",
    ],
    tagsLabel: "Event skills",
    tags: [
      "Technical Events",
      "Event Management",
      "Team Coordination",
      "Planning",
      "Communication",
      "On-ground Execution",
    ],
    accent: "#818cf8",
    accent2: "#a5b4fc",
    soft: "#e0e7ff",
    deep: "#3730a3",
    explore: {
      title: "How an event comes together",
      hint: "Step through it",
      sequence: true,
      items: [
        {
          label: "Plan",
          detail:
            "Set the goal, format, schedule, and roles for the technical event so everyone knows what they own.",
        },
        {
          label: "Promote",
          detail:
            "Coordinate content and communication so participants hear about the event and sign up.",
        },
        {
          label: "Run",
          detail:
            "Handle on-ground execution with the team, keeping the schedule and the venue on track.",
        },
        {
          label: "Engage",
          detail:
            "Keep participants involved throughout, so the event feels worth coming to.",
        },
      ],
    },
  },
];

/* ============================================================
   Interactive topic / step explorer
============================================================ */
function ExploreBlock({ exp }: { exp: Exp }) {
  const data = exp.explore!;
  const [sel, setSel] = useState(0);
  const n = data.items.length;
  const item = data.items[sel];

  return (
    <div className="relative border-t border-white/70 p-6 sm:p-8 md:p-10">
      <div className="mb-5 flex flex-wrap items-baseline justify-between gap-2">
        <h5 className="text-base font-bold sm:text-lg">{data.title}</h5>
        <p className="text-xs text-[#b58aa3]">{data.hint}</p>
      </div>

      <div className="grid gap-5 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
        <div
          role="group"
          aria-label={data.title}
          className="flex flex-wrap gap-2 md:flex-col md:flex-nowrap"
        >
          {data.items.map((it, i) => {
            const on = i === sel;
            return (
              <button
                key={it.label}
                aria-pressed={on}
                onClick={() => setSel(i)}
                className="rounded-2xl border border-white/80 px-4 py-2.5 text-left text-sm font-semibold backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ec4899]"
                style={
                  on
                    ? {
                        background: `linear-gradient(135deg, ${exp.accent}, ${exp.accent2})`,
                        color: "#fff",
                        boxShadow: `0 10px 22px -8px ${exp.accent}99`,
                      }
                    : { background: `${exp.soft}b3`, color: exp.deep }
                }
              >
                {data.sequence && (
                  <span className="mr-2 opacity-70">{i + 1}.</span>
                )}
                {it.label}
              </button>
            );
          })}
        </div>

        <div
          key={sel}
          className="exp-pop relative overflow-hidden rounded-3xl border border-white/80 bg-white/55 p-5 backdrop-blur-md sm:p-6"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full opacity-40 blur-2xl"
            style={{ background: exp.accent }}
          />
          <div className="relative">
            {data.sequence && (
              <p
                className="mb-1 text-xs font-semibold"
                style={{ color: exp.accent }}
              >
                Step {sel + 1} of {n}
              </p>
            )}
            <h6 className="text-lg font-bold sm:text-xl">{item.label}</h6>
            <p className="mt-3 text-sm leading-6 text-[#7a4a64]">
              {item.detail}
            </p>

            {data.sequence && (
              <div className="mt-5 flex items-center justify-between gap-4">
                <div className="flex flex-1 gap-1.5" aria-hidden>
                  {data.items.map((_, i) => (
                    <span
                      key={i}
                      className="h-1.5 flex-1 rounded-full transition-all duration-500"
                      style={{
                        background: i <= sel ? exp.accent : `${exp.accent}33`,
                      }}
                    />
                  ))}
                </div>
                <button
                  onClick={() => setSel((sel + 1) % n)}
                  className="shrink-0 rounded-full px-4 py-2 text-xs font-semibold text-white transition-transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ec4899]"
                  style={{
                    background: `linear-gradient(135deg, ${exp.accent}, ${exp.accent2})`,
                  }}
                >
                  {sel === n - 1 ? "Start again" : "Next step"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   Design album (polaroid grid + viewer)
============================================================ */
function Cover({ work, exp }: { work: Work; exp: Exp }) {
  const [failed, setFailed] = useState(false);

  if (work.image && !failed) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={work.image}
        alt={work.title}
        loading="lazy"
        onError={() => setFailed(true)}
        className={`h-full w-full ${
          work.fit === "contain" ? "bg-[#12051f] object-contain" : "object-cover"
        }`}
      />
    );
  }
  return (
    <div
      className="relative flex h-full w-full items-end p-4"
      style={{
        background: `linear-gradient(150deg, ${exp.soft} 0%, ${exp.accent2} 100%)`,
      }}
    >
      <div
        aria-hidden
        className="absolute -right-6 -top-6 h-28 w-28 rounded-full bg-white/50 blur-xl"
      />
      <span
        className="relative text-xl font-extrabold leading-tight sm:text-2xl"
        style={{ color: exp.deep }}
      >
        {work.title}
      </span>
    </div>
  );
}

function AlbumBlock({ exp }: { exp: Exp }) {
  const album = exp.album!;
  const [open, setOpen] = useState<number | null>(null);
  const n = album.works.length;
  const tilts = [-2.5, 1.5, -1, 2.5, -1.5, 1];

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") setOpen((o) => (o === null ? o : (o + 1) % n));
      if (e.key === "ArrowLeft") setOpen((o) => (o === null ? o : (o - 1 + n) % n));
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, n]);

  const work = open !== null ? album.works[open] : null;

  return (
    <div className="relative border-t border-white/70 p-6 sm:p-8 md:p-10">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h5 className="text-base font-bold sm:text-lg">{album.title}</h5>
          <p className="mt-0.5 text-xs text-[#b58aa3]">{album.hint}</p>
        </div>
        <a
          href={CANVA_PROFILE}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full px-4 py-2 text-xs font-semibold text-white transition-transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ec4899]"
          style={{
            background: `linear-gradient(135deg, ${exp.accent}, ${exp.accent2})`,
          }}
        >
          View all on Canva
        </a>
      </div>

      <div
        className={`grid gap-4 sm:gap-6 ${
          n === 1
            ? "mx-auto max-w-[17rem] grid-cols-1"
            : "grid-cols-2 lg:grid-cols-3"
        }`}
      >
        {album.works.map((w, i) => (
          <button
            key={w.title + i}
            onClick={() => setOpen(i)}
            aria-label={`Open ${w.title}`}
            className="exp-card rounded-2xl border border-white/80 bg-white/60 p-2 pb-3 text-left shadow-[0_12px_30px_-14px_rgba(190,24,93,0.35)] backdrop-blur-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ec4899]"
            style={{ "--tilt": `${tilts[i % tilts.length]}deg` } as CSSProperties}
          >
            <div className="aspect-[4/5] overflow-hidden rounded-xl">
              <Cover work={w} exp={exp} />
            </div>
            <div className="px-1.5 pt-3">
              <p className="truncate text-sm font-semibold">{w.title}</p>
              <p className="text-xs" style={{ color: exp.accent }}>
                {w.category}
              </p>
            </div>
          </button>
        ))}
      </div>

      {work &&
        open !== null &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label={work.title}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
            onClick={() => setOpen(null)}
          >
            <div className="absolute inset-0 bg-[#3b0a2a]/45 backdrop-blur-md" />
            <div
              onClick={(e) => e.stopPropagation()}
              className="exp-pop relative grid max-h-full w-full max-w-3xl overflow-auto rounded-[2rem] border border-white/70 bg-white/75 text-[#3b0a2a] shadow-[0_30px_80px_-20px_rgba(59,10,42,0.55)] backdrop-blur-2xl md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]"
            >
              <div className="aspect-[4/5] md:aspect-auto md:min-h-[26rem]">
                <Cover work={work} exp={exp} />
              </div>

              <div className="flex flex-col gap-4 p-6 sm:p-8">
                <button
                  autoFocus
                  onClick={() => setOpen(null)}
                  className="self-end rounded-full border border-white/80 bg-white/70 px-3 py-1 text-xs font-semibold text-[#9d174d] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ec4899]"
                >
                  Close
                </button>

                <div>
                  <p
                    className="text-xs font-semibold"
                    style={{ color: exp.accent }}
                  >
                    {work.category}
                  </p>
                  <h6 className="mt-1 text-2xl font-extrabold leading-tight">
                    {work.title}
                  </h6>
                  <p className="mt-2 text-sm leading-6 text-[#7a4a64]">
                    {work.description ?? "Designed on Canva."}
                  </p>
                </div>

                <a
                  href={work.canva}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-fit rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ec4899]"
                  style={{
                    background: `linear-gradient(135deg, ${exp.accent}, ${exp.accent2})`,
                    boxShadow: `0 10px 22px -8px ${exp.accent}99`,
                  }}
                >
                  Open in Canva
                </a>

                {n > 1 && (
                  <div className="mt-auto flex items-center justify-between gap-3 pt-2">
                  <button
                    onClick={() => setOpen((open - 1 + n) % n)}
                    className="rounded-full border border-white/80 bg-white/70 px-4 py-2 text-xs font-semibold text-[#9d174d] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ec4899]"
                  >
                    Previous
                  </button>
                  <span className="text-xs text-[#b58aa3]">
                    {open + 1} / {n}
                  </span>
                  <button
                    onClick={() => setOpen((open + 1) % n)}
                    className="rounded-full border border-white/80 bg-white/70 px-4 py-2 text-xs font-semibold text-[#9d174d] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ec4899]"
                  >
                    Next
                  </button>
                </div>
                )}
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}

/* ============================================================
   Main section
============================================================ */
export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(0);

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

  const exp = EXPERIENCES[active];

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative overflow-hidden px-4 sm:px-6 md:px-10 lg:px-14 py-16 sm:py-20 md:py-28 text-[#3b0a2a]"
      style={{
        background:
          "linear-gradient(160deg, #fff1f7 0%, #fdf2f8 40%, #f5f0ff 100%)",
      }}
    >
      {/* Local keyframes */}
      <style>{`
        @keyframes exp-float {
          0%, 100% { transform: translate3d(0,0,0) scale(1); }
          50% { transform: translate3d(0,-18px,0) scale(1.06); }
        }
        @keyframes exp-pop {
          from { opacity: 0; transform: translateY(10px) scale(0.985); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes exp-draw {
          from { transform: scaleY(0); }
          to { transform: scaleY(1); }
        }
        @keyframes exp-step-in {
          from { opacity: 0; transform: translateX(-16px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes exp-travel {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        .exp-line { transform-origin: top; animation: exp-draw .9s ease-out .1s both; }
        .exp-step { animation: exp-step-in .55s ease-out both; }
        .exp-spark { animation: exp-travel 2.6s ease-in-out 1.4s infinite; }
        .exp-blob { animation: exp-float 9s ease-in-out infinite; }
        .exp-pop { animation: exp-pop .45s ease-out both; }
        .exp-card { transform: rotate(var(--tilt, 0deg)); transition: transform .3s ease, box-shadow .3s ease; }
        .exp-card:hover, .exp-card:focus-visible { transform: rotate(0deg) translateY(-6px); }
        @media (prefers-reduced-motion: reduce) {
          .exp-blob, .exp-pop, .exp-line, .exp-step, .exp-spark { animation: none; }
          .exp-card { transition: none; }
        }
      `}</style>

      {/* Blurred colour blobs: these are what the glass blurs against */}
      <div
        aria-hidden
        className="exp-blob pointer-events-none absolute -top-24 -left-20 h-72 w-72 rounded-full bg-[#f9a8d4] opacity-70 blur-3xl"
      />
      <div
        aria-hidden
        className="exp-blob pointer-events-none absolute top-1/3 -right-24 h-80 w-80 rounded-full bg-[#d8b4fe] opacity-60 blur-3xl"
        style={{ animationDelay: "-3s" }}
      />
      <div
        aria-hidden
        className="exp-blob pointer-events-none absolute -bottom-24 left-1/4 h-72 w-72 rounded-full bg-[#fecdd3] opacity-80 blur-3xl"
        style={{ animationDelay: "-6s" }}
      />

      <div
        className={`relative z-10 mx-auto max-w-6xl transition-all duration-700 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* ---------- Header ---------- */}
        <div className="mb-10 text-center sm:mb-12">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/50 px-4 py-1.5 text-xs font-semibold text-[#be185d] shadow-[0_4px_20px_rgba(236,72,153,0.15)] backdrop-blur-md sm:text-sm">
            Career &amp; Leadership
          </span>

          <h2
            className="mt-5 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl md:text-6xl"
            style={{
              backgroundImage:
                "linear-gradient(90deg, #db2777 0%, #ec4899 45%, #a855f7 100%)",
            }}
          >
            Experience
          </h2>

          <p className="mx-auto mt-4 max-w-2xl px-2 text-sm leading-relaxed text-[#9d6b88] sm:text-base">
            A journey across software development, automation, creative
            leadership, event management, and student initiatives.
          </p>
        </div>

        {/* ---------- Tab switcher ---------- */}
        <div
          role="tablist"
          aria-label="Experience"
          className="mx-auto mb-6 flex w-full max-w-3xl flex-wrap items-center justify-center gap-1.5 rounded-[1.75rem] border border-white/70 bg-white/40 p-1.5 shadow-[0_8px_30px_rgba(236,72,153,0.15)] backdrop-blur-xl sm:mb-8"
        >
          {EXPERIENCES.map((e, i) => {
            const on = i === active;
            return (
              <button
                key={e.id}
                role="tab"
                aria-selected={on}
                aria-controls={`exp-panel-${e.id}`}
                onClick={() => setActive(i)}
                className="flex-1 whitespace-nowrap rounded-full px-3 py-2.5 text-xs font-semibold transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ec4899] sm:px-4 sm:text-sm"
                style={
                  on
                    ? {
                        background: `linear-gradient(135deg, ${e.accent}, ${e.accent2})`,
                        color: "#fff",
                        boxShadow: `0 8px 20px -6px ${e.accent}99`,
                      }
                    : { color: "#9d6b88" }
                }
              >
                {e.tab}
              </button>
            );
          })}
        </div>

        {/* ---------- Glass panel ---------- */}
        <div
          key={exp.id}
          id={`exp-panel-${exp.id}`}
          role="tabpanel"
          className="exp-pop relative overflow-hidden rounded-[2rem] border border-white/70 bg-white/40 shadow-[0_24px_60px_-18px_rgba(190,24,93,0.28)] backdrop-blur-2xl md:rounded-[2.5rem]"
        >
          {/* glass sheen */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.65) 0%, rgba(255,255,255,0) 40%)",
            }}
          />
          {/* accent glow inside the panel */}
          <div
            aria-hidden
            className="pointer-events-none absolute -top-20 -left-16 h-64 w-64 rounded-full opacity-40 blur-3xl"
            style={{ background: exp.accent }}
          />

          <div className="relative grid md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
            {/* ===== Left: role card ===== */}
            <div className="flex flex-col gap-5 p-6 sm:p-8 md:p-10">
              <span
                className="w-fit rounded-full border border-white/80 px-3 py-1 text-xs font-semibold"
                style={{ background: `${exp.soft}cc`, color: exp.deep }}
              >
                {exp.type}
              </span>

              <div>
                <h3 className="text-3xl font-extrabold leading-tight sm:text-4xl">
                  {exp.org}
                </h3>
                <p className="mt-1.5 text-sm font-medium text-[#9d6b88] sm:text-base">
                  {exp.role}
                </p>
              </div>

              {/* Level-up path for roles with a progression */}
              {exp.steps && (
                <ol className="relative ml-2 space-y-4 pl-8">
                  {/* animated connecting line */}
                  <span
                    aria-hidden
                    className="exp-line absolute left-[8px] top-4 bottom-4 w-[2px] rounded-full"
                    style={{
                      background: `linear-gradient(to bottom, ${exp.accent}55, ${exp.accent})`,
                    }}
                  />
                  {/* little spark travelling down the path */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute left-[8px] top-4 bottom-4 w-[2px]"
                  >
                    <span
                      className="exp-spark absolute left-1/2 h-2 w-2 -translate-x-1/2 rounded-full"
                      style={{
                        background: "#fff",
                        boxShadow: `0 0 10px 3px ${exp.accent}`,
                      }}
                    />
                  </span>

                  {exp.steps.map((s, i) => {
                    const last = i === exp.steps!.length - 1;
                    return (
                      <li
                        key={s}
                        className="exp-step relative rounded-2xl border border-white/80 bg-white/55 px-3.5 py-2.5 backdrop-blur-md"
                        style={{ animationDelay: `${0.25 + i * 0.4}s` }}
                      >
                        {/* dot */}
                        <span
                          className="absolute -left-[32px] top-1/2 flex h-[18px] w-[18px] -translate-y-1/2 items-center justify-center rounded-full"
                          style={{
                            background: last ? exp.accent : "#ffffff",
                            border: `3px solid ${exp.accent}`,
                            boxShadow: last
                              ? `0 0 0 4px ${exp.accent}33`
                              : "none",
                          }}
                        >
                          {last && (
                            <span
                              aria-hidden
                              className="absolute inset-0 animate-ping rounded-full motion-reduce:animate-none"
                              style={{ background: exp.accent, opacity: 0.5 }}
                            />
                          )}
                        </span>

                        <span
                          className="block text-[11px] font-semibold"
                          style={{ color: exp.accent }}
                        >
                          {last ? "Now" : "Before"}
                        </span>
                        <span
                          className={`block text-xs leading-5 sm:text-sm ${
                            last ? "font-semibold" : "text-[#7a4a64]"
                          }`}
                          style={last ? { color: exp.deep } : undefined}
                        >
                          {s}
                        </span>
                      </li>
                    );
                  })}
                </ol>
              )}

              <div
                className="inline-flex w-fit items-center gap-2 rounded-full border border-white/80 bg-white/60 px-3.5 py-1.5 text-xs font-medium backdrop-blur-md sm:text-sm"
                style={{ color: exp.deep }}
              >
                <span
                  className="h-2 w-2 rounded-full animate-pulse"
                  style={{ background: exp.accent }}
                />
                {exp.focus}
              </div>

              {/* External links (e.g. Canva) */}
              {exp.links && (
                <div className="flex flex-wrap gap-2">
                  {exp.links.map((l) => (
                    <a
                      key={l.label}
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full px-4 py-2 text-xs font-semibold text-white transition-transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ec4899] sm:text-sm"
                      style={{
                        background: `linear-gradient(135deg, ${exp.accent}, ${exp.accent2})`,
                        boxShadow: `0 10px 22px -8px ${exp.accent}99`,
                      }}
                    >
                      {l.label}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* ===== Right: details ===== */}
            <div className="flex flex-col gap-6 border-t border-white/70 p-6 sm:p-8 md:border-l md:border-t-0 md:p-10">
              <div>
                <p className="mb-1.5 truncate text-xs text-[#b58aa3]">
                  {exp.path}
                </p>
                <h4 className="text-xl font-bold leading-snug sm:text-2xl">
                  {exp.title}
                </h4>
                <p className="mt-3 text-sm leading-6 text-[#7a4a64]">
                  {exp.description}
                </p>
              </div>

              {/* Responsibilities as mini glass rows */}
              <ul className="space-y-2.5">
                {exp.points.map((p, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 rounded-2xl border border-white/70 bg-white/50 p-3.5 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/70 hover:shadow-[0_10px_24px_-10px_rgba(236,72,153,0.35)]"
                  >
                    <span
                      aria-hidden
                      className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ background: exp.accent }}
                    />
                    <span className="text-sm leading-6 text-[#7a4a64] [&_strong]:font-semibold [&_strong]:text-[#3b0a2a]">
                      {p}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Tags */}
              <div>
                <p className="mb-3 text-xs font-semibold text-[#b58aa3]">
                  {exp.tagsLabel}
                </p>
                <div className="flex flex-wrap gap-2">
                  {exp.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/80 px-3 py-1.5 text-xs font-medium backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/80"
                      style={{ background: `${exp.soft}b3`, color: exp.deep }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {exp.explore && <ExploreBlock key={`${exp.id}-explore`} exp={exp} />}
          {exp.album && <AlbumBlock key={`${exp.id}-album`} exp={exp} />}
        </div>

        {/* ---------- Bottom statement ---------- */}
        <div className="mt-10 text-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-2 rounded-full border border-white/70 bg-white/50 px-5 py-3 shadow-[0_8px_30px_rgba(236,72,153,0.15)] backdrop-blur-xl sm:gap-3">
            <span className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-[#ec4899]" />
            <span className="text-xs font-medium text-[#9d174d] sm:text-sm">
              Building, leading, creating, organising
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}