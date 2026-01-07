
import React, { useRef } from 'react';
import { NewsItem, VideoItem } from '../src/types.ts';

interface WatchSectionProps {
  videos: VideoItem[];
  onItemClick?: (item: NewsItem) => void;
  onHeaderClick?: () => void;
}

const WatchSection: React.FC<WatchSectionProps> = ({ videos, onItemClick, onHeaderClick }) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const container = scrollRef.current;
            // Scroll by one "page" of items or a fixed amount that aligns with the gaps
            const scrollAmount = container.clientWidth * 0.8; 
            const scrollTo = direction === 'left' ? container.scrollLeft - scrollAmount : container.scrollLeft + scrollAmount;
            
            container.scrollTo({ 
                left: scrollTo, 
                behavior: 'smooth' 
            });
        }
    };

    return (
        <div className="relative group/watch">
            <div className="flex justify-between items-center border-b-2 border-red-600 pb-2 mb-6">
                <h2 className="text-xl font-bold uppercase tracking-tight flex items-center gap-2 cursor-pointer group" onClick={onHeaderClick}>
                    <svg className="w-6 h-6 text-red-600 transition-transform group-hover:scale-110 block" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                    <span className="group-hover:text-red-600 transition-colors">Watch</span>
                </h2>
                <div className="flex gap-2">
                    <button
                        onClick={() => scroll('left')}
                        className="p-2 border border-gray-300 rounded hover:bg-gray-100 transition"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                    </button>
                    <button
                        onClick={() => scroll('right')}
                        className="p-2 border border-gray-300 rounded hover:bg-gray-100 transition"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                    </button>
                </div>
            </div>
            
            <div 
                ref={scrollRef}
                className="flex gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-6"
                style={{ scrollBehavior: 'smooth' }}
            >
                {videos.map(vid => (
                    <div 
                        key={vid.id} 
                        className="flex-none w-[80vw] sm:w-[320px] lg:w-[350px] snap-start group cursor-pointer"
                        onClick={() => onItemClick?.(vid)}
                    >
                        <div className="relative h-[480px] overflow-hidden rounded-xl shadow-lg border border-gray-200">
                            <img 
                                src={vid.imageUrl} 
                                alt={vid.title} 
                                className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-700" 
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300"></div>
                            
                            {/* Brand Header */}
                            <div className="absolute top-6 left-6 flex flex-col">
                                <span className="text-white text-[9px] font-black tracking-[0.2em] opacity-70 uppercase leading-none">BRUSSELS</span>
                                <span className="text-white text-[9px] font-black tracking-[0.2em] opacity-70 uppercase leading-none">SIGNAL</span>
                            </div>

                            {/* Center Play Button Overlay */}
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className="bg-red-600/0 group-hover:bg-red-600/90 rounded-full p-5 text-white scale-75 group-hover:scale-100 transition-all duration-300 opacity-0 group-hover:opacity-100">
                                    <svg className="w-8 h-8 block" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                                </div>
                            </div>

                            {/* Bottom Content Area */}
                            <div className="absolute bottom-8 left-8 right-8 text-white">
                                <div className="mb-4">
                                    <span className="bg-red-600 text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider">
                                        {vid.podcastSeries || 'VIDEO'}
                                    </span>
                                </div>
                                <h3 className="font-serif text-2xl font-bold leading-tight mb-4 drop-shadow-md group-hover:underline decoration-red-600/50 underline-offset-4 transition-all">
                                    {vid.title}
                                </h3>
                                <div className="text-[10px] font-bold text-gray-300 uppercase tracking-widest flex items-center gap-2">
                                    <div className="w-4 h-px bg-red-600"></div>
                                    <span>By {vid.author}</span>
                                </div>
                            </div>
                        </div>
                        
                        <div className="mt-4 px-2">
                            <p className="text-[10px] text-gray-500 uppercase font-bold flex items-center gap-2">
                                <span className="text-red-600">NEW SERIES</span>
                                <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                {vid.date}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
            
            {/* Visual fade indicators to hint at more content */}
            <div className="absolute right-0 top-[72px] h-[480px] w-24 bg-gradient-to-l from-[#f8fafc] to-transparent pointer-events-none hidden lg:block opacity-60"></div>
            <div className="absolute left-0 top-[72px] h-[480px] w-24 bg-gradient-to-r from-[#f8fafc] to-transparent pointer-events-none hidden lg:block opacity-60"></div>
        </div>
    );
};

export default WatchSection;
