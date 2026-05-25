const projects = [
  {
    title: "Fashion Portfolio",
    description: "Modern fashion brand website.",
  },
  {
    title: "Beauty Ecommerce",
    description: "Elegant skincare online store.",
  },
  {
    title: "Creative Agency",
    description: "Minimal agency portfolio design.",
  },
];

export default function Projects() {
  return (
    <section
      id="projects"
      className="py-24 px-6 max-w-6xl mx-auto"
    >
      <h2 className="text-4xl font-bold text-center">
        Projects
      </h2>

      <div className="grid md:grid-cols-3 gap-8 mt-12">
        {projects.map((project) => (
          <div
            key={project.title}
            className="p-6 rounded-3xl border border-pink-100 shadow-sm"
          >
            <div className="h-48 rounded-2xl bg-pink-100"></div>

            <h3 className="mt-6 text-2xl font-semibold">
              {project.title}
            </h3>

            <p className="mt-3 text-gray-600">
              {project.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}