
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { NewsItem } from '../src/types.ts';
import { createAuthorSlug, getAuthorPhoto, calculateReadingTime } from '../src/utils.ts';
import ReadingProgressBar from './ReadingProgressBar.tsx';
import SocialShare from './SocialShare.tsx';
import StickySocialShare from './StickySocialShare.tsx';
import { useFavorites } from '../src/FavoritesContext.tsx';
import { useRegistrationGating } from '../src/RegistrationGatingContext.tsx';
import ArticleProgressBanner from './ArticleProgressBanner.tsx';
import InlineArticleBanner from './InlineArticleBanner.tsx';

interface ArticleDetailProps {
  article: NewsItem;
  allArticles?: NewsItem[];
}

const ArticleDetail: React.FC<ArticleDetailProps> = ({ article, allArticles = [] }) => {
  const navigate = useNavigate();
  const authorPhoto = getAuthorPhoto(article.author || '');
  const { toggleFavorite, isFavorited } = useFavorites();
  const { recordArticleRead } = useRegistrationGating();

  useEffect(() => {
    recordArticleRead(String(article.id));
  }, [article.id]); // eslint-disable-line react-hooks/exhaustive-deps

  // Get related articles (same category, excluding current article)
  const relatedArticles = allArticles
    .filter(a => a.id !== article.id && a.category === article.category)
    .slice(0, 4);

  // If not enough from same category, fill with other articles
  const moreArticles = relatedArticles.length < 4
    ? [
        ...relatedArticles,
        ...allArticles
          .filter(a => a.id !== article.id && !relatedArticles.find(r => r.id === a.id))
          .slice(0, 4 - relatedArticles.length)
      ]
    : relatedArticles;

  const handleArticleClick = (clickedArticle: NewsItem) => {
    const slug = clickedArticle.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    navigate(`/article/${slug}`);
    window.scrollTo(0, 0);
  };

  // Calculate reading time based on full content and summary
  const contentText = `${article.summary || ''} ${article.fullContent || ''}`;
  const readingTime = calculateReadingTime(contentText);

  const handleAuthorClick = () => {
    if (article.author) {
      const authorSlug = createAuthorSlug(article.author);
      navigate(`/author/${authorSlug}`);
      window.scrollTo(0, 0);
    }
  };

  const handleFavoriteClick = () => {
    toggleFavorite(article);
  };

  return (
    <main className="bg-white flex-grow">
      <ReadingProgressBar />
      <ArticleProgressBanner />
      <StickySocialShare
        title={article.title}
        onFavoriteClick={handleFavoriteClick}
        isFavorited={isFavorited(article.id)}
      />
      {/* Article Header */}
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-10 lg:py-16">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 flex items-center gap-4">
            <span className="bg-[#EE6260] text-white px-3 py-1 text-xs font-black uppercase tracking-widest">{article.category || 'NEWS'}</span>
            <span className="text-gray-400 text-xs font-bold uppercase">{article.date}</span>
          </div>

          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4">
            {article.title}
          </h1>

          <div className="flex items-center gap-2 mb-8">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm text-gray-500 font-medium">
              {readingTime} {readingTime === 1 ? 'minute' : 'minutes'} read
            </span>
          </div>

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
                <p className="text-xs font-black text-[#EE6260] uppercase tracking-widest group-hover:text-[#d44947] transition-colors">
                  {article.author || 'Brussels Signal Staff'}
                </p>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tight">European Correspondent</p>
              </div>
            </div>

            <SocialShare
              title={article.title}
              onFavoriteClick={handleFavoriteClick}
              isFavorited={isFavorited(article.id)}
            />
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
              <p className="text-xl md:text-2xl font-semibold text-gray-900 mb-12 leading-[1.5] first-letter:text-7xl first-letter:font-bold first-letter:text-[#EE6260] first-letter:mr-3 first-letter:float-left first-letter:leading-[0.9] font-serif">
                {article.summary}
              </p>
            )}

            {article.fullContent && (
              <div className="mb-6 font-serif">
                {(() => {
                  const paragraphs = article.fullContent!.split('\n');
                  let renderedCount = 0;
                  const INLINE_BANNER_AFTER = 3;
                  const elements: React.ReactNode[] = [];

                  paragraphs.forEach((paragraph, index) => {
                    if (!paragraph.trim()) return;

                    renderedCount++;

                    // Check if paragraph contains quotes with improved regex
                    const quoteRegex = /("[^"]+"|"[^"]+"|„[^"]+"|«[^»]+»)/g;
                    const parts = paragraph.split(quoteRegex);

                    elements.push(
                      <p key={index} className="mb-7 text-[1.125rem] leading-[1.8] text-gray-800">
                        {parts.map((part, partIndex) => {
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

                    // Inject inline banner after the 3rd non-empty paragraph
                    if (renderedCount === INLINE_BANNER_AFTER) {
                      elements.push(<InlineArticleBanner key="inline-banner" />);
                    }
                  });

                  return elements;
                })()}
              </div>
            )}

            {/* Pull Quote - Add visual interest for longer articles */}
            {article.fullContent && article.fullContent.length > 500 && (
              <div className="my-12 py-8 px-8 border-l-4 border-[#EE6260] bg-gray-50 rounded-r-lg">
                <blockquote className="text-2xl md:text-3xl font-serif italic text-gray-900 leading-tight">
                  <svg className="w-10 h-10 text-[#EE6260] mb-4 opacity-50" fill="currentColor" viewBox="0 0 24 24">
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
            <button className="text-xs font-black text-[#EE6260] uppercase hover:underline">Report a correction</button>
          </div>
        </div>
      </div>

      {/* More Like This Section */}
      {moreArticles.length > 0 && (
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <div className="flex items-center gap-4 mb-10">
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900">More like this</h2>
              <div className="flex-1 h-px bg-gray-200"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {moreArticles.map((relatedArticle) => (
                <article
                  key={relatedArticle.id}
                  className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow cursor-pointer group"
                  onClick={() => handleArticleClick(relatedArticle)}
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={relatedArticle.imageUrl}
                      alt={relatedArticle.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="bg-[#EE6260] text-white px-2 py-0.5 text-[10px] font-black uppercase tracking-wider">
                        {relatedArticle.category || 'NEWS'}
                      </span>
                      <span className="text-[10px] text-gray-400 font-bold uppercase">
                        {relatedArticle.date}
                      </span>
                    </div>
                    <h3 className="font-serif font-bold text-gray-900 leading-snug group-hover:text-[#EE6260] transition-colors line-clamp-3">
                      {relatedArticle.title}
                    </h3>
                    {relatedArticle.author && (
                      <p className="mt-3 text-xs text-gray-500 font-medium">
                        By {relatedArticle.author}
                      </p>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
};

export default ArticleDetail;
