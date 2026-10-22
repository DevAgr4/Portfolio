"use client";

import { useState } from "react";

/* -------------------------------------------------------------------------- */
/* Neumorphic tokens (same as Projects / Certificates)                         */
/* -------------------------------------------------------------------------- */

const BASE = "#F4E9EF";
const raised = "shadow-[9px_9px_20px_#D8C3CF,-9px_-9px_20px_#FFFFFF]";
const raisedSm = "shadow-[5px_5px_11px_#D8C3CF,-5px_-5px_11px_#FFFFFF]";
const inset = "shadow-[inset_6px_6px_13px_#D8C3CF,inset_-6px_-6px_13px_#FFFFFF]";
const insetSm = "shadow-[inset_3px_3px_7px_#D8C3CF,inset_-3px_-3px_7px_#FFFFFF]";
const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B4456A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F4E9EF]";

const fieldClass = `w-full rounded-[20px] border border-transparent px-5 py-4 text-base text-[#4A2C40] outline-none transition-shadow duration-200 placeholder:text-[#B39AA9] focus:border-[#D6657F]/50 disabled:cursor-not-allowed disabled:opacity-60 ${inset}`;

/* -------------------------------------------------------------------------- */
/* Component                                                                   */
/* -------------------------------------------------------------------------- */

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || "Failed to send message.");
      }

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
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
      className="relative overflow-hidden px-4 py-16 sm:px-8 sm:py-20 md:px-14 md:py-28 text-[#4A2C40]"
      style={{ background: BASE, fontFamily: "'DM Sans', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Fraunces:ital,opsz,wght@0,9..144,500;1,9..144,500&display=swap');
        .k-serif { font-family: 'Fraunces', serif; }
      `}</style>

      <div className="relative mx-auto max-w-6xl">
        {/* Header */}
        <header className="mb-10 text-center md:mb-14">
          <h2 className="k-serif text-4xl leading-[1.1] sm:text-5xl md:text-6xl">
            Let&rsquo;s <em className="text-[#B4456A]">talk</em>
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-[#7A5B6E]">
            Have a project, an opportunity, or just want to say hello? Send a message and
            I&rsquo;ll get back to you.
          </p>
        </header>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-10">
          {/* Info panel */}
          <aside
            className={`flex flex-col rounded-[36px] p-6 sm:p-9 ${raised}`}
            style={{ background: BASE }}
          >
            <h3 className="k-serif text-2xl leading-snug sm:text-3xl">
              Have something <em className="text-[#B4456A]">interesting</em> in mind?
            </h3>
            <p className="mt-4 text-base leading-relaxed text-[#6A4C5F]">
              Whether it&rsquo;s a collaboration, internship, freelance project, or simply a
              conversation about technology, I&rsquo;d love to hear from you.
            </p>

            <ul className="mt-8 space-y-5">
              <li>
                <a
                  href="mailto:devishaagrawal4@gmail.com"
                  className={`flex items-center gap-4 rounded-[24px] p-3 ${focusRing}`}
                >
                  <span
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-[#B4456A] ${raisedSm}`}
                    style={{ background: BASE }}
                    aria-hidden
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm text-[#7A5B6E]">Email</span>
                    <span className="block break-all text-base font-medium">
                      devishaagrawal4@gmail.com
                    </span>
                  </span>
                </a>
              </li>

              <li className="flex items-center gap-4 p-3">
                <span
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-[#9B7BD6] ${raisedSm}`}
                  style={{ background: BASE }}
                  aria-hidden
                >
                  <svg
                    width="20"
                    height="20"
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
                </span>
                <span>
                  <span className="block text-sm text-[#7A5B6E]">Location</span>
                  <span className="block text-base font-medium">Chennai, India</span>
                </span>
              </li>
            </ul>

            <p
              className={`mt-8 rounded-full px-5 py-3 text-center text-sm text-[#7A5B6E] lg:mt-auto ${insetSm}`}
            >
              I usually reply within 24–48 hours.
            </p>
          </aside>

          {/* Form panel */}
          <div
            className={`rounded-[36px] p-6 sm:p-9 ${raised}`}
            style={{ background: BASE }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-2.5 block pl-2 text-sm font-semibold text-[#7A5B6E]">
                    Your name
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    autoComplete="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                    disabled={loading}
                    className={fieldClass}
                    style={{ background: BASE }}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="mb-2.5 block pl-2 text-sm font-semibold text-[#7A5B6E]">
                    Email address
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                    disabled={loading}
                    className={fieldClass}
                    style={{ background: BASE }}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="mb-2.5 block pl-2 text-sm font-semibold text-[#7A5B6E]">
                  Your message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me a little about your idea…"
                  rows={6}
                  required
                  disabled={loading}
                  className={`${fieldClass} resize-none leading-relaxed`}
                  style={{ background: BASE }}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full rounded-full px-8 py-4 text-base font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 motion-reduce:transition-none ${focusRing}`}
                style={{
                  background: "linear-gradient(135deg, #D6657F, #B4456A)",
                  boxShadow: "6px 6px 14px #D8C3CF, -6px -6px 14px #FFFFFF",
                }}
              >
                {loading ? "Sending…" : "Send message"}
              </button>

              <div aria-live="polite">
                {status && (
                  <p
                    role={status === "success" ? "status" : "alert"}
                    className={`rounded-[20px] px-5 py-3.5 text-center text-sm font-medium ${insetSm} ${
                      status === "success" ? "text-[#2f8f6f]" : "text-[#C0392B]"
                    }`}
                    style={{ background: BASE }}
                  >
                    {status === "success"
                      ? "Message sent. I’ll get back to you soon."
                      : status}
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}