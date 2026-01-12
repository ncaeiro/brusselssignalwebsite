
import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { NewsItem } from '../src/types.ts';
import { createSlug } from '../src/utils.ts';
import { WATCH_VIDEOS } from '../src/data.ts';

interface VideoFeedProps {
  onItemClick?: (item: NewsItem) => void;
}

const VideoFeed: React.FC<VideoFeedProps> = ({ onItemClick }) => {
    const navigate = useNavigate();
    const scrollRef = useRef<HTMLDivElement>(null);

    // Get the first 5 videos from WATCH_VIDEOS for the carousel
    const videos = WATCH_VIDEOS.slice(0, 5);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
            scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
        }
    };

    return (
        <div className="relative group/section">
            <div className="flex justify-between items-center border-b-2 border-[#EE6260] pb-2 mb-6">
                <h2 className="text-xl font-bold uppercase tracking-tight flex items-center gap-2">
                    <svg className="w-6 h-6 text-[#EE6260] block" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                    Video Feed
                </h2>
                <div className="hidden md:flex gap-2">
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
            >
                {videos.map(vid => (
                    <div key={vid.id} className="flex-none w-[85vw] md:w-[calc(33.333%-1rem)] snap-start group cursor-pointer" onClick={() => {
                        const slug = createSlug(vid.title);
                        navigate(`/video/${slug}`);
                        window.scrollTo(0, 0);
                    }}>
                        <div className="relative aspect-video overflow-hidden rounded-xl shadow-lg">
                            <img src={vid.imageUrl} className="w-full h-full object-cover transition-transform group-hover:scale-105" alt={vid.title} />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                                <div className="bg-white/90 rounded-full p-4 transform transition-transform group-hover:scale-110">
                                    <svg className="w-8 h-8 text-[#EE6260] block" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4">
                            <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">
                                <span className="text-[#EE6260]">VIDEO</span> {vid.date} {vid.duration && `• ${vid.duration}`}
                            </p>
                            <h3 className="font-serif text-2xl font-bold leading-[1.1] text-[#111827] group-hover:text-[#1a2a44] line-clamp-2">
                                {vid.title}
                            </h3>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VideoFeed;
