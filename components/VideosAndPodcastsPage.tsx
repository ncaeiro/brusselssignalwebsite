
import React from 'react';
import { Link } from 'react-router-dom';
import { NewsItem } from '../src/types.ts';
import { INTERFERENCE_PODCASTS, HORIZON_PODCASTS, HAMMER_TIME_PODCASTS, WATCH_VIDEOS } from '../src/data.ts';
import { createSlug } from '../src/utils.ts';

interface VideosAndPodcastsPageProps {}

const VideosAndPodcastsPage: React.FC<VideosAndPodcastsPageProps> = () => {
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
  const [showFloatingMenu, setShowFloatingMenu] = React.useState(false);

  // Show/hide floating menu on scroll
  React.useEffect(() => {
    const handleScroll = () => {
      setShowFloatingMenu(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to section function
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const PodcastSection = ({
    id,
    title,
    hosts,
    description,
    episodes,
    colorClass,
    bgClass,
    logo,
    thumbnail
  }: {
    id: string;
    title: string;
    hosts: string;
    description: string;
    episodes: NewsItem[];
    colorClass: string;
    bgClass: string;
    logo: string;
    thumbnail: string;
  }) => (
    <div id={id} className="mb-24 scroll-mt-8">
      {/* Show Header */}
      <div className={`p-8 md:p-12 rounded-2xl ${bgClass} border border-white/5 shadow-xl mb-12 flex flex-col md:flex-row gap-8 items-center`}>
        <div className="w-48 h-48 flex-shrink-0 shadow-2xl rounded-lg overflow-hidden border-2 border-white/20">
          <img src={import.meta.env.BASE_URL + thumbnail} className="w-full h-full object-cover" alt={title} />
        </div>
        <div className="text-center md:text-left flex-grow">
          <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
            <span className={`text-xs font-black uppercase tracking-widest ${colorClass} bg-white px-2 py-0.5 rounded-sm`}>PODCAST</span>
            <span className="w-1 h-1 bg-white/20 rounded-full"></span>
            <span className="text-[10px] text-white/60 font-bold uppercase tracking-widest">{episodes.length} EPISODES</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">{title}</h2>
          <p className="text-white/80 text-lg mb-6 max-w-2xl leading-relaxed italic">"{description}"</p>
          <div className="flex items-center justify-center md:justify-start gap-4">
             <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2-12.5v9l7-4.5-7-4.5z"/></svg>
             </div>
             <div>
               <p className="text-[10px] text-white/40 font-black uppercase tracking-widest leading-none">HOSTED BY</p>
               <p className="text-sm text-white font-bold">{hosts}</p>
             </div>
          </div>
        </div>
      </div>

      {/* Episode Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {(() => {
          // Ensure we have at least 5 episodes by duplicating if needed
          const displayEpisodes = [...episodes];
          while (displayEpisodes.length < 5 && episodes.length > 0) {
            displayEpisodes.push(...episodes.slice(0, Math.min(5 - displayEpisodes.length, episodes.length)));
          }
          return displayEpisodes;
        })().map((ep, index) => (
          <Link
            key={`${ep.id}-${index}`}
            to={getArticlePath(ep)}
            className="group bg-white border border-gray-100 p-4 rounded-xl shadow-sm hover:shadow-md transition-all hover:-translate-y-1 block"
          >
            <div className="aspect-square relative overflow-hidden rounded-lg mb-4">
              <img src={ep.imageUrl} className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-700" alt={ep.title} />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors"></div>
              <div className="absolute bottom-3 right-3 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                <svg className={`w-5 h-5 ${colorClass.split(' ')[0]}`} fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              </div>
            </div>
            <p className="text-[10px] text-gray-400 font-bold mb-1 uppercase tracking-widest">{ep.date}</p>
            <p className={`text-[9px] font-black mb-2 uppercase tracking-widest ${colorClass}`}>{title}</p>
            <h4 className="text-base font-bold leading-tight text-[#1a2a44] group-hover:text-[#EE6260] transition-colors mb-3 line-clamp-2">
              {ep.title}
            </h4>
            <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
              {ep.summary}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );

  return (
    <main className="flex-grow bg-[#f8fafc] pb-24 relative">
      {/* Floating Navigation Menu */}
      <div className={`fixed top-20 right-8 z-40 transition-all duration-300 ${showFloatingMenu ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
        <div className="bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden">
          <div className="bg-[#1a2a44] px-4 py-3">
            <h3 className="text-white text-xs font-black uppercase tracking-widest">Quick Navigation</h3>
          </div>
          <div className="p-2">
            <button
              onClick={() => scrollToSection('interference')}
              className="w-full text-left px-4 py-2.5 rounded-lg hover:bg-[#eb6761] hover:text-white transition-colors flex items-center gap-3 group"
            >
              <div className="w-8 h-8 bg-[#eb6761] rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-white transition-colors">
                <svg className="w-4 h-4 text-white group-hover:text-[#eb6761]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2-12.5v9l7-4.5-7-4.5z"/></svg>
              </div>
              <span className="text-sm font-bold text-[#1a2a44] group-hover:text-white">Interference</span>
            </button>
            <button
              onClick={() => scrollToSection('horizon')}
              className="w-full text-left px-4 py-2.5 rounded-lg hover:bg-[#1a2a44] hover:text-white transition-colors flex items-center gap-3 group"
            >
              <div className="w-8 h-8 bg-[#1a2a44] rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-white transition-colors">
                <svg className="w-4 h-4 text-white group-hover:text-[#1a2a44]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2-12.5v9l7-4.5-7-4.5z"/></svg>
              </div>
              <span className="text-sm font-bold text-[#1a2a44] group-hover:text-white">Horizon Podcast</span>
            </button>
            <button
              onClick={() => scrollToSection('hammertime')}
              className="w-full text-left px-4 py-2.5 rounded-lg hover:bg-[#24375a] hover:text-white transition-colors flex items-center gap-3 group"
            >
              <div className="w-8 h-8 bg-[#24375a] rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-white transition-colors">
                <svg className="w-4 h-4 text-white group-hover:text-[#24375a]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2-12.5v9l7-4.5-7-4.5z"/></svg>
              </div>
              <span className="text-sm font-bold text-[#1a2a44] group-hover:text-white">Hammer Time</span>
            </button>
            <div className="border-t border-gray-200 my-2"></div>
            <button
              onClick={() => scrollToSection('all-videos')}
              className="w-full text-left px-4 py-2.5 rounded-lg hover:bg-[#EE6260] hover:text-white transition-colors flex items-center gap-3 group"
            >
              <div className="w-8 h-8 bg-[#EE6260] rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-white transition-colors">
                <svg className="w-4 h-4 text-white group-hover:text-[#EE6260]" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              </div>
              <span className="text-sm font-bold text-[#1a2a44] group-hover:text-white">All Videos</span>
            </button>
          </div>
        </div>
      </div>
      {/* Page Header */}
      <section className="bg-[#1a2a44] py-16 lg:py-24 relative overflow-hidden mb-16">
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
            <div className="inline-flex items-center gap-2 mb-6 px-3 py-1 bg-white/5 rounded-full border border-white/10">
                <svg className="w-4 h-4 text-[#EE6260]" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                <span className="text-[10px] text-white font-black uppercase tracking-[0.2em]">WATCH & LISTEN</span>
            </div>
            <h1 className="font-serif text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                Videos & Podcasts
            </h1>
            <p className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto leading-relaxed font-medium">
                In-depth analysis, expert interviews, and unfiltered perspectives on European politics.
            </p>
        </div>
      </section>

      {/* Podcast Cards Section - 3 columns */}
      <section className="container mx-auto px-4 lg:px-8 mb-24">
        <h2 className="text-3xl font-bold text-[#1a2a44] mb-8 text-center">Our Podcasts</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Interference Card */}
          <div
            className="group cursor-pointer rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 overflow-hidden border border-white/5"
            onClick={() => scrollToSection('interference')}
          >
            <div className="bg-[#eb6761] p-8 md:p-10 flex flex-col items-center text-center">
              <div className="w-32 h-32 flex-shrink-0 shadow-2xl rounded-lg overflow-hidden border-2 border-white/20 mb-6 flex items-center justify-center">
                <img
                  src={import.meta.env.BASE_URL + "images/interference-podcast-logo.png"}
                  alt="Interference"
                  className="w-24 h-24 object-contain"
                />
              </div>
              <div className="flex items-center justify-center gap-2 mb-3">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#EE6260] bg-white px-2 py-0.5 rounded-sm">PODCAST</span>
                <span className="w-1 h-1 bg-white/20 rounded-full"></span>
                <span className="text-[9px] text-white/60 font-bold uppercase tracking-widest">{INTERFERENCE_PODCASTS.length} EPISODES</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 tracking-tight group-hover:scale-105 transition-transform">Interference</h3>
              <p className="text-white/80 text-sm mb-4 italic leading-relaxed">"Tackling the most controversial topics in European politics with unfiltered honesty."</p>
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2-12.5v9l7-4.5-7-4.5z"/></svg>
                </div>
                <div>
                  <p className="text-[9px] text-white/40 font-black uppercase tracking-widest leading-none">HOSTED BY</p>
                  <p className="text-xs text-white font-bold">Justin Stares & Alexandra Phillips</p>
                </div>
              </div>
            </div>
          </div>

          {/* Horizon Card */}
          <div
            className="group cursor-pointer rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 overflow-hidden border border-white/5"
            onClick={() => scrollToSection('horizon')}
          >
            <div className="bg-[#1a2a44] p-8 md:p-10 flex flex-col items-center text-center">
              <div className="w-32 h-32 flex-shrink-0 shadow-2xl rounded-lg overflow-hidden border-2 border-white/20 mb-6 flex items-center justify-center">
                <img
                  src={import.meta.env.BASE_URL + "images/horizon-podcast-logo.png"}
                  alt="Horizon Podcast"
                  className="w-24 h-24 object-contain"
                />
              </div>
              <div className="flex items-center justify-center gap-2 mb-3">
                <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 bg-white px-2 py-0.5 rounded-sm">PODCAST</span>
                <span className="w-1 h-1 bg-white/20 rounded-full"></span>
                <span className="text-[9px] text-white/60 font-bold uppercase tracking-widest">{HORIZON_PODCASTS.length} EPISODES</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 tracking-tight group-hover:scale-105 transition-transform">Horizon Podcast</h3>
              <p className="text-white/80 text-sm mb-4 italic leading-relaxed">"Exploring the future of the continent and the strategic signals on the horizon."</p>
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2-12.5v9l7-4.5-7-4.5z"/></svg>
                </div>
                <div>
                  <p className="text-[9px] text-white/40 font-black uppercase tracking-widest leading-none">HOSTED BY</p>
                  <p className="text-xs text-white font-bold">Ralph Schoellhammer</p>
                </div>
              </div>
            </div>
          </div>

          {/* Hammer Time Card */}
          <div
            className="group cursor-pointer rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 overflow-hidden border border-white/5"
            onClick={() => scrollToSection('hammertime')}
          >
            <div className="bg-[#24375a] p-8 md:p-10 flex flex-col items-center text-center">
              <div className="w-32 h-32 flex-shrink-0 shadow-2xl rounded-lg overflow-hidden border-2 border-white/20 mb-6 flex items-center justify-center">
                <img
                  src={import.meta.env.BASE_URL + "images/horizon-podcast-logo.png"}
                  alt="Hammer Time"
                  className="w-24 h-24 object-contain"
                />
              </div>
              <div className="flex items-center justify-center gap-2 mb-3">
                <span className="text-[10px] font-black uppercase tracking-widest text-orange-600 bg-white px-2 py-0.5 rounded-sm">PODCAST</span>
                <span className="w-1 h-1 bg-white/20 rounded-full"></span>
                <span className="text-[9px] text-white/60 font-bold uppercase tracking-widest">{HAMMER_TIME_PODCASTS.length} EPISODES</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 tracking-tight group-hover:scale-105 transition-transform">Hammer Time</h3>
              <p className="text-white/80 text-sm mb-4 italic leading-relaxed">"Hard-hitting, direct analysis of current events with a sharp focus on bureaucratic failure."</p>
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2-12.5v9l7-4.5-7-4.5z"/></svg>
                </div>
                <div>
                  <p className="text-[9px] text-white/40 font-black uppercase tracking-widest leading-none">HOSTED BY</p>
                  <p className="text-xs text-white font-bold">Ralph Schoellhammer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 lg:px-8">
        {/* Interference Podcast Section */}
        <PodcastSection
          id="interference"
          title="Interference"
          hosts="Justin Stares & Alexandra Phillips"
          description="Tackling the most controversial topics in European politics with unfiltered honesty."
          episodes={INTERFERENCE_PODCASTS}
          colorClass="text-[#EE6260]"
          bgClass="bg-[#eb6761]"
          logo="images/interference-podcast-logo.png"
          thumbnail="images/podcast-interference-1.png"
        />

        {/* Horizon Podcast Section */}
        <PodcastSection
          id="horizon"
          title="Horizon Podcast"
          hosts="Ralph Schoellhammer"
          description="Exploring the future of the continent and the strategic signals on the horizon."
          episodes={HORIZON_PODCASTS}
          colorClass="text-blue-600"
          bgClass="bg-[#1a2a44]"
          logo="images/horizon-podcast-logo.png"
          thumbnail="images/podcast-interference-2.png"
        />

        {/* Hammer Time Section */}
        <PodcastSection
          id="hammertime"
          title="Hammer Time"
          hosts="Ralph Schoellhammer"
          description="Hard-hitting, direct analysis of current events with a sharp focus on bureaucratic failure."
          episodes={HAMMER_TIME_PODCASTS}
          colorClass="text-orange-600"
          bgClass="bg-[#24375a]"
          logo="images/horizon-podcast-logo.png"
          thumbnail="images/podcast-interference-3.png"
        />

        {/* All Videos Section */}
        <section id="all-videos" className="mb-24 scroll-mt-8">
          <div className="flex justify-between items-center border-b-2 border-[#EE6260] pb-4 mb-12">
            <h2 className="text-3xl font-bold text-[#1a2a44] flex items-center gap-3">
              <svg className="w-8 h-8 text-[#EE6260]" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              All Videos
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {WATCH_VIDEOS.map((video) => (
              <Link
                key={video.id}
                to={getArticlePath(video)}
                className="group block"
              >
                <div className="relative aspect-video overflow-hidden rounded-lg shadow-lg mb-4">
                  <img
                    src={video.imageUrl}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-700"
                    alt={video.title}
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                    <div className="bg-white/90 rounded-full p-4 transform transition-transform group-hover:scale-110">
                      <svg className="w-8 h-8 text-[#EE6260]" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                    </div>
                  </div>
                </div>
                <p className="text-[10px] text-gray-400 font-bold mb-2 uppercase tracking-widest">
                  <span className="text-[#EE6260]">VIDEO</span> • {video.date}
                </p>
                <h3 className="text-lg font-bold leading-tight text-[#1a2a44] group-hover:text-[#EE6260] transition-colors line-clamp-2">
                  {video.title}
                </h3>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default VideosAndPodcastsPage;
