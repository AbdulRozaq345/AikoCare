"use client";

import React, { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export const Card = React.memo(
  ({
    card,
    index,
    hovered,
    setHovered,
  }: {
    card: Card;
    index: number;
    hovered: number | null;
    setHovered: React.Dispatch<React.SetStateAction<number | null>>;
  }) => (
    <div
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "relative flex h-full w-full flex-col gap-4 rounded-[32px] border border-white/50 bg-white/90 px-6 py-8 shadow-[0_30px_80px_rgba(15,36,74,0.08)] transition-all duration-300",
        hovered === index
          ? "translate-y-0 shadow-[0_35px_90px_rgba(15,36,74,0.15)]"
          : "translate-y-1",
        hovered !== null && hovered !== index && "blur-sm scale-[0.98] opacity-70"
      )}
    >
      <div className="flex flex-col items-center gap-3 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-b from-[#e0f2ff] to-[#fff] shadow-inner">
          {card.icon}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-[#0f244a]">{card.title}</h3>
          {card.description && (
            <p className="mt-1 text-sm text-slate-500">{card.description}</p>
          )}
        </div>
      </div>



      {card.href ? (
        <Link
          href={card.href}
          className={cn(
            "mt-auto inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg transition hover:translate-y-0 hover:brightness-105",
            card.buttonClassName ?? "bg-linear-to-r from-[#52d16a] to-[#19b7ff] shadow-[#19b7ff]/40"
          )}
        >
          {card.buttonLabel}
        </Link>
      ) : (
        <button
          className={cn(
            "mt-auto rounded-full px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg transition hover:translate-y-0 hover:brightness-105",
            card.buttonClassName ?? "bg-linear-to-r from-[#52d16a] to-[#19b7ff] shadow-[#19b7ff]/40"
          )}
        >
          {card.buttonLabel}
        </button>
      )}
    </div>
  )
);

Card.displayName = "Card";

type CardInput = {
  placeholder: string;
};

type Card = {
  title: string;
  description?: string;
  buttonLabel: string;
  icon: React.ReactNode;
  buttonClassName?: string;
  href?: string;
};

export function FocusCards({ cards }: { cards: Card[] }) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-3 max-w-5xl mx-auto md:px-8 w-full">
      {cards.map((card, index) => (
        <Card
          key={card.title}
          card={card}
          index={index}
          hovered={hovered}
          setHovered={setHovered}
        />
      ))}
    </div>
  );
}
