
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { NewsItem, VideoItem } from '../src/types.ts';
import { createAuthorSlug, getAuthorPhoto } from '../src/utils.ts';
import ReadingProgressBar from './ReadingProgressBar.tsx';

interface VideoArticleDetailProps {
  article: VideoItem;
  onRelatedVideoClick?: (article: NewsItem) => void;
}

const VideoArticleDetail: React.FC<VideoArticleDetailProps> = ({ article, onRelatedVideoClick }) => {
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
    <main className="flex-grow bg-white">
      <ReadingProgressBar />
      {/* Video Hero Section */}
      <section className="bg-[#0a111a] pt-6 pb-12 lg:pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-500 mb-6">
            <span className="hover:text-white cursor-pointer">Home</span>
            <span className="w-1 h-1 bg-gray-700 rounded-full"></span>
            <span className="text-[#EE6260]">Videos</span>
          </div>

          {/* Video Player Container */}
          <div className="max-w-6xl mx-auto">
            <div className="relative aspect-video bg-black rounded-lg overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/5">
              <img 
                src={article.imageUrl} 
                className="w-full h-full object-cover opacity-60" 
                alt={article.title} 
              />
              {/* Fake Video UI Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="bg-[#EE6260] text-white rounded-full p-6 shadow-2xl hover:scale-110 transition-transform group">
                  <svg className="w-10 h-10 block" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                </button>
              </div>
              
              {/* Bottom Controls Bar */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent flex items-center gap-4">
                 <button className="text-white"><svg className="w-6 h-6 block" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></button>
                 <div className="flex-grow h-1 bg-white/20 rounded-full relative">
                    <div className="absolute top-0 left-0 h-full w-1/3 bg-[#EE6260] rounded-full"></div>
                 </div>
                 <span className="text-[10px] font-bold text-white">1:24 / {article.duration || '3:00'}</span>
                 <button className="text-white"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414 1.414"></path></svg></button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content Section */}
      <section className="py-12 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-start gap-12 lg:gap-16">
            
            {/* Left Column: Article Body */}
            <div className="flex-grow">
              <div className="mb-6">
                <span className="bg-[#EE6260] text-white px-2 py-0.5 text-[10px] font-black uppercase tracking-widest rounded-sm">VIDEO REPORT</span>
                <span className="ml-4 text-[10px] text-gray-400 font-bold uppercase tracking-widest">{article.date}</span>
              </div>
              
              <h1 className="font-serif text-3xl md:text-5xl font-bold text-[#1a2a44] mb-8 leading-tight">
                {article.title}
              </h1>

              <div className="flex items-center gap-4 mb-10 pb-8 border-b border-gray-100 cursor-pointer group" onClick={handleAuthorClick}>
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-400 overflow-hidden">
                  {authorPhoto ? (
                    <img
                      src={authorPhoto}
                      alt={article.author}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    article.author ? article.author.charAt(0) : 'B'
                  )}
                </div>
                <div>
                  <p className="text-[11px] font-black text-[#EE6260] uppercase tracking-widest group-hover:text-[#d44947] transition-colors">
                    Presented by {article.author || 'Brussels Signal'}
                  </p>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">Lead Reporter & Video Editor</p>
                </div>
              </div>

              <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed font-serif">
                <p className="text-xl font-bold mb-6 text-gray-900 leading-snug italic">
                  In this exclusive Brussels Signal video report, we dive deep into the heart of {article.title.split(':')[0] || 'the latest developments'} to uncover the signals hidden beneath the surface of European politics.
                </p>
                
                <p className="mb-6">
                  BRUSSELS — The visual evidence presented in today's report highlights a significant escalation in the ongoing dialogue between the European Commission and member states. As captured in the footage, the mood at the latest summit was one of cautious urgency.
                </p>

                <p className="mb-6">
                  "What we are seeing on the ground is a direct reflection of the policies being drafted in the bubble," explains our lead analyst. "The disconnect between the legislative intent and the practical reality has never been more visible."
                </p>

                <h3 className="font-sans font-black text-xl text-[#1a2a44] mt-10 mb-4 uppercase tracking-tight">Key Insights from the Report</h3>
                <ul className="font-sans text-base space-y-4 mb-8">
                  <li className="flex gap-3">
                    <span className="text-[#EE6260] font-bold">01.</span>
                    <span>The rapid shift in public sentiment across the capitals of Europe following the latest energy directives.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#EE6260] font-bold">02.</span>
                    <span>How digital sovereignty is becoming the primary battleground for the next decade of industrial policy.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#EE6260] font-bold">03.</span>
                    <span>Exclusive interviews with MEPs who are challenging the status quo on migration and border security.</span>
                  </li>
                </ul>

                <p className="mb-6">
                  The video concludes with a look at the upcoming weeks, which promise to be some of the most consequential for the current administration. We will continue to follow these threads as they develop.
                </p>
              </div>
              
              {/* Action Bar */}
              <div className="mt-12 pt-8 border-t border-gray-100 flex items-center justify-between">
                <div className="flex gap-4">
                  <button className="flex items-center gap-2 px-4 py-2 bg-[#1a2a44] text-white text-[10px] font-bold uppercase rounded-sm hover:bg-[#EE6260] transition">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                    Save for Later
                  </button>
                  <button className="px-4 py-2 border border-gray-200 text-[#1a2a44] text-[10px] font-bold uppercase rounded-sm hover:bg-gray-50 transition">Share Video</button>
                </div>
              </div>
            </div>

            {/* Right Column: Sidebar */}
            <aside className="w-full md:w-80 lg:w-96 flex-shrink-0">
               <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 mb-8">
                  <h4 className="text-xs font-black uppercase text-gray-400 tracking-widest mb-6">More from the Series</h4>
                  <div className="space-y-6">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="group cursor-pointer">
                        <div className="aspect-video relative overflow-hidden rounded mb-3">
                           <img src={`https://picsum.photos/seed/relv${i}/400/225`} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                           <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <svg className="w-8 h-8 text-white block" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                           </div>
                        </div>
                        <h5 className="text-xs font-bold leading-tight group-hover:text-[#EE6260] transition-colors">The Future of European Defense: Part {i + 1}</h5>
                        <p className="text-[9px] text-gray-500 mt-1 uppercase font-bold">12 SEP 2025 • 4:20</p>
                      </div>
                    ))}
                  </div>
                  <button className="w-full mt-8 py-3 text-[10px] font-black uppercase text-[#1a2a44] border-2 border-[#1a2a44] rounded-sm hover:bg-[#1a2a44] hover:text-white transition-all">View All Videos</button>
               </div>
               
               <div className="bg-[#eb6761]/10 p-6 rounded-lg border border-[#eb6761]/20">
                  <h4 className="text-sm font-bold text-[#1a2a44] mb-2">Subscribe to Signal Video</h4>
                  <p className="text-xs text-gray-600 mb-4">Get notifications for new documentaries and interviews.</p>
                  <input type="email" placeholder="Your email address" className="w-full p-2 text-xs border border-gray-200 rounded mb-2" />
                  <button className="w-full py-2 bg-[#EE6260] text-white text-[10px] font-black uppercase rounded-sm">Subscribe</button>
               </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
};

export default VideoArticleDetail;
