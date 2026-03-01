import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Mango Pandit - Premium Cold-Pressed Mango Juice | SCROLLYTELLING DEMO',
    description: 'Experience the future of freshness with Mango Pandit. Hand-picked Ratnagiri Alphonso mangoes, cold-pressed to perfection. Explore our interactive scrollytelling demo.',
    keywords: ['Mango Juice', 'Alphonso Mango', 'Cold-Pressed Juice', 'Scrollytelling', 'Aadarsh Pandit Portfolio', 'Interactive Web Design', 'Next.js Demo'],
    openGraph: {
        title: 'Mango Pandit - Premium Cold-Pressed Mango Juice',
        description: 'Experience pure sunshine with our 100% natural, cold-pressed Alphonso mango juice. Explore the interactive 3D scrollytelling experience.',
        images: [
            {
                url: '/projects/beverages/mango-frames/frame_00000.jpg',
                width: 1920,
                height: 1080,
                alt: 'Mango Pandit - Premium Cold-Pressed Mango Juice',
            },
        ],
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Mango Pandit - Premium Cold-Pressed Mango Juice',
        description: 'Experience pure sunshine with our 100% natural, cold-pressed Alphonso mango juice. Explore the interactive 3D scrollytelling experience.',
        images: ['/projects/beverages/mango-frames/frame_00000.jpg'],
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    // JSON-LD structured data for the product
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: 'Cream Mango Juice',
        image: 'https://aadarshapandit.com.np/projects/beverages/mango-frames/frame_00000.jpg',
        description: '100% natural, cold-pressed Alphonso mango juice. Rich in Vitamin C, no preservatives.',
        brand: {
            '@type': 'Brand',
            name: 'Mango Pandit',
        },
        offers: {
            '@type': 'Offer',
            url: 'https://aadarshapandit.com.np/projects/beverages',
            priceCurrency: 'INR',
            price: '120',
            availability: 'https://schema.org/InStock',
            seller: {
                '@type': 'Organization',
                name: 'Mango Pandit',
            },
        },
    };

    return (
        <>
            {/* Inject JSON-LD Script for SEO */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            {children}
        </>
    );
}
