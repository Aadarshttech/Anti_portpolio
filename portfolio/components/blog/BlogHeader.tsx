"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { PostMeta } from "@/lib/blog";

export function BlogHeader({ post }: { post: PostMeta }) {
    return (
        <header className="pt-32 pb-16 md:pt-40 md:pb-24 bg-[#FAFBFF] border-b border-gray-100 relative overflow-hidden">
            {/* Ambient background glows */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/3" />

            <div className="container mx-auto px-6 max-w-4xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-12"
                >
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-gray-500 hover:text-orange-500 font-medium transition-colors"
                    >
                        <ChevronLeft className="w-4 h-4" />
                        Back to Articles
                    </Link>
                </motion.div>

                <div className="flex flex-wrap gap-2 mb-6">
                    {post.tags.map((tag) => (
                        <motion.span
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            key={tag}
                            className="px-4 py-1.5 bg-white text-orange-600 text-sm font-semibold rounded-full border border-orange-100 shadow-sm"
                        >
                            {tag}
                        </motion.span>
                    ))}
                </div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-5xl md:text-6xl lg:text-7xl font-black font-heading leading-[1.1] tracking-[-0.03em] mb-8 text-transparent bg-clip-text bg-gradient-to-br from-gray-900 via-gray-800 to-gray-500 drop-shadow-sm pb-2"
                >
                    {post.title}
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-xl md:text-2xl text-gray-500 leading-relaxed mb-10 max-w-3xl font-light"
                >
                    {post.description}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex items-center gap-6 text-gray-400 font-medium"
                >
                    <div className="flex items-center gap-2">
                        <Calendar className="w-5 h-5" />
                        <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Clock className="w-5 h-5" />
                        <span>{post.readTime}</span>
                    </div>
                </motion.div>
            </div>
        </header>
    );
}
