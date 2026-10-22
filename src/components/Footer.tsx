/* -------------------------------------------------------------------------- */
/* Neumorphic tokens (same as Projects / Certificates / Contact)               */
/* -------------------------------------------------------------------------- */

const BASE = "#F4E9EF";
const raised = "shadow-[9px_9px_20px_#D8C3CF,-9px_-9px_20px_#FFFFFF]";
const raisedSm = "shadow-[5px_5px_11px_#D8C3CF,-5px_-5px_11px_#FFFFFF]";
const insetSm = "shadow-[inset_3px_3px_7px_#D8C3CF,inset_-3px_-3px_7px_#FFFFFF]";
const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B4456A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F4E9EF]";

const links = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Certificates", href: "#certificates" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer
      className="relative px-4 pb-8 pt-4 sm:px-8 sm:pb-10 md:px-14 text-[#4A2C40]"
      style={{ background: BASE, fontFamily: "'DM Sans', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Fraunces:ital,opsz,wght@0,9..144,500;1,9..144,500&display=swap');
        .f-serif { font-family: 'Fraunces', serif; }
      `}</style>

      <div
        className={`mx-auto max-w-6xl rounded-[36px] px-6 py-8 sm:px-10 sm:py-10 ${raised}`}
        style={{ background: BASE }}
      >
        {/* Top */}
        <div className="flex flex-col items-center justify-between gap-8 lg:flex-row">
          {/* Branding */}
          <div className="text-center lg:text-left">
            <p className="f-serif text-2xl sm:text-3xl">
              Devisha <em className="text-[#B4456A]">Agrawal</em>
            </p>
            <p className="mt-1.5 text-sm text-[#7A5B6E]">
              Software Engineer &amp; Creative Technologist
            </p>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer" className="w-full lg:w-auto">
            <ul className="flex flex-wrap justify-center gap-3 sm:gap-4">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={`block rounded-full px-5 py-2.5 text-sm font-medium text-[#6A4C5F] transition-shadow duration-200 hover:text-[#B4456A] hover:shadow-[inset_3px_3px_7px_#D8C3CF,inset_-3px_-3px_7px_#FFFFFF] motion-reduce:transition-none ${raisedSm} ${focusRing}`}
                    style={{ background: BASE }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Bottom */}
        <div
          className={`mt-8 flex flex-col items-center justify-between gap-2 rounded-[24px] px-5 py-3.5 text-center sm:flex-row sm:rounded-full sm:px-7 sm:text-left ${insetSm}`}
        >
          <p className="text-sm text-[#7A5B6E]">
            © {new Date().getFullYear()} Devisha Agrawal. All rights reserved.
          </p>
          <p className="text-sm text-[#7A5B6E]">
            Built with <span className="text-[#D6657F]" aria-label="love">♥</span> and code.
          </p>
        </div>
      </div>
    </footer>
  );
}