import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ALL_ARTICLES } from '../src/data.ts';
import { NewsItem } from '../src/types.ts';
import { createSlug } from '../src/utils.ts';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<NewsItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isOpen) {
      setSearchQuery('');
      setSearchResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (searchQuery.trim().length < 2) {
      setSearchResults([]);
      return;
    }

    const query = searchQuery.toLowerCase();
    const results = ALL_ARTICLES.filter(article =>
      article.title.toLowerCase().includes(query) ||
      article.fullContent?.toLowerCase().includes(query) ||
      article.author?.toLowerCase().includes(query) ||
      article.tags?.some(tag => tag.toLowerCase().includes(query)) ||
      article.category?.toLowerCase().includes(query)
    );

    setSearchResults(results.slice(0, 20)); // Limit to 20 results
  }, [searchQuery]);

  const handleArticleClick = (article: NewsItem) => {
    const slug = createSlug(article.title);

    if (article.category === 'Videos') {
      navigate(`/video/${slug}`);
    } else if (article.category === 'Podcasts') {
      navigate(`/podcast/${slug}`);
    } else {
      navigate(`/article/${slug}`);
    }

    onClose();
    window.scrollTo(0, 0);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100] flex items-start justify-center pt-20 px-4 animate-fadeIn" onClick={onClose}>
      <div className="bg-white/95 backdrop-blur-md rounded-lg shadow-2xl w-full max-w-3xl max-h-[80vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
        {/* Search Header */}
        <div className="p-6 border-b border-gray-200/50">
          <div className="flex items-center gap-4">
            <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles, authors, topics..."
              className="flex-1 text-lg outline-none bg-transparent text-gray-900 placeholder:text-gray-400"
              autoFocus
            />
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>

        {/* Search Results */}
        <div className="flex-1 overflow-y-auto p-6">
          {searchQuery.trim().length < 2 && (
            <div className="text-center py-12">
              <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
              <p className="text-gray-500 text-lg">Start typing to search articles...</p>
            </div>
          )}

          {searchQuery.trim().length >= 2 && searchResults.length === 0 && (
            <div className="text-center py-12">
              <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <p className="text-gray-500 text-lg">No results found for "{searchQuery}"</p>
              <p className="text-gray-400 text-sm mt-2">Try different keywords or check your spelling</p>
            </div>
          )}

          {searchResults.length > 0 && (
            <div className="space-y-4">
              <p className="text-sm text-gray-500 font-bold uppercase tracking-wider mb-4">
                {searchResults.length} {searchResults.length === 1 ? 'Result' : 'Results'} Found
              </p>

              {searchResults.map((article) => (
                <div
                  key={article.id}
                  onClick={() => handleArticleClick(article)}
                  className="flex gap-4 p-4 rounded-lg hover:bg-white/60 cursor-pointer transition group"
                >
                  {article.imageUrl && (
                    <div className="w-32 h-20 flex-shrink-0 rounded overflow-hidden">
                      <img
                        src={article.imageUrl}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold text-[#EE6260] uppercase">{article.category}</span>
                      <span className="text-[10px] text-gray-400">{article.date}</span>
                    </div>

                    <h3 className="font-bold text-sm leading-snug mb-1 text-gray-900 group-hover:text-[#EE6260] transition line-clamp-2">
                      {article.title}
                    </h3>

                    {article.author && (
                      <p className="text-xs text-gray-600">By {article.author}</p>
                    )}

                    {article.tags && article.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {article.tags.slice(0, 3).map((tag, idx) => (
                          <span key={idx} className="text-[9px] px-2 py-0.5 bg-gray-100 text-gray-600 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200/50 bg-gray-50/50 backdrop-blur-sm">
          <div className="flex items-center justify-between text-xs text-gray-600">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <kbd className="px-2 py-1 bg-white/80 border border-gray-300 rounded text-[10px]">ESC</kbd>
                to close
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-2 py-1 bg-white/80 border border-gray-300 rounded text-[10px]">↑</kbd>
                <kbd className="px-2 py-1 bg-white/80 border border-gray-300 rounded text-[10px]">↓</kbd>
                to navigate
              </span>
            </div>
            <span>{searchResults.length > 0 && `Showing ${searchResults.length} of ${ALL_ARTICLES.length} articles`}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
