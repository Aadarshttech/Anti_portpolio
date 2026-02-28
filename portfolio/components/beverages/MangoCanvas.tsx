"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useMotionValueEvent, MotionValue } from "framer-motion";

interface MangoCanvasProps {
    scrollYProgress: MotionValue<number>;
    className?: string;
    onLoadComplete?: () => void;
    onLoadProgress?: (progress: number) => void;
}

const TOTAL_FRAMES = 194;

function getFrameConfig() {
    if (typeof window === "undefined") return { count: TOTAL_FRAMES, step: 1, dir: "mango-frames" };
    const isMobile = window.innerWidth < 768;
    // Mobile: load all 194 frames but from the mobile-optimized (640px) directory
    // Desktop: load all 194 frames from the full-res directory
    return {
        count: TOTAL_FRAMES,
        step: 1,
        dir: isMobile ? "mango-frames-mobile" : "mango-frames",
    };
}

export const MangoCanvas = ({
    scrollYProgress,
    className = "",
    onLoadComplete,
    onLoadProgress,
}: MangoCanvasProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imagesRef = useRef<HTMLImageElement[]>([]);
    const loadedRef = useRef(false);
    const rafRef = useRef<number>(0);
    const lastFrameRef = useRef(-1);
    const frameCountRef = useRef(TOTAL_FRAMES);
    const [loadProgress, setLoadProgress] = useState(0);
    const [ready, setReady] = useState(false);

    /* ------------------------------------------------------------------ */
    /*  Draw a single frame (cover-fit) onto the canvas                   */
    /* ------------------------------------------------------------------ */
    const drawRectRef = useRef<{ bw: number, bh: number, scale: number } | null>(null);

    const drawFrame = useCallback((index: number, force = false) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d", { alpha: false });
        if (!ctx) return;

        const img = imagesRef.current[index];
        if (!img || !img.complete || img.naturalWidth === 0) return;

        // Only calculate the bounding rect and canvas size if we don't have it, or if forced
        if (force || !drawRectRef.current) {
            const dpr = window.devicePixelRatio || 1;
            const rect = canvas.getBoundingClientRect();
            if (rect.width === 0 || rect.height === 0) return;

            const bw = Math.round(rect.width * dpr);
            const bh = Math.round(rect.height * dpr);

            if (canvas.width !== bw || canvas.height !== bh) {
                canvas.width = bw;
                canvas.height = bh;
            }

            drawRectRef.current = { bw, bh, scale: 0 }; // scale calculated per image
        }

        const { bw, bh } = drawRectRef.current;

        // Cover-fit
        const iw = img.naturalWidth;
        const ih = img.naturalHeight;
        const scale = Math.max(bw / iw, bh / ih);
        const dw = iw * scale;
        const dh = ih * scale;
        const ox = (bw - dw) / 2;
        const oy = (bh - dh) / 2;

        ctx.clearRect(0, 0, bw, bh);
        ctx.drawImage(img, ox, oy, dw, dh);
    }, []);

    /* ------------------------------------------------------------------ */
    /*  Map scroll progress → frame index and draw                        */
    /* ------------------------------------------------------------------ */
    const updateFrame = useCallback(
        (force = false) => {
            if (!loadedRef.current) return;
            const count = frameCountRef.current;
            const progress = Math.max(0, Math.min(scrollYProgress.get(), 1));
            const index = Math.min(
                Math.floor(progress * (count - 1)),
                count - 1,
            );
            if (force || index !== lastFrameRef.current) {
                lastFrameRef.current = index;
                drawFrame(index, force);
            }
        },
        [scrollYProgress, drawFrame],
    );

    /* ------------------------------------------------------------------ */
    /*  Preload frames (responsive: mobile gets fewer, smaller frames)    */
    /* ------------------------------------------------------------------ */
    useEffect(() => {
        const { count, step, dir } = getFrameConfig();
        frameCountRef.current = count;

        let loaded = 0;
        const images: HTMLImageElement[] = new Array(count);

        for (let i = 0; i < count; i++) {
            const originalIndex = i * step; // maps back to original frame number
            const img = new window.Image();
            img.src = `/projects/beverages/${dir}/frame_${String(originalIndex).padStart(5, "0")}.jpg`;

            const onDone = () => {
                loaded++;
                const progressPercentage = Math.round((loaded / count) * 100);
                setLoadProgress(progressPercentage);
                if (onLoadProgress) onLoadProgress(progressPercentage);

                // Draw frame 0 as soon as it arrives so the user sees something immediately
                if (i === 0 && img.complete && img.naturalWidth > 0) {
                    imagesRef.current = images;
                    lastFrameRef.current = 0; // Set to 0 so we know it's drawn
                    drawFrame(0, true);       // Force the draw immediately
                }

                if (loaded === count) {
                    imagesRef.current = images;
                    loadedRef.current = true;
                    setReady(true);
                    if (onLoadComplete) onLoadComplete();
                    requestAnimationFrame(() => updateFrame(true));
                }
            };

            img.onload = onDone;
            img.onerror = onDone;
            images[i] = img;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /* ------------------------------------------------------------------ */
    /*  Re-draw on scroll (throttled to one rAF)                          */
    /* ------------------------------------------------------------------ */
    useMotionValueEvent(scrollYProgress, "change", () => {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(() => updateFrame());
    });

    /* ------------------------------------------------------------------ */
    /*  Re-draw on resize (Throttled for mobile performance)              */
    /* ------------------------------------------------------------------ */
    useEffect(() => {
        let timeoutId: NodeJS.Timeout;
        const onResize = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                lastFrameRef.current = -1;
                updateFrame(true);
            }, 100);
        };
        window.addEventListener("resize", onResize);
        return () => {
            window.removeEventListener("resize", onResize);
            clearTimeout(timeoutId);
        };
    }, [updateFrame]);

    /* ------------------------------------------------------------------ */
    /*  Render                                                            */
    /* ------------------------------------------------------------------ */
    return (
        <canvas
            ref={canvasRef}
            className={`block ${className}`}
            style={{ width: "100%", height: "100%" }}
        />
    );
};
