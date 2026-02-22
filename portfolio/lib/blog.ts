import { supabase } from '@/lib/supabase'

export type PostMeta = {
    title: string;
    description: string;
    created_at: string;
    date: string; // added for backwards compatibility with UI
    tags: string[];
    image: string;
    slug: string;
    readTime: string; // added for backwards compatibility with UI
};

export type Post = {
    meta: PostMeta;
    content: string;
};

export async function getPostSlugs(): Promise<string[]> {
    const { data } = await supabase
        .from('posts')
        .select('slug')
        .eq('is_published', true)

    return (data || []).map(p => p.slug)
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
    const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('slug', slug)
        .single();

    if (error || !data) {
        return null;
    }

    return {
        meta: {
            title: data.title,
            description: data.description,
            created_at: data.created_at,
            date: new Date(data.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }),
            tags: data.tags || [],
            image: data.image || '/images/blog-default.jpg',
            slug: data.slug,
            readTime: data.read_time || '5 min read',
        },
        content: data.content,
    };
}

export async function getAllPosts(): Promise<PostMeta[]> {
    const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('is_published', true)
        .order('created_at', { ascending: false });

    if (error || !data) {
        console.error("Error fetching posts from Supabase:", error)
        return []
    }

    return data.map(post => ({
        title: post.title,
        description: post.description,
        created_at: post.created_at,
        date: new Date(post.created_at).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }),
        tags: post.tags || [],
        image: post.image || '/images/blog-default.jpg',
        slug: post.slug,
        readTime: post.read_time || '5 min read',
    }))
}
