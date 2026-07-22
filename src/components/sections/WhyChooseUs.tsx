import React from 'react';
import { motion } from 'framer-motion';
import {
  Users, Trophy, Clock, BookOpen, HeartHandshake, Sparkles, BarChart3
} from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection';

const features = [
  {
    icon: Trophy,
    title: 'Isbotlangan Natijalar',
    description: 'Bizning o\'quvchilarimizning 90% maqsadli ball yoki qabul maqsadiga erishadi. 2018-yildan buyon 2000 dan ortiq o\'quvchilarni muvaffaqiyat sari yetakladik.',
    stat: '90%',
    color: 'text-violet-600',
    bg: 'bg-violet-50',
  },
  {
    icon: BookOpen,
    title: 'Malakali O\'qituvchilar',
    description: 'Barcha o\'qituvchilar o\'z mutaxassisligi bo\'yicha rasmiy diplom, xalqaro va milliy sertifikatlarga ega.',
    stat: 'Diplom',
    color: 'text-violet-600',
    bg: 'bg-violet-50',
  },
  {
    icon: Users,
    title: 'Kichik Guruhlar',
    description: 'Har bir guruhda maksimum 20 nafar o\'quvchi bo\'lib, bu har bir o\'quvchiga individual e\'tibor, muntazam fikr-mulohaza va o\'qituvchidan samarali yo\'l-yo\'riq olish imkonini beradi.',
    stat: '≤20',
    color: 'text-violet-600',
    bg: 'bg-violet-50',
  },
  {
    icon: Clock,
    title: 'Moslashuvchan Jadval',
    description: 'Ertalab, tushda va kechki darslar, shuningdek onlayn variantlar. Maktab yoki ish jadvalingiz atrofida o\'rganing.',
    stat: '3×',
    color: 'text-violet-600',
    bg: 'bg-violet-50',
  },
  {
    icon: BarChart3,
    title: 'Progress Kuzatuv',
    description: 'Muntazam namunaviy imtihonlar, batafsil ishlash hisobotlari va yo\'nalishingizda qolishingiz uchun birga-bir o\'qituvchi maslahatlashuvi.',
    stat: 'Oylik',
    color: 'text-violet-600',
    bg: 'bg-violet-50',
  },
  {
    icon: HeartHandshake,
    title: 'Qabul qilinadigan Jamiyat',
    description: 'Gullab-yashnayotgan o\'quvchilar hamjamiyatiga qo\'shiling. Nutq klublari, o\'quv guruhlari, turli tadbirlar va markazimizda qurilgan umrbod do\'stliklar sizni kutmoqda.',
    stat: '2000+',
    color: 'text-violet-600',
    bg: 'bg-violet-50',
  },
  {
    icon: Sparkles,
    title: 'Premium Muhit',
    description: 'Zamonaviy sinf xonalari, akademik kutubxona va interaktiv doskalar diqqatli va samarali ta\'lim olish uchun yaratilgan.',
    stat: 'Jahon darajasi',
    color: 'text-violet-600',
    bg: 'bg-violet-50',
  },
];

export const WhyChooseUs: React.FC = () => {
  return (
    <section className="section-padding bg-slate-50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-14"
        >
          <SectionHeader
            overline="Nima Uchun Bizni Tanlaysiz"
            title="Biz faqat ingliz tilini o'rgatmaymiz."
            titleAccent="Biz kelajakni quramiz."
            description="'QARSHIYEV SCHOOL' Ta'lim Markazining boshqa ta'lim markazlaridan ajralib turadigan jihatlari quyidagilar."
          />
        </motion.div>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <StaggerItem key={f.title}>
                <motion.div
                  className="bg-white rounded-xl p-4 sm:p-5 md:p-6 card-shadow hover:shadow-xl transition-all duration-300 group cursor-default h-full"
                  whileHover={{}}
                >
                  {/* Icon & Stat */}
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-2xl ${f.bg} flex items-center justify-center`}>
                      <Icon size={22} className={f.color} />
                    </div>
                    <span className={`text-xs font-bold ${f.color} bg-opacity-10 rounded-full px-2 py-1 ${f.bg}`}>
                      {f.stat}
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-slate-950 text-lg mb-2 group-hover:text-violet-600 transition-colors">
                    {f.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{f.description}</p>

                  {/* Bottom accent */}
                  <div className={`mt-4 h-0.5 w-8 ${f.bg.replace('bg-', 'bg-').replace('-50', '-400')} rounded-full group-hover:w-full transition-all duration-500`} />
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
};

