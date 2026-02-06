"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { Brain, Globe, BarChart3, Smartphone, ArrowRight, Layers } from "lucide-react";

// Service Data
const servicesData = [
    {
        id: 1,
        title: "AI & Machine Learning",
        description: "Developing intelligent models using PyTorch & TensorFlow. Specializing in NLP, ASR, and LLM fine-tuning for real-world applications.",
        icon: <Brain size={48} className="text-white" />,
        gradient: "from-orange-500 to-amber-500",
        shadow: "shadow-orange-500/30",
        bgImage: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: 2,
        title: "Full Stack Web Dev",
        description: "Building responsive, modern web applications with Next.js, React, and FastAPI. Focusing on clean architecture and performance.",
        icon: <Globe size={48} className="text-white" />,
        gradient: "from-blue-600 to-cyan-500",
        shadow: "shadow-blue-500/30",
        bgImage: "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: 3,
        title: "Data Analytics",
        description: "Transforming raw numbers into actionable insights using Pandas, NumPy, and PowerBI. Visualizing patterns that drive strategic decisions.",
        icon: <BarChart3 size={48} className="text-white" />,
        gradient: "from-emerald-500 to-teal-500",
        shadow: "shadow-emerald-500/30",
        bgImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: 4,
        title: "Mobile App Dev",
        description: "Creating seamless mobile experiences with React Native. Cross-platform excellence with native performance feel.",
        icon: <Smartphone size={48} className="text-white" />,
        gradient: "from-violet-600 to-purple-500",
        shadow: "shadow-purple-500/30",
        bgImage: "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?q=80&w=800&auto=format&fit=crop"
    }
];

export function Services() {
    const [cards, setCards] = useState(servicesData);

    // Move the front card to the back
    const moveToEnd = (fromIndex: number) => {
        setCards((prevCards) => {
            const newCards = [...prevCards];
            const movedCard = newCards.splice(fromIndex, 1)[0];
            newCards.push(movedCard);
            return newCards;
        });
    };

    return (
        <section id="services" className="py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] bg-orange-200/20 rounded-full blur-[100px]" />
                <div className="absolute bottom-[10%] right-[-10%] w-[500px] h-[500px] bg-blue-200/20 rounded-full blur-[100px]" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[600px]">

                    {/* LEFT: Text Content */}
                    <div className="space-y-8">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <span className="text-primary font-bold tracking-widest uppercase text-sm bg-primary/10 px-4 py-2 rounded-full inline-flex items-center gap-2">
                                <Layers size={14} /> My Expertise
                            </span>
                            <h2 className="text-4xl md:text-6xl font-black font-heading mt-6 leading-tight">
                                Services That <br />
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-amber-500">
                                    Drive Impact
                                </span>
                            </h2>
                            <p className="text-lg text-gray-600 mt-6 max-w-lg leading-relaxed">
                                I combine technical precision with creative problem-solving.
                                Whether it's training AI models or building scalable web apps,
                                I deliver solutions that matter.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                            className="flex gap-4"
                        >
                            <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
                                <div className="w-12 h-1 bg-gray-200 rounded-full overflow-hidden">
                                    <div className="w-1/2 h-full bg-primary animate-pulse" />
                                </div>
                                <span>Click cards to swap</span>
                            </div>
                        </motion.div>
                    </div>

                    {/* RIGHT: Card Stack */}
                    <div className="relative h-[500px] w-full max-w-[400px] mx-auto lg:ml-auto perspective-1000">
                        {cards.map((service, index) => {
                            // Calculate stack position styles
                            const canDrag = index === 0;

                            return (
                                <motion.div
                                    key={service.id}
                                    layoutId={`card-${service.id}`}
                                    onClick={() => canDrag && moveToEnd(index)}
                                    className={`absolute top-0 left-0 w-full h-[480px] rounded-[2rem] p-8 flex flex-col justify-between cursor-pointer border border-white/20 backdrop-blur-md overflow-hidden ${service.shadow}`}
                                    style={{
                                        zIndex: cards.length - index,
                                    }}
                                    initial={false}
                                    animate={{
                                        scale: 1 - index * 0.06, // Stack effect: size decrease
                                        y: index * 40,          // Stack effect: vertical offset
                                        opacity: 1 - index * 0.2, // Stack effect: fade out back cards
                                        rotate: index * 2,       // Stack effect: slight rotation
                                    }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 200,
                                        damping: 20
                                    }}
                                    whileHover={index === 0 ? { y: -10 } : {}}
                                >
                                    {/* Card Background Gradient & Image Overlay */}
                                    <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-90`} />
                                    <div
                                        className="absolute inset-0 opacity-20 mix-blend-overlay"
                                        style={{
                                            backgroundImage: `url(${service.bgImage})`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center'
                                        }}
                                    />

                                    {/* Content */}
                                    <div className="relative z-10">
                                        <div className="bg-white/20 w-16 h-16 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/30 mb-6">
                                            {service.icon}
                                        </div>
                                        <h3 className="text-3xl font-bold text-white font-heading mb-3">{service.title}</h3>
                                    </div>

                                    <div className="relative z-10 w-full">
                                        <p className="text-white/90 text-lg leading-relaxed mb-6 font-light">
                                            {service.description}
                                        </p>
                                        <div className="flex items-center justify-between border-t border-white/30 pt-4">
                                            <span className="text-white font-medium uppercase tracking-wider text-sm">Explore</span>
                                            <div className="bg-white text-gray-900 rounded-full p-2">
                                                <ArrowRight size={20} />
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                </div>
            </div>
        </section>
    );
}
