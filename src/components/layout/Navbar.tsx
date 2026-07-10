import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Phone } from 'lucide-react';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import { NAV_ITEMS, CONTACT_INFO } from '@/constants';
import { Button } from '@/components/ui/Button';
import { cn } from '@/utils';

export const Navbar: React.FC = () => {
  const { isScrolled } = useScrollPosition();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  const isActive = (href: string) =>
    href === '/' ? location.pathname === '/' : location.pathname.startsWith(href);

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
              <div className="w-10 h-10 rounded-xl bg-slate-950 flex items-center justify-center shadow-sm group-hover:bg-violet-500 transition-colors duration-300">
                <span className="text-white font-serif font-bold text-lg">Q</span>
              </div>
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
                  Education Center
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_ITEMS.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.children && setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  {item.children ? (
                    <button
                      className={cn(
                        'flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
                        isScrolled
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
              <Link to="/contact">
                <Button variant="gold" size="md">
                  Enroll Now
                </Button>
              </Link>
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
                    <div className="w-9 h-9 rounded-xl bg-slate-950 flex items-center justify-center">
                      <span className="text-white font-serif font-bold">Q</span>
                    </div>
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
                        <div>
                          <div className="px-4 py-2 text-xs font-bold text-slate-400 uppercase tracking-widest mt-4 mb-1">
                            {item.label}
                          </div>
                          {item.children.map((child) => (
                            <Link
                              key={child.label}
                              to={child.href}
                              onClick={() => setMobileOpen(false)}
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
                      ) : (
                        <Link
                          to={item.href}
                          onClick={() => setMobileOpen(false)}
                          className={cn(
                            'flex items-center px-4 py-3 rounded-xl text-sm font-semibold transition-colors',
                            isActive(item.href)
                              ? 'bg-slate-950 text-white'
                              : 'text-slate-700 hover:bg-slate-50 hover:text-slate-950'
                          )}
                        >
                          {item.label}
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
                  <Link
                    to="/contact"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-center w-full py-3.5 bg-violet-500 text-white font-semibold rounded-xl hover:bg-violet-600 transition-colors"
                  >
                    Enroll Now
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
