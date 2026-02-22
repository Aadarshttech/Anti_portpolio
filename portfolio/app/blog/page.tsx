import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import { BlogCard } from "@/components/blog/BlogCard";
import { Navbar } from "@/components/Navbar";

export const metadata: Metadata = {
    title: "Blog — Articles & Tutorials by Aadarsh Pandit",
    description: "Read the latest articles on web development, AI, machine learning, and workflow automation. Learn how to build high-performance software.",
    alternates: {
        canonical: "/blog",
    },
    openGraph: {
        title: "Blog — Aadarsh Pandit",
        description: "Articles on web development, AI, machine learning, and automation.",
        url: "https://aadarshapandit.com.np/blog",
        type: "website",
    },
};

export default async function BlogListingPage() {
    const posts = await getAllPosts();

    return (
        <main className="min-h-screen bg-white text-gray-900 overflow-x-hidden relative selection:bg-orange-200 selection:text-orange-900">
            {/* Ambient Background Styling */}
            <div className="absolute top-0 inset-x-0 h-[800px] bg-gradient-to-b from-[#FAFBFF] to-white pointer-events-none -z-10" />
            <div className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] bg-gradient-to-bl from-orange-200/40 via-orange-100/10 to-transparent rounded-full blur-[120px] pointer-events-none -z-10" />
            <div className="absolute top-[20%] left-[-10%] w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none -z-10" />
            {/* Subtle Dotted Pattern over the hero */}
            <div className="absolute top-0 inset-x-0 h-[600px] bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] opacity-60 pointer-events-none -z-10 [mask-image:linear-gradient(to_bottom,white,transparent)]" />

            <Navbar />

            <header className="pt-40 pb-20 md:pt-52 md:pb-32 relative z-10 px-6">
                <div className="container mx-auto max-w-5xl text-center">
                    <h1 className="text-6xl md:text-7xl lg:text-[5.5rem] font-heading leading-tight mb-8 tracking-[-0.02em] text-[#0A0A0A] flex flex-col sm:flex-row items-center justify-center gap-4">
                        <span className="font-extrabold pb-2">The</span>
                        <span className="font-black text-white bg-gradient-to-br from-[#FF6B00] to-[#FF8A00] px-6 py-1 pb-3 rounded-2xl md:rounded-3xl shadow-[0_8px_30px_rgb(255,107,0,0.3)] rotate-[-1deg] hover:rotate-1 transition-transform duration-300">
                            Developer
                        </span>
                        <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-gray-900 to-gray-500 pb-2">
                            Log.
                        </span>
                    </h1>

                    <p className="text-xl md:text-2xl text-gray-500 max-w-3xl mx-auto leading-relaxed font-medium tracking-tight mt-6">
                        Deep dives into custom AI models, machine learning architecture, full stack web development, and workflow automation.
                    </p>
                </div>
            </header>

            <section className="pb-24 md:pb-32 relative z-10">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                        {posts.map((post, i) => (
                            <BlogCard key={post.slug} post={post} index={i} />
                        ))}
                    </div>

                    {posts.length === 0 && (
                        <div className="text-center py-32 bg-gray-50/50 rounded-3xl border border-gray-100 border-dashed max-w-3xl mx-auto">
                            <h3 className="text-3xl font-black font-heading text-gray-900 mb-4">No posts yet</h3>
                            <p className="text-lg text-gray-500">Check back later for new articles and insights!</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Premium seamless footer */}
            <footer className="py-16 bg-[#FAFBFF] border-t border-gray-100 text-center relative z-10">
                <p className="text-gray-500 font-medium tracking-wide">
                    © {new Date().getFullYear()} Aadarsh Pandit. All rights reserved.
                </p>
            </footer>
        </main>
    );
}
