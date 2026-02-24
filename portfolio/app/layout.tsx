import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { ScrollToTop } from "@/components/ScrollToTop";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { ChatBot } from "@/components/ChatBot";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: {
    default: "Aadarsh Pandit | Freelance AI & Web Developer Nepal",
    template: "%s | Aadarsh Pandit",
  },
  description: "Hire Aadarsh Pandit — Specialized freelance developer for AI/ML solutions, high-performance Next.js websites, and mobile apps. Delivering intelligent systems globally from Nepal.",
  applicationName: "Aadarsh Pandit Portfolio",
  authors: [{ name: "Aadarsh Pandit", url: "https://aadarshapandit.com.np" }],
  generator: "Next.js",
  keywords: [
    "Aadarsh Pandit",
    "Hire AI Developer",
    "Freelance Web Developer Nepal",
    "Custom AI Model Development",
    "Next.js Freelancer",
    "Machine Learning Engineer Nepal",
    "Full Stack Developer Kathmandu",
    "LLM Fine-Tuning Services",
    "ASR System Developer",
    "React Native Freelancer",
    "Software Engineer Nepal",
    "AI Consultant Nepal",
    "Python Developer Kathmandu"
  ],
  referrer: "origin-when-cross-origin",
  creator: "Aadarsh Pandit",
  publisher: "Aadarsh Pandit",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://aadarshapandit.com.np"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Aadarsh Pandit | Freelance AI & Web Developer",
    description: "Personal portfolio of Aadarsh Pandit. Building intelligent AI systems and high-scale web applications.",
    url: "https://aadarshapandit.com.np",
    siteName: "Aadarsh Pandit Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/hero.jpg",
        width: 1200,
        height: 630,
        alt: "Aadarsh Pandit Portfolio — AI & Web Development",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aadarsh Pandit | AI & Web Developer",
    description: "Specializing in Machine Learning, NLP, and Full Stack Development.",
    creator: "@aadarshapandit",
    images: ["/hero.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "tpjHQipMJijtICfYgYo4bEVD9H65u0d95y91sQ76MWU",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${outfit.variable} antialiased font-sans bg-gray-50 overflow-x-hidden max-w-full`}
      >
        <ScrollToTop />
        {children}
        <WhatsAppButton />
        <ChatBot />
      </body>
    </html>
  );
}
