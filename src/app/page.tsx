import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import Hero from "@/sections/Hero";
import About from "@/sections/About";
import Skills from "@/sections/Skills";
import Projects from "@/sections/Projects";
import Certificates from "@/sections/Certificates";
import Contact from "@/sections/Contact";

export default function Home() {
  return (
    <main className="bg-white text-gray-900">
      <Navbar />

      <Hero />
      <About />
      <Skills />
      <Projects />
      <Certificates />
      <Contact />

      <Footer />
    </main>
  );
}