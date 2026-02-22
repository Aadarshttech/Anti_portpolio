import { supabase } from '@/lib/supabase'
import { EditorForm } from './EditorForm'

export default async function EditorPage({ searchParams }: { searchParams: Promise<{ id?: string }> }) {
    const { id } = await searchParams
    let post = null

    if (id) {
        const { data } = await supabase.from('posts').select('*').eq('id', id).single()
        post = data
    }

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold font-heading text-gray-900 tracking-tight">{post ? 'Edit Post' : 'New Post'}</h1>
                <p className="text-gray-500 mt-1">Write your content using Markdown.</p>
            </div>
            <EditorForm post={post} />
        </div>
    )
}
