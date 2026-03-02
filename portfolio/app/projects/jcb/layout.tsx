import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'JCB Backhoe Loader - Interactive Scrollytelling | Aadarsh Pandit',
    description: 'Experience the JCB Backhoe Loader through an immersive scrollytelling showcase. Explore the design, engine specs, and performance of this legendary construction machine.',
    keywords: ['JCB', 'Backhoe Loader', 'Construction Equipment', 'Scrollytelling', 'Interactive Web Design', 'Aadarsh Pandit Portfolio', 'Next.js Demo'],
    openGraph: {
        title: 'JCB Backhoe Loader - Interactive Scrollytelling',
        description: 'Experience the JCB Backhoe Loader through an immersive scrollytelling showcase.',
        images: [
            {
                url: '/projects/jcb/jcb-frames/frame_0001.jpg',
                width: 1280,
                height: 720,
                alt: 'JCB Backhoe Loader',
            },
        ],
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'JCB Backhoe Loader - Interactive Scrollytelling',
        description: 'Experience the JCB Backhoe Loader through an immersive scrollytelling showcase.',
        images: ['/projects/jcb/jcb-frames/frame_0001.jpg'],
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'JCB Backhoe Loader - Interactive Scrollytelling',
        description: 'An immersive scrollytelling showcase of the JCB Backhoe Loader, demonstrating interactive web design and animation techniques.',
        author: {
            '@type': 'Person',
            name: 'Aadarsh Pandit',
            url: 'https://aadarshapandit.com.np',
        },
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            {children}
        </>
    );
}
