import React, { useEffect, useRef, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import GetInvolvedModal from './components/ui/GetInvolvedModal';
import JNSOfferLetterModal from './components/ui/JNSOfferLetterModal';
import BookOrderModal from './components/ui/BookOrderModal';

import Home from './pages/Home';

function SiteTransition({ children }) {
  const location = useLocation();
  const previousPath = useRef(location.pathname);
  const [phase, setPhase] = useState('initial');
  const [showPreloader, setShowPreloader] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);

  useEffect(() => {
    let isLoaded = document.readyState === 'complete';
    const markLoaded = () => {
      isLoaded = true;
    };
    window.addEventListener('load', markLoaded);

    const progressTimer = window.setInterval(() => {
      setLoadProgress((progress) => {
        if (progress >= 100) return 100;
        const next = progress + (isLoaded ? 18 : 6);
        return Math.min(next, isLoaded ? 100 : 92);
      });
    }, 90);

    const reveal = window.setTimeout(() => {
      setLoadProgress(100);
      setShowPreloader(false);
      document.documentElement.classList.add('ani_ready__3q3NY');
      setPhase('entering');
    }, isLoaded ? 850 : 1250);
    const done = window.setTimeout(() => setPhase('idle'), isLoaded ? 1780 : 2180);

    return () => {
      window.removeEventListener('load', markLoaded);
      window.clearInterval(progressTimer);
      window.clearTimeout(reveal);
      window.clearTimeout(done);
    };
  }, []);

  useEffect(() => {
    if (previousPath.current === location.pathname) return;

    previousPath.current = location.pathname;
    document.documentElement.classList.remove('ani_ready__3q3NY');
    setPhase('exiting');

    const enter = window.setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.documentElement.classList.add('ani_ready__3q3NY');
      setPhase('entering');
    }, 720);
    const done = window.setTimeout(() => setPhase('idle'), 1620);

    return () => {
      window.clearTimeout(enter);
      window.clearTimeout(done);
    };
  }, [location.pathname]);

  return (
    <>
      {showPreloader && (
        <div className="preloader_wrapper__ratK3" aria-label="Loading website">
          <div className="preloader_bg_red__p69j5"></div>
          <div className="preloader_bg_yellow__ijXRS"></div>
          <div className="preloader_bg_blue__klANv"></div>
          <div className="preloader_bg__OAhDx"></div>
          <div className="preloader_container__gPn78">
            <div className="preloader_textWrap__0sTV9 text_tag__kpI4A">
              Loading
            </div>
            <div className="preloader_text__I76kU text_xl__DB7xZ">
              <span className="preloader_percentage__X4EpV">
                {String(loadProgress).padStart(3, '0')}
                <span className="preloader_percentSign__DcOjs">%</span>
              </span>
            </div>
          </div>
        </div>
      )}
      <div className="transition_page__NmPlH" data-route={location.pathname}>
        <div id="wrap" data-nav-translate="true">
          {children}
        </div>
      </div>
      <div
        className="transition_wipe__8Vprc siteTransition_wipe"
        data-phase={phase}
        aria-hidden="true"
      >
        <div className="transition_bg_red__IIL1x"></div>
        <div className="transition_bg_yellow__FGqLr"></div>
        <div className="transition_bg_blue__JRp3x"></div>
        <div className="transition_bg__i_I_j"></div>
      </div>
    </>
  );
}

function SiteRoutes({
  onOpenGetInvolved,
  onOpenJnsModal,
  onOpenBookModal,
}) {
  return (
    <SiteTransition>
      <Header onOpenGetInvolved={onOpenGetInvolved} />

      <Routes>
        <Route
          path="/"
          element={
            <Home
              onOpenGetInvolved={onOpenGetInvolved}
              onOpenJnsModal={onOpenJnsModal}
              onOpenBookModal={onOpenBookModal}
            />
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Footer onOpenGetInvolved={onOpenGetInvolved} />
    </SiteTransition>
  );
}

export default function App() {
  const [isGetInvolvedOpen, setIsGetInvolvedOpen] = useState(false);
  const [isJnsModalOpen, setIsJnsModalOpen] = useState(false);
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const openGetInvolved = () => setIsGetInvolvedOpen(true);
  const openJnsModal = () => setIsJnsModalOpen(true);
  const openBookModal = () => setIsBookModalOpen(true);

  return (
    <Router>
      <div>
        <SiteRoutes
          onOpenGetInvolved={openGetInvolved}
          onOpenJnsModal={openJnsModal}
          onOpenBookModal={openBookModal}
        />

        {/* Interactive Modals */}
        <GetInvolvedModal 
          isOpen={isGetInvolvedOpen} 
          onClose={() => setIsGetInvolvedOpen(false)} 
        />

        <JNSOfferLetterModal 
          isOpen={isJnsModalOpen} 
          onClose={() => setIsJnsModalOpen(false)} 
        />

        <BookOrderModal 
          isOpen={isBookModalOpen} 
          onClose={() => setIsBookModalOpen(false)} 
        />

      </div>
    </Router>
  );
}
