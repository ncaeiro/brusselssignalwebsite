
import React from 'react';
import { FEATURED_ARTICLE } from '../src/data.ts';

interface HeroProps {
  onClick?: () => void;
}

const Hero: React.FC<HeroProps> = ({ onClick }) => {
  return (
    <article onClick={onClick} className="group cursor-pointer">
      <div className="relative overflow-hidden mb-4">
        <img
          src={FEATURED_ARTICLE.imageUrl}
          alt={FEATURED_ARTICLE.title}
          className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute bottom-4 left-4">
            <span className="bg-red-600 text-white px-2 py-1 text-[10px] font-bold uppercase">NEWS {FEATURED_ARTICLE.date.toUpperCase()}</span>
        </div>
      </div>

      <h1 className="font-serif text-3xl md:text-5xl font-black leading-tight mb-4 text-[#111827] group-hover:text-[#1a2a44] transition-colors">
        {FEATURED_ARTICLE.title}
      </h1>

      <p className="text-lg text-gray-700 leading-relaxed mb-4">
        {FEATURED_ARTICLE.summary}
      </p>

      <div className="flex items-center gap-3 mb-4">
        <p className="text-sm font-bold text-red-600 uppercase tracking-widest">
          {FEATURED_ARTICLE.author}
        </p>
        <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
        <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">
          3 MIN READ
        </p>
      </div>

      <button className="text-red-600 font-bold text-sm uppercase tracking-wider hover:text-[#1a2a44] transition-colors flex items-center gap-2 group/btn">
        READ MORE
        <svg className="w-4 h-4 transform transition-transform group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
      </button>
    </article>
  );
};

export default Hero;
