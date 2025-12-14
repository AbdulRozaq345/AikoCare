import React from 'react'

function page() {
  return (
    <section className="mt-16 rounded-3xl bg-[#eaf2f5] px-8 py-12 shadow-inner">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col items-center text-center">
              <span className="text-sm font-semibold uppercase tracking-[0.3em] text-[#3d7ca3]">
                Startup
              </span>
              <h2 className="mt-2 text-3xl font-semibold text-[#0c1b33]">
                Hallo selamat datang di MyHealth
              </h2>
              <p className="mt-2 max-w-2xl text-base text-[#6a7c89]">
                Pantau terus kondisi kesehatan, ketahui BMI ideal, dan hubungi Dr. Aiko kapan pun.
              </p>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Cek Gejala Instan",
                  description: "Masukkan gejala, kami bantu identifikasi kemungkinan penyebabnya.",
                  primary: "Mulai Cek",
                  secondary: "Sakit kepala, demam, dll.",
                },
                {
                  title: "Kalkulator BMI",
                  description: "Hitung indeks massa tubuh ideal dengan cepat.",
                  primary: "Tinggi cm",
                  secondary: "Hitung BMI",
                },
                {
                  title: "Konsultasi Online",
                  description: "Hubungi dokter kapan pun kamu butuh teman diskusi.",
                  primary: "Chat dengan Dokter",
                },
              ].map((card) => (
                <div key={card.title} className="rounded-3xl bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
                  <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e8f2ff] text-2xl text-[#2563eb]">
                    <span>🔹</span>
                  </div>
                  <h3 className="text-xl font-semibold text-[#0f172a]">{card.title}</h3>
                  <p className="mt-3 text-sm text-[#6b7280]">{card.description}</p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <button className="rounded-full bg-gradient-to-r from-[#38bdf8] to-[#0ea5e9] px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-cyan-500/30">
                      {card.primary}
                    </button>
                    {card.secondary && (
                      <button className="rounded-full border border-[#cbd5f5] px-5 py-2 text-sm font-semibold text-[#6b7280]">
                        {card.secondary}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
  )
}

export default page