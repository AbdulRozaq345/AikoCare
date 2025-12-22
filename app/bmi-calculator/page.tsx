

import React from "react";
import { NavbarDemo } from "@/components/navbar";
import BmiCalculator from "@/components/bmi";

function page() {
  

  return (
  <div className="min-h-screen py-30">
      <NavbarDemo />
      <main className="mx-auto flex max-w-6xl flex-col gap-10 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-slate-900 sm:text-4xl">
            Kalkulator BMI
          </h1>
          <p className="mt-2 text-base text-slate-500">
            Hitung indeks massa tubuh ideal Anda sekarang untuk tahu kebutuhan konsultasi selanjutnya.
          </p>
        </div>

        <BmiCalculator />
      </main>
        
    </div>
  );
}

export default page;