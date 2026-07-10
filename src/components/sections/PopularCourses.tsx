import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import {
  Clock, Users, Star, ArrowRight, BookOpen
} from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { courses } from '@/data/courses';
import { formatPrice } from '@/utils';

export const PopularCourses: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const categories = ['All', 'IELTS', 'English', 'SAT', 'Business'];

  const filtered = activeCategory === 'All'
    ? courses
    : courses.filter((c) => c.category === activeCategory);

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
            overline="Bizning Dasturlarimiz"
            title="Mashhur"
            titleAccent="Kurslar"
            description="Boshlang'ich ingliz tilidan ilg'or IELTS tayyorgarligigacha — maqsadingizga mos dasturni toping va bugun safaringizni boshlang."
          />
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex items-center gap-2 flex-wrap justify-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-slate-950 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Swiper */}
        <Swiper
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
            <SwiperSlide key={course.id}>
              <CourseCard course={course} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* CTA */}
        <motion.div
          className="text-center mt-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <Link to="/courses">
            <Button variant="outline" size="lg" icon={<ArrowRight size={16} />}>
              Barcha Kurslarni Ko'ring
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

const CourseCard: React.FC<{ course: typeof courses[0] }> = ({ course }) => {
  return (
    <motion.div
      className="bg-white rounded-xl overflow-hidden card-shadow hover:shadow-xl transition-all duration-300 group border border-slate-100"
      whileHover={{}}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
        <div className="absolute top-4 left-4 flex gap-2">
          <Badge variant="gold">{course.category}</Badge>
          {course.featured && <Badge variant="dark">Featured</Badge>}
        </div>
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Star size={12} fill="#f59e0b" className="text-violet-400" />
            <span className="text-white text-xs font-semibold">{course.rating}</span>
            <span className="text-white/60 text-xs">({course.reviewCount})</span>
          </div>
          <Badge variant="dark">{course.level}</Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Instructor */}
        <div className="flex items-center gap-2 mb-3">
          <img
            src={course.instructorAvatar}
            alt={course.instructor}
            className="w-6 h-6 rounded-full object-cover"
          />
          <span className="text-slate-400 text-xs font-medium">{course.instructor}</span>
        </div>

        <h3 className="font-serif font-bold text-slate-950 text-lg leading-snug mb-3 group-hover:text-violet-600 transition-colors line-clamp-2">
          {course.title}
        </h3>

        {/* Meta */}
        <div className="flex items-center gap-4 mb-4 text-slate-400 text-xs">
          <div className="flex items-center gap-1.5">
            <Clock size={13} />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <BookOpen size={13} />
            <span>{course.lessons} lessons</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users size={13} />
            <span>{course.students.toLocaleString()}</span>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-slate-100 mb-4" />

        {/* Price + CTA */}
        <div className="flex items-center justify-between">
          <div>
            {course.discountPrice ? (
              <div className="flex items-baseline gap-2">
                <span className="font-bold text-slate-950 text-sm">{formatPrice(course.discountPrice)}</span>
                <span className="text-slate-400 text-xs line-through">{formatPrice(course.price)}</span>
              </div>
            ) : (
              <span className="font-bold text-slate-950 text-sm">{formatPrice(course.price)}</span>
            )}
            <div className="text-slate-400 text-xs mt-0.5">{course.schedule}</div>
          </div>
          <Link to="/contact">
            <button className="bg-violet-500 text-white text-xs font-bold px-4 py-2 rounded-full hover:bg-violet-600 transition-colors">
              Enroll
            </button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
