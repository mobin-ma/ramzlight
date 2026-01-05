'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';

const LoginPage = () => {
  const [code, setCode] = useState('');
  const { login, error, isLoginLoading, clearAuthError } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(code);
  };

  // Clear error when code changes
  useEffect(() => {
    if (error) {
      clearAuthError();
    }
  }, [code, error, clearAuthError]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#17161c] text-white">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-white">
            ورود به رمز لایت
          </h2>
          <p className="mt-2 text-sm text-zinc-400">
            لطفاً کد احراز هویت را وارد کنید
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="auth-code" className="sr-only">
              کد احراز هویت
            </label>
            <input
              id="auth-code"
              name="code"
              type="password"
              required
              className="appearance-none rounded-md relative block w-full px-3 py-2 border text-white border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-amber-500 focus:border-amber-500 focus:z-10 sm:text-sm"
              placeholder="کد احراز هویت"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>

          {error && (
            <div className="text-red-600 text-sm text-center">
              {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoginLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoginLoading ? 'در حال ورود...' : 'ورود'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;