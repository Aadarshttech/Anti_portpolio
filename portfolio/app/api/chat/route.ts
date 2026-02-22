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
        } catch (error) {
            console.error("Error reading KB file:", error);
            // Fallback content if file is missing
            kbContent = "Aadarsh Pandit is an AI & Web Developer from Nepal.";
        }

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // Build the system prompt with context
        const systemPrompt = `
You are a helpful and professional AI Assistant representing Aadarsh Pandit. 
Use the following Knowledge Base to answer user questions. 
If a question is not answered by the Knowledge Base, be polite and say you don't have that specific information 
and suggest contacting Aadarsh directly via Email or WhatsApp.

Knowledge Base:
---
${kbContent}
---

User Chat History:
${messages.map((m: any) => `${m.role === "user" ? "User" : "Assistant"}: ${m.content}`).join("\n")}

Assistant:`;

        const result = await model.generateContent(systemPrompt);
        const responseText = result.response.text();

        return NextResponse.json({ role: "assistant", content: responseText });
    } catch (error: any) {
        console.error("Chat API Error:", error);
        return NextResponse.json({
            error: error.message || "Unknown error",
            details: error.toString()
        }, { status: 500 });
    }
}
