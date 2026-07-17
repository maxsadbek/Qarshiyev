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
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.4,
      ease: 'easeOut',
    },
  }),
};

const Header: React.FC<{ onClose: () => void }> = ({ onClose }) => (
  <div className="relative px-6 py-5 border-b border-white/[0.06]">
    <div className="flex items-center gap-4">
      <div className="relative flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-white/[0.06] border border-white/[0.08]">
        <img src={logo} alt="Qarshiyev" className="h-7 w-7 object-contain" />
      </div>
      <div className="flex-1 min-w-0">
        <h2 className="text-[0.9rem] font-semibold text-white tracking-tight">Qarshiyev Education Center</h2>
        <p className="text-[0.68rem] text-slate-400 mt-0.5">Learn. Grow. Succeed.</p>
      </div>
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="flex h-8 w-8 flex-none items-center justify-center rounded-lg text-slate-400 transition-colors duration-200 hover:bg-white/[0.08] hover:text-white"
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
    className="group rounded-xl border border-white/[0.05] bg-white/[0.02] p-4 transition-all duration-300 hover:border-white/[0.1] hover:bg-white/[0.04]"
  >
    <div className="flex items-start gap-3">
      <div className="flex h-9 w-9 flex-none items-center justify-center rounded-lg text-slate-300">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-[0.8rem] font-semibold text-white mb-0.5">{title}</h3>
        <p className="text-[0.68rem] text-slate-400 leading-relaxed mb-2">{description}</p>
        <ul className="space-y-1">
          {items.map((item) => (
            <li key={item} className="flex items-center gap-2 text-[0.7rem] text-slate-300">
              <span className="h-[3px] w-[3px] flex-none rounded-full bg-slate-500" />
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
      className="rounded-xl border border-white/[0.05] bg-white/[0.02] p-4"
    >
      <div className="flex items-center gap-2.5 mb-3">
        <div className="flex h-7 w-7 items-center justify-center rounded-md text-slate-300">
          <Globe size={14} />
        </div>
        <h3 className="text-[0.8rem] font-semibold text-white">Contact Us</h3>
      </div>
      <div className="grid grid-cols-1 gap-1.5">
        {contactItems.map((item) => (
          <div key={item.label}>
            {item.href ? (
              <a
                href={item.href}
                target={item.label !== 'Phone' ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 rounded-lg bg-white/[0.02] p-2.5 transition-colors duration-200 hover:bg-white/[0.05]"
              >
                <div className="flex h-6 w-6 flex-none items-center justify-center rounded text-slate-400">
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[0.58rem] text-slate-500 uppercase tracking-wider font-medium">{item.label}</p>
                  <p className="text-[0.7rem] text-slate-200 truncate">{item.value}</p>
                </div>
              </a>
            ) : (
              <div className="flex items-center gap-2.5 rounded-lg bg-white/[0.02] p-2.5">
                <div className="flex h-6 w-6 flex-none items-center justify-center rounded text-slate-400">
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[0.58rem] text-slate-500 uppercase tracking-wider font-medium">{item.label}</p>
                  <p className="text-[0.7rem] text-slate-200">{item.value}</p>
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
        lenis.scrollTo(footer, { duration: 1.2, offset: 0 });
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
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed inset-0 z-[9999] bg-black/40 backdrop-blur-sm"
          />
          <motion.div
            key="info-panel"
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 12 }}
            transition={{ type: 'spring', stiffness: 200, damping: 25 }}
            className="fixed bottom-4 right-4 z-[10000] flex h-[85vh] w-[calc(100vw-2rem)] max-w-[400px] flex-col overflow-hidden rounded-[1.25rem] border border-white/[0.08] bg-[#0a0a0f]/95 shadow-2xl md:bottom-6 md:right-6 md:h-[640px]"
            role="dialog"
            aria-label="School Information"
          >
            <Header onClose={close} />

            <div className="flex-1 overflow-y-auto px-4 py-4">
              <div className="space-y-2">
                <InfoCard
                  index={0}
                  icon={<BookOpen size={16} />}
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
                  icon={<Languages size={16} />}
                  title="Russian Courses"
                  description="Modern Russian lessons for study, work and daily communication."
                  items={['Beginner', 'Grammar', 'Speaking', 'Reading', 'Vocabulary']}
                />

                <InfoCard
                  index={2}
                  icon={<Code2 size={16} />}
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
                  icon={<PenTool size={16} />}
                  title="Graphic Design"
                  description="Master creative tools and design stunning visuals."
                  items={['Photoshop', 'Illustrator', 'Figma', 'Branding', 'Social Media Design']}
                />

                <InfoCard
                  index={4}
                  icon={<Star size={16} />}
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
              </div>
            </div>

            <div className="border-t border-white/[0.06] px-4 py-3">
              <button
                type="button"
                onClick={handleContactUs}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-white/[0.06] px-4 py-2.5 text-[0.8rem] font-medium text-white transition-all duration-200 hover:bg-white/[0.1] active:scale-[0.98]"
              >
                <span>Contact Us</span>
                <ChevronRight size={14} />
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
});

AssistantWidget.displayName = 'AssistantWidget';
