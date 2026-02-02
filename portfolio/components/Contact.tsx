"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Github, Linkedin, Instagram, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { sendEmail } from "@/app/actions";
import { useActionState, useEffect, useRef } from "react";

const initialState = {
    success: false,
    message: '',
};

export function Contact() {
    const [state, formAction, isPending] = useActionState(sendEmail, initialState);
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if (state.success && formRef.current) {
            formRef.current.reset();
        }
    }, [state.success]);

    return (
        <section id="contact" className="py-20 relative overflow-hidden bg-primary/5">
            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl mx-auto bg-white rounded-[40px] shadow-2xl p-8 md:p-12 overflow-hidden flex flex-col md:flex-row gap-12">

                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex-1 space-y-6"
                    >
                        <div>
                            <span className="text-primary font-semibold tracking-wider uppercase text-sm">Contact Me</span>
                            <h2 className="text-3xl md:text-4xl font-bold font-heading mt-2">Let's Work Together!</h2>
                            <p className="text-gray-600 mt-4">
                                "Let's build something amazing together. Start by saying hi!"
                            </p>
                        </div>

                        <div className="space-y-4">
                            <a href="mailto:aadarshapandit@gmail.com" className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 hover:bg-orange-50 transition-colors group">
                                <div className="bg-white p-3 rounded-full shadow-sm text-primary group-hover:scale-110 transition-transform">
                                    <Mail size={20} />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Email Me</p>
                                    <p className="font-semibold text-gray-900">aadarshapandit@gmail.com</p>
                                </div>
                            </a>

                            <a href="tel:+9779860334317" className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 hover:bg-orange-50 transition-colors group">
                                <div className="bg-white p-3 rounded-full shadow-sm text-primary group-hover:scale-110 transition-transform">
                                    <Phone size={20} />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Call Me</p>
                                    <p className="font-semibold text-gray-900">+977 9860334317</p>
                                </div>
                            </a>

                            <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 hover:bg-orange-50 transition-colors group">
                                <div className="bg-white p-3 rounded-full shadow-sm text-primary group-hover:scale-110 transition-transform">
                                    <MapPin size={20} />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Location</p>
                                    <p className="font-semibold text-gray-900">Kathmandu, Nepal</p>
                                </div>
                            </div>
                        </div>

                        <div className="pt-6">
                            <p className="text-sm text-gray-500 mb-4">Follow Me</p>
                            <div className="flex items-center gap-4">
                                <a href="https://github.com/Aadarshttech" target="_blank" rel="noopener noreferrer" className="p-3 bg-gray-900 text-white rounded-full hover:bg-primary transition-colors">
                                    <Github size={20} />
                                </a>
                                <a href="https://linkedin.com/in/aadarsh-pandit" target="_blank" rel="noopener noreferrer" className="p-3 bg-blue-700 text-white rounded-full hover:bg-primary transition-colors">
                                    <Linkedin size={20} />
                                </a>
                                <a href="https://www.instagram.com/aadarsh_pandit17/" target="_blank" rel="noopener noreferrer" className="p-3 bg-pink-600 text-white rounded-full hover:bg-primary transition-colors">
                                    <Instagram size={20} />
                                </a>
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="flex-1 bg-gray-50 rounded-3xl p-8"
                    >
                        <form ref={formRef} action={formAction} className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Name</label>
                                <input name="name" type="text" placeholder="Your Name" required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Email</label>
                                <input name="email" type="email" placeholder="email@example.com" required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Message</label>
                                <textarea name="message" placeholder="Tell me about your project..." rows={4} required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
                            </div>

                            <Button disabled={isPending} size="lg" className="w-full rounded-xl text-lg">
                                {isPending ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Sending...
                                    </>
                                ) : (
                                    "Send Message"
                                )}
                            </Button>

                            {state.message && (
                                <p className={`text-sm text-center ${state.success ? 'text-green-600' : 'text-red-500'}`}>
                                    {state.message}
                                </p>
                            )}
                        </form>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
