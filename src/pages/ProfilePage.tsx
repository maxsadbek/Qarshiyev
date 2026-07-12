import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Navigate, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  User as UserIcon, Mail, Phone, MapPin, Calendar, Pencil, LogOut,
  Award, Save, X, CheckCircle2, Sparkles, LayoutDashboard, Clock,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/context/AuthContext';
import { formatDate } from '@/utils';
import { ROUTES } from '@/constants';

const BG = '#F8F9FC';
const ACCENT = '#7C3AED';
const DARK = '#0F172A';
const TEXT = '#111827';

const inputClass =
  'w-full bg-white border rounded-xl px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/60 focus:border-transparent transition-all';

const initials = (name: string) =>
  name.split(' ').map((p) => p[0]).filter(Boolean).slice(0, 2).join('').toUpperCase();

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

const floatAnim = (delay: number) => ({
  animate: { y: [0, -14, 0] },
  transition: { duration: 6, repeat: Infinity, ease: 'easeInOut' as const, delay },
});

export const ProfilePage: React.FC = () => {
  const { user, updateProfile, logout } = useAuth();
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: user?.name ?? '',
    phone: user?.phone ?? '',
    location: user?.location ?? '',
    bio: user?.bio ?? '',
    birthDate: user?.birthDate ?? '',
    avatar: user?.avatar ?? '',
  });

  if (!user) return <Navigate to={ROUTES.LOGIN} replace />;

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const save = () => {
    updateProfile(form);
    setEditing(false);
  };

  const handleLogout = () => {
    logout();
    navigate(ROUTES.HOME);
  };

  const personalItems = [
    { icon: <Calendar size={16} />, label: "A'zo bo‘lgan", value: formatDate(user.joinedDate) },
    { icon: <CheckCircle2 size={16} />, label: 'Holat', value: 'Faol' },
    { icon: <UserIcon size={16} />, label: 'Rol', value: 'Talaba' },
  ];

  const contactItems = [
    { icon: <Phone size={16} />, label: 'Telefon', value: user.phone || '—' },
    { icon: <MapPin size={16} />, label: 'Manzil', value: user.location || '—' },
    { icon: <Calendar size={16} />, label: 'Tug‘ilgan sana', value: user.birthDate ? formatDate(user.birthDate) : '—' },
  ];

  const quickStats = [
    { icon: <Clock size={18} />, label: "A'zo", value: user.joinedDate.slice(0, 4) },
    { icon: <CheckCircle2 size={18} />, label: 'Holat', value: 'Faol' },
    { icon: <Award size={18} />, label: 'Rol', value: 'Talaba' },
  ];

  return (
    <>
      <Helmet><title>Kabinet | Qarshiyev</title></Helmet>
      <main style={{ backgroundColor: BG }} className="min-h-screen pb-24 font-sans">
        {/* ===== HERO ===== */}
        <section className="relative overflow-hidden" style={{ backgroundColor: DARK, color: '#fff' }}>
          {/* Abstract purple background */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-24 -left-24 w-[420px] h-[420px] rounded-full blur-3xl" style={{ background: 'radial-gradient(circle, rgba(124,58,237,.45), transparent 70%)' }} />
            <div className="absolute top-10 right-0 w-[360px] h-[360px] rounded-full blur-3xl" style={{ background: 'radial-gradient(circle, rgba(167,139,250,.30), transparent 70%)' }} />
            <div className="absolute bottom-0 left-1/3 w-[300px] h-[300px] rounded-full blur-3xl" style={{ background: 'radial-gradient(circle, rgba(124,58,237,.20), transparent 70%)' }} />
            {/* thin glowing lines */}
            <svg className="absolute inset-0 w-full h-full opacity-[0.12]" preserveAspectRatio="none">
              <defs>
                <linearGradient id="line" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#7C3AED" />
                  <stop offset="100%" stopColor="#A78BFA" />
                </linearGradient>
              </defs>
              <path d="M0 120 Q 400 40 900 140 T 1800 120" stroke="url(#line)" strokeWidth="1.5" fill="none" />
              <path d="M0 220 Q 500 160 1000 240 T 1800 220" stroke="url(#line)" strokeWidth="1" fill="none" />
            </svg>
            {/* subtle dot pattern */}
            <div
              className="absolute inset-0 opacity-[0.06]"
              style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,.8) 1px, transparent 1px)', backgroundSize: '22px 22px' }}
            />
          </div>

          <div className="relative z-10 container-custom pt-32 pb-28 md:pt-40 md:pb-32">
            <div className="flex flex-col md:flex-row md:items-center gap-8">
              {/* Avatar with glow */}
              <div className="relative shrink-0">
                <div className="absolute -inset-3 rounded-2xl blur-2xl" style={{ background: 'linear-gradient(135deg, rgba(124,58,237,.7), rgba(167,139,250,.4))' }} />
                <motion.div
                  className="relative w-32 h-32 md:w-36 md:h-36 rounded-2xl flex items-center justify-center text-4xl font-bold text-white shadow-2xl"
                  style={{ background: 'linear-gradient(135deg, #7C3AED, #A855F7)' }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} className="w-full h-full rounded-2xl object-cover" />
                  ) : (
                    initials(user.name)
                  )}
                </motion.div>
              </div>

              {/* Identity */}
              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-3 flex-wrap">
                  <h1 className="font-bold text-3xl md:text-4xl text-white tracking-tight">{user.name}</h1>
                  <span
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
                    style={{ backgroundColor: 'rgba(124,58,237,.18)', color: '#C4B5FD', border: '1px solid rgba(124,58,237,.35)' }}
                  >
                    <Sparkles size={12} /> Talaba
                  </span>
                </div>
                <p className="mt-2 flex items-center justify-center md:justify-start gap-2 text-white/70 text-sm">
                  <Mail size={14} /> {user.email}
                </p>
                <p className="mt-1 flex items-center justify-center md:justify-start gap-2 text-white/45 text-xs">
                  <Calendar size={13} /> A'zo bo‘lgan: {formatDate(user.joinedDate)}
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-center md:justify-end gap-3 shrink-0">
                <Button
                  variant="gold"
                  size="md"
                  onClick={() => setEditing((e) => !e)}
                  icon={<Pencil size={16} />}
                  className="!bg-gradient-to-r !from-violet-600 !to-violet-500 !border-0 shadow-[0_8px_24px_rgba(124,58,237,.45)] hover:shadow-[0_10px_34px_rgba(124,58,237,.6)] hover:-translate-y-0.5 transition-all duration-300"
                >
                  {editing ? 'Bekor qilish' : 'Tahrirlash'}
                </Button>
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold text-white border border-white/30 hover:bg-white/10 hover:-translate-y-0.5 transition-all duration-300"
                >
                  <LogOut size={16} /> Chiqish
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ===== CONTENT ===== */}
        <div className="container-custom -mt-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* LEFT COLUMN */}
            <div className="lg:col-span-1 space-y-6">
              <InfoCard title="Shaxsiy ma'lumotlar" icon={<UserIcon size={18} />} items={personalItems} index={0} />
              <InfoCard title="Aloqa ma'lumotlari" icon={<Phone size={18} />} items={contactItems} index={1} />

              {/* Quick Stats */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="rounded-2xl p-6"
                style={{ backgroundColor: '#fff', border: `1px solid ${'rgba(124,58,237,.12)'}`, boxShadow: '0 10px 40px rgba(15,23,42,.06)' }}
              >
                <div className="flex items-center gap-2 mb-5">
                  <span className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(124,58,237,.1)', color: ACCENT }}>
                    <LayoutDashboard size={18} />
                  </span>
                  <h3 className="font-semibold text-[15px]" style={{ color: TEXT }}>Tezkor statistika</h3>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {quickStats.map((s) => (
                    <motion.div
                      key={s.label}
                      whileHover={{ y: -4 }}
                      className="rounded-xl p-4 text-center flex flex-col items-center justify-center"
                      style={{ backgroundColor: 'rgba(237,233,254,.55)' }}
                    >
                      <span className="w-8 h-8 rounded-lg flex items-center justify-center mb-2" style={{ backgroundColor: '#fff', color: ACCENT }}>
                        {s.icon}
                      </span>
                      <div className="font-bold text-lg leading-none" style={{ color: TEXT }}>{s.value}</div>
                      <div className="text-[11px] mt-1" style={{ color: 'rgba(17,24,39,.55)' }}>{s.label}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="lg:col-span-2">
              {editing ? (
                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  animate="show"
                  className="rounded-2xl p-7"
                  style={{ backgroundColor: '#fff', border: `1px solid rgba(124,58,237,.12)`, boxShadow: '0 10px 40px rgba(15,23,42,.06)' }}
                >
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="font-semibold text-lg" style={{ color: TEXT }}>Profilni tahrirlash</h3>
                    <button onClick={() => setEditing(false)} className="text-slate-400 hover:text-slate-600">
                      <X size={18} />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {([
                      ['Ism', 'name'],
                      ['Telefon', 'phone'],
                      ['Manzil', 'location'],
                      ['Tug‘ilgan sana', 'birthDate'],
                    ] as const).map(([label, key]) => (
                      <div key={key}>
                        <label className="block text-sm font-semibold mb-2" style={{ color: TEXT }}>{label}</label>
                        <input
                          type={key === 'birthDate' ? 'date' : 'text'}
                          className={inputClass}
                          style={{ borderColor: 'rgba(124,58,237,.12)' }}
                          value={form[key]}
                          onChange={set(key)}
                        />
                      </div>
                    ))}
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-semibold mb-2" style={{ color: TEXT }}>Avatar havolasi</label>
                      <input className={inputClass} style={{ borderColor: 'rgba(124,58,237,.12)' }} value={form.avatar} onChange={set('avatar')} placeholder="https://..." />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-semibold mb-2" style={{ color: TEXT }}>O‘z haqingizda</label>
                      <textarea rows={3} className={`${inputClass} resize-none`} style={{ borderColor: 'rgba(124,58,237,.12)' }} value={form.bio} onChange={set('bio')} />
                    </div>
                  </div>
                  <Button variant="gold" className="mt-5" onClick={save} icon={<Save size={16} />}>
                    Saqlash
                  </Button>
                </motion.div>
              ) : (
                <WelcomeCard />
              )}

              {user.bio && !editing && (
                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 }}
                  className="rounded-2xl p-7 mt-6"
                  style={{ backgroundColor: '#fff', border: `1px solid rgba(124,58,237,.12)`, boxShadow: '0 10px 40px rgba(15,23,42,.06)' }}
                >
                  <h3 className="font-semibold text-[15px] mb-2" style={{ color: TEXT }}>O‘z haqingizda</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(17,24,39,.7)' }}>{user.bio}</p>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

/* ---------- Sub-components ---------- */

const InfoCard: React.FC<{
  title: string;
  icon: React.ReactNode;
  items: { icon: React.ReactNode; label: string; value: string }[];
  index: number;
}> = ({ title, icon, items, index }) => (
  <motion.div
    variants={fadeUp}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    className="rounded-2xl p-6"
    style={{ backgroundColor: '#fff', border: '1px solid rgba(124,58,237,.12)', boxShadow: '0 10px 40px rgba(15,23,42,.06)' }}
  >
    <div className="flex items-center gap-2 mb-5">
      <span className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(124,58,237,.1)', color: ACCENT }}>
        {icon}
      </span>
      <h3 className="font-semibold text-[15px]" style={{ color: TEXT }}>{title}</h3>
    </div>
    <div className="space-y-3">
      {items.map((it) => (
        <motion.div
          key={it.label}
          whileHover={{ y: -3 }}
          className="flex items-center gap-3 rounded-xl p-3.5 transition-shadow"
          style={{ backgroundColor: 'rgba(248,249,252,1)', border: '1px solid rgba(124,58,237,.08)' }}
        >
          <span className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: 'rgba(124,58,237,.08)', color: ACCENT }}>
            {it.icon}
          </span>
          <div className="min-w-0">
            <div className="text-xs" style={{ color: 'rgba(17,24,39,.5)' }}>{it.label}</div>
            <div className="font-semibold text-sm truncate" style={{ color: TEXT }}>{it.value}</div>
          </div>
        </motion.div>
      ))}
    </div>
  </motion.div>
);

const WelcomeCard: React.FC = () => (
  <motion.div
    variants={fadeUp}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true }}
    className="relative overflow-hidden rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center gap-8"
    style={{ backgroundColor: '#fff', border: '1px solid rgba(124,58,237,.12)', boxShadow: '0 10px 40px rgba(15,23,42,.08)' }}
  >
    {/* Left */}
    <div className="flex-1 text-center md:text-left">
      <motion.span
        className="inline-flex items-center justify-center w-12 h-12 rounded-2xl mb-5 text-white shadow-lg"
        style={{ background: 'linear-gradient(135deg, #7C3AED, #A855F7)' }}
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Sparkles size={22} />
      </motion.span>
      <h3 className="font-bold text-2xl md:text-3xl tracking-tight" style={{ color: TEXT }}>Xush kelibsiz!</h3>
      <p className="mt-3 text-sm leading-relaxed max-w-md mx-auto md:mx-0" style={{ color: 'rgba(17,24,39,.65)' }}>
        Bu sizning shaxsiy kabinetingiz. Ma'lumotlaringizni "Tahrirlash" tugmasi orqali
        yangilashingiz, yuqori o'ngdagi "Chiqish" orqali esa kabinetdan chiqib ketishingiz mumkin.
      </p>
      <div className="mt-6 flex items-center justify-center md:justify-start gap-3">
        <Link
          to={ROUTES.HOME}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold text-white shadow-[0_8px_24px_rgba(124,58,237,.4)] hover:-translate-y-0.5 transition-all duration-300"
          style={{ background: 'linear-gradient(135deg, #7C3AED, #A855F7)' }}
        >
          Bosh sahifaga
        </Link>
        <Link
          to={ROUTES.COURSES}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5"
          style={{ color: TEXT, border: '1px solid rgba(124,58,237,.2)' }}
        >
          Kurslarni ko'rish
        </Link>
      </div>
    </div>

    {/* Right: 3D abstract illustration */}
    <div className="relative w-full max-w-[280px] h-[220px] shrink-0">
      <div className="absolute inset-0 rounded-2xl" style={{ background: 'linear-gradient(135deg, rgba(124,58,237,.16), rgba(168,85,247,.08))' }} />
      {/* glass card */}
      <motion.div
        className="absolute top-6 left-6 w-36 h-24 rounded-xl backdrop-blur-md"
        style={{ background: 'rgba(255,255,255,.55)', border: '1px solid rgba(255,255,255,.7)', boxShadow: '0 12px 30px rgba(124,58,237,.18)' }}
        {...floatAnim(0)}
      >
        <div className="m-3 h-2 w-20 rounded-full" style={{ background: 'rgba(124,58,237,.35)' }} />
        <div className="m-3 h-2 w-14 rounded-full" style={{ background: 'rgba(124,58,237,.2)' }} />
        <div className="mx-3 mt-4 h-6 w-12 rounded-lg" style={{ background: 'linear-gradient(135deg,#7C3AED,#A855F7)' }} />
      </motion.div>
      {/* floating sphere 1 */}
      <motion.div
        className="absolute bottom-6 right-8 w-16 h-16 rounded-full"
        style={{ background: 'radial-gradient(circle at 30% 30%, #C4B5FD, #7C3AED)', boxShadow: '0 14px 30px rgba(124,58,237,.45)' }}
        {...floatAnim(1.2)}
      />
      {/* floating sphere 2 */}
      <motion.div
        className="absolute top-2 right-2 w-8 h-8 rounded-full"
        style={{ background: 'radial-gradient(circle at 30% 30%, #E9D5FF, #A855F7)', boxShadow: '0 10px 20px rgba(168,85,247,.4)' }}
        {...floatAnim(2.1)}
      />
      {/* thin glowing ring */}
      <motion.div
        className="absolute -bottom-2 left-10 w-24 h-24 rounded-full border-2"
        style={{ borderColor: 'rgba(124,58,237,.25)' }}
        {...floatAnim(0.6)}
      />
    </div>
  </motion.div>
);
