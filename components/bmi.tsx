"use client";

import React, { useMemo, useState } from "react";

type BmiResult = {
  bmi: string;
  status: string;
  badgeClass: string;
  description: string;
};

function getBmiResult(heightCm: number, weightKg: number): BmiResult | null {
  if (!heightCm || !weightKg) return null;
  const heightM = heightCm / 100;
  if (heightM <= 0) return null;

  const bmiValue = weightKg / (heightM * heightM);
  const rounded = bmiValue.toFixed(1);

  if (bmiValue < 18.5)
    return {
      bmi: rounded,
      status: "Berat Badan Kurang",
      badgeClass: "bg-blue-500",
      description: "Tingkatkan asupan nutrisi dan konsultasikan rencana makan."
    };
  if (bmiValue < 25)
    return {
      bmi: rounded,
      status: "Normal",
      badgeClass: "bg-emerald-500",
      description: "Pertahankan pola hidup sehat dan rutin bergerak."
    };
  if (bmiValue < 30)
    return {
      bmi: rounded,
      status: "Berat Berlebih",
      badgeClass: "bg-amber-500",
      description: "Perbaiki pola makan dan tambah aktivitas fisik teratur."
    };
  return {
    bmi: rounded,
    status: "Obesitas",
    badgeClass: "bg-rose-500",
    description: "Segera konsultasikan program khusus bersama Dr. Aiko."
  };
}

export default function BmiCalculator() {
  const [height, setHeight] = useState<string>("");
  const [weight, setWeight] = useState<string>("");

  const result = useMemo(() => {
    const heightNumber = parseFloat(height);
    const weightNumber = parseFloat(weight);
    if (Number.isNaN(heightNumber) || Number.isNaN(weightNumber)) return null;
    return getBmiResult(heightNumber, weightNumber);
  }, [height, weight]);

  const reset = () => {
    setHeight("");
    setWeight("");
  };

  return (
    <section className="w-full rounded-[32px] bg-[#bedadc] p-8 shadow-[0_20px_70px_rgba(15,36,74,0.08)] ring-1 ring-slate-400 backdrop-blur mb-40">
      <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-2 text-left text-sm font-semibold text-slate-700">
              Tinggi (cm)
              <input
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                type="number"
                min={0}
                placeholder="Masukkan tinggi Anda"
                className="rounded-2xl border border-slate-900 bg-white px-4 py-3 text-base font-medium text-slate-800 outline-none transition focus:border-[#0f244a] focus:ring-2 focus:ring-[#0f244a]/20"
              />
            </label>
            <label className="flex flex-col gap-2 text-left text-sm font-semibold text-slate-700">
              Berat (kg)
              <input
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                type="number"
                min={0}
                placeholder="Masukkan berat Anda"
                className="rounded-2xl border border-slate-900 bg-white px-4 py-3 text-base font-medium text-slate-800 outline-none transition focus:border-[#0f244a] focus:ring-2 focus:ring-[#0f244a]/20"
              />
            </label>
          </div>

          <div className="flex flex-wrap gap-4">
            <button
              type="button"
              onClick={reset}
              className="rounded-full border border-slate-500 px-6 py-2 text-sm font-semibold text-slate-600 transition hover:border-slate-900"
            >
              Reset
            </button>
          </div>

          <div className="rounded-3xl bg-slate-50/80 p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">
              Hasil BMI
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-4">
              <span className="text-5xl font-semibold text-[#0f244a]">
                {result?.bmi ?? "--"}
              </span>
              {result ? (
                <span className={`rounded-full px-4 py-1 text-sm font-semibold text-white ${result.badgeClass}`}>
                  {result.status}
                </span>
              ) : (
                <span className="text-sm text-slate-500">
                  Masukkan tinggi dan berat untuk melihat hasil.
                </span>
              )}
            </div>
            {result && (
              <p className="mt-4 text-sm text-slate-500">{result.description}</p>
            )}
          </div>

          <p className="text-sm leading-relaxed text-slate-500">
            BMI (Body Mass Index) membandingkan berat badan terhadap tinggi badan. Nilai ideal berada di rentang 18.5 - 24.9.
            Untuk saran pribadi, konsultasikan langsung dengan Dr. Aiko.
          </p>
        </form>

        <div className="flex flex-col items-center justify-center p-6 text-center ">
          <img
            src="AikoHappy.png"
            alt="dr aiko ilustrasi"
            className="h-60 w-60 object-contain"
          />
          <p className="mt-4 text-sm text-slate-500">Tetap jaga pola hidup sehat ya!</p>
        </div>
      </div>
    </section>
  );
}