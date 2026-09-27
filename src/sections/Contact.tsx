
"use client";

import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setStatus("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || data.message || "Failed to send message."
        );
      }

      setStatus("success");

      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.error("Contact form error:", error);

      setStatus(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-[#f8f7f4] px-5 py-20 sm:px-8 sm:py-24 md:px-14 lg:py-28"
    >
      {/* Background Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(#121214 0.7px, transparent 0.7px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Ambient Glows */}
      <div className="absolute -left-32 -top-32 h-72 w-72 pointer-events-none rounded-full bg-[#ec4899]/20 blur-3xl" />

      <div className="absolute -bottom-32 -right-32 h-80 w-80 pointer-events-none rounded-full bg-[#8b5cf6]/20 blur-3xl" />

      <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 pointer-events-none rounded-full bg-[#06b6d4]/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-6xl">

        {/* Section Heading */}
        <div className="mb-12 text-center sm:mb-16">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#121214]/10 bg-white/80 px-4 py-2 shadow-sm backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#10b981] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#10b981]" />
            </span>

            <span className="font-mono text-[11px] font-medium tracking-wide text-[#52525b]">
              AVAILABLE FOR OPPORTUNITIES
            </span>
          </div>

          <h2 className="text-4xl font-bold tracking-tight text-[#121214] sm:text-5xl lg:text-6xl">
            Let&apos;s{" "}
            <span className="bg-gradient-to-r from-[#ec4899] via-[#8b5cf6] to-[#06b6d4] bg-clip-text text-transparent">
              connect.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-[#71717a] sm:text-base">
            Have a project, opportunity, or just want to say hello?
            Drop me a message and I&apos;ll get back to you.
          </p>
        </div>

        {/* Main Contact Card */}
        <div className="grid overflow-hidden rounded-[2rem] border border-[#121214]/10 bg-white/70 shadow-[0_25px_80px_-25px_rgba(18,18,20,0.25)] backdrop-blur-xl md:grid-cols-5">

          {/* Left Side */}
          <div className="relative overflow-hidden bg-[#121214] p-7 text-white sm:p-10 md:col-span-2 lg:p-12">

            {/* Glow */}
            <div className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-[#ec4899]/25 blur-3xl" />

            <div className="absolute -bottom-20 -left-20 h-52 w-52 rounded-full bg-[#8b5cf6]/25 blur-3xl" />

            <div className="relative z-10 flex h-full flex-col">

              <div>
                <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-[#f472b6]">
                  Get in touch
                </p>

                <h3 className="text-2xl font-bold leading-tight sm:text-3xl">
                  Have something
                  <br />
                  <span className="text-[#a1a1aa]">
                    interesting in mind?
                  </span>
                </h3>

                <p className="mt-5 text-sm leading-relaxed text-[#a1a1aa]">
                  Whether it&apos;s a collaboration, internship, freelance
                  project, or simply a conversation about technology,
                  I&apos;d love to hear from you.
                </p>
              </div>

              {/* Contact Details */}
              <div className="mt-10 space-y-5">

                {/* Email */}
                <a
                  href="mailto:devishaagrawal4@gmail.com"
                  className="group flex items-center gap-4"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition-all group-hover:border-[#ec4899]/50 group-hover:bg-[#ec4899]/10">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect
                        width="20"
                        height="16"
                        x="2"
                        y="4"
                        rx="2"
                      />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  </div>

                  <div className="min-w-0">
                    <p className="font-mono text-[10px] uppercase tracking-wider text-[#71717a]">
                      Email
                    </p>

                    <p className="truncate text-sm text-[#e4e4e7] transition-colors group-hover:text-[#f472b6]">
                      devishaagrawal4@gmail.com
                    </p>
                  </div>
                </a>

                {/* Location */}
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>

                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-wider text-[#71717a]">
                      Location
                    </p>

                    <p className="text-sm text-[#e4e4e7]">
                      Chennai, India
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Decoration */}
              <div className="mt-auto hidden pt-12 md:block">
                <div className="flex items-center gap-3">
                  <div className="h-px flex-1 bg-white/10" />

                  <span className="font-mono text-[10px] text-[#52525b]">
                    DEV / 2026
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="p-7 sm:p-10 md:col-span-3 lg:p-12">

            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >

              {/* Name + Email */}
              <div className="grid gap-6 sm:grid-cols-2">

                {/* Name */}
                <div className="group">
                  <label
                    htmlFor="name"
                    className="mb-2 block font-mono text-[11px] font-medium uppercase tracking-wider text-[#52525b]"
                  >
                    Your Name
                  </label>

                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                    disabled={loading}
                    className="w-full rounded-xl border border-[#121214]/10 bg-white/80 px-4 py-3.5 text-sm text-[#121214] outline-none transition-all placeholder:text-[#a1a1aa] focus:border-[#ec4899]/60 focus:bg-white focus:ring-4 focus:ring-[#ec4899]/10 disabled:cursor-not-allowed disabled:opacity-60"
                  />
                </div>

                {/* Email */}
                <div className="group">
                  <label
                    htmlFor="email"
                    className="mb-2 block font-mono text-[11px] font-medium uppercase tracking-wider text-[#52525b]"
                  >
                    Email Address
                  </label>

                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                    disabled={loading}
                    className="w-full rounded-xl border border-[#121214]/10 bg-white/80 px-4 py-3.5 text-sm text-[#121214] outline-none transition-all placeholder:text-[#a1a1aa] focus:border-[#8b5cf6]/60 focus:bg-white focus:ring-4 focus:ring-[#8b5cf6]/10 disabled:cursor-not-allowed disabled:opacity-60"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block font-mono text-[11px] font-medium uppercase tracking-wider text-[#52525b]"
                >
                  Your Message
                </label>

                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me a little about your idea..."
                  rows={6}
                  required
                  disabled={loading}
                  className="w-full resize-none rounded-xl border border-[#121214]/10 bg-white/80 px-4 py-3.5 text-sm leading-relaxed text-[#121214] outline-none transition-all placeholder:text-[#a1a1aa] focus:border-[#06b6d4]/60 focus:bg-white focus:ring-4 focus:ring-[#06b6d4]/10 disabled:cursor-not-allowed disabled:opacity-60"
                />
              </div>

              {/* Submit */}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <p className="hidden text-[11px] text-[#a1a1aa] sm:block">
                  I&apos;ll usually respond within 24–48 hours.
                </p>

                <button
                  type="submit"
                  disabled={loading}
                  className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-[#121214] px-7 py-4 text-sm font-medium text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-black hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                >
                  <span className="relative z-10">
                    {loading ? "Sending..." : "Send Message"}
                  </span>

                  {!loading && (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="relative z-10 transition-transform duration-300 group-hover:translate-x-1"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  )}

                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-[#ec4899] via-[#8b5cf6] to-[#06b6d4] transition-transform duration-500 group-hover:translate-x-0" />
                </button>
              </div>

              {/* Status */}
              {status && (
                <div
                  className={`rounded-xl border px-4 py-3 text-center text-sm ${
                    status === "success"
                      ? "border-[#10b981]/20 bg-[#10b981]/10 text-[#047857]"
                      : "border-red-200 bg-red-50 text-red-600"
                  }`}
                >
                  {status === "success"
                    ? "✓ Message sent successfully! I&apos;ll get back to you soon."
                    : status}
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Text */}
        <div className="mt-8 text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#a1a1aa]">
            Let&apos;s build something meaningful together
          </p>
        </div>
      </div>
    </section>
  );
}
