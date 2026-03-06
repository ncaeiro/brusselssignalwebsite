
import React from 'react';
import { Link } from 'react-router-dom';
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
  onSignInClick?: () => void;
  onEventsClick?: () => void;
  onBecomeMemberClick?: () => void;
}

const MegaMenu: React.FC<MegaMenuProps> = ({ onClose, onCategoryClick, onPodcastClick, onNewslettersClick, onAuthorsClick, onPartnerWithUsClick, onSignInClick, onEventsClick, onBecomeMemberClick }) => {
  // Get the first 6 videos from WATCH_VIDEOS (non-podcast videos)
  const menuVideos = WATCH_VIDEOS.slice(0, 6);

  // Get latest news articles - mix from different categories
  const latestNews = [
    ...POLITICS.slice(0, 4),
    ...ECONOMY.slice(0, 3),
    ...SOCIETY.slice(0, 3)
  ].slice(0, 10);

  const handleSignInNav = () => {
    onSignInClick?.();
    onClose();
  };

  const handleBecomeMemberNav = () => {
    onBecomeMemberClick?.();
    onClose();
  };

  const getArticlePath = (article: NewsItem) => {
    const slug = createSlug(article.title);

    if (article.premium) {
      return `/premium/${slug}`;
    } else if (article.podcastSeries) {
      return `/podcast/${slug}`;
    } else if (article.category?.toLowerCase() === 'videos' || ('duration' in article)) {
      return `/video/${slug}`;
    } else {
      return `/article/${slug}`;
    }
  };

  return (
    <div className="absolute top-full left-0 w-full bg-[#121c2d]/95 backdrop-blur-md border-t border-white/10 text-white shadow-2xl z-50 overflow-y-auto max-h-[90vh] animate-fadeIn">
      <div className="container mx-auto px-4 lg:px-8 py-10">
        
        {/* Top Grid: Categories, Authors & Other */}
        <div className="flex flex-wrap lg:flex-nowrap gap-8 mb-3">
          
          {/* Categories Section (Left side) */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 flex-grow">
            {/* Politics */}
            <div>
              <Link to="/category/politics" onClick={onClose} className="text-[#EE6260] font-black text-sm mb-6 tracking-wider uppercase hover:underline block">POLITICS</Link>
              <ul className="text-[13px] space-y-3 font-normal text-gray-200">
                <li><Link to="/category/politics/tag/eu-bubble" onClick={onClose} className="hover:text-[#FFEAD5] transition-colors">EU Bubble</Link></li>
                <li><Link to="/category/politics/tag/from-the-capitals" onClick={onClose} className="hover:text-[#FFEAD5] transition-colors">From the capitals</Link></li>
                <li><Link to="/category/politics/tag/elections" onClick={onClose} className="hover:text-[#FFEAD5] transition-colors">Elections</Link></li>
                <li><Link to="/category/politics/tag/corruption" onClick={onClose} className="hover:text-[#FFEAD5] transition-colors">Corruption</Link></li>
                <li><Link to="/category/politics/tag/bureaucracy" onClick={onClose} className="hover:text-[#FFEAD5] transition-colors">Bureaucracy</Link></li>
              </ul>
            </div>

            {/* Economy */}
            <div>
              <Link to="/category/economy" onClick={onClose} className="text-[#EE6260] font-black text-sm mb-6 tracking-wider uppercase hover:underline block">ECONOMY</Link>
              <ul className="text-[13px] space-y-3 font-normal text-gray-200">
                <li><Link to="/category/economy/tag/finance" onClick={onClose} className="hover:text-[#FFEAD5] transition-colors">Finance</Link></li>
                <li><Link to="/category/economy/tag/tech" onClick={onClose} className="hover:text-[#FFEAD5] transition-colors">Tech</Link></li>
                <li><Link to="/category/economy/tag/energy-climate" onClick={onClose} className="hover:text-[#FFEAD5] transition-colors">Energy & Climate</Link></li>
                <li><Link to="/category/economy/tag/trade" onClick={onClose} className="hover:text-[#FFEAD5] transition-colors">Trade</Link></li>
                <li><Link to="/category/economy/tag/industrial-policy" onClick={onClose} className="hover:text-[#FFEAD5] transition-colors">Industrial policy</Link></li>
              </ul>
            </div>

            {/* Society */}
            <div>
              <Link to="/category/society" onClick={onClose} className="text-[#EE6260] font-black text-sm mb-6 tracking-wider uppercase hover:underline block">SOCIETY</Link>
              <ul className="text-[13px] space-y-3 font-normal text-gray-200">
                <li><Link to="/category/society/tag/free-speech" onClick={onClose} className="hover:text-[#FFEAD5] transition-colors">Free speech</Link></li>
                <li><Link to="/category/society/tag/migration" onClick={onClose} className="hover:text-[#FFEAD5] transition-colors">Migration</Link></li>
                <li><Link to="/category/society/tag/culture-war" onClick={onClose} className="hover:text-[#FFEAD5] transition-colors">Culture War</Link></li>
                <li><Link to="/category/society/tag/consumer-rights" onClick={onClose} className="hover:text-[#FFEAD5] transition-colors">Consumer rights</Link></li>
                <li><Link to="/category/society/tag/democracy" onClick={onClose} className="hover:text-[#FFEAD5] transition-colors">Democracy</Link></li>
                <li><Link to="/category/society/tag/living-in-brussels" onClick={onClose} className="hover:text-[#FFEAD5] transition-colors">Living in Brussels</Link></li>
              </ul>
            </div>

            {/* World */}
            <div>
              <Link to="/category/world" onClick={onClose} className="text-[#EE6260] font-black text-sm mb-6 tracking-wider uppercase hover:underline block">WORLD</Link>
              <ul className="text-[13px] space-y-3 font-normal text-gray-200">
                <li><Link to="/category/world/tag/war" onClick={onClose} className="hover:text-[#FFEAD5] transition-colors">War</Link></li>
                <li><Link to="/category/world/tag/us" onClick={onClose} className="hover:text-[#FFEAD5] transition-colors">US</Link></li>
                <li><Link to="/category/world/tag/china" onClick={onClose} className="hover:text-[#FFEAD5] transition-colors">China</Link></li>
                <li><Link to="/category/world/tag/international-institutions" onClick={onClose} className="hover:text-[#FFEAD5] transition-colors">International institutions</Link></li>
                <li><Link to="/category/world/tag/rest-of-the-world" onClick={onClose} className="hover:text-[#FFEAD5] transition-colors">Rest of the world</Link></li>
              </ul>
            </div>

            {/* Opinion */}
            <div>
              <Link to="/category/commentary" onClick={onClose} className="text-[#EE6260] font-black text-sm mb-6 tracking-wider uppercase hover:underline block">OPINION</Link>
              <ul className="text-[13px] space-y-3 font-normal text-gray-200">
                <li><Link to="/category/commentary/tag/columns" onClick={onClose} className="hover:text-[#FFEAD5] transition-colors">Columns</Link></li>
                <li><Link to="/category/commentary/tag/guest-analysis" onClick={onClose} className="hover:text-[#FFEAD5] transition-colors">Guest Analysis</Link></li>
                <li><Link to="/category/commentary/tag/meps-views" onClick={onClose} className="hover:text-[#FFEAD5] transition-colors">MEPs views</Link></li>
                <li><Link to="/category/commentary/tag/polls-and-surveys" onClick={onClose} className="hover:text-[#FFEAD5] transition-colors">Polls and Surveys</Link></li>
              </ul>
            </div>
          </div>

          {/* Vertical Divider */}
          <div className="hidden lg:block w-px bg-white/10 self-stretch"></div>

          {/* Authors Column */}
          <div className="w-full lg:w-64">
            <Link to="/authors" onClick={onClose} className="text-gray-300 font-black text-sm mb-6 tracking-wider uppercase hover:text-[#EE6260] transition-colors block">AUTHORS</Link>
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
                const slug = createAuthorSlug(authorName);

                return (
                  <Link
                    key={i}
                    to={`/author/${slug}`}
                    onClick={onClose}
                    className="flex items-center gap-3 group"
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
                  </Link>
                );
              })}
            </div>
          </div>

          {/* More Column */}
          <div className="w-full lg:w-32">
            <h3 className="text-gray-300 font-black text-sm mb-6 tracking-wider uppercase">MORE</h3>
            <ul className="text-[13px] space-y-3 font-normal text-gray-200">
              <li><button onClick={handleSignInNav} className="hover:text-[#FFEAD5] transition-colors text-left">Sign In</button></li>
              <li><Link to="/category/videos-filtered" onClick={onClose} className="hover:text-[#FFEAD5] transition-colors">Videos</Link></li>
              <li><Link to="/events" onClick={onClose} className="hover:text-[#FFEAD5] transition-colors">Events</Link></li>
              <li><button onClick={handleBecomeMemberNav} className="hover:text-[#FFEAD5] transition-colors text-left">Become a Member</button></li>
              <li><Link to="/about" onClick={onClose} className="hover:text-[#FFEAD5] transition-colors">About Us</Link></li>
              <li><Link to="/partner-with-us" onClick={onClose} className="hover:text-[#FFEAD5] transition-colors">Partner with Us</Link></li>
            </ul>
          </div>
        </div>

        {/* Spotlight Bar */}
        <div className="bg-[#1a2a44]/80 p-3 rounded flex flex-wrap items-center gap-4 mb-6 border border-white/5">
          <span className="bg-white text-black px-2 py-0.5 text-[10px] font-black uppercase rounded-sm">HOT TOPICS</span>
          <span className="text-[10px] text-gray-300 font-bold uppercase tracking-tight">WHAT'S DRIVING GLOBAL CONVERSATIONS.</span>
          <div className="flex flex-wrap gap-4 ml-2">
            {[
              { tag: '#FrenchConfidenceVote', category: 'politics' },
              { tag: '#FarageDeportationPlan', category: 'politics' },
              { tag: '#UKImmigrationProtests', category: 'society' },
              { tag: '#UkraineDefenseAid', category: 'politics' },
              { tag: '#EUUSTradeTensions', category: 'economy' }
            ].map(({ tag, category }) => (
              <Link
                key={tag}
                to={`/category/${category}/tag/${encodeURIComponent(tag.replace('#', ''))}`}
                onClick={onClose}
                className="text-[11px] font-bold text-gray-200 hover:text-[#EE6260] transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom Section: Videos & Podcasts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Left: Videos */}
          <div>
            <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-8">
                <h2 className="text-xl font-black tracking-widest uppercase">VIDEOS</h2>
                <Link to="/category/videos-filtered" onClick={onClose} className="text-[10px] font-black hover:text-[#EE6260]">VIEW ALL</Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {menuVideos.map((vid) => (
                <Link key={vid.id} to={getArticlePath(vid)} onClick={onClose} className="group">
                  <div className="aspect-video relative overflow-hidden rounded mb-3 shadow-lg">
                    <img src={vid.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={vid.title} />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors flex items-center justify-center">
                      <div className="bg-white/90 rounded-full p-2 transform transition-transform group-hover:scale-110">
                        <svg className="w-5 h-5 text-[#EE6260] block" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                      </div>
                    </div>
                  </div>
                  <p className="text-[9px] font-bold uppercase leading-tight"><span className="text-[#EE6260]">Video</span></p>
                  <p className="text-[9px] text-gray-400 font-bold uppercase mb-1">{vid.date}</p>
                  <h4 className="text-[11px] font-bold leading-tight group-hover:text-[#FFEAD5] transition-colors">{vid.title}</h4>
                </Link>
              ))}
            </div>
          </div>

          {/* Right: Latest News */}
          <div>
            <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-8">
                <h2 className="text-xl font-black tracking-widest uppercase">LATEST NEWS</h2>
                <Link to="/category/news" onClick={onClose} className="text-[10px] font-black hover:text-[#EE6260]">VIEW ALL</Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-x-4 gap-y-3">
              {latestNews.slice(0, 10).map((article) => (
                <Link key={article.id} to={getArticlePath(article)} onClick={onClose} className="group">
                  <div className="aspect-[16/10] relative overflow-hidden rounded mb-1.5 shadow-lg">
                    <img src={article.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={article.title} />
                  </div>
                  <p className="text-[9px] font-bold uppercase leading-tight"><span className="text-[#EE6260]">{article.category}</span></p>
                  <p className="text-[9px] text-gray-400 font-bold uppercase mb-1">{article.date}</p>
                  <h4 className="text-[11px] font-bold leading-tight group-hover:text-[#FFEAD5] transition-colors line-clamp-2">{article.title}</h4>
                </Link>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default MegaMenu;
