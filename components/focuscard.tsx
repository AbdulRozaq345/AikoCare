"use client";
import { FocusCards } from "@/components/ui/focus-cards";
import { MessageCircle, Scale, Stethoscope, Brain,  LifeBuoy, } from "lucide-react";

export function FocusCardsDemo() {
  const cards = [
    {
      title: "Perhitungan BMI",
      description: "Masukkan tinggi dan berat badanmu, langsung dapat hasilnya.",
      icon: <Scale className="h-7 w-7 text-[#2563eb]" />,
      buttonLabel: "Lihat Hasil BMI",
      buttonClassName:
        "bg-linear-to-r from-[#38bdf8] to-[#2563eb] shadow-[#38bdf8]/40",
    href: "/bmi-calculator",
    },
    {
      title: "Chat Aiko",
      description: "Butuh ngobrol langsung? Dr. Aiko siap dengerin kamu.",
      icon: <MessageCircle className="h-7 w-7 text-[#f97316]" />,
      buttonLabel: "Chat DR. Aiko",
      buttonClassName:
        "bg-linear-to-r from-[#f97316] to-[#fb7185] shadow-[#f97316]/40",
    href: "/Chat",
    },
    {
      title:"Kesehatan Mental",
      description: "Apapun yang kamu rasakan, silakan ceritakan saja! Dr. Aiko akan hadir sebagai teman curhatmu dan siap memberikan wawasan serta panduan terbaik untukmu",
      icon: <Brain className="h-7 w-7 text-[#89b0eb]"/>,
      buttonLabel: "Konsultasi sekarang",
      buttonClassName:
      " bg-linear-to-r from-[#719fca] to-[#318285] shadow-[#1f3f6e]/40",
        href:"/Mental",
    },


  ];

  return <FocusCards cards={cards} />;
}
