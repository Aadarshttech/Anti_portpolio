import Link from "next/link";
import { Github, Linkedin, Mail, Twitter, ArrowRight } from "lucide-react";

export function Footer() {
    return (
        <footer className="relative bg-white pt-24 pb-12 overflow-hidden">
            {/* Decorative Top Border Gradient */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-100 via-primary to-blue-200" />

            {/* Background Accents */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] -z-10 pointer-events-none translate-x-1/3 -translate-y-1/3" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-50 rounded-full blur-[80px] -z-10 pointer-events-none -translate-x-1/2 translate-y-1/2" />

            <div className="container mx-auto px-6 relative z-10">
                {/* CTA Block */}
                <div className="bg-gradient-to-br from-orange-50 to-blue-50 rounded-[40px] p-10 md:p-16 mb-20 border border-white/60 shadow-xl shadow-orange-900/5 relative overflow-hidden backdrop-blur-sm">
                    {/* Inner Decorative Blob */}
                    <div className="absolute -top-24 -right-24 w-64 h-64 bg-white rounded-full blur-3xl opacity-60" />

                    <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
                        <div className="max-w-xl">
                            <h2 className="text-3xl md:text-4xl font-bold font-heading text-gray-900 mb-4">
                                Have an idea?<br />
                                <span className="text-primary italic font-outfit font-black">Let's build it together.</span>
                            </h2>
                            <p className="text-gray-600">
                                I'm always open to discussing product design work, AI integrations, or partnership opportunities.
                            </p>
                        </div>
                        <a
                            href="/#contact"
                            className="group inline-flex items-center gap-3 bg-gray-900 text-white px-8 py-4 rounded-full font-medium hover:bg-primary transition-colors duration-300 shadow-lg hover:shadow-primary/30 shrink-0"
                        >
                            Start a Conversation
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </a>
                    </div>
                </div>

                {/* Main Footer Links */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-16">
                    {/* Brand Column */}
                    <div className="md:col-span-5 lg:col-span-4 flex flex-col items-center md:items-start text-center md:text-left">
                        <Link href="/" className="text-3xl font-bold font-heading text-gray-900 mb-6 inline-block">
                            Aadarsh<span className="text-primary">.</span>
                        </Link>
                        <p className="text-gray-500 text-sm leading-relaxed max-w-sm mb-8">
                            A freelance AI & Full Stack Developer based in Kathmandu, Nepal. Crafting high-performance digital architectures and intelligent web experiences that scale.
                        </p>

                        {/* Social Links */}
                        <div className="flex gap-4">
                            <a href="https://github.com/Aadarshttech" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-900 hover:bg-white hover:border-gray-300 hover:shadow-sm transition-all duration-300">
                                <Github size={18} />
                                <span className="sr-only">GitHub</span>
                            </a>
                            <a href="https://linkedin.com/in/aadarsh-pandit" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 hover:text-[#0077b5] hover:bg-white hover:border-blue-100 hover:shadow-sm transition-all duration-300">
                                <Linkedin size={18} />
                                <span className="sr-only">LinkedIn</span>
                            </a>
                            <a href="mailto:aadarshapandit17@gmail.com" className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 hover:text-primary hover:bg-white hover:border-orange-100 hover:shadow-sm transition-all duration-300">
                                <Mail size={18} />
                                <span className="sr-only">Email</span>
                            </a>
                            <a href="https://twitter.com/aadarshapandit" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 hover:text-sky-500 hover:bg-white hover:border-sky-100 hover:shadow-sm transition-all duration-300">
                                <Twitter size={18} />
                                <span className="sr-only">Twitter</span>
                            </a>
                        </div>
                    </div>

                    {/* Navigation Column */}
                    <div className="md:col-span-3 lg:col-span-2 lg:col-start-7 flex flex-col items-center md:items-start text-center md:text-left">
                        <h4 className="font-bold font-heading text-lg text-gray-900 mb-6 relative inline-block">
                            Navigation
                            <div className="absolute -bottom-2 left-1/2 md:left-0 -translate-x-1/2 md:translate-x-0 w-8 h-1 bg-primary/20 rounded-full" />
                        </h4>
                        <div className="flex flex-col gap-4 text-sm text-gray-500">
                            <Link href="/#home" className="hover:text-primary hover:translate-x-1 transition-all duration-200">Home</Link>
                            <Link href="/#about" className="hover:text-primary hover:translate-x-1 transition-all duration-200">About Me</Link>
                            <Link href="/works" className="hover:text-primary hover:translate-x-1 transition-all duration-200">Experience</Link>
                            <Link href="/blog" className="hover:text-primary hover:translate-x-1 transition-all duration-200">Writings</Link>
                        </div>
                    </div>

                    {/* Works Column */}
                    <div className="md:col-span-4 lg:col-span-3 flex flex-col items-center md:items-start text-center md:text-left">
                        <h4 className="font-bold font-heading text-lg text-gray-900 mb-6 relative inline-block">
                            Selected Works
                            <div className="absolute -bottom-2 left-1/2 md:left-0 -translate-x-1/2 md:translate-x-0 w-8 h-1 bg-primary/20 rounded-full" />
                        </h4>
                        <div className="flex flex-col gap-4 text-sm text-gray-500">
                            <Link href="/projects/nexus" className="hover:text-primary hover:translate-x-1 transition-all duration-200">Nexus Interactive Hub <span className="ml-2 text-[10px] bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full font-mono">3D</span></Link>
                            <Link href="/projects/beverages" className="hover:text-primary hover:translate-x-1 transition-all duration-200">Mango Pandit <span className="ml-2 text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-mono">SCROLL</span></Link>
                            <Link href="/projects/nepal" className="hover:text-primary hover:translate-x-1 transition-all duration-200">Cinematic Nepal</Link>
                            <Link href="/projects/jcb" className="hover:text-primary hover:translate-x-1 transition-all duration-200">JCB Industrial Showcase</Link>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-400 text-sm font-medium">
                        © {new Date().getFullYear()} Aadarsh Pandit. Building with <span className="text-red-400">♥</span> in Nepal.
                    </p>
                    <div className="flex gap-6 text-sm font-medium text-gray-400">
                        <Link href="/sitemap.xml" className="hover:text-primary transition-colors">Sitemap</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
