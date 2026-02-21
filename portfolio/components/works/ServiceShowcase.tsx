"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Smartphone, Brain, Zap, Layers, CheckCircle2, ArrowRight, Plus } from "lucide-react";

const services = [
    {
        id: "web",
        title: "Custom Websites & Web Apps",
        shortDesc: "High-performance, responsive web applications built with modern tools.",
        icon: <Globe className="w-8 h-8" />,
        watermark: <Globe className="w-64 h-64" />,
        gradient: "from-blue-500 to-cyan-400",
        shadow: "shadow-blue-500/20",
        borderGlow: "hover:border-blue-500/30",
        iconBg: "bg-blue-500/10 text-blue-400 border-blue-500/20",
        tags: ["Next.js", "React", "Tailwind", "TypeScript"],
        examples: "Interactive portfolios, SaaS dashboards, and landing pages",
        timeline: "2-4 weeks",
        features: [
            "Custom design tailored to your brand",
            "SEO-optimized architecture",
            "Blazing fast performance",
            "Mobile-first responsive layouts",
            "CMS integration for easy content updates"
        ]
    },
    {
        id: "ai",
        title: "Custom AI & ML Models",
        shortDesc: "Intelligent systems to automate tasks and extract insights from your data.",
        icon: <Brain className="w-8 h-8" />,
        watermark: <Brain className="w-64 h-64" />,
        gradient: "from-emerald-500 to-teal-400",
        shadow: "shadow-emerald-500/20",
        borderGlow: "hover:border-emerald-500/30",
        iconBg: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
        tags: ["Python", "TensorFlow", "OpenAI", "NLP"],
        examples: "Like my Nepali ASR System or Cricket Predictor",
        timeline: "4-8 weeks",
        features: [
            "Custom workflow automation",
            "Natural Language Processing (NLP)",
            "Predictive analytics and data visualization",
            "API integration with existing business tools",
            "Model training on your proprietary data"
        ]
    },
    {
        id: "mobile",
        title: "Mobile App Development",
        shortDesc: "Cross-platform mobile experiences that feel seamlessly native.",
        icon: <Smartphone className="w-8 h-8" />,
        watermark: <Smartphone className="w-64 h-64" />,
        gradient: "from-purple-500 to-pink-400",
        shadow: "shadow-purple-500/20",
        borderGlow: "hover:border-purple-500/30",
        iconBg: "bg-purple-500/10 text-purple-400 border-purple-500/20",
        tags: ["React Native", "Expo", "iOS", "Android"],
        examples: "E-commerce apps, social platforms, and utility tools",
        timeline: "4-10 weeks",
        features: [
            "One codebase for both iOS and Android",
            "Smooth, native-like animations",
            "Offline capabilities and local storage",
            "Push notifications integration",
            "App store deployment assistance"
        ]
    },
    {
        id: "wordpress",
        title: "WordPress / CMS Solutions",
        shortDesc: "Easy-to-manage, professional sites for businesses who need control.",
        icon: <Layers className="w-8 h-8" />,
        watermark: <Layers className="w-64 h-64" />,
        gradient: "from-rose-500 to-pink-400",
        shadow: "shadow-rose-500/20",
        borderGlow: "hover:border-rose-500/30",
        iconBg: "bg-rose-500/10 text-rose-400 border-rose-500/20",
        tags: ["WordPress", "Elementor", "WooCommerce", "SEO"],
        examples: "Corporate websites, blogs, and simple e-commerce",
        timeline: "1-3 weeks",
        features: [
            "Premium theme customization",
            "Essential plugin setup (SEO, Security)",
            "E-commerce integration (WooCommerce)",
            "Performance optimization (Caching, CDNs)",
            "Admin training handover session"
        ]
    },
    {
        id: "automation",
        title: "Workflow Automation",
        shortDesc: "Connecting your apps to save hours of manual data entry.",
        icon: <Zap className="w-8 h-8" />,
        watermark: <Zap className="w-64 h-64" />,
        gradient: "from-amber-500 to-yellow-400",
        shadow: "shadow-amber-500/20",
        borderGlow: "hover:border-amber-500/30",
        iconBg: "bg-amber-500/10 text-amber-500 border-amber-500/20",
        tags: ["Make", "Zapier", "Node.js", "APIs"],
        examples: "Connecting CRM, Email, and Spreadsheets automatically",
        timeline: "1-2 weeks",
        features: [
            "Zapier / Make (Integromat) setups",
            "Custom Python/Node.js scripts",
            "Automated reporting dashboards",
            "Lead generation pipelines",
            "Error handling and notifications"
        ]
    }
];

export function ServiceShowcase() {
    const [expandedId, setExpandedId] = useState<string | null>(null);

    return (
        <section id="services" className="py-28 bg-[#0A0A0A] relative">
            {/* Subtle background glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-600/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-6 max-w-5xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <span className="text-cyan-400 font-semibold tracking-wider uppercase text-sm">Services</span>
                    <h2 className="text-4xl md:text-5xl font-bold font-heading mt-3 text-white">
                        What Can I Build For <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">You?</span>
                    </h2>
                    <p className="text-gray-500 mt-5 max-w-2xl mx-auto text-lg">
                        Select a service below to see exactly what&apos;s included, timeline estimates, and features.
                    </p>
                </motion.div>

                <div className="space-y-6">
                    {services.map((service, index) => {
                        const isExpanded = expandedId === service.id;

                        return (
                            <motion.div
                                key={service.id}
                                initial={{ opacity: 0, y: 25 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.08 }}
                                viewport={{ once: true, margin: "-50px" }}
                                className={`group relative rounded-[2rem] overflow-hidden transition-all duration-500 ${isExpanded
                                    ? "bg-white/[0.04] border border-white/15 shadow-2xl"
                                    : "bg-white/[0.02] border border-white/5 hover:border-white/15"
                                    }`}
                            >
                                {/* Active Left Glowing Bar */}
                                <div className={`absolute top-0 left-0 bottom-0 w-1 transition-all duration-500 bg-gradient-to-b ${service.gradient} ${isExpanded ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`} />

                                {/* Giant Faded Watermark Icon */}
                                <div className={`absolute -right-8 -bottom-8 opacity-[0.03] text-white transition-transform duration-700 pointer-events-none ${isExpanded ? "scale-110 rotate-12" : "group-hover:scale-110 group-hover:rotate-12"}`}>
                                    {service.watermark}
                                </div>

                                {/* Header */}
                                <motion.div
                                    className="p-6 md:p-10 cursor-pointer flex flex-col md:flex-row md:items-start md:items-center gap-6 relative z-10"
                                    onClick={() => setExpandedId(isExpanded ? null : service.id)}
                                >
                                    <div className={`p-4 rounded-2xl border ${service.iconBg} shrink-0 transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg ${isExpanded ? `shadow-lg ${service.shadow}` : ''}`}>
                                        {service.icon}
                                    </div>

                                    <div className="flex-grow">
                                        <h3 className="text-2xl font-bold font-heading text-white mb-2">{service.title}</h3>
                                        <p className="text-gray-400 mb-4 text-sm md:text-base leading-relaxed max-w-xl">{service.shortDesc}</p>

                                        {/* Tech Tags */}
                                        <div className="flex flex-wrap gap-2">
                                            {service.tags.map((tag, i) => (
                                                <span key={i} className="px-3 py-1 bg-white/[0.05] border border-white/10 rounded-full text-xs font-medium text-gray-300">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="shrink-0 flex items-center gap-3 md:ml-auto mt-4 md:mt-0">
                                        <span className={`text-sm font-semibold transition-colors duration-300 ${isExpanded ? "text-white" : "text-gray-500 group-hover:text-gray-300"}`}>
                                            {isExpanded ? "Close" : "View Details"}
                                        </span>
                                        <motion.div
                                            animate={{ rotate: isExpanded ? 135 : 0 }}
                                            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                                            className={`p-3 rounded-full transition-all duration-300 ${isExpanded ? 'bg-gradient-to-br ' + service.gradient + ' text-white shadow-lg' : 'bg-white/5 border border-white/10 text-gray-400 group-hover:bg-white/10 group-hover:text-white'}`}
                                        >
                                            <Plus size={20} strokeWidth={2.5} />
                                        </motion.div>
                                    </div>
                                </motion.div>

                                {/* Expanded Content */}
                                <AnimatePresence>
                                    {isExpanded && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                            className="overflow-hidden relative z-10"
                                        >
                                            <div className="p-6 md:p-10 pt-0 ml-0 md:ml-24">
                                                <div className="grid lg:grid-cols-2 gap-10 pt-8 border-t border-white/10">
                                                    {/* Features */}
                                                    <div>
                                                        <h4 className="font-semibold text-white mb-5 text-lg flex items-center gap-2">
                                                            <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${service.gradient}`} />
                                                            What&apos;s Included
                                                        </h4>
                                                        <ul className="space-y-4">
                                                            {service.features.map((feature, i) => (
                                                                <motion.li
                                                                    key={i}
                                                                    initial={{ opacity: 0, x: -15 }}
                                                                    animate={{ opacity: 1, x: 0 }}
                                                                    transition={{ delay: i * 0.08 }}
                                                                    className="flex items-start gap-3 text-gray-300"
                                                                >
                                                                    <CheckCircle2 className={`w-5 h-5 shrink-0 mt-0.5 text-white/40`} />
                                                                    <span>{feature}</span>
                                                                </motion.li>
                                                            ))}
                                                        </ul>
                                                    </div>

                                                    {/* Details Card */}
                                                    <div className="bg-[#050505]/50 border border-white/5 p-8 rounded-[1.5rem] flex flex-col h-full relative overflow-hidden backdrop-blur-xl">
                                                        {/* Subtle inner glow */}
                                                        <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${service.gradient} opacity-5 blur-2xl rounded-full`} />

                                                        <div className="space-y-6 mb-8 flex-grow relative z-10">
                                                            <div>
                                                                <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold block mb-2">Ideal For</span>
                                                                <p className="font-medium text-gray-200">{service.examples}</p>
                                                            </div>
                                                            <div>
                                                                <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold block mb-2">Estimated Timeline</span>
                                                                <p className="font-medium text-gray-200 flex items-center gap-2">
                                                                    {service.timeline}
                                                                </p>
                                                            </div>
                                                        </div>

                                                        <motion.button
                                                            whileHover={{ scale: 1.02, y: -2 }}
                                                            whileTap={{ scale: 0.98 }}
                                                            className={`w-full py-4 rounded-xl text-white font-semibold bg-gradient-to-r ${service.gradient} flex items-center justify-center gap-2 group transition-all duration-300 shadow-xl ${service.shadow}`}
                                                            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                                                        >
                                                            Get Started <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                                        </motion.button>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
