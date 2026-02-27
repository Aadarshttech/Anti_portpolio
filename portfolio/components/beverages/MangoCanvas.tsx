"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useMotionValueEvent, MotionValue } from "framer-motion";

interface MangoCanvasProps {
    scrollYProgress: MotionValue<number>;
    className?: string;
}

const FRAME_COUNT = 194;

export const MangoCanvas = ({
    scrollYProgress,
    className = "",
}: MangoCanvasProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imagesRef = useRef<HTMLImageElement[]>([]);
    const loadedRef = useRef(false);
    const rafRef = useRef<number>(0);
    const lastFrameRef = useRef(-1);
    const [loadProgress, setLoadProgress] = useState(0);
    const [ready, setReady] = useState(false);

    /* ------------------------------------------------------------------ */
    /*  Draw a single frame (cover-fit) onto the canvas                   */
    /* ------------------------------------------------------------------ */
    const drawFrame = useCallback((index: number, force = false) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d", { alpha: false });
        if (!ctx) return;

        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) return;          // not laid out yet
        const bw = Math.round(rect.width * dpr);
        const bh = Math.round(rect.height * dpr);

        if (canvas.width !== bw || canvas.height !== bh) {
            canvas.width = bw;
            canvas.height = bh;
        }

        const img = imagesRef.current[index];
        if (!img || !img.complete || img.naturalWidth === 0) return;

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
            const progress = Math.max(0, Math.min(scrollYProgress.get(), 1));
            const index = Math.min(
                Math.floor(progress * (FRAME_COUNT - 1)),
                FRAME_COUNT - 1,
            );
            if (force || index !== lastFrameRef.current) {
                lastFrameRef.current = index;
                drawFrame(index, force);
            }
        },
        [scrollYProgress, drawFrame],
    );

    /* ------------------------------------------------------------------ */
    /*  Preload every frame                                               */
    /* ------------------------------------------------------------------ */
    useEffect(() => {
        let count = 0;
        const images: HTMLImageElement[] = new Array(FRAME_COUNT);

        for (let i = 0; i < FRAME_COUNT; i++) {
            const img = new window.Image();
            img.src = `/projects/beverages/mango-frames/frame_${String(i).padStart(5, "0")}.jpg`;

            const onDone = () => {
                count++;
                setLoadProgress(Math.round((count / FRAME_COUNT) * 100));

                // Draw frame 0 as soon as it arrives so the user sees something immediately
                if (i === 0 && img.complete && img.naturalWidth > 0) {
                    imagesRef.current = images;   // partial but index 0 is ready
                    const canvas = canvasRef.current;
                    if (canvas) {
                        const ctx = canvas.getContext("2d", { alpha: false });
                        if (ctx) {
                            const dpr = window.devicePixelRatio || 1;
                            const rect = canvas.getBoundingClientRect();
                            const bw = Math.round(rect.width * dpr);
                            const bh = Math.round(rect.height * dpr);
                            if (bw > 0 && bh > 0) {
                                canvas.width = bw;
                                canvas.height = bh;
                                const scale = Math.max(bw / img.naturalWidth, bh / img.naturalHeight);
                                const dw = img.naturalWidth * scale;
                                const dh = img.naturalHeight * scale;
                                ctx.drawImage(img, (bw - dw) / 2, (bh - dh) / 2, dw, dh);
                            }
                        }
                    }
                }

                if (count === FRAME_COUNT) {
                    imagesRef.current = images;
                    loadedRef.current = true;
                    setReady(true);
                    // Force draw on next frame so canvas is definitely populated
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
    /*  Re-draw on resize                                                 */
    /* ------------------------------------------------------------------ */
    useEffect(() => {
        const onResize = () => {
            lastFrameRef.current = -1;
            updateFrame(true);
        };
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, [updateFrame]);

    /* ------------------------------------------------------------------ */
    /*  Render                                                            */
    /* ------------------------------------------------------------------ */
    return (
        <>
            {/* The canvas fills whichever parent the className defines */}
            <canvas
                ref={canvasRef}
                className={`block ${className}`}
                style={{ width: "100%", height: "100%" }}
            />

            {/* Loading overlay — sits over the same parent via portal-free absolute */}
            {!ready && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-gradient-to-b from-amber-800 to-amber-950">
                    <p className="mb-4 text-sm font-semibold tracking-widest text-white/70 uppercase">
                        Loading frames
                    </p>
                    <div className="w-56 h-1.5 overflow-hidden rounded-full bg-white/10">
                        <div
                            className="h-full rounded-full bg-orange-400 transition-all duration-200 ease-out"
                            style={{ width: `${loadProgress}%` }}
                        />
                    </div>
                    <p className="mt-2 text-xs tabular-nums text-white/50">
                        {loadProgress}%
                    </p>
                </div>
            )}
        </>
    );
};
