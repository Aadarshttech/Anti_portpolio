'use client'

import { useState } from 'react'
import { savePost } from './actions'

export function EditorForm({ post }: { post?: any }) {
    const [title, setTitle] = useState(post?.title || '')
    const [slug, setSlug] = useState(post?.slug || '')

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTitle = e.target.value
        setTitle(newTitle)
        if (!post) {
            setSlug(newTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''))
        }
    }

    return (
        <form action={savePost} className="space-y-6 bg-white p-8 border border-gray-100 rounded-2xl shadow-sm">
            {post && <input type="hidden" name="id" value={post.id} />}
            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                    <input type="text" name="title" value={title} onChange={handleTitleChange} required className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Slug</label>
                    <input type="text" name="slug" value={slug} onChange={(e) => setSlug(e.target.value)} required className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50 font-mono text-sm" />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea name="description" defaultValue={post?.description || ''} rows={2} required className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50" />
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tags (comma separated)</label>
                    <input type="text" name="tags" defaultValue={post?.tags?.join(', ') || ''} placeholder="react, ai, web" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                    <input type="text" name="image" defaultValue={post?.image || ''} placeholder="/images/blog-default.jpg" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Read Time</label>
                    <input type="text" name="read_time" defaultValue={post?.read_time || '5 min read'} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50" />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Markdown Content</label>
                <textarea name="content" defaultValue={post?.content || ''} rows={15} required className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50 font-mono text-sm" />
            </div>

            <div className="flex justify-end gap-4 pt-4 border-t border-gray-100">
                <a href="/admin" className="px-6 py-2.5 rounded-xl font-medium text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 transition">Cancel</a>
                <button type="submit" className="bg-indigo-600 text-white px-8 py-2.5 rounded-xl font-medium hover:bg-indigo-700 transition shadow-sm">
                    {post ? 'Update Post' : 'Save as Draft'}
                </button>
            </div>
        </form>
    )
}
