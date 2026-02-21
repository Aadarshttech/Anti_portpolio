import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

const postsDirectory = path.join(process.cwd(), 'content/blog');

export type PostMeta = {
    title: string;
    description: string;
    date: string;
    tags: string[];
    image: string;
    slug: string;
    readTime: string;
};

export type Post = {
    meta: PostMeta;
    content: string;
};

export function getPostSlugs(): string[] {
    if (!fs.existsSync(postsDirectory)) {
        return [];
    }
    return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug: string): Post | null {
    const realSlug = slug.replace(/\.mdx$/, '');
    const fullPath = path.join(postsDirectory, `${realSlug}.mdx`);

    if (!fs.existsSync(fullPath)) {
        return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    const textStats = readingTime(content);

    return {
        meta: {
            title: data.title,
            description: data.description,
            date: data.date,
            tags: data.tags || [],
            image: data.image || '/images/blog-default.jpg',
            slug: realSlug,
            readTime: textStats.text,
        },
        content,
    };
}

export function getAllPosts(): PostMeta[] {
    const slugs = getPostSlugs();
    const posts = slugs
        .map((slug) => getPostBySlug(slug))
        .filter((post): post is Post => post !== null)
        .map((post) => post.meta)
        // Sort posts by date in descending order
        .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
    return posts;
}
