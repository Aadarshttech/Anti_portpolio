import { Metadata } from 'next';
import Script from 'next/script';

const BASE_URL = 'https://aadarshapandit.com.np';
const PAGE_URL = `${BASE_URL}/projects/jcb`;
const OG_IMAGE = `${BASE_URL}/projects/jcb/jcb_thumbnail_clean.jpg`;

export const metadata: Metadata = {
    metadataBase: new URL(BASE_URL),
    title: 'JCB Backhoe Loader | Premium Scrollytelling Showcase | Aadarsh Pandit',
    description:
        'A high-octane scrollytelling experience for the JCB Backhoe Loader. Explore the apex predator of earthmoving with interactive specifications and cinema-quality 200-frame canvas animation synced to scroll.',
    keywords: [
        'JCB Backhoe Loader',
        'Scrollytelling website',
        'Canvas scroll animation',
        'Creative web development',
        'Next.js portfolio project',
        'Framer Motion animations',
        'Industrial design showcase',
        'Aadarsh Pandit portfolio',
        'Interactive product page',
        'Premium web experience',
    ],
    authors: [{ name: 'Aadarsh Pandit', url: BASE_URL }],
    creator: 'Aadarsh Pandit',
    publisher: 'Aadarsh Pandit',
    alternates: {
        canonical: PAGE_URL,
    },
    openGraph: {
        title: 'JCB Backhoe Loader | Premium Scrollytelling Showcase',
        description:
            'Explore the JCB Backhoe Loader with a cinema-quality, interactive scrollytelling experience. Built by Aadarsh Pandit with Next.js, Framer Motion, and Canvas API.',
        url: PAGE_URL,
        siteName: 'Aadarsh Pandit Portfolio',
        locale: 'en_US',
        type: 'website',
        images: [
            {
                url: OG_IMAGE,
                width: 1920,
                height: 1080,
                alt: 'JCB Backhoe Loader Scrollytelling Interface',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'JCB Backhoe Loader | Scrollytelling Showcase',
        description:
            'A high-octane scrollytelling experience for the JCB Backhoe Loader with 200-frame canvas animation.',
        creator: '@aadarshapandit',
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
    name: 'JCB Backhoe Loader | Premium Scrollytelling Showcase',
    description:
        'A high-octane scrollytelling experience for the JCB Backhoe Loader featuring 200-frame canvas animation synced to scroll, built with Next.js and Framer Motion.',
    url: PAGE_URL,
    author: {
        '@type': 'Person',
        name: 'Aadarsh Pandit',
        url: BASE_URL,
        sameAs: [
            'https://github.com/Aadarshttech',
            'https://linkedin.com/in/aadarsh-pandit',
        ],
    },
    inLanguage: 'en',
    isPartOf: {
        '@type': 'WebSite',
        name: 'Aadarsh Pandit Portfolio',
        url: BASE_URL,
    },
    image: OG_IMAGE,
};

export default function JCBLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Script
                id="jcb-json-ld"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            {children}
        </>
    );
}
