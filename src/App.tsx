import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { FloatingButtons } from '@/components/layout/FloatingButtons';
import { ROUTES } from '@/constants';

// Pages
import { HomePage } from '@/pages/HomePage';
import { 
  AboutPage, CoursesPage, TeachersPage, GalleryPage, 
  ResultsPage, EventsPage, BlogPage, FAQPage, ContactPage 
} from '@/pages/SecondaryPages';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <div className="flex-grow">
            <Routes>
              <Route path={ROUTES.HOME} element={<HomePage />} />
              <Route path={ROUTES.ABOUT} element={<AboutPage />} />
              <Route path={ROUTES.COURSES} element={<CoursesPage />} />
              <Route path={ROUTES.TEACHERS} element={<TeachersPage />} />
              <Route path={ROUTES.GALLERY} element={<GalleryPage />} />
              <Route path={ROUTES.RESULTS} element={<ResultsPage />} />
              <Route path={ROUTES.EVENTS} element={<EventsPage />} />
              <Route path={ROUTES.BLOG} element={<BlogPage />} />
              <Route path={ROUTES.FAQ} element={<FAQPage />} />
              <Route path={ROUTES.CONTACT} element={<ContactPage />} />
              <Route path="*" element={<HomePage />} />
            </Routes>
          </div>
          <Footer />
          <FloatingButtons />
        </div>
      </Router>
    </HelmetProvider>
  );
};

export default App;
