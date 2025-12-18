
'use client';
import React, { useState } from 'react'
import type { AxiosError } from 'axios'
import api from '@/lib/axios'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import { useAuth } from '@/hooks/useAuth'

type FormFields = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

type ErrorMessages = Partial<Record<keyof FormFields | 'general', string[]>>;

const Form = () => {
  const router = useRouter();
  const { fetchUser } = useAuth();

  const [formData, setFormData] = useState<FormFields>({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });
  
  // State untuk loading dan error yang lebih detail
  const [errors, setErrors] = useState<ErrorMessages>({});
  const [status, setStatus] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    setStatus(true);

    try {
      // 1) Ambil CSRF cookie (dijalankan sekali dari browser)
      await api.get('/sanctum/csrf-cookie');

      // 2) Ambil cookie XSRF-TOKEN dari browser menggunakan js-cookie
      const rawXsrf = Cookies.get('XSRF-TOKEN');
      if (!rawXsrf) {
        setErrors({
          general: ['Cookie XSRF-TOKEN tidak ditemukan. Cek konfigurasi SANCTUM_STATEFUL_DOMAINS/SESSION_DOMAIN serta apakah backend mengizinkan credentials.'],
        });
        return;
      }
      const decodedXsrf = decodeURIComponent(rawXsrf);

      // 3) Kirim data registrasi ke Laravel (endpoint web route /register)
      await api.post('/register', formData, {
        headers: {
          'X-XSRF-TOKEN': decodedXsrf,
        },
      });

      await fetchUser();
      
      router.push('/Login');
    } catch (error) {
      const axiosError = error as AxiosError<{ errors?: ErrorMessages }>;
      if (axiosError.response?.status === 422 && axiosError.response.data?.errors) {
        setErrors(axiosError.response.data.errors);
      } else {
        // 419 (CSRF) akan masuk sini juga — jika terjadi, Anda akan melihat status 419 di axiosError.response.status
        if (axiosError.response?.status === 419) {
          setErrors({ general: ['CSRF token mismatch. Pastikan Anda memanggil /sanctum/csrf-cookie sebelum POST dan request dijalankan dari browser.'] });
        } else {
          setErrors({ general: ['Terjadi kesalahan. Silakan coba lagi nanti.'] });
        }
      }
    } finally {
      setStatus(false);
    }
  };

  return (
  <section className="min-h-screen bg-linear-to-br from-slate-100 via-white to-blue-50 py-16 px-4">
      <div className="mx-auto max-w-5xl rounded-3xl border border-white/50 bg-white/80 p-1 shadow-2xl shadow-blue-100 backdrop-blur">
        <div className="grid gap-8 rounded-3xl bg-white/90 p-8 md:grid-cols-2">
          
          {/* Sisi Kiri - Informasi */}
          <div className="space-y-6 rounded-2xl bg-linear-to-br from-blue-600 via-blue-500 to-sky-400 p-8 text-white">
            <p className="inline-flex rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white/90">
              Selamat datang di AikoCare
            </p>
            <div>
              <h1 className="text-3xl font-semibold leading-tight">Buat akun baru dan mulai perjalanan sehatmu</h1>
              <p className="mt-4 text-sm text-white/90">
                Kelola kesehatan kamu dengan lebih mudah, dapatkan rekomendasi personal, dan terhubung dengan tenaga medis terpercaya.
              </p>
            </div>
            <div className="space-y-3">
              {["Monitoring kesehatan real-time", 'Konsultasi dengan tenaga medis', 'Tips gaya hidup dan nutrisi harian'].map((item) => (
                <div key={item} className="flex items-start gap-3 text-sm">
                  <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/20 text-xs font-semibold">✓</span>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Sisi Kanan - Form */}
          <div className="space-y-6">
            <div className="space-y-2 text-center">
              <h2 className="text-2xl font-semibold text-slate-900">Daftar akun</h2>
              <p className="text-sm text-slate-500">Mulai akses dashboard kesehatanmu dalam hitungan detik.</p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Error General */}
              {errors.general && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {errors.general[0]}
                </div>
              )}

              {/* Input Nama */}
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-slate-600">Nama lengkap</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className={`w-full rounded-2xl border ${errors.name ? 'border-red-400' : 'border-slate-200'} bg-white px-4 py-3 text-sm text-slate-900 shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100`}
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                {errors.name && <p className="text-xs text-red-500 ml-1">{errors.name[0]}</p>}
              </div>

              {/* Input Email */}
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-slate-600">Alamat email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className={`w-full rounded-2xl border ${errors.email ? 'border-red-400' : 'border-slate-200'} bg-white px-4 py-3 text-sm text-slate-900 shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100`}
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                {errors.email && <p className="text-xs text-red-500 ml-1">{errors.email[0]}</p>}
              </div>

              {/* Input Password */}
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-slate-600">Kata sandi</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  className={`w-full rounded-2xl border ${errors.password ? 'border-red-400' : 'border-slate-200'} bg-white px-4 py-3 text-sm text-slate-900 shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100`}
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                {errors.password && <p className="text-xs text-red-500 ml-1">{errors.password[0]}</p>}
              </div>

              {/* Konfirmasi Password */}
              <div className="space-y-2">
                <label htmlFor="password_confirmation" className="text-sm font-medium text-slate-600">Konfirmasi kata sandi</label>
                <input
                  id="password_confirmation"
                  name="password_confirmation"
                  type="password"
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                  value={formData.password_confirmation}
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={status}
                className={`w-full rounded-2xl bg-linear-to-r from-blue-600 to-sky-500 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg transition hover:shadow-blue-300 focus:outline-none focus:ring-4 focus:ring-blue-200 ${status ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {status ? 'Sedang Memproses...' : 'Buat akun'}
              </button>
              
              <p className="text-center text-sm text-slate-500">
                Sudah punya akun?{' '}
                <a className="font-semibold text-blue-600 hover:text-blue-500" href="/Login">
                  Masuk sekarang
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Form;