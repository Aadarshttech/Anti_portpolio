"use client";

import { motion } from "framer-motion";

export function About() {
    return (
        <section id="about" className="py-20 bg-white">
            <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                >
                    <div className="relative">
                        <div className="absolute top-0 left-0 w-20 h-20 bg-orange-100 rounded-tl-3xl -z-10" />
                        <div className="absolute bottom-0 right-0 w-20 h-20 bg-blue-100 rounded-br-3xl -z-10" />
                        <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 relative z-10">
                            <motion.h3
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                className="text-2xl font-bold font-heading mb-4 text-gray-900"
                            > Personal Details
                            </motion.h3>
                            <ul className="space-y-4">
                                <motion.li initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-200 pb-2">
                                    <span className="text-gray-500 font-medium">Name</span>
                                    <span className="text-gray-900 font-semibold">Aadarsh Pandit</span>
                                </motion.li>
                                <motion.li initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-200 pb-2">
                                    <span className="text-gray-500 font-medium">Education</span>
                                    <span className="text-gray-900 font-semibold">BTech AI (Kathmandu University)</span>
                                </motion.li>
                                <motion.li initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.4 }} className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-200 pb-2">
                                    <span className="text-gray-500 font-medium">Email</span>
                                    <span className="text-gray-900 font-semibold">aadarshapandit@gmail.com</span>
                                </motion.li>
                                <motion.li initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.5 }} className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-200 pb-2">
                                    <span className="text-gray-500 font-medium">Location</span>
                                    <span className="text-gray-900 font-semibold">Kathmandu, Nepal</span>
                                </motion.li>
                            </ul>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                >
                    <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-primary font-semibold tracking-wider uppercase text-sm">About Me</motion.span>
                    <motion.h2 initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-3xl md:text-4xl font-bold font-heading mt-2 mb-6">Building intelligent systems for the future</motion.h2>
                    <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-gray-600 leading-relaxed mb-6">
                        I am an AI & Web Development enthusiast currently pursuing BTech in Artificial Intelligence at Kathmandu University.
                        My specialization lies in building practical AI solutions with a focus on Machine Learning, Natural Language Processing (NLP), and Automatic Speech Recognition (ASR).
                    </motion.p>
                    <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="text-gray-600 leading-relaxed">
                        I am passionate about creating intelligent systems that bridge the gap between cutting-edge AI research and real-world applications,
                        particularly for low-resource languages like Nepali. With over 10+ projects completed and 3 major AI systems built, I strive to solve meaningful problems through code.
                    </motion.p>

                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="grid grid-cols-3 gap-6 mt-8">
                        <div className="text-center">
                            <h4 className="text-3xl font-bold text-primary font-heading">1+</h4>
                            <span className="text-sm text-gray-500">Years Experience</span>
                        </div>
                        <div className="text-center">
                            <h4 className="text-3xl font-bold text-primary font-heading">10+</h4>
                            <span className="text-sm text-gray-500">Projects Done</span>
                        </div>
                        <div className="text-center">
                            <h4 className="text-3xl font-bold text-primary font-heading">3</h4>
                            <span className="text-sm text-gray-500">Major Systems</span>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
