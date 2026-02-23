"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, X, Bot, User, Loader2, Minimize2 } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";

interface Message {
    role: "user" | "assistant";
    content: string;
}

export function ChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { role: "assistant", content: "Hi! I'm Aadarsh's virtual assistant. How can I help you today?" }
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();

    const isWorksPage = pathname?.startsWith('/works');

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
        }
    }, [messages, isOpen]);

    const handleSend = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage = { role: "user" as const, content: input };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsLoading(true);

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ messages: [...messages, userMessage] }),
            });

            const data = await response.json();
            if (data.error) throw new Error(data.error);

            setMessages((prev) => [...prev, data]);
        } catch (error: any) {
            console.error("Chat Error:", error);
            setMessages((prev) => [...prev, {
                role: "assistant",
                content: `Error: ${error.message || "Something went wrong. Please check your API key and connection."}`
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-20 sm:bottom-[5.5rem] right-4 sm:right-6 z-[9998] flex flex-col items-end">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, transformOrigin: "bottom right" }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="mb-4 w-[calc(100vw-2rem)] sm:w-[400px] max-w-[400px] h-[65vh] sm:h-[70vh] max-h-[600px] bg-[#0A0A0A]/95 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-[0_0_40px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col ring-1 ring-white/5"
                    >
                        {/* Header */}
                        <div className={`p-4 flex items-center justify-between border-b border-white/5 shrink-0 ${isWorksPage ? 'bg-white/5' : 'bg-gradient-to-r from-indigo-500/10 to-purple-500/10'}`}>
                            <div className="flex items-center gap-3">
                                <div className={`relative p-2.5 rounded-xl ${isWorksPage ? 'bg-white/10 text-white' : 'bg-indigo-500 text-white'} shadow-inner`}>
                                    <Bot size={20} />
                                    <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-[#0A0A0A]" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-sm tracking-wide text-white">Aadarsh AI</h3>
                                    <p className="text-[11px] text-gray-400">Usually replies instantly</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-200"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-grow overflow-y-auto p-4 sm:p-5 space-y-5 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                            {messages.map((m, i) => (
                                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                                    <div className={`flex gap-2 sm:gap-3 max-w-[90%] sm:max-w-[85%] ${m.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                                        <div className={`shrink-0 w-8 h-8 mt-1 rounded-full overflow-hidden flex items-center justify-center ${m.role === "user" ? "bg-white/10 text-white" : ""}`}>
                                            {m.role === "user" ? (
                                                <User size={14} />
                                            ) : (
                                                <Image
                                                    src="/chatbot-icon.png"
                                                    alt="Bot"
                                                    width={32}
                                                    height={32}
                                                    className="w-full h-full object-cover"
                                                />
                                            )}
                                        </div>
                                        <div className={`p-3 sm:p-3.5 rounded-2xl text-[13px] sm:text-[14px] leading-relaxed whitespace-pre-wrap shadow-sm ${m.role === "user" ? "bg-white text-black rounded-tr-sm" : "bg-white/5 text-gray-200 border border-white/5 rounded-tl-sm backdrop-blur-md"}`}>
                                            {m.content}
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="flex gap-2 sm:gap-3 max-w-[90%] sm:max-w-[85%]">
                                        <div className="shrink-0 w-8 h-8 mt-1 rounded-full overflow-hidden flex items-center justify-center">
                                            <Image
                                                src="/chatbot-icon.png"
                                                alt="Bot"
                                                width={32}
                                                height={32}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="bg-white/5 text-gray-400 p-3 sm:p-3.5 rounded-2xl rounded-tl-sm border border-white/5 flex items-center gap-2 backdrop-blur-md">
                                            <Loader2 size={14} className="animate-spin" />
                                            <span className="text-[13px]">Thinking...</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <form onSubmit={handleSend} className="p-3 sm:p-4 border-t border-white/5 bg-black/20 shrink-0">
                            <div className="relative flex items-center">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Message Aadarsh AI..."
                                    className="w-full bg-white/5 border border-white/10 rounded-full py-3 sm:py-3.5 pl-4 sm:pl-5 pr-12 sm:pr-14 text-[13px] sm:text-[14px] text-white placeholder-gray-500 focus:outline-none focus:border-white/20 focus:bg-white/10 transition-all shadow-inner"
                                />
                                <button
                                    type="submit"
                                    disabled={!input.trim() || isLoading}
                                    className={`absolute right-1 sm:right-2 p-2 sm:p-2.5 rounded-full transition-all duration-300 ${!input.trim() || isLoading ? 'text-gray-600 scale-95' : (isWorksPage ? 'bg-white text-black hover:bg-gray-200 hover:scale-105' : 'bg-indigo-500 text-white hover:bg-indigo-400 hover:scale-105')}`}
                                >
                                    <Send size={14} className={!input.trim() || isLoading ? "" : "translate-x-[1px] -translate-y-[1px]"} />
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Trigger Button — Cool animated design */}
            <motion.button
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 260, damping: 20 }}
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className="relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full shadow-2xl transition-colors duration-300 group"
                aria-label="Open Chat"
            >
                {/* Animated glowing ring */}
                {!isOpen && (
                    <motion.span
                        className={`absolute inset-0 rounded-full ${isWorksPage ? 'bg-white/20' : 'bg-indigo-500/30'}`}
                        animate={{ scale: [1, 1.35, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    />
                )}

                {/* Button background */}
                <span className={`absolute inset-0 rounded-full ${isOpen
                    ? 'bg-white'
                    : 'bg-white/10 backdrop-blur-md border border-white/20'
                    } shadow-lg transition-all duration-300`}
                />

                {/* Icon */}
                <span className={`relative z-10 flex items-center justify-center w-full h-full ${isOpen ? 'text-black' : ''}`}>
                    {isOpen ? (
                        <Minimize2 size={24} />
                    ) : (
                        <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center">
                            <Image
                                src="/chatbot-icon.png"
                                alt="Chatbot"
                                width={48}
                                height={48}
                                className="w-full h-full object-contain transform hover:scale-110 transition-transform duration-300"
                            />
                        </div>
                    )}
                </span>

                {/* Online indicator dot */}
                {!isOpen && (
                    <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5 z-20">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white dark:border-[#0A0A0A]"></span>
                    </span>
                )}
            </motion.button>
        </div>
    );
}
