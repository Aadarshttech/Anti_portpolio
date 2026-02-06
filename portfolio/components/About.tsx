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
                            <h3 className="text-2xl font-bold font-heading mb-4 text-gray-900">Personal Details</h3>
                            <ul className="space-y-4">
                                <li className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-200 pb-2">
                                    <span className="text-gray-500 font-medium">Name</span>
                                    <span className="text-gray-900 font-semibold">Aadarsh Pandit</span>
                                </li>
                                <li className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-200 pb-2">
                                    <span className="text-gray-500 font-medium">Education</span>
                                    <span className="text-gray-900 font-semibold">BTech AI (Kathmandu University)</span>
                                </li>
                                <li className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-200 pb-2">
                                    <span className="text-gray-500 font-medium">Email</span>
                                    <span className="text-gray-900 font-semibold">aadarshapandit@gmail.com</span>
                                </li>
                                <li className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-200 pb-2">
                                    <span className="text-gray-500 font-medium">Location</span>
                                    <span className="text-gray-900 font-semibold">Kathmandu, Nepal</span>
                                </li>
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
                    <span className="text-primary font-semibold tracking-wider uppercase text-sm">About Me</span>
                    <h2 className="text-3xl md:text-4xl font-bold font-heading mt-2 mb-6">Building intelligent systems for the future</h2>
                    <p className="text-gray-600 leading-relaxed mb-6">
                        I am an AI & Web Development enthusiast currently pursuing BTech in Artificial Intelligence at Kathmandu University.
                        My specialization lies in building practical AI solutions with a focus on Machine Learning, Natural Language Processing (NLP), and Automatic Speech Recognition (ASR).
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                        I am passionate about creating intelligent systems that bridge the gap between cutting-edge AI research and real-world applications,
                        particularly for low-resource languages like Nepali. With over 10+ projects completed and 3 major AI systems built, I strive to solve meaningful problems through code.
                    </p>

                    <div className="grid grid-cols-3 gap-6 mt-8">
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
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
