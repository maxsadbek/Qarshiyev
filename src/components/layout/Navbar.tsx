import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Phone } from 'lucide-react';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import { CONTACT_INFO, ROUTES } from '@/constants';
import { cn } from '@/utils';
import { useAuth } from '@/context/AuthContext';
import { useIntro } from '@/context/IntroContext';
import logo from '@/assets/logo.png';

const HEADER_NAV = [
  { label: 'Bosh Sahifa', href: ROUTES.HOME },
  { label: 'Biz Haqimizda', href: ROUTES.ABOUT },
  { label: 'Kurslar', href: ROUTES.COURSES },
  { label: "O'qituvchilar", href: ROUTES.TEACHERS },
  {
    label: 'Yana',
    href: '#',
    children: [
      { label: 'Galereya', href: ROUTES.GALLERY },
      { label: "O'quvchi Natijalari", href: ROUTES.RESULTS },
      { label: 'Tadbirlar', href: ROUTES.EVENTS },
      { label: 'Blog', href: ROUTES.BLOG },
      { label: 'Savollar', href: ROUTES.FAQ },
    ],
  },
];

export const Navbar: React.FC = () => {
  const { isScrolled } = useScrollPosition();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const location = useLocation();
  const userRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user, logout } = useAuth();
  const { isIntroComplete, shouldPlayIntro } = useIntro();

  const isActive = (href: string) =>
    href === '/' ? location.pathname === '/' : location.pathname.startsWith(href);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userRef.current && !userRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setUserMenuOpen(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    setUserMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <motion.header
        className={cn(
          'fixed top-0 inset-x-0 z-50 h-[82px] transition-all duration-500',
          isScrolled
            ? 'bg-[rgba(15,15,25,0.78)] backdrop-blur-[24px] border-b border-white/[0.08] shadow-[0_8px_30px_rgba(0,0,0,0.35)]'
            : 'bg-[rgba(15,15,25,0.55)] backdrop-blur-[18px] border-b border-white/[0.08]'
        )}
        initial={{ y: -82, opacity: 0 }}
        animate={isIntroComplete ? { y: 0, opacity: 1 } : { y: -82, opacity: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="container-custom h-full flex items-center justify-between gap-8 relative">
          {/* Logo + Brand */}
          <Link to="/" className="group flex items-center gap-3.5 flex-shrink-0">
            <img
              id="navbar-logo"
              src={logo}
              alt="Qarshiyev"
              className="w-[52px] h-[52px] rounded-xl object-cover shadow-[0_4px_14px_rgba(0,0,0,0.35)] transition-transform duration-300 group-hover:scale-105"
              style={{ opacity: shouldPlayIntro ? 0 : 1 }}
            />
            <div className="flex flex-col">
              <span className="font-sans font-bold text-white text-[22px] leading-none">
                Qarshiyev
              </span>
              <span className="font-sans text-white/55 text-[13px] leading-none mt-2">
                Ta'lim Markazi
              </span>
            </div>
          </Link>

          {/* Center navigation */}
          <nav className="hidden xl:flex flex-1 min-w-0 items-center justify-center gap-8 h-full">
            {HEADER_NAV.map((item) => {
              if (item.children) {
                return (
                  <div key={item.label} className="relative" ref={dropdownRef}>
                    <button
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      className="group relative inline-flex items-center h-full px-2 text-[15px] font-medium tracking-wide transition-all duration-300 hover:-translate-y-0.5 text-white/70 hover:text-white"
                    >
                      {item.label}
                      <ChevronDown size={14} className={`ml-1 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                    </button>
                    <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-4 w-48 bg-white rounded-xl shadow-2xl border border-slate-100 overflow-hidden transition-all duration-200 ${dropdownOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          to={child.href}
                          onClick={() => setDropdownOpen(false)}
                          className="block px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 hover:text-violet-600 transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              }
              const active = isActive(item.href);
              return (
                <Link
                  key={item.label}
                  to={item.href}
                  className={cn(
                    'group relative inline-flex items-center h-full px-2 text-[15px] font-medium tracking-wide transition-all duration-300 hover:-translate-y-0.5',
                    active ? 'text-white' : 'text-white/70 hover:text-white'
                  )}
                >
                  {item.label}
                  <span
                    className={cn(
                      'absolute left-1/2 -translate-x-1/2 bottom-6 h-[2px] rounded-full bg-gold-500 transition-all duration-300',
                      active
                        ? 'w-7 opacity-100 shadow-[0_0_10px_2px_rgba(138,43,226,0.7)]'
                        : 'w-0 opacity-0 group-hover:w-7 group-hover:opacity-80'
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {user ? (
              <div className="relative hidden xl:flex" ref={userRef}>
                <button
                  onClick={() => setUserMenuOpen((o) => !o)}
                  className="flex items-center gap-2 rounded-full pl-1 pr-3 py-1 bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <span className="w-9 h-9 rounded-full bg-gradient-to-r from-gold-500 to-gold-600 text-white flex items-center justify-center text-sm font-bold">
                    {user.avatar ? (
                      <img src={user.avatar} alt={user.name} className="w-9 h-9 rounded-full object-cover" />
                    ) : (
                      user.name.charAt(0).toUpperCase()
                    )}
                  </span>
                  <span className="text-sm font-medium text-white">{user.name.split(' ')[0]}</span>
                  <ChevronDown size={14} className={cn('text-white/70 transition-transform', userMenuOpen && 'rotate-180')} />
                </button>
                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      className="absolute top-full right-0 mt-3 w-52 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden"
                      initial={{ opacity: 0, y: -8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.96 }}
                      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="p-2">
                        <Link
                          to={ROUTES.PROFILE}
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center px-4 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-950 transition-colors"
                        >
                          Kabinet
                        </Link>
                        <button
                          onClick={() => { logout(); setUserMenuOpen(false); }}
                          className="flex items-center w-full px-4 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
                        >
                          Chiqish
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                to={ROUTES.LOGIN}
                className="group relative hidden sm:inline-flex items-center justify-center h-[46px] px-[30px] rounded-full bg-gradient-to-r from-gold-500 to-gold-600 text-white text-[15px] font-semibold shadow-[0_6px_20px_-8px_rgba(138,43,226,0.8)] transition-all duration-300 hover:scale-105 hover:shadow-[0_10px_30px_-6px_rgba(138,43,226,0.9)]"
              >
                <span className="absolute inset-0 rounded-full bg-gold-400 blur-md opacity-50 animate-[navGlow_3s_ease-in-out_infinite]" />
                <span className="relative">Kirish</span>
              </Link>
            )}

            {/* Mobile toggle */}
            <button
              className="xl:hidden p-2 -mr-2 rounded-xl text-white hover:bg-white/10 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm xl:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              className="fixed top-0 right-0 bottom-0 z-50 w-[82%] max-w-[340px] bg-[rgba(15,15,25,0.92)] backdrop-blur-xl border-l border-white/10 overflow-y-auto"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <Link to="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-3">
                    <img src={logo} alt="Qarshiyev" className="w-11 h-11 rounded-xl object-cover" />
                    <div className="flex flex-col">
                      <span className="font-sans font-bold text-white text-lg leading-none">Qarshiyev</span>
                      <span className="text-white/55 text-xs leading-none mt-1">Ta'lim Markazi</span>
                    </div>
                  </Link>
                  <button
                    onClick={() => setMobileOpen(false)}
                    className="p-2 rounded-xl text-white/70 hover:bg-white/10 hover:text-white transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Nav Links */}
                <nav className="flex flex-col gap-1 mb-8">
                  {HEADER_NAV.map((item) => {
                    if (item.children) {
                      return (
                        <div key={item.label} className="flex flex-col">
                          <button
                            onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
                            className="flex items-center justify-between px-4 py-3.5 rounded-xl text-[15px] font-semibold text-white/70 hover:bg-white/10 hover:text-white transition-colors"
                          >
                            {item.label}
                            <ChevronDown size={16} className={`transition-transform ${mobileDropdownOpen ? 'rotate-180' : ''}`} />
                          </button>
                          <div className={`flex flex-col gap-1 pl-4 mt-1 transition-all duration-200 ${mobileDropdownOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                            {item.children.map((child) => (
                              <Link
                                key={child.label}
                                to={child.href}
                                onClick={() => { setMobileOpen(false); setMobileDropdownOpen(false); }}
                                className="flex items-center px-4 py-3 rounded-xl text-[14px] font-medium text-white/60 hover:bg-white/10 hover:text-white transition-colors"
                              >
                                {child.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      );
                    }
                    const active = isActive(item.href);
                    return (
                      <Link
                        key={item.label}
                        to={item.href}
                        onClick={() => setMobileOpen(false)}
                        className={cn(
                          'flex items-center px-4 py-3.5 rounded-xl text-[15px] font-semibold transition-colors',
                          active
                            ? 'bg-gold-500/15 text-white shadow-[inset_0_0_0_1px_rgba(138,43,226,0.4)]'
                            : 'text-white/70 hover:bg-white/10 hover:text-white'
                        )}
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                </nav>

                {/* Contact + Auth */}
                <div className="border-t border-white/10 pt-6 space-y-3">
                  <a
                    href={`tel:${CONTACT_INFO.phone}`}
                    className="flex items-center gap-3 p-3 rounded-xl bg-white/5 text-white/80 hover:bg-white/10 transition-colors"
                  >
                    <Phone size={16} />
                    <span className="text-sm font-medium">{CONTACT_INFO.phone}</span>
                  </a>
                  {user ? (
                    <>
                      <Link
                        to={ROUTES.PROFILE}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center justify-center w-full h-[46px] rounded-full bg-white/10 text-white font-semibold transition-colors hover:bg-white/20"
                      >
                        Kabinet
                      </Link>
                      <button
                        onClick={() => { logout(); setMobileOpen(false); }}
                        className="flex items-center justify-center w-full h-[46px] rounded-full bg-red-500/90 text-white font-semibold transition-colors hover:bg-red-500"
                      >
                        Chiqish
                      </button>
                    </>
                  ) : (
                    <Link
                      to={ROUTES.LOGIN}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-center w-full h-[46px] rounded-full bg-gradient-to-r from-gold-500 to-gold-600 text-white font-semibold shadow-[0_6px_20px_-8px_rgba(138,43,226,0.8)]"
                    >
                      Kirish
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
