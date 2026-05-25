const certificates = [
  "Frontend Development",
  "UI/UX Design",
  "React Certification",
  "JavaScript Mastery",
];

export default function Certificates() {
  return (
    <section
      id="certificates"
      className="py-24 px-6 bg-pink-50"
    >
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-center">
          Certificates
        </h2>

        <div className="grid md:grid-cols-2 gap-6 mt-12">
          {certificates.map((certificate) => (
            <div
              key={certificate}
              className="bg-white p-6 rounded-2xl shadow-sm"
            >
              <h3 className="text-xl font-semibold">
                {certificate}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}