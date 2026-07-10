import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { SectionHeader } from '@/components/ui/SectionHeader';

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

export const CoursesPage: React.FC = () => (
  <>
    <Helmet><title>Courses | Qarshiyev Education Center</title></Helmet>
    <main>
      <PageHero 
        title="Our Courses" 
        subtitle="Explore our wide range of premium educational programs." 
        image="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&q=90" 
      />
      <section className="section-padding bg-white min-h-[50vh] flex items-center justify-center">
        <SectionHeader title="Courses Directory" description="Full courses listing will be displayed here." />
      </section>
    </main>
  </>
);

export const TeachersPage: React.FC = () => (
  <>
    <Helmet><title>Teachers | Qarshiyev Education Center</title></Helmet>
    <main>
      <PageHero 
        title="Our Teachers" 
        subtitle="Meet the international experts behind our students' success." 
        image="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&q=90" 
      />
      <section className="section-padding bg-white min-h-[50vh] flex items-center justify-center">
        <SectionHeader title="Teachers Directory" description="Full teachers listing will be displayed here." />
      </section>
    </main>
  </>
);

export const GalleryPage: React.FC = () => (
  <>
    <Helmet><title>Gallery | Qarshiyev Education Center</title></Helmet>
    <main>
      <PageHero 
        title="Gallery" 
        subtitle="Explore the vibrant life at our education center." 
        image="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=90" 
      />
      <section className="section-padding bg-white min-h-[50vh] flex items-center justify-center">
        <SectionHeader title="Full Gallery" description="Complete photo and video gallery will be displayed here." />
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

export const ContactPage: React.FC = () => (
  <>
    <Helmet><title>Contact Us | Qarshiyev Education Center</title></Helmet>
    <main>
      <PageHero 
        title="Contact Us" 
        subtitle="We're here to help you start your journey." 
        image="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&q=90" 
      />
      <section className="section-padding bg-white min-h-[50vh] flex items-center justify-center">
        <SectionHeader title="Contact Details" description="Detailed contact form and maps will be placed here." />
      </section>
    </main>
  </>
);
