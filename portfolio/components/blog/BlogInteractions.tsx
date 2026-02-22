"use client";

import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { supabase } from "@/lib/supabase";

export function BlogInteractions({ slug }: { slug: string }) {
    const [likes, setLikes] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchLikes = async () => {
            try {
                // Fetch current likes from Supabase
                const { data, error } = await supabase
                    .from('posts')
                    .select('likes')
                    .eq('slug', slug)
                    .single();

                if (!error && data) {
                    setLikes(data.likes || 0);
                }

                // Check localStorage for like state
                const savedLikeState = localStorage.getItem(`blog_liked_${slug}`);
                if (savedLikeState === 'true') {
                    setIsLiked(true);
                }
            } catch (error) {
                console.error("Error fetching likes:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchLikes();
    }, [slug]);

    const handleLike = async () => {
        if (isLoading) return;

        const originalLikes = likes;
        const originalIsLiked = isLiked;

        // Optimistic UI update
        if (isLiked) {
            setLikes(l => Math.max(0, l - 1));
            setIsLiked(false);
            localStorage.setItem(`blog_liked_${slug}`, 'false');
        } else {
            setLikes(l => l + 1);
            setIsLiked(true);
            localStorage.setItem(`blog_liked_${slug}`, 'true');
        }

        try {
            if (originalIsLiked) {
                // Decrement in Supabase
                await supabase.rpc('decrement_likes', { slug_text: slug });
            } else {
                // Increment in Supabase
                await supabase.rpc('increment_likes', { slug_text: slug });
            }
        } catch (error) {
            console.error("Error updating likes:", error);
            // Revert on error
            setLikes(originalLikes);
            setIsLiked(originalIsLiked);
            localStorage.setItem(`blog_liked_${slug}`, String(originalIsLiked));
        }
    };

    return (
        <div className="mt-16 pt-8 border-t border-gray-100 mb-8">
            <div className="flex items-center gap-6">
                <button
                    onClick={handleLike}
                    disabled={isLoading}
                    className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all duration-300 ${isLiked
                        ? "bg-red-50 text-red-600 border border-red-100 shadow-sm"
                        : "bg-gray-50 text-gray-600 border border-transparent hover:bg-gray-100"
                        } ${isLoading ? 'opacity-50 cursor-not-allowed' : 'opacity-100 hover:scale-105 active:scale-95'}`}
                >
                    <Heart className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} />
                    <span>{likes} {likes === 1 ? 'Like' : 'Likes'}</span>
                </button>
            </div>
        </div>
    );
}
