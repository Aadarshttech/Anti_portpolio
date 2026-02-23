import Groq from "groq-sdk";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Read the Knowledge Base once
function getKB(): string {
    const kbPath = path.join(process.cwd(), "data", "chatbot-kb.md");
    try {
        return fs.readFileSync(kbPath, "utf-8");
    } catch {
        return "";
    }
}

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();

        const apiKey = process.env.GROQ_API_KEY;
        if (!apiKey) {
            console.error("Groq API key is missing");
            return NextResponse.json({
                role: "assistant",
                content: "The AI assistant is currently sleeping (API key missing). Please contact Aadarsh directly!"
            });
        }

        const groq = new Groq({ apiKey });

        const kbContent = getKB();

        const systemPrompt = [
            "You are Aadarsh Pandit's personal AI assistant on his portfolio website.",
            "Use the Knowledge Base below to answer questions about Aadarsh, his services, projects, and contact info.",
            "IMPORTANT RULES:",
            "- Keep responses SHORT: 2-3 sentences max unless the user specifically asks for more detail.",
            "- Do NOT use any markdown formatting (no **, no ##, no [], no links). Use plain text only.",
            "- Use emojis sparingly to keep the tone warm.",
            "- If someone asks something unrelated to Aadarsh (like general knowledge, politics, personal questions), politely redirect them.",
            "- Never pretend to be Aadarsh himself. You are his assistant.",
            "- If you don't know something, suggest contacting Aadarsh via WhatsApp (+977 9860334317) or Email (aadarshapandit@gmail.com).",
            "",
            "Knowledge Base:",
            "---",
            kbContent,
            "---"
        ].join("\n");

        const formattedMessages = [
            { role: "system", content: systemPrompt },
            ...messages.map((m: any) => ({
                role: m.role === "user" ? "user" : "assistant",
                content: m.content
            }))
        ];

        const chatCompletion = await groq.chat.completions.create({
            messages: formattedMessages,
            model: "llama-3.3-70b-versatile",
            temperature: 0.7,
            max_tokens: 300,
        });

        const responseText = chatCompletion.choices[0]?.message?.content || "";
        return NextResponse.json({ role: "assistant", content: responseText });

    } catch (error: unknown) {
        const errMsg = error instanceof Error ? error.message : "Unknown error";
        console.error("Chat API Error:", errMsg);
        return NextResponse.json({
            role: "assistant",
            content: "I'm having a brief hiccup connecting to my brain! Please try again later, or reach out to Aadarsh directly at aadarshapandit@gmail.com."
        }, { status: 500 });
    }
}
