'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function login(formData: FormData) {
    const password = formData.get('password')
    if (password === process.env.ADMIN_PASSWORD) {
        const store = await cookies()
        store.set('admin_token', 'true', { httpOnly: true, path: '/' })
    }
    redirect('/admin')
}

export async function logout() {
    const store = await cookies()
    store.delete('admin_token')
    redirect('/admin')
}
