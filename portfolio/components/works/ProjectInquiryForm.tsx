"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Github, Linkedin, Instagram, Loader2, Send, CheckCircle2, ArrowUpRight } from "lucide-react";
import { sendEmail } from "@/app/actions";
import { useActionState, useEffect, useRef } from "react";

const initialState = {
    success: false,
    message: '',
};

const socials = [
    { icon: <Github size={20} />, href: "https://github.com/Aadarshttech", bg: "bg-white/5 hover:bg-white/10 border-white/5" },
    { icon: <Linkedin size={20} />, href: "https://linkedin.com/in/aadarsh-pandit", bg: "bg-white/5 hover:bg-blue-500/20 border-white/5 hover:border-blue-500/30" },
    { icon: <Instagram size={20} />, href: "https://www.instagram.com/aadarsh_pandit17/", bg: "bg-white/5 hover:bg-pink-500/20 border-white/5 hover:border-pink-500/30" },
];

export function ProjectInquiryForm() {
    const [state, formAction, isPending] = useActionState(sendEmail, initialState);
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if (state.success && formRef.current) {
            formRef.current.reset();
        }
    }, [state.success]);

    return (
        <section id="contact" className="py-28 relative overflow-hidden bg-[#0A0A0A]">
            {/* Ambient glows */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-600/8 rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10 max-w-5xl">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="text-indigo-400 font-semibold tracking-wider uppercase text-sm">Get In Touch</span>
                    <h2 className="text-4xl md:text-5xl font-bold font-heading mt-3 text-white">
                        Let&apos;s Work{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Together</span>
                    </h2>
                    <p className="text-gray-500 mt-5 max-w-lg mx-auto text-lg">
                        Have an idea? Let&apos;s bring it to life. Drop me a message and I&apos;ll get back to you within 24 hours.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-5 gap-8 items-start">
                    {/* Left: Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="lg:col-span-2 space-y-6"
                    >
                        <a href="mailto:aadarshapandit@gmail.com" className="flex items-center gap-4 p-5 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-indigo-500/20 hover:bg-indigo-500/5 transition-all duration-300 group">
                            <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 group-hover:scale-110 transition-transform">
                                <Mail size={20} />
                            </div>
                            <div>
                                <p className="text-xs text-gray-600 uppercase tracking-wider">Email Me</p>
                                <p className="font-semibold text-white text-sm">aadarshapandit@gmail.com</p>
                            </div>
                            <ArrowUpRight className="w-4 h-4 text-gray-600 ml-auto group-hover:text-indigo-400 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
                        </a>

                        <a href="tel:+9779860334317" className="flex items-center gap-4 p-5 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-emerald-500/20 hover:bg-emerald-500/5 transition-all duration-300 group">
                            <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 group-hover:scale-110 transition-transform">
                                <Phone size={20} />
                            </div>
                            <div>
                                <p className="text-xs text-gray-600 uppercase tracking-wider">Call Me</p>
                                <p className="font-semibold text-white text-sm">+977 9860334317</p>
                            </div>
                            <ArrowUpRight className="w-4 h-4 text-gray-600 ml-auto group-hover:text-emerald-400 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
                        </a>

                        <div className="flex items-center gap-4 p-5 rounded-2xl border border-white/5 bg-white/[0.02]">
                            <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                                <MapPin size={20} />
                            </div>
                            <div>
                                <p className="text-xs text-gray-600 uppercase tracking-wider">Location</p>
                                <p className="font-semibold text-white text-sm">Kathmandu, Nepal</p>
                            </div>
                        </div>

                        {/* Socials */}
                        <div className="pt-4">
                            <p className="text-xs text-gray-600 uppercase tracking-wider mb-4">Follow Me</p>
                            <div className="flex items-center gap-3">
                                {socials.map((social, i) => (
                                    <motion.a
                                        key={i}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.1, y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                        className={`p-3 rounded-xl text-gray-400 hover:text-white border transition-all duration-300 ${social.bg}`}
                                    >
                                        {social.icon}
                                    </motion.a>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: Simple Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        viewport={{ once: true }}
                        className="lg:col-span-3 bg-white/[0.03] border border-white/5 rounded-3xl p-8 md:p-10"
                    >
                        {state.success ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex flex-col items-center justify-center text-center py-8"
                            >
                                <div className="w-16 h-16 bg-green-500/10 text-green-400 rounded-full flex items-center justify-center mb-5 border border-green-500/20">
                                    <CheckCircle2 size={32} />
                                </div>
                                <h3 className="text-xl font-bold font-heading text-white mb-2">Message Sent!</h3>
                                <p className="text-gray-500 max-w-sm mb-6 text-sm">
                                    Thanks for reaching out! I&apos;ll get back to you within 24 hours.
                                </p>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => window.location.reload()}
                                    className="px-6 py-2.5 rounded-full border border-white/10 text-gray-400 hover:text-white hover:border-white/20 transition-all text-sm"
                                >
                                    Send Another
                                </motion.button>
                            </motion.div>
                        ) : (
                            <form ref={formRef} action={formAction} className="space-y-5">
                                <div className="grid md:grid-cols-2 gap-5">
                                    <div>
                                        <label className="text-sm font-medium text-gray-400 mb-2 block">Name</label>
                                        <input
                                            name="name"
                                            type="text"
                                            placeholder="Your Name"
                                            required
                                            className="w-full px-5 py-3.5 bg-white/[0.03] rounded-xl border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/50 transition-all duration-300"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-400 mb-2 block">Email</label>
                                        <input
                                            name="email"
                                            type="email"
                                            placeholder="email@example.com"
                                            required
                                            className="w-full px-5 py-3.5 bg-white/[0.03] rounded-xl border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/50 transition-all duration-300"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-400 mb-2 block">Message</label>
                                    <textarea
                                        name="message"
                                        placeholder="Tell me about your project or idea..."
                                        rows={5}
                                        required
                                        className="w-full px-5 py-3.5 bg-white/[0.03] rounded-xl border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/50 transition-all duration-300 resize-none"
                                    />
                                </div>

                                <motion.button
                                    disabled={isPending}
                                    whileHover={{ scale: 1.02, boxShadow: "0 0 40px rgba(255, 255, 255, 0.1)" }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full py-4 rounded-xl text-lg font-semibold text-black bg-white hover:bg-gray-100 transition-all duration-300 shadow-xl shadow-white/10 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isPending ? (
                                        <>
                                            <Loader2 className="h-5 w-5 animate-spin" />
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="h-5 w-5" />
                                            Send Message
                                        </>
                                    )}
                                </motion.button>

                                {state.message && !state.success && (
                                    <p className="text-sm text-center text-red-400 bg-red-500/5 border border-red-500/10 p-3 rounded-xl">
                                        {state.message}
                                    </p>
                                )}
                            </form>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
