import React from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { studentResults } from '@/data/results';
import { MapPin, Award, TrendingUp } from 'lucide-react';

export const StudentResultsSection: React.FC = () => {
  return (
    <section className="section-padding bg-slate-50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <SectionHeader
            overline="Success Stories"
            title="Our Students'"
            titleAccent="Achievements"
            description="We measure our success by the success of our students. See the incredible scores and university admissions our recent graduates have achieved."
          />
        </motion.div>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-14"
        >
          {studentResults.slice(0, 6).map((result) => (
            <SwiperSlide key={result.id}>
              <ResultCard result={result} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

const ResultCard: React.FC<{ result: typeof studentResults[0] }> = ({ result }) => {
  return (
    <motion.div
      className="bg-white rounded-3xl p-6 card-shadow hover:shadow-xl transition-all duration-300 relative border border-slate-100"
      whileHover={{ y: -6 }}
    >
      {/* Top section: Avatar and Score */}
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-sm">
            <img
              src={result.avatar}
              alt={result.name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div>
            <h3 className="font-serif font-bold text-slate-950 leading-tight">
              {result.name}
            </h3>
            <p className="text-slate-400 text-xs mt-0.5">{result.course}</p>
          </div>
        </div>
        
        {/* Score Badge */}
        <div className="bg-violet-500 rounded-2xl px-3 py-2 text-center shadow-lg shadow-violet-500/20 shrink-0">
          <div className="text-white font-bold text-xl leading-none">{result.score}</div>
          <div className="text-violet-100 text-[10px] font-bold uppercase tracking-wider mt-1">{result.exam}</div>
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-2 gap-4 mb-5">
        <div className="bg-slate-50 rounded-2xl p-3">
          <div className="flex items-center gap-1.5 mb-1 text-slate-400">
            <TrendingUp size={14} />
            <span className="text-[10px] uppercase tracking-wider font-bold">Improvement</span>
          </div>
          <div className="text-slate-950 font-bold text-sm">
            {result.beforeScore} ➔ <span className="text-violet-600">{result.score}</span>
          </div>
        </div>
        {result.cefrLevel && (
          <div className="bg-slate-50 rounded-2xl p-3">
            <div className="flex items-center gap-1.5 mb-1 text-slate-400">
              <Award size={14} />
              <span className="text-[10px] uppercase tracking-wider font-bold">CEFR Level</span>
            </div>
            <div className="text-slate-950 font-bold text-sm">{result.cefrLevel}</div>
          </div>
        )}
      </div>

      {/* University Achievement */}
      {result.university && (
        <div className="border-t border-slate-100 pt-5">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-950 flex items-center justify-center shrink-0">
              <MapPin size={14} className="text-white" />
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-950">{result.university}</div>
              <div className="text-xs text-slate-500">{result.country}</div>
              <div className="mt-2 inline-block bg-violet-50 text-violet-700 text-xs font-semibold px-2.5 py-1 rounded-md">
                {result.achievement}
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};
