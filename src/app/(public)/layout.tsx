'use client';

import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { FloatingButtons } from '@/components/layout/FloatingButtons';
import { Assistant } from '@/components/assistant';
import { CinematicIntro } from '@/components/intro';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* suppressHydrationWarning is scoped to CinematicIntro alone —
          the server may render the overlay while the client decides
          differently based on browser-only sessionStorage. The mismatch
          is harmless and the black screen hides any visual discrepancy. */}
      <div suppressHydrationWarning style={{ display: 'contents' }}>
        <CinematicIntro />
      </div>
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

