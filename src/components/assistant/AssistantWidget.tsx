import { memo, useCallback, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  X,
  BookOpen,
  Languages,
  MapPin,
  Phone,
  Send,
  Clock,
  ChevronRight,
  Globe,
  Code2,
  PenTool,
  Star,
  CheckCircle2,
} from 'lucide-react';
import { useAssistant } from '@/assistant/AssistantContext';
import { cn } from '@/utils';
import { useLenis } from '@/context/SmoothScrollProvider';
import { CONTACT_INFO } from '@/constants';
import logo from '@/assets/logo.png';

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.96 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: 0.08 + i * 0.07,
      type: 'spring' as const,
      stiffness: 300,
      damping: 24,
    },
  }),
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

const Header: React.FC<{ onClose: () => void }> = ({ onClose }) => (
  <div className="relative overflow-hidden rounded-t-3xl px-5 py-5 bg-white/[0.04] border-b border-white/[0.08]">
    <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-transparent to-transparent" />
    <div className="relative flex items-center gap-4">
      <div className="relative">
        <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 opacity-60 blur-lg" />
        <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 p-2.5 shadow-2xl shadow-violet-500/30">
          <img src={logo} alt="Qarshiyev" className="h-full w-full object-contain" />
        </div>
        <span className="absolute -bottom-0.5 -right-0.5 h-4 w-4 rounded-full border-2 border-slate-900 bg-emerald-400 shadow-lg shadow-emerald-500/50" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <h2 className="text-base font-bold text-white tracking-tight">Qarshiyev Education Center</h2>
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[0.65rem] font-semibold text-emerald-400 border border-emerald-500/20">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            ONLINE
          </span>
        </div>
        <p className="text-[0.72rem] text-slate-400 leading-relaxed">
          Everything you need to know about our learning center.
        </p>
      </div>
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/[0.06] text-slate-400 transition-all duration-200 hover:bg-white/[0.12] hover:text-white hover:rotate-90"
      >
        <X size={16} strokeWidth={2.5} />
      </button>
    </div>
  </div>
);

interface InfoCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  items: string[];
  index: number;
  iconBg: string;
  glowColor: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ icon, title, description, items, index, iconBg, glowColor }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative"
    >
      <div
        className={cn(
          'relative overflow-hidden rounded-3xl border p-5 transition-all duration-500',
          isHovered
            ? 'border-white/20 bg-white/[0.08] shadow-2xl'
            : 'border-white/[0.08] bg-white/[0.04]'
        )}
        style={
          isHovered
            ? {
                boxShadow: `0 0 0 1px ${glowColor}15, 0 20px 50px -12px ${glowColor}30, inset 0 1px 0 0 ${glowColor}15`,
              }
            : undefined
        }
      >
        <div
          className={cn(
            'absolute inset-0 opacity-0 transition-opacity duration-500',
            isHovered ? 'opacity-100' : 'opacity-0'
          )}
          style={{
            background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${glowColor}08, transparent 40%)`,
          }}
        />

        <div className="relative flex items-start gap-4">
          <div
            className={cn(
              'flex h-12 w-12 flex-none items-center justify-center rounded-2xl text-white shadow-xl transition-all duration-500',
              iconBg,
              isHovered && 'scale-110 shadow-2xl'
            )}
            style={
              isHovered
                ? {
                    boxShadow: `0 0 30px ${glowColor}40, 0 10px 30px -10px ${glowColor}50`,
                  }
                : undefined
            }
          >
            {icon}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-sm font-bold text-white tracking-tight">{title}</h3>
              <motion.div
                animate={{ x: isHovered ? 4 : 0, opacity: isHovered ? 1 : 0 }}
                transition={{ type: 'spring' as const, stiffness: 400, damping: 20 }}
              >
                <ChevronRight size={14} className="text-violet-400" />
              </motion.div>
            </div>
            <p className="text-[0.72rem] text-slate-400 leading-relaxed mb-3">{description}</p>
            <ul className="space-y-1.5">
              {items.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.03 }}
                  className="flex items-center gap-2.5 text-[0.75rem] text-slate-300"
                >
                  <span className="flex h-4 w-4 flex-none items-center justify-center rounded-md bg-white/[0.06]">
                    <CheckCircle2 size={10} className="text-violet-400" />
                  </span>
                  {item}
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ContactCard: React.FC<{ index: number }> = ({ index }) => {
  const [isHovered, setIsHovered] = useState(false);

  const contactItems = [
    {
      icon: <Send size={16} />,
      label: 'Telegram',
      value: CONTACT_INFO.telegram,
      href: CONTACT_INFO.telegram,
      color: 'from-sky-400 to-cyan-500',
      glow: '#06b6d4',
    },
    {
      icon: <Phone size={16} />,
      label: 'Phone',
      value: CONTACT_INFO.phone,
      href: `tel:${CONTACT_INFO.phone}`,
      color: 'from-emerald-400 to-teal-500',
      glow: '#10b981',
    },
    {
      icon: <MapPin size={16} />,
      label: 'Address',
      value: CONTACT_INFO.address,
      href: undefined,
      color: 'from-violet-400 to-purple-500',
      glow: '#8b5cf6',
    },
    {
      icon: <Clock size={16} />,
      label: 'Working Hours',
      value: CONTACT_INFO.workingHours.map((h) => `${h.day}: ${h.hours}`).join('\n'),
      href: undefined,
      color: 'from-amber-400 to-orange-500',
      glow: '#f59e0b',
    },
  ];

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="rounded-3xl border border-white/[0.08] bg-white/[0.04] p-5"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 text-white shadow-lg shadow-cyan-500/25">
          <Globe size={20} />
        </div>
        <div>
          <h3 className="text-sm font-bold text-white tracking-tight">Contact Us</h3>
          <p className="text-[0.65rem] text-slate-400">We'd love to hear from you</p>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-2.5">
        {contactItems.map((item) => (
          <motion.div
            key={item.label}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            whileHover={{ scale: 1.02, x: 4 }}
            whileTap={{ scale: 0.98 }}
            className="group relative"
          >
            {item.href ? (
              <a
                href={item.href}
                target={item.label !== 'Phone' ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-2xl bg-white/[0.04] p-3 transition-all duration-300 hover:bg-white/[0.08] border border-white/[0.06] hover:border-white/[0.12]"
                style={
                  isHovered
                    ? {
                        boxShadow: `0 0 20px ${item.glow}15, 0 8px 24px -8px ${item.glow}25`,
                      }
                    : undefined
                }
              >
                <div
                  className={cn(
                    'flex h-9 w-9 flex-none items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-lg transition-transform duration-300 group-hover:scale-110',
                    item.color
                  )}
                >
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[0.65rem] text-slate-400 uppercase tracking-wider font-semibold mb-0.5">
                    {item.label}
                  </p>
                  <p className="text-[0.8rem] text-slate-200 font-medium truncate">{item.value}</p>
                </div>
                <ChevronRight
                  size={14}
                  className="text-slate-500 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-white"
                />
              </a>
            ) : (
              <div className="flex items-center gap-3 rounded-2xl bg-white/[0.04] p-3 border border-white/[0.06]">
                <div
                  className={cn(
                    'flex h-9 w-9 flex-none items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-lg',
                    item.color
                  )}
                >
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[0.65rem] text-slate-400 uppercase tracking-wider font-semibold mb-0.5">
                    {item.label}
                  </p>
                  <p className="text-[0.8rem] text-slate-200 font-medium whitespace-pre-line leading-relaxed">
                    {item.value}
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export const AssistantWidget: React.FC = memo(() => {
  const { isOpen, close } = useAssistant();
  const lenis = useLenis();

  const handleContactUs = useCallback(() => {
    close();
    const footer = document.querySelector('footer');
    if (footer) {
      if (lenis) {
        lenis.scrollTo(footer, { duration: 1.4, offset: 0 });
      } else {
        footer.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [close, lenis]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="info-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-md"
          />
          <motion.div
            key="info-panel"
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', stiffness: 200, damping: 25 }}
            className="assistant-violet fixed bottom-4 right-4 z-[10000] flex h-[85vh] w-[calc(100vw-2rem)] max-w-[420px] flex-col overflow-hidden rounded-[2rem] md:bottom-8 md:right-8 md:h-[640px] border border-white/[0.12] bg-[#0a0a0f]/95 shadow-2xl shadow-black/50"
            role="dialog"
            aria-label="School Information"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/[0.07] via-transparent to-cyan-500/[0.03] pointer-events-none" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />

            <Header onClose={close} />

            <div className="assistant-scroll relative flex-1 overflow-y-auto px-4 py-4">
              <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-3">
                <InfoCard
                  index={0}
                  icon={<BookOpen size={22} />}
                  title="English Courses"
                  description="Learn English from Beginner to IELTS with experienced teachers."
                  items={[
                    'Beginner',
                    'Elementary',
                    'Pre-Intermediate',
                    'Intermediate',
                    'Upper Intermediate',
                    'IELTS Preparation',
                    'Speaking Club',
                  ]}
                  iconBg="bg-gradient-to-br from-blue-500 to-violet-600"
                  glowColor="#6366f1"
                />

                <InfoCard
                  index={1}
                  icon={<Languages size={22} />}
                  title="Russian Courses"
                  description="Modern Russian lessons for study, work and daily communication."
                  items={['Beginner', 'Grammar', 'Speaking', 'Reading', 'Vocabulary']}
                  iconBg="bg-gradient-to-br from-sky-500 to-blue-600"
                  glowColor="#0ea5e9"
                />

                <InfoCard
                  index={2}
                  icon={<Code2 size={22} />}
                  title="IT Academy"
                  description="Become a professional programmer with hands-on projects."
                  items={[
                    'HTML',
                    'CSS',
                    'JavaScript',
                    'React',
                    'TypeScript',
                    'Git & GitHub',
                    'Responsive Design',
                    'Portfolio Projects',
                  ]}
                  iconBg="bg-gradient-to-br from-violet-500 to-purple-600"
                  glowColor="#8b5cf6"
                />

                <InfoCard
                  index={3}
                  icon={<PenTool size={22} />}
                  title="Graphic Design"
                  description="Master creative tools and design stunning visuals."
                  items={['Photoshop', 'Illustrator', 'Figma', 'Branding', 'Social Media Design']}
                  iconBg="bg-gradient-to-br from-pink-500 to-rose-600"
                  glowColor="#ec4899"
                />

                <InfoCard
                  index={4}
                  icon={<Star size={22} />}
                  title="Why Choose Us?"
                  description="We provide the best learning experience in the region."
                  items={[
                    'Professional teachers',
                    'Practical lessons',
                    'Friendly atmosphere',
                    'Affordable prices',
                    'Small groups',
                    'Modern classrooms',
                    'Certificates',
                  ]}
                  iconBg="bg-gradient-to-br from-amber-500 to-orange-600"
                  glowColor="#f59e0b"
                />

                <ContactCard index={5} />
              </motion.div>
            </div>

            <div className="relative px-4 pb-5 pt-2">
              <div className="absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
              <motion.button
                type="button"
                onClick={handleContactUs}
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-violet-600 via-indigo-600 to-violet-600 bg-[length:200%_100%] px-6 py-4 text-sm font-bold text-white shadow-xl shadow-violet-500/20 transition-all duration-500 hover:shadow-2xl hover:shadow-violet-500/30 animate-[shimmer_3s_linear_infinite]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                <div className="relative flex items-center justify-center gap-2">
                  <span>Contact Us</span>
                  <motion.div
                    animate={{ x: [0, 4, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                  >
                    <ChevronRight size={18} />
                  </motion.div>
                </div>
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
});

AssistantWidget.displayName = 'AssistantWidget';
