"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";

import FloatingHearts from "@/components/valentine/FloatingHearts";
import MusicToggle from "@/components/valentine/MusicToggle";
import HeroSection from "@/components/valentine/HeroSection";
import MemoryTimeline from "@/components/valentine/MemoryTimeline";
import LoveNotes from "@/components/valentine/LoveNotes";
import ProposalLetter from "@/components/valentine/ProposalLetter";
import CelebrationSection from "@/components/valentine/CelebrationSection";

export default function PurnimaSilwalPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState("");
    const [accepted, setAccepted] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === "PurnimaPandit123") {
            setIsAuthenticated(true);
            setError("");
        } else {
            setError("That's not the secret code, my love 💔");
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-pink-50 p-4 relative overflow-hidden">
                <FloatingHearts />

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-xl w-full max-w-md border border-pink-100 relative z-10"
                >
                    <div className="text-center mb-6">
                        <div className="inline-block p-3 bg-pink-100 rounded-full mb-4">
                            <Lock className="w-8 h-8 text-pink-500" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-800">My Secret for You</h1>
                        <p className="text-gray-500 mt-2">Enter the magic word to enter 🗝️</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <input
                            type="password"
                            placeholder="Enter password..."
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full text-center tracking-widest px-4 py-3 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
                        />
                        {error && (
                            <p className="text-red-500 text-sm text-center">{error}</p>
                        )}
                        <button
                            type="submit"
                            className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 text-lg rounded-lg transition-colors"
                        >
                            Unlock My Heart 💘
                        </button>
                    </form>
                </motion.div>
            </div>
        );
    }

    return (
        <main className="relative overflow-x-hidden scroll-smooth">
            <FloatingHearts />
            <MusicToggle />
            <HeroSection onAccept={() => setAccepted(true)} accepted={accepted} />

            {accepted && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                >
                    <MemoryTimeline />
                    <LoveNotes />
                    <ProposalLetter />
                    <CelebrationSection />
                </motion.div>
            )}
        </main>
    );
}
