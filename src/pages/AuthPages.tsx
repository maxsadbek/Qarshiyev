import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import {
  Mail, Lock, ArrowRight,
  CheckCircle2, Eye, EyeOff,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/context/AuthContext';
import { ROUTES } from '@/constants';
import logo from '@/assets/logo.png';

const inputClass =
  'w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all';

const BrandPanel: React.FC = () => (
  <div className="relative hidden lg:flex flex-col justify-between overflow-hidden bg-slate-950 text-white p-12">
    <div className="absolute inset-0 opacity-30 bg-[url('https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&q=90')] bg-cover bg-center" />
    <div className="absolute inset-0 bg-gradient-to-br from-slate-950/90 to-violet-900/70" />
    <div className="relative z-10 flex items-center gap-3">
      <img src={logo} alt="Qarshiyev" className="w-12 h-12 rounded-xl object-cover" />
      <span className="font-serif font-bold text-xl">Qarshiyev</span>
    </div>
    <div className="relative z-10">
      <h2 className="font-serif font-bold text-4xl leading-tight mb-4">
        Bilim — <br /> kelajakning kaliti
      </h2>
      <p className="text-white/70 max-w-sm leading-relaxed">
        Shaxsiy kabinetingiz orqali kurslaringizni kuzating, natijalaringizni
        kuzating va o‘qish jarayonini boshqaring.
      </p>
      <ul className="mt-8 space-y-3">
        {[
          'Kurslarga bepul yozilish',
          'Shaxsiy natijalar va sertifikatlar',
          'O‘qituvchilar bilan bog‘lanish',
        ].map((item) => (
          <li key={item} className="flex items-center gap-3 text-white/80 text-sm">
            <CheckCircle2 size={18} className="text-violet-400 shrink-0" />
            {item}
          </li>
        ))}
      </ul>
    </div>
    <div className="relative z-10 text-white/40 text-xs">
      © {new Date().getFullYear()} Qarshiyev Ta'lim Markazi
    </div>
  </div>
);

export const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const result = login(email, password);
    if (result.ok) {
      navigate(ROUTES.PROFILE);
    } else {
      setError(result.error ?? 'Xatolik yuz berdi');
    }
  };

  return (
    <>
      <Helmet><title>Kirish | Qarshiyev</title></Helmet>
      <div className="min-h-screen grid lg:grid-cols-2">
        <BrandPanel />
        <div className="flex items-center justify-center px-6 py-16 bg-slate-50">
          <motion.div
            className="w-full max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="font-serif font-bold text-3xl text-slate-950 mb-2">Xush kelibsiz!</h1>
            <p className="text-slate-500 text-sm mb-8">
              Kabinetingizga kirish uchun ma'lumotlaringizni kiriting.
            </p>

            {error && (
              <div className="bg-red-50 text-red-600 text-sm rounded-xl px-4 py-3 mb-5 border border-red-100">
                {error}
              </div>
            )}

            <form onSubmit={onSubmit} className="space-y-5">
              <div className="relative">
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputClass}
                  placeholder="Email manzilingiz"
                />
              </div>
              <div className="relative">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={inputClass}
                  placeholder="Parol"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  aria-label="Parolni ko'rsatish"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <Button type="submit" variant="gradient" size="md" className="w-full">
                Kirish
                <ArrowRight size={16} />
              </Button>
            </form>

            <p className="text-center text-sm text-slate-500 mt-6">
              Akkountingiz yo‘qmi?{' '}
              <a
                href="https://telegram.me/SIROJIDDIN_QARSHIYEV"
                target="_blank"
                rel="noopener noreferrer"
                className="text-violet-600 font-semibold hover:underline"
              >
                Biz bilan bog‘laning
              </a>
            </p>
          </motion.div>
        </div>
      </div>
    </>
  );
};


