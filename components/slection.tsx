'use client';

import React, { useMemo, useState } from 'react';
import QuestionCard from '@/components/QuestionCard';
import ProgressBar from '@/components/ProgressBar';

// DATA PERTANYAAN DAN SKALA (Untuk demo, bisa dipindahkan ke file terpisah)
const SKALA_JAWABAN = [
  { label: 'Tidak Sama Sekali', score: 0 },
  { label: 'Beberapa Hari', score: 1 },
  { label: 'Lebih dari Setengah Waktu', score: 2 },
  { label: 'Hampir Setiap Hari', score: 3 },
];

const PERTANYAAN_MENTAL = [
  { id: 1, teks: 'Kehilangan minat atau kesenangan dalam melakukan sesuatu.' },
  { id: 2, teks: 'Merasa sedih, tertekan, atau putus asa.' },
  { id: 3, teks: 'Sulit untuk tidur, tetap tertidur, atau tidur terlalu banyak.' },
  { id: 4, teks: 'Merasa lelah atau memiliki sedikit energi.' },
  { id: 5, teks: 'Nafsu makan buruk atau makan berlebihan.' },
  { id: 6, teks: 'Merasa gugup, cemas, atau gelisah.' },
  { id: 7, teks: 'Tidak mampu menghentikan atau mengendalikan kekhawatiran Anda.' },
  { id: 8, teks: 'Terlalu banyak mengkhawatirkan berbagai hal yang berbeda.' },
  { id: 9, teks: 'Sulit berkonsentrasi pada sesuatu, seperti membaca atau menonton TV.' },
  { id: 10, teks: 'Merasa tidak enak tentang diri sendiri atau merasa gagal.' },
];
const TOTAL_QUESTIONS = PERTANYAAN_MENTAL.length;

const REKOMENDASI_SKOR = [
  {
    range: [0, 6],
    level: 'Stabil',
    color: 'text-emerald-600',
    badge: 'bg-emerald-50 text-emerald-700',
    advice:
      'Kondisi emosional Anda terlihat stabil. Pertahankan kebiasaan sehat, tetap aktif, dan lanjutkan rutinitas positif Anda.',
  },
  {
    range: [7, 12],
    level: 'Ringan',
    color: 'text-amber-500',
    badge: 'bg-amber-50 text-amber-700',
    advice:
      'Ada tanda-tanda stres ringan. Luangkan waktu untuk relaksasi, tidur cukup, dan berbagi cerita dengan orang terdekat.',
  },
  {
    range: [13, 20],
    level: 'Sedang',
    color: 'text-orange-500',
    badge: 'bg-orange-50 text-orange-700',
    advice:
      'Tekanan emosional mulai memengaruhi aktivitas harian. Pertimbangkan untuk berkonsultasi dengan profesional atau konselor.',
  },
  {
    range: [21, 30],
    level: 'Tinggi',
    color: 'text-rose-600',
    badge: 'bg-rose-50 text-rose-700',
    advice:
      'Gejala cukup berat. Segera cari bantuan profesional, manfaatkan layanan konseling, dan hubungi orang yang Anda percaya.',
  },
];

const getRecommendation = (totalScore: number) => {
  return (
    REKOMENDASI_SKOR.find(({ range }) => totalScore >= range[0] && totalScore <= range[1]) ??
    REKOMENDASI_SKOR[REKOMENDASI_SKOR.length - 1]
  );
};

type MentalPageProps = {
  className?: string;
};

export default function MentalPage({ className = '' }: MentalPageProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>(() =>
    Array(TOTAL_QUESTIONS).fill(-1)
  );
  const [isFinished, setIsFinished] = useState(false);
  const [totalScore, setTotalScore] = useState(0);

  const answeredCount = useMemo(
    () => answers.filter((score) => score !== -1).length,
    [answers]
  );
  const completionPercentage = useMemo(
    () => Math.round((answeredCount / TOTAL_QUESTIONS) * 100),
    [answeredCount]
  );
  const currentQuestion = PERTANYAAN_MENTAL[currentStep];
  const progressCurrent = isFinished ? TOTAL_QUESTIONS : currentStep + 1;
  const recommendation = isFinished ? getRecommendation(totalScore) : null;

  const handleAnswer = (score: number) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentStep] = score;
    setAnswers(updatedAnswers);

    // 2. Pindah ke langkah berikutnya
    if (currentStep < TOTAL_QUESTIONS - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // 3. Jika selesai, hitung total skor dan tampilkan hasil
      const total = updatedAnswers.reduce((sum, value) => sum + value, 0);
      setTotalScore(total);
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    setAnswers(Array(TOTAL_QUESTIONS).fill(-1));
    setCurrentStep(0);
    setIsFinished(false);
    setTotalScore(0);
  };

  return (
    <section
      className={`w-full rounded-[32px] border border-slate-200 bg-white/90 p-6 shadow-[0_25px_65px_-25px_rgba(15,23,42,.2)] backdrop-blur ${className}`}
    >
      <div className="flex flex-col gap-2 text-left">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
          {isFinished ? 'Tes Selesai' : `Langkah ${progressCurrent}/${TOTAL_QUESTIONS}`}
        </p>
        <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">
          Penilaian Kondisi Mental
        </h2>
        <p className="text-base text-slate-500">
          Jawab setiap pertanyaan dengan jujur untuk mendapatkan saran yang sesuai kebutuhan Anda.
        </p>
      </div>

      <div className="mt-6">
        <ProgressBar current={progressCurrent} total={TOTAL_QUESTIONS} />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <div className="space-y-6">
          {!isFinished ? (
            <QuestionCard
              key={currentQuestion.id}
              pertanyaan={currentQuestion.teks}
              skala={SKALA_JAWABAN}
              initialScore={answers[currentStep] ?? null}
              onAnswer={handleAnswer}
              isLast={currentStep === TOTAL_QUESTIONS - 1}
            />
          ) : (
            <div className="flex flex-col gap-6 rounded-3xl border border-slate-100 bg-slate-50/70 p-6">
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Ringkasan</p>
                <p className="mt-1 text-3xl font-bold text-slate-900">
                  Total Skor Anda: {totalScore}
                </p>
                <p className="mt-2 text-base text-slate-600">
                  Dari maksimum {TOTAL_QUESTIONS * 3} poin ({completionPercentage}% tingkat respons).
                </p>
              </div>
              {recommendation && (
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-inner">
                  <span
                    className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${recommendation.badge}`}
                  >
                    {recommendation.level} • Rekomendasi
                  </span>
                  <p className={`mt-3 text-xl font-semibold ${recommendation.color}`}>
                    Tingkat {recommendation.level}
                  </p>
                  <p className="mt-2 text-base text-slate-600">{recommendation.advice}</p>
                </div>
              )}

              <button
                onClick={handleRestart}
                className="w-full rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-600 transition hover:border-slate-900 hover:text-slate-900"
              >
                Ulangi Tes
              </button>
            </div>
          )}
        </div>

        <aside className="flex flex-col gap-5 rounded-3xl border border-slate-100 bg-gradient-to-br from-slate-900 to-slate-800 p-6 text-white">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-white/70">Status</p>
            <p className="mt-2 text-4xl font-semibold">
              {isFinished ? 'Selesai' : `${completionPercentage}%`}
            </p>
            {!isFinished && (
              <p className="text-sm text-white/70">{answeredCount} dari {TOTAL_QUESTIONS} pertanyaan terisi</p>
            )}
          </div>

          <div className="rounded-2xl bg-white/10 p-4">
            <p className="text-sm font-semibold">Tips Pengisian</p>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-white/80">
              <li>Luangkan waktu 3-5 menit untuk menyelesaikan tes.</li>
              <li>Jawab berdasarkan apa yang Anda rasakan dalam 2 minggu terakhir.</li>
              <li>Tidak ada jawaban benar atau salah — fokus pada kejujuran.</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/80">
            <p className="font-semibold text-white">Bagaimana hasil digunakan?</p>
            <p className="mt-2">
              Skor membantu kami memberikan rekomendasi awal. Untuk diagnosis
              resmi, tetap diperlukan evaluasi tenaga profesional.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}

// Catatan: Anda perlu membuat file ProgressBar.tsx dan QuestionCard.tsx