import { getPostBySlug, getPostSlugs } from "@/lib/blog";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { MDXComponents } from "@/components/blog/MDXComponents";
import { BlogHeader } from "@/components/blog/BlogHeader";
import { BlogInteractions } from "@/components/blog/BlogInteractions";
import { Navbar } from "@/components/Navbar";
import type { Metadata } from "next";

// 1. Generate Static Params (SSG for all blog posts)
export async function generateStaticParams() {
    const slugs = await getPostSlugs();
    return slugs.map((slug) => ({
        slug: slug.replace(/\.mdx$/, ""),
    }));
}

// 2. Dynamic SEO Metadata per post
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const post = await getPostBySlug(slug);
    if (!post) {
        return { title: 'Post Not Found' };
    }

    return {
        title: post.meta.title,
        description: post.meta.description,
        keywords: post.meta.tags,
        alternates: {
            canonical: `/blog/${post.meta.slug}`,
        },
        openGraph: {
            title: post.meta.title,
            description: post.meta.description,
            type: "article",
            publishedTime: post.meta.date,
            url: `https://aadarshapandit.com.np/blog/${post.meta.slug}`,
            images: [
                {
                    url: post.meta.image,
                    width: 1200,
                    height: 630,
                    alt: post.meta.title,
                }
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: post.meta.title,
            description: post.meta.description,
            images: [post.meta.image],
        }
    };
}

// 3. Page Component
export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    // JSON-LD Article Schema
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.meta.title,
        description: post.meta.description,
        image: `https://aadarshapandit.com.np${post.meta.image}`,
        datePublished: post.meta.date,
        dateModified: post.meta.date,
        author: {
            "@type": "Person",
            name: "Aadarsh Pandit",
            url: "https://aadarshapandit.com.np"
        }
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <main className="min-h-screen bg-white text-gray-900 selection:bg-orange-200 selection:text-orange-900">
                <Navbar />

                <BlogHeader post={post.meta} />

                <article className="container mx-auto px-6 max-w-3xl py-12 md:py-20">
                    {/* Author Block */}
                    <div className="flex items-center gap-4 mb-12 border-b border-gray-100 pb-8">
                        <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-lg font-heading">
                            AP
                        </div>
                        <div>
                            <p className="font-bold text-gray-900">Aadarsh Pandit</p>
                            <p className="text-sm text-gray-500">AI & Full Stack Developer</p>
                        </div>
                    </div>

                    {/* MDX Content rendering with custom components and GFM support for tables */}
                    <div className="prose prose-lg max-w-none">
                        <MDXRemote
                            source={post.content}
                            components={MDXComponents}
                            options={{
                                mdxOptions: {
                                    remarkPlugins: [remarkGfm]
                                }
                            }}
                        />
                    </div>

                    {/* Likes and Comments */}
                    <BlogInteractions slug={slug} />
                </article>

                <footer className="py-12 bg-[#FAFBFF] border-t border-gray-100 text-center">
                    <p className="text-gray-500 text-sm">
                        © {new Date().getFullYear()} Aadarsh Pandit. All rights reserved.
                    </p>
                </footer>
            </main>
        </>
    );
}
