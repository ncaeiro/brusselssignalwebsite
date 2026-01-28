
import React from 'react';
import { Link } from 'react-router-dom';
import { NewsItem } from '../src/types.ts';
import { createSlug } from '../src/utils.ts';

interface PhotoStoriesProps {
  items: NewsItem[];
}

const PhotoStories: React.FC<PhotoStoriesProps> = ({ items }) => {
  const getArticlePath = (item: NewsItem) => {
    const slug = createSlug(item.title);

    if (item.premium) {
      return `/premium/${slug}`;
    } else if (item.podcastSeries) {
      return `/podcast/${slug}`;
    } else if (item.category?.toLowerCase() === 'videos' || ('duration' in item)) {
      return `/video/${slug}`;
    } else {
      return `/article/${slug}`;
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center border-b-2 border-[#EE6260] pb-2 mb-6">
        <Link to="/category/photo-stories" className="text-xl font-bold uppercase tracking-tight flex items-center gap-2 group">
            <svg className="w-6 h-6 text-[#EE6260] transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
            <span className="group-hover:text-[#EE6260] transition-colors">Photo Stories</span>
        </Link>
        <Link to="/category/photo-stories" className="text-xs font-bold text-gray-500 hover:text-[#111827]">View All</Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map(item => (
          <Link key={item.id} to={getArticlePath(item)} className="group">
            <div className="overflow-hidden">
                <img src={item.imageUrl} alt={item.title} className="w-full h-48 object-cover transition-transform group-hover:scale-105" />
            </div>
            <div className="mt-3">
              <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">
                <span className="text-[#EE6260]">NEWS</span> {item.date}
              </p>
              <h3 className="text-base font-bold leading-snug text-[#111827] group-hover:text-[#1a2a44] transition-colors mb-2">
                {item.title}
              </h3>
              <p className="text-[10px] text-[#EE6260] font-bold uppercase">
                {item.author}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PhotoStories;
