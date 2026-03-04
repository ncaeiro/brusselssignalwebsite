import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const QUICK_LINKS = [
  { label: 'Politics', path: '/category/politics' },
  { label: 'Economy', path: '/category/economy' },
  { label: 'Society', path: '/category/society' },
  { label: 'World', path: '/category/world' },
  { label: 'Commentary', path: '/category/commentary' },
];

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/category/politics?search=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <main className="flex-grow">

      {/* Hero */}
      <section className="bg-[#1a2a44] text-white py-24 text-center relative overflow-hidden">
        {/* Subtle background accents */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[#EE6260]/5 skew-x-[-15deg] translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-1/4 h-full bg-white/3 skew-x-[15deg] -translate-x-1/2 pointer-events-none" />

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          {/* Error code */}
          <span className="block text-[8rem] md:text-[10rem] font-black leading-none text-[#EE6260] tracking-tighter mb-2 select-none">
            404
          </span>

          <h1 className="text-2xl md:text-4xl font-bold text-white mb-4">
            Page Not Found
          </h1>

          <p className="text-gray-300 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            The page you're looking for doesn't exist or may have been moved.
            Try searching or browse our latest coverage below.
          </p>

          {/* Search */}
          <form onSubmit={handleSearch} className="flex max-w-md mx-auto mb-10 rounded-lg overflow-hidden shadow-xl">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search Brussels Signal…"
              className="flex-1 px-5 py-4 text-gray-900 bg-white text-base outline-none placeholder-gray-400"
            />
            <button
              type="submit"
              className="px-6 py-4 bg-[#EE6260] hover:bg-[#d44947] text-white font-semibold text-sm transition-colors whitespace-nowrap"
            >
              Search
            </button>
          </form>

          {/* Quick links */}
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              to="/"
              className="px-5 py-2.5 bg-[#EE6260] hover:bg-[#d44947] text-white text-sm font-semibold rounded transition-colors"
            >
              Back to Homepage
            </Link>
            {QUICK_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="px-5 py-2.5 border border-white/30 hover:border-white/70 hover:bg-white/10 text-white text-sm font-medium rounded transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
};

export default NotFoundPage;
