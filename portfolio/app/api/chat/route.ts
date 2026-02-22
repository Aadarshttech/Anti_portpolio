import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();

        // Read the Knowledge Base
        const kbPath = path.join(process.cwd(), "data", "chatbot-kb.md");
        let kbContent = "";
        try {
            kbContent = fs.readFileSync(kbPath, "utf-8");
        } catch {
            kbContent = "Aadarsh Pandit is an AI and Web Developer from Nepal. Contact: aadarshapandit@gmail.com";
        }

        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        const chatHistory = messages
            .map((m: { role: string; content: string }) =>
                `${m.role === "user" ? "User" : "Assistant"}: ${m.content}`
            )
            .join("\n");

        const systemPrompt = [
            "You are a helpful and professional AI Assistant representing Aadarsh Pandit.",
            "Use the following Knowledge Base to answer user questions.",
            "If a question is not answered by the Knowledge Base, suggest contacting Aadarsh directly via Email or WhatsApp.",
            "Keep responses short and concise (2-3 sentences max unless more detail is specifically asked for).",
            "",
            "Knowledge Base:",
            "---",
            kbContent,
            "---",
            "",
            "Conversation:",
            chatHistory,
            "",
            "Assistant:"
        ].join("\n");

        const result = await model.generateContent(systemPrompt);
        const responseText = result.response.text();

        return NextResponse.json({ role: "assistant", content: responseText });
    } catch (error: unknown) {
        const errMsg = error instanceof Error ? error.message : "Unknown error";
        console.error("Chat API Error:", errMsg);

        // Provide user-friendly messages for common errors
        let userMessage = errMsg;
        if (errMsg.includes("429") || errMsg.includes("quota")) {
            userMessage = "I'm getting a lot of questions right now! Please wait a moment and try again.";
        } else if (errMsg.includes("API key")) {
            userMessage = "There's a configuration issue. Please contact Aadarsh directly.";
        }

        return NextResponse.json({
            error: userMessage,
            details: errMsg
        }, { status: 500 });
    }
}
