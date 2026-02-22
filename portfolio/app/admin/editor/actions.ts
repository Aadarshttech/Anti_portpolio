'use server'

import { supabase } from '@/lib/supabase'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function savePost(formData: FormData) {
    const id = formData.get('id') as string
    const title = formData.get('title') as string
    const slug = formData.get('slug') as string
    const description = formData.get('description') as string
    const image = formData.get('image') as string || '/images/blog-default.jpg'
    const read_time = formData.get('read_time') as string || '5 min read'
    const content = formData.get('content') as string

    const tagsString = formData.get('tags') as string
    const tags = tagsString ? tagsString.split(',').map(tag => tag.trim()).filter(Boolean) : []

    const postData = {
        title,
        slug,
        description,
        image,
        tags,
        read_time,
        content
    }

    if (id) {
        await supabase.from('posts').update(postData).eq('id', id)
    } else {
        await supabase.from('posts').insert([postData])
    }

    revalidatePath('/admin')
    revalidatePath('/blog')
    redirect('/admin')
}
