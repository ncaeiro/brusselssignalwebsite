
import React, { useState } from 'react';
import { NewsItem } from '../src/types.ts';
import { INTERFERENCE_PODCASTS, HORIZON_PODCASTS, HAMMER_TIME_PODCASTS, WATCH_VIDEOS } from '../src/data.ts';
import { useNavigate } from 'react-router-dom';
import { createSlug, createAuthorSlug } from '../src/utils.ts';

interface FilteredVideosAndPodcastsPageProps {
  onItemClick: (article: NewsItem) => void;
}

type FilterType = 'all' | 'videos' | 'podcasts';

const FilteredVideosAndPodcastsPage: React.FC<FilteredVideosAndPodcastsPageProps> = ({ onItemClick }) => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  // Combine all content
  const allPodcasts = [...INTERFERENCE_PODCASTS, ...HORIZON_PODCASTS, ...HAMMER_TIME_PODCASTS];

  // Helper function to parse date string (format: "Month Day, Year")
  const parseDate = (dateStr: string): number => {
    try {
      const date = new Date(dateStr);
      return date.getTime();
    } catch {
      return 0;
    }
  };

  // Get filtered content based on active filter
  const getFilteredContent = (): NewsItem[] => {
    if (activeFilter === 'videos') {
      return WATCH_VIDEOS;
    } else if (activeFilter === 'podcasts') {
      return allPodcasts;
    }
    // Return all content combined and sorted by date (newest first)
    const combined = [...WATCH_VIDEOS, ...allPodcasts];
    return combined.sort((a, b) => parseDate(b.date) - parseDate(a.date));
  };

  const filteredContent = getFilteredContent();

  const handleAuthorClick = (authorName: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const authorSlug = createAuthorSlug(authorName);
    navigate(`/author/${authorSlug}`);
    window.scrollTo(0, 0);
  };

  // Determine if an item is a podcast
  const isPodcast = (item: NewsItem): boolean => {
    return !!item.podcastSeries;
  };

  // Get podcast label and color
  const getPodcastLabel = (item: NewsItem): { label: string; color: string } | null => {
    if (!item.podcastSeries) return null;

    if (item.podcastSeries === 'Interference') {
      return { label: 'Interference', color: 'bg-[#eb6761]' };
    } else if (item.podcastSeries === 'Horizon Podcast') {
      return { label: 'Horizon Podcast', color: 'bg-[#1a2a44]' };
    } else if (item.podcastSeries === 'Hammer Time') {
      return { label: 'Hammer Time', color: 'bg-[#24375a]' };
    }
    return null;
  };

  return (
    <main className="flex-grow bg-white">
      {/* Category Header */}
      <section className="bg-gray-50 border-b border-gray-200 py-12 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-1 bg-[#EE6260]"></div>
            <span className="text-[#EE6260] font-black text-xs uppercase tracking-[0.3em]">WATCH & LISTEN</span>
          </div>
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-[#1a2a44] mb-6 tracking-tight">
            Videos & Podcasts
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl leading-relaxed">
            In-depth analysis, expert interviews, and unfiltered perspectives on European politics.
          </p>
        </div>
      </section>

      {/* Filter Buttons */}
      <section className="py-8 bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center gap-4 justify-center md:justify-start">
            <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">Filter by:</span>
            <div className="flex gap-2">
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-6 py-2.5 rounded-lg font-bold text-sm uppercase tracking-wider transition-all ${
                  activeFilter === 'all'
                    ? 'bg-[#EE6260] text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                All Content
              </button>
              <button
                onClick={() => setActiveFilter('videos')}
                className={`px-6 py-2.5 rounded-lg font-bold text-sm uppercase tracking-wider transition-all flex items-center gap-2 ${
                  activeFilter === 'videos'
                    ? 'bg-[#EE6260] text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
                Videos Only
              </button>
              <button
                onClick={() => setActiveFilter('podcasts')}
                className={`px-6 py-2.5 rounded-lg font-bold text-sm uppercase tracking-wider transition-all flex items-center gap-2 ${
                  activeFilter === 'podcasts'
                    ? 'bg-[#EE6260] text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2-12.5v9l7-4.5-7-4.5z"/>
                </svg>
                Podcasts Only
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Content Grid */}
      <section className="py-12 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          {filteredContent.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {filteredContent.map((item) => {
                const podcastInfo = getPodcastLabel(item);
                const isVideo = !isPodcast(item);

                return (
                  <div
                    key={item.id}
                    className="group cursor-pointer flex flex-col"
                    onClick={() => onItemClick(item)}
                  >
                    <div className="relative aspect-[16/10] overflow-hidden rounded-sm mb-6 shadow-sm border border-gray-100">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      {/* Play icon overlay */}
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                        <div className="bg-white/90 rounded-full p-2 transform transition-transform group-hover:scale-110">
                          <svg className="w-5 h-5 text-[#EE6260] block" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        </div>
                      </div>

                      {/* Podcast label badge */}
                      {podcastInfo && (
                        <div className={`absolute top-3 left-3 ${podcastInfo.color} text-white px-3 py-1.5 text-[10px] font-black uppercase tracking-widest rounded shadow-lg flex items-center gap-2`}>
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2-12.5v9l7-4.5-7-4.5z"/>
                          </svg>
                          {podcastInfo.label}
                        </div>
                      )}

                      {/* Premium badge */}
                      {item.premium && (
                        <div className="absolute top-3 right-3 bg-[#EE6260] text-white px-2 py-0.5 text-[9px] font-black uppercase tracking-widest rounded-sm shadow-lg">
                          PREMIUM
                        </div>
                      )}
                    </div>

                    <div className="flex-grow">
                      <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-3 flex items-center gap-2">
                        {isVideo ? (
                          <>
                            <span className="text-[#EE6260]">VIDEO</span>
                          </>
                        ) : (
                          <>
                            <span className="text-[#EE6260]">PODCAST</span>
                          </>
                        )}
                        <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                        {item.date}
                      </p>
                      <h3 className="font-serif text-xl font-bold leading-tight mb-4 group-hover:text-[#EE6260] transition-colors">
                        {item.title}
                      </h3>
                      {item.summary && (
                        <p className="text-sm text-gray-600 line-clamp-3 mb-4 leading-relaxed">
                          {item.summary}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-2 pt-4 border-t border-gray-50">
                      <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-400">
                        {item.author ? item.author.charAt(0) : 'B'}
                      </div>
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-tight">
                        By <button
                          onClick={(e) => handleAuthorClick(item.author || 'Brussels Signal', e)}
                          className="hover:text-[#EE6260] transition-colors underline decoration-transparent hover:decoration-red-600"
                        >
                          {item.author || 'Brussels Signal'}
                        </button>
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="py-20 text-center border-2 border-dashed border-gray-200 rounded-2xl">
              <svg className="w-16 h-16 text-gray-300 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
              </svg>
              <h2 className="text-2xl font-bold text-gray-400">No content found</h2>
              <p className="text-gray-500 mt-2">Check back soon for new videos and podcasts.</p>
            </div>
          )}
        </div>
      </section>

      {/* Pagination Placeholder */}
      <section className="pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex justify-center items-center gap-2">
            <button className="w-10 h-10 flex items-center justify-center rounded-sm bg-[#1a2a44] text-white font-bold">1</button>
            <button className="w-10 h-10 flex items-center justify-center rounded-sm bg-gray-100 text-gray-600 font-bold hover:bg-gray-200 transition">2</button>
            <button className="w-10 h-10 flex items-center justify-center rounded-sm bg-gray-100 text-gray-600 font-bold hover:bg-gray-200 transition">3</button>
            <span className="px-2">...</span>
            <button className="w-10 h-10 flex items-center justify-center rounded-sm bg-gray-100 text-gray-600 font-bold hover:bg-gray-200 transition">12</button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default FilteredVideosAndPodcastsPage;
