import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Projects from "@/components/Projects";
import Articles from "@/components/Articles";
import Skills from "@/components/Skills";
import Certifications from "@/components/Certifications";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { profilePageJsonLd } from "@/lib/seo";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <JsonLd data={profilePageJsonLd()} />
      <Nav />
      <main className="flex-1">
        <Hero />
        <About />
        <Experience />
        <Education />
        <Projects />
        <Articles />
        <Skills />
        <Certifications />
      </main>
      <Footer />
    </div>
  );
}
