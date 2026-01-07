
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { NewsItem } from '../src/types.ts';
import { createAuthorSlug, getAuthorPhoto } from '../src/utils.ts';
import ReadingProgressBar from './ReadingProgressBar.tsx';

interface ArticleDetailProps {
  article: NewsItem;
}

const ArticleDetail: React.FC<ArticleDetailProps> = ({ article }) => {
  const navigate = useNavigate();
  const authorPhoto = getAuthorPhoto(article.author || '');

  const handleAuthorClick = () => {
    if (article.author) {
      const authorSlug = createAuthorSlug(article.author);
      navigate(`/author/${authorSlug}`);
      window.scrollTo(0, 0);
    }
  };
  return (
    <main className="bg-white flex-grow">
      <ReadingProgressBar />
      {/* Article Header */}
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-10 lg:py-16">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 flex items-center gap-4">
            <span className="bg-red-600 text-white px-3 py-1 text-xs font-black uppercase tracking-widest">{article.category || 'NEWS'}</span>
            <span className="text-gray-400 text-xs font-bold uppercase">{article.date}</span>
          </div>

          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8">
            {article.title}
          </h1>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-y border-gray-100 py-6 mb-12">
            <div className="flex items-center gap-4 cursor-pointer group" onClick={handleAuthorClick}>
              <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center font-bold text-gray-400 uppercase">
                {authorPhoto ? (
                  <img
                    src={authorPhoto}
                    alt={article.author}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  article.author ? article.author.charAt(0) : 'A'
                )}
              </div>
              <div>
                <p className="text-xs font-black text-red-600 uppercase tracking-widest group-hover:text-red-700 transition-colors">
                  {article.author || 'Brussels Signal Staff'}
                </p>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tight">European Correspondent</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <button className="p-2 bg-gray-50 rounded-full hover:bg-gray-100 transition"><div className="w-5 h-5 bg-blue-600/20 rounded-sm"></div></button>
              <button className="p-2 bg-gray-50 rounded-full hover:bg-gray-100 transition"><div className="w-5 h-5 bg-sky-400/20 rounded-sm"></div></button>
              <button className="p-2 bg-gray-50 rounded-full hover:bg-gray-100 transition"><div className="w-5 h-5 bg-gray-400/20 rounded-sm"></div></button>
            </div>
          </div>

          <figure className="mb-12">
            <img 
              src={article.imageUrl} 
              alt={article.title} 
              className="w-full h-auto rounded shadow-2xl" 
            />
            <figcaption className="text-xs text-gray-500 mt-4 italic">
              {article.title}. © Brussels Signal
            </figcaption>
          </figure>

          <div className="prose prose-lg max-w-none leading-relaxed">
            {article.summary && (
              <p className="text-xl md:text-2xl font-semibold text-gray-900 mb-12 leading-[1.5] first-letter:text-7xl first-letter:font-bold first-letter:text-red-600 first-letter:mr-3 first-letter:float-left first-letter:leading-[0.9] font-serif">
                {article.summary}
              </p>
            )}

            {article.fullContent && (
              <div className="mb-6 font-serif">
                {article.fullContent.split('\n').map((paragraph, index) => {
                  if (!paragraph.trim()) return null;

                  // Check if paragraph contains quotes with improved regex
                  const quoteRegex = /("[^"]+"|"[^"]+"|„[^"]+"|«[^»]+»)/g;
                  const parts = paragraph.split(quoteRegex);

                  return (
                    <p key={index} className="mb-7 text-[1.125rem] leading-[1.8] text-gray-800">
                      {parts.map((part, partIndex) => {
                        // If it's a quoted section (handles various quote styles)
                        if (part.match(/^[""`„«]/) && part.match(/[""'»]$/)) {
                          return (
                            <span
                              key={partIndex}
                              className="relative inline-block bg-gradient-to-r from-red-50 to-orange-50 px-2 py-0.5 rounded-sm italic text-gray-900 font-medium border-l-2 border-red-400 shadow-sm"
                            >
                              {part}
                            </span>
                          );
                        }
                        return <span key={partIndex}>{part}</span>;
                      })}
                    </p>
                  );
                })}
              </div>
            )}

            {/* Pull Quote - Add visual interest for longer articles */}
            {article.fullContent && article.fullContent.length > 500 && (
              <div className="my-12 py-8 px-8 border-l-4 border-red-600 bg-gray-50 rounded-r-lg">
                <blockquote className="text-2xl md:text-3xl font-serif italic text-gray-900 leading-tight">
                  <svg className="w-10 h-10 text-red-600 mb-4 opacity-50" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <p className="mb-4">
                    {article.summary || article.title}
                  </p>
                  {article.author && (
                    <cite className="text-sm font-sans not-italic text-gray-600 font-bold uppercase tracking-wide">
                      — {article.author}
                    </cite>
                  )}
                </blockquote>
              </div>
            )}

            {/* Key Points Section - Add structure to long articles */}
            {article.tags && article.tags.length > 0 && (
              <div className="my-10 p-6 bg-blue-50 rounded-lg border border-blue-100">
                <h3 className="text-sm font-black uppercase tracking-wider text-blue-900 mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Key Topics
                </h3>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag, idx) => (
                    <span key={idx} className="px-3 py-1.5 bg-white text-xs font-bold uppercase rounded-md text-blue-900 border border-blue-200">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

          </div>

          <div className="mt-16 pt-8 border-t border-gray-100 flex items-center justify-end">
            <button className="text-xs font-black text-red-600 uppercase hover:underline">Report a correction</button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ArticleDetail;
