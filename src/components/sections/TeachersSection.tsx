import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import {
  Star, Users, Award, Play, Send, ArrowRight, ArrowLeft,
} from 'lucide-react';
import { Linkedin, Instagram, Youtube } from '@/components/ui/Icons';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Modal } from '@/components/ui/Modal';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { teachers } from '@/data/teachers';

export const TeachersSection: React.FC = () => {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const featuredTeachers = teachers.filter((t) => t.featured);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  return (
    <section className="section-padding bg-slate-950">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-14"
        >
          <SectionHeader
            overline="Bizning Jamoamiz"
            title="O'z"
            titleAccent="Mutaxassis O'qituvchilarini Tanishing"
            description="Xalqaro sertifikatlangan o'qituvchilar sizning muvaffaqiyatingizga bag'ishlangan. Har bir o'qituvchi yillik tajriba, chuqur bilim va maqsadingizga erishishingizga yordam berishga haqiqiy sodiqlik olib keladi."
            inverted
          />
        </motion.div>

        <Swiper
          onSwiper={(swiper) => {
            const nav = swiper.params.navigation!;
            nav.prevEl = prevRef.current;
            nav.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
          }}
          modules={[Navigation, Pagination]}
          spaceBetween={24}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-14"
        >
          {featuredTeachers.map((teacher) => (
            <SwiperSlide key={teacher.id}>
              <TeacherCard teacher={teacher} onWatchVideo={setVideoUrl} />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="flex items-center justify-center gap-3 mt-6">
          <button
            ref={prevRef}
            className="w-11 h-11 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center hover:bg-white/20 hover:border-white/30 transition-colors"
            aria-label="Previous"
          >
            <ArrowLeft size={18} />
          </button>
          <button
            ref={nextRef}
            className="w-11 h-11 rounded-full bg-violet-500 text-white flex items-center justify-center hover:bg-violet-600 transition-colors"
            aria-label="Next"
          >
            <ArrowRight size={18} />
          </button>
        </div>

        <motion.div
          className="text-center mt-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Link to="/teachers">
            <Button
              variant="ghost"
              size="lg"
              className="text-white border border-white/20 hover:bg-white/10 hover:border-white/40"
              icon={<ArrowRight size={16} />}
            >
              Barcha O'qituvchilarni Tanishing
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Video Modal */}
      <Modal isOpen={!!videoUrl} onClose={() => setVideoUrl(null)} size="xl" title="Teacher Introduction">
        <div className="p-4">
          {videoUrl && (
            <div className="aspect-video rounded-2xl overflow-hidden bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${getYTId(videoUrl)}?autoplay=1`}
                className="w-full h-full"
                allow="autoplay; encrypted-media"
                allowFullScreen
                title="Teacher introduction video"
              />
            </div>
          )}
        </div>
      </Modal>
    </section>
  );
};

export function getYTId(url: string) {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/watch\?v=)([\w-]{11})/);
  return match ? match[1] : '';
}

const SOCIAL_ICONS: Record<string, React.ReactNode> = {
  linkedin: <Linkedin size={14} />,
  instagram: <Instagram size={14} />,
  telegram: <Send size={14} />,
  youtube: <Youtube size={14} />,
};

export const TeacherCard: React.FC<{
  teacher: typeof teachers[0];
  onWatchVideo: (url: string) => void;
}> = ({ teacher, onWatchVideo }) => {
  return (
    <motion.div
      className="bg-white/5 border border-white/10 rounded-xl overflow-hidden group hover:bg-white/10 transition-all duration-300"
      whileHover={{}}
    >
      {/* Photo */}
      <div className="relative h-96 md:h-[28rem] lg:h-[32rem] overflow-hidden">
        <img
          src={teacher.avatar}
          alt={teacher.name}
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

        {/* Intro video button */}
        {teacher.introVideoUrl && (
          <motion.button
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-violet-500 text-white flex items-center justify-center shadow-lg"
            whileHover={{}}
            whileTap={{}}
            onClick={() => onWatchVideo(teacher.introVideoUrl!)}
            title="Watch Introduction"
          >
            <Play size={14} fill="white" />
          </motion.button>
        )}

        {/* Rating */}
        <div className="absolute bottom-4 left-4 flex items-center gap-1.5 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5">
          <Star size={12} fill="#f59e0b" className="text-violet-400" />
          <span className="text-white text-xs font-bold">{teacher.rating}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-serif font-bold text-white text-lg leading-tight">{teacher.name}</h3>
            <p className="text-violet-400 text-xs font-medium mt-0.5">{teacher.title}</p>
          </div>
          <div className="text-right">
            <div className="text-white font-bold text-sm">{teacher.experience}y</div>
            <div className="text-slate-400 text-xs">Experience</div>
          </div>
        </div>

        <p className="text-slate-400 text-xs leading-relaxed mb-4 line-clamp-2">{teacher.shortBio}</p>

        {/* Specializations */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {teacher.specialization.slice(0, 2).map((s) => (
            <Badge key={s} variant="gold" size="sm">{s}</Badge>
          ))}
        </div>

        {/* Certificates */}
        <div className="flex items-center gap-2 mb-4">
          <Award size={13} className="text-violet-500 shrink-0" />
          <span className="text-slate-400 text-xs">
            {teacher.certificates.slice(0, 2).map((c) => c.name).join(', ')}
          </span>
        </div>

        {/* Meta row */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <div className="flex items-center gap-1.5">
            <Users size={13} className="text-slate-400" />
            <span className="text-slate-300 text-xs font-medium">
              {teacher.students.toLocaleString()} students
            </span>
          </div>
          {/* Socials */}
          <div className="flex items-center gap-2">
            {Object.entries(teacher.socialLinks)
              .filter(([, url]) => url)
              .slice(0, 3)
              .map(([key]) => (
                <a
                  key={key}
                  href={teacher.socialLinks[key as keyof typeof teacher.socialLinks]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-violet-400 transition-colors"
                  aria-label={key}
                >
                  {SOCIAL_ICONS[key]}
                </a>
              ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
