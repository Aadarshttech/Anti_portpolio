import { Github, Linkedin, Twitter, Mail, Instagram } from "lucide-react";

export function Footer() {
    return (
        <footer className="relative bg-white pt-20 pb-10 border-t border-gray-100 overflow-hidden">
            {/* Background Accents to match Hero */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -z-10" />

            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
                    {/* Brand Section */}
                    <div className="md:col-span-5 space-y-6">
                        <h3 className="text-3xl font-bold font-heading">
                            Aadarsh<span className="text-primary">.</span>
                        </h3>
                        <p className="text-gray-600 text-sm max-w-sm leading-relaxed">
                            Freelance AI Developer & Full Stack Expert building intelligent web experiences
                            that bridge the gap between complex algorithms and intuitive design.
                        </p>
                        <div className="flex gap-4">
                            {[
                                { icon: Github, href: "https://github.com/Aadarshttech", label: "GitHub" },
                                { icon: Linkedin, href: "https://linkedin.com/in/aadarsh-pandit", label: "LinkedIn" },
                                { icon: Twitter, href: "https://twitter.com/aadarshapandit", label: "Twitter" },
                                { icon: Instagram, href: "https://instagram.com/aadarsh_pandit17", label: "Instagram" },
                                { icon: Mail, href: "mailto:contact@aadarshapandit.com.np", label: "Email" }
                            ].map((social, i) => (
                                <a
                                    key={i}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 rounded-lg bg-gray-50 text-gray-400 hover:text-primary hover:bg-orange-50 transition-all duration-300 transform hover:-translate-y-1"
                                    aria-label={social.label}
                                >
                                    <social.icon size={20} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <div className="md:col-span-3 space-y-6">
                        <h4 className="font-bold text-sm uppercase tracking-widest text-gray-900">Navigation</h4>
                        <ul className="space-y-3 text-sm text-gray-600">
                            <li><a href="/#home" className="hover:text-primary transition-colors flex items-center gap-2 group"><span className="w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span> Home</a></li>
                            <li><a href="/#about" className="hover:text-primary transition-colors flex items-center gap-2 group"><span className="w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span> About</a></li>
                            <li><a href="/blog" className="hover:text-primary transition-colors flex items-center gap-2 group"><span className="w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span> Blog</a></li>
                            <li><a href="/works" className="hover:text-primary transition-colors flex items-center gap-2 group"><span className="w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span> Experience</a></li>
                        </ul>
                    </div>

                    {/* Quick Projects Links */}
                    <div className="md:col-span-4 space-y-6">
                        <h4 className="font-bold text-sm uppercase tracking-widest text-gray-900">Top Projects</h4>
                        <ul className="space-y-3 text-sm text-gray-600">
                            <li><a href="/projects/nexus" className="hover:text-primary transition-colors flex items-center gap-2 group"><span className="w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span> Nexus 3D Hub</a></li>
                            <li><a href="/projects/beverages" className="hover:text-primary transition-colors flex items-center gap-2 group"><span className="w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span> Mango Pandit</a></li>
                            <li><a href="/projects/nepal" className="hover:text-primary transition-colors flex items-center gap-2 group"><span className="w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span> Cinematic Nepal</a></li>
                            <li><a href="/projects/jcb" className="hover:text-primary transition-colors flex items-center gap-2 group"><span className="w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span> JCB Backhoe</a></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400 font-medium tracking-wide">
                    <p>© {new Date().getFullYear()} Aadarsh Pandit. Building with ❤️ in Nepal.</p>
                    <div className="flex gap-8">
                        <a href="/#contact" className="hover:text-primary transition-colors uppercase tracking-widest">Hire Me</a>
                        <a href="/cv" className="hover:text-primary transition-colors uppercase tracking-widest">Résumé</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
