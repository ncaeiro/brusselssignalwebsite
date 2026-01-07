
import React from 'react';
import { NewsItem } from '../src/types.ts';

interface PhotoStoriesProps {
  items: NewsItem[];
  onItemClick?: (item: NewsItem) => void;
  onHeaderClick?: () => void;
}

const PhotoStories: React.FC<PhotoStoriesProps> = ({ items, onItemClick, onHeaderClick }) => {
  return (
    <div>
      <div className="flex justify-between items-center border-b-2 border-red-600 pb-2 mb-6">
        <h2 className="text-xl font-bold uppercase tracking-tight flex items-center gap-2 cursor-pointer group" onClick={onHeaderClick}>
            <svg className="w-6 h-6 text-red-600 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
            <span className="group-hover:text-red-600 transition-colors">Photo Stories</span>
        </h2>
        <button onClick={onHeaderClick} className="text-xs font-bold text-gray-500 hover:text-[#111827]">View All</button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map(item => (
          <div key={item.id} className="group cursor-pointer" onClick={() => onItemClick?.(item)}>
            <div className="overflow-hidden">
                <img src={item.imageUrl} alt={item.title} className="w-full h-48 object-cover transition-transform group-hover:scale-105" />
            </div>
            <div className="mt-3">
              <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">
                <span className="text-red-600">NEWS</span> {item.date}
              </p>
              <h3 className="text-base font-bold leading-snug text-[#111827] group-hover:text-[#1a2a44] transition-colors mb-2">
                {item.title}
              </h3>
              <p className="text-[10px] text-red-600 font-bold uppercase">
                {item.author}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotoStories;
