import React from 'react';
import { Link } from 'react-router-dom';
import { NewsItem } from '../src/types.ts';
import { createSlug } from '../src/utils.ts';

interface PodcastShowPageProps {
  showName: string;
  showSlug: string;
  hosts: string;
  description: string;
  episodes: NewsItem[];
  colorClass: string;
  bgClass: string;
  logo: string;
}

const PodcastShowPage: React.FC<PodcastShowPageProps> = ({
  showName,
  showSlug,
  hosts,
  description,
  episodes,
  colorClass,
  bgClass,
  logo,
}) => {
  const getArticlePath = (episode: NewsItem) => {
    const slug = createSlug(episode.title);
    if (episode.premium) {
      return `/premium/${slug}`;
    } else if (episode.podcastSeries) {
      return `/podcast/${slug}`;
    } else if (episode.category?.toLowerCase() === 'videos' || ('duration' in episode)) {
      return `/video/${slug}`;
    } else {
      return `/article/${slug}`;
    }
  };

  return (
    <main className="flex-grow bg-white">
      {/* Breadcrumbs */}
      <section className="bg-gray-50 border-b border-gray-200 py-4">
        <div className="container mx-auto px-4 lg:px-8">
          <nav className="flex items-center gap-2 text-sm">
            <Link
              to="/"
              className="text-gray-600 hover:text-[#EE6260] font-bold uppercase tracking-wide transition-colors"
            >
              Home
            </Link>
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
            <Link
              to="/category/videos-filtered"
              className="text-gray-600 hover:text-[#EE6260] font-bold uppercase tracking-wide transition-colors"
            >
              Videos & Podcasts
            </Link>
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-[#EE6260] font-bold uppercase tracking-wide">
              {showName}
            </span>
          </nav>
        </div>
      </section>

      {/* Podcast Show Header */}
      {showSlug === 'interference' ? (
        /* Redesigned Interference Podcast Header */
        <section className="bg-[#eb6761] relative overflow-hidden">
          <div
            className="container mx-auto px-4 lg:px-8 bg-contain bg-right bg-no-repeat"
            style={{ backgroundImage: `url(${import.meta.env.BASE_URL}images/interference-podcast-page-header-bg.jpg)` }}
          >
            <div className="py-5 lg:py-7">
              {/* Left Content */}
              <div className="max-w-xl">
                <img
                  src={import.meta.env.BASE_URL + logo}
                  alt="Interference"
                  className="h-12 md:h-14 lg:h-10 object-contain mb-2"
                />
                <p className="text-white/90 text-base md:text-lg font-bold uppercase tracking-widest mt-1 mb-2">
                  PODCAST
                </p>
                <p className="text-white/80 text-sm md:text-base italic leading-relaxed mb-4 max-w-lg">
                  "{description}"
                </p>
                <div className="flex items-center gap-5">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full border-2 border-white/30 flex items-center justify-center">
                      <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-[8px] text-white/60 font-black uppercase tracking-widest leading-none">HOSTED BY</p>
                      <p className="text-xs text-white font-bold">{hosts}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full border-2 border-white/30 flex items-center justify-center">
                      <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-[8px] text-white/60 font-black uppercase tracking-widest leading-none">EPISODES</p>
                      <p className="text-xs text-white font-bold">{episodes.length} Total</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : showSlug === 'horizon-podcast' ? (
        /* Redesigned Horizon Podcast Header */
        <section className="bg-[#1a2a44] relative overflow-hidden">
          <div
            className="container mx-auto px-4 lg:px-8 bg-contain bg-right bg-no-repeat"
            style={{ backgroundImage: `url(${import.meta.env.BASE_URL}images/horizon-podcast-page-header-bg.jpg)` }}
          >
            <div className="py-5 lg:py-7">
              {/* Left Content */}
              <div className="max-w-xl">
                <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-none">
                  Horizon
                </h1>
                <p className="text-[#e8847c] text-base md:text-lg font-bold uppercase tracking-widest mt-1 mb-2">
                  PODCAST
                </p>
                <p className="text-white/80 text-sm md:text-base italic leading-relaxed mb-4 max-w-lg">
                  "{description}"
                </p>
                <div className="flex items-center gap-5">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full border-2 border-white/30 flex items-center justify-center">
                      <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-[8px] text-white/60 font-black uppercase tracking-widest leading-none">HOSTED BY</p>
                      <p className="text-xs text-white font-bold">{hosts}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full border-2 border-white/30 flex items-center justify-center">
                      <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-[8px] text-white/60 font-black uppercase tracking-widest leading-none">EPISODES</p>
                      <p className="text-xs text-white font-bold">{episodes.length} Total</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : showSlug === 'hammer-time' ? (
        /* Redesigned Hammer Time Podcast Header */
        <section className="bg-[#24375a] relative overflow-hidden">
          <div
            className="container mx-auto px-4 lg:px-8 bg-contain bg-right bg-no-repeat"
            style={{ backgroundImage: `url(${import.meta.env.BASE_URL}images/hammertime-podcast-page-header-bg.jpg)` }}
          >
            <div className="py-5 lg:py-7">
              {/* Left Content */}
              <div className="max-w-xl">
                <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-none">
                  Hammer Time
                </h1>
                <p className="text-[#e8847c] text-base md:text-lg font-bold uppercase tracking-widest mt-1 mb-2">
                  PODCAST
                </p>
                <p className="text-white/80 text-sm md:text-base italic leading-relaxed mb-4 max-w-lg">
                  "{description}"
                </p>
                <div className="flex items-center gap-5">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full border-2 border-white/30 flex items-center justify-center">
                      <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-[8px] text-white/60 font-black uppercase tracking-widest leading-none">HOSTED BY</p>
                      <p className="text-xs text-white font-bold">{hosts}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full border-2 border-white/30 flex items-center justify-center">
                      <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-[8px] text-white/60 font-black uppercase tracking-widest leading-none">EPISODES</p>
                      <p className="text-xs text-white font-bold">{episodes.length} Total</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        /* Default Podcast Header for other shows */
        <section className={`${bgClass} py-12 lg:py-16`}>
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex items-start gap-8">
              {/* Podcast Logo */}
              <div className="flex-shrink-0 relative">
                <div className="w-40 h-40 rounded-lg bg-white/20 flex items-center justify-center overflow-hidden border-4 border-white/10 shadow-2xl">
                  <img
                    src={import.meta.env.BASE_URL + logo}
                    alt={showName}
                    className="w-32 h-32 object-contain"
                  />
                </div>
                {/* Podcast Badge */}
                <div className="absolute -bottom-3 -right-3 w-12 h-12 bg-white rounded-full flex items-center justify-center border-2 shadow-lg">
                  <svg className={`w-6 h-6 ${colorClass}`} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2-12.5v9l7-4.5-7-4.5z"/>
                  </svg>
                </div>
              </div>

              {/* Podcast Info */}
              <div className="flex-grow">
                <div className="mb-2">
                  <span className="text-white/60 text-xs font-bold uppercase tracking-widest">Podcast Series</span>
                </div>
                <h1 className="text-white font-serif text-4xl md:text-5xl font-bold mb-2 tracking-tight">
                  {showName}
                </h1>
                <p className="text-white/80 text-lg italic mb-4 leading-relaxed max-w-2xl">
                  "{description}"
                </p>
                <div className="flex items-center gap-6 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2-12.5v9l7-4.5-7-4.5z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-[10px] text-white/40 font-black uppercase tracking-widest leading-none">HOSTED BY</p>
                      <p className="text-sm text-white font-bold">{hosts}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-[10px] text-white/40 font-black uppercase tracking-widest leading-none">EPISODES</p>
                      <p className="text-sm text-white font-bold">{episodes.length} Total</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Episodes Grid */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-[#1a2a44]">All Episodes</h2>
            <span className="text-sm text-gray-500">Showing {episodes.length} episodes</span>
          </div>

          {episodes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {episodes.map((episode) => (
                <Link
                  key={episode.id}
                  to={getArticlePath(episode)}
                  className="group"
                >
                  {/* Episode Image */}
                  <div className="relative aspect-square overflow-hidden rounded-lg mb-4 shadow-sm border border-gray-100">
                    <img
                      src={episode.imageUrl}
                      alt={episode.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                      <div className="bg-white/90 rounded-full p-4 transform transition-transform group-hover:scale-110">
                        <svg className={`w-6 h-6 ${colorClass} block`} fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                    </div>
                    {episode.premium && (
                      <div className="absolute top-3 left-3 bg-[#EE6260] text-white px-2 py-0.5 text-[9px] font-black uppercase tracking-widest rounded-sm shadow-lg">
                        PREMIUM
                      </div>
                    )}
                  </div>

                  {/* Episode Content */}
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-2 flex items-center gap-2">
                      <span className={colorClass}>PODCAST</span>
                      <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                      {episode.date}
                    </p>
                    <h3 className={`font-serif text-lg font-bold leading-tight mb-3 transition-colors ${colorClass.replace('text-', 'group-hover:text-')}`}>
                      {episode.title}
                    </h3>
                    {episode.summary && (
                      <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                        {episode.summary}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center border-2 border-dashed border-gray-200 rounded-2xl">
              <svg className="w-16 h-16 text-gray-300 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path>
              </svg>
              <h2 className="text-2xl font-bold text-gray-400">No episodes found</h2>
              <p className="text-gray-500 mt-2">Check back soon for new episodes</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default PodcastShowPage;
