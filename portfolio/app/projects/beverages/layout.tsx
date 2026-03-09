import { Metadata } from 'next';
import Script from 'next/script';

const BASE_URL = 'https://aadarshapandit.com.np';
const PAGE_URL = `${BASE_URL}/projects/beverages`;
const OG_IMAGE = `${BASE_URL}/projects/beverages/mango_thumbnail.jpg`;

export const metadata: Metadata = {
    metadataBase: new URL(BASE_URL),
    title: 'Mango Pandit | Awwwards-Inspired Scrollytelling Experience | Aadarsh Pandit',
    description:
        'A premium, interactive e-commerce showcase for Mango Pandit featuring 194-frame HTML5 Canvas animation synced via Framer Motion. Discover the refreshing taste of authentic mango beverages through an Awwwards-quality web experience.',
    keywords: [
        'Mango Pandit',
        'Scrollytelling website',
        'Canvas scroll animation',
        'Awwwards design',
        'Creative web development',
        'Next.js portfolio project',
        'Framer Motion animations',
        'E-commerce UI showcase',
        'Aadarsh Pandit portfolio',
        'Interactive product page',
        'Beverage website design',
    ],
    authors: [{ name: 'Aadarsh Pandit', url: BASE_URL }],
    creator: 'Aadarsh Pandit',
    publisher: 'Aadarsh Pandit',
    alternates: {
        canonical: PAGE_URL,
    },
    openGraph: {
        title: 'Mango Pandit | Premium Scrollytelling Experience',
        description:
            'A premium, interactive e-commerce showcase featuring 194-frame HTML5 Canvas animation synced via Framer Motion. Built by Aadarsh Pandit.',
        url: PAGE_URL,
        siteName: 'Aadarsh Pandit Portfolio',
        locale: 'en_US',
        type: 'website',
        images: [
            {
                url: OG_IMAGE,
                width: 1920,
                height: 1080,
                alt: 'Mango Pandit Scrollytelling Interface',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Mango Pandit | Scrollytelling Experience',
        description:
            'A premium, interactive e-commerce showcase featuring 194-frame HTML5 Canvas animation.',
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
    name: 'Mango Pandit | Awwwards-Inspired Scrollytelling Experience',
    description:
        'A premium, interactive e-commerce showcase for Mango Pandit featuring 194-frame HTML5 Canvas animation, built with Next.js and Framer Motion by Aadarsh Pandit.',
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

export default function BeveragesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Script
                id="beverages-json-ld"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            {children}
        </>
    );
}
