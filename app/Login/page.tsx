"use client";

import React, { useState } from 'react'
import api from '@/lib/axios'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import { useAuth } from '@/hooks/useAuth'

function LoginPage() {
  const router = useRouter();
  const { fetchUser } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // 1. Ambil CSRF Cookie (Wajib untuk Sanctum)
      await api.get('/sanctum/csrf-cookie');

      const rawXsrf = Cookies.get('XSRF-TOKEN');
      if (!rawXsrf) {
        setError('Cookie XSRF-TOKEN tidak ditemukan. Pastikan SANCTUM_STATEFUL_DOMAINS/SESSION_DOMAIN sudah benar dan backend mengizinkan credentials.');
        return;
      }
      const decodedXsrf = decodeURIComponent(rawXsrf);

      // 2. Kirim request login beserta header token
      await api.post(
        '/login',
        {
          email,
          password,
        },
        {
          headers: {
            'X-XSRF-TOKEN': decodedXsrf,
          },
        },
      );

      await fetchUser();

      // 3. Jika sukses, arahkan ke beranda (page.tsx)
      window.location.href = '/';
    } catch (err: any) {
      // Jika Laravel mengirimkan error validasi (email/password salah)
      if (err.response?.status === 422) {
        setError(err.response.data.message || 'Email atau password salah.');
      } else if (err.response?.status === 419) {
        setError('Sesi kadaluarsa. Silakan muat ulang halaman.');
      } else {
        setError('Terjadi kesalahan server. Silakan coba lagi nanti.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative py-3 sm:max-w-xl sm:mx-auto">
      <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
        <div className="max-w-md mx-auto">
          <div className="flex items-center space-x-5 justify-center">
            <div className="flex justify-center items-center mb-10">
              <span className="text-2xl text-gray-800 tracking-tight font-semibold">Login</span>
            </div>
          </div>

          {/* Komponen Alert Error */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded shadow-sm" role="alert">
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className="mt-5">
              <label className="font-semibold text-sm text-gray-800 pb-1 block" htmlFor="email">E-mail</label>
              <input 
                type="email"
                id="email"
                className="border border-gray-300 rounded-lg px-3 py-2 mt-1 mb-5 w-full text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
              
              <label className="font-semibold text-sm text-gray-800 pb-1 block" htmlFor="password">Password</label>
              <input 
                type="password" 
                id="password"
                className="border border-gray-300 rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
            </div>

            <div className="text-right mb-4">
              <a className="text-xs font-semibold text-gray-500 hover:text-blue-600 transition" href="#">
                Forgot Password?
              </a>
            </div>

            <div className="mt-5 mb-5">
              <button 
                type="submit"
                disabled={loading}
                className={`py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md rounded-lg focus:outline-none ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {loading ? 'Logging in...' : 'Log In'}
              </button>
            </div>
          </form>

          {/* Social Login Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition shadow-sm">
               <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="h-5 w-5 mr-2" alt="Google" />
               <span className="text-sm font-semibold text-gray-700">Google</span>
            </button>
            <button className="flex items-center justify-center py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition shadow-sm">
               <img src="https://www.svgrepo.com/show/442923/apple-logo.svg" className="h-5 w-5 mr-2" alt="Apple" />
               <span className="text-sm font-semibold text-gray-700">Apple</span>
            </button>
          </div>

          <div className="flex items-center justify-between mt-8">
            <span className="w-1/5 border-b border-gray-300 md:w-1/4" />
            <a className="text-xs text-gray-500 uppercase hover:text-blue-600 hover:underline transition" href="/SignUp">
              or sign up
            </a>
            <span className="w-1/5 border-b border-gray-300 md:w-1/4" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage;