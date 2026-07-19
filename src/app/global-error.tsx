'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="font-sans antialiased bg-slate-950 text-white">
        <div className="min-h-screen flex items-center justify-center p-6">
          <div className="text-center max-w-md">
            <h1 className="text-6xl font-bold text-violet-500 mb-4">500</h1>
            <h2 className="text-2xl font-semibold mb-2">Xatolik yuz berdi</h2>
            <p className="text-slate-400 mb-6">
              Kechirasiz, kutilmagan xatolik yuz berdi. Iltimos, keyinroq qayta urinib ko'ring.
            </p>
            <button
              onClick={() => reset()}
              className="inline-flex items-center justify-center h-[46px] px-[30px] rounded-full bg-gradient-to-r from-violet-500 to-violet-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              Qayta urinish
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
