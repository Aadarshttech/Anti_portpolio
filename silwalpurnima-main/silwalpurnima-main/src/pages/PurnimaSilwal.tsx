import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

import FloatingHearts from "../components/valentine/FloatingHearts";
import MusicToggle from "../components/valentine/MusicToggle";
import HeroSection from "../components/valentine/HeroSection";
import MemoryTimeline from "../components/valentine/MemoryTimeline";
import LoveNotes from "../components/valentine/LoveNotes";
import ProposalLetter from "../components/valentine/ProposalLetter";
import CelebrationSection from "../components/valentine/CelebrationSection";

const PurnimaSilwal = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState("");
    const [accepted, setAccepted] = useState(false);
    const { toast } = useToast();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === "PurnimaPandit123") {
            setIsAuthenticated(true);
            toast({
                title: "Welcome, My Love! 💖",
                description: "I've been waiting for you...",
            });
        } else {
            toast({
                variant: "destructive",
                title: "Access Denied 💔",
                description: "That's not the secret code, my love.",
            });
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
                        <h1 className="text-2xl font-serif font-bold text-gray-800">My Secret for You</h1>
                        <p className="text-gray-500 mt-2">Enter the magic word to enter 🗝️</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <Input
                            type="password"
                            placeholder="Enter password..."
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full text-center tracking-widest"
                        />
                        <Button
                            type="submit"
                            className="w-full bg-pink-500 hover:bg-pink-600 text-white font-serif py-6 text-lg"
                        >
                            Unlock My Heart 💘
                        </Button>
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

            {/* 
        We render these sections but they might be below the fold. 
        OR we can hide them until accepted. 
        The supporting code rendered them always.
        But sticking to the user request: "opens will you be my valentine then create interface".
        So keep them hidden until accepted? 
        The supporting code 'HeroSection' implies scrolling down after acceptance.
        So let's strictly hide them until accepted to prevent spoilers if user scrolls.
      */}
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
};

export default PurnimaSilwal;
