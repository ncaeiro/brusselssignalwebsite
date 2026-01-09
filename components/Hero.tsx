
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FEATURED_ARTICLE } from '../src/data.ts';
import { createAuthorSlug } from '../src/utils.ts';

interface HeroProps {
  onClick?: () => void;
}

const Hero: React.FC<HeroProps> = ({ onClick }) => {
  const navigate = useNavigate();

  // Helper to get first few paragraphs (up to ~400 chars)
  const getExcerpt = () => {
    const fullText = FEATURED_ARTICLE.fullContent || '';

    // Split by double newline to get paragraphs
    const paragraphs = fullText.split('\n\n');

    // Combine paragraphs until we reach ~400 chars
    let excerpt = '';
    let currentLength = 0;

    for (let i = 0; i < paragraphs.length && currentLength < 400; i++) {
      if (i > 0) excerpt += '\n\n';
      excerpt += paragraphs[i];
      currentLength = excerpt.length;
    }

    // If still over 400, trim to last complete sentence or word
    if (excerpt.length > 400) {
      excerpt = excerpt.substring(0, 400);
      const lastPeriod = excerpt.lastIndexOf('.');
      const lastSpace = excerpt.lastIndexOf(' ');

      if (lastPeriod > 300) {
        excerpt = excerpt.substring(0, lastPeriod + 1);
      } else if (lastSpace > 0) {
        excerpt = excerpt.substring(0, lastSpace) + '...';
      }
    }

    return excerpt;
  };

  const handleAuthorClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (FEATURED_ARTICLE.author) {
      const authorSlug = createAuthorSlug(FEATURED_ARTICLE.author);
      navigate(`/author/${authorSlug}`);
      window.scrollTo(0, 0);
    }
  };

  return (
    <article className="group">
      <div onClick={onClick} className="relative overflow-hidden mb-4 cursor-pointer">
        <img
          src={FEATURED_ARTICLE.imageUrl}
          alt={FEATURED_ARTICLE.title}
          className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute bottom-4 left-4">
            <span className="bg-[#EE6260] text-white px-2 py-1 text-[10px] font-bold uppercase">NEWS {FEATURED_ARTICLE.date.toUpperCase()}</span>
        </div>
      </div>

      <h1 onClick={onClick} className="font-serif text-3xl md:text-5xl font-black leading-tight mb-4 text-[#111827] hover:text-[#1a2a44] transition-colors cursor-pointer">
        {FEATURED_ARTICLE.title}
      </h1>

      <div className="flex items-center gap-3 mb-4">
        <button
          onClick={handleAuthorClick}
          className="text-sm font-bold text-[#EE6260] uppercase tracking-widest hover:text-[#d44947] transition-colors"
        >
          {FEATURED_ARTICLE.author}
        </button>
        <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
        <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">
          3 MIN READ
        </p>
      </div>

      <p className="text-lg text-gray-700 leading-relaxed mb-6 whitespace-pre-line">
        {getExcerpt()}
      </p>

      <button onClick={onClick} className="text-[#EE6260] font-bold text-sm uppercase tracking-wider hover:text-[#1a2a44] transition-colors flex items-center gap-2 group/btn">
        READ MORE
        <svg className="w-4 h-4 transform transition-transform group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
      </button>
    </article>
  );
};

export default Hero;
