import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Playground",
    description:
        "Interactive algorithm visualizations and coding experiments by Aadarsh Pandit.",
};

const projects = [
    {
        title: "LCS Algorithm",
        description:
            "Visualize the Longest Common Subsequence dynamic programming algorithm step-by-step.",
        href: "/playground/lcs",
        tags: ["Dynamic Programming", "Strings", "O(m×n)"],
        icon: "🧬",
        gradient: "from-violet-600 to-purple-600",
        glow: "violet",
    },
    // Add more projects here as you build them:
    // {
    //   title: "Sorting Visualizer",
    //   description: "Watch sorting algorithms race side by side.",
    //   href: "/playground/sorting",
    //   tags: ["Sorting", "Comparison", "Animation"],
    //   icon: "📊",
    //   gradient: "from-cyan-600 to-blue-600",
    //   glow: "cyan",
    // },
];

export default function PlaygroundPage() {
    return (
        <div className="min-h-screen bg-gray-950 text-gray-100 selection:bg-violet-500/30">
            {/* Background effects */}
            <div className="fixed inset-0 -z-10 overflow-hidden">
                <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-violet-600/8 blur-[120px]" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-cyan-600/8 blur-[120px]" />
            </div>

            {/* Header */}
            <header className="border-b border-gray-800/60 bg-gray-950/80 backdrop-blur-xl sticky top-0 z-40">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <a
                            href="/"
                            className="text-sm text-gray-500 hover:text-violet-400 transition-colors"
                        >
                            ← Portfolio
                        </a>
                        <span className="text-gray-700">/</span>
                        <h1 className="text-lg sm:text-xl font-bold font-heading bg-gradient-to-r from-violet-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                            Playground
                        </h1>
                    </div>
                </div>
            </header>

            <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-10">
                {/* Hero */}
                <section className="text-center space-y-4">
                    <h2 className="text-3xl sm:text-4xl font-bold font-heading text-gray-100">
                        Algorithm{" "}
                        <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                            Playground
                        </span>
                    </h2>
                    <p className="text-gray-400 max-w-lg mx-auto leading-relaxed">
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
                            className="group relative bg-gray-900/60 backdrop-blur-md rounded-2xl border border-gray-800/60 p-6 space-y-4 shadow-lg hover:shadow-2xl transition-all duration-300 hover:border-gray-700/80 hover:-translate-y-1"
                        >
                            {/* Glow on hover */}
                            <div
                                className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br ${project.gradient} blur-xl -z-10`}
                                style={{ transform: "scale(0.85)", opacity: 0 }}
                            />

                            <div className="flex items-start justify-between">
                                <span className="text-3xl">{project.icon}</span>
                                <span className="text-xs text-gray-600 group-hover:text-gray-400 transition-colors">
                                    →
                                </span>
                            </div>

                            <h3 className="text-lg font-bold font-heading text-gray-200 group-hover:text-white transition-colors">
                                {project.title}
                            </h3>

                            <p className="text-sm text-gray-400 leading-relaxed">
                                {project.description}
                            </p>

                            <div className="flex flex-wrap gap-1.5">
                                {project.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="text-[11px] font-medium text-gray-500 bg-gray-800/80 px-2 py-0.5 rounded-full border border-gray-700/40"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </Link>
                    ))}

                    {/* Coming soon placeholder */}
                    <div className="bg-gray-900/30 backdrop-blur-md rounded-2xl border border-dashed border-gray-800/40 p-6 flex flex-col items-center justify-center text-center space-y-2 min-h-[200px]">
                        <span className="text-2xl opacity-40">🚀</span>
                        <p className="text-sm text-gray-600 font-medium">
                            More coming soon...
                        </p>
                        <p className="text-xs text-gray-700">
                            Sorting, Graph Traversal, Pathfinding &amp; more
                        </p>
                    </div>
                </section>

                {/* Footer */}
                <footer className="text-center text-xs text-gray-600 py-6 border-t border-gray-800/40">
                    Built by{" "}
                    <a
                        href="/"
                        className="text-violet-400 hover:text-violet-300 transition-colors font-medium"
                    >
                        Aadarsh Pandit
                    </a>{" "}
                    · Playground
                </footer>
            </main>
        </div>
    );
}
