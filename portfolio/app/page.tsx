import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { Projects } from "@/components/Projects";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Freelance AI Developer & Full Stack Web Expert | Aadarsh Pandit",
  description: "Specialized in custom AI models (ASR, NLP, ML), high-performance Next.js websites, and React Native apps. Delivering innovative software solutions from Nepal.",
  keywords: [
    "Freelance AI Developer Nepal",
    "Best Web Developer Kathmandu",
    "Next.js SEO Expert",
    "Machine Learning Freelancer",
    "Hire React Developer Nepal",
    "Nepali ASR System Developer",
    "Full Stack AI Engineer"
  ],
  alternates: {
    canonical: "https://aadarshapandit.com.np",
  },
};

export default function Home() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Aadarsh Pandit",
      "url": "https://aadarshapandit.com.np",
      "image": "https://aadarshapandit.com.np/transparent2.png",
      "jobTitle": "Freelance AI & Full Stack Developer",
      "description": "Experienced developer specializing in Machine Learning, NLP, and Full Stack Web Development with Next.js and React.",
      "alumniOf": {
        "@type": "CollegeOrUniversity",
        "name": "Kathmandu University"
      },
      "knowsAbout": [
        "Artificial Intelligence",
        "Machine Learning",
        "Web Development",
        "Next.js",
        "Natural Language Processing",
        "Automatic Speech Recognition"
      ],
      "sameAs": [
        "https://github.com/Aadarshttech",
        "https://linkedin.com/in/aadarsh-pandit",
        "https://twitter.com/aadarshapandit",
        "https://instagram.com/aadarsh_pandit17"
      ],
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://aadarshapandit.com.np"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Aadarsh Pandit Portfolio",
      "url": "https://aadarshapandit.com.np"
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://aadarshapandit.com.np"
        }
      ]
    }
  ];

  return (
    <main className="min-h-screen bg-white selection:bg-orange-100 selection:text-orange-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Projects />
      <Contact />
      <Footer />
    </main>
  );
}
