import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Aadarsh Travels — Explore Nepal | Mount Everest, Rara Lake, Upper Mustang & Pokhara",
    description:
        "Discover Nepal through a cinematic visual experience — from the summit of Mount Everest at 8,848 m to the pristine waters of Rara Lake, the forbidden kingdom of Upper Mustang, and the paragliding skies above Sarangkot Pokhara. Curated by Aadarsh Travels.",
    keywords: [
        "Nepal Travel",
        "Mount Everest",
        "Rara Lake",
        "Upper Mustang",
        "Sarangkot Pokhara",
        "Himalayan Adventure",
        "Nepal Tourism",
        "Luxury Nepal Travel",
        "Aadarsh Travels",
        "Creative Web Development",
        "Next.js",
        "Framer Motion",
        "Canvas Animation",
        "Aadarsh Pandit Portfolio",
    ],
    authors: [{ name: "Aadarsh Pandit" }],
    creator: "Aadarsh Pandit",
    publisher: "Aadarsh Pandit",
    openGraph: {
        title: "Aadarsh Travels — Explore Nepal | Himalayas, Lakes & Forbidden Kingdoms",
        description:
            "A cinematic visual journey through Nepal — Mount Everest, Rara Lake, Upper Mustang, and Sarangkot Pokhara. Experience the extraordinary.",
        url: "https://aadarshttech.github.io/projects/nepal",
        siteName: "Aadarsh Pandit Portfolio",
        images: [
            {
                url: "/projects/nepal/thumbnail.jpg",
                width: 1920,
                height: 1080,
                alt: "Aadarsh Travels Nepal — Cinematic Mountain Landscape",
            },
        ],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Aadarsh Travels — Explore Nepal | Himalayas, Lakes & Forbidden Kingdoms",
        description:
            "A cinematic visual journey through Nepal — Mount Everest, Rara Lake, Upper Mustang, and Sarangkot Pokhara.",
        images: ["/projects/nepal/thumbnail.jpg"],
        creator: "@aadarshttech",
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

export default function NepalLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}

