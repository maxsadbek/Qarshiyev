import React from 'react';
import { Link } from 'react-router-dom';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  ArrowRight,
} from 'lucide-react';
import { Facebook, Instagram, Youtube } from '@/components/ui/Icons';
import { CONTACT_INFO, NAV_ITEMS, ROUTES } from '@/constants';
import { courses } from '@/data/courses';
import logo from '@/assets/logo.png';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const featuredCourses = courses.filter((c) => c.featured).slice(0, 4);

  return (
    <footer className="bg-slate-950 text-white">
      {/* Main footer */}
      <div className="container-custom pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-5">
              <img src={logo} alt="Qarshiyev" className="w-10 h-10 rounded-xl object-cover" />
              <div>
                <span className="font-serif font-bold text-white text-lg leading-none block">
                  Qarshiyev
                </span>
                <span className="text-white/50 text-xs tracking-wider">Education Center</span>
              </div>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              2015 yildan buyon Qarshining yetakchi ta'lim markazi, o'quvchilarga xalqaro til va akademik muvaffaqiyatga erishishda yordam beradi.
            </p>
            <div className="flex items-center gap-3">
              <a
                href={CONTACT_INFO.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-violet-500 hover:text-white transition-all duration-200"
                aria-label="Telegram"
              >
                <Send size={14} />
              </a>
              <a
                href={CONTACT_INFO.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-violet-500 hover:text-white transition-all duration-200"
                aria-label="Instagram"
              >
                <Instagram size={14} />
              </a>
              <a
                href={CONTACT_INFO.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-violet-500 hover:text-white transition-all duration-200"
                aria-label="Facebook"
              >
                <Facebook size={14} />
              </a>
              <a
                href={CONTACT_INFO.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-violet-500 hover:text-white transition-all duration-200"
                aria-label="YouTube"
              >
                <Youtube size={14} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-5">
              Tezkor Havolalar
            </h4>
            <ul className="space-y-3">
              {NAV_ITEMS.filter((n) => !n.children).map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.href}
                    className="flex items-center gap-2 text-slate-400 text-sm hover:text-violet-400 transition-colors group"
                  >
                    <ArrowRight
                      size={12}
                      className="opacity-0 group-hover:opacity-100 transition-opacity -ml-1"
                    />
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to={ROUTES.RESULTS}
                  className="flex items-center gap-2 text-slate-400 text-sm hover:text-violet-400 transition-colors group"
                >
                  <ArrowRight
                    size={12}
                    className="opacity-0 group-hover:opacity-100 transition-opacity -ml-1"
                  />
                  O'quvchi Natijalari
                </Link>
              </li>
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-5">
              Bizning Kurslarimiz
            </h4>
            <ul className="space-y-3">
              {featuredCourses.map((course) => (
                <li key={course.id}>
                  <Link
                    to={ROUTES.COURSES}
                    className="flex items-start gap-2 text-slate-400 text-sm hover:text-violet-400 transition-colors group"
                  >
                    <ArrowRight
                      size={12}
                      className="opacity-0 group-hover:opacity-100 transition-opacity mt-0.5 shrink-0"
                    />
                    <span>{course.title}</span>
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to={ROUTES.COURSES}
                  className="text-violet-500 text-sm font-medium hover:text-violet-400 transition-colors"
                >
                  Barcha kurslarni ko'rish →
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-5">
              Biz bilan Bog'laning
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={15} className="text-violet-500 mt-0.5 shrink-0" />
                <span className="text-slate-400 text-sm leading-relaxed">
                  {CONTACT_INFO.addressFull}
                </span>
              </li>
              <li>
                <a
                  href={`tel:${CONTACT_INFO.phone}`}
                  className="flex items-center gap-3 text-slate-400 text-sm hover:text-violet-400 transition-colors"
                >
                  <Phone size={15} className="text-violet-500 shrink-0" />
                  {CONTACT_INFO.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="flex items-center gap-3 text-slate-400 text-sm hover:text-violet-400 transition-colors"
                >
                  <Mail size={15} className="text-violet-500 shrink-0" />
                  {CONTACT_INFO.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock size={15} className="text-violet-500 mt-0.5 shrink-0" />
                <div>
                  {CONTACT_INFO.workingHours.map((h) => (
                    <div key={h.day} className="text-slate-400 text-sm">
                      <span className="text-slate-300">{h.day}:</span> {h.hours}
                    </div>
                  ))}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-custom py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-slate-500 text-sm">
              © {currentYear} Qarshiyev Ta'lim Markazi. Barcha huquqlar himoyalangan.
            </p>
            <div className="flex items-center gap-5">
              <Link to="#" className="text-slate-500 text-sm hover:text-slate-300 transition-colors">
                Maxfiylik Siyosati
              </Link>
              <Link to="#" className="text-slate-500 text-sm hover:text-slate-300 transition-colors">
                Foydalanish Shartlari
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
