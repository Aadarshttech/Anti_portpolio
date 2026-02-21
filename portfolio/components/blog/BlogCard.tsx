"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Calendar, Clock } from "lucide-react";
import { PostMeta } from "@/lib/blog";

export function BlogCard({ post, index }: { post: PostMeta; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group relative flex flex-col justify-between"
        >
            <Link href={`/blog/${post.slug}`} className="block relative z-10 w-full h-full flex flex-col">
                <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex-grow flex flex-col">

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                        {post.tags.map((tag) => (
                            <span
                                key={tag}
                                className="px-3 py-1 bg-gray-50 text-gray-600 text-[13px] font-semibold rounded-full border border-gray-100"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* Title & Desc */}
                    <h3 className="text-2xl font-bold font-heading text-gray-900 mb-3 group-hover:text-orange-500 transition-colors leading-tight line-clamp-2">
                        {post.title}
                    </h3>
                    <p className="text-gray-500 line-clamp-3 mb-8 flex-grow leading-relaxed">
                        {post.description}
                    </p>

                    {/* Meta Footer */}
                    <div className="flex items-center justify-between text-sm text-gray-400 font-medium pt-6 border-t border-gray-100/60 mt-auto">
                        <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1.5">
                                <Calendar className="w-4 h-4" />
                                {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </span>
                            <span className="flex items-center gap-1.5">
                                <Clock className="w-4 h-4" />
                                {post.readTime}
                            </span>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-orange-500 group-hover:text-white transition-colors text-gray-400">
                            <ArrowUpRight className="w-4 h-4" />
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
