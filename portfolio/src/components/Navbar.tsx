"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const links = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Certificates", href: "#certificates" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("Home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600&family=DM+Sans:wght@300;400;500&display=swap');

        .nav-wrapper {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: ${scrolled ? "10px 24px" : "16px 24px"};
          transition: padding 0.4s cubic-bezier(0.4,0,0.2,1);
        }

        .navbar {
          width: 100%;
          max-width: 900px;
          background: rgba(255, 250, 252, ${scrolled ? "0.94" : "0.78"});
          backdrop-filter: blur(18px) saturate(1.6);
          -webkit-backdrop-filter: blur(18px) saturate(1.6);
          border: 1px solid rgba(244, 184, 200, 0.28);
          border-radius: ${scrolled ? "999px" : "0px"};
          padding: ${scrolled ? "11px 24px" : "14px 28px"};
          display: flex;
          align-items: center;
          justify-content: space-between;
          transition:
            border-radius 0.5s cubic-bezier(0.4,0,0.2,1),
            padding 0.4s cubic-bezier(0.4,0,0.2,1),
            box-shadow 0.4s ease,
            background 0.4s ease;
          box-shadow: ${scrolled
            ? "0 8px 32px rgba(212,83,126,0.10), 0 2px 8px rgba(212,83,126,0.06)"
            : "none"};
        }

        .logo {
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px;
          font-weight: 600;
          color: #c0445c;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 8px;
          letter-spacing: 0.02em;
        }

        .logo-dot {
          width: 7px;
          height: 7px;
          background: linear-gradient(135deg, #e88fa2, #c0445c);
          border-radius: 50%;
          flex-shrink: 0;
          transition: transform 0.3s ease;
        }

        .logo:hover .logo-dot { transform: scale(1.5); }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 2px;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .nav-link {
          font-family: 'DM Sans', sans-serif;
          font-size: 13.5px;
          font-weight: 400;
          color: #8a5060;
          text-decoration: none;
          padding: 6px 12px;
          border-radius: 999px;
          transition: background 0.22s ease, color 0.22s ease;
          position: relative;
          letter-spacing: 0.01em;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 4px;
          left: 50%;
          transform: translateX(-50%) scaleX(0);
          width: 16px;
          height: 1.5px;
          background: #c0445c;
          border-radius: 99px;
          transition: transform 0.25s cubic-bezier(0.4,0,0.2,1);
        }

        .nav-link:hover { background: rgba(212,83,126,0.08); color: #c0445c; }
        .nav-link:hover::after, .nav-link.active::after { transform: translateX(-50%) scaleX(1); }
        .nav-link.active { background: rgba(212,83,126,0.12); color: #b03555; font-weight: 500; }

        .cta-btn {
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          color: #fff;
          background: linear-gradient(135deg, #e07090 0%, #c0445c 100%);
          padding: 7px 18px;
          border-radius: 999px;
          text-decoration: none;
          letter-spacing: 0.02em;
          box-shadow: 0 2px 12px rgba(192,68,92,0.22);
          transition: transform 0.18s ease, box-shadow 0.18s ease;
          white-space: nowrap;
        }

        .cta-btn:hover {
          transform: translateY(-1px) scale(1.03);
          box-shadow: 0 6px 20px rgba(192,68,92,0.30);
          color: #fff;
        }

        .hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          cursor: pointer;
          background: none;
          border: none;
          padding: 4px;
        }

        .hamburger span {
          display: block;
          width: 22px;
          height: 1.5px;
          background: #c0445c;
          border-radius: 99px;
          transition: all 0.3s ease;
        }

        .mobile-menu {
          width: 100%;
          max-width: 900px;
          margin-top: 8px;
          background: rgba(255, 250, 252, 0.97);
          backdrop-filter: blur(18px);
          border: 1px solid rgba(244, 184, 200, 0.28);
          border-radius: 20px;
          padding: 12px;
          box-shadow: 0 16px 48px rgba(192,68,92,0.12);
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 2px;
          animation: slideDown 0.25s cubic-bezier(0.4,0,0.2,1);
        }

        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .mobile-menu .nav-link {
          display: block;
          font-size: 15px;
          padding: 10px 16px;
          border-radius: 12px;
        }

        .mobile-cta {
          display: inline-block;
          margin-top: 4px;
          margin-left: 4px;
        }

        @media (max-width: 640px) {
          .nav-links { display: none; }
          .hamburger { display: flex; }
        }
      `}</style>

      <div className="nav-wrapper">
        <nav className="navbar" role="navigation" aria-label="Portfolio navigation">
          {/* Logo */}
          <Link href="#home" className="logo">
            <span className="logo-dot" />
            Portfolio
          </Link>

          {/* Desktop links */}
          <ul className="nav-links">
            {links.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className={`nav-link ${active === link.name ? "active" : ""}`}
                  onClick={() => setActive(link.name)}
                >
                  {link.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href="#contact" className="cta-btn">
                Contact
              </Link>
            </li>
          </ul>

          {/* Hamburger */}
          <button
            className="hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span style={{ transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : "none" }} />
            <span style={{ opacity: menuOpen ? 0 : 1, transform: menuOpen ? "scaleX(0)" : "none" }} />
            <span style={{ transform: menuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none" }} />
          </button>
        </nav>

        {/* Mobile menu */}
        {menuOpen && (
          <ul className="mobile-menu">
            {links.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className={`nav-link ${active === link.name ? "active" : ""}`}
                  onClick={() => { setActive(link.name); setMenuOpen(false); }}
                >
                  {link.name}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="#contact"
                className="cta-btn mobile-cta"
                onClick={() => setMenuOpen(false)}
              >
                Contact
              </Link>
            </li>
          </ul>
        )}
      </div>
    </>
  );
}