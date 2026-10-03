"use client";

import { useEffect, useRef, useState } from "react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

const socials = [
  {
    label: "Twitter",
    href: "https://x.com/devishaagr",
    color: "#1DA1F2",
    icon: (
      <path d="M23 4.5c-.8.36-1.66.6-2.56.71a4.48 4.48 0 001.97-2.48 8.94 8.94 0 01-2.83 1.08 4.45 4.45 0 00-7.58 4.06A12.63 12.63 0 013 3.9a4.44 4.44 0 001.38 5.94 4.4 4.4 0 01-2.02-.56v.06a4.45 4.45 0 003.57 4.36 4.5 4.5 0 01-2 .08 4.46 4.46 0 004.16 3.09A8.93 8.93 0 012 18.57 12.6 12.6 0 008.29 20.5c7.55 0 11.68-6.26 11.68-11.68l-.01-.53A8.35 8.35 0 0023 4.5z" />
    ),
  },
  {
    label: "GitHub",
    href: "https://github.com/DevAgr4",
    color: "#24292f",
    icon: (
      <path d="M12 2a10 10 0 00-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.64-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.4 9.4 0 015 0c1.9-1.29 2.74-1.02 2.74-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0012 2z" />
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/devisha-agrawal-619a662aa/",
    color: "#0A66C2",
    icon: (
      <path d="M4.98 3.5a2.5 2.5 0 11-.02 5 2.5 2.5 0 01.02-5zM3 9h4v12H3V9zm7 0h3.83v1.64h.05c.53-1 1.83-2.06 3.77-2.06 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.6c0-1.34-.02-3.06-1.87-3.06-1.87 0-2.16 1.46-2.16 2.96V21h-4V9z" />
    ),
  },
  {
    label: "Pinterest",
    href: "https://in.pinterest.com/devishaagrawal4/",
    color: "#E60023",
    icon: (
      <path d="M12 2a10 10 0 00-3.64 19.3c-.05-.82-.1-2.08.02-2.98.11-.8.7-3.38.7-3.38s-.18-.36-.18-.9c0-.85.49-1.48 1.1-1.48.52 0 .77.39.77.86 0 .52-.33 1.31-.5 2.04-.15.61.31 1.11.9 1.11 1.09 0 1.93-1.15 1.93-2.8 0-1.47-1.05-2.49-2.56-2.49-1.74 0-2.77 1.31-2.77 2.66 0 .52.2 1.09.45 1.4a.18.18 0 01.04.17l-.17.68c-.03.11-.09.14-.21.08-.79-.37-1.28-1.52-1.28-2.45 0-2 1.45-3.84 4.19-3.84 2.2 0 3.91 1.57 3.91 3.66 0 2.18-1.38 3.94-3.28 3.94-.64 0-1.24-.33-1.45-.73l-.39 1.51c-.14.55-.53 1.23-.79 1.65A10 10 0 1012 2z" />
    ),
  },
  {
    label: "Dribbble",
    href: "https://dribbble.com/devisha-agrawal",
    color: "#EA4C89",
    icon: (
      <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm6.4 4.6a8.2 8.2 0 011.7 4.9c-.25-.05-2.7-.55-5.17-.24-.06-.13-.11-.27-.17-.4-.15-.36-.32-.71-.5-1.06 2.72-1.11 3.96-2.7 4.14-3.2zM12 3.8c1.86 0 3.56.68 4.87 1.8-.15.42-1.25 1.86-3.83 2.83-1.2-2.2-2.53-4-2.74-4.31.55-.2 1.13-.32 1.7-.32zm-3.4.9c.2.28 1.52 2.09 2.74 4.24-3.47 1-6.53 1-6.87.99A8.24 8.24 0 018.6 4.7zM3.8 12v-.16c.33 0 3.9.05 7.6-1.06.21.4.4.79.58 1.19-.1.03-.19.06-.28.09-3.79 1.23-5.81 4.6-5.99 4.9A8.16 8.16 0 013.8 12zm3.34 5.87c.14-.26 1.71-3.34 5.86-4.72l.09-.03c1.05 2.9 1.48 5.34 1.59 6.02a8.25 8.25 0 01-7.54-1.27zm9.13.42c-.08-.49-.48-2.75-1.46-5.6 2.32-.37 4.35.24 4.6.32a8.24 8.24 0 01-3.14 5.28z" />
    ),
  },
];

export default function Navbar() {
  const [active, setActive] = useState("Home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [indicator, setIndicator] = useState({ left: 0, width: 0, opacity: 0 });

  const itemRefs = useRef<Array<HTMLLIElement | null>>([]);

  // ── Scroll: shrink + stronger glass ──
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Scroll-spy: highlight the link of the section you are viewing ──
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const link = navLinks.find((l) => l.href === `#${entry.target.id}`);
            if (link) setActive(link.label);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    navLinks.forEach((l) => {
      const el = document.querySelector(l.href);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // ── Sliding pink pill: follows hover, rests on the active link ──
  const measure = (label: string) => {
    const idx = navLinks.findIndex((l) => l.label === label);
    const el = itemRefs.current[idx];
    if (el) setIndicator({ left: el.offsetLeft, width: el.offsetWidth, opacity: 1 });
  };

  useEffect(() => {
    measure(active);
    const onResize = () => measure(active);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  // ── Close mobile menu with Escape ──
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // ── 3D magnetic tilt (logo + social icons) ──
  const handleTilt = (e: React.MouseEvent<HTMLElement>, max = 14, lift = 1.12) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(400px) rotateY(${px * max}deg) rotateX(${-py * max}deg) scale(${lift})`;
  };
  const resetTilt = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.transform =
      "perspective(400px) rotateY(0deg) rotateX(0deg) scale(1)";
  };

  return (
    <header
      className={`fixed left-0 w-full z-50 px-3 sm:px-4 transition-all duration-500 ${
        isScrolled ? "top-2" : "top-3 sm:top-4"
      }`}
    >
      {/* ── Floating pill ── */}
      <nav
        className={`max-w-6xl mx-auto flex items-center justify-between lg:grid lg:grid-cols-[1fr_auto_1fr] rounded-full border border-[#e83e8c]/20 px-3 sm:px-5 transition-all duration-500 ${
          isScrolled
            ? "py-1.5 bg-white/80 backdrop-blur-md shadow-[0_10px_35px_rgba(232,62,140,0.18)]"
            : "py-2.5 bg-white/95 shadow-[0_6px_24px_rgba(232,62,140,0.10)]"
        }`}
      >
        {/* Left: links (large screens) */}
        <ul className="hidden lg:flex relative items-center gap-1 text-sm justify-self-start">
          <span
            className="absolute top-0 h-full rounded-full bg-[#e83e8c]/10 border border-[#e83e8c]/20 transition-all duration-300 ease-[cubic-bezier(.4,0,.2,1)] pointer-events-none"
            style={{ left: indicator.left, width: indicator.width, opacity: indicator.opacity }}
          />
          {navLinks.map((link, i) => (
            <li
              key={link.label}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              onMouseEnter={() => measure(link.label)}
              onMouseLeave={() => measure(active)}
              className="relative z-10"
            >
              <a
                href={link.href}
                onClick={() => setActive(link.label)}
                className={`block px-4 py-2 rounded-full transition-colors duration-200 ${
                  active === link.label
                    ? "text-[#e83e8c] font-medium"
                    : "text-[#7a6572] hover:text-[#2a1a26]"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Center: logo (circle only on large screens, circle + name on smaller) */}
        <a
          href="#home"
          onClick={() => setActive("Home")}
          aria-label="Devisha Agrawal, home"
          onMouseMove={(e) => handleTilt(e, 16, 1.08)}
          onMouseLeave={resetTilt}
          className="flex items-center gap-2.5 shrink-0 transition-transform duration-200 ease-out will-change-transform"
          style={{ transformStyle: "preserve-3d" }}
        >
          <span className="w-10 h-10 rounded-full bg-gradient-to-br from-[#e83e8c] to-[#ff7ab8] text-white flex items-center justify-center text-sm font-bold shadow-[0_6px_18px_rgba(232,62,140,0.4)]">
            DA
          </span>
          <span className="lg:hidden text-sm sm:text-base font-bold text-[#2a1a26]">
            Devisha<span className="text-[#e83e8c]"> Agrawal</span>
          </span>
        </a>

        {/* Right: social icons (large screens) */}
        <ul className="hidden lg:flex items-center gap-2.5 justify-self-end">
          {socials.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                onMouseMove={(e) => handleTilt(e, 20, 1.15)}
                onMouseLeave={resetTilt}
                className="group relative w-9 h-9 rounded-full flex items-center justify-center bg-white border border-[#e83e8c]/25 shadow-sm overflow-hidden transition-[box-shadow] duration-300 ease-out will-change-transform hover:shadow-[0_8px_18px_rgba(232,62,140,0.25)]"
                style={{ transformStyle: "preserve-3d" }}
              >
                <span
                  className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ backgroundColor: s.color }}
                />
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="relative z-10 text-[#e83e8c] group-hover:text-white transition-colors duration-300"
                >
                  {s.icon}
                </svg>
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile / tablet: hamburger that morphs into an X */}
        <button
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
          className="lg:hidden relative w-10 h-10 rounded-full bg-[#e83e8c]/10 flex flex-col items-center justify-center gap-[5px]"
        >
          <span
            className={`w-5 h-[1.5px] bg-[#e83e8c] transition-all duration-300 ${
              menuOpen ? "rotate-45 translate-y-[6.5px]" : ""
            }`}
          />
          <span
            className={`w-5 h-[1.5px] bg-[#e83e8c] transition-all duration-300 ${
              menuOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`w-5 h-[1.5px] bg-[#e83e8c] transition-all duration-300 ${
              menuOpen ? "-rotate-45 -translate-y-[6.5px]" : ""
            }`}
          />
        </button>
      </nav>

      {/* ── Mobile / tablet menu panel ── */}
      <div
        className={`lg:hidden max-w-6xl mx-auto overflow-hidden transition-all duration-500 ease-[cubic-bezier(.4,0,.2,1)] ${
          menuOpen ? "max-h-[30rem] opacity-100 mt-2" : "max-h-0 opacity-0"
        }`}
      >
        <div className="rounded-3xl bg-white/95 backdrop-blur-md border border-[#e83e8c]/20 shadow-[0_16px_40px_rgba(232,62,140,0.18)] p-4">
          <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {navLinks.map((link, i) => (
              <li
                key={link.label}
                className="transition-all duration-300"
                style={{
                  transitionDelay: menuOpen ? `${i * 50}ms` : "0ms",
                  transform: menuOpen ? "translateY(0)" : "translateY(-8px)",
                  opacity: menuOpen ? 1 : 0,
                }}
              >
                <a
                  href={link.href}
                  onClick={() => {
                    setActive(link.label);
                    setMenuOpen(false);
                  }}
                  className={`block text-center px-4 py-2.5 rounded-2xl text-sm transition-colors ${
                    active === link.label
                      ? "bg-gradient-to-r from-[#e83e8c] to-[#ff7ab8] text-white font-medium shadow-[0_6px_16px_rgba(232,62,140,0.3)]"
                      : "bg-[#e83e8c]/5 text-[#2a1a26] hover:bg-[#e83e8c]/10"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-4 pt-4 border-t border-[#e83e8c]/15">
            <p className="text-center font-mono text-[11px] text-[#7a6572] mb-3">
              find me on
            </p>
            <ul className="flex items-center justify-center gap-3 flex-wrap">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-transform active:scale-95 hover:-translate-y-0.5"
                    style={{ backgroundColor: s.color }}
                  >
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="white">
                      {s.icon}
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}