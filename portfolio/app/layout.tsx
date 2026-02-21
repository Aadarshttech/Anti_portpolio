import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { ScrollToTop } from "@/components/ScrollToTop";

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
    default: "Aadarsh Pandit | Freelance AI & Web Developer",
    template: "%s | Aadarsh Pandit",
  },
  description: "Hire Aadarsh Pandit — Freelance developer specializing in websites, mobile apps, AI/ML solutions, and automation. Based in Nepal.",
  applicationName: "Aadarsh Pandit Portfolio",
  authors: [{ name: "Aadarsh Pandit", url: "https://aadarshapandit.com.np" }],
  generator: "Next.js",
  keywords: [
    "Aadarsh Pandit",
    "Hire Developer Nepal",
    "Freelance Web Developer",
    "Custom AI Model",
    "Mobile App Developer",
    "Full Stack Freelancer",
    "Nepal Freelance Developer",
    "React",
    "Next.js",
    "Python",
    "Web Automation"
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
    description: "Hire Aadarsh Pandit — Freelance developer specializing in websites, mobile apps, AI/ML solutions, and automation.",
    url: "https://aadarshapandit.com.np",
    siteName: "Aadarsh Pandit Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/hero.jpg", // Fallback to hero image
        width: 1200,
        height: 630,
        alt: "Aadarsh Pandit Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aadarsh Pandit | AI & Web Developer",
    description: "AI Student & Developer specializing in ML, NLP, and Full Stack Web Development.",
    creator: "@aadarsh_pandit", // Placeholder if unknown, or remove
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${outfit.variable} antialiased font-sans bg-gray-50`}
      >
        <ScrollToTop />
        {children}
      </body>
    </html>
  );
}
