import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail, Lock, ArrowRight, User,
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

// Premium Animated Register Button Component
interface AnimatedRegisterButtonProps {
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
  success?: boolean;
  error?: boolean;
}

const AnimatedRegisterButton: React.FC<AnimatedRegisterButtonProps> = ({
  onClick,
  disabled = false,
  loading = false,
  success = false,
  error = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);

  const handleClick = () => {
    if (!disabled && !loading && !success) {
      setIsPressed(true);
      setPanelOpen(true);
      setTimeout(() => {
        onClick();
        setTimeout(() => {
          setPanelOpen(false);
          setIsPressed(false);
        }, 300);
      }, 200);
    }
  };

  return (
    <motion.button
      type="submit"
      disabled={disabled || loading || success}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      className={`
        relative w-full h-14 rounded-2xl font-semibold text-white
        overflow-hidden cursor-pointer
        disabled:cursor-not-allowed disabled:opacity-70
        ${error ? 'bg-red-500' : ''}
      `}
      style={{
        background: error ? undefined : 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 50%, #6d28d9 100%)',
        boxShadow: isHovered && !error
          ? '0 0 30px rgba(139, 92, 246, 0.5), 0 0 60px rgba(139, 92, 246, 0.3)'
          : '0 0 20px rgba(139, 92, 246, 0.3), 0 0 40px rgba(139, 92, 246, 0.1)',
      }}
      animate={{
        scale: isHovered && !isPressed && !loading && !success ? 1.02 : isPressed ? 0.98 : 1,
      }}
      transition={{
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0"
        animate={loading ? {
          backgroundPosition: ['200% 0', '-200% 0'],
        } : {}}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{
          background: loading
            ? 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)'
            : undefined,
          backgroundSize: '200% 100%',
        }}
      />

      {/* Glow pulse */}
      <motion.div
        className="absolute inset-0 rounded-2xl"
        animate={isHovered && !loading && !success ? {
          opacity: [0.3, 0.6, 0.3],
        } : {}}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          background: 'radial-gradient(circle at center, rgba(255,255,255,0.3) 0%, transparent 70%)',
        }}
      />

      {/* Panel door animation */}
      <AnimatePresence>
        {panelOpen && (
          <motion.div
            className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-violet-400/20 to-transparent"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          />
        )}
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center gap-2 h-full">
        {success ? (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-2"
          >
            <CheckCircle2 size={20} className="text-white" />
            <span>Muvaffaqiyatli!</span>
          </motion.div>
        ) : loading ? (
          <motion.div
            className="flex items-center gap-2"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
          >
            <motion.div
              className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />
            <span>Ro'yxatdan o'tilmoqda...</span>
          </motion.div>
        ) : (
          <motion.span
            animate={{ x: panelOpen ? -20 : 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-2"
          >
            <span>Ro'yxatdan o'tish</span>
            <ArrowRight size={16} />
          </motion.span>
        )}
      </div>

      {/* Ripple effect on click */}
      <AnimatePresence>
        {isPressed && (
          <motion.div
            className="absolute inset-0 rounded-2xl bg-white/20"
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 1.5, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Simple validation (in real app, this would be an API call)
    if (email && password && name) {
      setSuccess(true);
      setTimeout(() => {
        navigate(ROUTES.LOGIN);
      }, 1000);
    } else {
      setLoading(false);
      setError('Barcha maydonlarni to\'ldiring');
    }
  };

  return (
    <>
      <Helmet><title>Ro'yxatdan o'tish | Qarshiyev</title></Helmet>
      <div className="min-h-screen grid lg:grid-cols-2">
        <BrandPanel />
        <div className="flex items-center justify-center px-6 py-16 bg-slate-50">
          <motion.div
            className="w-full max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="font-serif font-bold text-3xl text-slate-950 mb-2">Ro'yxatdan o'tish</h1>
            <p className="text-slate-500 text-sm mb-8">
              Yangi akkaunt yaratish uchun ma'lumotlaringizni kiriting.
            </p>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 text-red-600 text-sm rounded-xl px-4 py-3 mb-5 border border-red-100"
              >
                {error}
              </motion.div>
            )}

            <form onSubmit={onSubmit} className="space-y-5">
              <div className="relative">
                <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={inputClass}
                  placeholder="Ismingiz"
                />
              </div>
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
              <AnimatedRegisterButton
                onClick={() => {}}
                loading={loading}
                success={success}
              />
            </form>

            <p className="text-center text-sm text-slate-500 mt-6">
              Allaqachon akkauntingiz bormi?{' '}
              <Link
                to={ROUTES.LOGIN}
                className="text-violet-600 font-semibold hover:underline"
              >
                Kirish
              </Link>
            </p>
          </motion.div>
        </div>
      </div>
    </>
  );
};

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
              <Link
                to={ROUTES.REGISTER}
                className="text-violet-600 font-semibold hover:underline"
              >
                Biz bilan bog‘laning
              </Link>
            </p>
          </motion.div>
        </div>
      </div>
    </>
  );
};


