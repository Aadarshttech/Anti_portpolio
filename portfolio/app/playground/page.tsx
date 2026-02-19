"use client";

import React, { useState } from "react";
import type { Metadata } from "next";
import Link from "next/link";

// ─── Theme Toggle Icon ──────────────────────────────────────────────────────
function ThemeToggle({
    dark,
    toggle,
}: {
    dark: boolean;
    toggle: () => void;
}) {
    return (
        <button
            onClick={toggle}
            className={`relative w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 active:scale-90 ${dark
                    ? "bg-gray-800 border border-gray-700 hover:bg-gray-700 text-yellow-400"
                    : "bg-gray-100 border border-gray-200 hover:bg-gray-200 text-gray-700"
                }`}
            aria-label="Toggle theme"
        >
            {dark ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="5" />
                    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                </svg>
            ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
            )}
        </button>
    );
}

const projects = [
    {
        title: "LCS Algorithm",
        description:
            "Visualize the Longest Common Subsequence dynamic programming algorithm step-by-step.",
        href: "/playground/lcs",
        tags: ["Dynamic Programming", "Strings", "O(m×n)"],
        icon: "🧬",
        gradient: "from-violet-500/20 to-purple-500/20",
        glow: "violet",
    },
];

export default function PlaygroundPage() {
    const [dark, setDark] = useState(true);

    // Theme-aware styles
    const bg = dark ? "bg-gray-950 text-gray-100" : "bg-gray-50 text-gray-900";
    const headerBg = dark ? "border-gray-800/60 bg-gray-950/80" : "border-gray-200 bg-white/80";
    const cardBg = dark ? "bg-gray-900/60 backdrop-blur-md border-gray-800/60" : "bg-white border-gray-200 shadow-sm";
    const heroText = dark ? "text-gray-400" : "text-gray-600";
    const titleText = dark ? "text-gray-100" : "text-gray-900";
    const cardTitle = dark ? "text-gray-200 group-hover:text-white" : "text-gray-800 group-hover:text-indigo-600";
    const cardDesc = dark ? "text-gray-400" : "text-gray-600";
    const tagCls = dark ? "text-gray-500 bg-gray-800/80 border-gray-700/40" : "text-gray-600 bg-gray-100 border-gray-200";

    return (
        <div className={`min-h-screen ${bg} selection:bg-violet-500/30 overflow-x-hidden transition-all duration-500 ease-in-out`}>
            {/* Background effects */}
            <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
                <div className={`absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] rounded-full blur-[120px] transition-all duration-1000 ease-in-out ${dark ? "bg-violet-600/8 opacity-100" : "bg-indigo-400/10 opacity-60"}`} />
                <div className={`absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] rounded-full blur-[120px] transition-all duration-1000 ease-in-out ${dark ? "bg-cyan-600/8 opacity-100" : "bg-purple-400/10 opacity-60"}`} />
            </div>

            {/* Header */}
            <header className={`border-b ${headerBg} backdrop-blur-xl sticky top-0 z-40 transition-all duration-500 ease-in-out`}>
                <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <a
                            href="/"
                            className={`text-sm transition-colors duration-300 ${dark ? "text-gray-500 hover:text-violet-400" : "text-gray-500 hover:text-indigo-600"}`}
                        >
                            ← Portfolio
                        </a>
                        <span className={`transition-colors duration-500 ${dark ? "text-gray-700" : "text-gray-300"}`}>/</span>
                        <h1 className={`text-lg sm:text-xl font-bold font-heading bg-gradient-to-r from-violet-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent`}>
                            Playground
                        </h1>
                    </div>
                    <ThemeToggle dark={dark} toggle={() => setDark(!dark)} />
                </div>
            </header>

            <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-10">
                {/* Hero */}
                <section className="text-center space-y-4">
                    <h2 className={`text-3xl sm:text-4xl font-bold font-heading transition-colors duration-500 ${titleText}`}>
                        Algorithm{" "}
                        <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                            Playground
                        </span>
                    </h2>
                    <p className={`${heroText} max-w-lg mx-auto leading-relaxed transition-colors duration-500`}>
                        Interactive visualizations of classic algorithms and data
                        structures. Pick one to explore, step through it, and learn how it
                        works under the hood.
                    </p>
                </section>

                {/* Project grid */}
                <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project) => (
                        <Link
                            key={project.href}
                            href={project.href}
                            className={`group relative rounded-2xl border p-6 space-y-4 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 ${cardBg} ${dark ? "hover:border-gray-700/80" : "hover:border-indigo-200"}`}
                        >
                            {/* Refined Glow on hover (dark only) - lowered opacity and scale */}
                            {dark && (
                                <div
                                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 bg-violet-600/10 blur-2xl -z-10"
                                    style={{ transform: "scale(0.95)" }}
                                />
                            )}

                            <div className="flex items-start justify-between">
                                <span className="text-3xl">{project.icon}</span>
                                <span className={`text-xs transition-colors duration-300 ${dark ? "text-gray-600 group-hover:text-gray-400" : "text-gray-300 group-hover:text-indigo-400"}`}>
                                    →
                                </span>
                            </div>

                            <h3 className={`text-lg font-bold font-heading transition-colors duration-500 ${cardTitle}`}>
                                {project.title}
                            </h3>

                            <p className={`text-sm leading-relaxed transition-colors duration-500 ${cardDesc}`}>
                                {project.description}
                            </p>

                            <div className="flex flex-wrap gap-1.5 transition-colors duration-500">
                                {project.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className={`text-[11px] font-medium px-2 py-0.5 rounded-full border transition-all duration-500 ${tagCls}`}
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </Link>
                    ))}

                    {/* Coming soon placeholder */}
                    <div className={`rounded-2xl border border-dashed p-6 flex flex-col items-center justify-center text-center space-y-2 min-h-[200px] transition-all duration-500 ${dark ? "bg-gray-900/30 border-gray-800/40" : "bg-gray-50/50 border-gray-200"}`}>
                        <span className="text-2xl opacity-40">🚀</span>
                        <p className={`text-sm font-medium transition-colors duration-500 ${dark ? "text-gray-600" : "text-gray-400"}`}>
                            More coming soon...
                        </p>
                        <p className={`text-xs transition-colors duration-500 ${dark ? "text-gray-700" : "text-gray-400"}`}>
                            Sorting, Graph Traversal, Pathfinding &amp; more
                        </p>
                    </div>
                </section>

                {/* Footer */}
                <footer className={`text-center text-xs py-6 border-t transition-all duration-500 ${dark ? "text-gray-600 border-gray-800/40" : "text-gray-400 border-gray-200"}`}>
                    Built by{" "}
                    <a
                        href="/"
                        className={`font-medium transition-colors duration-300 ${dark ? "text-violet-400 hover:text-violet-300" : "text-indigo-500 hover:text-indigo-600"}`}
                    >
                        Aadarsh Pandit
                    </a>{" "}
                    · Playground
                </footer>
            </main>
        </div>
    );
}
