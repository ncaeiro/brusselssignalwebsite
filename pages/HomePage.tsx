import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero.tsx';
import HomepageHeroStrip from '../components/HomepageHeroStrip.tsx';
import SectionGrid from '../components/SectionGrid.tsx';
import PhotoStories from '../components/PhotoStories.tsx';
import WatchSection from '../components/WatchSection.tsx';
import VideoFeed from '../components/VideoFeed.tsx';
import { NewsItem } from '../src/types.ts';
import { MOST_READ, COMMENTARY, POLITICS, ECONOMY, SOCIETY, PHOTO_STORIES, WATCH_VIDEOS, FEATURED_ARTICLE } from '../src/data.ts';
import { createSlug, createAuthorSlug } from '../src/utils.ts';

interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = () => {
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
    <main className="flex-grow container mx-auto px-4 md:px-6 lg:px-8 py-6">
      {/* Newsletter Top Banner (image only) */}
      <div className="mb-10 w-full">
        <Link to="/newsletters-grid-authors" className="w-full block">
          <img src={import.meta.env.BASE_URL + 'images/banner-newsletter-brusselscalling.jpg'} alt="Brussels Calling Newsletter" className="w-full h-auto object-cover rounded" />
        </Link>
      </div>

      {/* Main Hero & Sidebars Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Most Read */}
        <aside className="lg:col-span-3 order-2 lg:order-1">
          <h2 className="text-xl font-bold border-b-2 border-[#EE6260] pb-2 mb-4">Most Read</h2>
          <div className="space-y-6">
            {MOST_READ.map(item => (
              <Link key={item.id} to={getArticlePath(item)} className="flex gap-3 group">
                <img src={item.imageUrl} alt={item.title} className="w-24 h-16 object-cover flex-shrink-0" />
                <div>
                  <h3 className="text-sm font-semibold leading-tight text-[#111827] group-hover:text-[#1a2a44] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-[10px] text-gray-500 mt-1 uppercase font-bold">
                      <span className="text-[#EE6260]">NEWS</span> {item.date}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12">
              <h2 className="text-xl font-bold border-b-2 border-[#EE6260] pb-2 mb-4">Top Videos</h2>
              <div className="grid grid-cols-2 gap-3">
                   {WATCH_VIDEOS.slice(0, 4).map(video => (
                      <Link key={video.id} to={getArticlePath(video)} className="relative group">
                          <div className="relative h-24 overflow-hidden">
                              <img src={video.imageUrl} alt={video.title} className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300" />
                              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                                  <div className="bg-[#EE6260] rounded-full p-1.5 text-white transform transition-transform group-hover:scale-110">
                                      <svg className="w-4 h-4 block" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                                  </div>
                              </div>
                          </div>
                          <h4 className="text-xs font-bold mt-1.5 line-clamp-2 leading-tight text-[#111827]">{video.title}</h4>
                      </Link>
                   ))}
              </div>
          </div>
        </aside>

        {/* Center: Hero Story */}
        <div className="lg:col-span-6 order-1 lg:order-2">
          <Hero />
        </div>

        {/* Right: Commentary */}
        <aside className="lg:col-span-3 order-3">
          <div className="flex justify-between items-center border-b-2 border-[#EE6260] pb-2 mb-4">
            <h2 className="text-xl font-bold">Commentary</h2>
            <Link to="/category/commentary" className="text-[10px] font-bold text-gray-500 hover:text-[#EE6260]">VIEW ALL</Link>
          </div>
          <div className="space-y-6">
            {COMMENTARY.slice(0, 4).map(item => (
              <Link key={item.id} to={getArticlePath(item)} className="flex gap-3 group">
                <div>
                  {item.premium && <span className="text-[10px] bg-[#EE6260] text-white px-1 font-bold">PREMIUM</span>}
                  <p className="text-xs font-bold mt-1 uppercase">
                    <span
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        window.location.href = `/brusselssignal/website/author/${createAuthorSlug(item.author || 'Brussels Signal')}`;
                      }}
                      className="text-[#EE6260] hover:text-[#d44947] transition-colors cursor-pointer"
                    >
                      {item.author}
                    </span>
                  </p>
                  <h3 className="text-sm font-semibold leading-tight text-[#111827] group-hover:text-[#1a2a44] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-[10px] text-gray-500 mt-1 uppercase font-bold">
                      <span className="text-gray-400">COMMENTARY</span> {item.date}
                  </p>
                </div>
                <img src={item.imageUrl} alt={item.title} className="w-24 h-16 object-cover flex-shrink-0" />
              </Link>
            ))}
          </div>
          {/* Advertisement Placeholder */}
          <div className="mt-8 bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center h-[250px]">
              <span className="text-gray-400 text-sm font-medium uppercase tracking-wider">Advertisement</span>
          </div>
        </aside>
      </div>

      <HomepageHeroStrip />

      {/* Video Horizontal Section */}
      <section className="mt-12">
          <VideoFeed />
      </section>

      {/* Categories Section */}
      <section className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <SectionGrid title="Politics" items={POLITICS.slice(0, 5)} categorySlug="politics" />
          <SectionGrid title="Economy" items={ECONOMY.slice(0, 5)} categorySlug="economy" />
          <SectionGrid title="Society" items={SOCIETY.slice(0, 5)} categorySlug="society" />
      </section>

      {/* Membership Promotion Banner */}
      <Link to="/subscriptions" className="mt-12 mb-10 w-full block group">
          <div className="relative h-24 md:h-32 bg-[#1a2a44] rounded-lg overflow-hidden shadow-lg flex items-center border border-white/5">
            <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(circle_at_right,_var(--tw-gradient-stops))] from-[#EE6260] via-transparent to-transparent"></div>
            <div className="relative z-10 w-full px-6 md:px-12 flex items-center justify-between gap-4">
                <div className="flex-grow">
                    <div className="flex items-center gap-3 mb-2">
                        <span className="bg-[#EE6260] text-white px-2 py-0.5 text-[9px] font-black uppercase tracking-widest rounded-sm">MEMBERSHIP</span>
                        <span className="text-white/40 text-[9px] font-black uppercase tracking-widest hidden sm:inline">INDEPENDENT JOURNALISM</span>
                    </div>
                    <h3 className="text-white text-xl md:text-2xl lg:text-3xl font-serif font-bold leading-tight">
                        Support the signal that challenges the noise.
                    </h3>
                </div>
                <div className="flex-shrink-0">
                    <span className="bg-white text-[#1a2a44] px-6 py-3 font-black text-[10px] md:text-xs uppercase tracking-[0.15em] rounded hover:bg-[#EE6260] hover:text-white transition-all transform group-hover:scale-105 shadow-xl inline-block">
                        VIEW OFFERS
                    </span>
                </div>
            </div>
          </div>
      </Link>

      {/* Photo Stories Section */}
      <section className="mt-12">
          <PhotoStories items={MOST_READ.slice(0, 4)} />
      </section>

      {/* Watch/Podcast Section */}
      <section className="mt-12">
          <WatchSection videos={WATCH_VIDEOS.slice(0, 10)} />
      </section>

      {/* Footer Banner - Linked to Newsletters */}
      <Link to="/newsletters-grid-authors" className="mt-12 block group">
          <div className="relative overflow-hidden rounded shadow-md border border-gray-200 h-44 flex items-center bg-[#1a2a44]">
            <img
                src="https://picsum.photos/seed/newsletter_footer_full/1200/400"
                alt="Brussels Signal Newsletters"
                className="absolute inset-0 w-full h-full object-cover opacity-40 transition-transform group-hover:scale-[1.05] duration-1000"
            />
            <div className="relative z-10 w-full px-8 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="text-center md:text-left">
                    <div className="inline-block px-2 py-0.5 bg-[#EE6260] text-[10px] font-black uppercase tracking-widest text-white mb-3">Newsletter Briefing</div>
                    <h3 className="text-white text-3xl md:text-4xl font-serif font-bold mb-2">The signals you need, in your inbox.</h3>
                    <p className="text-white/70 text-base font-medium">Daily briefings and weekly strategic analysis. Join 25,000+ readers today.</p>
                </div>
                <span className="bg-white text-[#1a2a44] px-10 py-5 font-black text-xs uppercase tracking-widest rounded shadow-xl group-hover:bg-[#EE6260] group-hover:text-white transition-all transform group-hover:scale-105 inline-block">
                    EXPLORE OUR NEWSLETTERS
                </span>
            </div>
          </div>
      </Link>
    </main>
  );
};

export default HomePage;
