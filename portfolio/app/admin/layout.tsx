import { cookies } from 'next/headers'
import Link from 'next/link'
import { login, logout } from './actions'

export const metadata = { title: 'Admin Dashboard' }

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
    const cookieStore = await cookies()
    const isAuthenticated = cookieStore.get('admin_token')?.value === 'true'

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <form action={login} className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
                    <h1 className="text-2xl font-bold mb-2 text-center text-gray-900">Admin Access</h1>
                    <p className="text-gray-500 mb-6 text-center text-sm">Please log in to manage your blog.</p>
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter Admin Password"
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 bg-gray-50"
                    />
                    <button type="submit" className="w-full bg-gray-900 text-white font-bold py-3 rounded-xl hover:bg-gray-800 transition shadow-lg shadow-gray-900/20">
                        Login
                    </button>
                    <div className="mt-6 text-center">
                        <Link href="/" className="text-sm font-medium text-gray-400 hover:text-gray-900 transition">← Back to Portfolio</Link>
                    </div>
                </form>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
            <nav className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center sticky top-0 z-50">
                <div className="flex items-center gap-6">
                    <Link href="/admin" className="font-bold text-xl tracking-tight text-gray-900">Admin</Link>
                    <Link href="/admin/editor" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition">Write Post</Link>
                </div>
                <div className="flex items-center gap-6">
                    <Link href="/blog" target="_blank" className="text-sm font-medium text-indigo-600 hover:text-indigo-700 transition">View Live Blog ↗</Link>
                    <form action={logout}>
                        <button type="submit" className="text-sm font-medium text-gray-500 hover:text-red-600 transition">Logout</button>
                    </form>
                </div>
            </nav>
            <main className="p-6 md:p-10 max-w-5xl mx-auto">
                {children}
            </main>
        </div>
    )
}
