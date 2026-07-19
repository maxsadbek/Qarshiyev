'use client';

import React from 'react';
import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { WhyChooseUs } from '@/components/sections/WhyChooseUs';
import { PopularCourses } from '@/components/sections/PopularCourses';
import { TeachersSection } from '@/components/sections/TeachersSection';
import { StudentResultsSection } from '@/components/sections/StudentResultsSection';
import { StatisticsSection } from '@/components/sections/StatisticsSection';
import { VideoExperience } from '@/components/sections/VideoExperience';
import { VirtualTour } from '@/components/sections/VirtualTour';
import { GallerySection } from '@/components/sections/GallerySection';
import { EventsSection } from '@/components/sections/EventsSection';
import { BlogSection } from '@/components/sections/BlogSection';
import { FAQSection } from '@/components/sections/FAQSection';
import { ParentReviews } from '@/components/sections/ParentReviews';
import { Partners } from '@/components/sections/Partners';
import { NewsletterSection } from '@/components/sections/NewsletterSection';

export const HomePage: React.FC = () => {
  return (
    <>
      <main>
        <HeroSection />
        <Partners />
        <AboutSection />
        <WhyChooseUs />
        <PopularCourses />
        <VideoExperience />
        <TeachersSection />
        <StudentResultsSection />
        <StatisticsSection />
        <VirtualTour />
        <ParentReviews />
        <GallerySection />
        <EventsSection />
        <BlogSection />
        <FAQSection />
        <NewsletterSection />
      </main>
    </>
  );
};

