"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Printer, Phone, Mail, MapPin, Globe, Github, Linkedin } from "lucide-react";

export default function ResumesPage() {

    useEffect(() => {
        const style = document.createElement("style");
        style.innerHTML = `
            header, footer, nav, .fixed { display: none !important; }
            .print-btn-container { display: flex !important; position: fixed !important; top: 1.5rem; right: 1.5rem; z-index: 50; }
            
            .ribbon {
                position: relative;
                width: calc(100% + 15px);
                background-color: #1a4a8c;
                color: white;
                padding: 10px 20px;
                font-weight: bold;
                letter-spacing: 0.05em;
                margin-left: -15px;
                margin-bottom: 20px;
                page-break-inside: avoid;
            }
            .ribbon::after {
                content: '';
                position: absolute;
                top: 100%;
                right: 0;
                border-width: 15px 15px 0 0;
                border-style: solid;
                border-color: #0f2c54 transparent transparent transparent;
            }
            .ribbon::before {
                content: '';
                position: absolute;
                top: 0;
                bottom: 0;
                right: -15px;
                width: 15px;
                background-color: #1a4a8c;
                clip-path: polygon(0 0, 100% 0, 0 100%);
            }
            
            /* Multi-page Print optimizations */
            @media print {
                @page { margin: 0.8cm 0; size: A4 portrait; }
                body { 
                    -webkit-print-color-adjust: exact !important; 
                    print-color-adjust: exact !important; 
                    background: white !important; 
                    margin: 0 !important; 
                    padding: 0 !important; 
                }
                .no-print { display: none !important; }
                
                .print-container {
                     background: white !important;
                     padding: 0 !important;
                     margin: 0 !important;
                     width: 100% !important;
                }
                
                .cv-sheet { 
                    box-shadow: none !important; 
                    margin: 0 !important; 
                    padding: 0 !important;
                    width: 100% !important; 
                    max-width: 100% !important;
                    min-height: 29.7cm !important;
                    border: none !important; 
                    border-radius: 0 !important;
                    background: linear-gradient(to right, #eef2f6 0%, #eef2f6 33%, white 33%, white 100%) !important;
                    display: flex !important;
                    flex-direction: row !important;
                }

                
                .timeline-item, .skill-block {
                    page-break-inside: avoid;
                }
                
                .ribbon {
                    page-break-after: avoid;
                }
            }
        `;
        document.head.appendChild(style);
        return () => { document.head.removeChild(style); };
    }, []);

    const handlePrint = () => window.print();

    return (
        <div className="print-container min-h-screen bg-neutral-200 py-12 px-4 font-['Inter',sans-serif] selection:bg-[#1a4a8c] selection:text-white flex justify-center items-start overflow-x-hidden">


            <div className="print-btn-container no-print gap-3">
                <Link href="/" className="bg-white text-black px-4 py-2 rounded-full font-medium text-sm shadow-md hover:bg-gray-50 border border-gray-200 transition-colors flex items-center gap-2">
                    Back to Portfolio
                </Link>
                <button onClick={handlePrint} className="bg-[#1a4a8c] text-white px-5 py-2 rounded-full font-medium text-sm shadow-xl hover:bg-blue-900 transition-colors flex items-center gap-2">
                    <Printer size={16} /> Save as PDF
                </button>
            </div>

            <div className="cv-sheet w-full max-w-[21cm] md:min-h-[29.7cm] bg-white shadow-2xl flex flex-col md:flex-row print:flex-row text-gray-800 text-sm mx-auto">




                {/* LEFT SIDEBAR */}
                <div className="w-full md:w-[33%] print:w-[33%] bg-[#eef2f6] shrink-0 border-b md:border-b-0 md:border-r print:border-b-0 print:border-r border-[#d1dce8] flex flex-col pt-8 md:pt-12 print:pt-12 relative min-h-full pb-8 md:pb-12 print:pb-12">



                    <div className="w-full flex justify-center mb-8">
                        <div className="w-[150px] h-[150px] rounded-full overflow-hidden border-[5px] border-[#d1dce8] shadow-md bg-white">
                            <img src="/hero.png" alt="Aadarsh Pandit" className="w-full h-full object-cover object-center" />
                        </div>
                    </div>

                    <div className="ribbon text-xl font-['Outfit'] uppercase">Contact</div>
                    <div className="px-6 mb-8 text-[13px]">
                        <div className="mb-4 flex gap-3 items-start">
                            <Phone className="w-4 h-4 text-[#1a4a8c] mt-0.5 shrink-0" />
                            <div>
                                <h4 className="font-bold text-gray-900 mb-0.5">Phone</h4>
                                <p className="text-gray-700 font-medium">+977 9860334317</p>
                            </div>
                        </div>
                        <div className="mb-4 flex gap-3 items-start">
                            <Mail className="w-4 h-4 text-[#1a4a8c] mt-0.5 shrink-0" />
                            <div>
                                <h4 className="font-bold text-gray-900 mb-0.5">Email</h4>
                                <p className="text-gray-700 font-medium break-all">aadarshapandit@gmail.com</p>
                            </div>
                        </div>
                        <div className="mb-4 flex gap-3 items-start">
                            <MapPin className="w-4 h-4 text-[#1a4a8c] mt-0.5 shrink-0" />
                            <div>
                                <h4 className="font-bold text-gray-900 mb-0.5">Address</h4>
                                <p className="text-gray-700 font-medium">Kathmandu, Nepal</p>
                            </div>
                        </div>
                        <div className="flex gap-3 items-start">
                            <Globe className="w-4 h-4 text-[#1a4a8c] mt-0.5 shrink-0" />
                            <div>
                                <h4 className="font-bold text-gray-900 mb-0.5">Website</h4>
                                <a href="https://aadarshapandit.com.np" target="_blank" className="text-[#1a4a8c] font-medium hover:underline">aadarshapandit.com.np</a>
                            </div>
                        </div>
                    </div>

                    <div className="ribbon text-xl font-['Outfit'] uppercase">Education</div>
                    <div className="px-6 mb-8 text-[13px] space-y-4">
                        <div>
                            <h4 className="font-bold text-gray-900 mb-0.5 leading-snug">BTech in Artificial Intelligence</h4>
                            <p className="text-gray-700 leading-tight">Kathmandu University</p>
                            <p className="text-gray-500 text-xs italic mt-0.5">2024 – Present</p>
                            <p className="text-[#1a4a8c] text-xs font-bold mt-0.5">GPA: 3.95 / 4.0</p>
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900 mb-0.5 leading-snug">Science (+2)</h4>
                            <p className="text-gray-700 leading-tight">Kathmandu Bernhardt College</p>
                            <p className="text-gray-500 text-xs italic mt-0.5">2022 - 2024</p>
                        </div>
                    </div>

                    <div className="ribbon text-xl font-['Outfit'] uppercase">Skills</div>
                    <div className="px-6 mb-8 text-[13px] space-y-4">
                        <div className="skill-block">
                            <h4 className="font-bold text-[#1a4a8c] mb-1">Programming</h4>
                            <p className="text-gray-700 leading-tight">Python, JavaScript, TypeScript, SQL</p>
                        </div>
                        <div className="skill-block">
                            <h4 className="font-bold text-[#1a4a8c] mb-1">AI / ML</h4>
                            <p className="text-gray-700 leading-tight">PyTorch, TensorFlow, Scikit-Learn, HuggingFace, Random Forest, Pandas, NumPy, NLP, ASR</p>
                        </div>
                        <div className="skill-block">
                            <h4 className="font-bold text-[#1a4a8c] mb-1">Web & Backend</h4>
                            <p className="text-gray-700 leading-tight">React, Next.js, Node.js, FastAPI, WordPress</p>
                        </div>
                        <div className="skill-block">
                            <h4 className="font-bold text-[#1a4a8c] mb-1">Mobile Development</h4>
                            <p className="text-gray-700 leading-tight">Flutter</p>
                        </div>
                        <div className="skill-block">
                            <h4 className="font-bold text-[#1a4a8c] mb-1">Tools &amp; Platform</h4>
                            <p className="text-gray-700 leading-tight">Git, Docker, Linux, Blender</p>
                        </div>
                    </div>

                    <div className="ribbon text-xl font-['Outfit'] uppercase">Language</div>
                    <div className="px-6 text-[13px] pb-6">
                        <div className="space-y-3 text-gray-700 font-medium">
                            <div className="flex justify-between items-center border-b border-gray-300 pb-1">
                                <span className="text-gray-900 font-bold">Nepali</span>
                                <span className="text-gray-500 italic text-[11px]">Native</span>
                            </div>
                            <div className="flex justify-between items-center border-b border-gray-300 pb-1">
                                <span className="text-gray-900 font-bold">English</span>
                                <span className="text-gray-500 italic text-[11px]">Professional</span>
                            </div>
                            <div className="flex justify-between items-center pb-1">
                                <span className="text-gray-900 font-bold">Hindi</span>
                                <span className="text-gray-500 italic text-[11px]">Conversational</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT CONTENT */}
                <div className="w-full md:w-[67%] print:w-[67%] bg-white pt-8 md:pt-[55px] print:pt-[55px] px-6 md:px-[40px] print:px-[40px] flex flex-col relative pb-12">



                    <div className="mb-6 relative z-10 w-full overflow-hidden">
                        <h1 className="text-4xl md:text-[52px] print:text-[52px] leading-[0.95] font-black text-[#1a4a8c] uppercase font-['Outfit'] tracking-[0.05em] mb-3">
                            AADARSH<br />PANDIT
                        </h1>
                        <h2 className="text-[20px] text-gray-700 font-bold tracking-[0.14em] uppercase">
                            AI &amp; Web Developer
                        </h2>
                        <p className="text-gray-500 text-[13px] leading-relaxed mt-3 font-medium max-w-[340px]">
                            BTech AI student at Kathmandu University. Specializes in low-resource NLP for Nepali (ASR, code-switching) and ships production-grade ML systems alongside high-performance creative web experiences.
                        </p>
                    </div>

                    <h3 className="text-[22px] font-bold text-[#1a4a8c] mb-6 font-['Outfit'] tracking-wide">Professional Experience</h3>

                    <div className="relative z-10 text-[13px]">

                        {/* Kurly Brains */}
                        <div className="timeline-item flex mb-6 relative group">
                            <div className="w-[18px] shrink-0 relative">
                                <div className="w-[2px] bg-[#d1dce8] absolute left-[8px] top-[14px] bottom-[-15px]"></div>
                                <div className="w-[10px] h-[10px] rounded-full bg-[#1a4a8c] absolute left-[4px] top-[6px] shadow-[0_0_0_4px_white]"></div>
                            </div>

                            <div className="pl-4 w-full pb-2">
                                <span className="text-[11px] font-bold text-[#1a4a8c] tracking-wide uppercase">Feb 2026 – Present</span>
                                <div className="flex items-center gap-2 mt-0.5 mb-0.5">
                                    <h4 className="font-bold text-[16px] text-gray-900">AI Lead</h4>
                                    <span className="text-[10px] font-semibold bg-[#1a4a8c]/10 text-[#1a4a8c] px-2 py-0.5 rounded-full">Contract</span>
                                </div>
                                <p className="text-[#1a4a8c] font-medium mb-2 text-[13px]">
                                    <a href="https://kurlybrains.com/" target="_blank" className="hover:underline">Kurly Brains</a>
                                </p>
                                <ul className="list-disc pl-4 space-y-1.5 text-gray-700 marker:text-gray-400 leading-relaxed font-medium">
                                    <li>Delivered 3+ client-commissioned AI projects including custom chatbots (with WordPress plugin integration), domain-specific predictors, and fine-tuned LLMs.</li>
                                    <li>Lead model fine-tuning pipelines end-to-end: data curation, training, evaluation, and production handoff for business clients.</li>
                                </ul>
                            </div>
                        </div>

                        {/* Nepali ASR System */}
                        <div className="timeline-item flex mb-6 relative">
                            <div className="w-[18px] shrink-0 relative">
                                <div className="w-[2px] bg-[#d1dce8] absolute left-[8px] top-[14px] bottom-[-15px]"></div>
                                <div className="w-[10px] h-[10px] rounded-full bg-[#1a4a8c] absolute left-[4px] top-[6px] shadow-[0_0_0_4px_white]"></div>
                            </div>

                            <div className="pl-4 w-full pb-2">
                                <span className="text-[11px] font-bold text-gray-500 tracking-wide uppercase">Jun 2025 – Nov 2025</span>
                                <div className="flex items-center gap-2 mt-0.5 mb-0.5">
                                    <h4 className="font-bold text-[16px] text-gray-900">AI Researcher — Nepali ASR</h4>
                                    <span className="text-[10px] font-semibold bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">Research Paper</span>
                                </div>
                                <p className="text-gray-500 mb-2 italic text-[12px]">Independent Research</p>
                                <ul className="list-disc pl-4 space-y-1.5 text-gray-700 marker:text-gray-400 leading-relaxed font-medium">
                                    <li>Developed a reward-guided fine-tuning framework for Whisper, utilizing a Random Forest model (81% accuracy) to filter noisy samples from a 70+ hour Nepali speech dataset.</li>
                                    <li>Achieved an 11–12% <em>relative</em> improvement in transcription accuracy, reducing WER from 5.55% to 4.89% and CER from 5.04% to 4.52%.</li>
                                </ul>
                            </div>
                        </div>

                        {/* Karyantra Hive */}
                        <div className="timeline-item flex mb-6 relative">
                            <div className="w-[18px] shrink-0 relative">
                                <div className="w-[2px] bg-[#d1dce8] absolute left-[8px] top-[14px] bottom-[-15px]"></div>
                                <div className="w-[10px] h-[10px] rounded-full bg-[#1a4a8c] absolute left-[4px] top-[6px] shadow-[0_0_0_4px_white]"></div>
                            </div>

                            <div className="pl-4 w-full pb-2">
                                <span className="text-[11px] font-bold text-gray-500 tracking-wide uppercase">Jan 2026</span>
                                <div className="flex items-center gap-2 mt-0.5 mb-0.5">
                                    <h4 className="font-bold text-[16px] text-gray-900">Web Developer</h4>
                                    <span className="text-[10px] font-semibold bg-[#1a4a8c]/10 text-[#1a4a8c] px-2 py-0.5 rounded-full">Contract</span>
                                </div>
                                <p className="text-[#1a4a8c] font-medium mb-2 text-[12px]">
                                    <a href="https://karyantrahive.com.np/" target="_blank" className="hover:underline">Karyantra Hive</a>
                                </p>
                                <ul className="list-disc pl-4 space-y-1.5 text-gray-700 marker:text-gray-400 leading-relaxed font-medium">
                                    <li>Built and deployed corporate website using WordPress and Elementor with custom page templates and responsive layouts.</li>
                                    <li>Configured hosting, SEO metadata, and performance settings achieving fast page loads for a business-focused audience.</li>
                                </ul>
                            </div>
                        </div>

                    </div>

                    <h3 className="text-[22px] font-bold text-[#1a4a8c] mb-6 font-['Outfit'] tracking-wide border-t border-gray-200 pt-6 mt-2">Projects</h3>

                    <div className="relative z-10 text-[13px]">
                        {/* Aadarsh Travels */}
                        <div className="timeline-item flex mb-6 relative">
                            <div className="w-[18px] shrink-0 relative">
                                <div className="w-[2px] bg-[#d1dce8] absolute left-[8px] top-[14px] bottom-[-15px]"></div>
                                <div className="w-[10px] h-[10px] rounded-full bg-[#1a4a8c] absolute left-[4px] top-[6px] shadow-[0_0_0_4px_white]"></div>
                            </div>

                            <div className="pl-4 w-full pb-2">
                                <span className="text-[11px] font-bold text-[#1a4a8c] tracking-wide uppercase">Feb 2026</span>
                                <div className="flex items-center gap-2 mt-0.5 mb-0.5">
                                    <h4 className="font-bold text-[16px] text-gray-900">Aadarsh Travels</h4>
                                    <span className="text-[10px] font-semibold bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">Next.js, UI/UX</span>
                                </div>
                                <div className="flex items-center gap-3 mb-2">
                                    <a href="https://aadarshapandit.com.np/projects/nepal" target="_blank" className="text-[#1a4a8c] font-medium text-[12px] hover:underline">Live Demo ↗</a>
                                    <a href="https://github.com/Aadarshttech/nepal-travels-showcase" target="_blank" className="text-gray-400 font-medium text-[11px] hover:underline">GitHub ↗</a>
                                </div>
                                <ul className="list-disc pl-4 space-y-1.5 text-gray-700 marker:text-gray-400 leading-relaxed font-medium">
                                    <li>Architected luxury, high-performance web experience showcasing travel routes using Next.js.</li>
                                    <li>Engineered custom scroll-synced 4K WebP frame animation system (253 frames), conditionally rendering mobile sizes to cut weight by 83%.</li>
                                </ul>
                            </div>
                        </div>

                        {/* Match Predictor */}
                        <div className="timeline-item flex mb-6 relative">
                            <div className="w-[18px] shrink-0 relative">
                                <div className="w-[2px] bg-[#d1dce8] absolute left-[8px] top-[14px] bottom-[-15px]"></div>
                                <div className="w-[10px] h-[10px] rounded-full bg-[#1a4a8c] absolute left-[4px] top-[6px] shadow-[0_0_0_4px_white]"></div>
                            </div>

                            <div className="pl-4 w-full">
                                <span className="text-[11px] font-bold text-[#1a4a8c] tracking-wide uppercase">Jan 2026</span>
                                <div className="flex items-center gap-2 mt-0.5 mb-0.5">
                                    <h4 className="font-bold text-[16px] text-gray-900">Nepal Cricket Predictor</h4>
                                    <span className="text-[10px] font-semibold bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">Scikit-Learn, FastAPI</span>
                                </div>
                                <div className="flex items-center gap-3 mb-2">
                                    <a href="https://aadarshapandit.com.np/nepal-cricket/index.html" target="_blank" className="text-[#1a4a8c] font-medium text-[12px] hover:underline">Live Demo ↗</a>
                                    <a href="https://github.com/Aadarshttech/nepal-cricket-predictor" target="_blank" className="text-gray-400 font-medium text-[11px] hover:underline">GitHub ↗</a>
                                </div>
                                <ul className="list-disc pl-4 space-y-1.5 text-gray-700 marker:text-gray-400 leading-relaxed font-medium">
                                    <li>Deployed a real-time predictive dashboard (FastAPI + React) using opponent, venue, and toss as features; model achieves 85% prediction accuracy.</li>
                                    <li>Trained a Random Forest classifier on historical T20I and ODI data, surface-level and match-condition features for Nepal national team fixtures.</li>
                                </ul>
                            </div>
                        </div>

                    </div>

                    {/* Publications */}
                    <div className="mt-6 pt-5 border-t border-gray-200">
                        <h3 className="text-[16px] font-bold text-[#1a4a8c] mb-3 font-['Outfit'] tracking-wide uppercase">Publications &amp; Research</h3>
                        <div className="text-[13px]">
                            <div className="flex items-start gap-2">
                                <span className="text-[10px] font-semibold bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full mt-0.5 shrink-0">Under Review</span>
                                <div>
                                    <p className="font-semibold text-gray-900 leading-snug">Reward-Guided Fine-Tuning of Whisper for <span className="whitespace-nowrap">Low-Resource</span> Nepali ASR</p>
                                    <p className="text-gray-500 text-[12px] mt-0.5">Random Forest reward model · 70+ hr dataset · 11–12% relative WER improvement</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 pt-5 border-t border-gray-200">
                        <div className="flex flex-col sm:flex-row sm:justify-between gap-4 text-[13px]">
                            <div className="flex items-center gap-2">
                                <Github className="w-4 h-4 text-[#1a4a8c]" />
                                <span className="text-gray-900 font-bold uppercase tracking-wider">GitHub:</span>
                                <a href="https://github.com/Aadarshttech" target="_blank" className="font-medium text-gray-700 hover:text-[#1a4a8c] hover:underline transition-colors tracking-wide">
                                    Aadarshttech
                                </a>
                            </div>
                            <div className="flex items-center gap-2">
                                <Linkedin className="w-4 h-4 text-[#1a4a8c]" />
                                <span className="text-gray-900 font-bold uppercase tracking-wider">LinkedIn:</span>
                                <a href="https://www.linkedin.com/in/aadarsh-pandit" target="_blank" className="font-medium text-gray-700 hover:text-[#1a4a8c] hover:underline transition-colors tracking-wide">
                                    Aadarsh-Pandit
                                </a>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
