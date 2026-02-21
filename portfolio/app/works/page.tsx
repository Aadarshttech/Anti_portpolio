import type { Metadata } from "next";
import { WorksNavbar } from "@/components/works/WorksNavbar";
import { WorksHero } from "@/components/works/WorksHero";
import { ServiceShowcase } from "@/components/works/ServiceShowcase";
import { CaseStudies } from "@/components/works/CaseStudies";
import { ProcessTimeline } from "@/components/works/ProcessTimeline";
import { FAQ } from "@/components/works/FAQ";
import { ProjectInquiryForm } from "@/components/works/ProjectInquiryForm";

export const metadata: Metadata = {
    title: "Freelance Services & Projects — Hire a Full Stack AI Developer",
    description:
        "Explore Aadarsh Pandit's freelance services: custom AI/ML models, high-performance Next.js websites, React Native mobile apps, and workflow automation. View case studies and request a free consultation.",
    keywords: [
        "Freelance Web Developer Nepal",
        "Hire AI Developer",
        "Custom AI Model Development",
        "Full Stack Freelancer",
        "Next.js Developer",
        "React Native Developer Nepal",
        "Machine Learning Freelancer",
        "LLM Fine-Tuning",
        "PyTorch Developer",
        "Freelance Software Engineer Nepal",
        "Website Development Nepal",
        "Mobile App Developer Nepal",
        "Aadarsh Pandit Freelance",
    ],
    alternates: {
        canonical: "/works",
    },
    openGraph: {
        title: "Freelance Services & Projects — Aadarsh Pandit",
        description:
            "Hire Aadarsh Pandit for custom AI models, full-stack web apps, mobile development, and automation. View proven case studies and get a free consultation.",
        url: "https://aadarshapandit.com.np/works",
        siteName: "Aadarsh Pandit Portfolio",
        locale: "en_US",
        type: "website",
        images: [
            {
                url: "/images/asr.png",
                width: 1200,
                height: 630,
                alt: "Aadarsh Pandit — Freelance AI & Web Development Services",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Freelance AI & Web Developer — Aadarsh Pandit",
        description:
            "Custom AI models, Next.js websites, mobile apps, and workflow automation. View case studies and hire me for your next project.",
        images: ["/images/asr.png"],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large" as const,
            "max-snippet": -1,
        },
    },
};

// JSON-LD Structured Data for richer Google Search results
const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Aadarsh Pandit — Freelance AI & Web Developer",
    url: "https://aadarshapandit.com.np/works",
    description:
        "Full-stack freelance developer specializing in AI/ML, web applications, mobile apps, and workflow automation.",
    provider: {
        "@type": "Person",
        name: "Aadarsh Pandit",
        url: "https://aadarshapandit.com.np",
        jobTitle: "Freelance AI & Full Stack Developer",
        address: {
            "@type": "PostalAddress",
            addressCountry: "NP",
        },
    },
    areaServed: "Worldwide",
    serviceType: [
        "Web Development",
        "AI & Machine Learning",
        "Mobile App Development",
        "Workflow Automation",
    ],
    offers: {
        "@type": "Offer",
        availability: "https://schema.org/InStock",
        description: "Free initial consultation available",
    },
};

export default function WorksPage() {
    return (
        <>
            {/* JSON-LD Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <main className="min-h-screen bg-[#0A0A0A] text-white overflow-x-hidden">
                <WorksNavbar />
                <WorksHero />
                <ServiceShowcase />
                <CaseStudies />
                <ProcessTimeline />
                <FAQ />
                <ProjectInquiryForm />

                {/* Simple dark footer for works page */}
                <footer className="py-12 bg-[#050508] border-t border-white/5 text-center">
                    <p className="text-gray-600 text-sm">
                        © {new Date().getFullYear()} Aadarsh Pandit. All rights reserved.
                    </p>
                </footer>
            </main>
        </>
    );
}
