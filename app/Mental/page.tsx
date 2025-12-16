import React from 'react';
import { NavbarDemo } from '@/components/navbar';
import MentalPage from '@/components/slection';

function MentalAssessment() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100">
      <NavbarDemo />
      <main className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-4 pb-16 pt-28 sm:px-6 lg:px-8">
        <section className="rounded-[32px] border border-white/80 bg-white/90 p-8 text-center shadow-[0_40px_95px_-45px_rgba(15,23,42,.35)]">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-400">
            Self Assessment
          </p>
          <h1 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
            Cek Kondisi Mental Anda
          </h1>
          <p className="mt-3 text-base leading-relaxed text-slate-500 sm:text-lg">
            Jawab 10 pertanyaan cepat untuk mengetahui gambaran awal suasana hati dan kebutuhan dukungan Anda.
          </p>
        </section>

        <MentalPage />
      </main>
    </div>
  );
}

export default MentalAssessment;