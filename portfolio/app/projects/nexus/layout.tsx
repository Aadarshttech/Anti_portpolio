import { Metadata } from 'next';
import Script from 'next/script';

const BASE_URL = 'https://aadarshapandit.com.np';
const PAGE_URL = `${BASE_URL}/projects/nexus`;
const OG_IMAGE = `${BASE_URL}/projects/nexus/og-banner.png`;

export const metadata: Metadata = {
    metadataBase: new URL(BASE_URL),
    title: 'NEXUS | Interactive 3D Component Hub | Aadarsh Pandit',
    description:
        'NEXUS is a dark-mode futuristic interactive 3D hub by Aadarsh Pandit. Explore immersive WebGL experiences — AI robot, neural core, glass typography, and a 3D Nepal Cricket Jersey — all powered by Spline, Next.js, and Framer Motion.',
    keywords: [
        'Interactive 3D website',
        'Spline 3D Next.js',
        'WebGL web experience',
        'Futuristic UI design',
        'Creative portfolio project',
        'Aadarsh Pandit portfolio',
        'Interactive web components',
        'Framer Motion animations',
        '3D Nepal cricket jersey',
        'Dark mode web design',
        'AI robot 3D visualization',
        'Immersive web design Nepal',
        'Next.js interactive showcase',
        'Real-time 3D web',
    ],
    authors: [{ name: 'Aadarsh Pandit', url: BASE_URL }],
    creator: 'Aadarsh Pandit',
    publisher: 'Aadarsh Pandit',
    alternates: {
        canonical: PAGE_URL,
    },
    openGraph: {
        title: 'NEXUS | Interactive 3D Component Hub',
        description:
            'Explore cutting-edge 3D web components — AI robot, neural core, glass typography & Nepal cricket jersey. Built by Aadarsh Pandit with Spline, Next.js, and Framer Motion.',
        url: PAGE_URL,
        siteName: 'Aadarsh Pandit Portfolio',
        locale: 'en_US',
        type: 'website',
        images: [
            {
                url: OG_IMAGE,
                width: 1200,
                height: 630,
                alt: 'NEXUS – Interactive 3D Hub by Aadarsh Pandit',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'NEXUS | Interactive 3D Hub',
        description:
            'Explore immersive WebGL 3D components — AI robot, neural core, glass typography & Nepal cricket jersey. By Aadarsh Pandit.',
        creator: '@aadarshttech',
        images: [OG_IMAGE],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
};

const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'NEXUS | Interactive 3D Component Hub',
    description:
        'NEXUS is a dark-mode futuristic interactive 3D hub by Aadarsh Pandit, featuring WebGL 3D scenes built with Spline, Next.js, and Framer Motion.',
    url: PAGE_URL,
    author: {
        '@type': 'Person',
        name: 'Aadarsh Pandit',
        url: BASE_URL,
        sameAs: [
            'https://github.com/Aadarshttech',
            'https://twitter.com/aadarshttech',
        ],
    },
    creator: {
        '@type': 'Person',
        name: 'Aadarsh Pandit',
    },
    inLanguage: 'en',
    isPartOf: {
        '@type': 'WebSite',
        name: 'Aadarsh Pandit Portfolio',
        url: BASE_URL,
    },
    image: OG_IMAGE,
};

export default function NexusLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Script
                id="nexus-json-ld"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            {children}
        </>
    );
}
