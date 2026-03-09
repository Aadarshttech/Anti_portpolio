export function Footer() {
    return (
        <footer className="bg-[#0a0a0a] text-white pt-20 pb-8 relative overflow-hidden">
            {/* Subtle top glowing border */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-60" />

            {/* Background watermark */}
            <div className="absolute bottom-0 right-0 text-[20vw] font-black leading-none text-white/[0.02] select-none pointer-events-none pr-8">
                AP
            </div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Top Row */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
                    {/* Brand */}
                    <div className="md:col-span-5">
                        <h2 className="text-4xl font-black font-heading tracking-tight mb-4">
                            Aadarsh<span className="text-orange-500">.</span>
                        </h2>
                        <p className="text-gray-400 text-sm max-w-xs leading-relaxed mb-6">
                            Freelance AI Developer & Full Stack Expert crafting intelligent, high-performance web experiences — from Neural Networks to pixel-perfect UIs.
                        </p>
                        <div className="flex items-center gap-3">
                            {/* GitHub */}
                            <a
                                href="https://github.com/Aadarshttech"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="GitHub"
                                className="group flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-orange-500/50 transition-all duration-200"
                            >
                                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24" className="text-gray-300 group-hover:text-white transition-colors">
                                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23A11.5 11.5 0 0112 6.598a11.5 11.5 0 013-.405c2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12" />
                                </svg>
                                <span className="text-xs text-gray-400 group-hover:text-white transition-colors font-mono">GitHub</span>
                            </a>
                            {/* LinkedIn */}
                            <a
                                href="https://linkedin.com/in/aadarsh-pandit"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="LinkedIn"
                                className="group flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-[#0077b5]/20 hover:border-[#0077b5]/50 transition-all duration-200"
                            >
                                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24" className="text-gray-300 group-hover:text-[#0077b5] transition-colors">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                                <span className="text-xs text-gray-400 group-hover:text-[#0077b5] transition-colors font-mono">LinkedIn</span>
                            </a>
                        </div>
                    </div>

                    {/* Links */}
                    <div className="md:col-span-3">
                        <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-orange-500 mb-6">Navigate</h4>
                        <div className="flex flex-col gap-3">
                            {[
                                { label: 'Home', href: '/#home' },
                                { label: 'About', href: '/#about' },
                                { label: 'Blog', href: '/blog' },
                                { label: 'Experience', href: '/works' },
                                                            ].map(link => (
                                <a key={link.label} href={link.href} className="text-sm text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-200 w-fit">
                                    {link.label}
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="md:col-span-4">
                        <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-orange-500 mb-6">Projects</h4>
                        <div className="flex flex-col gap-3">
                            {[
                                { label: 'Nexus — 3D Interactive Hub', href: '/projects/nexus' },
                                { label: 'Mango Pandit — Scrollytelling', href: '/projects/beverages' },
                                { label: 'Cinematic Nepal Travels', href: '/projects/nepal' },
                                { label: 'JCB Backhoe Loader', href: '/projects/jcb' },
                                { label: 'Nepal Cricket Predictor', href: '/nepal-cricket/index.html' },
                            ].map(link => (
                                <a key={link.label} href={link.href} className="text-sm text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-200 w-fit">
                                    {link.label}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom strip */}
                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-3">
                    <p className="text-gray-600 text-xs">
                        © {new Date().getFullYear()} Aadarsh Pandit. Built with Next.js & ❤️
                    </p>
                    <p className="text-gray-700 text-xs font-mono tracking-widest uppercase">
                        aadarshapandit.com.np
                    </p>
                </div>
            </div>
        </footer>
    );
}
