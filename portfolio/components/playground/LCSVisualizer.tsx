"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Types ───────────────────────────────────────────────────────────────────
interface BacktrackCell {
    row: number;
    col: number;
    matched: boolean;
}

type Status = "idle" | "stepping" | "running" | "done";

// ─── Constants ───────────────────────────────────────────────────────────────
const MAX_RENDER_CELLS = 250_000;
const EXAMPLES = [
    { x: "ABCBDAB", y: "BDCAB", label: "Classic" },
    { x: "GXTXAYB", y: "AGGTAB", label: "Textbook" },
    { x: "HUMAN", y: "CHIMPANZEE", label: "Biology" },
];

// ─── Tooltip ─────────────────────────────────────────────────────────────────
function Tooltip({
    text,
    children,
    dark,
}: {
    text: string;
    children: React.ReactNode;
    dark?: boolean;
}) {
    return (
        <span className="relative group inline-flex items-center">
            {children}
            <span
                className={`pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap z-50 shadow-lg max-w-xs ${dark
                        ? "text-gray-200 bg-gray-800 border border-gray-700"
                        : "text-white bg-gray-900 border border-gray-700"
                    }`}
            >
                {text}
            </span>
        </span>
    );
}

function InfoBadge({ text, dark }: { text: string; dark?: boolean }) {
    return (
        <Tooltip text={text} dark={dark}>
            <span
                className={`inline-flex items-center justify-center w-4 h-4 ml-1 text-[10px] font-bold rounded-full cursor-help select-none border transition-all duration-500 ${dark
                        ? "text-violet-300 bg-violet-500/20 border-violet-500/30"
                        : "text-indigo-600 bg-indigo-100 border-indigo-200"
                    }`}
            >
                ?
            </span>
        </Tooltip>
    );
}

// ─── Theme Toggle Icon ──────────────────────────────────────────────────────
function ThemeToggle({
    dark,
    toggle,
}: {
    dark: boolean;
    toggle: () => void;
}) {
    return (
        <button
            onClick={toggle}
            className={`relative w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 active:scale-90 ${dark
                    ? "bg-gray-800 border border-gray-700 hover:bg-gray-700 text-yellow-400"
                    : "bg-gray-100 border border-gray-200 hover:bg-gray-200 text-gray-700"
                }`}
            aria-label="Toggle theme"
        >
            {dark ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="5" />
                    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                </svg>
            ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
            )}
        </button>
    );
}

// ─── Main Component ─────────────────────────────────────────────────────────
export default function LCSVisualizer() {
    // Theme
    const [dark, setDark] = useState(true);

    // Inputs
    const [seqX, setSeqX] = useState("");
    const [seqY, setSeqY] = useState("");

    // Force-render trick
    const [, forceRender] = useState(0);
    const kick = useCallback(() => forceRender((c) => c + 1), []);

    // Algorithm refs
    const dpRef = useRef<number[][]>([]);
    const mRef = useRef(0);
    const nRef = useRef(0);
    const stepRowRef = useRef(0);
    const stepColRef = useRef(0);
    const statusRef = useRef<Status>("idle");

    // Results
    const [lcsString, setLcsString] = useState("");
    const [backtrackPath, setBacktrackPath] = useState<BacktrackCell[]>([]);
    const [matchedX, setMatchedX] = useState<Set<number>>(new Set());
    const [matchedY, setMatchedY] = useState<Set<number>>(new Set());
    const [computeTimeMs, setComputeTimeMs] = useState(0);

    // Animation
    const [speed, setSpeed] = useState(80);
    const animRef = useRef<number | null>(null);
    const lastStepRef = useRef(0);
    const speedRef = useRef(speed);

    // UI
    const [howOpen, setHowOpen] = useState(false);
    const [showExamples, setShowExamples] = useState(false);

    useEffect(() => { speedRef.current = speed; }, [speed]);

    // Derived
    const dp = dpRef.current;
    const m = mRef.current;
    const n = nRef.current;
    const stepRow = stepRowRef.current;
    const stepCol = stepColRef.current;
    const status = statusRef.current;
    const tooLarge = m * n > MAX_RENDER_CELLS && m > 0 && n > 0;

    // ─── Algorithm ────────────────────────────────────────────────────────────
    const initDP = useCallback((x: string, y: string) => {
        const rows = x.length, cols = y.length;
        mRef.current = rows;
        nRef.current = cols;
        const table: number[][] = Array.from({ length: rows + 1 }, () => new Array(cols + 1).fill(0));
        dpRef.current = table;
        stepRowRef.current = 1;
        stepColRef.current = 1;
        setLcsString("");
        setBacktrackPath([]);
        setMatchedX(new Set());
        setMatchedY(new Set());
        setComputeTimeMs(0);
        kick();
        return { table, rows, cols };
    }, [kick]);

    const computeCell = (t: number[][], i: number, j: number, x: string, y: string) => {
        t[i][j] = x[i - 1] === y[j - 1] ? t[i - 1][j - 1] + 1 : Math.max(t[i - 1][j], t[i][j - 1]);
    };

    const doBacktrack = useCallback((table: number[][], x: string, y: string, rows: number, cols: number) => {
        const path: BacktrackCell[] = [];
        const mxS = new Set<number>(), myS = new Set<number>();
        let lcs = "", i = rows, j = cols;
        while (i > 0 && j > 0) {
            if (x[i - 1] === y[j - 1]) {
                path.push({ row: i, col: j, matched: true });
                lcs = x[i - 1] + lcs; mxS.add(i - 1); myS.add(j - 1); i--; j--;
            } else if (table[i - 1][j] >= table[i][j - 1]) {
                path.push({ row: i, col: j, matched: false }); i--;
            } else {
                path.push({ row: i, col: j, matched: false }); j--;
            }
        }
        path.reverse();
        setBacktrackPath(path); setMatchedX(mxS); setMatchedY(myS); setLcsString(lcs);
    }, []);

    const handleReset = useCallback(() => {
        if (animRef.current) cancelAnimationFrame(animRef.current);
        animRef.current = null;
        dpRef.current = []; mRef.current = 0; nRef.current = 0;
        stepRowRef.current = 0; stepColRef.current = 0; statusRef.current = "idle";
        setLcsString(""); setBacktrackPath([]); setMatchedX(new Set()); setMatchedY(new Set()); setComputeTimeMs(0);
        kick();
    }, [kick]);

    const handleComputeAll = useCallback(() => {
        if (!seqX || !seqY) return;
        if (animRef.current) cancelAnimationFrame(animRef.current);
        animRef.current = null;
        const t0 = performance.now();
        const { table, rows, cols } = initDP(seqX, seqY);
        for (let i = 1; i <= rows; i++) for (let j = 1; j <= cols; j++) computeCell(table, i, j, seqX, seqY);
        const t1 = performance.now();
        stepRowRef.current = rows + 1; stepColRef.current = cols + 1;
        statusRef.current = "done"; setComputeTimeMs(t1 - t0);
        doBacktrack(table, seqX, seqY, rows, cols); kick();
    }, [seqX, seqY, initDP, doBacktrack, kick]);

    const stepOnce = useCallback((): boolean => {
        const table = dpRef.current, rows = mRef.current, cols = nRef.current;
        const r = stepRowRef.current, c = stepColRef.current;
        if (r > rows) return false;
        computeCell(table, r, c, seqX, seqY);
        let nr = r, nc = c + 1;
        if (nc > cols) { nr++; nc = 1; }
        stepRowRef.current = nr; stepColRef.current = nc;
        if (nr > rows) { statusRef.current = "done"; setComputeTimeMs(-1); doBacktrack(table, seqX, seqY, rows, cols); kick(); return false; }
        kick(); return true;
    }, [seqX, seqY, doBacktrack, kick]);

    const handleStep = useCallback(() => {
        if (statusRef.current === "idle" || statusRef.current === "done") {
            if (!seqX || !seqY) return;
            if (animRef.current) cancelAnimationFrame(animRef.current); animRef.current = null;
            initDP(seqX, seqY); statusRef.current = "stepping"; kick(); return;
        }
        if (statusRef.current === "running") {
            if (animRef.current) cancelAnimationFrame(animRef.current); animRef.current = null;
            statusRef.current = "stepping"; kick();
        }
        stepOnce();
    }, [seqX, seqY, initDP, stepOnce, kick]);

    const animLoop = useCallback((ts: number) => {
        if (statusRef.current !== "running") return;
        if (ts - lastStepRef.current >= speedRef.current) { lastStepRef.current = ts; if (!stepOnce()) return; }
        animRef.current = requestAnimationFrame(animLoop);
    }, [stepOnce]);

    const handleAutoRun = useCallback(() => {
        if (statusRef.current === "running") {
            if (animRef.current) cancelAnimationFrame(animRef.current); animRef.current = null;
            statusRef.current = "stepping"; kick(); return;
        }
        if (statusRef.current === "idle" || statusRef.current === "done") { if (!seqX || !seqY) return; initDP(seqX, seqY); }
        statusRef.current = "running"; lastStepRef.current = 0; kick();
        animRef.current = requestAnimationFrame(animLoop);
    }, [seqX, seqY, initDP, animLoop, kick]);

    const handleExample = useCallback((ex: (typeof EXAMPLES)[0]) => { handleReset(); setSeqX(ex.x); setSeqY(ex.y); setShowExamples(false); }, [handleReset]);

    useEffect(() => () => { if (animRef.current) cancelAnimationFrame(animRef.current); }, []);

    // ─── Cell helpers ─────────────────────────────────────────────────────────
    const backtrackSet = new Set(backtrackPath.map((c) => `${c.row}-${c.col}`));
    const matchedCellSet = new Set(backtrackPath.filter((c) => c.matched).map((c) => `${c.row}-${c.col}`));

    const isFilled = (i: number, j: number) => {
        if (status === "done" || i === 0 || j === 0) return true;
        return i < stepRow || (i === stepRow && j < stepCol);
    };
    const isCurrent = (i: number, j: number) => (status === "stepping" || status === "running") && i === stepRow && j === stepCol;

    const getCellClass = (i: number, j: number) => {
        if (isCurrent(i, j))
            return dark
                ? "bg-cyan-400 text-gray-950 ring-2 ring-cyan-300 shadow-lg shadow-cyan-500/40 scale-110 z-10 font-bold"
                : "bg-cyan-400 text-gray-900 ring-2 ring-cyan-300 shadow-lg shadow-cyan-400/30 scale-110 z-10 font-bold";
        if (status === "done" && matchedCellSet.has(`${i}-${j}`))
            return dark
                ? "bg-emerald-500 text-white font-bold ring-2 ring-emerald-400/50 shadow-md shadow-emerald-500/30"
                : "bg-emerald-500 text-white font-bold ring-2 ring-emerald-300 shadow-md shadow-emerald-400/20";
        if (status === "done" && backtrackSet.has(`${i}-${j}`))
            return dark
                ? "bg-amber-500/80 text-gray-950 font-semibold ring-1 ring-amber-400/40"
                : "bg-amber-400/80 text-gray-900 ring-1 ring-amber-300";
        if (!isFilled(i, j))
            return dark ? "bg-gray-800/40 text-gray-600 transition-all duration-300" : "bg-gray-100/50 text-gray-300 transition-all duration-300";
        return dark ? "bg-gray-800/60 text-gray-300 transition-all duration-300" : "bg-white text-gray-700 transition-all duration-300";
    };

    // ─── Theme-aware style helpers ────────────────────────────────────────────
    const bg = dark ? "bg-gray-950 text-gray-100" : "bg-gray-50 text-gray-900";
    const headerBg = dark ? "border-gray-800/60 bg-gray-950/80" : "border-gray-200/60 bg-white/80";
    const cardBg = dark
        ? "bg-gray-900/60 backdrop-blur-md border-gray-800/60 shadow-xl shadow-black/20"
        : "bg-white border-gray-200/60 shadow-sm";
    const inputCls = dark
        ? "border-gray-700/60 bg-gray-800/50 text-gray-200 placeholder:text-gray-600 focus:ring-violet-500/50 focus:border-violet-500/30"
        : "border-gray-200 bg-gray-50/50 text-gray-900 placeholder:text-gray-400 focus:ring-indigo-400 focus:border-transparent";
    const btnPrimary = dark
        ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg shadow-violet-600/25 hover:shadow-violet-600/40"
        : "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md hover:shadow-lg hover:shadow-indigo-300/40";
    const btnSecondary = dark
        ? "bg-gray-800/80 border border-gray-700/60 text-gray-300 hover:bg-gray-700/80 hover:border-gray-600"
        : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300";
    const accentText = dark ? "from-violet-400 via-purple-400 to-cyan-400" : "from-indigo-600 to-purple-600";

    // ─── Render ───────────────────────────────────────────────────────────────
    return (
        <div className={`min-h-screen ${bg} selection:bg-violet-500/30 overflow-x-hidden transition-all duration-500 ease-in-out`}>
            {/* Animated background — dark only */}
            <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
                <div className={`absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] rounded-full blur-[120px] transition-all duration-1000 ease-in-out ${dark ? "bg-violet-600/8 opacity-100" : "bg-indigo-400/5 opacity-40 animate-pulse"}`} />
                <div className={`absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] rounded-full blur-[120px] transition-all duration-1000 ease-in-out ${dark ? "bg-cyan-600/8 opacity-100" : "bg-purple-400/5 opacity-40 animate-pulse"}`} style={{ animationDelay: "2s" }} />
            </div>

            {/* Header */}
            <header className={`border-b ${headerBg} backdrop-blur-xl sticky top-0 z-40 transition-all duration-500 ease-in-out`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <a href="/playground" className={`text-sm transition-colors duration-300 ${dark ? "text-gray-500 hover:text-violet-400" : "text-gray-500 hover:text-indigo-600"}`}>
                            ← Playground
                        </a>
                        <span className={`transition-colors duration-500 ${dark ? "text-gray-700" : "text-gray-300"}`}>/</span>
                        <h1 className={`text-lg sm:text-xl font-bold font-heading bg-gradient-to-r ${accentText} bg-clip-text text-transparent`}>
                            LCS Algorithm
                        </h1>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className={`hidden sm:inline text-[11px] px-2.5 py-1 rounded-full border transition-all duration-500 ${dark ? "text-gray-500 bg-gray-800/80 border-gray-700/50" : "text-gray-500 bg-gray-100 border-gray-200"}`}>
                            Dynamic Programming
                        </span>
                        <InfoBadge text="Longest Common Subsequence — finds the longest sequence appearing in both strings in the same order." dark={dark} />
                        <ThemeToggle dark={dark} toggle={() => setDark((d) => !d)} />
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
                {/* Intro */}
                <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
                    <p className={`transition-colors duration-500 ${dark ? "text-gray-400 leading-relaxed" : "text-gray-600 leading-relaxed"}`}>
                        The <strong className={`transition-colors duration-500 ${dark ? "text-gray-200" : "text-gray-800"}`}>Longest Common Subsequence (LCS)</strong> problem finds the longest sequence of characters common to two strings, preserving order but not contiguity. Solved with <strong className={`transition-colors duration-500 ${dark ? "text-gray-200" : "text-gray-800"}`}>bottom-up DP</strong> in O(m×n) time.
                    </p>
                </motion.section>

                {/* Input Card */}
                <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className={`rounded-2xl border p-6 space-y-5 transition-all duration-500 ${cardBg}`}>
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                            <label className={`block text-sm font-semibold mb-1.5 transition-colors duration-500 ${dark ? "text-gray-300" : "text-gray-700"}`}>Sequence X</label>
                            <input
                                id="seq-x-input" type="text" value={seqX}
                                onChange={(e) => { if (statusRef.current !== "idle") handleReset(); setSeqX(e.target.value); }}
                                placeholder="e.g. ABCBDAB"
                                className={`w-full rounded-xl border px-4 py-2.5 text-sm font-mono focus:outline-none focus:ring-2 transition-all duration-500 ${inputCls}`}
                            />
                            {status === "done" && seqX && (
                                <div className="mt-2 flex flex-wrap gap-0.5 font-mono text-sm">
                                    {seqX.split("").map((ch, idx) => (
                                        <span key={idx} className={`px-1.5 py-0.5 rounded transition-all duration-500 ${matchedX.has(idx)
                                                ? dark ? "bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30" : "bg-emerald-100 text-emerald-700 font-bold"
                                                : dark ? "text-gray-600" : "text-gray-400"
                                            }`}>{ch}</span>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div>
                            <label className={`block text-sm font-semibold mb-1.5 transition-colors duration-500 ${dark ? "text-gray-300" : "text-gray-700"}`}>Sequence Y</label>
                            <input
                                id="seq-y-input" type="text" value={seqY}
                                onChange={(e) => { if (statusRef.current !== "idle") handleReset(); setSeqY(e.target.value); }}
                                placeholder="e.g. BDCAB"
                                className={`w-full rounded-xl border px-4 py-2.5 text-sm font-mono focus:outline-none focus:ring-2 transition-all duration-500 ${inputCls}`}
                            />
                            {status === "done" && seqY && (
                                <div className="mt-2 flex flex-wrap gap-0.5 font-mono text-sm">
                                    {seqY.split("").map((ch, idx) => (
                                        <span key={idx} className={`px-1.5 py-0.5 rounded transition-all duration-500 ${matchedY.has(idx)
                                                ? dark ? "bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30" : "bg-emerald-100 text-emerald-700 font-bold"
                                                : dark ? "text-gray-600" : "text-gray-400"
                                            }`}>{ch}</span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="flex flex-wrap items-center gap-3">
                        <button id="compute-btn" onClick={handleComputeAll} disabled={!seqX || !seqY || status === "running"}
                            className={`px-5 py-2.5 text-sm font-semibold rounded-xl hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-500 active:scale-95 ${btnPrimary}`}>
                            ⚡ Compute LCS
                        </button>
                        <button id="step-btn" onClick={handleStep} disabled={!seqX || !seqY || status === "done"}
                            className={`px-4 py-2.5 text-sm font-semibold rounded-xl disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-500 active:scale-95 ${btnSecondary}`}>
                            👣 Step
                        </button>
                        <button id="autorun-btn" onClick={handleAutoRun} disabled={!seqX || !seqY || status === "done"}
                            className={`px-4 py-2.5 text-sm font-semibold rounded-xl transition-all duration-500 active:scale-95 ${status === "running"
                                    ? "bg-amber-500 text-gray-950 shadow-lg shadow-amber-500/25 hover:bg-amber-400"
                                    : `${btnSecondary} disabled:opacity-40 disabled:cursor-not-allowed`
                                }`}>
                            {status === "running" ? "⏸ Pause" : "▶ Auto-run"}
                        </button>
                        <button id="reset-btn" onClick={() => { handleReset(); setSeqX(""); setSeqY(""); }}
                            className={`px-4 py-2.5 text-sm font-semibold rounded-xl transition-all duration-500 active:scale-95 ${dark
                                    ? "bg-gray-800/80 border border-gray-700/60 text-red-400 hover:bg-red-500/10 hover:border-red-500/30"
                                    : "bg-white border border-gray-200 text-red-500 hover:bg-red-50 hover:border-red-200"
                                }`}>
                            ↺ Reset
                        </button>

                        {/* Example dropdown — opens UPWARD */}
                        <div className="relative">
                            <button id="example-btn" onClick={() => setShowExamples(!showExamples)}
                                className={`px-4 py-2.5 text-sm font-semibold rounded-xl transition-all duration-500 active:scale-95 ${btnSecondary}`}>
                                📝 Example
                            </button>
                            <AnimatePresence>
                                {showExamples && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 4, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 4, scale: 0.95 }}
                                        className={`absolute bottom-full mb-2 left-0 rounded-xl shadow-2xl border py-1.5 z-50 min-w-[280px] transition-all duration-500 ${dark ? "bg-gray-900 border-gray-700/60 backdrop-blur-xl" : "bg-white border-gray-200 shadow-xl"
                                            }`}
                                    >
                                        {EXAMPLES.map((ex) => (
                                            <button key={ex.label} onClick={() => handleExample(ex)}
                                                className={`w-full text-left px-4 py-2.5 text-sm transition-colors duration-300 ${dark ? "hover:bg-violet-500/10" : "hover:bg-indigo-50"
                                                    }`}>
                                                <span className={`font-mono font-medium ${dark ? "text-violet-400" : "text-indigo-600"}`}>{ex.x}</span>
                                                <span className={`mx-1.5 ${dark ? "text-gray-600" : "text-gray-400"}`}>/</span>
                                                <span className={`font-mono font-medium ${dark ? "text-cyan-400" : "text-purple-600"}`}>{ex.y}</span>
                                                <span className={`text-xs ml-2 ${dark ? "text-gray-600" : "text-gray-400"}`}>({ex.label})</span>
                                            </button>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Speed slider */}
                        {(status === "running" || status === "stepping") && (
                            <div className="flex items-center gap-2 ml-auto">
                                <span className={`text-xs transition-colors duration-500 ${dark ? "text-gray-500" : "text-gray-500"}`}>Speed</span>
                                <input type="range" min={10} max={500} value={510 - speed} onChange={(e) => setSpeed(510 - Number(e.target.value))}
                                    className={`w-24 transition-all duration-500 ${dark ? "accent-violet-500" : "accent-indigo-500"}`} />
                                <span className={`text-xs w-12 tabular-nums font-mono transition-colors duration-500 ${dark ? "text-gray-500" : "text-gray-400"}`}>{speed}ms</span>
                            </div>
                        )}
                    </div>
                </motion.section>

                {/* Results */}
                <AnimatePresence>
                    {status === "done" && (
                        <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
                            className="grid sm:grid-cols-4 gap-4">
                            <div className={`rounded-2xl border p-5 text-center shadow-lg transition-all duration-500 ${cardBg}`}>
                                <p className={`text-[11px] font-medium uppercase tracking-wider mb-1 transition-colors duration-500 ${dark ? "text-gray-500" : "text-gray-400"}`}>LCS Length</p>
                                <p className={`text-4xl font-bold bg-gradient-to-r ${accentText} bg-clip-text text-transparent`}>{lcsString.length}</p>
                            </div>
                            <div className={`rounded-2xl border p-5 text-center sm:col-span-2 shadow-lg transition-all duration-500 ${cardBg}`}>
                                <p className={`text-[11px] font-medium uppercase tracking-wider mb-1 transition-colors duration-500 ${dark ? "text-gray-500" : "text-gray-400"}`}>
                                    LCS String <InfoBadge text="One possible LCS. There may be others of the same length." dark={dark} />
                                </p>
                                <p className="text-2xl font-bold font-mono text-emerald-500 tracking-widest">{lcsString || "∅"}</p>
                            </div>
                            <div className={`rounded-2xl border p-5 text-center shadow-lg transition-all duration-500 ${cardBg}`}>
                                <p className={`text-[11px] font-medium uppercase tracking-wider mb-1 transition-colors duration-500 ${dark ? "text-gray-500" : "text-gray-400"}`}>Table Size</p>
                                <p className={`text-sm transition-colors duration-500 ${dark ? "text-gray-400" : "text-gray-600"}`}>
                                    <span className={`font-mono font-bold transition-colors duration-500 ${dark ? "text-gray-200" : "text-gray-800"}`}>{m}</span>
                                    <span className={`transition-colors duration-500 ${dark ? "text-gray-600" : "text-gray-400"}`}> × </span>
                                    <span className={`font-mono font-bold transition-colors duration-500 ${dark ? "text-gray-200" : "text-gray-800"}`}>{n}</span>
                                    <span className={`transition-colors duration-500 ${dark ? "text-gray-600" : "text-gray-400"}`}> = </span>
                                    <span className={`font-mono font-bold transition-colors duration-500 ${dark ? "text-violet-400" : "text-indigo-600"}`}>{(m * n).toLocaleString()}</span>
                                </p>
                                {computeTimeMs > 0 && <p className={`text-xs mt-1 font-mono transition-colors duration-500 ${dark ? "text-gray-600" : "text-gray-400"}`}>{computeTimeMs.toFixed(1)}ms</p>}
                                <p className={`text-[11px] mt-0.5 transition-colors duration-500 ${dark ? "text-gray-600" : "text-gray-400"}`}>O(m×n) time &amp; space</p>
                            </div>
                        </motion.section>
                    )}
                </AnimatePresence>

                {/* DP Table */}
                {dp.length > 0 && (
                    <section className="space-y-3">
                        <div className="flex items-center gap-2">
                            <h2 className={`text-lg font-bold font-heading transition-colors duration-500 ${dark ? "text-gray-200" : "text-gray-800"}`}>DP Table</h2>
                            <InfoBadge text="Each cell c[i][j] stores the LCS length of X[1..i] and Y[1..j]." dark={dark} />
                            {status !== "idle" && status !== "done" && (
                                <span className="text-xs bg-cyan-500/15 text-cyan-500 px-2.5 py-0.5 rounded-full font-medium border border-cyan-500/20 animate-pulse">
                                    Cell ({stepRow}, {stepCol})
                                </span>
                            )}
                        </div>
                        {tooLarge ? (
                            <div className={`rounded-2xl p-6 text-center space-y-2 border transition-all duration-500 ${dark ? "bg-amber-500/10 border-amber-500/20" : "bg-amber-50 border-amber-200"}`}>
                                <p className="text-amber-500 font-semibold text-lg">⚠ Table too large to render</p>
                                <p className={`text-sm max-w-md mx-auto transition-colors duration-500 ${dark ? "text-amber-400/60" : "text-amber-700/70"}`}>
                                    <span className="font-mono font-bold">{(m * n).toLocaleString()}</span> cells (m={m}, n={n}) exceeds the 250K limit. LCS was still computed above.
                                </p>
                            </div>
                        ) : (
                            <div className={`overflow-x-auto rounded-2xl border shadow-lg transition-all duration-500 ${dark ? "border-gray-800/60 bg-gray-900/40 backdrop-blur-md shadow-black/20" : "border-gray-200/60 bg-white shadow-sm"}`}>
                                <div className="p-4 min-w-fit">
                                    <div className="grid gap-[2px]" style={{ gridTemplateColumns: `40px repeat(${n + 1}, minmax(36px, 1fr))` }}>
                                        <div className="h-9" />
                                        <div className={`h-9 flex items-center justify-center text-[10px] font-mono transition-colors duration-500 ${dark ? "text-gray-600" : "text-gray-400"}`}>ε</div>
                                        {seqY.split("").map((ch, j) => (
                                            <div key={j} className={`h-9 flex items-center justify-center text-xs font-mono font-bold rounded-lg transition-all duration-500 ${status === "done" && matchedY.has(j)
                                                    ? dark ? "text-emerald-400 bg-emerald-500/10" : "text-emerald-600 bg-emerald-50"
                                                    : dark ? "text-cyan-400 bg-cyan-500/5" : "text-purple-600 bg-purple-50/50"
                                                }`}>{ch}</div>
                                        ))}
                                        {dp.map((row, i) => (
                                            <React.Fragment key={i}>
                                                <div className={`h-9 flex items-center justify-center text-xs font-mono font-bold rounded-lg transition-all duration-500 ${i === 0
                                                        ? dark ? "text-gray-600" : "text-gray-400"
                                                        : status === "done" && matchedX.has(i - 1)
                                                            ? dark ? "text-emerald-400 bg-emerald-500/10" : "text-emerald-600 bg-emerald-50"
                                                            : dark ? "text-violet-400 bg-violet-500/5" : "text-indigo-600 bg-indigo-50/50"
                                                    }`}>{i === 0 ? "ε" : seqX[i - 1]}</div>
                                                {row.map((val, j) => (
                                                    <div key={j} className={`h-9 flex items-center justify-center text-xs font-mono rounded-lg transition-all duration-150 ${getCellClass(i, j)}`}>
                                                        {isFilled(i, j) ? val : ""}
                                                    </div>
                                                ))}
                                            </React.Fragment>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                        {status === "done" && !tooLarge && (
                            <div className={`flex flex-wrap gap-4 text-xs transition-colors duration-500 ${dark ? "text-gray-500" : "text-gray-500"}`}>
                                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-emerald-500 inline-block" /> Match</span>
                                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-amber-500/80 inline-block" /> Backtrack path</span>
                                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-cyan-400 inline-block" /> Current cell</span>
                            </div>
                        )}
                    </section>
                )}

                {/* How it works */}
                <section className={`rounded-2xl border overflow-hidden shadow-lg transition-all duration-500 ${cardBg}`}>
                    <button id="how-it-works-toggle" onClick={() => setHowOpen(!howOpen)}
                        className={`w-full px-6 py-4 flex items-center justify-between text-left transition-all duration-500 ${dark ? "hover:bg-gray-800/30" : "hover:bg-gray-50/50"}`}>
                        <h2 className={`text-lg font-bold font-heading flex items-center gap-2 transition-colors duration-500 ${dark ? "text-gray-200" : "text-gray-800"}`}>
                            📖 How It Works
                            <InfoBadge text="Full DP recurrence and pseudocode" dark={dark} />
                        </h2>
                        <span className={`transition-all duration-500 ${howOpen ? "rotate-180" : ""} ${dark ? "text-gray-500" : "text-gray-400"}`}>▼</span>
                    </button>
                    <AnimatePresence>
                        {howOpen && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
                                <div className="px-6 pb-6 space-y-5">
                                    <div className="space-y-3">
                                        <h3 className={`text-sm font-bold transition-colors duration-500 ${dark ? "text-gray-300" : "text-gray-700"}`}>The Recurrence</h3>
                                        <p className={`text-sm leading-relaxed transition-colors duration-500 ${dark ? "text-gray-400" : "text-gray-600"}`}>
                                            Given <code className={`px-1.5 py-0.5 rounded text-xs font-mono border transition-all duration-500 ${dark ? "bg-gray-800 text-violet-400 border-gray-700/50" : "bg-gray-100 text-indigo-600 border-gray-200"}`}>X[1..m]</code> and{" "}
                                            <code className={`px-1.5 py-0.5 rounded text-xs font-mono border transition-all duration-500 ${dark ? "bg-gray-800 text-cyan-400 border-gray-700/50" : "bg-gray-100 text-purple-600 border-gray-200"}`}>Y[1..n]</code>,
                                            build table <code className={`px-1.5 py-0.5 rounded text-xs font-mono border transition-all duration-500 ${dark ? "bg-gray-800 text-gray-300 border-gray-700/50" : "bg-gray-100 text-gray-700 border-gray-200"}`}>c[0..m][0..n]</code> where{" "}
                                            <code className={`px-1.5 py-0.5 rounded text-xs font-mono border transition-all duration-500 ${dark ? "bg-gray-800 text-gray-300 border-gray-700/50" : "bg-gray-100 text-gray-700 border-gray-200"}`}>c[i][j]</code> = LCS length of X[1..i] and Y[1..j].
                                        </p>
                                    </div>
                                    <pre className={`rounded-xl p-5 text-sm font-mono leading-relaxed overflow-x-auto border transition-all duration-500 ${dark ? "bg-gray-950 text-gray-300 border-gray-800/60" : "bg-gray-900 text-gray-100 border-gray-700"}`}>
                                        <code>{`// Base cases
c[i][0] = 0    for all i
c[0][j] = 0    for all j

// Recurrence
for i = 1 to m:
  for j = 1 to n:
    if X[i-1] == Y[j-1]:
      c[i][j] = c[i-1][j-1] + 1    `}<span className="text-emerald-400">// match!</span>{`
    else:
      c[i][j] = max(c[i-1][j],      `}<span className="text-gray-500">// skip X[i]</span>{`
                    c[i][j-1])       `}<span className="text-gray-500">// skip Y[j]</span>{`

// Backtracking from c[m][n]
i = m, j = n, lcs = ""
while i > 0 and j > 0:
  if X[i-1] == Y[j-1]:
    lcs = X[i-1] + lcs
    i--, j--                         `}<span className="text-amber-400">// diagonal</span>{`
  else if c[i-1][j] >= c[i][j-1]:
    i--                              `}<span className="text-gray-500">// go up</span>{`
  else:
    j--                              `}<span className="text-gray-500">// go left</span></code>
                                    </pre>
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div className={`rounded-xl p-4 space-y-2 border transition-all duration-500 ${dark ? "bg-violet-500/10 border-violet-500/20" : "bg-indigo-50/50 border-indigo-100"}`}>
                                            <h4 className={`text-sm font-bold transition-colors duration-500 ${dark ? "text-violet-300" : "text-indigo-700"}`}>⏱ Time Complexity</h4>
                                            <p className={`text-sm transition-colors duration-500 ${dark ? "text-violet-400/80" : "text-indigo-600"}`}>
                                                <strong className={dark ? "text-violet-300" : "text-indigo-700"}>O(m × n)</strong> — fill every cell once; backtrack in O(m + n).
                                            </p>
                                        </div>
                                        <div className={`rounded-xl p-4 space-y-2 border transition-all duration-500 ${dark ? "bg-cyan-500/10 border-cyan-500/20" : "bg-purple-50/50 border-purple-100"}`}>
                                            <h4 className={`text-sm font-bold transition-colors duration-500 ${dark ? "text-cyan-300" : "text-purple-700"}`}>💾 Space Complexity</h4>
                                            <p className={`text-sm transition-colors duration-500 ${dark ? "text-cyan-400/80" : "text-purple-600"}`}>
                                                <strong className={dark ? "text-cyan-300" : "text-purple-700"}>O(m × n)</strong> — full table. Reducible to O(min(m,n)) for length only.
                                            </p>
                                        </div>
                                    </div>
                                    <div className={`rounded-xl p-4 space-y-2 border transition-all duration-500 ${dark ? "bg-gray-800/40 border-gray-700/40" : "bg-gray-50 border-gray-200"}`}>
                                        <h4 className={`text-sm font-bold transition-colors duration-500 ${dark ? "text-gray-300" : "text-gray-700"}`}>
                                            🔍 What is Backtracking?
                                            <InfoBadge text="Reconstructs the LCS string by tracing decisions in the filled table." dark={dark} />
                                        </h4>
                                        <p className={`text-sm leading-relaxed transition-colors duration-500 ${dark ? "text-gray-400" : "text-gray-600"}`}>
                                            Starting at <code className={`px-1 py-0.5 rounded text-xs font-mono border transition-all duration-500 ${dark ? "bg-gray-800 text-gray-300 border-gray-700/50" : "bg-gray-100 text-gray-700 border-gray-200"}`}>c[m][n]</code>,
                                            trace back: on a match (diagonal), that character joins the LCS. Otherwise move to the larger neighbor (up or left). The amber path shows this trace.
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </section>

                {/* Footer */}
                <footer className={`text-center text-xs py-6 border-t transition-all duration-500 ${dark ? "text-gray-600 border-gray-800/40" : "text-gray-400 border-gray-200/40"}`}>
                    Built by{" "}
                    <a href="/" className={`font-medium transition-colors duration-300 ${dark ? "text-violet-400 hover:text-violet-300" : "text-indigo-500 hover:text-indigo-600"}`}>Aadarsh Pandit</a>
                    {" "}· Algorithm Playground
                </footer>
            </main>
        </div>
    );
}
