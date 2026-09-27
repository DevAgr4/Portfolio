export default function Footer() {
  return (
    <footer className="relative bg-[#FAFAF9] text-[#18181B] border-t border-[#E4E4E7] overflow-hidden">
      {/* Soft background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 w-96 h-32 bg-[#EC4899]/10 blur-3xl rounded-full" />
        <div className="absolute right-0 bottom-0 w-72 h-40 bg-[#8B5CF6]/5 blur-3xl rounded-full" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 md:px-14 py-10">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          
          {/* Branding */}
          <div className="text-center md:text-left">
            <h3 className="font-semibold text-lg tracking-tight text-[#18181B]">
              Devisha Agrawal
            </h3>

            <p className="font-mono text-xs text-[#71717A] mt-2">
              Software Engineer • Creative Technologist
            </p>
          </div>

          {/* Navigation */}
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-3 font-mono text-xs text-[#71717A]">
            <a
              href="#about"
              className="hover:text-[#EC4899] transition-colors duration-200"
            >
              About
            </a>

            <a
              href="#experience"
              className="hover:text-[#EC4899] transition-colors duration-200"
            >
              Experience
            </a>

            <a
              href="#projects"
              className="hover:text-[#EC4899] transition-colors duration-200"
            >
              Projects
            </a>

            <a
              href="#contact"
              className="hover:text-[#EC4899] transition-colors duration-200"
            >
              Contact
            </a>
          </nav>
        </div>

        {/* Divider */}
        <div className="h-px bg-[#E4E4E7] my-8" />

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <p className="font-mono text-[11px] text-[#A1A1AA]">
            © {new Date().getFullYear()} Devisha Agrawal. All rights reserved.
          </p>

          <p className="font-mono text-[11px] text-[#A1A1AA]">
            Built with{" "}
            <span className="text-[#EC4899]">♥</span>{" "}
            &amp; code.
          </p>
        </div>
      </div>
    </footer>
  );
}