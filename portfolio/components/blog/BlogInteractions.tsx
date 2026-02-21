"use client";

import { useState, useEffect } from "react";
import { Heart } from "lucide-react";

export function BlogInteractions({ slug }: { slug: string }) {
    const [likes, setLikes] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    const [hasMounted, setHasMounted] = useState(false);

    // Hydration safe random initial likes
    useEffect(() => {
        setLikes(Math.floor(Math.random() * 50) + 10);
        setHasMounted(true);
    }, []);

    const handleLike = () => {
        if (isLiked) {
            setLikes(l => l - 1);
            setIsLiked(false);
        } else {
            setLikes(l => l + 1);
            setIsLiked(true);
        }
    };

    return (
        <div className="mt-16 pt-8 border-t border-gray-100 mb-8">
            <div className="flex items-center gap-6">
                <button
                    onClick={handleLike}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all ${isLiked
                        ? "bg-red-50 text-red-600 border border-red-100"
                        : "bg-gray-50 text-gray-600 border border-transparent hover:bg-gray-100"
                        } ${!hasMounted ? 'opacity-0' : 'opacity-100'}`}
                >
                    <Heart className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} />
                    <span>{likes} {likes === 1 ? 'Like' : 'Likes'}</span>
                </button>
            </div>
        </div>
    );
}
