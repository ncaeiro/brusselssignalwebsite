
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { NewsItem } from '../src/types.ts';
import { createSlug, createAuthorSlug, getAuthorPhoto } from '../src/utils.ts';
import { WATCH_VIDEOS, INTERFERENCE_PODCASTS, HORIZON_PODCASTS, ALL_ARTICLES, POLITICS, ECONOMY, SOCIETY } from '../src/data.ts';

interface MegaMenuProps {
  onClose: () => void;
  onCategoryClick?: (category: string) => void;
  onPodcastClick?: (article: NewsItem) => void;
  onNewslettersClick?: () => void;
  onAuthorsClick?: () => void;
  onPartnerWithUsClick?: () => void;
}

const MegaMenu: React.FC<MegaMenuProps> = ({ onClose, onCategoryClick, onPodcastClick, onNewslettersClick, onAuthorsClick, onPartnerWithUsClick }) => {
  const navigate = useNavigate();

  // Get the MegaMenu videos (vm1-vm6) from WATCH_VIDEOS
  const menuVideos = WATCH_VIDEOS.filter(v => v.id.startsWith('vm'));

  // Get latest news articles - mix from different categories
  const latestNews = [
    ...POLITICS.slice(0, 2),
    ...ECONOMY.slice(0, 2),
    ...SOCIETY.slice(0, 2)
  ].slice(0, 6);

  const handleNewsletterNav = () => {
    onNewslettersClick?.();
    onClose();
  };

  const handleAuthorsNav = () => {
    onAuthorsClick?.();
    onClose();
  };

  const handlePartnerWithUsNav = () => {
    onPartnerWithUsClick?.();
    onClose();
  };

  return (
    <div className="absolute top-full left-0 w-full bg-[#121c2d]/95 backdrop-blur-md border-t border-white/10 text-white shadow-2xl z-50 overflow-y-auto max-h-[90vh] animate-fadeIn">
      <div className="container mx-auto px-4 lg:px-8 py-10">
        
        {/* Top Grid: Categories, Authors & Other */}
        <div className="flex flex-wrap lg:flex-nowrap gap-8 mb-12">
          
          {/* Categories Section (Left side) */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 flex-grow">
            {/* Politics */}
            <div>
              <button onClick={() => onCategoryClick?.('Politics')} className="text-[#EE6260] font-black text-sm mb-6 tracking-wider uppercase hover:underline">POLITICS</button>
              <ul className="text-[13px] space-y-3 font-normal text-gray-200">
                <li><button onClick={() => onCategoryClick?.('Politics')} className="hover:text-[#FFEAD5] transition-colors text-left">EU Bubble</button></li>
                <li><button onClick={() => onCategoryClick?.('Politics')} className="hover:text-[#FFEAD5] transition-colors text-left">From the capitals</button></li>
                <li><button onClick={() => onCategoryClick?.('Politics')} className="hover:text-[#FFEAD5] transition-colors text-left">Elections</button></li>
                <li><button onClick={() => onCategoryClick?.('Politics')} className="hover:text-[#FFEAD5] transition-colors text-left">Corruption</button></li>
                <li><button onClick={() => onCategoryClick?.('Politics')} className="hover:text-[#FFEAD5] transition-colors text-left">Bureaucracy</button></li>
              </ul>
            </div>
            
            {/* Economy */}
            <div>
              <button onClick={() => onCategoryClick?.('Economy')} className="text-[#EE6260] font-black text-sm mb-6 tracking-wider uppercase hover:underline">ECONOMY</button>
              <ul className="text-[13px] space-y-3 font-normal text-gray-200">
                <li><button onClick={() => onCategoryClick?.('Economy')} className="hover:text-[#FFEAD5] transition-colors text-left">Finance</button></li>
                <li><button onClick={() => onCategoryClick?.('Economy')} className="hover:text-[#FFEAD5] transition-colors text-left">Tech</button></li>
                <li><button onClick={() => onCategoryClick?.('Economy')} className="hover:text-[#FFEAD5] transition-colors text-left">Energy & Climate</button></li>
                <li><button onClick={() => onCategoryClick?.('Economy')} className="hover:text-[#FFEAD5] transition-colors text-left">Trade</button></li>
                <li><button onClick={() => onCategoryClick?.('Economy')} className="hover:text-[#FFEAD5] transition-colors text-left">Industrial policy</button></li>
              </ul>
            </div>

            {/* Society */}
            <div>
              <button onClick={() => onCategoryClick?.('Society')} className="text-[#EE6260] font-black text-sm mb-6 tracking-wider uppercase hover:underline">SOCIETY</button>
              <ul className="text-[13px] space-y-3 font-normal text-gray-200">
                <li><button onClick={() => onCategoryClick?.('Society')} className="hover:text-[#FFEAD5] transition-colors text-left">Free speech</button></li>
                <li><button onClick={() => onCategoryClick?.('Society')} className="hover:text-[#FFEAD5] transition-colors text-left">Migration</button></li>
                <li><button onClick={() => onCategoryClick?.('Society')} className="hover:text-[#FFEAD5] transition-colors text-left">Culture War</button></li>
                <li><button onClick={() => onCategoryClick?.('Society')} className="hover:text-[#FFEAD5] transition-colors text-left">Consumer rights</button></li>
                <li><button onClick={() => onCategoryClick?.('Society')} className="hover:text-[#FFEAD5] transition-colors text-left">Democracy</button></li>
                <li><button onClick={() => onCategoryClick?.('Society')} className="hover:text-[#FFEAD5] transition-colors text-left">Living in Brussels</button></li>
              </ul>
            </div>

            {/* World */}
            <div>
              <button onClick={() => onCategoryClick?.('Politics')} className="text-[#EE6260] font-black text-sm mb-6 tracking-wider uppercase hover:underline">WORLD</button>
              <ul className="text-[13px] space-y-3 font-normal text-gray-200">
                <li><button onClick={() => onCategoryClick?.('Politics')} className="hover:text-[#FFEAD5] transition-colors text-left">War</button></li>
                <li><button onClick={() => onCategoryClick?.('Politics')} className="hover:text-[#FFEAD5] transition-colors text-left">US</button></li>
                <li><button onClick={() => onCategoryClick?.('Politics')} className="hover:text-[#FFEAD5] transition-colors text-left">China</button></li>
                <li><button onClick={() => onCategoryClick?.('Politics')} className="hover:text-[#FFEAD5] transition-colors text-left">International institutions</button></li>
                <li><button onClick={() => onCategoryClick?.('Politics')} className="hover:text-[#FFEAD5] transition-colors text-left">Rest of the world</button></li>
              </ul>
            </div>

            {/* Opinion */}
            <div>
              <button onClick={() => onCategoryClick?.('Commentary')} className="text-[#EE6260] font-black text-sm mb-6 tracking-wider uppercase hover:underline">OPINION</button>
              <ul className="text-[13px] space-y-3 font-normal text-gray-200">
                <li><button onClick={() => onCategoryClick?.('Commentary')} className="hover:text-[#FFEAD5] transition-colors text-left">Columns</button></li>
                <li><button onClick={() => onCategoryClick?.('Commentary')} className="hover:text-[#FFEAD5] transition-colors text-left">Guest Analysis</button></li>
                <li><button onClick={() => onCategoryClick?.('Commentary')} className="hover:text-[#FFEAD5] transition-colors text-left">MEPs views</button></li>
                <li><button onClick={() => onCategoryClick?.('Commentary')} className="hover:text-[#FFEAD5] transition-colors text-left">Polls and Surveys</button></li>
              </ul>
            </div>
          </div>

          {/* Vertical Divider */}
          <div className="hidden lg:block w-px bg-white/10 self-stretch"></div>

          {/* Authors Column */}
          <div className="w-full lg:w-64">
            <button onClick={handleAuthorsNav} className="text-gray-300 font-black text-sm mb-6 tracking-wider uppercase hover:text-[#EE6260] transition-colors">AUTHORS</button>
            <div className="space-y-4">
              {[
                'Krzysztof Mularczyk',
                'Carl Deconinck',
                'Claire Lemaire',
                'Chris Gattringer',
                'Chris Nelson'
              ].map((authorName, i) => {
                const authorPhoto = getAuthorPhoto(authorName);
                const articleCount = ALL_ARTICLES.filter(
                  article => article.author?.toLowerCase() === authorName.toLowerCase()
                ).length;

                return (
                  <div
                    key={i}
                    onClick={() => {
                      const slug = createAuthorSlug(authorName);
                      navigate(`/author/${slug}`);
                      onClose();
                      window.scrollTo(0, 0);
                    }}
                    className="flex items-center gap-3 group cursor-pointer"
                  >
                    {authorPhoto ? (
                      <img
                        src={authorPhoto}
                        className="w-8 h-8 rounded-full border border-white/20 group-hover:border-red-500 transition-colors object-cover"
                        alt={authorName}
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full border border-white/20 group-hover:border-red-500 transition-colors bg-gray-600 flex items-center justify-center text-white text-xs font-bold">
                        {authorName.charAt(0)}
                      </div>
                    )}
                    <div>
                      <p className="text-[11px] font-bold leading-none group-hover:text-[#EE6260] transition-colors">{authorName}</p>
                      <p className="text-[9px] text-gray-500 mt-0.5">
                        {articleCount} {articleCount === 1 ? 'article' : 'articles'}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* More Column */}
          <div className="w-full lg:w-32">
            <h3 className="text-gray-300 font-black text-sm mb-6 tracking-wider uppercase">MORE</h3>
            <ul className="text-[13px] space-y-3 font-normal text-gray-200">
              <li><button className="hover:text-[#FFEAD5] transition-colors text-left">Sign In</button></li>
              <li><button onClick={() => onCategoryClick?.('Videos')} className="hover:text-[#FFEAD5] transition-colors text-left">Videos</button></li>
              <li><button onClick={() => onCategoryClick?.('Politics')} className="hover:text-[#FFEAD5] transition-colors text-left">Events</button></li>
              <li><button className="hover:text-[#FFEAD5] transition-colors text-left">Become a Member</button></li>
              <li><button className="hover:text-[#FFEAD5] transition-colors text-left">About Us</button></li>
              <li><button onClick={handlePartnerWithUsNav} className="hover:text-[#FFEAD5] transition-colors text-left">Partner with Us</button></li>
            </ul>
          </div>
        </div>

        {/* Spotlight Bar */}
        <div className="bg-[#1a2a44]/80 p-3 rounded flex flex-wrap items-center gap-4 mb-12 border border-white/5">
          <span className="bg-white text-black px-2 py-0.5 text-[10px] font-black uppercase rounded-sm">HOT TOPICS</span>
          <span className="text-[10px] text-gray-300 font-bold uppercase tracking-tight">WHAT'S DRIVING GLOBAL CONVERSATIONS.</span>
          <div className="flex flex-wrap gap-4 ml-2">
            {['#FrenchConfidenceVote', '#FarageDeportationPlan', '#UKImmigrationProtests', '#UkraineDefenseAid', '#EUUSTradeTensions'].map(tag => (
              <a key={tag} href="#" className="text-[11px] font-bold text-gray-200 hover:text-[#EE6260] transition-colors">{tag}</a>
            ))}
          </div>
        </div>

        {/* Bottom Section: Videos & Podcasts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Left: Videos */}
          <div>
            <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-8">
                <h2 className="text-xl font-black tracking-widest uppercase">VIDEOS</h2>
                <button onClick={() => onCategoryClick?.('Videos')} className="text-[10px] font-black hover:text-[#EE6260]">VIEW ALL</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {menuVideos.map((vid) => (
                <div key={vid.id} className="group cursor-pointer" onClick={() => {
                  const slug = createSlug(vid.title);
                  navigate(`/video/${slug}`);
                  window.scrollTo(0, 0);
                  onClose();
                }}>
                  <div className="aspect-video relative overflow-hidden rounded mb-3 shadow-lg">
                    <img src={vid.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={vid.title} />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors flex items-center justify-center">
                      <div className="bg-white/90 rounded-full p-2 transform transition-transform group-hover:scale-110">
                        <svg className="w-5 h-5 text-[#EE6260] block" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                      </div>
                    </div>
                  </div>
                  <p className="text-[9px] font-bold mb-1 uppercase"><span className="text-[#EE6260]">Video</span> <span className="text-gray-400">{vid.date}</span></p>
                  <h4 className="text-[11px] font-bold leading-tight group-hover:text-[#FFEAD5] transition-colors">{vid.title}</h4>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Latest News */}
          <div>
            <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-8">
                <h2 className="text-xl font-black tracking-widest uppercase">LATEST NEWS</h2>
                <button onClick={() => onCategoryClick?.('News')} className="text-[10px] font-black hover:text-[#EE6260]">VIEW ALL</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {latestNews.map((article) => (
                <div key={article.id} className="group cursor-pointer" onClick={() => {
                  const slug = createSlug(article.title);
                  navigate(`/article/${slug}`);
                  window.scrollTo(0, 0);
                  onClose();
                }}>
                  <div className="aspect-video relative overflow-hidden rounded mb-3 shadow-lg">
                    <img src={article.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={article.title} />
                  </div>
                  <p className="text-[9px] font-bold mb-1 uppercase"><span className="text-[#EE6260]">{article.category}</span> <span className="text-gray-400">{article.date}</span></p>
                  <h4 className="text-[11px] font-bold leading-tight group-hover:text-[#FFEAD5] transition-colors">{article.title}</h4>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default MegaMenu;
