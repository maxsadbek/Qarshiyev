import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { SmoothScrollProvider, useLenis } from '@/context/SmoothScrollProvider';
import { AuthProvider } from '@/context/AuthContext';
import { IntroProvider } from '@/context/IntroContext';
import { CinematicIntro } from '@/components/intro';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { FloatingButtons } from '@/components/layout/FloatingButtons';
import { Assistant } from '@/components/assistant';
import { AssistantProvider } from '@/assistant/AssistantContext';
import { ROUTES } from '@/constants';

// Pages
import { HomePage } from '@/pages/HomePage';
import {
  AboutPage, CoursesPage, TeachersPage, GalleryPage,
  ResultsPage, EventsPage, BlogPage, FAQPage
} from '@/pages/SecondaryPages';
import { LoginPage, RegisterPage } from '@/pages/AuthPages';
import { ProfilePage } from '@/pages/ProfilePage';
import { AnalyticsPage } from '@/features/analytics';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  const lenis = useLenis();
  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, lenis]);
  return null;
};

const App: React.FC = () => {
  return (
      <HelmetProvider>
        <SmoothScrollProvider>
          <IntroProvider>
            <AuthProvider>
              <AssistantProvider>
              <Router>
                <ScrollToTop />
                <CinematicIntro />
                <div id="site-reveal" className="flex flex-col min-h-screen">
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
                    <Route path={ROUTES.LOGIN} element={<LoginPage />} />
                    <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
                    <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
                    <Route path={ROUTES.ANALYTICS} element={<AnalyticsPage />} />
                    <Route path="*" element={<HomePage />} />
                  </Routes>
                </div>
                <Footer />
                <FloatingButtons />
                <Assistant />
                </div>
              </Router>
              </AssistantProvider>
            </AuthProvider>
          </IntroProvider>
        </SmoothScrollProvider>
      </HelmetProvider>
  );
};

export default App;
