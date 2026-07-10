import React from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Quote, Star } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { testimonials } from '@/data/testimonials';

export const ParentReviews: React.FC = () => {
  return (
    <section className="section-padding bg-slate-950 text-white overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <SectionHeader
            overline="Testimonials"
            title="Ota-onalar va O'quvchilar"
            titleAccent="Nima Deyishadi"
            description="Bizning so'zimizga ishlang. Qarshiyev Ta'lim Markazi farqini birinchi qo'ldan boshdan o'tgan o'quvchilar va ota-onalardan eshitib oling."
            inverted
          />
        </motion.div>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 6000, disableOnInteraction: false }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-16 px-2"
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <TestimonialCard testimonial={testimonial} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

const TestimonialCard: React.FC<{ testimonial: typeof testimonials[0] }> = ({ testimonial }) => {
  return (
    <motion.div
      className="bg-white/5 border border-white/10 rounded-xl p-8 relative h-full flex flex-col group hover:bg-white/10 transition-colors duration-300"
      whileHover={{}}
    >
      <div className="absolute top-6 right-8 opacity-10 group-hover:opacity-20 transition-opacity">
        <Quote size={60} className="text-violet-500" />
      </div>

      <div className="flex items-center gap-1.5 mb-6">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star key={i} size={16} fill="#f59e0b" className="text-violet-500" />
        ))}
      </div>

      <p className="text-slate-300 text-sm leading-relaxed mb-8 flex-1 relative z-10">
        "{testimonial.review}"
      </p>

      <div className="flex items-center gap-4 mt-auto border-t border-white/10 pt-6">
        <img
          src={testimonial.avatar}
          alt={testimonial.name}
          className="w-12 h-12 rounded-full object-cover border-2 border-white/10"
          loading="lazy"
        />
        <div>
          <h4 className="font-bold text-white text-sm">{testimonial.name}</h4>
          <p className="text-violet-400 text-xs font-medium mt-0.5">{testimonial.role}</p>
        </div>
      </div>
    </motion.div>
  );
};
