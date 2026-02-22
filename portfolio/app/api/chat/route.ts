import { GoogleGenerativeAI } from "@google/generative-ai";
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

// Smart rule-based responses using the KB
function getLocalResponse(userMessage: string): string {
    const msg = userMessage.toLowerCase();
    const kb = getKB();

    // Greetings
    if (msg.match(/^(hi|hello|hey|namaste|yo|sup)/)) {
        return "Hello! I'm Aadarsh's virtual assistant. I can help you with:\n\n• Services Aadarsh offers\n• Projects he's worked on\n• Contact information\n• General questions about his work\n\nWhat would you like to know?";
    }

    // Services
    if (msg.includes("service") || msg.includes("what can you do") || msg.includes("what do you offer") || msg.includes("build")) {
        return "Aadarsh offers these services:\n\n🌐 Custom Websites & Web Apps — Next.js, React, Tailwind\n🤖 AI & ML Models — Python, TensorFlow, NLP\n📱 Mobile App Development — React Native, Expo\n⚡ Workflow Automation — Make, Zapier, Node.js\n📝 WordPress / CMS Solutions — Professional setups\n\nWant details on any specific service?";
    }

    // Projects
    if (msg.includes("project") || msg.includes("portfolio") || msg.includes("work") || msg.includes("built")) {
        return "Here are some of Aadarsh's key projects:\n\n🎙️ Nepali ASR System — Automated Speech Recognition for Nepali language\n🏏 Cricket Predictor — ML-based cricket match predictions\n🧮 LCS Algorithm Playground — Interactive algorithm visualization\n\nYou can check them out at aadarshapandit.com.np!";
    }

    // Contact
    if (msg.includes("contact") || msg.includes("email") || msg.includes("phone") || msg.includes("whatsapp") || msg.includes("reach") || msg.includes("hire")) {
        return "You can reach Aadarsh through:\n\n📧 Email: aadarshapandit@gmail.com\n📱 WhatsApp: +977 9860334317\n🌐 Website: aadarshapandit.com.np\n\nHe typically responds within 24 hours!";
    }

    // Price / Cost
    if (msg.includes("price") || msg.includes("cost") || msg.includes("rate") || msg.includes("charge") || msg.includes("budget")) {
        return "Pricing depends on the project scope and complexity. I'd recommend reaching out directly to discuss your requirements:\n\n📧 aadarshapandit@gmail.com\n📱 WhatsApp: +977 9860334317\n\nAadarsh offers free consultations!";
    }

    // About Aadarsh specifically
    if ((msg.includes("who") && (msg.includes("aadarsh") || msg.includes("you") || msg.includes("are you"))) || msg.includes("about aadarsh") || msg.includes("tell me about you") || msg.includes("yourself")) {
        return "Aadarsh Pandit is a Freelance AI & Web Developer and AI student based in Kathmandu, Nepal. He's deeply passionate about building impactful software using modern tech like Next.js, React, Python, and TensorFlow.\n\nWant to know about his services or projects?";
    }

    // Timeline
    if (msg.includes("how long") || msg.includes("deadline") || msg.includes("timeline") || msg.includes("duration")) {
        return "Typical timelines:\n\n🌐 Websites: 2-4 weeks\n🤖 AI/ML Models: 4-8 weeks\n📱 Mobile Apps: 4-10 weeks\n📝 WordPress: 1-3 weeks\n⚡ Automation: 1-2 weeks\n\nExact timelines depend on your project scope!";
    }

    // Thanks
    if (msg.includes("thank") || msg.includes("thanks") || msg.includes("awesome") || msg.includes("great")) {
        return "You're welcome! 😊 Feel free to reach out anytime. If you'd like to start a project, contact Aadarsh via WhatsApp (+977 9860334317) or email at aadarshapandit@gmail.com.";
    }

    // Off-topic / General knowledge questions
    if (msg.includes("prime minister") || msg.includes("president") || msg.includes("capital") || msg.includes("grandfather") || msg.includes("grandmother") || msg.includes("weather") || msg.includes("joke") || msg.includes("who is") || msg.includes("what is the") || msg.includes("how old") || msg.includes("where is") || msg.includes("when was") || msg.includes("why is") || msg.includes("tell me a")) {
        return "Great question, but I'm only Aadarsh's portfolio assistant 😄 I specialize in answering questions about his services, projects, and how to work with him.\n\nTry asking me things like:\n• What services does Aadarsh offer?\n• Show me his projects\n• How can I contact him?\n• How long does a website take?";
    }

    // Default
    return "I'm Aadarsh's portfolio assistant, so I'm best at answering questions about his services, projects, and how to reach him!\n\nTry asking:\n• What services do you offer?\n• Tell me about your projects\n• How can I hire Aadarsh?";
}

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();
        const lastUserMessage = messages[messages.length - 1]?.content || "";

        // Try AI first if API key is available
        const apiKey = process.env.GEMINI_API_KEY;
        if (apiKey) {
            try {
                const genAI = new GoogleGenerativeAI(apiKey);
                const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

                const kbContent = getKB();
                const chatHistory = messages
                    .map((m: { role: string; content: string }) =>
                        `${m.role === "user" ? "User" : "Assistant"}: ${m.content}`
                    )
                    .join("\n");

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
                    "---",
                    "",
                    "Conversation so far:",
                    chatHistory,
                    "",
                    "Assistant:"
                ].join("\n");

                const result = await model.generateContent(systemPrompt);
                const responseText = result.response.text();
                return NextResponse.json({ role: "assistant", content: responseText });
            } catch (aiError: unknown) {
                console.warn("AI unavailable, falling back to rule-based:", aiError instanceof Error ? aiError.message : "unknown");
                // Fall through to rule-based response
            }
        }

        // Fallback: Smart rule-based response
        const response = getLocalResponse(lastUserMessage);
        return NextResponse.json({ role: "assistant", content: response });

    } catch (error: unknown) {
        const errMsg = error instanceof Error ? error.message : "Unknown error";
        console.error("Chat API Error:", errMsg);
        return NextResponse.json({
            role: "assistant",
            content: "I'm having a brief hiccup. Please try again, or reach out to Aadarsh directly at aadarshapandit@gmail.com!"
        });
    }
}
