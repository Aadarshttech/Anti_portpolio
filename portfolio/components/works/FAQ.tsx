"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, MessageCircleQuestion } from "lucide-react";

const faqs = [
    {
        question: "How long does a typical project take?",
        answer: "A standard corporate website or landing page typically takes 2-4 weeks from start to finish. More complex applications, like custom Next.js platforms or Machine Learning integrations, usually take 4-8 weeks. I'll provide an exact timeline during our discovery call."
    },
    {
        question: "How much do your services cost?",
        answer: "Every project is unique, but simple websites generally start around $200-$400. Custom web applications and mobile apps start at $600. I charge based on the value delivered, not hourly, so you'll always know the exact cost before we sign a contract."
    },
    {
        question: "Do you offer maintenance after launch?",
        answer: "Yes! Every project includes 30 days of free bug-fix support after launch. After that, I offer affordable monthly retainers for ongoing maintenance, CMS updates, hosting management, and minor feature additions."
    },
    {
        question: "Will I have access to the code while you build?",
        answer: "Absolutely. I use a secure, private GitHub repository for development. You'll have read access to see the progress, and I provide weekly staging links so you can click around and test the application as it's being built."
    },
    {
        question: "What tech stack do you use?",
        answer: "For web development, I primarily use Next.js, React, TailwindCSS, and TypeScript. For backend and AI, I use Python, FastAPI, PyTorch, and TensorFlow. For mobile, I use React Native. I choose the best tool for your specific business needs."
    },
    {
        question: "How do we get started?",
        answer: "Fill out the inquiry form below with a brief description of what you're looking for. I'll review it and reach out within 24 hours to schedule a free 30-minute discovery call to discuss your goals in detail."
    }
];

export function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section id="faq" className="py-28 bg-[#0B0F19] relative">
            <div className="absolute top-0 right-0 w-[500px] h-[400px] bg-cyan-500/5 rounded-full blur-[130px] pointer-events-none" />

            <div className="container mx-auto px-6 max-w-4xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <div className="flex justify-center mb-5">
                        <div className="p-3.5 bg-indigo-500/10 text-indigo-400 rounded-2xl border border-indigo-500/20">
                            <MessageCircleQuestion size={28} />
                        </div>
                    </div>
                    <span className="text-indigo-400 font-semibold tracking-wider uppercase text-sm">Common Questions</span>
                    <h2 className="text-4xl md:text-5xl font-bold font-heading mt-3 text-white">
                        Freelance{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">FAQ</span>
                    </h2>
                    <p className="text-gray-500 mt-5 text-lg">
                        Everything you need to know about working with me.
                    </p>
                </motion.div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => {
                        const isOpen = openIndex === index;

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: index * 0.05 }}
                                viewport={{ once: true }}
                                className={`group border rounded-2xl overflow-hidden transition-all duration-500 ${isOpen
                                    ? "border-indigo-500/30 bg-indigo-500/5 shadow-lg shadow-indigo-500/5"
                                    : "border-white/5 bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.03]"
                                    }`}
                            >
                                <button
                                    onClick={() => toggleFAQ(index)}
                                    className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
                                >
                                    <span className={`text-lg font-semibold pr-8 transition-colors duration-300 ${isOpen ? "text-indigo-400" : "text-white group-hover:text-indigo-300"}`}>
                                        {faq.question}
                                    </span>
                                    <motion.div
                                        animate={{ rotate: isOpen ? 45 : 0 }}
                                        transition={{ duration: 0.2 }}
                                        className={`shrink-0 p-2 rounded-full transition-colors duration-300 ${isOpen ? "bg-indigo-500/20 text-indigo-400" : "bg-white/5 text-gray-500"
                                            }`}
                                    >
                                        <Plus size={20} />
                                    </motion.div>
                                </button>

                                <AnimatePresence>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                                        >
                                            <div className="px-6 pb-6 pt-0 text-gray-400 leading-relaxed">
                                                {faq.answer}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="mt-14 text-center p-10 rounded-3xl border border-white/5 bg-white/[0.02]"
                >
                    <h4 className="text-xl font-bold font-heading text-white mb-2">Still have questions?</h4>
                    <p className="text-gray-500 mb-6">I&apos;m happy to answer any specific questions about your project.</p>
                    <motion.button
                        whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(99,102,241,0.2)" }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                        className="px-8 py-3 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg shadow-indigo-500/20"
                    >
                        Reach Out Directly
                    </motion.button>
                </motion.div>
            </div>
        </section>
    );
}
