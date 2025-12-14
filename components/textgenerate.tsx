"use client";
import { TextGenerateEffect } from "./ui/text-generate-effect";

const words = `Mau spill masalah fisik atau uneg-uneg mental? 
Pilih topik yang paling kamu butuhkan hari ini. Dr. Aiko siap sedia kasih solusi best yang praktis dan akurat.
`;

export function TextGenerateEffectDemo() {
  return <TextGenerateEffect words={words} />;
}
