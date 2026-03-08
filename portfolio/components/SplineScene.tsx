'use client';

import { Suspense, lazy } from 'react';

const Spline = lazy(() => import('@splinetool/react-spline'));

interface SplineSceneProps {
    /** URL to the Spline scene (.splinecode file) */
    scene: string;
    /** CSS class to apply to the Spline canvas */
    className?: string;
    /** Callback fired when the scene finishes loading */
    onLoad?: (app: any) => void;
}

/**
 * Lazy-loaded Spline 3D scene wrapper.
 * Parent container MUST have explicit width and height.
 */
export function SplineScene({ scene, className, onLoad }: SplineSceneProps) {
    return (
        <Suspense
            fallback={
                <div
                    style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'transparent',
                    }}
                >
                    <LoadingSpinner />
                </div>
            }
        >
            <Spline scene={scene} className={className} onLoad={onLoad} />
        </Suspense>
    );
}

function LoadingSpinner() {
    return (
        <span
            style={{
                width: 48,
                height: 48,
                border: '3px solid rgba(255, 255, 255, 0.1)',
                borderTopColor: '#06b6d4',
                borderRadius: '50%',
                animation: 'spline-spin 0.8s linear infinite',
            }}
        />
    );
}

/* Inject spinner keyframes once */
if (typeof document !== 'undefined') {
    const styleId = 'spline-scene-styles';
    if (!document.getElementById(styleId)) {
        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = `
      @keyframes spline-spin {
        to { transform: rotate(360deg); }
      }
    `;
        document.head.appendChild(style);
    }
}
