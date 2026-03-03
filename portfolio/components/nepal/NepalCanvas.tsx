"use client";

import { useEffect, useRef, useCallback } from "react";
import { useMotionValueEvent, MotionValue } from "framer-motion";

interface NepalCanvasProps {
    scrollYProgress: MotionValue<number>;
    className?: string;
    onLoadComplete?: () => void;
    onLoadProgress?: (progress: number) => void;
}

const TOTAL_FRAMES = 253;
const BATCH_SIZE = 10;

export const NepalCanvas = ({
    scrollYProgress,
    className = "",
    onLoadComplete,
    onLoadProgress,
}: NepalCanvasProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imagesRef = useRef<HTMLImageElement[]>([]);
    const loadedRef = useRef(false);
    const rafRef = useRef<number>(0);
    const lastFrameRef = useRef(-1);
    const drawRectRef = useRef<{ bw: number; bh: number } | null>(null);

    const drawFrame = useCallback((index: number, force = false) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d", { alpha: false });
        if (!ctx) return;

        const img = imagesRef.current[index];
        if (!img || !img.complete || img.naturalWidth === 0) return;

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
            drawRectRef.current = { bw, bh };
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

    const updateFrame = useCallback(
        (force = false) => {
            if (!loadedRef.current) return;
            const progress = Math.max(0, Math.min(scrollYProgress.get(), 1));
            const index = Math.min(
                Math.floor(progress * (TOTAL_FRAMES - 1)),
                TOTAL_FRAMES - 1,
            );
            if (force || index !== lastFrameRef.current) {
                lastFrameRef.current = index;
                drawFrame(index, force);
            }
        },
        [scrollYProgress, drawFrame],
    );

    useEffect(() => {
        const images: HTMLImageElement[] = new Array(TOTAL_FRAMES);
        imagesRef.current = images;
        let totalLoaded = 0;

        const loadBatch = (startIdx: number) => {
            const endIdx = Math.min(startIdx + BATCH_SIZE, TOTAL_FRAMES);
            let batchLoaded = 0;
            const batchSize = endIdx - startIdx;

            for (let i = startIdx; i < endIdx; i++) {
                const frameNum = i + 1;
                const img = new window.Image();
                img.src = `/projects/nepal/frames/frame_${String(frameNum).padStart(3, "0")}.webp`;

                const onDone = () => {
                    totalLoaded++;
                    batchLoaded++;
                    const pct = Math.round((totalLoaded / TOTAL_FRAMES) * 100);
                    if (onLoadProgress) onLoadProgress(pct);

                    if (i === 0 && img.complete && img.naturalWidth > 0) {
                        lastFrameRef.current = 0;
                        drawFrame(0, true);
                    }

                    if (batchLoaded === batchSize) {
                        if (endIdx < TOTAL_FRAMES) {
                            loadBatch(endIdx);
                        } else {
                            loadedRef.current = true;
                            if (onLoadComplete) onLoadComplete();
                            requestAnimationFrame(() => updateFrame(true));
                        }
                    }
                };

                img.onload = onDone;
                img.onerror = onDone;
                images[i] = img;
            }
        };

        loadBatch(0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useMotionValueEvent(scrollYProgress, "change", () => {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(() => updateFrame());
    });

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;
        const onResize = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                drawRectRef.current = null;
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

    return (
        <canvas
            ref={canvasRef}
            className={`block ${className}`}
            style={{ width: "100%", height: "100%" }}
        />
    );
};
