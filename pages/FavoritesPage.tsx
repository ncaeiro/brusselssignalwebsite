
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFavorites } from '../src/FavoritesContext.tsx';
import { createSlug } from '../src/utils.ts';

const FavoritesPage: React.FC = () => {
  const navigate = useNavigate();
  const { favorites, removeFromFavorites } = useFavorites();

  const handleArticleClick = (article: any) => {
    const slug = createSlug(article.title);
    const type = article.isPremium ? 'premium' : article.videoUrl ? 'video' : article.podcastSeries ? 'podcast' : 'article';
    navigate(`/${type}/${slug}`);
    window.scrollTo(0, 0);
  };

  const handleRemove = (articleId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    removeFromFavorites(articleId);
  };

  return (
    <main className="bg-white flex-grow">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-16 lg:py-24">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-12 border-b border-gray-100 pb-8">
            <div className="flex items-center gap-4 mb-4">
              <svg className="w-10 h-10 text-[#EE6260]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
              </svg>
              <h1 className="font-serif text-4xl md:text-6xl font-bold text-[#1a2a44]">
                Your Favorites
              </h1>
            </div>
            <p className="text-gray-600 text-lg">
              {favorites.length === 0
                ? 'You haven\'t saved any articles yet.'
                : `${favorites.length} saved ${favorites.length === 1 ? 'article' : 'articles'}`}
            </p>
          </div>

          {/* Empty State */}
          {favorites.length === 0 && (
            <div className="text-center py-20">
              <svg className="w-24 h-24 text-gray-200 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
              </svg>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">No saved articles yet</h2>
              <p className="text-gray-500 mb-8 max-w-md mx-auto">
                Start building your reading list by clicking the heart icon on articles you want to save for later.
              </p>
              <button
                onClick={() => navigate('/')}
                className="px-6 py-3 bg-[#EE6260] text-white text-sm font-black uppercase tracking-wider rounded-sm hover:bg-[#d44947] transition"
              >
                Browse Articles
              </button>
            </div>
          )}

          {/* Articles Grid */}
          {favorites.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {favorites.map((article) => (
                <div
                  key={article.id}
                  className="group cursor-pointer bg-white rounded-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300"
                  onClick={() => handleArticleClick(article)}
                >
                  {/* Image */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                    <img
                      src={article.imageUrl}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3">
                      <button
                        onClick={(e) => handleRemove(article.id, e)}
                        className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-[#EE6260] hover:text-white transition group/btn shadow-lg"
                        aria-label="Remove from favorites"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                        </svg>
                      </button>
                    </div>
                    {article.isPremium && (
                      <div className="absolute top-3 left-3 bg-[#1a2a44] text-white px-2 py-1 text-[9px] font-black uppercase tracking-wider rounded-sm flex items-center gap-1">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                        Premium
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="bg-[#EE6260] text-white px-2 py-0.5 text-[9px] font-black uppercase tracking-widest">
                        {article.category || 'News'}
                      </span>
                      <span className="text-gray-400 text-[9px] font-bold uppercase">
                        {article.date}
                      </span>
                    </div>

                    <h3 className="font-serif text-xl font-bold text-[#1a2a44] mb-3 leading-tight group-hover:text-[#EE6260] transition line-clamp-3">
                      {article.title}
                    </h3>

                    {article.summary && (
                      <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 mb-4">
                        {article.summary}
                      </p>
                    )}

                    {article.author && (
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
                        </svg>
                        <span className="font-bold uppercase tracking-wide">{article.author}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default FavoritesPage;
