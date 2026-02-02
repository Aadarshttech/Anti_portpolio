export function Footer() {
    return (
        <footer className="bg-white py-8 border-t border-gray-100">
            <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-gray-500 text-sm">
                    © {new Date().getFullYear()} Aadarsh Pandit. All rights reserved.
                </p>
                <div className="flex gap-6 text-sm font-medium text-gray-600">
                    <a href="#home" className="hover:text-primary">Home</a>
                    <a href="#about" className="hover:text-primary">About</a>
                    <a href="#projects" className="hover:text-primary">Projects</a>
                    <a href="#contact" className="hover:text-primary">Contact</a>
                </div>
            </div>
        </footer>
    );
}
