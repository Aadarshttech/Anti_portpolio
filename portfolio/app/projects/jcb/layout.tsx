import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'JCB Backhoe Loader | Premium Scrollytelling Showcase',
    description: 'A high-octane scrollytelling experience for the JCB Backhoe Loader. Explore the apex predator of earthmoving with interactive specifications and cinema-quality frame animation.',
    keywords: ['JCB', 'Backhoe Loader', 'Scrollytelling', 'Creative Web Development', 'Next.js', 'Framer Motion', 'Canvas Animation', 'Industrial Design', 'Aadarsh Pandit Portfolio'],
    authors: [{ name: 'Aadarsh Pandit' }],
    creator: 'Aadarsh Pandit',
    publisher: 'Aadarsh Pandit',
    openGraph: {
        title: 'JCB Backhoe Loader | Premium Scrollytelling Showcase',
        description: 'A high-octane scrollytelling experience for the JCB Backhoe Loader. Explore the apex predator of earthmoving with interactive specifications and cinema-quality frame animation.',
        url: 'https://aadarshttech.github.io/projects/jcb', // Update if the live domain changes
        siteName: 'Aadarsh Pandit Portfolio',
        images: [
            {
                url: '/projects/jcb/jcb_thumbnail_clean.jpg',
                width: 1920,
                height: 1080,
                alt: 'JCB Backhoe Loader Scrollytelling Interface',
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'JCB Backhoe Loader | Premium Scrollytelling Showcase',
        description: 'A high-octane scrollytelling experience for the JCB Backhoe Loader.',
        images: ['/projects/jcb/jcb_thumbnail_clean.jpg'],
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

export default function JCBLayout({
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
