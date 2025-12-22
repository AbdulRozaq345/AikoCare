"use client";
import React, { useState } from "react";
import { PlaceholdersAndVanishInput } from "./ui/placeholders-and-vanish-input";

type ChatMessage = {
  role: "user" | "ai" | "assitant";
  text: string;
};

export function PlaceholdersAndVanishInputDemo() {
  const [aiResponse, setAiResponse] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const placeholders = [
    "What's the first rule of Fight Club?",
    "Who is Tyler Durden?",
    "Where is Andrew Laeddis Hiding?",
    "Write a Javascript method to reverse a string",
    "How to assemble your own PC?",
  ];

  const handleChange = (_e: React.ChangeEvent<HTMLInputElement>) => {};

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const inputElement = form.querySelector("input") as HTMLInputElement | null;
    const userMessage = inputElement?.value.trim();

    if (!userMessage) return;

  const newUserMsg: ChatMessage = { role: "user", text: userMessage };
  const updatedMessages = [...messages, newUserMsg];

  setMessages(updatedMessages);
  setIsLoading(true);
  setAiResponse(`Mencari informasi terkait "${userMessage}"...`);


    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // Server expects a string; send the latest user message. If you update the API to handle history,
        // switch to sending the full array instead: { messages: updatedMessages }
        body: JSON.stringify({ message: updatedMessages }),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Gagal menghubungi layanan AI (status ${response.status}): ${text}`);
      }

      const data = await response.json();
      const aiText = data.aiText || data.text;

      if (aiText) {
        setAiResponse(aiText);
        setMessages([...updatedMessages, { role: "ai", text: aiText }]);
      } else {
        setAiResponse("Maaf, saya tidak bisa menjawab ini.");
      }

      // clear form input after successful send
      form.reset();
    } catch (error) {
      console.error("lagi error nih:", error);
      setAiResponse("Terjadi kesalahan dengan Aiko. Coba lagi nanti ya.");
    } finally {
      setIsLoading(false);
    }
  };
return (
    // Container utama memenuhi tinggi layar (h-screen)
    <div className="flex flex-col items-center justify-between h-screen w-full px-4 -top-12 pt-20 overflow-hidden relative">
      
      {/* 1. AREA KONTEN (Gambar atau Jawaban) */}
      {/* flex-1 akan mengambil semua ruang kosong yang tersedia, mendorong input ke bawah */}
      <div className="flex-1 w-full max-w-2xl flex flex-col items-center justify-center transition-all duration-500">
        
        {/* Gambar Aiko: Hanya muncul jika belum ada respon & tidak loading */}
        {!aiResponse && !isLoading && (
          <div className="flex flex-col items-center animate-in fade-in duration-700">
            <p className="text-gray-500 uppercase mb-4 tracking-widest text-xs font-semibold">DR. Aiko</p>
            <img src="AikoChat.gif" alt="DR. Aiko" className="h-64 w-64 object-contain" />
          </div>
        )}

        {/* Kotak Jawaban: Muncul menggantikan gambar */}
        {(isLoading || aiResponse) && (
          <div className="w-full rounded-3xl border border-slate-100 bg-white/90 p-6 shadow-2xl backdrop-blur-md animate-in slide-in-from-bottom-8 duration-500">
            <div className="mb-3 flex items-center gap-2">
              <div className={`h-2 w-2 rounded-full ${isLoading ? "bg-blue-400 animate-pulse" : "bg-green-500"}`} />
              <span className="text-sm font-bold text-blue-600">DR. Aiko</span>
            </div>
            <div className="text-sm leading-relaxed text-slate-700 md:text-base whitespace-pre-wrap max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
              {aiResponse}
            </div>
          </div>
        )}
      </div>

      {/* 2. AREA INPUT (Stay di Bawah) */}
      <div className="w-full max-w-2xl mt-2">
        <PlaceholdersAndVanishInput
          placeholders={placeholders}
          onChange={handleChange}
          onSubmit={onSubmit}
        />
        <p className="text-center text-[13px] text-gray-600 mt-4">
          ini hanya asisten dokter berbasic ai jadi saran saya lebih baik untuk gejala lebih kosultasi ke dokter ahli
        </p>
      </div>
    </div>
  );
}