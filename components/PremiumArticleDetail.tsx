
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { NewsItem } from '../src/types.ts';
import { createAuthorSlug, getAuthorPhoto } from '../src/utils.ts';
import ReadingProgressBar from './ReadingProgressBar.tsx';

interface PremiumArticleDetailProps {
  article: NewsItem;
  onSignInClick?: () => void;
}

const PremiumArticleDetail: React.FC<PremiumArticleDetailProps> = ({ article, onSignInClick }) => {
  const navigate = useNavigate();
  const authorPhoto = getAuthorPhoto(article.author || '');

  const handleAuthorClick = () => {
    if (article.author) {
      const authorSlug = createAuthorSlug(article.author);
      navigate(`/author/${authorSlug}`);
      window.scrollTo(0, 0);
    }
  };
  const commonFeatures = [
    "Full access to daily news ad-free",
    "Unlimited access to premium articles",
    "Brussels Calling newsletter and premium newsletter",
    "Full commenting access on all articles"
  ];

  return (
    <main className="bg-white flex-grow">
      <ReadingProgressBar />
      {/* Premium Gradient Bar */}
      <div className="bg-gradient-to-r from-[#1a2a44] to-[#121c2d] py-1"></div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-10 lg:py-16">
        <div className="max-w-4xl mx-auto">
          {/* Premium Badge */}
          <div className="mb-6 flex items-center gap-3">
            <span className="bg-red-600 text-white px-3 py-1 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                PREMIUM CONTENT
            </span>
            <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">{article.date}</span>
          </div>

          <h1 className="font-serif text-4xl md:text-6xl font-bold leading-tight mb-8 text-[#121c2d]">
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
                  article.author?.charAt(0) || 'B'
                )}
              </div>
              <div>
                <p className="text-xs font-black text-red-600 uppercase tracking-widest group-hover:text-red-700 transition-colors">
                  {article.author || 'Brussels Signal Staff'}
                </p>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tight">Contributing Editor</p>
              </div>
            </div>
            
            <div className="flex gap-3">
               <button className="px-4 py-2 bg-[#1a2a44] text-white text-[10px] font-bold uppercase rounded-sm hover:bg-red-600 transition">Save Article</button>
               <button className="p-2 border border-gray-200 rounded-sm hover:bg-gray-50 transition"><div className="w-4 h-4 bg-gray-400/30 rounded-full"></div></button>
            </div>
          </div>

          <figure className="mb-12 relative">
            <img 
              src={article.imageUrl} 
              alt={article.title} 
              className="w-full h-[500px] object-cover rounded shadow-xl brightness-90" 
            />
          </figure>

          {/* Visible Intro */}
          <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed font-serif relative">
            <p className="text-2xl font-bold text-gray-900 mb-8 leading-snug first-letter:text-7xl first-letter:font-bold first-letter:text-red-600 first-letter:mr-3 first-letter:float-left">
              The debate surrounding the future of European integration has reached a critical juncture. As political tides shift across the continent, the traditional consensus that has governed Brussels for decades is being challenged like never before.
            </p>

            <p className="mb-6">
              Across the capitals of Europe, from Paris to Warsaw, the conversation is no longer about "if" change is coming, but "how" it will manifest. The recent developments in energy policy and migration have exposed fault lines that were previously papered over with diplomatic platitudes.
            </p>

            <p className="mb-6">
              "We must acknowledge that the old formulas are no longer sufficient," says one high-ranking official who requested anonymity. "The voters are signaling a desire for a return to national sovereignty, while the global challenges we face—climate change, AI, and an increasingly assertive East—demand a unified response. This is the paradox of our time."
            </p>

            {/* Paywall Overlay */}
            <div className="relative pt-12 pb-24">
                <div className="absolute inset-x-0 bottom-0 top-0 bg-gradient-to-t from-white via-white/95 to-transparent z-10"></div>
                
                <p className="mb-6 blur-[1px] select-none opacity-40">
                  The economic implications of this shift are profound. We are seeing a move away from the neoliberal models that dominated the post-Cold War era. Industrial policy is back in fashion, but with a distinctly protectionist flavor. This has massive repercussions for the single market, which has long been the crown jewel of the European project.
                </p>
                <p className="mb-6 blur-[2px] select-none opacity-20">
                  Furthermore, the role of international institutions is being redefined. The WTO is largely paralyzed, and the UN's effectiveness is increasingly questioned in a multi-polar world. Europe must decide if it wants to be a third power pole or if it will inevitably gravitate towards one of the two main orbits.
                </p>

                {/* Subscription Card */}
                <div className="relative z-20 mt-[-60px] max-w-7xl mx-auto bg-[#1a2a44] text-white p-8 md:p-16 rounded-xl shadow-2xl border border-white/10">
                    <div className="text-center mb-10">
                        <div className="inline-block p-4 bg-red-600 rounded-full mb-6">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                        </div>
                        <h2 className="text-3xl font-bold mb-4 font-sans uppercase tracking-tight">Unlock Premium Content</h2>
                        <p className="text-gray-300 text-lg mb-4 font-sans max-w-2xl mx-auto">
                            Support independent European journalism and get unlimited access to all our reporting, analysis, and member-only benefits.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 text-left">
                        {/* Plan 1: The Curious Reader */}
                        <div className="bg-white/5 p-6 rounded-lg border border-white/10 flex flex-col hover:border-white/30 transition-all">
                            <h3 className="text-lg font-bold text-white mb-2 font-sans">The Curious Reader</h3>
                            <p className="text-xs text-gray-400 mb-6 min-h-[32px]">Discover independent European coverage for one month</p>
                            <div className="flex items-baseline gap-1 mb-6 border-b border-white/10 pb-4">
                                <span className="text-3xl font-black">9,99€</span>
                                <span className="text-gray-400 text-sm">/month</span>
                            </div>
                            <ul className="text-[11px] space-y-3 text-gray-300 mb-8 flex-grow">
                                {commonFeatures.map((f, i) => (
                                    <li key={i} className="flex items-start gap-2">
                                        <span className="text-red-500 font-bold">✓</span>
                                        <span>{f}</span>
                                    </li>
                                ))}
                            </ul>
                            <button className="w-full py-3 bg-white text-[#1a2a44] font-black text-xs uppercase tracking-widest rounded-sm hover:bg-red-600 hover:text-white transition-all">
                                Unlock further insights
                            </button>
                        </div>

                        {/* Plan 2: The Insider */}
                        <div className="bg-red-600/10 p-6 rounded-lg border-2 border-red-600 flex flex-col relative scale-105 shadow-2xl z-10">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-red-600 text-white px-4 py-1 text-[10px] font-black rounded uppercase tracking-widest whitespace-nowrap">
                                RECOMMENDED
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2 font-sans">The Insider</h3>
                            <p className="text-xs text-red-100/70 mb-6 min-h-[32px]">Three months of unfiltered Brussels reporting</p>
                            <div className="flex items-baseline gap-1 mb-6 border-b border-red-600/30 pb-4">
                                <span className="text-4xl font-black">12,99€</span>
                                <span className="text-red-200/60 text-sm">/3 months</span>
                            </div>
                            <ul className="text-[11px] space-y-3 text-gray-100 mb-8 flex-grow">
                                {commonFeatures.map((f, i) => (
                                    <li key={i} className="flex items-start gap-2">
                                        <span className="text-red-500 font-bold">✓</span>
                                        <span className="font-medium">{f}</span>
                                    </li>
                                ))}
                            </ul>
                            <button className="w-full py-4 bg-red-600 text-white font-black text-xs uppercase tracking-widest rounded-sm hover:bg-red-700 transition-all shadow-xl">
                                Become an insider
                            </button>
                        </div>

                        {/* Plan 3: The Decision-Maker */}
                        <div className="bg-white/5 p-6 rounded-lg border border-white/10 flex flex-col hover:border-white/30 transition-all">
                            <h3 className="text-lg font-bold text-white mb-2 font-sans">The Decision-Maker</h3>
                            <p className="text-xs text-gray-400 mb-6 min-h-[32px]">365 days of reporting that holds decision-makers accountable</p>
                            <div className="flex items-baseline gap-1 mb-6 border-b border-white/10 pb-4">
                                <span className="text-3xl font-black">79€</span>
                                <span className="text-gray-400 text-sm">/1 year</span>
                            </div>
                            <ul className="text-[11px] space-y-3 text-gray-300 mb-8 flex-grow">
                                {commonFeatures.map((f, i) => (
                                    <li key={i} className="flex items-start gap-2">
                                        <span className="text-red-500 font-bold">✓</span>
                                        <span>{f}</span>
                                    </li>
                                ))}
                                <li className="flex items-start gap-2 text-gray-200">
                                    <span className="text-red-500 font-bold">✓</span>
                                    <span>Save over 30% compared to monthly</span>
                                </li>
                            </ul>
                            <button className="w-full py-3 bg-white text-[#1a2a44] font-black text-xs uppercase tracking-widest rounded-sm hover:bg-red-600 hover:text-white transition-all">
                                Take the lead
                            </button>
                        </div>
                    </div>

                    <p className="text-xs text-gray-400 text-center">
                        Already have an account? <button onClick={onSignInClick} className="text-white hover:underline font-bold">Sign in here</button>.
                    </p>
                </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default PremiumArticleDetail;
