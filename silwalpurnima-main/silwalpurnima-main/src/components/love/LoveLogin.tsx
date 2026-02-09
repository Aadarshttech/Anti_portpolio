import { useState } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

interface LoveLoginProps {
    onLogin: () => void;
}

const LoveLogin = ({ onLogin }: LoveLoginProps) => {
    const [password, setPassword] = useState("");
    const { toast } = useToast();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (password.toLowerCase() === "love" || password === "purnima") {
            onLogin();
            toast({
                title: "Welcome, my love! ❤️",
                description: "Here are some of our beautiful memories together.",
            });
        } else {
            toast({
                variant: "destructive",
                title: "Incorrect Password 💔",
                description: "Hint: What is the most beautiful word in the world?",
            });
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-b from-pink-50 to-white">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md space-y-8 text-center"
            >
                <div className="space-y-2">
                    <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="flex justify-center"
                    >
                        <Heart className="w-16 h-16 text-pink-500 fill-pink-500" />
                    </motion.div>
                    <h1 className="text-3xl font-bold tracking-tighter text-gray-900 sm:text-4xl">
                        For My Special One
                    </h1>
                    <p className="text-gray-500">
                        Enter the secret password to unlock our memories.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Input
                            type="password"
                            placeholder="Enter password..."
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="text-center border-pink-200 focus:ring-pink-500"
                        />
                    </div>
                    <Button
                        type="submit"
                        className="w-full bg-pink-500 hover:bg-pink-600 text-white"
                    >
                        Unlock My Heart
                    </Button>
                </form>
            </motion.div>
        </div>
    );
};

export default LoveLogin;
