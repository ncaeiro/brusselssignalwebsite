
import React from 'react';
import { NewsItem } from '../src/types.ts';
import { INTERFERENCE_PODCASTS, HORIZON_PODCASTS, HAMMER_TIME_PODCASTS } from '../src/data.ts';

interface PodcastCategoryPageProps {
  onPodcastClick: (article: NewsItem) => void;
}

const PodcastCategoryPage: React.FC<PodcastCategoryPageProps> = ({ onPodcastClick }) => {
  const PodcastSection = ({ 
    title, 
    hosts, 
    description, 
    episodes, 
    colorClass, 
    bgClass 
  }: { 
    title: string; 
    hosts: string; 
    description: string; 
    episodes: NewsItem[]; 
    colorClass: string; 
    bgClass: string; 
  }) => (
    <div className="mb-24">
      {/* Show Header */}
      <div className={`p-8 md:p-12 rounded-2xl ${bgClass} border border-white/5 shadow-xl mb-12 flex flex-col md:flex-row gap-8 items-center`}>
        <div className="w-48 h-48 flex-shrink-0 shadow-2xl rounded-lg overflow-hidden border-2 border-white/20">
          <img src={episodes[0]?.imageUrl} className="w-full h-full object-cover" alt={title} />
        </div>
        <div className="text-center md:text-left flex-grow">
          <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
            <span className={`text-xs font-black uppercase tracking-widest ${colorClass} bg-white px-2 py-0.5 rounded-sm`}>SERIES</span>
            <span className="w-1 h-1 bg-white/20 rounded-full"></span>
            <span className="text-[10px] text-white/60 font-bold uppercase tracking-widest">{episodes.length} EPISODES</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">{title}</h2>
          <p className="text-white/80 text-lg mb-6 max-w-2xl leading-relaxed italic">"{description}"</p>
          <div className="flex items-center justify-center md:justify-start gap-4">
             <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2-12.5v9l7-4.5-7-4.5z"/></svg>
             </div>
             <div>
               <p className="text-[10px] text-white/40 font-black uppercase tracking-widest leading-none">HOSTED BY</p>
               <p className="text-sm text-white font-bold">{hosts}</p>
             </div>
          </div>
        </div>
      </div>

      {/* Episode Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {episodes.map((ep) => (
          <div 
            key={ep.id} 
            className="group cursor-pointer bg-white border border-gray-100 p-4 rounded-xl shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
            onClick={() => onPodcastClick(ep)}
          >
            <div className="aspect-square relative overflow-hidden rounded-lg mb-4">
              <img src={ep.imageUrl} className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-700" alt={ep.title} />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors"></div>
              <div className="absolute bottom-3 right-3 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                <svg className={`w-5 h-5 ${colorClass.split(' ')[0]}`} fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              </div>
            </div>
            <p className="text-[10px] text-gray-400 font-bold mb-2 uppercase tracking-widest">{ep.date}</p>
            <h4 className="text-base font-bold leading-tight text-[#1a2a44] group-hover:text-red-600 transition-colors mb-3 line-clamp-2">
              {ep.title}
            </h4>
            <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
              {ep.summary}
            </p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <main className="flex-grow bg-[#f8fafc] pb-24">
      {/* Page Header */}
      <section className="bg-[#1a2a44] py-16 lg:py-24 relative overflow-hidden mb-16">
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
            <div className="inline-flex items-center gap-2 mb-6 px-3 py-1 bg-white/5 rounded-full border border-white/10">
                <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/><path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/></svg>
                <span className="text-[10px] text-white font-black uppercase tracking-[0.2em]">SIGNAL PODCAST NETWORK</span>
            </div>
            <h1 className="font-serif text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                Signals for the Ear.
            </h1>
            <p className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto leading-relaxed font-medium">
                Hard-hitting analysis, expert interviews, and the real story behind Brussels bureaucracy — all in one network.
            </p>
        </div>
      </section>

      <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
        {/* Interference Show */}
        <PodcastSection 
          title="Interference" 
          hosts="Justin Stares & Alexandra Phillips" 
          description="Tackling the most controversial topics in European politics with unfiltered honesty."
          episodes={INTERFERENCE_PODCASTS}
          colorClass="text-red-600"
          bgClass="bg-[#eb6761]"
        />

        {/* Horizon Podcast Show */}
        <PodcastSection 
          title="Horizon Podcast" 
          hosts="Ralph Schoellhammer" 
          description="Exploring the future of the continent and the strategic signals on the horizon."
          episodes={HORIZON_PODCASTS}
          colorClass="text-blue-600"
          bgClass="bg-[#1a2a44]"
        />

        {/* Hammer Time Show */}
        <PodcastSection 
          title="Hammer Time" 
          hosts="Ralph Schoellhammer" 
          description="Hard-hitting, direct analysis of current events with a sharp focus on bureaucratic failure."
          episodes={HAMMER_TIME_PODCASTS}
          colorClass="text-orange-600"
          bgClass="bg-[#24375a]"
        />
      </div>
    </main>
  );
};

export default PodcastCategoryPage;
