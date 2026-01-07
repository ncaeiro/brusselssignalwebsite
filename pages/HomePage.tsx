import React from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from '../components/Hero.tsx';
import SectionGrid from '../components/SectionGrid.tsx';
import PhotoStories from '../components/PhotoStories.tsx';
import WatchSection from '../components/WatchSection.tsx';
import VideoFeed from '../components/VideoFeed.tsx';
import { NewsItem } from '../src/types.ts';
import { MOST_READ, COMMENTARY, POLITICS, ECONOMY, SOCIETY, PHOTO_STORIES, WATCH_VIDEOS, FEATURED_ARTICLE } from '../src/data.ts';
import { createSlug, createAuthorSlug } from '../src/utils.ts';

interface HomePageProps {
  onNewslettersClick: () => void;
  onSubscriptionsClick: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNewslettersClick, onSubscriptionsClick }) => {
  const navigate = useNavigate();

  const navigateToArticle = (article: NewsItem) => {
    console.log('navigateToArticle called with:', article);
    const slug = createSlug(article.title);
    console.log('Generated slug:', slug);
    console.log('Article category:', article.category);

    if (article.premium) {
      console.log('Navigating to premium');
      navigate(`/premium/${slug}`);
    } else if (article.podcastSeries) {
      console.log('Navigating to podcast');
      navigate(`/podcast/${slug}`);
    } else if (article.category?.toLowerCase() === 'videos' || ('duration' in article)) {
      console.log('Navigating to video');
      navigate(`/video/${slug}`);
    } else {
      console.log('Navigating to article');
      navigate(`/article/${slug}`);
    }
    window.scrollTo(0, 0);
  };

  const navigateToAuthor = (authorName: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const authorSlug = createAuthorSlug(authorName);
    navigate(`/author/${authorSlug}`);
    window.scrollTo(0, 0);
  };

  return (
    <main className="flex-grow container mx-auto px-4 md:px-6 lg:px-8 py-6">
      {/* Newsletter Top Banner (image only) */}
      <div className="mb-10 w-full">
        <button onClick={onNewslettersClick} className="w-full focus:outline-none">
          <img src={import.meta.env.BASE_URL + 'images/banner-newsletter-brusselscalling.jpg'} alt="Brussels Calling Newsletter" className="w-full h-auto object-cover rounded" />
        </button>
      </div>

      {/* Main Hero & Sidebars Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Most Read */}
        <aside className="lg:col-span-3 order-2 lg:order-1">
          <h2 className="text-xl font-bold border-b-2 border-red-600 pb-2 mb-4">Most Read</h2>
          <div className="space-y-6">
            {MOST_READ.map(item => (
              <div key={item.id} className="flex gap-3 group cursor-pointer" onClick={() => navigateToArticle(item)}>
                <img src={item.imageUrl} alt={item.title} className="w-24 h-16 object-cover flex-shrink-0" />
                <div>
                  <h3 className="text-sm font-semibold leading-tight text-[#111827] group-hover:text-[#1a2a44] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-[10px] text-gray-500 mt-1 uppercase font-bold">
                      <span className="text-red-600">NEWS</span> {item.date}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12">
              <h2 className="text-xl font-bold border-b-2 border-red-600 pb-2 mb-4">Top Videos</h2>
              <div className="grid grid-cols-2 gap-3">
                   {WATCH_VIDEOS.slice(0, 4).map(video => (
                      <div key={video.id} className="relative group cursor-pointer" onClick={() => navigateToArticle(video)}>
                          <div className="relative h-24 overflow-hidden">
                              <img src={video.imageUrl} alt={video.title} className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300" />
                              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                                  <div className="bg-red-600 rounded-full p-1.5 text-white transform transition-transform group-hover:scale-110">
                                      <svg className="w-4 h-4 block" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                                  </div>
                              </div>
                          </div>
                          <h4 className="text-xs font-bold mt-1.5 line-clamp-2 leading-tight text-[#111827]">{video.title}</h4>
                      </div>
                   ))}
              </div>
          </div>
        </aside>

        {/* Center: Hero Story */}
        <div className="lg:col-span-6 order-1 lg:order-2">
          <Hero onClick={() => navigateToArticle(FEATURED_ARTICLE)} />
        </div>

        {/* Right: Commentary */}
        <aside className="lg:col-span-3 order-3">
          <div className="flex justify-between items-center border-b-2 border-red-600 pb-2 mb-4">
            <h2 className="text-xl font-bold">Commentary</h2>
            <button onClick={() => { navigate('/category/commentary'); window.scrollTo(0, 0); }} className="text-[10px] font-bold text-gray-500 hover:text-red-600">VIEW ALL</button>
          </div>
          <div className="space-y-6">
            {COMMENTARY.slice(0, 5).map(item => (
              <div key={item.id} className="flex gap-3 group cursor-pointer" onClick={() => navigateToArticle(item)}>
                <div className="flex-grow">
                  {item.premium && <span className="text-[10px] bg-red-600 text-white px-1 font-bold">PREMIUM</span>}
                  <p className="text-xs font-bold mt-1 uppercase">
                    <button
                      onClick={(e) => navigateToAuthor(item.author || 'Brussels Signal', e)}
                      className="text-red-600 hover:text-red-700 transition-colors underline decoration-transparent hover:decoration-red-700"
                    >
                      {item.author}
                    </button>
                  </p>
                  <h3 className="text-sm font-semibold leading-tight text-[#111827] group-hover:text-[#1a2a44] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-[10px] text-gray-500 mt-1 uppercase font-bold">
                      <span className="text-gray-400">COMMENTARY</span> {item.date}
                  </p>
                </div>
                <img src={item.imageUrl} alt={item.title} className="w-24 h-16 object-cover flex-shrink-0" />
              </div>
            ))}
          </div>
          {/* Newsletter Side Box */}
          <div className="mt-8 bg-gray-100 p-4 border border-gray-200">
              <h3 className="font-bold text-lg mb-2">Brussels Calling</h3>
              <p className="text-xs text-gray-600 mb-4">The must-read morning briefing for anyone interested in European politics.</p>
              <button onClick={onNewslettersClick} className="w-full bg-red-600 text-white py-2 text-sm font-bold hover:bg-red-700 transition">SUBSCRIBE NOW</button>
          </div>
        </aside>
      </div>

      {/* Membership Top Promotion Banner (moved) */}
      <div className="mt-12 mb-10 w-full cursor-pointer group" onClick={onSubscriptionsClick}>
          <div className="relative h-24 md:h-32 bg-[#1a2a44] rounded-lg overflow-hidden shadow-lg flex items-center border border-white/5">
            <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(circle_at_right,_var(--tw-gradient-stops))] from-red-600 via-transparent to-transparent"></div>
            <div className="relative z-10 w-full px-6 md:px-12 flex items-center justify-between gap-4">
                <div className="flex-grow">
                    <div className="flex items-center gap-3 mb-2">
                        <span className="bg-red-600 text-white px-2 py-0.5 text-[9px] font-black uppercase tracking-widest rounded-sm">MEMBERSHIP</span>
                        <span className="text-white/40 text-[9px] font-black uppercase tracking-widest hidden sm:inline">INDEPENDENT JOURNALISM</span>
                    </div>
                    <h3 className="text-white text-xl md:text-2xl lg:text-3xl font-serif font-bold leading-tight">
                        Support the signal that challenges the noise.
                    </h3>
                </div>
                <div className="flex-shrink-0">
                    <button className="bg-white text-[#1a2a44] px-6 py-3 font-black text-[10px] md:text-xs uppercase tracking-[0.15em] rounded hover:bg-red-600 hover:text-white transition-all transform group-hover:scale-105 shadow-xl">
                        VIEW OFFERS
                    </button>
                </div>
            </div>
          </div>
      </div>

      {/* Video Horizontal Section */}
      <section className="mt-12">
          <VideoFeed onItemClick={navigateToArticle} />
      </section>

      {/* Categories Section */}
      <section className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <SectionGrid title="Politics" items={POLITICS.slice(0, 5)} onItemClick={navigateToArticle} onHeaderClick={() => { navigate('/category/politics'); window.scrollTo(0, 0); }} />
          <SectionGrid title="Economy" items={ECONOMY.slice(0, 5)} onItemClick={navigateToArticle} onHeaderClick={() => { navigate('/category/economy'); window.scrollTo(0, 0); }} />
          <SectionGrid title="Society" items={SOCIETY.slice(0, 5)} onItemClick={navigateToArticle} onHeaderClick={() => { navigate('/category/society'); window.scrollTo(0, 0); }} />
      </section>

      {/* Photo Stories Section */}
      <section className="mt-12">
          <PhotoStories items={MOST_READ.slice(0, 4)} onItemClick={navigateToArticle} onHeaderClick={() => { navigate('/category/photo-stories'); window.scrollTo(0, 0); }} />
      </section>

      {/* Watch/Podcast Section */}
      <section className="mt-12">
          <WatchSection videos={WATCH_VIDEOS.slice(0, 10)} onItemClick={navigateToArticle} onHeaderClick={() => { navigate('/category/videos'); window.scrollTo(0, 0); }} />
      </section>

      {/* Footer Banner - Linked to Newsletters */}
      <div className="mt-12 cursor-pointer group" onClick={onNewslettersClick}>
          <div className="relative overflow-hidden rounded shadow-md border border-gray-200 h-44 flex items-center bg-[#1a2a44]">
            <img
                src="https://picsum.photos/seed/newsletter_footer_full/1200/400"
                alt="Brussels Signal Newsletters"
                className="absolute inset-0 w-full h-full object-cover opacity-40 transition-transform group-hover:scale-[1.05] duration-1000"
            />
            <div className="relative z-10 w-full px-8 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="text-center md:text-left">
                    <div className="inline-block px-2 py-0.5 bg-red-600 text-[10px] font-black uppercase tracking-widest text-white mb-3">Newsletter Briefing</div>
                    <h3 className="text-white text-3xl md:text-4xl font-serif font-bold mb-2">The signals you need, in your inbox.</h3>
                    <p className="text-white/70 text-base font-medium">Daily briefings and weekly strategic analysis. Join 25,000+ readers today.</p>
                </div>
                <button className="bg-white text-[#1a2a44] px-10 py-5 font-black text-xs uppercase tracking-widest rounded shadow-xl group-hover:bg-red-600 group-hover:text-white transition-all transform group-hover:scale-105">
                    EXPLORE OUR NEWSLETTERS
                </button>
            </div>
          </div>
      </div>
    </main>
  );
};

export default HomePage;
