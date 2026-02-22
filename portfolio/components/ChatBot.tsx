"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Send, X, Bot, User, Loader2, Minimize2 } from "lucide-react";
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
        <div className="fixed bottom-28 right-8 z-[100] flex flex-col items-end">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20, transformOrigin: "bottom right" }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        className="mb-4 w-80 sm:w-96 bg-[#0E0E0E] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
                    >
                        {/* Header */}
                        <div className={`p-4 flex items-center justify-between border-b border-white/10 ${isWorksPage ? 'bg-white text-black' : 'bg-indigo-600 text-white'}`}>
                            <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-lg ${isWorksPage ? 'bg-black/5' : 'bg-white/10'}`}>
                                    <Bot size={20} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-sm">Aadarsh AI</h3>
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                        <span className="text-[10px] opacity-80 uppercase tracking-tighter">Online</span>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className={`p-1.5 rounded-full transition-colors ${isWorksPage ? 'hover:bg-black/5' : 'hover:bg-white/10'}`}
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-grow h-80 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                            {messages.map((m, i) => (
                                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                                    <div className={`flex gap-2 max-w-[85%] ${m.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                                        <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs ${m.role === "user" ? "bg-white/10 text-white" : (isWorksPage ? "bg-white text-black" : "bg-indigo-600 text-white")}`}>
                                            {m.role === "user" ? <User size={14} /> : <Bot size={14} />}
                                        </div>
                                        <div className={`p-3 rounded-2xl text-sm leading-relaxed ${m.role === "user" ? "bg-white/10 text-white rounded-tr-none" : "bg-white/[0.04] text-gray-200 border border-white/5 rounded-tl-none"}`}>
                                            {m.content}
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="flex gap-2 max-w-[85%]">
                                        <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${isWorksPage ? "bg-white text-black" : "bg-indigo-600 text-white"}`}>
                                            <Bot size={14} />
                                        </div>
                                        <div className="bg-white/[0.04] text-gray-400 p-3 rounded-2xl rounded-tl-none border border-white/5 flex items-center gap-2">
                                            <Loader2 size={14} className="animate-spin" />
                                            <span className="text-xs">Thinking...</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <form onSubmit={handleSend} className="p-4 border-t border-white/10 bg-white/[0.02]">
                            <div className="relative flex items-center">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Ask anything..."
                                    className="w-full bg-white/[0.05] border border-white/10 rounded-xl py-3 pl-4 pr-12 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-white/20 transition-all"
                                />
                                <button
                                    type="submit"
                                    disabled={!input.trim() || isLoading}
                                    className={`absolute right-2 p-2 rounded-lg transition-all ${!input.trim() || isLoading ? 'text-gray-600' : (isWorksPage ? 'bg-white text-black hover:bg-gray-200' : 'bg-indigo-600 text-white hover:bg-indigo-500')}`}
                                >
                                    <Send size={16} />
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Trigger Button */}
            <motion.button
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.1, boxShadow: isWorksPage ? "0 0 30px rgba(255, 255, 255, 0.2)" : "0 0 30px rgba(79, 70, 229, 0.4)" }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center justify-center w-14 h-14 rounded-full shadow-2xl transition-all duration-300 relative ${isOpen ? 'bg-white text-black' : (isWorksPage ? 'bg-white text-black hover:bg-gray-100' : 'bg-indigo-600 text-white hover:bg-indigo-500')}`}
                aria-label="Open Chat"
            >
                {isOpen ? <Minimize2 size={24} /> : <MessageSquare size={24} />}
                {!isOpen && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-[#0A0A0A]"></span>
                    </span>
                )}
            </motion.button>
        </div>
    );
}
