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
import { achievementItems, achievementFilter, type Achievement } from '@/data/achievements';
import { Play, Film, Image as ImageIcon, Sparkles } from 'lucide-react';

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

export const ResultsPage: React.FC = () => {
  const [filter, setFilter] = useState<(typeof achievementFilter)[number]>('Hammasi');
  const [active, setActive] = useState<Achievement | null>(null);

  const items = filter === 'Hammasi'
    ? achievementItems
    : achievementItems.filter((i) => (filter === 'Videolar' ? i.type === 'video' : i.type === 'image'));

  const videoCount = achievementItems.filter((i) => i.type === 'video').length;
  const imageCount = achievementItems.filter((i) => i.type === 'image').length;

  return (
    <>
      <Helmet>
        <title>O'quvchilarning Yutuqlari | Qarshiyev Education Center</title>
        <meta name="description" content="Bizning o'quvchilarimizning erishgan yutuqlari, mukofotlari va muvaffaqiyatli natijalari." />
      </Helmet>
      <main>
        <PageHero
          title="O'quvchilarning Yutuqlari"
          subtitle="Bizning o'quvchilarimizning erishgan ajoyib yutuqlari, mukofotlari va kundalik muvaffaqiyatlarini kuzatib boring."
          image={achievementItems[0]?.src ?? 'https://images.unsplash.com/photo-1627556704302-624286467c65?w=1200&q=90'}
        />

        <section className="section-padding bg-white">
          <div className="container-custom">
            <SectionHeader
              overline="Muvaffaqiyat Hikoyalari"
              title="Bizning O'quvchilarning"
              titleAccent="Yutuqlari"
              description="Sinfdan tortib xalqaro musobaqalarga qadar — o'quvchilarimizning eng yaxshi lahzalari, videolari va suratlari bitta joyda."
            />

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-10 max-w-3xl mx-auto">
              <div className="bg-slate-50 rounded-2xl p-5 text-center border border-slate-100">
                <div className="flex items-center justify-center gap-2 text-violet-600 mb-1">
                  <Film size={18} />
                  <span className="text-2xl font-bold text-slate-950">{videoCount}</span>
                </div>
                <p className="text-sm text-slate-500 font-medium">Video</p>
              </div>
              <div className="bg-slate-50 rounded-2xl p-5 text-center border border-slate-100">
                <div className="flex items-center justify-center gap-2 text-violet-600 mb-1">
                  <ImageIcon size={18} />
                  <span className="text-2xl font-bold text-slate-950">{imageCount}</span>
                </div>
                <p className="text-sm text-slate-500 font-medium">Rasm</p>
              </div>
              <div className="bg-slate-50 rounded-2xl p-5 text-center border border-slate-100 col-span-2 md:col-span-1">
                <div className="flex items-center justify-center gap-2 text-violet-600 mb-1">
                  <Sparkles size={18} />
                  <span className="text-2xl font-bold text-slate-950">2500+</span>
                </div>
                <p className="text-sm text-slate-500 font-medium">Jami yutuq</p>
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-2 flex-wrap justify-center mt-10 mb-10">
              {achievementFilter.map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                    filter === f
                      ? 'bg-slate-950 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>

            {/* Masonry Gallery */}
            {items.length > 0 ? (
              <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
                {items.map((item, i) => (
                  <motion.button
                    key={item.id}
                    type="button"
                    onClick={() => setActive(item)}
                    className="break-inside-avoid relative block w-full overflow-hidden rounded-xl bg-slate-100 group text-left"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: (i % 3) * 0.06, duration: 0.5 }}
                  >
                    {item.type === 'video' ? (
                      <video
                        src={item.src}
                        className="w-full aspect-video object-cover"
                        muted
                        playsInline
                        preload="metadata"
                      />
                    ) : (
                      <img
                        src={item.src}
                        alt={item.title}
                        className="w-full object-cover"
                        loading="lazy"
                      />
                    )}

                    {/* Overlay */}
                    <span className="absolute inset-0 bg-slate-950/0 group-hover:bg-slate-950/40 transition-colors duration-300 flex items-center justify-center">
                      <span className="w-14 h-14 rounded-full bg-white/90 text-slate-950 flex items-center justify-center opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-300 shadow-lg">
                        {item.type === 'video' ? <Play size={22} className="ml-0.5" /> : <ImageIcon size={22} />}
                      </span>
                    </span>

                    {item.type === 'video' && (
                      <span className="absolute top-3 left-3 bg-slate-950/80 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md flex items-center gap-1">
                        <Play size={11} /> Video
                      </span>
                    )}
                  </motion.button>
                ))}
              </div>
            ) : (
              <div className="text-center text-slate-500 py-20">
                <p className="text-lg">Tanlangan bo'limda yozuvlar topilmadi.</p>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Lightbox */}
      <Modal
        isOpen={!!active}
        onClose={() => setActive(null)}
        size="full"
        showClose
      >
        {active && (
          <div className="bg-slate-950 p-4 md:p-6 flex items-center justify-center">
            {active.type === 'video' ? (
              <video
                src={active.src}
                className="w-full max-h-[82vh] rounded-lg bg-black"
                controls
                autoPlay
                playsInline
              />
            ) : (
              <img
                src={active.src}
                alt={active.title}
                className="w-auto max-w-full max-h-[82vh] rounded-lg object-contain"
              />
            )}
          </div>
        )}
      </Modal>
    </>
  );
};

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

