import React from 'react';

import MentalPage from '@/components/slection';

function MentalAssessment() {
  return (
    <div className="min-h-screen h-full py-25 ">
      <main className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-4 pb-16  sm:px-6 lg:px-8">
        <section className="p-8 text-center ">
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