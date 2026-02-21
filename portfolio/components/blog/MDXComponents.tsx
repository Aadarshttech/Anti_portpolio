import Image from 'next/image';

export const MDXComponents = {
    h1: ({ children }: { children?: React.ReactNode }) => (
        <h1 className="text-4xl md:text-5xl font-black font-heading mt-14 mb-6 text-gray-900 leading-[1.1] tracking-[-0.02em]">
            {children}
        </h1>
    ),
    h2: ({ children }: { children?: React.ReactNode }) => (
        <h2 className="text-3xl md:text-4xl font-bold font-heading mt-12 mb-5 text-gray-900 leading-[1.2] tracking-[-0.01em] group relative flex items-center">
            {children}
        </h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
        <h3 className="text-2xl font-bold font-heading mt-10 mb-4 text-gray-800 leading-snug">
            {children}
        </h3>
    ),
    p: ({ children }: { children?: React.ReactNode }) => (
        <p className="text-lg text-gray-600 leading-relaxed mb-6 font-sans">
            {children}
        </p>
    ),
    a: ({ href, children }: { href?: string; children?: React.ReactNode }) => (
        <a
            href={href}
            className="text-orange-500 hover:text-orange-600 underline underline-offset-4 decoration-orange-500/30 hover:decoration-orange-500 transition-all"
            target={href?.startsWith('http') ? '_blank' : undefined}
            rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
        >
            {children}
        </a>
    ),
    ul: ({ children }: { children?: React.ReactNode }) => (
        <ul className="list-disc list-outside pl-6 mb-6 text-gray-600 text-lg space-y-2 marker:text-orange-500">
            {children}
        </ul>
    ),
    ol: ({ children }: { children?: React.ReactNode }) => (
        <ol className="list-decimal list-outside pl-6 mb-6 text-gray-600 text-lg space-y-2 marker:text-orange-500 font-medium font-heading">
            {children}
        </ol>
    ),
    li: ({ children }: { children?: React.ReactNode }) => (
        <li className="pl-2 leading-relaxed font-sans">{children}</li>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
        <blockquote className="border-l-4 border-orange-500 bg-orange-50/50 pl-6 py-4 pr-4 my-8 rounded-r-2xl italic text-gray-700 shadow-sm">
            {children}
        </blockquote>
    ),
    pre: ({ children }: { children?: React.ReactNode }) => (
        <pre className="bg-[#0D1117] text-gray-300 rounded-2xl p-6 overflow-x-auto my-8 shadow-xl border border-white/5 font-mono text-sm leading-relaxed scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent">
            {children}
        </pre>
    ),
    code: ({ className, children }: { className?: string; children?: React.ReactNode }) => {
        const isInline = !className;
        if (isInline) {
            return (
                <code className="bg-orange-100/50 text-orange-800 px-1.5 py-0.5 rounded-md font-mono text-[0.85em] font-medium border border-orange-200/50">
                    {children}
                </code>
            );
        }
        return <code className={className}>{children}</code>;
    },
    img: ({ src, alt }: { src?: string; alt?: string }) => {
        if (!src) return null;
        return (
            <div className="my-10 overflow-hidden rounded-3xl bg-gray-100 ring-1 ring-gray-900/5">
                {/* We use standard img here inside MDX for simplicity unless size constraints are handled. Can optionally add Next/Image if src is local and sizes are provided. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt={alt || 'Blog Image'} className="w-full h-auto object-cover" loading="lazy" />
                {alt && <p className="text-center text-sm text-gray-500 mt-3 font-medium">{alt}</p>}
            </div>
        );
    },
    hr: () => <hr className="my-12 border-gray-200 border-dashed" />,
    table: ({ children }: { children?: React.ReactNode }) => (
        <div className="overflow-x-auto my-8 border border-gray-200 rounded-2xl shadow-sm">
            <table className="w-full text-left border-collapse">{children}</table>
        </div>
    ),
    th: ({ children }: { children?: React.ReactNode }) => (
        <th className="bg-gray-50 border-b border-gray-200 px-6 py-4 text-sm font-bold text-gray-900 uppercase tracking-wider font-heading">
            {children}
        </th>
    ),
    td: ({ children }: { children?: React.ReactNode }) => (
        <td className="border-b border-gray-100 px-6 py-4 text-sm text-gray-600">
            {children}
        </td>
    ),
};
