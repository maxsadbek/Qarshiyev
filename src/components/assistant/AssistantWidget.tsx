import { memo, useCallback } from 'react';
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
} from 'lucide-react';
import { useAssistant } from '@/assistant/AssistantContext';
import { useLenis } from '@/context/SmoothScrollProvider';
import { CONTACT_INFO } from '@/constants';
import logo from '@/assets/logo.png';

const cardVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.97 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: 0.06 + i * 0.05,
      type: 'spring' as const,
      stiffness: 300,
      damping: 24,
    },
  }),
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05, delayChildren: 0.08 },
  },
};

const Header: React.FC<{ onClose: () => void }> = ({ onClose }) => (
  <div className="relative overflow-hidden rounded-t-3xl px-5 py-5 bg-white/[0.03] border-b border-white/[0.06]">
    <div className="relative flex items-center gap-4">
      <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 p-2 shadow-lg">
        <img src={logo} alt="Qarshiyev" className="h-full w-full object-contain" />
        <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-slate-900 bg-emerald-400" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <h2 className="text-[0.92rem] font-bold text-white tracking-tight">Qarshiyev Education Center</h2>
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[0.6rem] font-semibold text-emerald-400 border border-emerald-500/15">
            <span className="h-1 w-1 rounded-full bg-emerald-400" />
            ONLINE
          </span>
        </div>
        <p className="text-[0.68rem] text-slate-400 leading-relaxed">
          Everything you need to know about our learning center.
        </p>
      </div>
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.05] text-slate-400 transition-all duration-200 hover:bg-white/[0.1] hover:text-white"
      >
        <X size={15} strokeWidth={2.5} />
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
}

const InfoCard: React.FC<InfoCardProps> = ({ icon, title, description, items, index }) => (
  <motion.div
    custom={index}
    variants={cardVariants}
    initial="hidden"
    animate="visible"
    className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-4 transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.05]"
  >
    <div className="flex items-start gap-3">
      <div className="flex h-10 w-10 flex-none items-center justify-center rounded-lg text-slate-300">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-[0.82rem] font-semibold text-white tracking-tight mb-0.5">{title}</h3>
        <p className="text-[0.68rem] text-slate-400 leading-relaxed mb-2">{description}</p>
        <ul className="space-y-1">
          {items.map((item) => (
            <li key={item} className="flex items-center gap-2 text-[0.7rem] text-slate-300">
              <span className="h-[3px] w-[3px] flex-none rounded-full bg-violet-400/80" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </motion.div>
);

const ContactCard: React.FC<{ index: number }> = ({ index }) => {
  const contactItems = [
    {
      icon: <Send size={13} />,
      label: 'Telegram',
      value: 'Open Telegram',
      href: CONTACT_INFO.telegram,
    },
    {
      icon: <Phone size={13} />,
      label: 'Phone',
      value: CONTACT_INFO.phone,
      href: `tel:${CONTACT_INFO.phone}`,
    },
    {
      icon: <MapPin size={13} />,
      label: 'Address',
      value: CONTACT_INFO.address,
      href: undefined,
    },
    {
      icon: <Clock size={13} />,
      label: 'Working Hours',
      value: CONTACT_INFO.workingHours.map((h) => `${h.day}: ${h.hours}`).join('  ·  '),
      href: undefined,
    },
  ];

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-4"
    >
      <div className="flex items-center gap-2.5 mb-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-300">
          <Globe size={15} />
        </div>
        <h3 className="text-[0.82rem] font-semibold text-white tracking-tight">Contact Us</h3>
      </div>
      <div className="grid grid-cols-1 gap-2">
        {contactItems.map((item) => (
          <div key={item.label}>
            {item.href ? (
              <a
                href={item.href}
                target={item.label !== 'Phone' ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 rounded-lg bg-white/[0.03] p-2.5 transition-colors duration-200 hover:bg-white/[0.06]"
              >
                <div className="flex h-7 w-7 flex-none items-center justify-center rounded-md text-slate-300">
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[0.58rem] text-slate-500 uppercase tracking-wider font-medium">{item.label}</p>
                  <p className="text-[0.72rem] text-slate-200 truncate">{item.value}</p>
                </div>
              </a>
            ) : (
              <div className="flex items-center gap-2.5 rounded-lg bg-white/[0.03] p-2.5">
                <div className="flex h-7 w-7 flex-none items-center justify-center rounded-md text-slate-300">
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[0.58rem] text-slate-500 uppercase tracking-wider font-medium">{item.label}</p>
                  <p className="text-[0.72rem] text-slate-200">{item.value}</p>
                </div>
              </div>
            )}
          </div>
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
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-sm"
          />
          <motion.div
            key="info-panel"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 16 }}
            transition={{ type: 'spring' as const, stiffness: 200, damping: 25 }}
            className="assistant-violet fixed bottom-4 right-4 z-[10000] flex h-[85vh] w-[calc(100vw-2rem)] max-w-[420px] flex-col overflow-hidden rounded-[1.5rem] md:bottom-8 md:right-8 md:h-[640px] border border-white/[0.08] bg-[#0a0a0f]/95 shadow-2xl"
            role="dialog"
            aria-label="School Information"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/[0.04] via-transparent to-transparent pointer-events-none" />

            <Header onClose={close} />

            <div className="assistant-scroll relative flex-1 overflow-y-auto px-4 py-4">
              <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-2.5">
                <InfoCard
                  index={0}
                  icon={<BookOpen size={18} />}
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
                />

                <InfoCard
                  index={1}
                  icon={<Languages size={18} />}
                  title="Russian Courses"
                  description="Modern Russian lessons for study, work and daily communication."
                  items={['Beginner', 'Grammar', 'Speaking', 'Reading', 'Vocabulary']}
                />

                <InfoCard
                  index={2}
                  icon={<Code2 size={18} />}
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
                />

                <InfoCard
                  index={3}
                  icon={<PenTool size={18} />}
                  title="Graphic Design"
                  description="Master creative tools and design stunning visuals."
                  items={['Photoshop', 'Illustrator', 'Figma', 'Branding', 'Social Media Design']}
                />

                <InfoCard
                  index={4}
                  icon={<Star size={18} />}
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
                />

                <ContactCard index={5} />
              </motion.div>
            </div>

            <div className="relative px-4 pb-4 pt-2">
              <div className="absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
              <motion.button
                type="button"
                onClick={handleContactUs}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="w-full rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-5 py-3 text-[0.82rem] font-semibold text-white shadow-lg shadow-violet-500/15 transition-all duration-300 hover:from-violet-500 hover:to-indigo-500"
              >
                <div className="flex items-center justify-center gap-2">
                  <span>Contact Us</span>
                  <ChevronRight size={15} />
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
