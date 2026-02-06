import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { Projects } from "@/components/Projects";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white selection:bg-orange-100 selection:text-orange-900">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Projects />
      <Contact />
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Aadarsh Pandit",
            url: "https://aadarshapandit.com.np",
            image: "https://aadarshapandit.com.np/transparent2.png",
            jobTitle: "AI & Web Developer",
            alumniOf: "Nepal",
            sameAs: [
              "https://github.com/Aadarshttech",
              "https://linkedin.com/in/aadarsh-pandit",
              "https://twitter.com/aadarshapandit",
            ],
            knowsAbout: [
              "Machine Learning",
              "Web Development",
              "Next.js",
              "React",
              "Python",
              "Natural Language Processing",
            ],
          }),
        }}
      />
    </main>
  );
}
