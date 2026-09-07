import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Lazy-loaded pages for code splitting
const HomePage = lazy(() => import('./pages/HomePage'));
const BuilderPage = lazy(() => import('./pages/BuilderPage'));
const TemplatesPage = lazy(() => import('./pages/TemplatesPage'));
const ExamplesPage = lazy(() => import('./pages/ExamplesPage'));
const TipsPage = lazy(() => import('./pages/TipsPage'));
const ATSCheckerPage = lazy(() => import('./pages/ATSCheckerPage'));
const JobMatcherPage = lazy(() => import('./pages/JobMatcherPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'));
const TermsPage = lazy(() => import('./pages/TermsPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-3 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
        <p className="text-secondary-500 text-sm">Loading...</p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          {/* Builder has its own header layout */}
          <Route path="/resume-builder" element={<BuilderPage />} />

          {/* All other pages use standard header/footer */}
          <Route
            path="*"
            element={
              <>
                <Header />
                <main className="flex-1">
                  <Suspense fallback={<LoadingFallback />}>
                    <Routes>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/resume-templates" element={<TemplatesPage />} />
                      <Route path="/resume-examples" element={<ExamplesPage />} />
                      <Route path="/resume-examples/:roleSlug" element={<ExamplesPage />} />
                      <Route path="/resume-tips" element={<TipsPage />} />
                      <Route path="/ats-resume-checker" element={<ATSCheckerPage />} />
                      <Route path="/job-description-matcher" element={<JobMatcherPage />} />
                      <Route path="/about" element={<AboutPage />} />
                      <Route path="/privacy" element={<PrivacyPage />} />
                      <Route path="/terms" element={<TermsPage />} />
                      <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                  </Suspense>
                </main>
                <Footer />
              </>
            }
          />
        </Routes>
      </Suspense>
    </div>
  );
}
