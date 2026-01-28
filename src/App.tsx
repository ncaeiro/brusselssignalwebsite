import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { FavoritesProvider } from './FavoritesContext.tsx';

// ScrollToTop component - scrolls to top on every route change
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};
import Header from '../components/Header.tsx';
import Ticker from '../components/Ticker.tsx';
import Footer from '../components/Footer.tsx';
import HomePage from '../pages/HomePage.tsx';
import ArticlePage from '../pages/ArticlePage.tsx';
import CategoryPageWrapper from '../pages/CategoryPageWrapper.tsx';
import AuthorPageWrapper from '../pages/AuthorPageWrapper.tsx';
import NewsletterPage from '../components/NewsletterPage.tsx';
import NewslettersGridPage from '../components/NewslettersGridPage.tsx';
import NewslettersGridAuthorsPage from '../components/NewslettersGridAuthorsPage.tsx';
import NewslettersPromoPage from '../pages/NewslettersPromoPage.tsx';
import SubscriptionPlans from '../components/SubscriptionPlans.tsx';
import AuthorsPage from '../pages/AuthorsPage.tsx';
import EventsPage from '../pages/EventsPage.tsx';
import PartnerWithUsPage from '../pages/PartnerWithUsPage.tsx';
import FavoritesPage from '../pages/FavoritesPage.tsx';
import UserProfilePage from '../pages/UserProfilePage.tsx';
import CompleteAccountSetupPage from '../pages/CompleteAccountSetupPage.tsx';
import SiteArchitecturePage from '../pages/SiteArchitecturePage.tsx';
import VideosAndPodcastsPage from '../components/VideosAndPodcastsPage.tsx';
import FilteredVideosAndPodcastsPage from '../components/FilteredVideosAndPodcastsPage.tsx';
import PodcastShowPageWrapper from '../pages/PodcastShowPageWrapper.tsx';
import LoginModal from '../components/LoginModal.tsx';
import SignUpModal from '../components/SignUpModal.tsx';

const AppContent: React.FC = () => {
  const navigate = useNavigate();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);

  const openLogin = () => {
    setIsSignUpModalOpen(false);
    setIsLoginModalOpen(true);
  };
  const closeLogin = () => setIsLoginModalOpen(false);

  const openSignUp = () => {
    setIsLoginModalOpen(false);
    setIsSignUpModalOpen(true);
  };
  const closeSignUp = () => setIsSignUpModalOpen(false);

  const navigateToCategory = (categoryName: string) => {
    const slug = categoryName.toLowerCase().replace(/\s+/g, '-');
    navigate(`/category/${slug}`);
    window.scrollTo(0, 0);
  };

  const navigateToNewsletters = () => {
    navigate('/newsletters-grid-authors');
    window.scrollTo(0, 0);
  };

  const navigateToSubscriptions = () => {
    navigate('/subscriptions');
    window.scrollTo(0, 0);
  };

  const navigateToAuthors = () => {
    navigate('/authors');
    window.scrollTo(0, 0);
  };

  const navigateToEvents = () => {
    navigate('/events');
    window.scrollTo(0, 0);
  };

  const navigateToPartnerWithUs = () => {
    navigate('/partner-with-us');
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      <Header
        onLogoClick={() => navigate('/')}
        onSignInClick={openLogin}
        onBecomeMemberClick={navigateToSubscriptions}
        onCategoryClick={navigateToCategory}
        onPodcastClick={() => {}}
        onNewslettersClick={navigateToNewsletters}
        onAuthorsClick={navigateToAuthors}
        onEventsClick={navigateToEvents}
        onPartnerWithUsClick={navigateToPartnerWithUs}
      />
      <Ticker />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/article/:slug" element={<ArticlePage type="article" onSignInClick={openLogin} />} />
        <Route path="/premium/:slug" element={<ArticlePage type="premium" onSignInClick={openLogin} />} />
        <Route path="/video/:slug" element={<ArticlePage type="video" onSignInClick={openLogin} />} />
        <Route path="/podcast/:slug" element={<ArticlePage type="podcast" onSignInClick={openLogin} />} />
        <Route path="/category/videos-filtered" element={<FilteredVideosAndPodcastsPage />} />
        <Route path="/podcast-show/:showSlug" element={<PodcastShowPageWrapper />} />
        <Route path="/category/:category/tag/:tag" element={<CategoryPageWrapper />} />
        <Route path="/category/:category" element={<CategoryPageWrapper />} />
        <Route path="/author/:authorSlug" element={<AuthorPageWrapper />} />
        <Route path="/newsletters" element={<NewsletterPage />} />
        <Route path="/newsletters-grid" element={<NewslettersGridPage />} />
        <Route path="/newsletters-grid-authors" element={<NewslettersGridAuthorsPage />} />
        <Route path="/newsletters-promo" element={<NewslettersPromoPage />} />
        <Route path="/subscriptions" element={<SubscriptionPlans onPlanSelect={openSignUp} />} />
        <Route path="/authors" element={<AuthorsPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/partner-with-us" element={<PartnerWithUsPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/profile" element={<UserProfilePage />} />
        <Route path="/complete-account" element={<CompleteAccountSetupPage />} />
        <Route path="/site-architecture" element={<SiteArchitecturePage />} />
      </Routes>

      <Footer
        onSignInClick={openLogin}
        onBecomeMemberClick={navigateToSubscriptions}
        onCategoryClick={navigateToCategory}
        onNewslettersClick={navigateToNewsletters}
        onPartnerWithUsClick={navigateToPartnerWithUs}
      />

      <LoginModal isOpen={isLoginModalOpen} onClose={closeLogin} onSwitchToSignUp={openSignUp} />
      <SignUpModal isOpen={isSignUpModalOpen} onClose={closeSignUp} onSwitchToLogin={openLogin} />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter basename="/brusselssignal/website">
      <ScrollToTop />
      <FavoritesProvider>
        <AppContent />
      </FavoritesProvider>
    </BrowserRouter>
  );
};

export default App;
