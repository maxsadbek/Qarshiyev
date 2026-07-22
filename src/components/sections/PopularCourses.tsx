'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Button } from '@/components/ui/Button';
import { CourseCard } from '@/components/ui/CourseCard';
import { courses } from '@/data/courses';

export const PopularCourses: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('Barchasi');

  // Filter to show only these specific courses
  const courseFilters = [
    { label: 'Barchasi', value: 'all' },
    { label: 'IELTS', value: 'IELTS' },
    { label: 'CEFR (Multi Level)', value: 'CEFR' },
    { label: 'English Grammar', value: 'English Grammar' },
    { label: 'Kids English', value: 'Kids English' },
    { label: "Ona tili va adabiyot", value: 'Ona tili' },
    { label: "Prezident maktablariga tayyorgarlik", value: 'Prezident' },
  ];

  // Course IDs that should appear in Popular Courses
  const popularCourseIds = ['1', '2', '9', '10', '11', '12', '13'];
  const popularCourses = courses.filter((c) => popularCourseIds.includes(c.id));

  const filtered = activeCategory === 'all'
    ? popularCourses
    : popularCourses.filter((c) =>
        c.title.includes(activeCategory) || c.category.includes(activeCategory)
      );

  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-10"
        >
          <SectionHeader
            overline="Ommabop Kurslar"
            title="Ommabop"
            titleAccent="Kurslar"
          />
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex items-center gap-2 flex-wrap justify-center mb-10 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:pb-0"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {courseFilters.map((f) => (
            <button
              key={f.value}
              onClick={() => setActiveCategory(f.value)}
              className={`px-3 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
                activeCategory === f.value
                  ? 'bg-slate-950 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {f.label}
            </button>
          ))}
        </motion.div>

        {/* Swiper */}
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
          {filtered.map((course) => (
            <SwiperSlide key={course.id} className="h-auto">
              <CourseCard course={course} className="h-full" />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="flex items-center justify-center gap-3 mt-6">
          <button
            ref={prevRef}
            className="w-11 h-11 rounded-full bg-white border border-slate-200 text-slate-950 flex items-center justify-center hover:bg-slate-50 hover:border-slate-300 transition-colors"
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

        {/* CTA */}
        <motion.div
          className="text-center mt-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <Link href="/courses">
            <Button variant="outline" size="lg" icon={<ArrowRight size={16} />}>
              Barcha Kurslarni Ko'ring
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

