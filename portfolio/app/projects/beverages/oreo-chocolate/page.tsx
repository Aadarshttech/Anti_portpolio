"use client";

import { useRef, useState, useEffect } from "react";
import { ChocoCanvas } from "@/components/beverages/ChocoCanvas";
import { useScroll, motion, useTransform, AnimatePresence } from "framer-motion";
import { ArrowLeft, ChevronLeft, ChevronRight, ShoppingCart, Zap, Check, Github, Linkedin, Instagram, Twitter } from "lucide-react";

/* ====================================================================
   Scroll-progress ↔ text-phase mapping
   Total scroll track = 600 vh
   Each "phase" defines when a text block fades in, holds, then fades out.
   ====================================================================*/

interface CartItem {
    name: string;
    price: number;
    qty: number;
}

export default function OreoChocolateDemo() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [cart, setCart] = useState<CartItem[]>([]);
    const [showCart, setShowCart] = useState(false);
    const [toast, setToast] = useState<string | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [loadProgress, setLoadProgress] = useState(0);

    const addToCart = (name: string, price: number) => {
        setCart((prev) => {
            const existing = prev.find((i) => i.name === name);
            if (existing) return prev.map((i) => i.name === name ? { ...i, qty: i.qty + 1 } : i);
            return [...prev, { name, price, qty: 1 }];
        });
        setToast(name);
    };

    // Auto-dismiss toast after 2 seconds
    useEffect(() => {
        if (!toast) return;
        const t = setTimeout(() => setToast(null), 2000);
        return () => clearTimeout(t);
    }, [toast]);

    const removeFromCart = (name: string) => {
        setCart((prev) => prev.filter((i) => i.name !== name));
    };

    const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);
    const cartTotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

    /* scrollYProgress goes from 0 → 1 over the 600 vh track ---------- */
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    /* ── Phase 1 : Hero title  (0 % → 25 %) — starts fully visible ── */
    const op1 = useTransform(scrollYProgress, [0.0, 0.18, 0.25], [1, 1, 0]);
    const y1 = useTransform(scrollYProgress, [0.0, 0.18, 0.25], [0, 0, -60]);
    const s1 = useTransform(scrollYProgress, [0.0, 0.18, 0.25], [1, 1, 0.92]);

    /* ── Phase 2 : Product story  (25 % → 50 %) ─────────────────── */
    const op2 = useTransform(scrollYProgress, [0.25, 0.32, 0.43, 0.50], [0, 1, 1, 0]);
    const y2 = useTransform(scrollYProgress, [0.25, 0.32, 0.43, 0.50], [60, 0, 0, -60]);
    const x2 = useTransform(scrollYProgress, [0.25, 0.32, 0.43, 0.50], [-40, 0, 0, -40]);

    /* ── Phase 3 : Health benefits  (50 % → 75 %) ───────────────── */
    const op3 = useTransform(scrollYProgress, [0.50, 0.57, 0.68, 0.75], [0, 1, 1, 0]);
    const y3 = useTransform(scrollYProgress, [0.50, 0.57, 0.68, 0.75], [60, 0, 0, -60]);
    const x3 = useTransform(scrollYProgress, [0.50, 0.57, 0.68, 0.75], [40, 0, 0, 40]);

    /* ── Phase 4 : Closing CTA  (75 % → 95 %) ──────────────────── */
    const op4 = useTransform(scrollYProgress, [0.75, 0.82, 0.90, 0.96], [0, 1, 1, 0]);
    const y4 = useTransform(scrollYProgress, [0.75, 0.82, 0.90, 0.96], [60, 0, 0, -60]);
    const s4 = useTransform(scrollYProgress, [0.75, 0.82, 0.90, 0.96], [0.92, 1, 1, 0.92]);

    return (
        <main className="w-full bg-black text-white font-sans">

            {/* ── Global Loading Screen ─────────────────────────────── */}
            <AnimatePresence>
                {!isLoaded && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                        className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black"
                    >
                        <Zap className="text-orange-500 fill-orange-500 mb-6 animate-pulse" size={48} />
                        <p className="mb-4 text-sm font-bold tracking-[0.3em] text-white/70 uppercase">
                            Loading experience
                        </p>
                        <div className="w-64 h-1.5 overflow-hidden rounded-full bg-white/10">
                            <div
                                className="h-full rounded-full bg-gradient-to-r from-amber-700 to-amber-500 transition-all duration-200 ease-out"
                                style={{ width: `${loadProgress}%` }}
                            />
                        </div>
                        <p className="mt-4 text-xs tabular-nums text-white/50 font-bold tracking-wider">
                            {loadProgress}%
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── Fixed Navbar ──────────────────────────────────────── */}
            <header className="fixed top-0 left-0 w-full z-[60] flex items-center justify-between px-6 md:px-10 py-4 bg-black/60 backdrop-blur-xl border-b border-white/5">

                {/* Left: Back + Logo */}
                <div className="flex items-center gap-3">
                    <a href="/" className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/60 transition-colors">
                        <ArrowLeft size={16} />
                    </a>
                    <div className="flex items-center gap-2">
                        <Zap className="text-orange-500 fill-orange-500" size={18} />
                        <span className="text-base font-black tracking-tight text-white">
                            Oreo <span className="text-amber-600">Choco</span>
                        </span>
                    </div>
                </div>

                {/* Center: Nav links */}
                <nav className="hidden md:flex gap-8 text-[11px] font-bold tracking-[0.2em] uppercase text-white/70">
                    <a href="#" className="text-white transition-colors">Home</a>
                    <a href="#shop" className="hover:text-orange-400 transition-colors">Products</a>
                    <a href="#" className="hover:text-orange-400 transition-colors">About</a>
                    <a href="/#contact" className="hover:text-orange-400 transition-colors">Contact</a>
                </nav>

                {/* Right: Cart + Order */}
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setShowCart(!showCart)}
                        className="relative w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:border-white/60 transition-colors"
                    >
                        <ShoppingCart size={16} />
                        {cartCount > 0 && (
                            <span className="absolute -top-1.5 -right-1.5 bg-orange-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                                {cartCount}
                            </span>
                        )}
                    </button>
                    <button className="hidden md:block bg-white text-black px-5 py-2.5 rounded-full text-[11px] font-bold tracking-[0.15em] uppercase hover:bg-orange-400 hover:text-white transition-colors">
                        Order Now
                    </button>
                </div>
            </header>

            {/* ── Cart Dropdown ─────────────────────────────────────── */}
            {showCart && (
                <div className="fixed top-20 right-6 md:right-10 z-[70] w-80 bg-white text-black rounded-2xl shadow-2xl border border-orange-100 overflow-hidden">
                    <div className="px-5 py-4 border-b border-orange-100 flex items-center justify-between">
                        <h4 className="font-bold text-lg">Your Cart</h4>
                        <button onClick={() => setShowCart(false)} className="text-xs text-gray-400 hover:text-black">Close</button>
                    </div>
                    {cart.length === 0 ? (
                        <div className="px-5 py-8 text-center text-gray-400 text-sm">Your cart is empty</div>
                    ) : (
                        <>
                            <ul className="divide-y divide-orange-50">
                                {cart.map((item) => (
                                    <li key={item.name} className="px-5 py-3 flex items-center justify-between">
                                        <div>
                                            <p className="font-semibold text-sm">{item.name}</p>
                                            <p className="text-xs text-gray-400">₹{item.price} × {item.qty}</p>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="font-bold text-sm">₹{item.price * item.qty}</span>
                                            <button onClick={() => removeFromCart(item.name)} className="text-[10px] text-red-400 hover:text-red-600 font-bold uppercase tracking-wider">Remove</button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <div className="px-5 py-4 border-t border-orange-100 flex items-center justify-between">
                                <span className="font-bold">Total: ₹{cartTotal}</span>
                                <button className="bg-orange-500 text-white px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-orange-600 transition-colors">Checkout</button>
                            </div>
                        </>
                    )}
                </div>
            )}

            {/* ================================================================
                SCROLLYTELLING SECTION — 600 vh tall scroll track
                The sticky inner container pins the canvas + overlays to the
                viewport while the user scrolls through.
            ================================================================ */}
            <div ref={containerRef} className="relative w-full" style={{ height: "600vh" }}>

                {/* ── Sticky viewport-sized container ──────────────── */}
                <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">

                    {/* Canvas (behind everything) — absolute so it fills the sticky container */}
                    <ChocoCanvas
                        scrollYProgress={scrollYProgress}
                        className="absolute top-0 left-0 w-full h-full z-0"
                        onLoadComplete={() => setIsLoaded(true)}
                        onLoadProgress={setLoadProgress}
                    />

                    {/* Subtle gradient overlays for text legibility */}
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-48 z-[1] bg-gradient-to-b from-black/60 via-black/20 to-transparent" />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 z-[1] bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                    {/* ── Nav arrows (decorative) ──────────────────── */}
                    <div className="absolute top-1/2 left-5 -translate-y-1/2 z-30 hidden md:block">
                        <button className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:border-white/60 transition-colors backdrop-blur-sm bg-white/5">
                            <ChevronLeft size={24} />
                        </button>
                    </div>
                    <div className="absolute top-1/2 right-5 -translate-y-1/2 z-30 hidden md:block">
                        <button className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:border-white/60 transition-colors backdrop-blur-sm bg-white/5">
                            <ChevronRight size={24} />
                        </button>
                    </div>

                    {/* ── Flavor pill selector (bottom) ────────────── */}
                    <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-30
                                    bg-black/40 backdrop-blur-xl rounded-full flex items-center p-1 border border-white/10 shadow-2xl">
                        <a href="/projects/beverages" className="px-5 md:px-7 py-2.5 text-white/60 hover:text-white rounded-full font-semibold text-xs tracking-wide transition-colors">
                            Mango Pandit
                        </a>
                        <button className="px-5 md:px-7 py-2.5 bg-white text-black rounded-full font-semibold text-xs tracking-wide">
                            Oreo Choco
                        </button>
                        <button className="px-5 md:px-7 py-2.5 text-white/60 hover:text-white rounded-full font-semibold text-xs tracking-wide transition-colors">
                            Ruby Pom
                        </button>
                    </div>

                    {/* ════════════════════════════════════════════════
                        TEXT OVERLAY PHASES
                        All absolutely positioned inside the sticky frame.
                        pointer-events-none so they don't block scrolling.
                    ════════════════════════════════════════════════ */}
                    <div className="absolute inset-0 z-20 pointer-events-none">

                        {/* ── Phase 1 : Hero ────────────────────────── */}
                        <motion.div
                            style={{ opacity: op1, y: y1, scale: s1 }}
                            className="absolute inset-0 pt-20 pb-28 md:pt-24 md:pb-32 flex flex-col items-center justify-center text-center px-4"
                        >
                            <div className="flex flex-col items-center">
                                <p className="text-[10px] md:text-xs font-bold tracking-[0.45em] uppercase mb-3 md:mb-4 text-white"
                                    style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
                                    Introducing
                                </p>
                                <h1 className="text-6xl sm:text-[7.5rem] md:text-[9.5rem] lg:text-[11rem] font-black tracking-[-0.04em] leading-[0.82]"
                                    style={{ color: '#fff', textShadow: '0 4px 30px rgba(0,0,0,0.5)' }}>
                                    <span className="block">Oreo</span>
                                    <span className="block">Choco</span>
                                </h1>
                                <p className="mt-5 md:mt-7 text-base md:text-xl lg:text-2xl font-light tracking-[0.06em] italic"
                                    style={{ color: 'rgba(255,255,255,0.75)', textShadow: '0 2px 12px rgba(0,0,0,0.4)' }}>
                                    Rich. Dark. Irresistible.
                                </p>
                                <div className="mt-8 md:mt-10 flex items-center gap-4 md:gap-6 rounded-2xl px-6 md:px-8 py-4 md:py-5 border"
                                    style={{
                                        background: 'linear-gradient(135deg, rgba(251,191,36,0.15) 0%, rgba(245,158,11,0.08) 100%)',
                                        borderColor: 'rgba(251,191,36,0.25)',
                                        backdropFilter: 'blur(16px)',
                                        boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)',
                                    }}>
                                    <span className="text-3xl md:text-4xl font-extrabold" style={{ color: '#d97706' }}>₹130</span>
                                    <div className="w-px h-12" style={{ background: 'rgba(217,119,6,0.3)' }} />
                                    <div className="text-[10px] md:text-xs font-bold text-left space-y-1 uppercase tracking-[0.18em]" style={{ color: 'rgba(255,255,255,0.6)' }}>
                                        <p>Real Cocoa</p>
                                        <p>Oreo Crumble</p>
                                        <p>Rich in Vitamin C</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* ── Phase 2 : Story (left-aligned) ────────── */}
                        <motion.div
                            style={{ opacity: op2, y: y2, x: x2 }}
                            className="absolute inset-0 flex items-center px-8 md:px-20 lg:px-32"
                        >
                            <div className="max-w-2xl">
                                <div className="flex items-center gap-3 mb-5">
                                    <div className="h-px w-8 bg-amber-400/60" />
                                    <p className="text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase" style={{ color: '#fbbf24' }}>
                                        The Story
                                    </p>
                                </div>
                                <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-[-0.03em] leading-[0.95]"
                                    style={{ textShadow: '0 4px 30px rgba(0,0,0,0.5)' }}>
                                    Decadent<br />
                                    <span style={{ color: '#d97706' }}>dark</span><br />
                                    cocoa.
                                </h2>
                                <p className="mt-6 text-base md:text-lg lg:text-xl font-light leading-relaxed max-w-md"
                                    style={{ color: 'rgba(255,255,255,0.6)', textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>
                                    Premium dark cocoa powder blended seamlessly with fresh dairy and crushed Oreo cookies, providing the ultimate chocolate rush.
                                </p>
                            </div>
                        </motion.div>

                        {/* ── Phase 3 : Benefits (right-aligned) ────── */}
                        <motion.div
                            style={{ opacity: op3, y: y3, x: x3 }}
                            className="absolute inset-0 flex items-center justify-end px-8 md:px-20 lg:px-32 text-right"
                        >
                            <div className="max-w-2xl">
                                <div className="flex items-center gap-3 mb-5 justify-end">
                                    <p className="text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase" style={{ color: '#34d399' }}>
                                        Health Benefits
                                    </p>
                                    <div className="h-px w-8 bg-emerald-400/60" />
                                </div>
                                <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-[-0.03em] leading-[0.95]"
                                    style={{ textShadow: '0 4px 30px rgba(0,0,0,0.5)' }}>
                                    <span style={{ color: '#d97706' }}>Comfort</span>-packed<br />indulgence.
                                </h2>
                                <p className="mt-6 text-base md:text-lg lg:text-xl font-light leading-relaxed max-w-md ml-auto"
                                    style={{ color: 'rgba(255,255,255,0.6)', textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>
                                    A natural energy boost packed with rich antioxidants that revitalises your body and mind — a pure guilt-free treat.
                                </p>
                                {/* Benefit pills */}
                                <div className="flex flex-wrap gap-2 mt-6 justify-end">
                                    {['Vitamin A', 'Vitamin C', 'Zero Sugar', 'No Preservatives'].map(b => (
                                        <span key={b} className="text-[10px] font-bold tracking-[0.15em] uppercase px-4 py-2 rounded-full border"
                                            style={{ borderColor: 'rgba(52,211,153,0.3)', color: '#34d399', background: 'rgba(52,211,153,0.08)', backdropFilter: 'blur(8px)' }}>
                                            {b}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        {/* ── Phase 4 : Closing CTA (centered) ──────── */}
                        <motion.div
                            style={{ opacity: op4, y: y4, scale: s4 }}
                            className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
                        >
                            <p className="text-[10px] md:text-xs font-bold tracking-[0.45em] uppercase mb-5" style={{ color: '#fb923c' }}>
                                Order Now
                            </p>
                            <h2 className="text-6xl md:text-8xl lg:text-[10rem] font-black tracking-[-0.04em] leading-[0.85]">
                                <span style={{ color: '#fff', textShadow: '0 4px 30px rgba(0,0,0,0.6)' }}>Taste the</span><br />
                                <span style={{
                                    color: '#fff',
                                    textShadow: '0 0 40px rgba(217,119,6,0.6), 0 0 80px rgba(217,119,6,0.3), 0 4px 20px rgba(0,0,0,0.5)',
                                    WebkitTextStroke: '2px #d97706',
                                }}>Decadence.</span>
                            </h2>
                            <p className="mt-5 text-base md:text-lg lg:text-xl font-medium max-w-lg"
                                style={{ color: '#fff', textShadow: '0 2px 16px rgba(0,0,0,0.6)' }}>
                                Available now in stores & online — delivered fresh to your doorstep.
                            </p>
                            <a href="#shop" className="pointer-events-auto mt-8 md:mt-10 inline-flex items-center gap-3 text-sm font-bold tracking-[0.15em] uppercase px-10 py-5 rounded-full transition-all duration-300 hover:scale-105"
                                style={{
                                    background: 'linear-gradient(135deg, #f97316 0%, #f59e0b 100%)',
                                    color: '#fff',
                                    boxShadow: '0 8px 30px rgba(249,115,22,0.4), 0 2px 8px rgba(0,0,0,0.2)',
                                }}>
                                <ShoppingCart size={16} />
                                Shop Now
                            </a>
                        </motion.div>

                    </div>{/* end overlay container */}
                </div>{/* end sticky */}
            </div>{/* end scroll track */}

            {/* ================================================================
                NORMAL CONTENT BELOW THE SCROLL ANIMATION
            ================================================================ */}
            <section id="shop" className="relative z-30 w-full py-24 md:py-32 px-6 md:px-8" style={{ background: 'linear-gradient(180deg, #1a1a1a 0%, #0d0d0d 50%, #1a1a1a 100%)' }}>

                {/* Section Header */}
                <div className="w-full max-w-7xl mx-auto mb-16 text-center">
                    <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-orange-400 mb-4">
                        ──  Our Products  ──
                    </p>
                    <h3 className="text-4xl md:text-6xl font-black tracking-tight leading-tight text-white">
                        Pick Your Flavor
                    </h3>
                    <p className="text-white/40 text-base md:text-lg mt-5 max-w-xl mx-auto leading-relaxed">
                        Handcrafted fruit beverages with zero preservatives. Choose your favorite and get it delivered fresh.
                    </p>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl mx-auto">

                    {/* Product Card 1 — Mango Pandit */}
                    <div className="relative bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-white/10 rounded-3xl p-6 md:p-8 flex flex-col items-center hover:border-orange-500/30 hover:shadow-[0_0_40px_rgba(249,115,22,0.08)] transition-all duration-500 group overflow-hidden">
                        {/* Bestseller badge */}
                        <div className="absolute top-5 left-5 bg-orange-500 text-white text-[9px] font-bold tracking-[0.15em] uppercase px-3 py-1.5 rounded-full">
                            Bestseller
                        </div>
                        <div className="w-full aspect-square max-w-[200px] rounded-2xl mb-6 flex items-center justify-center overflow-hidden" style={{ background: 'radial-gradient(circle at 50% 50%, rgba(251,146,60,0.15) 0%, transparent 70%)' }}>
                            <span className="text-7xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">🥭</span>
                        </div>
                        <div className="flex items-center gap-1 mb-2">
                            {'★★★★★'.split('').map((s, i) => <span key={i} className="text-orange-400 text-xs">{s}</span>)}
                            <span className="text-white/30 text-[10px] ml-1">(128)</span>
                        </div>
                        <h4 className="text-xl font-bold text-white mb-1">Mango Pandit</h4>
                        <p className="text-white/35 text-center text-sm mb-4 leading-relaxed">
                            Rich, velvety Alphonso mango nectar. Our signature blend.
                        </p>
                        <div className="flex gap-2 mb-5">
                            <span className="text-[9px] font-bold tracking-wider uppercase px-3 py-1 rounded-full border border-white/10 text-white/40">250ml</span>
                            <span className="text-[9px] font-bold tracking-wider uppercase px-3 py-1 rounded-full border border-orange-500/30 text-orange-400 bg-orange-500/10">500ml</span>
                            <span className="text-[9px] font-bold tracking-wider uppercase px-3 py-1 rounded-full border border-white/10 text-white/40">1L</span>
                        </div>
                        <div className="w-full flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                            <div>
                                <span className="text-2xl font-black text-white">₹120</span>
                                <span className="text-white/30 text-xs ml-1 line-through">₹150</span>
                            </div>
                            <button onClick={() => addToCart('Mango Pandit', 120)} className="bg-orange-500 hover:bg-orange-400 text-white px-6 py-2.5 rounded-full text-[10px] font-bold tracking-[0.15em] uppercase transition-colors cursor-pointer shadow-lg shadow-orange-500/20">
                                Add to Cart
                            </button>
                        </div>
                    </div>

                    {/* Product Card 2 — Dutch Choco */}
                    <div className="relative bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-white/10 rounded-3xl p-6 md:p-8 flex flex-col items-center hover:border-amber-500/30 hover:shadow-[0_0_40px_rgba(245,158,11,0.08)] transition-all duration-500 group overflow-hidden">
                        <div className="w-full aspect-square max-w-[200px] rounded-2xl mb-6 flex items-center justify-center overflow-hidden" style={{ background: 'radial-gradient(circle at 50% 50%, rgba(180,130,70,0.15) 0%, transparent 70%)' }}>
                            <span className="text-7xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">🍫</span>
                        </div>
                        <div className="flex items-center gap-1 mb-2">
                            {'★★★★'.split('').map((s, i) => <span key={i} className="text-amber-400 text-xs">{s}</span>)}
                            <span className="text-white/20 text-xs">★</span>
                            <span className="text-white/30 text-[10px] ml-1">(86)</span>
                        </div>
                        <h4 className="text-xl font-bold text-white mb-1">Aadarsh Pandit Oreo Choco</h4>
                        <p className="text-white/35 text-center text-sm mb-4 leading-relaxed">
                            Premium Dutch cocoa blended with rich oat milk and real Oreo crumble.
                        </p>
                        <div className="flex gap-2 mb-5">
                            <span className="text-[9px] font-bold tracking-wider uppercase px-3 py-1 rounded-full border border-white/10 text-white/40">250ml</span>
                            <span className="text-[9px] font-bold tracking-wider uppercase px-3 py-1 rounded-full border border-amber-500/30 text-amber-400 bg-amber-500/10">500ml</span>
                            <span className="text-[9px] font-bold tracking-wider uppercase px-3 py-1 rounded-full border border-white/10 text-white/40">1L</span>
                        </div>
                        <div className="w-full flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                            <div>
                                <span className="text-2xl font-black text-white">₹150</span>
                            </div>
                            <button onClick={() => addToCart('Aadarsh Pandit Oreo', 150)} className="bg-amber-600 hover:bg-amber-500 text-white px-6 py-2.5 rounded-full text-[10px] font-bold tracking-[0.15em] uppercase transition-colors cursor-pointer shadow-lg shadow-amber-600/20">
                                Add to Cart
                            </button>
                        </div>
                    </div>

                    {/* Product Card 3 — Ruby Pom */}
                    <div className="relative bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-white/10 rounded-3xl p-6 md:p-8 flex flex-col items-center hover:border-rose-500/30 hover:shadow-[0_0_40px_rgba(244,63,94,0.08)] transition-all duration-500 group overflow-hidden">
                        {/* New badge */}
                        <div className="absolute top-5 left-5 bg-rose-500 text-white text-[9px] font-bold tracking-[0.15em] uppercase px-3 py-1.5 rounded-full">
                            New
                        </div>
                        <div className="w-full aspect-square max-w-[200px] rounded-2xl mb-6 flex items-center justify-center overflow-hidden" style={{ background: 'radial-gradient(circle at 50% 50%, rgba(244,63,94,0.12) 0%, transparent 70%)' }}>
                            <span className="text-7xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">🍎</span>
                        </div>
                        <div className="flex items-center gap-1 mb-2">
                            {'★★★★★'.split('').map((s, i) => <span key={i} className="text-rose-400 text-xs">{s}</span>)}
                            <span className="text-white/30 text-[10px] ml-1">(42)</span>
                        </div>
                        <h4 className="text-xl font-bold text-white mb-1">Ruby Pom</h4>
                        <p className="text-white/35 text-center text-sm mb-4 leading-relaxed">
                            Antioxidant-rich pomegranate juice with a hint of mint.
                        </p>
                        <div className="flex gap-2 mb-5">
                            <span className="text-[9px] font-bold tracking-wider uppercase px-3 py-1 rounded-full border border-white/10 text-white/40">250ml</span>
                            <span className="text-[9px] font-bold tracking-wider uppercase px-3 py-1 rounded-full border border-rose-500/30 text-rose-400 bg-rose-500/10">500ml</span>
                            <span className="text-[9px] font-bold tracking-wider uppercase px-3 py-1 rounded-full border border-white/10 text-white/40">1L</span>
                        </div>
                        <div className="w-full flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                            <div>
                                <span className="text-2xl font-black text-white">₹140</span>
                                <span className="text-white/30 text-xs ml-1 line-through">₹170</span>
                            </div>
                            <button onClick={() => addToCart('Ruby Pom', 140)} className="bg-rose-500 hover:bg-rose-400 text-white px-6 py-2.5 rounded-full text-[10px] font-bold tracking-[0.15em] uppercase transition-colors cursor-pointer shadow-lg shadow-rose-500/20">
                                Add to Cart
                            </button>
                        </div>
                    </div>

                </div>

                {/* Trust strip */}
                <div className="mt-16 flex flex-wrap items-center justify-center gap-8 md:gap-14 text-white/25 text-[10px] font-bold tracking-[0.2em] uppercase">
                    <span>🚚 Free Delivery Over ₹500</span>
                    <span>🌿 100% Natural</span>
                    <span>⚡ Same-Day Dispatch</span>
                    <span>↩️ 7‑Day Returns</span>
                </div>
            </section>

            {/* ── Footer ───────────────────────────────────────────── */}
            <footer className="relative z-30 w-full bg-gray-950 text-white py-16 px-6 md:px-10">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
                        {/* Brand */}
                        <div className="md:col-span-1">
                            <div className="flex items-center gap-2 mb-4">
                                <Zap className="text-orange-500 fill-orange-500" size={18} />
                                <span className="text-lg font-black tracking-tight">
                                    Oreo <span className="text-amber-600">Choco</span>
                                </span>
                            </div>
                            <p className="text-white/40 text-sm leading-relaxed">
                                Crafting premium fruit beverages with love, straight from nature to your glass.
                            </p>
                            {/* Social Icons */}
                            <div className="flex gap-3 mt-5">
                                <a href="https://github.com/Aadarshttech" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-orange-400 hover:border-orange-400/50 transition-colors">
                                    <Github size={15} />
                                </a>
                                <a href="https://linkedin.com/in/aadarsh-pandit" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-orange-400 hover:border-orange-400/50 transition-colors">
                                    <Linkedin size={15} />
                                </a>
                                <a href="https://www.instagram.com/aadarsh_pandit17/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-orange-400 hover:border-orange-400/50 transition-colors">
                                    <Instagram size={15} />
                                </a>
                                <a href="https://twitter.com/aadarshapandit" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-orange-400 hover:border-orange-400/50 transition-colors">
                                    <Twitter size={15} />
                                </a>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h5 className="text-xs font-bold tracking-[0.2em] uppercase text-white/60 mb-4">Quick Links</h5>
                            <ul className="space-y-2 text-sm text-white/40">
                                <li><a href="/" className="hover:text-orange-400 transition-colors">Portfolio Home</a></li>
                                <li><a href="/works" className="hover:text-orange-400 transition-colors">My Works</a></li>
                                <li><a href="/blog" className="hover:text-orange-400 transition-colors">Blog</a></li>
                                <li><a href="/#contact" className="hover:text-orange-400 transition-colors">Contact</a></li>
                            </ul>
                        </div>

                        {/* Connect */}
                        <div>
                            <h5 className="text-xs font-bold tracking-[0.2em] uppercase text-white/60 mb-4">Connect</h5>
                            <ul className="space-y-2 text-sm text-white/40">
                                <li><a href="mailto:aadarshapandit@gmail.com" className="hover:text-orange-400 transition-colors">aadarshapandit@gmail.com</a></li>
                                <li><a href="https://wa.me/9779860334317" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition-colors">WhatsApp</a></li>
                                <li><a href="https://aadarshapandit.com.np" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition-colors">aadarshapandit.com.np</a></li>
                            </ul>
                        </div>

                        {/* Newsletter */}
                        <div>
                            <h5 className="text-xs font-bold tracking-[0.2em] uppercase text-white/60 mb-4">Stay Fresh</h5>
                            <p className="text-white/40 text-sm mb-4">Get updates on new flavors and exclusive offers.</p>
                            <div className="flex">
                                <input
                                    type="email"
                                    placeholder="your@email.com"
                                    className="flex-1 bg-white/5 border border-white/10 rounded-l-full px-4 py-2.5 text-sm text-white placeholder:text-white/30 outline-none focus:border-orange-400 transition-colors"
                                />
                                <button className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-r-full text-xs font-bold uppercase tracking-wider transition-colors">
                                    Join
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Bottom bar */}
                    <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-white/30 text-xs">
                            &copy; {new Date().getFullYear()} Aadarsh Pandit. All rights reserved.
                        </p>
                        <div className="flex gap-6 text-white/30 text-xs">
                            <a href="https://aadarshapandit.com.np" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition-colors">Main Website</a>
                            <a href="https://github.com/Aadarshttech" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition-colors">GitHub</a>
                            <a href="/" className="hover:text-orange-400 transition-colors">Back to Portfolio</a>
                        </div>
                    </div>
                </div>
            </footer>

            {/* ── "Added to Cart" Toast ───────────────────────────── */}
            <AnimatePresence>
                {toast && (
                    <motion.div
                        initial={{ opacity: 0, y: 40, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.25 }}
                        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[80] flex items-center gap-3 bg-gray-900 text-white pl-4 pr-6 py-3 rounded-full shadow-2xl border border-white/10"
                    >
                        <div className="w-7 h-7 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                            <Check size={14} className="text-white" />
                        </div>
                        <span className="text-sm font-semibold">{toast} added to cart!</span>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}
