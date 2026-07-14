import React, { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Badge } from '@/components/ui/Badge';
import { CourseCard } from '@/components/ui/CourseCard';
import { courses } from '@/data/courses';
import { galleryItems } from '@/data/gallery';
import { teachers } from '@/data/teachers';
import { TeacherCard, getYTId } from '@/components/sections/TeachersSection';
import { Modal } from '@/components/ui/Modal';

const PageHero: React.FC<{ title: string, subtitle: string, image: string }> = ({ title, subtitle, image }) => (
  <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-slate-950">
    <div className="absolute inset-0 opacity-40">
      <img src={image} alt={title} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-slate-950/60" />
    </div>
    <div className="container-custom relative z-10 text-center">
      <motion.h1 
        className="text-4xl md:text-6xl font-serif font-bold text-white mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {title}
      </motion.h1>
      <motion.p 
        className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        {subtitle}
      </motion.p>
    </div>
  </section>
);

export const AboutPage: React.FC = () => (
  <>
    <Helmet><title>About Us | Qarshiyev Education Center</title></Helmet>
    <main>
      <PageHero 
        title="About Us" 
        subtitle="Learn about our mission, vision, and the history of excellence." 
        image="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&q=90" 
      />
      <section className="section-padding bg-white min-h-[50vh] flex items-center justify-center">
        <SectionHeader title="About Page Content" description="Detailed about page content will be placed here." />
      </section>
    </main>
  </>
);

export const CoursesPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('Barchasi');

  const categories = useMemo(() => {
    const present = Array.from(new Set(courses.map((c) => c.category)));
    return ['Barchasi', ...present];
  }, []);

  const filtered = activeCategory === 'Barchasi'
    ? courses
    : courses.filter((c) => c.category === activeCategory);

  return (
    <>
      <Helmet><title>Courses | Qarshiyev Education Center</title></Helmet>
      <main>
        <PageHero
          title="Bizning Kurslar"
          subtitle="Ingliz tilidan IELTS va akademik dasturlargacha — maqsadingizga mos kursni tanlang."
          image="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&q=90"
        />
        <section className="section-padding bg-white">
          <div className="container-custom">
            <SectionHeader
              overline="Bizning Dasturlarimiz"
              title="Barcha"
              titleAccent="Kurslar"
              description="Boshlang'ich ingliz tilidan ilg'or IELTS tayyorgarligigacha bo'lgan barcha kurslarimizni ko'rib chiqing."
            />

            {/* Category Filter */}
            <div className="flex items-center gap-2 flex-wrap justify-center mb-10">
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
            </div>

            {/* Courses Grid */}
            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((course, i) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: (i % 3) * 0.08, duration: 0.5 }}
                  >
                    <CourseCard course={course} className="h-full" />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center text-slate-500 py-20">
                <p className="text-lg">Tanlangan yo'nalish bo'yicha kurslar topilmadi.</p>
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
};

export const TeachersPage: React.FC = () => {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  return (
    <>
      <Helmet><title>Teachers | Qarshiyev Education Center</title></Helmet>
      <main>
        <PageHero
          title="Our Teachers"
          subtitle="Meet the international experts behind our students' success."
          image="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&q=90"
        />
        <section className="section-padding bg-slate-950">
          <div className="container-custom">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {teachers.map((teacher) => (
                <TeacherCard
                  key={teacher.id}
                  teacher={teacher}
                  onWatchVideo={setVideoUrl}
                />
              ))}
            </div>
          </div>
        </section>
      </main>

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
    </>
  );
};

export const GalleryPage: React.FC = () => (
  <>
    <Helmet><title>Gallery | Qarshiyev Education Center</title></Helmet>
    <main>
      <PageHero
        title="Gallery"
        subtitle="Explore the vibrant life at our education center."
        image={galleryItems[0]?.src ?? ''}
      />
      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeader
            overline="Gallery"
            title="Moments That"
            titleAccent="Matter"
            description="A glimpse into life at Qarshiyev Education Center — from classrooms and events to graduation ceremonies and student achievements."
          />
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4 mt-8">
            {galleryItems.map((item, i) => (
              <motion.div
                key={item.id}
                className="break-inside-avoid relative rounded-lg overflow-hidden"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-slate-950/40 flex items-end p-4">
                  <div>
                    <Badge variant="gold" size="sm">{item.category}</Badge>
                    <p className="text-white text-sm font-semibold mt-1">{item.title}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  </>
);

export const ResultsPage: React.FC = () => (
  <>
    <Helmet><title>Student Results | Qarshiyev Education Center</title></Helmet>
    <main>
      <PageHero 
        title="Student Results" 
        subtitle="Celebrate the outstanding achievements of our graduates." 
        image="https://images.unsplash.com/photo-1627556704302-624286467c65?w=1200&q=90" 
      />
      <section className="section-padding bg-white min-h-[50vh] flex items-center justify-center">
        <SectionHeader title="Student Achievements" description="Comprehensive student results will be displayed here." />
      </section>
    </main>
  </>
);

export const EventsPage: React.FC = () => (
  <>
    <Helmet><title>Events | Qarshiyev Education Center</title></Helmet>
    <main>
      <PageHero 
        title="Events" 
        subtitle="Join our upcoming workshops, seminars, and cultural events." 
        image="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&q=90" 
      />
      <section className="section-padding bg-white min-h-[50vh] flex items-center justify-center">
        <SectionHeader title="Events Calendar" description="Full events schedule will be displayed here." />
      </section>
    </main>
  </>
);

export const BlogPage: React.FC = () => (
  <>
    <Helmet><title>Blog | Qarshiyev Education Center</title></Helmet>
    <main>
      <PageHero 
        title="Blog & Insights" 
        subtitle="Expert tips, news, and success stories." 
        image="https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=1200&q=90" 
      />
      <section className="section-padding bg-white min-h-[50vh] flex items-center justify-center">
        <SectionHeader title="Blog Articles" description="All blog articles will be listed here." />
      </section>
    </main>
  </>
);

export const FAQPage: React.FC = () => (
  <>
    <Helmet><title>FAQ | Qarshiyev Education Center</title></Helmet>
    <main>
      <PageHero 
        title="Help & FAQ" 
        subtitle="Find answers to commonly asked questions." 
        image="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&q=90" 
      />
      <section className="section-padding bg-white min-h-[50vh] flex items-center justify-center">
        <SectionHeader title="Complete FAQ" description="Full list of FAQs will be available here." />
      </section>
    </main>
  </>
);

