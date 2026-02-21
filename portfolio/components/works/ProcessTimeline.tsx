"use client";

import { motion } from "framer-motion";
import { PhoneCall, FileText, LayoutTemplate, Code2, Rocket, HeartHandshake } from "lucide-react";

const steps = [
    {
        title: "Discovery Call",
        description: "We discuss your goals, target audience, and current challenges to ensure we're a good fit.",
        icon: <PhoneCall className="w-6 h-6" />,
        color: "text-blue-400",
        bg: "bg-blue-500/10",
        border: "border-blue-500/20",
        duration: "Free | 30 mins"
    },
    {
        title: "Proposal & Strategy",
        description: "I provide a detailed project roadmap, technical approach, timeline, and exact pricing.",
        icon: <FileText className="w-6 h-6" />,
        color: "text-sky-400",
        bg: "bg-sky-500/10",
        border: "border-sky-500/20",
        duration: "1-2 Days"
    },
    {
        title: "Design & Prototype",
        description: "You get wireframes and visual designs to approve before a single line of code is written.",
        icon: <LayoutTemplate className="w-6 h-6" />,
        color: "text-purple-400",
        bg: "bg-purple-500/10",
        border: "border-purple-500/20",
        duration: "Week 1-2"
    },
    {
        title: "Development",
        description: "I build your solution using modern, scalable tech. You get weekly progress updates and staging links.",
        icon: <Code2 className="w-6 h-6" />,
        color: "text-emerald-400",
        bg: "bg-emerald-500/10",
        border: "border-emerald-500/20",
        duration: "Varies"
    },
    {
        title: "Testing & Launch",
        description: "Thorough QA testing across devices/browsers, followed by a smooth deployment to production.",
        icon: <Rocket className="w-6 h-6" />,
        color: "text-rose-400",
        bg: "bg-rose-500/10",
        border: "border-rose-500/20",
        duration: "Final Week"
    },
    {
        title: "Support & Handoff",
        description: "Training on how to use your new system, plus 30 days of free bug-fix support.",
        icon: <HeartHandshake className="w-6 h-6" />,
        color: "text-teal-400",
        bg: "bg-teal-500/10",
        border: "border-teal-500/20",
        duration: "30 Days post-launch"
    }
];

export function ProcessTimeline() {
    return (
        <section id="process" className="py-28 bg-[#0A0A0A] relative">
            {/* Glow */}
            <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-indigo-600/5 rounded-full blur-[150px] pointer-events-none -translate-y-1/2" />

            <div className="container mx-auto px-6 max-w-6xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <span className="text-cyan-400 font-semibold tracking-wider uppercase text-sm">How I Work</span>
                    <h2 className="text-4xl md:text-5xl font-bold font-heading mt-3 text-white">
                        The{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Process</span>
                    </h2>
                    <p className="text-gray-500 mt-5 max-w-2xl mx-auto text-lg">
                        A structured approach to guarantee your project is delivered on time, on budget, and exactly as promised.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.08 }}
                            viewport={{ once: true, margin: "-50px" }}
                            whileHover={{ y: -8, borderColor: "rgba(255,255,255,0.1)" }}
                            className={`relative p-8 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm transition-all duration-500 group overflow-hidden`}
                        >
                            {/* Sweeping reflection effect on hover */}
                            <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 z-0 pointer-events-none" />

                            {/* Step Number */}
                            <div className="absolute top-6 right-6 text-5xl font-black text-white/[0.03] font-heading select-none pointer-events-none z-0">
                                0{index + 1}
                            </div>

                            {/* Icon */}
                            <div className={`w-14 h-14 rounded-2xl ${step.bg} ${step.color} flex items-center justify-center mb-6 border ${step.border} group-hover:scale-110 transition-transform duration-300`}>
                                {step.icon}
                            </div>

                            <h4 className="text-xl font-bold font-heading text-white mb-3">{step.title}</h4>
                            <p className="text-gray-500 text-sm leading-relaxed mb-4">
                                {step.description}
                            </p>
                            <span className={`text-xs font-semibold ${step.color} ${step.bg} px-3 py-1.5 rounded-full border ${step.border}`}>
                                ⏱ {step.duration}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
