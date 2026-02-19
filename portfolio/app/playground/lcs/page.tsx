import type { Metadata } from "next";
import LCSVisualizer from "@/components/playground/LCSVisualizer";

export const metadata: Metadata = {
    title: "LCS Algorithm Playground",
    description:
        "Interactive visualization of the Longest Common Subsequence (LCS) dynamic programming algorithm — step through the DP table, watch backtracking, and learn the recurrence.",
};

export default function LCSPage() {
    return <LCSVisualizer />;
}
