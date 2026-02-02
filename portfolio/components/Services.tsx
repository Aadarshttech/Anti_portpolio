"use client";

import { motion } from "framer-motion";
import { Brain, Globe, BarChart3, ArrowUpRight } from "lucide-react";

const services = [
    {
        icon: <Brain size={40} className="text-orange-500" />,
        title: "AI/ML Development",
        description: "Developing intelligent models using PyTorch & TensorFlow. Specializing in NLP, ASR, and LLM fine-tuning for real-world applications.",
        color: "bg-orange-50 hover:bg-orange-100",
        border: "border-orange-100"
    },
    {
        icon: <Globe size={40} className="text-blue-500" />,
        title: "Web Development",
        description: "Building responsive, modern web applications with Next.js, React, and FastAPI. Full-stack solutions with clean architecture.",
        color: "bg-blue-50 hover:bg-blue-100",
        border: "border-blue-100"
    },
    {
        icon: <BarChart3 size={40} className="text-green-500" />,
        title: "Data Analysis",
        description: "Transforming raw data into actionable insights using Pandas, NumPy, and PowerBI. Visualizing patterns that drive decisions.",
        color: "bg-green-50 hover:bg-green-100",
        border: "border-green-100"
    },
];

export function Services() {
    return (
        <section id="services" className="py-20 bg-white relative overflow-hidden">
            {/* Background Decorative */}
            <div className="absolute top-1/2 left-0 w-full h-[500px] bg-gradient-to-r from-orange-50/50 to-blue-50/50 -skew-y-6 z-0" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <span className="text-primary font-semibold tracking-wider uppercase text-sm">What I Do</span>
                    <h2 className="text-3xl md:text-4xl font-bold font-heading mt-2">My Awesome Services</h2>
                    <p className="text-gray-600 mt-4">
                        Combining technical expertise with creative problem-solving to deliver exceptional results in AI and Web Development.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2 }}
                            viewport={{ once: true }}
                            className={`p-8 rounded-3xl border ${service.border} ${service.color} transition-colors duration-300 group cursor-pointer`}
                        >
                            <div className="mb-6 bg-white p-4 rounded-2xl w-fit shadow-sm group-hover:scale-110 transition-transform duration-300">
                                {service.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-3 font-heading">{service.title}</h3>
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                {service.description}
                            </p>
                            <div className="flex items-center gap-2 text-primary font-medium opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300">
                                Learn More <ArrowUpRight size={16} />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
