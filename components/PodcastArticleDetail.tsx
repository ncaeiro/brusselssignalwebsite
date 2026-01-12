
import React from 'react';
import { NewsItem } from '../src/types.ts';
import ReadingProgressBar from './ReadingProgressBar.tsx';
import SocialShare from './SocialShare.tsx';
import StickySocialShare from './StickySocialShare.tsx';
import { useFavorites } from '../src/FavoritesContext.tsx';

interface PodcastArticleDetailProps {
  article: NewsItem;
}

const PodcastArticleDetail: React.FC<PodcastArticleDetailProps> = ({ article }) => {
  const { toggleFavorite, isFavorited } = useFavorites();

  const handleFavoriteClick = () => {
    toggleFavorite(article);
  };

  const getSeriesBranding = (series?: string) => {
    switch (series) {
      case 'Interference':
        return {
          color: 'text-[#EE6260]',
          bg: 'bg-[#EE6260]',
          hosts: 'Justin Stares & Alexandra Phillips',
          desc: 'Tackling the most controversial topics in European politics.'
        };
      case 'Horizon Podcast':
        return {
          color: 'text-blue-600',
          bg: 'bg-blue-600',
          hosts: 'Ralph Schoellhammer',
          desc: 'Exploring the future of the continent and the signals on the horizon.'
        };
      case 'Hammer Time':
        return {
          color: 'text-orange-600',
          bg: 'bg-orange-600',
          hosts: 'Ralph Schoellhammer',
          desc: 'Hard-hitting analysis of current events with a sharp focus.'
        };
      default:
        return {
          color: 'text-gray-900',
          bg: 'bg-gray-900',
          hosts: 'Brussels Signal Staff',
          desc: 'Independent reporting from the heart of Europe.'
        };
    }
  };

  const branding = getSeriesBranding(article.podcastSeries);

  return (
    <main className="flex-grow bg-white pb-20">
      <ReadingProgressBar />
      <StickySocialShare
        title={article.title}
        onFavoriteClick={handleFavoriteClick}
        isFavorited={isFavorited(article.id)}
      />
      {/* Podcast Header Section */}
      <section className="bg-gray-50 border-b border-gray-200 pt-10 pb-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">

            {/* Title and Info */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className={`text-xs font-black uppercase tracking-[0.2em] ${branding.color}`}>{article.podcastSeries || 'Podcast Series'}</span>
                <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                <span className="text-[10px] text-gray-400 font-bold uppercase">{article.date}</span>
              </div>

              <h1 className="font-serif text-3xl md:text-5xl font-bold text-[#1a2a44] mb-6 leading-tight">
                {article.title}
              </h1>

              <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed italic">
                "{article.summary || branding.desc}"
              </p>
            </div>

            {/* Video Player Section */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z"/>
                </svg>
                <h2 className="text-2xl font-bold text-[#1a2a44]">Watch the Video Interview</h2>
              </div>

              <div className="bg-black rounded-xl shadow-2xl overflow-hidden border-4 border-white">
                <div className="relative aspect-video">
                  {/* Video Player Placeholder - Replace with actual YouTube embed or video player */}
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
                    <div className="text-center">
                      <div className={`inline-flex items-center justify-center w-20 h-20 ${branding.bg} rounded-full mb-4 shadow-lg`}>
                        <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                      <p className="text-white text-sm font-bold">Video Player</p>
                      <p className="text-gray-400 text-xs mt-1">YouTube embed will appear here</p>
                    </div>
                  </div>
                  {/* Example YouTube embed - uncomment and replace VIDEO_ID with actual ID */}
                  {/* <iframe
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/VIDEO_ID"
                    title={article.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe> */}
                </div>
              </div>
            </div>

            {/* Audio Player Section */}
            <div className="flex flex-col lg:flex-row gap-12 items-start">
              {/* Podcast Cover Art */}
              <div className="w-full max-w-[250px] lg:w-1/4 flex-shrink-0 mx-auto lg:mx-0">
                <div className="relative aspect-square shadow-2xl rounded-lg overflow-hidden border-4 border-white">
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute top-4 left-4 ${branding.bg} text-white px-2 py-0.5 text-[10px] font-black uppercase tracking-widest rounded shadow-md`}>
                    PODCAST
                  </div>
                </div>
              </div>

              {/* Audio Player & Options */}
              <div className="flex-grow text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
                  <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 3v9.28c-.47-.17-.97-.28-1.5-.28C8.01 12 6 14.01 6 16.5S8.01 21 10.5 21c2.31 0 4.2-1.75 4.45-4H15V6h4V3h-7z"/>
                  </svg>
                  <h2 className="text-2xl font-bold text-[#1a2a44]">Listen to Audio Only</h2>
                </div>

                {/* Custom Audio Player UI */}
                <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100 mb-8">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <button className="text-gray-400 hover:text-[#EE6260] transition">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M7 6v12l10-6z"/></svg>
                      </button>
                      <div className="flex items-center gap-6">
                        <button className="text-gray-400 hover:text-[#EE6260] transition"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"/><path d="M10 12c0-.55.45-1 1-1s1 .45 1 1v4c0 .55-.45 1-1 1s-1-.45-1-1v-4zm4 0c0-.55.45-1 1-1s1 .45 1 1v4c0 .55-.45 1-1 1s-1-.45-1-1v-4z"/></svg></button>
                        <button className={`w-16 h-16 ${branding.bg} text-white rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform`}>
                          <svg className="w-8 h-8 block" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                        </button>
                        <button className="text-gray-400 hover:text-[#EE6260] transition"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 5V1l5 5-5 5V7c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6h2c0 4.42-3.58 8-8 8s-8-3.58-8-8 3.58-8 8-8z"/><path d="M10 12c0-.55.45-1 1-1s1 .45 1 1v4c0 .55-.45 1-1 1s-1-.45-1-1v-4zm4 0c0-.55.45-1 1-1s1 .45 1 1v4c0 .55-.45 1-1 1s-1-.45-1-1v-4z"/></svg></button>
                      </div>
                      <button className="text-gray-400 hover:text-[#EE6260] transition">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>
                      </button>
                    </div>
                    <div className="space-y-2">
                      <div className="w-full h-1.5 bg-gray-100 rounded-full relative overflow-hidden">
                        <div className={`absolute top-0 left-0 h-full w-2/5 ${branding.bg} rounded-full`}></div>
                      </div>
                      <div className="flex justify-between text-[10px] font-bold text-gray-400">
                        <span>14:32</span>
                        <span>36:10</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Listening Platform Links */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-6">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">LISTEN ON:</span>
                  <button className="flex items-center gap-2 px-4 py-2 bg-black text-white text-[10px] font-bold uppercase rounded-sm hover:bg-gray-800 transition">Apple Podcasts</button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-[#1DB954] text-white text-[10px] font-bold uppercase rounded-sm hover:bg-[#1ed760] transition">Spotify</button>
                  <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 text-gray-600 text-[10px] font-bold uppercase rounded-sm hover:bg-gray-50 transition">Google Podcasts</button>
                  <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 text-gray-600 text-[10px] font-bold uppercase rounded-sm hover:bg-gray-50 transition">RSS</button>
                </div>

                {/* Social Share */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">SHARE:</span>
                  <SocialShare
                    title={article.title}
                    onFavoriteClick={handleFavoriteClick}
                    isFavorited={isFavorited(article.id)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Transcript & Summary Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <div className="flex flex-col md:flex-row gap-16">
            
            {/* Main Content */}
            <div className="flex-grow">
              <div className="prose prose-lg max-w-none font-serif text-gray-800 leading-relaxed">
                <h3 className="font-sans font-black text-xl text-[#1a2a44] mb-6 uppercase tracking-tight border-b border-gray-100 pb-4">About this Episode</h3>
                <p className="text-xl font-bold mb-8 text-gray-900 leading-snug">
                  This week on {article.podcastSeries}, {branding.hosts} {article.title.toLowerCase().includes('and') ? 'discuss' : 'discusses'} the latest seismic shifts in European legislation.
                </p>
                <p className="mb-6">
                  BRUSSELS — The conversation moves quickly from the legislative halls to the real-world impact on citizens. We explore how recent directives from the European Commission are being received in Warsaw, Budapest, and Paris.
                </p>
                <p className="mb-6">
                  "It's a question of signal versus noise," explains our guest. "While the headlines focus on the friction, the real story is in the long-term industrial realignments happening under the surface."
                </p>

                <div className={`my-12 p-8 border-l-4 ${branding.bg} bg-gray-50 italic text-2xl text-gray-700 font-serif`}>
                  "The Brussels Signal is more than just a name; it's a commitment to finding the truth in a sea of bureaucratic complexity."
                </div>

                <h3 className="font-sans font-black text-xl text-[#1a2a44] mt-12 mb-6 uppercase tracking-tight">Episode Highlights</h3>
                <ul className="font-sans text-base space-y-4 mb-10">
                  <li className="flex gap-4">
                    <span className={`font-bold ${branding.color}`}>[05:24]</span>
                    <span>The breakdown of the latest voting blocs in the European Parliament.</span>
                  </li>
                  <li className="flex gap-4">
                    <span className={`font-bold ${branding.color}`}>[14:10]</span>
                    <span>Why energy independence is becoming the top priority for the 2026 agenda.</span>
                  </li>
                  <li className="flex gap-4">
                    <span className={`font-bold ${branding.color}`}>[28:45]</span>
                    <span>Exclusive interview with a leading economist on the future of the single currency.</span>
                  </li>
                </ul>

                <p>
                  Subscribe to {article.podcastSeries} to never miss an episode of hard-hitting analysis and independent European reporting.
                </p>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="w-full md:w-80 lg:w-96 flex-shrink-0">
               <div className="bg-gray-50 p-8 rounded-xl border border-gray-100 mb-8">
                  <h4 className="text-xs font-black uppercase text-gray-400 tracking-widest mb-6">About the Host</h4>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden">
                       <img src="https://i.pravatar.cc/150?u=ralph" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h5 className="font-bold text-[#1a2a44]">{branding.hosts.split(' & ')[0]}</h5>
                      <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tight">Political Analyst</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {branding.hosts.split(' & ')[0]} is a veteran observer of European affairs, known for a sharp analytical mind and an unwavering commitment to independent journalism.
                  </p>
               </div>

               <div className={`p-8 rounded-xl border ${branding.bg} bg-white shadow-lg`}>
                  <h4 className="text-sm font-bold text-[#1a2a44] mb-4">Never Miss an Episode</h4>
                  <p className="text-xs text-gray-600 mb-6">Join thousands of listeners who receive the weekly podcast briefing.</p>
                  <button className={`w-full py-4 ${branding.bg} text-white text-[10px] font-black uppercase rounded shadow-lg hover:brightness-110 transition-all`}>
                    Join the Briefing
                  </button>
               </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
};

export default PodcastArticleDetail;
