
import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { MOST_READ } from '../src/data.ts';
import { createAuthorSlug, createSlug } from '../src/utils.ts';
import { NewsItem } from '../src/types.ts';

interface HeroProps {}

const Hero: React.FC<HeroProps> = () => {
  // Use first 3 articles from MOST_READ for the carousel
  const featuredArticles = MOST_READ.slice(0, 3);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const currentArticle = featuredArticles[currentIndex];

  // Helper to get excerpt text (up to ~400 chars) as a single paragraph
  const getExcerpt = (article: NewsItem) => {
    const fullText = article.fullContent || article.excerpt || '';

    // Replace all line breaks with spaces to create a single paragraph
    let excerpt = fullText.replace(/\n+/g, ' ').replace(/\s+/g, ' ').trim();

    // Trim to ~400 chars
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

  const getArticlePath = (article: NewsItem) => {
    const slug = createSlug(article.title);

    if (article.premium) {
      return `/premium/${slug}`;
    } else if (article.podcastSeries) {
      return `/podcast/${slug}`;
    } else if (article.category?.toLowerCase() === 'videos') {
      return `/video/${slug}`;
    } else {
      return `/article/${slug}`;
    }
  };

  const changeSlide = useCallback((newIndex: number) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(newIndex);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 50);
    }, 300);
  }, []);

  const goToSlide = useCallback((index: number) => {
    if (index !== currentIndex) {
      changeSlide(index);
    }
  }, [currentIndex, changeSlide]);

  const goToPrevious = useCallback(() => {
    const newIndex = currentIndex === 0 ? featuredArticles.length - 1 : currentIndex - 1;
    changeSlide(newIndex);
  }, [currentIndex, featuredArticles.length, changeSlide]);

  const goToNext = useCallback(() => {
    const newIndex = currentIndex === featuredArticles.length - 1 ? 0 : currentIndex + 1;
    changeSlide(newIndex);
  }, [currentIndex, featuredArticles.length, changeSlide]);

  // Auto-scroll with 5 second interval
  useEffect(() => {
    if (isPaused || isTransitioning) return;

    const interval = setInterval(() => {
      goToNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused, isTransitioning, goToNext]);

  const authorSlug = currentArticle?.author ? createAuthorSlug(currentArticle.author) : '';

  if (!currentArticle) return null;

  return (
    <article
      className="group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative overflow-hidden mb-4">
        {/* Navigation Arrows - positioned at top of image */}
        <div className="absolute top-4 right-4 z-20 flex gap-2">
          <button
            onClick={goToPrevious}
            className="p-2 bg-white/90 hover:bg-white rounded shadow-lg transition-colors"
            aria-label="Previous slide"
          >
            <svg className="w-4 h-4 text-[#1a2a44]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={goToNext}
            className="p-2 bg-white/90 hover:bg-white rounded shadow-lg transition-colors"
            aria-label="Next slide"
          >
            <svg className="w-4 h-4 text-[#1a2a44]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Slide Indicators */}
        <div className="absolute top-4 left-4 z-20 flex gap-2">
          {featuredArticles.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? 'bg-[#EE6260]' : 'bg-white/60 hover:bg-white'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <Link to={getArticlePath(currentArticle)} className="block">
          <div className={`transition-opacity duration-300 ease-in-out ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
            <img
              key={currentArticle.id}
              src={currentArticle.imageUrl}
              alt={currentArticle.title}
              className="w-full h-auto animate-ken-burns"
            />
          </div>
          <div className={`absolute bottom-4 left-4 transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
            <span className="bg-[#EE6260] text-white px-2 py-1 text-[10px] font-bold uppercase">
              NEWS {currentArticle.date.toUpperCase()}
            </span>
          </div>
        </Link>
      </div>

      <div className={`transition-opacity duration-300 ease-in-out ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
        <Link to={getArticlePath(currentArticle)}>
          <h1 className="font-serif text-3xl md:text-5xl font-black leading-tight mb-4 text-[#111827] hover:text-[#1a2a44] transition-colors">
            {currentArticle.title}
          </h1>
        </Link>

        <div className="flex items-center gap-3 mb-4">
          <Link
            to={`/author/${authorSlug}`}
            className="text-sm font-bold text-[#EE6260] uppercase tracking-widest hover:text-[#d44947] transition-colors"
          >
            {currentArticle.author}
          </Link>
          <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
          <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">
            3 MIN READ
          </p>
        </div>

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          {getExcerpt(currentArticle)}
        </p>

        <Link to={getArticlePath(currentArticle)} className="text-[#EE6260] font-bold text-sm uppercase tracking-wider hover:text-[#1a2a44] transition-colors flex items-center gap-2 group/btn inline-flex">
          READ MORE
          <svg className="w-4 h-4 transform transition-transform group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
        </Link>
      </div>

      {/* Ken Burns animation styles */}
      <style>{`
        @keyframes ken-burns {
          0% {
            transform: scale(1);
          }
          100% {
            transform: scale(1.08);
          }
        }
        .animate-ken-burns {
          animation: ken-burns 5s ease-out forwards;
        }
      `}</style>
    </article>
  );
};

export default Hero;
