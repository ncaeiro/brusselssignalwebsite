import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ALL_ARTICLES } from '../src/data.ts';
import { createAuthorSlug, getAuthorPhoto } from '../src/utils.ts';

const AUTHORS_DATA = [
  {
    name: 'Krzysztof Mularczyk',
    bio: 'Senior political correspondent covering European affairs and Eastern Europe.',
    expertise: ['Politics', 'Eastern Europe', 'EU Affairs']
  },
  {
    name: 'Carl Deconinck',
    bio: 'Investigative journalist specializing in EU institutions and transparency.',
    expertise: ['Investigations', 'EU Institutions', 'Transparency']
  },
  {
    name: 'Claire Lemaire',
    bio: 'Economics and finance reporter covering the Eurozone and EU economic policy.',
    expertise: ['Economics', 'Finance', 'Eurozone']
  },
  {
    name: 'Chris Gattringer',
    bio: 'Correspondent focusing on trade, tech policy, and digital regulation.',
    expertise: ['Tech Policy', 'Trade', 'Digital Regulation']
  },
  {
    name: 'Chris Nelson',
    bio: 'Reporter covering society, migration, and civil liberties in Europe.',
    expertise: ['Society', 'Migration', 'Civil Liberties']
  },
  {
    name: 'Luca Steinmann',
    bio: 'Analyst covering security, extremism, and international relations.',
    expertise: ['Security', 'Analysis', 'International Relations']
  },
  {
    name: 'Kevin Myers',
    bio: 'Political commentator and columnist focusing on European politics.',
    expertise: ['Commentary', 'Politics', 'Analysis']
  },
  {
    name: 'Rafael Pinto Borges',
    bio: 'Reporter covering European politics and international affairs.',
    expertise: ['Politics', 'International Affairs', 'News']
  }
];

const AuthorsPage: React.FC = () => {
  const navigate = useNavigate();

  const getAuthorArticleCount = (authorName: string): number => {
    return ALL_ARTICLES.filter(
      article => article.author?.toLowerCase() === authorName.toLowerCase()
    ).length;
  };

  const handleAuthorClick = (authorName: string) => {
    const authorSlug = createAuthorSlug(authorName);
    navigate(`/author/${authorSlug}`);
    window.scrollTo(0, 0);
  };
  return (
    <main className="flex-grow container mx-auto px-4 md:px-6 lg:px-8 py-12">
      {/* Page Header */}
      <div className="mb-12 border-b-2 border-red-600 pb-6">
        <h1 className="text-4xl md:text-5xl font-black text-[#1a2a44] mb-3 tracking-tight">Our Authors</h1>
        <p className="text-lg text-gray-600 max-w-3xl">
          Meet the journalists and analysts behind Brussels Signal's independent reporting on European affairs,
          politics, economy, and society.
        </p>
      </div>

      {/* Authors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {AUTHORS_DATA.map((author, index) => {
          const authorPhoto = getAuthorPhoto(author.name);
          const articleCount = getAuthorArticleCount(author.name);

          return (
            <div
              key={index}
              onClick={() => handleAuthorClick(author.name)}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group cursor-pointer"
            >
              {/* Author Image */}
              <div className="relative h-64 overflow-hidden bg-gray-100">
                {authorPhoto ? (
                  <img
                    src={authorPhoto}
                    alt={author.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-600 text-white text-6xl font-bold">
                    {author.name.charAt(0)}
                  </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <h2 className="text-2xl font-bold text-white mb-1">{author.name}</h2>
                  <p className="text-sm text-gray-300 font-semibold">
                    {articleCount} {articleCount === 1 ? 'article' : 'articles'}
                  </p>
                </div>
              </div>

              {/* Author Info */}
              <div className="p-6">
                <p className="text-gray-700 text-sm leading-relaxed mb-4">
                  {author.bio}
                </p>

                {/* Expertise Tags */}
                <div className="flex flex-wrap gap-2">
                  {author.expertise.map((skill, idx) => (
                    <span
                      key={idx}
                      className="bg-red-50 text-red-700 text-xs font-bold px-3 py-1 rounded-full border border-red-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <div className="mt-16 bg-[#1a2a44] rounded-lg p-8 text-center">
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
          Join our team of independent journalists
        </h3>
        <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
          Brussels Signal is always looking for talented writers and analysts passionate about European affairs.
        </p>
        <button className="bg-red-600 text-white px-8 py-3 font-bold text-sm uppercase tracking-wider rounded hover:bg-red-700 transition-colors">
          Contact Us
        </button>
      </div>
    </main>
  );
};

export default AuthorsPage;
