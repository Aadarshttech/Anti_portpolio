import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Mango Pandit | Awwwards-Inspired Scrollytelling Experience',
    description: 'A premium, interactive e-commerce showcase for Mango Pandit featuring 194-frame HTML5 Canvas animation synced via Framer Motion. Discover the refreshing taste of authentic mango beverages.',
    keywords: ['Mango Pandit', 'Beverages', 'Scrollytelling', 'Creative Web Development', 'Next.js', 'Framer Motion', 'Canvas Animation', 'Awwwards Design', 'Aadarsh Pandit Portfolio', 'E-commerce UI'],
    authors: [{ name: 'Aadarsh Pandit' }],
    creator: 'Aadarsh Pandit',
    publisher: 'Aadarsh Pandit',
    openGraph: {
        title: 'Mango Pandit | Premium Scrollytelling Experience',
        description: 'A premium, interactive e-commerce showcase for Mango Pandit featuring 194-frame HTML5 Canvas animation synced via Framer Motion.',
        url: 'https://aadarshttech.github.io/projects/beverages', // Update if the live domain changes
        siteName: 'Aadarsh Pandit Portfolio',
        images: [
            {
                url: '/projects/beverages/mango_thumbnail.jpg',
                width: 1920,
                height: 1080,
                alt: 'Mango Pandit Scrollytelling Interface',
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Mango Pandit | Premium Scrollytelling Experience',
        description: 'A premium, interactive e-commerce showcase featuring 194-frame HTML5 Canvas animation.',
        images: ['/projects/beverages/mango_thumbnail.jpg'],
        creator: '@aadarshttech', // Replace with actual Twitter handle if needed
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

export default function BeveragesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            {children}
        </>
    );
}
