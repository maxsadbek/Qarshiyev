import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail, Lock, ArrowRight, User,
  CheckCircle2, Eye, EyeOff,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/utils';
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

  const isInteractive = !disabled && !loading && !success;

  const handleClick = () => {
    if (isInteractive) {
      setIsPressed(true);
      setPanelOpen(true);
      window.setTimeout(() => {
        onClick();
        window.setTimeout(() => {
          setPanelOpen(false);
          setIsPressed(false);
        }, 320);
      }, 220);
    }
  };

  const baseGradient = 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 55%, #6d28d9 100%)';
  const hoverGradient = 'linear-gradient(135deg, #a78bfa 0%, #8b5cf6 55%, #7c3aed 100%)';

  return (
    <motion.button
      type="submit"
      disabled={disabled || loading || success}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      className={cn(
        'relative w-full h-14 rounded-2xl font-semibold text-white overflow-hidden cursor-pointer select-none',
        'disabled:cursor-not-allowed disabled:opacity-70',
        error ? 'bg-red-500' : ''
      )}
      style={{
        background: error ? undefined : isHovered ? hoverGradient : baseGradient,
        boxShadow: isHovered && !error
          ? '0 10px 30px -8px rgba(124,58,237,0.7), 0 0 24px rgba(139,92,246,0.45)'
          : '0 8px 24px -10px rgba(124,58,237,0.6), 0 0 18px rgba(139,92,246,0.25)',
      }}
      animate={{
        scale: isHovered && !isPressed && !loading && !success ? 1.02 : isPressed ? 0.98 : 1,
      }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Loading shimmer: moving light traveling across the button */}
      {loading && (
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(100deg, transparent 20%, rgba(255,255,255,0.4) 50%, transparent 80%)',
            backgroundSize: '220% 100%',
          }}
          animate={{ backgroundPositionX: ['220%', '-220%'] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'linear' }}
        />
      )}

      {/* Hover glow pulse */}
      {isHovered && !loading && !success && !error && (
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{ background: 'radial-gradient(circle at center, rgba(255,255,255,0.25) 0%, transparent 70%)' }}
          animate={{ opacity: [0.25, 0.5, 0.25] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}

      {/* Futuristic door + glowing arrow entering on click */}
      <AnimatePresence>
        {panelOpen && (
          <>
            <motion.div
              key="door"
              className="absolute right-0 top-0 bottom-0 w-14 rounded-r-2xl pointer-events-none"
              style={{ background: 'linear-gradient(90deg, rgba(167,139,250,0) 0%, rgba(196,181,253,0.85) 100%)' }}
              initial={{ x: '110%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '110%', opacity: 0 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.div
              key="arrow"
              className="absolute top-1/2 -translate-y-1/2 text-white pointer-events-none"
              initial={{ right: '10%', opacity: 0 }}
              animate={{ right: ['10%', '24%'], opacity: [0, 1, 1, 0] }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
            >
              <ArrowRight size={18} className="drop-shadow-[0_0_8px_rgba(255,255,255,0.9)]" />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Success particle / glow burst */}
      <AnimatePresence>
        {success && (
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            {[...Array(10)].map((_, i) => {
              const angle = (i / 10) * Math.PI * 2;
              return (
                <motion.span
                  key={i}
                  className="absolute w-1.5 h-1.5 rounded-full bg-white"
                  style={{ boxShadow: '0 0 8px rgba(255,255,255,0.9)' }}
                  initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                  animate={{ x: Math.cos(angle) * 56, y: Math.sin(angle) * 56, opacity: 0, scale: 0.2 }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                />
              );
            })}
          </div>
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
            <CheckCircle2 size={20} />
            <span>Muvaffaqiyatli!</span>
          </motion.div>
        ) : loading ? (
          <motion.div
            className="flex items-center gap-2"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
          >
            <motion.span
              className="block w-4 h-4 rounded-full border-2 border-white/30 border-t-white"
              animate={{ rotate: 360 }}
              transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
            />
            <span>Ro‘yxatdan o‘tilmoqda…</span>
          </motion.div>
        ) : (
          <motion.span
            animate={{ x: panelOpen ? -22 : 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-2"
          >
            <span>Ro‘yxatdan o‘tish</span>
            <ArrowRight size={16} />
          </motion.span>
        )}
      </div>

      {/* Ripple on click */}
      <AnimatePresence>
        {isPressed && (
          <motion.div
            className="absolute inset-0 rounded-2xl bg-white/20 pointer-events-none"
            initial={{ scale: 0, opacity: 0.8 }}
            animate={{ scale: 1.4, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export const RegisterPage: React.FC = () => {
  const { register } = useAuth();
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

    if (!name.trim() || !email.trim() || !password) {
      setError('Barcha maydonlarni to‘ldiring');
      return;
    }

    // Let the click/door animation play first, then show the loading state
    await new Promise((resolve) => setTimeout(resolve, 500));
    setLoading(true);

    // Premium loading animation
    await new Promise((resolve) => setTimeout(resolve, 1200));

    const result = register({ name, email, password });
    if (result.ok) {
      setSuccess(true);
      // User is now authenticated — go straight to the profile
      setTimeout(() => navigate(ROUTES.PROFILE), 900);
    } else {
      setLoading(false);
      setError(result.error ?? 'Xatolik yuz berdi');
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


