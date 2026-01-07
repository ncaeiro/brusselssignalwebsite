
import React, { useState } from 'react';
import MegaMenu from './MegaMenu.tsx';
import { NewsItem } from '../src/types.ts';

interface HeaderProps {
  onLogoClick?: () => void;
  onSignInClick?: () => void;
  onBecomeMemberClick?: () => void;
  onCategoryClick?: (category: string) => void;
  onPodcastClick?: (article: NewsItem) => void;
  onNewslettersClick?: () => void;
  onAuthorsClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogoClick, onSignInClick, onBecomeMemberClick, onCategoryClick, onPodcastClick, onNewslettersClick, onAuthorsClick }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleCategoryClick = (cat: string) => {
    onCategoryClick?.(cat);
    setMenuOpen(false);
  };

  const handlePodcastClick = (article: NewsItem) => {
    onPodcastClick?.(article);
    setMenuOpen(false);
  };

  return (
    <header className="bg-[#1a2a44] text-white relative z-50">
      {/* Top Utility Bar */}
      <div className="container mx-auto px-4 lg:px-8 py-3 flex justify-between items-center text-xs font-bold uppercase tracking-wider">
        <div className="flex items-center gap-6">
            <button 
                onClick={() => setMenuOpen(!menuOpen)}
                className={`flex items-center gap-2 transition-colors ${menuOpen ? 'text-red-500' : 'hover:text-red-400'}`}
            >
                {menuOpen ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                )}
                <span>MENU</span>
            </button>
            <button className="hover:text-red-400 transition">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </button>
        </div>

        <div className="hidden md:flex flex-1 justify-center">
            <button onClick={onLogoClick} className="focus:outline-none">
              <img
                  src={import.meta.env.BASE_URL + 'images/logo.png'}
                  alt="Brussels Signal"
                  className="h-10"
              />
            </button>
        </div>

        <div className="flex items-center gap-4">
            <button onClick={onSignInClick} className="hover:text-red-400">SIGN IN</button>
            <button onClick={onNewslettersClick} className="border border-white px-4 py-2 hover:bg-white hover:text-[#1a2a44] transition">NEWSLETTERS</button>
            <button onClick={onBecomeMemberClick} className="bg-[#EE6260] px-4 py-2 hover:bg-red-700 transition">BECOME A MEMBER</button>
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
            <div className="hidden lg:flex gap-6 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                <span className="text-white">HOT TOPICS</span>
                <button onClick={() => handleCategoryClick('Society')} className="hover:text-white uppercase">Mass Migration</button>
                <button onClick={() => handleCategoryClick('Society')} className="hover:text-white uppercase">Free Speech</button>
                <button onClick={() => handleCategoryClick('Politics')} className="hover:text-white uppercase">Ukraine</button>
                <button onClick={() => handleCategoryClick('Politics')} className="hover:text-white uppercase">DSA Pact</button>
                <button onClick={() => handleCategoryClick('Economy')} className="hover:text-white uppercase">Tariffs</button>
                <button onClick={() => handleCategoryClick('Politics')} className="hover:text-white uppercase">News</button>
                <button onClick={() => handleCategoryClick('Commentary')} className="hover:text-white uppercase">Comments</button>
                <button onClick={() => handleCategoryClick('Politics')} className="hover:text-white uppercase">Events</button>
                <button onClick={() => handleCategoryClick('Videos')} className="hover:text-white uppercase">Videos</button>
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
        />
      )}
    </header>
  );
};

export default Header;
