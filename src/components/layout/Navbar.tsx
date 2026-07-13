import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  ChevronDown,
  Phone,
  Home,
  Info,
  GraduationCap,
  Users,
  Image,
  Trophy,
  Calendar,
  FileText,
  HelpCircle,
  PhoneCall,
  Sparkles,
  MoreHorizontal,
} from 'lucide-react';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import { NAV_ITEMS, CONTACT_INFO, ROUTES } from '@/constants';
import { Button } from '@/components/ui/Button';
import { cn } from '@/utils';
import { useAuth } from '@/context/AuthContext';
import logo from '@/assets/logo.png';

const getIcon = (label: string) => {
  switch (label.toLowerCase()) {
    case 'bosh sahifa':
      return <Home size={18} />;
    case 'biz haqimizda':
      return <Info size={18} />;
    case 'kurslar':
      return <GraduationCap size={18} />;
    case "o'qituvchilar":
      return <Users size={18} />;
    case 'yana':
      return <MoreHorizontal size={18} />;
    case 'galereya':
      return <Image size={16} />;
    case "o'quvchi natijalari":
      return <Trophy size={16} />;
    case 'tadbirlar':
      return <Calendar size={16} />;
    case 'blog':
      return <FileText size={16} />;
    case 'savollar':
      return <HelpCircle size={16} />;
    case 'aloqa':
      return <PhoneCall size={18} />;
    default:
      return <Sparkles size={18} />;
  }
};

export const Navbar: React.FC = () => {
  const { isScrolled } = useScrollPosition();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();
  const navRef = useRef<HTMLElement>(null);
  const userRef = useRef<HTMLDivElement>(null);
  const { user, logout } = useAuth();

  const isActive = (href: string) =>
    href === '/' ? location.pathname === '/' : location.pathname.startsWith(href);

  const hasActiveChild = (item: any) => {
    return item.children?.some((child: any) => {
      return child.href === '/' ? location.pathname === '/' : location.pathname.startsWith(child.href);
    }) || false;
  };

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
      if (userRef.current && !userRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdown on keydown (Escape)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close dropdown on location change
  useEffect(() => {
    setActiveDropdown(null);
  }, [location]);

  // Open mobile dropdown if any child is active when mobile menu is opened
  useEffect(() => {
    if (mobileOpen) {
      const activeChild = NAV_ITEMS.find(item => item.children && hasActiveChild(item));
      if (activeChild) {
        setMobileDropdownOpen(true);
      }
    }
  }, [mobileOpen, location.pathname]);

  return (
    <>
      <motion.header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100'
            : 'bg-transparent'
        )}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-18 md:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <img src={logo} alt="Qarshiyev" className="w-10 h-10 rounded-xl object-cover shadow-sm group-hover:opacity-80 transition-opacity duration-300" />
              <div>
                <span
                  className={cn(
                    'font-serif font-bold text-lg leading-none transition-colors duration-300',
                    isScrolled ? 'text-slate-950' : 'text-white'
                  )}
                >
                  Qarshiyev
                </span>
                <p
                  className={cn(
                    'text-xs font-medium tracking-wider transition-colors duration-300',
                    isScrolled ? 'text-slate-400' : 'text-white/70'
                  )}
                >
                  Ta'lim Markazi
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav ref={navRef} className="hidden lg:flex items-center gap-1">
              {NAV_ITEMS.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                >
                  {item.children ? (
                    <button
                      onClick={() => setActiveDropdown(activeDropdown === item.label ? null : item.label)}
                      className={cn(
                        'flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer select-none outline-none',
                        activeDropdown === item.label
                          ? isScrolled
                            ? 'text-slate-950 bg-slate-100'
                            : 'text-white bg-white/15'
                          : isScrolled
                          ? 'text-slate-600 hover:text-slate-950 hover:bg-slate-100'
                          : 'text-white/80 hover:text-white hover:bg-white/10'
                      )}
                    >
                      {item.label}
                      <ChevronDown
                        size={14}
                        className={cn(
                          'transition-transform duration-200',
                          activeDropdown === item.label && 'rotate-180'
                        )}
                      />
                    </button>
                  ) : (
                    <Link
                      to={item.href}
                      className={cn(
                        'flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
                        isActive(item.href)
                          ? isScrolled
                            ? 'text-slate-950 bg-slate-100'
                            : 'text-white bg-white/15'
                          : isScrolled
                          ? 'text-slate-600 hover:text-slate-950 hover:bg-slate-100'
                          : 'text-white/80 hover:text-white hover:bg-white/10'
                      )}
                    >
                      {item.label}
                    </Link>
                  )}

                  {/* Dropdown */}
                  <AnimatePresence>
                    {item.children && activeDropdown === item.label && (
                      <motion.div
                        className="absolute top-full left-0 mt-2 w-52 bg-white rounded-lg shadow-xl border border-slate-100 overflow-hidden"
                        initial={{ opacity: 0, y: -8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.96 }}
                        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <div className="p-2">
                          {item.children.map((child) => (
                            <Link
                              key={child.label}
                              to={child.href}
                              onClick={() => setActiveDropdown(null)}
                              className={cn(
                                'flex items-center px-4 py-2.5 rounded-xl text-sm font-medium transition-colors',
                                isActive(child.href)
                                  ? 'bg-violet-50 text-violet-700'
                                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-950'
                              )}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href={`tel:${CONTACT_INFO.phone}`}
                className={cn(
                  'flex items-center gap-2 text-sm font-medium transition-colors',
                  isScrolled ? 'text-slate-600 hover:text-slate-950' : 'text-white/80 hover:text-white'
                )}
              >
                <Phone size={14} />
                <span>{CONTACT_INFO.phone}</span>
              </a>
              {user ? (
                <div className="relative" ref={userRef}>
                  <button
                    onClick={() => setUserMenuOpen((o) => !o)}
                    className="flex items-center gap-2 rounded-full pl-1 pr-3 py-1 bg-white/10 hover:bg-white/15 transition-colors"
                  >
                    <span className="w-8 h-8 rounded-full bg-violet-500 text-white flex items-center justify-center text-sm font-bold">
                      {user.avatar ? (
                        <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover" />
                      ) : (
                        user.name.charAt(0).toUpperCase()
                      )}
                    </span>
                    <span className={cn('text-sm font-medium', isScrolled ? 'text-slate-950' : 'text-white')}>
                      {user.name.split(' ')[0]}
                    </span>
                    <ChevronDown size={14} className={cn(isScrolled ? 'text-slate-500' : 'text-white/70', userMenuOpen && 'rotate-180')} />
                  </button>
                  <AnimatePresence>
                    {userMenuOpen && (
                      <motion.div
                        className="absolute top-full right-0 mt-2 w-52 bg-white rounded-lg shadow-xl border border-slate-100 overflow-hidden"
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
                <>
                  <Link to={ROUTES.LOGIN}>
                    <Button variant="gold" size="md">
                      Kirish
                    </Button>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile menu toggle */}
            <button
              className={cn(
                'lg:hidden p-2 rounded-xl transition-colors',
                isScrolled
                  ? 'text-slate-700 hover:bg-slate-100'
                  : 'text-white hover:bg-white/10'
              )}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              className="fixed top-0 right-0 bottom-0 z-50 w-80 bg-white shadow-2xl overflow-y-auto"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <Link to="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-2">
                    <img src={logo} alt="Qarshiyev" className="w-9 h-9 rounded-xl object-cover" />
                    <span className="font-serif font-bold text-slate-950">Qarshiyev</span>
                  </Link>
                  <button
                    onClick={() => setMobileOpen(false)}
                    className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-950 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Nav Links */}
                <nav className="flex flex-col gap-1 mb-8">
                  {NAV_ITEMS.map((item) => (
                    <div key={item.label}>
                      {item.children ? (
                        <div className="mb-2">
                          <button
                            onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
                            className={cn(
                              'flex items-center justify-between w-full px-4 py-3 rounded-xl text-sm font-semibold transition-colors cursor-pointer select-none outline-none',
                              hasActiveChild(item)
                                ? 'text-violet-600 bg-violet-50/50'
                                : 'text-slate-700 hover:bg-slate-50 hover:text-slate-950'
                            )}
                          >
                            <div className="flex items-center gap-3">
                              <span className={cn(
                                'transition-colors',
                                hasActiveChild(item) ? 'text-violet-600' : 'text-slate-400'
                              )}>
                                {getIcon(item.label)}
                              </span>
                              <span>{item.label}</span>
                            </div>
                            <ChevronDown
                              size={16}
                              className={cn(
                                'transition-transform duration-300',
                                mobileDropdownOpen ? 'rotate-180 text-violet-600' : 'text-slate-400'
                              )}
                            />
                          </button>
                          
                          <AnimatePresence initial={false}>
                            {mobileDropdownOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                                className="overflow-hidden"
                              >
                                <div className="py-1 flex flex-col gap-1 border-l-2 border-slate-100 ml-6 pl-2 mt-1">
                                  {item.children.map((child) => (
                                    <Link
                                      key={child.label}
                                      to={child.href}
                                      onClick={() => setMobileOpen(false)}
                                      className={cn(
                                        'flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors',
                                        isActive(child.href)
                                          ? 'bg-violet-50 text-violet-700'
                                          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-950'
                                      )}
                                    >
                                      <span className={cn(
                                        'transition-colors',
                                        isActive(child.href) ? 'text-violet-600' : 'text-slate-400'
                                      )}>
                                        {getIcon(child.label)}
                                      </span>
                                      <span>{child.label}</span>
                                    </Link>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <Link
                          to={item.href}
                          onClick={() => setMobileOpen(false)}
                          className={cn(
                            'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors',
                            isActive(item.href)
                              ? 'bg-slate-950 text-white shadow-md shadow-slate-950/10'
                              : 'text-slate-700 hover:bg-slate-50 hover:text-slate-950'
                          )}
                        >
                          <span className={cn(
                            'transition-colors',
                            isActive(item.href) ? 'text-white' : 'text-slate-400'
                          )}>
                            {getIcon(item.label)}
                          </span>
                          <span>{item.label}</span>
                        </Link>
                      )}
                    </div>
                  ))}
                </nav>

                {/* Contact */}
                <div className="border-t border-slate-100 pt-6 space-y-3">
                  <a
                    href={`tel:${CONTACT_INFO.phone}`}
                    className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 text-slate-700 hover:bg-slate-100 transition-colors"
                  >
                    <Phone size={16} />
                    <span className="text-sm font-medium">{CONTACT_INFO.phone}</span>
                  </a>
                  {user ? (
                    <>
                      <Link
                        to={ROUTES.PROFILE}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center justify-center w-full py-3.5 bg-slate-950 text-white font-semibold rounded-xl hover:bg-slate-800 transition-colors"
                      >
                        Kabinet
                      </Link>
                      <button
                        onClick={() => { logout(); setMobileOpen(false); }}
                        className="flex items-center justify-center w-full py-3.5 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600 transition-colors"
                      >
                        Chiqish
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to={ROUTES.LOGIN}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center justify-center w-full py-3.5 bg-violet-500 text-white font-semibold rounded-xl hover:bg-violet-600 transition-colors"
                      >
                        Kirish
                      </Link>
                    </>
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
