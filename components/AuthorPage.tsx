import React, { useState } from 'react';
import { NewsItem } from '../src/types.ts';
import { getAuthorPhoto } from '../src/utils.ts';

interface AuthorPageProps {
  authorName: string;
  articles: NewsItem[];
  onArticleClick: (article: NewsItem) => void;
}

const AuthorPage: React.FC<AuthorPageProps> = ({ authorName, articles, onArticleClick }) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter articles based on search query
  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.summary?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get author photo or use initial as fallback
  const authorPhoto = getAuthorPhoto(authorName);
  const authorInitial = authorName.charAt(0).toUpperCase();

  // Determine author's role/title based on content
  const getAuthorTitle = () => {
    const hasCommentary = articles.some(a => a.category === 'Commentary');
    const hasVideos = articles.some(a => a.category === 'Video' || 'duration' in a);

    if (hasCommentary && hasVideos) return 'Journalist & Political Commentator';
    if (hasCommentary) return 'Political Commentator';
    if (hasVideos) return 'Video Journalist';
    return 'Journalist';
  };

  // Generate author bio
  const getAuthorBio = () => {
    return `${authorName} is a ${getAuthorTitle().toLowerCase()}, a reporter for Brussels Signal and a writer on European politics and public policy based in Brussels`;
  };

  return (
    <main className="flex-grow bg-white">
      {/* Author Header Section */}
      <section className="bg-[#1a2a44] py-12 lg:py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-start gap-6">
            {/* Author Avatar */}
            <div className="flex-shrink-0 relative">
              <div className="w-24 h-24 rounded-full bg-gray-600 flex items-center justify-center overflow-hidden border-4 border-white/10">
                {authorPhoto ? (
                  <img
                    src={authorPhoto}
                    alt={authorName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-white text-3xl font-bold">{authorInitial}</span>
                )}
              </div>
              {/* Verified Badge */}
              <div className="absolute bottom-0 right-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center border-2 border-[#1a2a44]">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
            </div>

            {/* Author Info */}
            <div className="flex-grow">
              <div className="mb-2">
                <span className="text-white/60 text-xs font-bold uppercase tracking-widest">Author</span>
              </div>
              <h1 className="text-white font-serif text-4xl font-bold mb-2">
                {authorName}
              </h1>
              <p className="text-white/80 text-sm font-semibold mb-3">
                {getAuthorTitle()}
              </p>
              <p className="text-white/70 text-sm leading-relaxed max-w-2xl">
                {getAuthorBio()}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Search & Filter Section */}
      <section className="bg-gray-50 border-b border-gray-200 py-6">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Search Bar */}
            <div className="relative w-full md:w-96">
              <input
                type="text"
                placeholder="Search content"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2.5 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent text-sm"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </button>
            </div>

            {/* Article Count */}
            <div className="text-sm">
              <span className="font-bold text-gray-900">Showing {filteredArticles.length} of {articles.length}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4 lg:px-8">
          {filteredArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article) => (
                <div
                  key={article.id}
                  className="group cursor-pointer"
                  onClick={() => onArticleClick(article)}
                >
                  {/* Article Image */}
                  <div className="relative aspect-[16/10] overflow-hidden rounded-sm mb-4 shadow-sm border border-gray-100">
                    <img
                      src={article.imageUrl}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {article.premium && (
                      <div className="absolute top-3 left-3 bg-red-600 text-white px-2 py-0.5 text-[9px] font-black uppercase tracking-widest rounded-sm shadow-lg">
                        PREMIUM
                      </div>
                    )}
                    {article.category?.toLowerCase() === 'videos' && (
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                        <div className="bg-white/90 rounded-full p-2 transform transition-transform group-hover:scale-110">
                          <svg className="w-5 h-5 text-red-600 block" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Article Content */}
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-2 flex items-center gap-2">
                      <span className="text-red-600">{article.category?.toUpperCase() || 'NEWS'}</span>
                      <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                      {article.date}
                    </p>
                    <h3 className="font-serif text-lg font-bold leading-tight mb-3 group-hover:text-red-600 transition-colors">
                      {article.title}
                    </h3>
                    {article.summary && (
                      <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                        {article.summary}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center border-2 border-dashed border-gray-200 rounded-2xl">
              <svg className="w-16 h-16 text-gray-300 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
              <h2 className="text-2xl font-bold text-gray-400">No articles found</h2>
              <p className="text-gray-500 mt-2">Try adjusting your search query</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default AuthorPage;
