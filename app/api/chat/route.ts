import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type IncomingMessage = { role?: string; text?: string } | string;

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const rawMessages: IncomingMessage[] | undefined = body?.messages || body?.message;

        const apiKey = process.env.GROQ_API_KEY;
        if (!apiKey) {
            return NextResponse.json({ error: "API Key Groq belum dipasang" }, { status: 500 });
        }

        if (!rawMessages || (Array.isArray(rawMessages) && rawMessages.length === 0)) {
            return NextResponse.json({ error: "Pesan wajib diisi." }, { status: 400 });
        }

        // Normalize input: accept either a single string, a single object, or an array of objects/strings
        const normalizedArray = Array.isArray(rawMessages) ? rawMessages : [rawMessages];

        const formattedMessages = normalizedArray.map((m) => {
            if (typeof m === "string") {
                return { role: "user", content: m };
            }
            const role = (m.role ==="assistant" || m.role === "ai" ) ? "assistant" : "user";
            return { role, content: m.text ?? "" };
        });

        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: "llama-3.3-70b-versatile",
                messages: [
                    {
                        role: "system",
                        content: "Anda adalah Dr. Aiko, asisten kesehatan yang ramah.",
                    },
                    ...formattedMessages,
                ],
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            return NextResponse.json(
                { error: "Groq Error", details: data },
                { status: response.status },
            );
        }

        const aiText = data?.choices?.[0]?.message?.content ?? "Maaf, saya tidak bisa menjawab saat ini.";
        return NextResponse.json({ aiText });
    } catch (err: any) {
        return NextResponse.json(
            { error: "Server Error", details: err?.message ?? "unknown" },
            { status: 500 },
        );
    }
}