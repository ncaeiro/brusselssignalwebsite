
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MegaMenu from './MegaMenu.tsx';
import SearchModal from './SearchModal.tsx';
import { NewsItem } from '../src/types.ts';

interface HeaderProps {
  onLogoClick?: () => void;
  onSignInClick?: () => void;
  onBecomeMemberClick?: () => void;
  onCategoryClick?: (category: string) => void;
  onPodcastClick?: (article: NewsItem) => void;
  onNewslettersClick?: () => void;
  onAuthorsClick?: () => void;
  onEventsClick?: () => void;
  onPartnerWithUsClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogoClick, onSignInClick, onBecomeMemberClick, onCategoryClick, onPodcastClick, onNewslettersClick, onAuthorsClick, onEventsClick, onPartnerWithUsClick }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [newsDropdownOpen, setNewsDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const handleCategoryClick = (cat: string) => {
    onCategoryClick?.(cat);
    setMenuOpen(false);
  };

  const handlePodcastClick = (article: NewsItem) => {
    onPodcastClick?.(article);
    setMenuOpen(false);
  };

  const handleHotTopicClick = (category: string, tag: string) => {
    // This will be handled by Link components in the dropdown
    setNewsDropdownOpen(false);
  };

  // Handle ESC key to close search modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && searchOpen) {
        setSearchOpen(false);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [searchOpen]);

  return (
    <header className="bg-[#1a2a44] text-white relative z-50">
      {/* Top Utility Bar */}
      <div className="container mx-auto px-4 lg:px-8 py-3 flex justify-between items-center text-xs font-bold uppercase tracking-wider">
        <div className="flex items-center gap-6">
            <button 
                onClick={() => setMenuOpen(!menuOpen)}
                className={`flex items-center gap-2 transition-colors ${menuOpen ? 'text-[#EE6260]' : 'hover:text-[#EE6260]'}`}
            >
                {menuOpen ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                )}
                <span>MENU</span>
            </button>
            <button
                onClick={() => setSearchOpen(true)}
                className="hover:text-[#EE6260] transition"
                aria-label="Search"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </button>
        </div>

        <div className="hidden md:flex flex-1 justify-center">
            <Link to="/" className="focus:outline-none">
              <img
                  src={import.meta.env.BASE_URL + 'images/logo.png'}
                  alt="Brussels Signal"
                  className="h-10"
              />
            </Link>
        </div>

        <div className="flex items-center gap-4">
            <button onClick={onSignInClick} className="hover:text-[#EE6260]">SIGN IN</button>
            <button onClick={onBecomeMemberClick} className="bg-[#EE6260] px-4 py-2 hover:bg-[#d44947] transition">BECOME A MEMBER</button>
        </div>
      </div>

      {/* Social Bar (Below Header) */}
      <div className="bg-[#121c2d] py-2">
        <div className="container mx-auto px-4 lg:px-8 flex items-center justify-between">
            <div className="flex gap-4">
              {/* Social icons: X, YouTube, Facebook, TikTok, LinkedIn, Instagram */}
              <a href="https://x.com/brusselssignal" aria-label="X" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center text-white/70 hover:text-white transition-colors">
                <img src={import.meta.env.BASE_URL + 'images/icons/icon-white-x.png'} alt="X" className="w-5 h-5" />
              </a>

              <a href="https://www.youtube.com/@BrusselsSignal" aria-label="YouTube" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center text-white/70 hover:text-white transition-colors">
                <img src={import.meta.env.BASE_URL + 'images/icons/icon-white-youtube.png'} alt="YouTube" className="w-5 h-5" />
              </a>

              <a href="https://www.facebook.com/brusselssignal" aria-label="Facebook" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center text-white/70 hover:text-white transition-colors">
                <img src={import.meta.env.BASE_URL + 'images/icons/icon-white-facebook.png'} alt="Facebook" className="w-5 h-5" />
              </a>

              <a href="https://www.tiktok.com/@brussels_signal" aria-label="TikTok" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center text-white/70 hover:text-white transition-colors">
                <img src={import.meta.env.BASE_URL + 'images/icons/icon-white-tiktok.png'} alt="TikTok" className="w-5 h-5" />
              </a>

              <a href="https://www.linkedin.com/company/brusselssignal/" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center text-white/70 hover:text-white transition-colors">
                <img src={import.meta.env.BASE_URL + 'images/icons/icon-white-linkedin.png'} alt="LinkedIn" className="w-5 h-5" />
              </a>

              <a href="https://www.instagram.com/brusselssignal/" aria-label="Instagram" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center text-white/70 hover:text-white transition-colors">
                <img src={import.meta.env.BASE_URL + 'images/icons/icon-white-instagram.png'} alt="Instagram" className="w-5 h-5" />
              </a>
            </div>
            <div className="hidden lg:flex gap-8 text-[12px] font-bold uppercase tracking-widest text-gray-400 items-center">
                {/* Hot Topics with dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setNewsDropdownOpen(!newsDropdownOpen)}
                    onMouseEnter={() => setNewsDropdownOpen(true)}
                    className="bg-[#EE6260] text-white px-3 py-1 rounded uppercase flex items-center gap-1 hover:bg-[#d44947] transition-colors"
                  >
                    Hot Topics
                    <svg className={`w-3 h-3 transition-transform ${newsDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </button>

                  {/* Hot Topics Dropdown */}
                  {newsDropdownOpen && (
                    <div
                      className="absolute top-full left-0 mt-2 bg-[#1a2a44] shadow-2xl rounded-md py-4 px-6 min-w-[200px] z-50"
                      onMouseLeave={() => setNewsDropdownOpen(false)}
                    >
                      <div className="space-y-2">
                        <Link to="/category/society/tag/migration" onClick={handleHotTopicClick} className="block hover:text-white text-gray-300 text-left w-full text-[12px] font-normal">Mass Migration</Link>
                        <Link to="/category/society/tag/free-speech" onClick={handleHotTopicClick} className="block hover:text-white text-gray-300 text-left w-full text-[12px] font-normal">Free Speech</Link>
                        <Link to="/category/politics/tag/ukraine" onClick={handleHotTopicClick} className="block hover:text-white text-gray-300 text-left w-full text-[12px] font-normal">Ukraine</Link>
                        <Link to="/category/politics/tag/dsa" onClick={handleHotTopicClick} className="block hover:text-white text-gray-300 text-left w-full text-[12px] font-normal">DSA Pact</Link>
                        <Link to="/category/economy/tag/tariffs" onClick={handleHotTopicClick} className="block hover:text-white text-gray-300 text-left w-full text-[12px] font-normal">Tariffs</Link>
                      </div>
                    </div>
                  )}
                </div>

                <Link to="/category/news" className="hover:text-white uppercase">News</Link>
                <Link to="/category/commentary" className="hover:text-white uppercase">Opinion</Link>
                <Link to="/category/politics" className="hover:text-white uppercase">Politics</Link>
                <Link to="/category/economy" className="hover:text-white uppercase">Economy</Link>
                <Link to="/category/society" className="hover:text-white uppercase">Society</Link>
                <Link to="/category/world" className="hover:text-white uppercase">World</Link>
                <Link to="/category/videos-filtered" className="hover:text-white uppercase">Videos</Link>
                <Link to="/events" className="hover:text-white uppercase">Events</Link>

                {/* Newsletters Link - stands out with red color */}
                <Link
                  to="/newsletters-grid-authors"
                  className="text-[#EE6260] hover:text-white uppercase transition font-black"
                >
                  Newsletters
                </Link>
            </div>
        </div>
      </div>

      {/* Mega Menu Overlay */}
      {menuOpen && (
        <MegaMenu
          onClose={() => setMenuOpen(false)}
          onCategoryClick={handleCategoryClick}
          onPodcastClick={handlePodcastClick}
          onNewslettersClick={onNewslettersClick}
          onAuthorsClick={onAuthorsClick}
          onPartnerWithUsClick={onPartnerWithUsClick}
          onSignInClick={onSignInClick}
          onEventsClick={onEventsClick}
          onBecomeMemberClick={onBecomeMemberClick}
        />
      )}

      {/* Search Modal */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
      />
    </header>
  );
};

export default Header;
