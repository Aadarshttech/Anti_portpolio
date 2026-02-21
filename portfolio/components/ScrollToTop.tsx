"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function ScrollToTop() {
    const pathname = usePathname();

    useEffect(() => {
        // Force instant scroll to top when route changes, 
        // overriding the CSS scroll-smooth behavior on the html tag
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }, [pathname]);

    return null;
}
