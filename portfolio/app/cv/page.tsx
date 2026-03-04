"use client";

import { MapPin, Mail, Phone, ExternalLink, Github, Linkedin, Printer } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export default function CVPage() {

    // Hide global navbars and chatbots for a pristine CV view
    useEffect(() => {
        const style = document.createElement("style");
        style.innerHTML = `
            /* Hide global site elements on the CV page */
            header, footer, nav, .fixed { display: none !important; }
            /* Exception for our print button, keep it visible until printing */
            .print-btn-container { display: flex !important; position: fixed !important; top: 1.5rem; right: 1.5rem; z-index: 50; }
            
            @media print {
                @page { margin: 0; size: A4 portrait; }
                body { background: white !important; margin: 0 !important; padding: 0 !important; }
                .no-print { display: none !important; }
                .cv-sheet { 
                    box-shadow: none !important; 
                    margin: 0 !important; 
                    padding: 8mm 12mm !important; 
                    width: 100% !important; 
                    max-width: 100% !important; 
                    border: none !important; 
                    min-height: auto !important;
                }
            }
        `;
        document.head.appendChild(style);
        return () => { document.head.removeChild(style); };
    }, []);

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="min-h-screen bg-neutral-100 py-12 px-4 font-['Inter',sans-serif] selection:bg-black selection:text-white">

            {/* Download / Print Button */}
            <div className="print-btn-container no-print gap-3">
                <Link href="/" className="bg-white text-black px-4 py-2 rounded-full font-medium text-sm shadow-md hover:bg-gray-50 border border-gray-200 transition-colors flex items-center gap-2">
                    Back to Portfolio
                </Link>
                <button
                    onClick={handlePrint}
                    className="bg-black text-white px-5 py-2 rounded-full font-medium text-sm shadow-xl hover:bg-gray-800 transition-colors flex items-center gap-2"
                >
                    <Printer size={16} /> Save as PDF
                </button>
            </div>

            {/* A4 Sheet Container */}
            <div className="cv-sheet max-w-[21cm] min-h-[29.7cm] bg-white mx-auto shadow-2xl border border-gray-200 p-[1.5cm] md:p-[2cm] text-gray-900 rounded-sm">

                {/* Header */}
                <header className="border-b border-gray-300 pb-6 mb-6">
                    <h1 className="text-4xl font-extrabold tracking-tight mb-2 text-black uppercase font-['Outfit',sans-serif]">Aadarsh Pandit</h1>
                    <h2 className="text-xl text-gray-600 font-medium mb-4">AI & Full-Stack Web Developer</h2>

                    <div className="flex flex-wrap gap-y-2 gap-x-6 text-sm text-gray-600">
                        <span className="flex items-center gap-1.5"><Mail size={14} /> aadarshapandit@gmail.com</span>
                        <span className="flex items-center gap-1.5"><Phone size={14} /> +977 9860334317</span>
                        <span className="flex items-center gap-1.5"><MapPin size={14} /> Kathmandu, Nepal</span>
                        <a href="https://linkedin.com/in/aadarsh-pandit" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-black transition-colors"><Linkedin size={14} /> linkedin.com/in/aadarsh-pandit</a>
                        <a href="https://github.com/Aadarshttech" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-black transition-colors"><Github size={14} /> github.com/Aadarshttech</a>
                    </div>
                </header>

                {/* Profile */}
                <section className="mb-6">
                    <h3 className="text-sm font-bold tracking-widest uppercase text-black mb-3 border-l-2 border-black pl-3">Professional Summary</h3>
                    <p className="text-sm leading-relaxed text-gray-700">
                        Results-driven AI & Full-Stack Web Developer combining machine learning precision with premium front-end architectural design. Specialized in NLP, predictive modeling, and building high-performance, SEO-optimized web applications using Next.js. Experienced in delivering full-stack solutions with top-tier UI/UX, cinematic framer animations, and complex data infrastructures.
                    </p>
                </section>

                {/* Skills */}
                <section className="mb-6">
                    <h3 className="text-sm font-bold tracking-widest uppercase text-black mb-3 border-l-2 border-black pl-3">Technical Skills</h3>
                    <div className="grid grid-cols-[140px_1fr] gap-y-2 text-sm">
                        <span className="font-semibold text-gray-800">Languages:</span>
                        <span className="text-gray-700">Python, TypeScript, JavaScript, HTML5/CSS3</span>

                        <span className="font-semibold text-gray-800">AI & Machine Learning:</span>
                        <span className="text-gray-700">PyTorch, TensorFlow, Scikit-learn, OpenAI Whisper, NLP, RLHF, Random Forest</span>

                        <span className="font-semibold text-gray-800">Web & Mobile:</span>
                        <span className="text-gray-700">React, Next.js, React Native, Tailwind CSS, Framer Motion, Node.js, FastAPI</span>

                        <span className="font-semibold text-gray-800">Tools & Ops:</span>
                        <span className="text-gray-700">Git, Vercel, Figma, ffmpeg (Asset Optimization), Make/Zapier</span>
                    </div>
                </section>

                {/* Experience */}
                <section className="mb-6">
                    <h3 className="text-sm font-bold tracking-widest uppercase text-black mb-4 border-l-2 border-black pl-3">Key Projects & Experience</h3>

                    <div className="space-y-5">
                        {/* Project 1 */}
                        <div>
                            <div className="flex justify-between items-baseline mb-1">
                                <h4 className="text-sm font-bold text-black flex items-center gap-2">
                                    Nepali ASR System <span className="text-xs font-normal text-white bg-black px-2 py-0.5 rounded-full">AI/Research</span>
                                </h4>
                            </div>
                            <p className="text-sm text-gray-700 leading-relaxed">
                                Developed a highly accurate speech-to-text pipeline for the low-resource Nepali language using OpenAI Whisper. Processed a custom dataset of 50k+ audio pairs and implemented Reward-Guided Fine-Tuning (RLHF) and Proximal Policy Optimization (PPO) to significantly push transcription accuracy.
                            </p>
                        </div>

                        {/* Project 2 */}
                        <div>
                            <div className="flex justify-between items-baseline mb-1">
                                <h4 className="text-sm font-bold text-black flex items-center gap-2">
                                    Aadarsh Travels — Cinematic Web Experience <a href="https://aadarshapandit.com.np/projects/nepal" target="_blank" className="text-gray-400 hover:text-black no-print"><ExternalLink size={12} /></a>
                                </h4>
                            </div>
                            <p className="text-sm text-gray-700 leading-relaxed">
                                Architected a luxury, high-performance web experience leveraging Next.js and HTML5 Canvas API. Engineered a custom scroll-synced 4K WebP frame animation system (253 frames), conditionally rendering 960x540 mobile assets to reduce payload by 83%. Implemented robust JSON-LD structured data and Open Graph SEO.
                            </p>
                        </div>

                        {/* Project 3 */}
                        <div>
                            <div className="flex justify-between items-baseline mb-1">
                                <h4 className="text-sm font-bold text-black flex items-center gap-2">
                                    Mango Pandit Beverages <a href="https://aadarshapandit.com.np/projects/beverages" target="_blank" className="text-gray-400 hover:text-black no-print"><ExternalLink size={12} /></a>
                                </h4>
                            </div>
                            <p className="text-sm text-gray-700 leading-relaxed">
                                Built an Awwwards-inspired scrollytelling e-commerce product page. Developed dark-mode logic, complex UI state management (cart, toast notifications), and premium GSAP/Framer Motion micro-interactions synced to a 194-frame canvas sequence.
                            </p>
                        </div>

                        {/* Project 4 */}
                        <div>
                            <div className="flex justify-between items-baseline mb-1">
                                <h4 className="text-sm font-bold text-black flex items-center gap-2">
                                    Nepal Cricket Match Predictor <a href="https://aadarshapandit.com.np/nepal-cricket/index.html" target="_blank" className="text-gray-400 hover:text-black no-print"><ExternalLink size={12} /></a>
                                </h4>
                            </div>
                            <p className="text-sm text-gray-700 leading-relaxed">
                                Engineered a real-time web dashboard using a Python FastAPI backend and React frontend. Trained and deployed a Random Forest classification model using Scikit-learn to predict match outcomes based on toss, venue, and opposition statistics.
                            </p>
                        </div>

                        {/* Project 5 */}
                        <div>
                            <div className="flex justify-between items-baseline mb-1">
                                <h4 className="text-sm font-bold text-black flex items-center gap-2">
                                    Karyantra Hive Corporate Website <a href="https://karyantrahive.com.np/" target="_blank" className="text-gray-400 hover:text-black no-print"><ExternalLink size={12} /></a>
                                </h4>
                            </div>
                            <p className="text-sm text-gray-700 leading-relaxed">
                                Freelance web developer for Karyantra. Designed and coded a highly responsive, performance-optimized corporate architecture using React and Tailwind CSS, integrating custom CMS solutions.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Education */}
                <section>
                    <h3 className="text-sm font-bold tracking-widest uppercase text-black mb-3 border-l-2 border-black pl-3">Education</h3>
                    <div className="flex justify-between items-start">
                        <div>
                            <h4 className="text-sm font-bold text-gray-900">Kathmandu University</h4>
                            <p className="text-sm text-gray-700">BTech in Artificial Intelligence</p>
                        </div>
                        <div className="text-right">
                            <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">Expected Graduation</span>
                            <p className="text-xs text-gray-500 mt-1">Kathmandu, Nepal</p>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
}
