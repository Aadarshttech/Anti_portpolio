import type { Metadata } from 'next';
import Script from 'next/script';

const BASE_URL = 'https://aadarshapandit.com.np';
const PAGE_URL = `${BASE_URL}/projects/nepal`;
const OG_IMAGE = `${BASE_URL}/projects/nepal/thumbnail.jpg`;

export const metadata: Metadata = {
    metadataBase: new URL(BASE_URL),
    title: 'Aadarsh Travels — Explore Nepal | Everest, Rara Lake, Mustang & Pokhara | Aadarsh Pandit',
    description:
        'Discover Nepal through a cinematic visual experience — from the summit of Mount Everest at 8,848 m to the pristine waters of Rara Lake, the forbidden kingdom of Upper Mustang, and the paragliding skies above Sarangkot Pokhara. A luxury web design by Aadarsh Pandit.',
    keywords: [
        'Nepal travel website',
        'Cinematic web design',
        'Mount Everest',
        'Rara Lake',
        'Upper Mustang',
        'Sarangkot Pokhara',
        'Nepal tourism',
        'Luxury travel experience',
        'Creative web development',
        'Aadarsh Pandit portfolio',
        'Next.js cinematic UI',
        '4K video background website',
    ],
    authors: [{ name: 'Aadarsh Pandit', url: BASE_URL }],
    creator: 'Aadarsh Pandit',
    publisher: 'Aadarsh Pandit',
    alternates: {
        canonical: PAGE_URL,
    },
    openGraph: {
        title: 'Aadarsh Travels — Explore Nepal | Himalayas, Lakes & Forbidden Kingdoms',
        description:
            'A cinematic visual journey through Nepal — Mount Everest, Rara Lake, Upper Mustang, and Sarangkot Pokhara. Built by Aadarsh Pandit.',
        url: PAGE_URL,
        siteName: 'Aadarsh Pandit Portfolio',
        locale: 'en_US',
        type: 'website',
        images: [
            {
                url: OG_IMAGE,
                width: 1920,
                height: 1080,
                alt: 'Aadarsh Travels Nepal — Cinematic Mountain Landscape',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Aadarsh Travels — Explore Nepal',
        description:
            'A cinematic visual journey through Nepal — Mount Everest, Rara Lake, Upper Mustang, and Sarangkot Pokhara.',
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
    name: 'Aadarsh Travels — Explore Nepal',
    description:
        'Discover Nepal through a cinematic visual experience — from Mount Everest to Rara Lake, Upper Mustang, and Sarangkot Pokhara. A luxury web design by Aadarsh Pandit.',
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

export default function NepalLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Script
                id="nepal-json-ld"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            {children}
        </>
    );
}
