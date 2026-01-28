import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { NewsItem } from '../src/types.ts';
import { getAuthorPhoto, getAuthorEmail, createSlug } from '../src/utils.ts';

interface AuthorPageProps {
  authorName: string;
  articles: NewsItem[];
}

// Author data with expertise and social media
const AUTHORS_DATA: Record<string, { expertise: string[]; linkedin?: string; twitter?: string }> = {
  'krzysztof mularczyk': {
    expertise: ['Politics', 'Eastern Europe', 'EU Affairs'],
    linkedin: 'https://www.linkedin.com/in/krzysztof-mularczyk',
    twitter: 'https://twitter.com/kmularczyk'
  },
  'carl deconinck': {
    expertise: ['Investigations', 'EU Institutions', 'Transparency'],
    linkedin: 'https://www.linkedin.com/in/carl-deconinck',
    twitter: 'https://twitter.com/carldeconinck'
  },
  'claire lemaire': {
    expertise: ['Economics', 'Finance', 'Eurozone'],
    linkedin: 'https://www.linkedin.com/in/claire-lemaire',
    twitter: 'https://twitter.com/clairelemaire'
  },
  'chris gattringer': {
    expertise: ['Tech Policy', 'Trade', 'Digital Regulation'],
    linkedin: 'https://www.linkedin.com/in/chris-gattringer',
    twitter: 'https://twitter.com/chrisgattringer'
  },
  'chris nelson': {
    expertise: ['Society', 'Migration', 'Civil Liberties'],
    linkedin: 'https://www.linkedin.com/in/chris-nelson',
    twitter: 'https://twitter.com/chrisnelson'
  },
  'luca steinmann': {
    expertise: ['Security', 'Analysis', 'International Relations'],
    linkedin: 'https://www.linkedin.com/in/luca-steinmann',
    twitter: 'https://twitter.com/lucasteinmann'
  },
  'kevin myers': {
    expertise: ['Commentary', 'Politics', 'Analysis'],
    linkedin: 'https://www.linkedin.com/in/kevin-myers',
    twitter: 'https://twitter.com/kevinmyers'
  },
  'rafael pinto borges': {
    expertise: ['Politics', 'International Affairs', 'News'],
    linkedin: 'https://www.linkedin.com/in/rafael-pinto-borges',
    twitter: 'https://twitter.com/rafaelpborges'
  }
};

const AuthorPage: React.FC<AuthorPageProps> = ({ authorName, articles }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const getArticlePath = (article: NewsItem) => {
    const slug = createSlug(article.title);

    if (article.premium) {
      return `/premium/${slug}`;
    } else if (article.podcastSeries) {
      return `/podcast/${slug}`;
    } else if (article.category?.toLowerCase() === 'videos' || ('duration' in article)) {
      return `/video/${slug}`;
    } else {
      return `/article/${slug}`;
    }
  };

  // Filter articles based on search query
  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.summary?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get author photo or use initial as fallback
  const authorPhoto = getAuthorPhoto(authorName);
  const authorEmail = getAuthorEmail(authorName);
  const authorInitial = authorName.charAt(0).toUpperCase();

  // Get author data (expertise, social media)
  const authorData = AUTHORS_DATA[authorName.toLowerCase()] || { expertise: [] };

  // Determine author's role/title based on content
  const getAuthorTitle = () => {
    const hasCommentary = articles.some(a => a.category === 'Commentary');
    const hasVideos = articles.some(a => a.category === 'Video' || 'duration' in a);

    if (hasCommentary && hasVideos) return 'Journalist & Political Commentator';
    if (hasCommentary) return 'Political Commentator';
    if (hasVideos) return 'Video Journalist';
    return 'Journalist';
  };

  return (
    <main className="flex-grow bg-white">
      {/* Author Header Section - Compact */}
      <section className="bg-[#1a2a44] py-6 lg:py-8">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center gap-6">
            {/* Author Avatar - Smaller */}
            <div className="flex-shrink-0 relative">
              <div className="w-24 h-24 lg:w-28 lg:h-28 rounded-full bg-gray-600 flex items-center justify-center overflow-hidden border-3 border-white/10">
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
            </div>

            {/* Author Info */}
            <div className="flex-grow">
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-white font-serif text-2xl lg:text-3xl font-bold">
                  {authorName}
                </h1>
                {/* Verified Badge - Inline */}
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
              </div>
              <p className="text-white/70 text-sm font-semibold mb-3">
                {getAuthorTitle()}
              </p>

              {/* Expertise Tags */}
              {authorData.expertise.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {authorData.expertise.map((skill, idx) => (
                    <span
                      key={idx}
                      className="bg-white/10 text-white/90 text-xs font-semibold px-3 py-1 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}

              {/* Contact & Social Media */}
              <div className="flex items-center gap-3">
                {authorEmail && (
                  <a
                    href={`mailto:${authorEmail}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#EE6260] text-white text-xs font-bold rounded hover:bg-[#d44947] transition-colors"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                    Contact
                  </a>
                )}

                {/* LinkedIn */}
                {authorData.linkedin && (
                  <a
                    href={authorData.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                    aria-label="LinkedIn"
                  >
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                )}

                {/* Twitter/X */}
                {authorData.twitter && (
                  <a
                    href={authorData.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                    aria-label="Twitter"
                  >
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                )}
              </div>
            </div>

            {/* Article Count - Right side */}
            <div className="hidden lg:block text-right">
              <div className="text-4xl font-black text-white">{articles.length}</div>
              <div className="text-white/60 text-xs font-bold uppercase tracking-wider">Articles</div>
            </div>
          </div>
        </div>
      </section>

      {/* Search & Filter Section - Compact */}
      <section className="bg-gray-50 border-b border-gray-200 py-4">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Search Bar */}
            <div className="relative w-full md:w-80">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent text-sm"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition">
                <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </button>
            </div>

            {/* Article Count - Mobile */}
            <div className="text-sm lg:hidden">
              <span className="font-bold text-gray-900">{filteredArticles.length} of {articles.length} articles</span>
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-8 lg:py-10">
        <div className="container mx-auto px-4 lg:px-8">
          {filteredArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article) => (
                <Link
                  key={article.id}
                  to={getArticlePath(article)}
                  className="group"
                >
                  {/* Article Image */}
                  <div className="relative aspect-[16/10] overflow-hidden rounded-sm mb-4 shadow-sm border border-gray-100">
                    <img
                      src={article.imageUrl}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {article.premium && (
                      <div className="absolute top-3 left-3 bg-[#EE6260] text-white px-2 py-0.5 text-[9px] font-black uppercase tracking-widest rounded-sm shadow-lg">
                        PREMIUM
                      </div>
                    )}
                    {article.category?.toLowerCase() === 'videos' && (
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                        <div className="bg-white/90 rounded-full p-2 transform transition-transform group-hover:scale-110">
                          <svg className="w-5 h-5 text-[#EE6260] block" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Article Content */}
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-2 flex items-center gap-2">
                      <span className="text-[#EE6260]">{article.category?.toUpperCase() || 'NEWS'}</span>
                      <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                      {article.date}
                    </p>
                    <h3 className="font-serif text-lg font-bold leading-tight mb-3 group-hover:text-[#EE6260] transition-colors">
                      {article.title}
                    </h3>
                    {article.summary && (
                      <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                        {article.summary}
                      </p>
                    )}
                  </div>
                </Link>
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
