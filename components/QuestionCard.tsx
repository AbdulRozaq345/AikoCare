'use client';

import React, { useState, useEffect } from 'react';

interface SkalaItem {
  label: string;
  score: number;
}

interface QuestionCardProps {
  pertanyaan: string;
  skala: SkalaItem[];
  onAnswer: (score: number) => void;
  initialScore: number | null;
  isLast: boolean;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ pertanyaan, skala, onAnswer, initialScore, isLast }) => {
  const [selectedScore, setSelectedScore] = useState<number | null>(initialScore);

  // Sinkronkan state lokal dengan prop initialScore saat komponen dimuat/diperbarui
  useEffect(() => {
    setSelectedScore(initialScore);
  }, [initialScore]);


  const handleSubmit = () => {
    if (selectedScore !== null) {
      // Panggil fungsi onAnswer dari parent dan berikan skor yang dipilih
      onAnswer(selectedScore);
      // Pilihan tidak perlu di-reset di sini karena parent akan merender komponen baru
    } else {
      alert('Mohon pilih salah satu jawaban sebelum melanjutkan.');
    }
  };

  return (
    <div className="items-center flex flex-col bg-gray-200 rounded-3xl p-6 shadow-xl border ">
      <p className="text-xl font-semibold text-gray-900 mb-6">{pertanyaan}</p>
      
      {/* Pilihan Jawaban (Radio Buttons) */}
      <div className="flex flex-col gap-4 mb-8">
        {skala.map((item) => (
          <label 
            key={item.score} 
            className={`flex items-center p-3 rounded-lg cursor-pointer transition duration-200 ${
                selectedScore === item.score ? 'bg-blue-100 border border-blue-500' : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            <input
              type="radio"
              name="jawaban"
              value={item.score}
              checked={selectedScore === item.score}
              onChange={() => setSelectedScore(item.score)}
              className="form-radio h-5 w-5 text-blue-600"
            />
            <span className="ml-3 text-lg text-gray-700 font-medium">{item.label}</span>
          </label>
        ))}
      </div>
      
      {/* Tombol Lanjut */}
      <button 
        onClick={handleSubmit} 
        disabled={selectedScore === null} 
        className={`w-full py-3 rounded-lg text-white font-bold transition duration-300 ${
            selectedScore !== null ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
        }`}
      >
        {isLast ? 'Lihat Hasil Tes' : 'Lanjut ke Pertanyaan Berikutnya'}
      </button>
    </div>
  );
};

export default QuestionCard;