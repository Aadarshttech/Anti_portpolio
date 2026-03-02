import { useState, useCallback, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Heart, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";
import couplePhoto from "@/assets/couple-4.jpg";

const HeroSection = () => {
  const [accepted, setAccepted] = useState(false);
  const noRef = useRef<HTMLButtonElement>(null);

  const sparkles = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        id: i,
        left: 5 + Math.random() * 90,
        top: 5 + Math.random() * 90,
        delay: Math.random() * 4,
        size: 16 + Math.random() * 14,
        emoji: ["✨", "💫", "⭐", "🌟"][i % 4],
      })),
    []
  );

  const handleYes = useCallback(() => {
    setAccepted(true);
    // Multi-burst confetti for extra magic
    const bursts = [
      { particleCount: 100, spread: 70, origin: { y: 0.65, x: 0.3 }, delay: 0 },
      { particleCount: 100, spread: 70, origin: { y: 0.65, x: 0.7 }, delay: 150 },
      { particleCount: 60, spread: 120, origin: { y: 0.5 }, delay: 400 },
      { particleCount: 40, spread: 160, origin: { y: 0.3 }, delay: 700 },
    ];
    bursts.forEach(({ delay, ...opts }) =>
      setTimeout(
        () =>
          confetti({
            ...opts,
            colors: ["#e8a0bf", "#d4a0a0", "#f2c4c4", "#ffd6e0", "#ffb6c1", "#c9a0dc"],
            ticks: 200,
            gravity: 0.8,
            shapes: ["circle", "square"],
            scalar: 1.2,
          }),
        delay
      )
    );
  }, []);

  const dodgeNo = useCallback(() => {
    if (!noRef.current) return;
    const x = (Math.random() - 0.5) * 300;
    const y = (Math.random() - 0.5) * 200;
    noRef.current.style.transition = "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)";
    noRef.current.style.transform = `translate(${x}px, ${y}px)`;
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Layered gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blush via-background to-cream" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_hsla(var(--primary),0.08)_0%,_transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_hsla(var(--rose-gold),0.1)_0%,_transparent_60%)]" />

      {/* Sparkles */}
      {sparkles.map((s) => (
        <motion.span
          key={s.id}
          className="absolute pointer-events-none"
          style={{ left: `${s.left}%`, top: `${s.top}%`, fontSize: s.size }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0.5, 1.2, 0.5],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 3,
            delay: s.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {s.emoji}
        </motion.span>
      ))}

      <div className="relative z-10 text-center px-6 max-w-xl mx-auto">
        <AnimatePresence mode="wait">
          {!accepted ? (
            <motion.div
              key="question"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30, scale: 0.95 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Pulsing heart with glow */}
              <motion.div
                className="relative w-20 h-20 mx-auto mb-8"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <Heart className="w-20 h-20 text-primary drop-shadow-lg" fill="currentColor" />
                <div className="absolute inset-0 animate-glow-pulse rounded-full" />
              </motion.div>

              <motion.h1
                className="text-4xl md:text-7xl font-bold text-foreground mb-3 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Will You Be My
                <br />
                <span className="text-gradient-romantic">Valentine?</span> 💘
              </motion.h1>

              <motion.p
                className="font-handwritten text-2xl md:text-3xl text-muted-foreground mb-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                I have something special to ask you...
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                <button
                  onClick={handleYes}
                  className="btn-romantic px-10 py-4 rounded-full text-primary-foreground text-lg font-bold shadow-lg"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    YES <Heart size={18} fill="currentColor" />
                  </span>
                </button>
                <button
                  onClick={handleYes}
                  className="px-10 py-4 rounded-full bg-gradient-to-r from-rose-gold to-rose-gold-light text-foreground text-lg font-bold shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95"
                >
                  Of course YES 😘
                </button>
              </motion.div>

              <motion.div
                className="mt-8 relative h-16 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                <button
                  ref={noRef}
                  onMouseEnter={dodgeNo}
                  onTouchStart={dodgeNo}
                  className="px-6 py-2 rounded-full border border-border text-muted-foreground/60 text-sm transition-transform hover:cursor-not-allowed"
                >
                  No 😢
                </button>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="accepted"
              initial={{ opacity: 0, scale: 0.7, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
              className="space-y-6"
            >
              <motion.span
                className="text-7xl block"
                animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                🥰
              </motion.span>

              <h2 className="text-3xl md:text-5xl font-bold text-foreground">
                I knew you'd say yes!
              </h2>

              <p className="text-xl md:text-2xl font-handwritten text-muted-foreground">
                You just made me the happiest person ever 💕
              </p>

              <motion.div
                className="w-72 h-96 mx-auto rounded-3xl overflow-hidden shadow-2xl"
                initial={{ opacity: 0, rotateY: 90 }}
                animate={{ opacity: 1, rotateY: 0 }}
                transition={{ delay: 0.5, duration: 0.8, type: "spring" }}
                style={{
                  boxShadow: "0 25px 60px -15px hsla(340, 60%, 55%, 0.3)",
                  border: "3px solid hsl(var(--primary) / 0.3)",
                }}
              >
                <img
                  src={couplePhoto}
                  alt="Us together 💕"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8 }}
                className="mt-10 flex flex-col items-center gap-2 cursor-pointer group"
                onClick={() => window.scrollBy({ top: window.innerHeight, behavior: "smooth" })}
              >
                <p className="font-handwritten text-xl text-muted-foreground group-hover:text-primary transition-colors">
                  Scroll down for more surprises 💕
                </p>
                <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}>
                  <ChevronDown className="w-7 h-7 text-primary" />
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default HeroSection;
