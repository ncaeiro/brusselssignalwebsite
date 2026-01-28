
import React from 'react';
import { Link } from 'react-router-dom';
import { NewsItem } from '../src/types.ts';
import { createSlug } from '../src/utils.ts';

interface SectionGridProps {
  title: string;
  items: NewsItem[];
  categorySlug?: string;
}

const SectionGrid: React.FC<SectionGridProps> = ({ title, items, categorySlug }) => {
  const getCategoryPath = () => {
    if (categorySlug) {
      return `/category/${categorySlug}`;
    }
    return `/category/${title.toLowerCase().replace(/\s+/g, '-')}`;
  };

  const getItemPath = (item: NewsItem) => {
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
      <div className="flex justify-between items-center border-b-2 border-gray-900 pb-2 mb-6">
        <Link to={getCategoryPath()} className="text-xl font-bold uppercase tracking-tight flex items-center gap-2 group">
            <svg className="w-6 h-6 text-[#EE6260] transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
            <span className="group-hover:text-[#EE6260] transition-colors">{title}</span>
        </Link>
        <Link to={getCategoryPath()} className="text-xs font-bold text-gray-500 hover:text-[#111827]">View All</Link>
      </div>

      <div className="space-y-8">
        {items.map((item, idx) => (
          <Link key={item.id} to={getItemPath(item)} className="flex gap-4 group">
            <img src={item.imageUrl} alt={item.title} className="w-28 h-20 object-cover flex-shrink-0" />
            <div>
              <h3 className="text-[1.1rem] leading-[1] text-[#111827] group-hover:text-[#1a2a44] transition-colors underline">
                {item.title}
              </h3>
              <p className="text-[10px] text-gray-500 mt-2 uppercase font-bold">
                <span className="text-[#EE6260]">NEWS</span> {item.date}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SectionGrid;
