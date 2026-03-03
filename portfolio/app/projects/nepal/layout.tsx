import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Visit Nepal — Land of the Himalayas | Aadarsh Pandit",
    description:
        "Experience Nepal's breathtaking landscapes — from snow-capped Himalayan peaks and luxury mountain lodges to pristine alpine lakes, underwater worlds, and paragliding over lush valleys. Book your cinematic Nepal journey today.",
    openGraph: {
        title: "Visit Nepal — Land of the Himalayas",
        description:
            "A cinematic scrollytelling journey through Nepal's most beautiful destinations.",
        type: "website",
    },
};

export default function NepalLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
