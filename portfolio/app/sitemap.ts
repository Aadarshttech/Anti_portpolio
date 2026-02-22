import { MetadataRoute } from 'next'
import { getPostSlugs } from '@/lib/blog'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const rawSlugs = await getPostSlugs()
    const slugs = rawSlugs.map((slug) => slug.replace(/\.mdx$/, ''))
    const blogEntries = slugs.map((slug) => ({
        url: `https://aadarshapandit.com.np/blog/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
    }))

    return [
        {
            url: 'https://aadarshapandit.com.np',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 1,
        },
        {
            url: 'https://aadarshapandit.com.np/works',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: 'https://aadarshapandit.com.np/blog',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: 'https://aadarshapandit.com.np/playground',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        ...blogEntries,
    ]
}
