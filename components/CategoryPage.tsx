
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { NewsItem } from '../src/types.ts';
import { createAuthorSlug } from '../src/utils.ts';

interface CategoryPageProps {
  categoryName: string;
  articles: NewsItem[];
  onArticleClick: (article: NewsItem) => void;
  activeTag?: string;
}

const CategoryPage: React.FC<CategoryPageProps> = ({ categoryName, articles, onArticleClick, activeTag }) => {
  const navigate = useNavigate();

  const handleAuthorClick = (authorName: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const authorSlug = createAuthorSlug(authorName);
    navigate(`/author/${authorSlug}`);
    window.scrollTo(0, 0);
  };

  return (
    <main className="flex-grow bg-white">
      {/* Category Header */}
      <section className="bg-gray-50 border-b border-gray-200 py-6 lg:py-10">
        <div className="container mx-auto px-4 lg:px-8">
            <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-1 bg-[#EE6260]"></div>
                <span className="text-[#EE6260] font-black text-xs uppercase tracking-[0.3em]">EXPLORE CONTENT</span>
            </div>

            {/* Breadcrumb Navigation */}
            {activeTag && (
              <div className="mb-4">
                <nav className="flex items-center gap-2 text-sm">
                  <button
                    onClick={() => navigate(`/category/${categoryName.toLowerCase()}`)}
                    className="text-gray-600 hover:text-[#EE6260] font-bold uppercase tracking-wide transition-colors"
                  >
                    {categoryName}
                  </button>
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                  <span className="text-[#EE6260] font-bold uppercase tracking-wide">
                    {activeTag.replace(/^#/, '').replace(/-/g, ' ')}
                  </span>
                </nav>
              </div>
            )}

            <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#1a2a44] mb-4 tracking-tight capitalize">
                {activeTag ? activeTag.replace(/^#/, '').replace(/-/g, ' ') : categoryName}
            </h1>
            {activeTag && (
              <div className="mb-3">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#EE6260] text-white text-sm font-black uppercase tracking-wider rounded-sm">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M9.243 3.03a1 1 0 01.727 1.213L9.53 6h2.94l.56-2.243a1 1 0 111.94.486L14.53 6H17a1 1 0 110 2h-2.97l-1 4H15a1 1 0 110 2h-2.47l-.56 2.242a1 1 0 11-1.94-.485L10.47 14H7.53l-.56 2.242a1 1 0 11-1.94-.485L5.47 14H3a1 1 0 110-2h2.97l1-4H5a1 1 0 110-2h2.47l.56-2.243a1 1 0 011.213-.727zM9.03 8l-1 4h2.938l1-4H9.031z" clipRule="evenodd"/>
                  </svg>
                  {activeTag.replace(/^#/, '').replace(/-/g, ' ')}
                </span>
              </div>
            )}
            <p className="text-lg text-gray-500 max-w-2xl leading-relaxed">
                {activeTag
                  ? `Showing ${categoryName.toLowerCase()} articles tagged with "${activeTag.replace(/^#/, '').replace(/-/g, ' ')}"`
                  : `Stay informed with our latest reporting and in-depth analysis on ${categoryName.toLowerCase()}, bringing you the signals that matter in a complex European landscape.`
                }
            </p>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-12 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8">
            {articles.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {articles.map((article) => (
                        <div 
                            key={article.id} 
                            className="group cursor-pointer flex flex-col"
                            onClick={() => onArticleClick(article)}
                        >
                            <div className="relative aspect-[16/10] overflow-hidden rounded-sm mb-6 shadow-sm border border-gray-100">
                                <img
                                    src={article.imageUrl}
                                    alt={article.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                {categoryName.toLowerCase() === 'videos' && (
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                                        <div className="bg-white/90 rounded-full p-2 transform transition-transform group-hover:scale-110">
                                            <svg className="w-5 h-5 text-[#EE6260] block" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                                        </div>
                                    </div>
                                )}
                                {article.premium && (
                                    <div className="absolute top-4 left-4 bg-[#EE6260] text-white px-2 py-0.5 text-[9px] font-black uppercase tracking-widest rounded-sm shadow-lg">
                                        PREMIUM
                                    </div>
                                )}
                            </div>
                            
                            <div className="flex-grow">
                                <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-3 flex items-center gap-2">
                                    {categoryName.toLowerCase() === 'news' && article.category ? (
                                        <>
                                            <span className="text-[#EE6260]">NEWS</span>
                                            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                            <span className="text-gray-400">{article.category.toUpperCase()}</span>
                                        </>
                                    ) : (
                                        <span className="text-[#EE6260]">{categoryName.toUpperCase()}</span>
                                    )}
                                    <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                    {article.date}
                                </p>
                                <h3 className="font-serif text-xl font-bold leading-tight mb-4 group-hover:text-[#EE6260] transition-colors">
                                    {article.title}
                                </h3>
                                {article.summary && (
                                    <p className="text-sm text-gray-600 line-clamp-3 mb-4 leading-relaxed">
                                        {article.summary}
                                    </p>
                                )}
                            </div>

                            <div className="flex items-center gap-2 pt-4 border-t border-gray-50">
                                <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-400">
                                    {article.author ? article.author.charAt(0) : 'B'}
                                </div>
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-tight">
                                    By <button
                                        onClick={(e) => handleAuthorClick(article.author || 'Brussels Signal', e)}
                                        className="hover:text-[#EE6260] transition-colors underline decoration-transparent hover:decoration-red-600"
                                    >
                                        {article.author || 'Brussels Signal'}
                                    </button>
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="py-20 text-center border-2 border-dashed border-gray-200 rounded-2xl">
                    <svg className="w-16 h-16 text-gray-300 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l4 4v10a2 2 0 01-2 2z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14 2v4h4"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 9h6m-6 4h6m-6 4h1"></path>
                    </svg>
                    <h2 className="text-2xl font-bold text-gray-400">No articles found in this category</h2>
                    <p className="text-gray-500 mt-2">We're constantly updating our database. Check back soon for new content.</p>
                </div>
            )}
        </div>
      </section>

      {/* Pagination Placeholder */}
      <section className="pb-20">
        <div className="container mx-auto px-4 lg:px-8">
            <div className="flex justify-center items-center gap-2">
                <button className="w-10 h-10 flex items-center justify-center rounded-sm bg-[#1a2a44] text-white font-bold">1</button>
                <button className="w-10 h-10 flex items-center justify-center rounded-sm bg-gray-100 text-gray-600 font-bold hover:bg-gray-200 transition">2</button>
                <button className="w-10 h-10 flex items-center justify-center rounded-sm bg-gray-100 text-gray-600 font-bold hover:bg-gray-200 transition">3</button>
                <span className="px-2">...</span>
                <button className="w-10 h-10 flex items-center justify-center rounded-sm bg-gray-100 text-gray-600 font-bold hover:bg-gray-200 transition">12</button>
            </div>
        </div>
      </section>
    </main>
  );
};

export default CategoryPage;
