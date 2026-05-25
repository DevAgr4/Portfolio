export default function Contact() {
  return (
    <section
      id="contact"
      className="py-24 px-6 max-w-4xl mx-auto"
    >
      <h2 className="text-4xl font-bold text-center">
        Contact Me
      </h2>

      <form className="mt-12 space-y-6">
        <input
          type="text"
          placeholder="Your Name"
          className="w-full p-4 border rounded-2xl outline-none"
        />

        <input
          type="email"
          placeholder="Your Email"
          className="w-full p-4 border rounded-2xl outline-none"
        />

        <textarea
          placeholder="Your Message"
          rows={6}
          className="w-full p-4 border rounded-2xl outline-none"
        />

        <button className="px-8 py-4 bg-pink-600 text-white rounded-full hover:bg-pink-700 transition">
          Send Message
        </button>
      </form>
    </section>
  );
}