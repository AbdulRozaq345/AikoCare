import { NextResponse } from "next/server";

export const runtime = "nodejs"; 
export const dynamic = "force-dynamic"; 

export async function POST(request: Request) {
    try {
        const { message } = await request.json();
        const apiKey = process.env.GROQ_API_KEY; 
        
        if (!apiKey) {
            return NextResponse.json({ error: "API Key Groq belum dipasang" }, { status: 500 });
        }

        // Pakai URL Groq (tapi formatnya sama kayak OpenAI)
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: "llama-3.3-70b-versatile", // Model gratis paling pinter di Groq
                messages: [
                    { 
                        role: "system", 
                        content: "Anda adalah Dr. Aiko, asisten kesehatan yang ramah." 
                    },
                    { role: "user", content: message }
                ],
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            return NextResponse.json({ error: "Groq Error", details: data }, { status: response.status });
        }

        const aiText = data.choices[0].message.content;
        return NextResponse.json({ aiText });

    } catch (err: any) {
        return NextResponse.json({ error: "Server Error", details: err.message }, { status: 500 });
    }
}