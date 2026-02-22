import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { revalidatePath } from 'next/cache'

export default async function AdminDashboard() {
    const { data: posts, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false })

    async function deletePost(formData: FormData) {
        'use server'
        const id = formData.get('id')
        if (id) {
            await supabase.from('posts').delete().eq('id', id)
            revalidatePath('/admin')
            revalidatePath('/blog') // revalidate public blog too
        }
    }

    async function togglePublish(formData: FormData) {
        'use server'
        const id = formData.get('id')
        const currentState = formData.get('currentState') === 'true'
        if (id) {
            await supabase.from('posts').update({ is_published: !currentState }).eq('id', id)
            revalidatePath('/admin')
            revalidatePath('/blog')
        }
    }

    if (error) {
        return <div className="p-4 bg-red-50 text-red-600 rounded-lg">Error loading posts: {error.message}</div>
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold font-heading text-gray-900 tracking-tight">Blog Posts</h1>
                    <p className="text-gray-500 mt-1">Manage your Supabase blog content</p>
                </div>
                <Link
                    href="/admin/editor"
                    className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-indigo-700 transition shadow-sm"
                >
                    + New Post
                </Link>
            </div>

            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
                {!posts || posts.length === 0 ? (
                    <div className="p-12 text-center text-gray-500">
                        No posts found. Start writing!
                    </div>
                ) : (
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4 font-medium text-gray-500 text-sm">Title</th>
                                <th className="px-6 py-4 font-medium text-gray-500 text-sm">Status</th>
                                <th className="px-6 py-4 font-medium text-gray-500 text-sm">Date</th>
                                <th className="px-6 py-4 font-medium text-gray-500 text-sm text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {posts.map((post) => (
                                <tr key={post.id} className="hover:bg-gray-50/50 transition">
                                    <td className="px-6 py-4">
                                        <p className="font-bold text-gray-900">{post.title}</p>
                                        <p className="text-sm text-gray-400 font-mono mt-1">/{post.slug}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <form action={togglePublish}>
                                            <input type="hidden" name="id" value={post.id} />
                                            <input type="hidden" name="currentState" value={String(post.is_published)} />
                                            <button
                                                type="submit"
                                                className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${post.is_published
                                                    ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                                                    : 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                                                    } transition`}
                                            >
                                                {post.is_published ? 'Published' : 'Draft'}
                                            </button>
                                        </form>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        {new Date(post.created_at).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 text-right space-x-3">
                                        <Link
                                            href={`/admin/editor?id=${post.id}`}
                                            className="text-indigo-600 hover:text-indigo-800 font-medium text-sm transition"
                                        >
                                            Edit
                                        </Link>
                                        <form action={deletePost} className="inline-block">
                                            <input type="hidden" name="id" value={post.id} />
                                            <button type="submit" className="text-red-500 hover:text-red-700 font-medium text-sm transition text-left w-full">
                                                Delete
                                            </button>
                                        </form>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    )
}
