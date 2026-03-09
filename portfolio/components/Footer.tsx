export function Footer() {
    return (
        <footer className="bg-white py-12 border-t border-gray-100">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div className="col-span-1 md:col-span-2">
                        <h3 className="text-xl font-bold font-heading mb-4">Aadarsh<span className="text-primary">.</span></h3>
                        <p className="text-gray-500 text-sm max-w-xs leading-relaxed">
                            Freelance AI Developer & Full Stack Expert building the future of intelligent web experiences.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-bold text-sm uppercase tracking-wider mb-4">Navigation</h4>
                        <div className="flex flex-col gap-2 text-sm text-gray-600">
                            <a href="/#home" className="hover:text-primary transition-colors">Home</a>
                            <a href="/#about" className="hover:text-primary transition-colors">About</a>
                            <a href="/blog" className="hover:text-primary transition-colors">Blog</a>
                            <a href="/works" className="hover:text-primary transition-colors">Experience</a>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-bold text-sm uppercase tracking-wider mb-4">Projects</h4>
                        <div className="flex flex-col gap-2 text-sm text-gray-600">
                            <a href="/projects/nexus" className="hover:text-primary transition-colors">Nexus 3D Hub</a>
                            <a href="/projects/beverages" className="hover:text-primary transition-colors">Mango Pandit</a>
                            <a href="/projects/nepal" className="hover:text-primary transition-colors">Cinematic Nepal</a>
                            <a href="/projects/jcb" className="hover:text-primary transition-colors">JCB Backhoe</a>
                        </div>
                    </div>
                </div>
                <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-400 text-xs">
                        © {new Date().getFullYear()} Aadarsh Pandit. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-xs text-gray-400">
                        <a href="https://github.com/Aadarshttech" target="_blank" rel="noopener" className="hover:text-primary">GitHub</a>
                        <a href="https://linkedin.com/in/aadarsh-pandit" target="_blank" rel="noopener" className="hover:text-primary">LinkedIn</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
