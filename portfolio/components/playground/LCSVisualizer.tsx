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
}: {
    text: string;
    children: React.ReactNode;
}) {
    return (
        <span className="relative group inline-flex items-center">
            {children}
            <span className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 text-xs text-gray-200 bg-gray-800 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 shadow-lg border border-gray-700">
                {text}
                <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-800" />
            </span>
        </span>
    );
}

function InfoBadge({ text }: { text: string }) {
    return (
        <Tooltip text={text}>
            <span className="inline-flex items-center justify-center w-4 h-4 ml-1 text-[10px] font-bold text-violet-300 bg-violet-500/20 rounded-full cursor-help select-none border border-violet-500/30">
                ?
            </span>
        </Tooltip>
    );
}

// ─── Main Component ─────────────────────────────────────────────────────────
export default function LCSVisualizer() {
    // Inputs
    const [seqX, setSeqX] = useState("");
    const [seqY, setSeqY] = useState("");

    // Force-render trick for ref-based state
    const [, forceRender] = useState(0);
    const kick = useCallback(() => forceRender((c) => c + 1), []);

    // Algorithm state in refs for synchronous access
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

    useEffect(() => {
        speedRef.current = speed;
    }, [speed]);

    // Derived
    const dp = dpRef.current;
    const m = mRef.current;
    const n = nRef.current;
    const stepRow = stepRowRef.current;
    const stepCol = stepColRef.current;
    const status = statusRef.current;
    const tooLarge = m * n > MAX_RENDER_CELLS && m > 0 && n > 0;

    // ─── Algorithm ────────────────────────────────────────────────────────────
    const initDP = useCallback(
        (x: string, y: string) => {
            const rows = x.length;
            const cols = y.length;
            mRef.current = rows;
            nRef.current = cols;
            const table: number[][] = Array.from({ length: rows + 1 }, () =>
                new Array(cols + 1).fill(0)
            );
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
        },
        [kick]
    );

    const computeCell = (
        table: number[][],
        i: number,
        j: number,
        x: string,
        y: string
    ) => {
        if (x[i - 1] === y[j - 1]) {
            table[i][j] = table[i - 1][j - 1] + 1;
        } else {
            table[i][j] = Math.max(table[i - 1][j], table[i][j - 1]);
        }
    };

    const doBacktrack = useCallback(
        (table: number[][], x: string, y: string, rows: number, cols: number) => {
            const path: BacktrackCell[] = [];
            const mxSet = new Set<number>();
            const mySet = new Set<number>();
            let lcs = "";
            let i = rows;
            let j = cols;
            while (i > 0 && j > 0) {
                if (x[i - 1] === y[j - 1]) {
                    path.push({ row: i, col: j, matched: true });
                    lcs = x[i - 1] + lcs;
                    mxSet.add(i - 1);
                    mySet.add(j - 1);
                    i--;
                    j--;
                } else if (table[i - 1][j] >= table[i][j - 1]) {
                    path.push({ row: i, col: j, matched: false });
                    i--;
                } else {
                    path.push({ row: i, col: j, matched: false });
                    j--;
                }
            }
            path.reverse();
            setBacktrackPath(path);
            setMatchedX(mxSet);
            setMatchedY(mySet);
            setLcsString(lcs);
        },
        []
    );

    // ─── Actions ──────────────────────────────────────────────────────────────
    const handleReset = useCallback(() => {
        if (animRef.current) cancelAnimationFrame(animRef.current);
        animRef.current = null;
        dpRef.current = [];
        mRef.current = 0;
        nRef.current = 0;
        stepRowRef.current = 0;
        stepColRef.current = 0;
        statusRef.current = "idle";
        setLcsString("");
        setBacktrackPath([]);
        setMatchedX(new Set());
        setMatchedY(new Set());
        setComputeTimeMs(0);
        kick();
    }, [kick]);

    const handleComputeAll = useCallback(() => {
        if (!seqX || !seqY) return;
        if (animRef.current) cancelAnimationFrame(animRef.current);
        animRef.current = null;
        const t0 = performance.now();
        const { table, rows, cols } = initDP(seqX, seqY);
        for (let i = 1; i <= rows; i++)
            for (let j = 1; j <= cols; j++) computeCell(table, i, j, seqX, seqY);
        const t1 = performance.now();
        stepRowRef.current = rows + 1;
        stepColRef.current = cols + 1;
        statusRef.current = "done";
        setComputeTimeMs(t1 - t0);
        doBacktrack(table, seqX, seqY, rows, cols);
        kick();
    }, [seqX, seqY, initDP, doBacktrack, kick]);

    const stepOnce = useCallback((): boolean => {
        const table = dpRef.current;
        const rows = mRef.current;
        const cols = nRef.current;
        const r = stepRowRef.current;
        const c = stepColRef.current;
        if (r > rows) return false;
        computeCell(table, r, c, seqX, seqY);
        let nextRow = r;
        let nextCol = c + 1;
        if (nextCol > cols) {
            nextRow++;
            nextCol = 1;
        }
        stepRowRef.current = nextRow;
        stepColRef.current = nextCol;
        if (nextRow > rows) {
            statusRef.current = "done";
            setComputeTimeMs(-1);
            doBacktrack(table, seqX, seqY, rows, cols);
            kick();
            return false;
        }
        kick();
        return true;
    }, [seqX, seqY, doBacktrack, kick]);

    const handleStep = useCallback(() => {
        if (statusRef.current === "idle" || statusRef.current === "done") {
            if (!seqX || !seqY) return;
            if (animRef.current) cancelAnimationFrame(animRef.current);
            animRef.current = null;
            initDP(seqX, seqY);
            statusRef.current = "stepping";
            kick();
            return;
        }
        if (statusRef.current === "running") {
            if (animRef.current) cancelAnimationFrame(animRef.current);
            animRef.current = null;
            statusRef.current = "stepping";
            kick();
        }
        stepOnce();
    }, [seqX, seqY, initDP, stepOnce, kick]);

    const animLoop = useCallback(
        (timestamp: number) => {
            if (statusRef.current !== "running") return;
            if (timestamp - lastStepRef.current >= speedRef.current) {
                lastStepRef.current = timestamp;
                const more = stepOnce();
                if (!more) return;
            }
            animRef.current = requestAnimationFrame(animLoop);
        },
        [stepOnce]
    );

    const handleAutoRun = useCallback(() => {
        if (statusRef.current === "running") {
            if (animRef.current) cancelAnimationFrame(animRef.current);
            animRef.current = null;
            statusRef.current = "stepping";
            kick();
            return;
        }
        if (statusRef.current === "idle" || statusRef.current === "done") {
            if (!seqX || !seqY) return;
            initDP(seqX, seqY);
        }
        statusRef.current = "running";
        lastStepRef.current = 0;
        kick();
        animRef.current = requestAnimationFrame(animLoop);
    }, [seqX, seqY, initDP, animLoop, kick]);

    const handleExample = useCallback(
        (ex: (typeof EXAMPLES)[0]) => {
            handleReset();
            setSeqX(ex.x);
            setSeqY(ex.y);
            setShowExamples(false);
        },
        [handleReset]
    );

    useEffect(() => {
        return () => {
            if (animRef.current) cancelAnimationFrame(animRef.current);
        };
    }, []);

    // ─── Cell helpers ─────────────────────────────────────────────────────────
    const backtrackSet = new Set(backtrackPath.map((c) => `${c.row}-${c.col}`));
    const matchedCellSet = new Set(
        backtrackPath.filter((c) => c.matched).map((c) => `${c.row}-${c.col}`)
    );

    const isFilled = (i: number, j: number) => {
        if (status === "done") return true;
        if (i === 0 || j === 0) return true;
        if (i < stepRow) return true;
        if (i === stepRow && j < stepCol) return true;
        return false;
    };

    const isCurrent = (i: number, j: number) =>
        (status === "stepping" || status === "running") &&
        i === stepRow &&
        j === stepCol;

    const getCellClass = (i: number, j: number) => {
        if (isCurrent(i, j))
            return "bg-cyan-400 text-gray-950 ring-2 ring-cyan-300 shadow-lg shadow-cyan-500/40 scale-110 z-10 font-bold";
        if (status === "done" && matchedCellSet.has(`${i}-${j}`))
            return "bg-emerald-500 text-white font-bold ring-2 ring-emerald-400/50 shadow-md shadow-emerald-500/30";
        if (status === "done" && backtrackSet.has(`${i}-${j}`))
            return "bg-amber-500/80 text-gray-950 font-semibold ring-1 ring-amber-400/40";
        if (!isFilled(i, j)) return "bg-gray-800/40 text-gray-600";
        return "bg-gray-800/60 text-gray-300";
    };

    // ─── Render ───────────────────────────────────────────────────────────────
    return (
        <div className="min-h-screen bg-gray-950 text-gray-100 selection:bg-violet-500/30">
            {/* Animated background */}
            <div className="fixed inset-0 -z-10 overflow-hidden">
                <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-violet-600/8 blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-cyan-600/8 blur-[120px] animate-pulse" style={{ animationDelay: "2s" }} />
                <div className="absolute top-[40%] left-[50%] w-[30vw] h-[30vw] rounded-full bg-emerald-600/5 blur-[100px] animate-pulse" style={{ animationDelay: "4s" }} />
            </div>

            {/* Header */}
            <header className="border-b border-gray-800/60 bg-gray-950/80 backdrop-blur-xl sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <a
                            href="/playground"
                            className="text-sm text-gray-500 hover:text-violet-400 transition-colors"
                        >
                            ← Playground
                        </a>
                        <span className="text-gray-700">/</span>
                        <h1 className="text-lg sm:text-xl font-bold font-heading bg-gradient-to-r from-violet-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                            LCS Algorithm
                        </h1>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="hidden sm:inline text-[11px] text-gray-500 bg-gray-800/80 px-2.5 py-1 rounded-full border border-gray-700/50">
                            Dynamic Programming
                        </span>
                        <InfoBadge text="Longest Common Subsequence — finds the longest sequence appearing in both strings in the same order." />
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
                {/* Intro */}
                <motion.section
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-3xl"
                >
                    <p className="text-gray-400 leading-relaxed">
                        The{" "}
                        <strong className="text-gray-200">
                            Longest Common Subsequence (LCS)
                        </strong>{" "}
                        problem finds the longest sequence of characters common to two
                        strings, preserving order but not contiguity. Solved with{" "}
                        <strong className="text-gray-200">bottom-up DP</strong> in O(m×n)
                        time.
                    </p>
                </motion.section>

                {/* Input Card */}
                <motion.section
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 }}
                    className="bg-gray-900/60 backdrop-blur-md rounded-2xl border border-gray-800/60 p-6 space-y-5 shadow-xl shadow-black/20"
                >
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-300 mb-1.5">
                                Sequence X
                            </label>
                            <input
                                id="seq-x-input"
                                type="text"
                                value={seqX}
                                onChange={(e) => {
                                    if (statusRef.current !== "idle") handleReset();
                                    setSeqX(e.target.value);
                                }}
                                placeholder="e.g. ABCBDAB"
                                className="w-full rounded-xl border border-gray-700/60 bg-gray-800/50 px-4 py-2.5 text-sm font-mono text-gray-200 placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/30 transition-all"
                            />
                            {status === "done" && seqX && (
                                <div className="mt-2 flex flex-wrap gap-0.5 font-mono text-sm">
                                    {seqX.split("").map((ch, idx) => (
                                        <span
                                            key={idx}
                                            className={`px-1.5 py-0.5 rounded transition-colors ${matchedX.has(idx)
                                                    ? "bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30"
                                                    : "text-gray-600"
                                                }`}
                                        >
                                            {ch}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-300 mb-1.5">
                                Sequence Y
                            </label>
                            <input
                                id="seq-y-input"
                                type="text"
                                value={seqY}
                                onChange={(e) => {
                                    if (statusRef.current !== "idle") handleReset();
                                    setSeqY(e.target.value);
                                }}
                                placeholder="e.g. BDCAB"
                                className="w-full rounded-xl border border-gray-700/60 bg-gray-800/50 px-4 py-2.5 text-sm font-mono text-gray-200 placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/30 transition-all"
                            />
                            {status === "done" && seqY && (
                                <div className="mt-2 flex flex-wrap gap-0.5 font-mono text-sm">
                                    {seqY.split("").map((ch, idx) => (
                                        <span
                                            key={idx}
                                            className={`px-1.5 py-0.5 rounded transition-colors ${matchedY.has(idx)
                                                    ? "bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30"
                                                    : "text-gray-600"
                                                }`}
                                        >
                                            {ch}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="flex flex-wrap items-center gap-3">
                        <button
                            id="compute-btn"
                            onClick={handleComputeAll}
                            disabled={!seqX || !seqY || status === "running"}
                            className="px-5 py-2.5 bg-gradient-to-r from-violet-600 to-purple-600 text-white text-sm font-semibold rounded-xl shadow-lg shadow-violet-600/25 hover:shadow-violet-600/40 hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-95"
                        >
                            ⚡ Compute LCS
                        </button>
                        <button
                            id="step-btn"
                            onClick={handleStep}
                            disabled={!seqX || !seqY || status === "done"}
                            className="px-4 py-2.5 bg-gray-800/80 border border-gray-700/60 text-sm font-semibold text-gray-300 rounded-xl hover:bg-gray-700/80 hover:border-gray-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-95"
                        >
                            👣 Step
                        </button>
                        <button
                            id="autorun-btn"
                            onClick={handleAutoRun}
                            disabled={!seqX || !seqY || status === "done"}
                            className={`px-4 py-2.5 text-sm font-semibold rounded-xl transition-all active:scale-95 ${status === "running"
                                    ? "bg-amber-500 text-gray-950 shadow-lg shadow-amber-500/25 hover:bg-amber-400"
                                    : "bg-gray-800/80 border border-gray-700/60 text-gray-300 hover:bg-gray-700/80 hover:border-gray-600 disabled:opacity-40 disabled:cursor-not-allowed"
                                }`}
                        >
                            {status === "running" ? "⏸ Pause" : "▶ Auto-run"}
                        </button>
                        <button
                            id="reset-btn"
                            onClick={() => {
                                handleReset();
                                setSeqX("");
                                setSeqY("");
                            }}
                            className="px-4 py-2.5 bg-gray-800/80 border border-gray-700/60 text-sm font-semibold text-red-400 rounded-xl hover:bg-red-500/10 hover:border-red-500/30 transition-all active:scale-95"
                        >
                            ↺ Reset
                        </button>

                        <div className="relative">
                            <button
                                id="example-btn"
                                onClick={() => setShowExamples(!showExamples)}
                                className="px-4 py-2.5 bg-gray-800/80 border border-gray-700/60 text-sm font-semibold text-gray-300 rounded-xl hover:bg-gray-700/80 hover:border-gray-600 transition-all active:scale-95"
                            >
                                📝 Example
                            </button>
                            <AnimatePresence>
                                {showExamples && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -4, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: -4, scale: 0.95 }}
                                        className="absolute top-full mt-2 left-0 bg-gray-900 rounded-xl shadow-2xl border border-gray-700/60 py-1 z-50 min-w-[260px] backdrop-blur-xl"
                                    >
                                        {EXAMPLES.map((ex) => (
                                            <button
                                                key={ex.label}
                                                onClick={() => handleExample(ex)}
                                                className="w-full text-left px-4 py-2.5 text-sm hover:bg-violet-500/10 transition-colors"
                                            >
                                                <span className="font-mono text-violet-400 font-medium">
                                                    {ex.x}
                                                </span>
                                                <span className="text-gray-600 mx-1.5">/</span>
                                                <span className="font-mono text-cyan-400 font-medium">
                                                    {ex.y}
                                                </span>
                                                <span className="text-gray-600 text-xs ml-2">
                                                    ({ex.label})
                                                </span>
                                            </button>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Speed slider */}
                        {(status === "running" || status === "stepping") && (
                            <div className="flex items-center gap-2 ml-auto">
                                <span className="text-xs text-gray-500">Speed</span>
                                <input
                                    type="range"
                                    min={10}
                                    max={500}
                                    value={510 - speed}
                                    onChange={(e) => setSpeed(510 - Number(e.target.value))}
                                    className="w-24 accent-violet-500"
                                />
                                <span className="text-xs text-gray-500 w-12 tabular-nums font-mono">
                                    {speed}ms
                                </span>
                            </div>
                        )}
                    </div>
                </motion.section>

                {/* Results */}
                <AnimatePresence>
                    {status === "done" && (
                        <motion.section
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="grid sm:grid-cols-4 gap-4"
                        >
                            <div className="bg-gray-900/60 backdrop-blur-md rounded-2xl border border-gray-800/60 p-5 text-center shadow-lg">
                                <p className="text-[11px] font-medium text-gray-500 uppercase tracking-wider mb-1">
                                    LCS Length
                                </p>
                                <p className="text-4xl font-bold bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
                                    {lcsString.length}
                                </p>
                            </div>
                            <div className="bg-gray-900/60 backdrop-blur-md rounded-2xl border border-gray-800/60 p-5 text-center sm:col-span-2 shadow-lg">
                                <p className="text-[11px] font-medium text-gray-500 uppercase tracking-wider mb-1">
                                    LCS String
                                    <InfoBadge text="One possible LCS. There may be others of the same length." />
                                </p>
                                <p className="text-2xl font-bold font-mono text-emerald-400 tracking-widest">
                                    {lcsString || "∅"}
                                </p>
                            </div>
                            <div className="bg-gray-900/60 backdrop-blur-md rounded-2xl border border-gray-800/60 p-5 text-center shadow-lg">
                                <p className="text-[11px] font-medium text-gray-500 uppercase tracking-wider mb-1">
                                    Table Size
                                </p>
                                <p className="text-sm text-gray-400">
                                    <span className="font-mono font-bold text-gray-200">{m}</span>
                                    <span className="text-gray-600"> × </span>
                                    <span className="font-mono font-bold text-gray-200">{n}</span>
                                    <span className="text-gray-600"> = </span>
                                    <span className="font-mono font-bold text-violet-400">
                                        {(m * n).toLocaleString()}
                                    </span>
                                </p>
                                {computeTimeMs > 0 && (
                                    <p className="text-xs text-gray-600 mt-1 font-mono">
                                        {computeTimeMs.toFixed(1)}ms
                                    </p>
                                )}
                                <p className="text-[11px] text-gray-600 mt-0.5">
                                    O(m×n) time &amp; space
                                </p>
                            </div>
                        </motion.section>
                    )}
                </AnimatePresence>

                {/* DP Table */}
                {dp.length > 0 && (
                    <section className="space-y-3">
                        <div className="flex items-center gap-2">
                            <h2 className="text-lg font-bold font-heading text-gray-200">
                                DP Table
                            </h2>
                            <InfoBadge text="Each cell c[i][j] stores the LCS length of X[1..i] and Y[1..j]." />
                            {status !== "idle" && status !== "done" && (
                                <span className="text-xs bg-cyan-500/15 text-cyan-400 px-2.5 py-0.5 rounded-full font-medium border border-cyan-500/20 animate-pulse">
                                    Cell ({stepRow}, {stepCol})
                                </span>
                            )}
                        </div>

                        {tooLarge ? (
                            <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-6 text-center space-y-2">
                                <p className="text-amber-400 font-semibold text-lg">
                                    ⚠ Table too large to render
                                </p>
                                <p className="text-amber-400/60 text-sm max-w-md mx-auto">
                                    <span className="font-mono font-bold">
                                        {(m * n).toLocaleString()}
                                    </span>{" "}
                                    cells (m={m}, n={n}) exceeds the 250K rendering limit. LCS was
                                    still computed above.
                                </p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto rounded-2xl border border-gray-800/60 bg-gray-900/40 backdrop-blur-md shadow-xl shadow-black/20">
                                <div className="p-4 min-w-fit">
                                    <div
                                        className="grid gap-[2px]"
                                        style={{
                                            gridTemplateColumns: `40px repeat(${n + 1}, minmax(36px, 1fr))`,
                                        }}
                                    >
                                        {/* Header row */}
                                        <div className="h-9" />
                                        <div className="h-9 flex items-center justify-center text-[10px] font-mono text-gray-600">
                                            ε
                                        </div>
                                        {seqY.split("").map((ch, j) => (
                                            <div
                                                key={j}
                                                className={`h-9 flex items-center justify-center text-xs font-mono font-bold rounded-lg ${status === "done" && matchedY.has(j)
                                                        ? "text-emerald-400 bg-emerald-500/10"
                                                        : "text-cyan-400 bg-cyan-500/5"
                                                    }`}
                                            >
                                                {ch}
                                            </div>
                                        ))}

                                        {/* Rows */}
                                        {dp.map((row, i) => (
                                            <React.Fragment key={i}>
                                                <div
                                                    className={`h-9 flex items-center justify-center text-xs font-mono font-bold rounded-lg ${i === 0
                                                            ? "text-gray-600"
                                                            : status === "done" && matchedX.has(i - 1)
                                                                ? "text-emerald-400 bg-emerald-500/10"
                                                                : "text-violet-400 bg-violet-500/5"
                                                        }`}
                                                >
                                                    {i === 0 ? "ε" : seqX[i - 1]}
                                                </div>
                                                {row.map((val, j) => (
                                                    <div
                                                        key={j}
                                                        className={`h-9 flex items-center justify-center text-xs font-mono rounded-lg transition-all duration-150 ${getCellClass(
                                                            i,
                                                            j
                                                        )}`}
                                                    >
                                                        {isFilled(i, j) ? val : ""}
                                                    </div>
                                                ))}
                                            </React.Fragment>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Legend */}
                        {status === "done" && !tooLarge && (
                            <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                                <span className="flex items-center gap-1.5">
                                    <span className="w-3 h-3 rounded bg-emerald-500 inline-block" />{" "}
                                    Match
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <span className="w-3 h-3 rounded bg-amber-500/80 inline-block" />{" "}
                                    Backtrack path
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <span className="w-3 h-3 rounded bg-cyan-400 inline-block" />{" "}
                                    Current cell
                                </span>
                            </div>
                        )}
                    </section>
                )}

                {/* How it works */}
                <section className="bg-gray-900/60 backdrop-blur-md rounded-2xl border border-gray-800/60 overflow-hidden shadow-lg">
                    <button
                        id="how-it-works-toggle"
                        onClick={() => setHowOpen(!howOpen)}
                        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-800/30 transition-colors"
                    >
                        <h2 className="text-lg font-bold font-heading text-gray-200 flex items-center gap-2">
                            📖 How It Works
                            <InfoBadge text="Full DP recurrence and pseudocode" />
                        </h2>
                        <span
                            className={`text-gray-500 transition-transform duration-200 ${howOpen ? "rotate-180" : ""
                                }`}
                        >
                            ▼
                        </span>
                    </button>
                    <AnimatePresence>
                        {howOpen && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden"
                            >
                                <div className="px-6 pb-6 space-y-5">
                                    <div className="space-y-3">
                                        <h3 className="text-sm font-bold text-gray-300">
                                            The Recurrence
                                        </h3>
                                        <p className="text-sm text-gray-400 leading-relaxed">
                                            Given{" "}
                                            <code className="bg-gray-800 px-1.5 py-0.5 rounded text-violet-400 text-xs font-mono border border-gray-700/50">
                                                X[1..m]
                                            </code>{" "}
                                            and{" "}
                                            <code className="bg-gray-800 px-1.5 py-0.5 rounded text-cyan-400 text-xs font-mono border border-gray-700/50">
                                                Y[1..n]
                                            </code>
                                            , build table{" "}
                                            <code className="bg-gray-800 px-1.5 py-0.5 rounded text-xs font-mono text-gray-300 border border-gray-700/50">
                                                c[0..m][0..n]
                                            </code>{" "}
                                            where{" "}
                                            <code className="bg-gray-800 px-1.5 py-0.5 rounded text-xs font-mono text-gray-300 border border-gray-700/50">
                                                c[i][j]
                                            </code>{" "}
                                            = LCS length of X[1..i] and Y[1..j].
                                        </p>
                                    </div>

                                    <pre className="bg-gray-950 text-gray-300 rounded-xl p-5 text-sm font-mono leading-relaxed overflow-x-auto border border-gray-800/60">
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
                                        <div className="bg-violet-500/10 border border-violet-500/20 rounded-xl p-4 space-y-2">
                                            <h4 className="text-sm font-bold text-violet-300">
                                                ⏱ Time Complexity
                                            </h4>
                                            <p className="text-sm text-violet-400/80">
                                                <strong className="text-violet-300">O(m × n)</strong> — fill every
                                                cell once; backtrack in O(m + n).
                                            </p>
                                        </div>
                                        <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-4 space-y-2">
                                            <h4 className="text-sm font-bold text-cyan-300">
                                                💾 Space Complexity
                                            </h4>
                                            <p className="text-sm text-cyan-400/80">
                                                <strong className="text-cyan-300">O(m × n)</strong> — full table.
                                                Reducible to O(min(m,n)) for length only.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="bg-gray-800/40 border border-gray-700/40 rounded-xl p-4 space-y-2">
                                        <h4 className="text-sm font-bold text-gray-300">
                                            🔍 What is Backtracking?
                                            <InfoBadge text="Reconstructs the LCS string by tracing decisions in the filled table." />
                                        </h4>
                                        <p className="text-sm text-gray-400 leading-relaxed">
                                            Starting at{" "}
                                            <code className="bg-gray-800 px-1 py-0.5 rounded text-xs font-mono text-gray-300 border border-gray-700/50">
                                                c[m][n]
                                            </code>
                                            , trace back: on a match (diagonal), that character joins the
                                            LCS. Otherwise move to the larger neighbor (up or left). The
                                            amber path in the table shows this trace.
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </section>

                {/* Footer */}
                <footer className="text-center text-xs text-gray-600 py-6 border-t border-gray-800/40">
                    Built by{" "}
                    <a
                        href="/"
                        className="text-violet-400 hover:text-violet-300 transition-colors font-medium"
                    >
                        Aadarsh Pandit
                    </a>{" "}
                    · Algorithm Playground
                </footer>
            </main>
        </div>
    );
}
