'use client';

import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { FloatingButtons } from '@/components/layout/FloatingButtons';
import { Assistant } from '@/components/assistant';
import { usePathname } from 'next/navigation';
import { CinematicIntro } from '@/components/intro';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === '/';

  return (
    <div className="flex flex-col min-h-screen">
      <CinematicIntro />
      <Navbar />
      <div id="site-reveal" className="flex-grow">
        {children}
      </div>
      <Footer />
      <FloatingButtons />
      <Assistant />
    </div>
  );
}

