
import React from 'react';

const NewsletterPage: React.FC = () => {
  return (
    <main className="flex-grow bg-white">
      {/* Hero Section */}
      <section className="bg-[#1a2a44] text-white py-20 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-500 via-transparent to-transparent"></div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
            <div className="inline-flex items-center gap-2 mb-6 px-3 py-1 bg-white/5 rounded-full border border-white/10">
                <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                <span className="text-[10px] text-white font-black uppercase tracking-[0.2em]">STAY SIGNALED</span>
            </div>
            <h1 className="font-serif text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                The Signal in Your Inbox.
            </h1>
            <p className="text-lg md:text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed font-medium mb-12">
                Expert analysis and the most important European news, delivered exactly when you need it.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
                <a href="#brussels-calling" className="px-8 py-4 bg-red-600 text-white font-black text-xs uppercase tracking-widest rounded shadow-lg hover:bg-red-700 transition">BRUSSELS CALLING</a>
                <a href="#signal-horizon" className="px-8 py-4 bg-white text-[#1a2a44] font-black text-xs uppercase tracking-widest rounded shadow-lg hover:bg-gray-100 transition">SIGNAL HORIZON</a>
            </div>
        </div>
      </section>

      {/* Brussels Calling Section */}
      <section id="brussels-calling" className="py-24 border-b border-gray-100">
        <div className="container mx-auto px-4 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-16 items-center">
                <div className="w-full lg:w-1/2">
                    <div className="relative aspect-[4/5] max-w-md mx-auto shadow-2xl rounded-xl overflow-hidden border-8 border-gray-100 transform -rotate-2 hover:rotate-0 transition-transform duration-500">
                        <img src="https://picsum.photos/seed/newsletter_calling/600/800" className="w-full h-full object-cover" alt="Brussels Calling Newsletter Preview" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1a2a44]/80 to-transparent flex flex-col justify-end p-8">
                             <h4 className="text-white font-serif text-3xl font-bold mb-2">Brussels Calling</h4>
                             <p className="text-white/80 text-sm">Your daily morning essential.</p>
                        </div>
                    </div>
                </div>
                <div className="w-full lg:w-1/2">
                    <span className="text-red-600 font-black text-xs uppercase tracking-[0.3em] mb-4 block">DAILY BRIEFING</span>
                    <h2 className="text-4xl md:text-5xl font-bold text-[#1a2a44] mb-6 tracking-tight">Brussels Calling</h2>
                    <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                        Start your day with the must-read briefing for anyone interested in European politics. We cut through the noise to bring you the stories that will define the day in the EU capital.
                    </p>
                    
                    <ul className="space-y-4 mb-10">
                        {[
                            "Directly from the EU bubble institutions",
                            "The latest from industry lobbyists and policymakers",
                            "Key legislative updates and what they mean for you",
                            "Curated reading list of European news"
                        ].map((item, i) => (
                            <li key={i} className="flex items-start gap-3">
                                <div className="mt-1 w-5 h-5 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                                    <svg className="w-3 h-3 text-red-600" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>
                                </div>
                                <span className="text-gray-700 font-medium">{item}</span>
                            </li>
                        ))}
                    </ul>

                    <div className="bg-gray-50 p-8 rounded-xl border border-gray-200 mb-8">
                        <h4 className="font-bold text-[#1a2a44] mb-4">Join 25,000+ European professionals</h4>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <input type="email" placeholder="Your email address" className="flex-grow px-4 py-3 rounded border border-gray-300 focus:ring-2 ring-red-500 outline-none" />
                            <button className="px-8 py-3 bg-red-600 text-white font-black text-xs uppercase tracking-widest rounded hover:bg-red-700 transition">SUBSCRIBE</button>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <button className="text-xs font-black text-[#1a2a44] hover:text-red-600 flex items-center gap-2 transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                            VIEW LATEST EDITION
                        </button>
                        <div className="w-px h-4 bg-gray-300"></div>
                        <p className="text-[10px] text-gray-400 font-bold uppercase">Daily at 08:30 CET</p>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Signal Horizon Section */}
      <section id="signal-horizon" className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-8">
            <div className="flex flex-col lg:flex-row-reverse gap-16 items-center">
                <div className="w-full lg:w-1/2">
                    <div className="relative aspect-[4/5] max-w-md mx-auto shadow-2xl rounded-xl overflow-hidden border-8 border-white transform rotate-2 hover:rotate-0 transition-transform duration-500">
                        <img src="https://picsum.photos/seed/newsletter_horizon/600/800" className="w-full h-full object-cover" alt="Signal Horizon Newsletter Preview" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#24375a]/90 to-transparent flex flex-col justify-end p-8">
                             <h4 className="text-white font-serif text-3xl font-bold mb-2">Signal Horizon</h4>
                             <p className="text-white/80 text-sm">Deep strategic analysis.</p>
                        </div>
                    </div>
                </div>
                <div className="w-full lg:w-1/2">
                    <span className="text-blue-600 font-black text-xs uppercase tracking-[0.3em] mb-4 block">WEEKLY STRATEGY</span>
                    <h2 className="text-4xl md:text-5xl font-bold text-[#1a2a44] mb-6 tracking-tight">Signal Horizon</h2>
                    <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                        Go beyond the headlines with our weekly strategic briefing. We explore the geopolitical trends, technological shifts, and cultural signals that will shape the continent's future.
                    </p>
                    
                    <ul className="space-y-4 mb-10">
                        {[
                            "Long-form geopolitical analysis",
                            "Deep dives into emerging technology and defense",
                            "Cultural shifts and societal trends in Europe",
                            "Exclusive guest contributions from leading experts"
                        ].map((item, i) => (
                            <li key={i} className="flex items-start gap-3">
                                <div className="mt-1 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                                    <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>
                                </div>
                                <span className="text-gray-700 font-medium">{item}</span>
                            </li>
                        ))}
                    </ul>

                    <div className="bg-white p-8 rounded-xl border border-gray-200 mb-8 shadow-sm">
                        <h4 className="font-bold text-[#1a2a44] mb-4">Strategic insights for decision makers</h4>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <input type="email" placeholder="Your email address" className="flex-grow px-4 py-3 rounded border border-gray-300 focus:ring-2 ring-blue-500 outline-none" />
                            <button className="px-8 py-3 bg-[#1a2a44] text-white font-black text-xs uppercase tracking-widest rounded hover:bg-blue-900 transition">SUBSCRIBE</button>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <button className="text-xs font-black text-[#1a2a44] hover:text-blue-600 flex items-center gap-2 transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                            VIEW LATEST EDITION
                        </button>
                        <div className="w-px h-4 bg-gray-300"></div>
                        <p className="text-[10px] text-gray-400 font-bold uppercase">Every Friday morning</p>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Incentives Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
            <h3 className="text-center font-serif text-4xl font-bold mb-16">Why subscribe to the Signal?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="text-center">
                    <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.364-6.364l-.707-.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M12 7a5 5 0 015 5 5 5 0 01-5 5 5 5 0 01-5-5 5 5 0 015-5z"/></svg>
                    </div>
                    <h4 className="font-bold text-xl mb-4">Independent Analysis</h4>
                    <p className="text-gray-600">Unfiltered reporting that challenges the status quo in Brussels and beyond.</p>
                </div>
                <div className="text-center">
                    <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 2m6-2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                    </div>
                    <h4 className="font-bold text-xl mb-4">Time Efficiency</h4>
                    <p className="text-gray-600">The most important stories curated and condensed into a single readable format.</p>
                </div>
                <div className="text-center">
                    <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"/></svg>
                    </div>
                    <h4 className="font-bold text-xl mb-4">Exclusive Insights</h4>
                    <p className="text-gray-600">Signals and developments before they reach the mainstream press cycle.</p>
                </div>
            </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-[#1a2a44] text-white text-center">
         <div className="container mx-auto px-4 lg:px-8">
            <h3 className="text-3xl font-bold mb-8">Ready to navigate the European landscape?</h3>
            <p className="text-white/60 mb-10 max-w-xl mx-auto">Join our growing community of readers today. You can unsubscribe at any time with one click.</p>
            <button className="px-10 py-5 bg-red-600 text-white font-black text-sm uppercase tracking-widest rounded hover:bg-red-700 transition shadow-xl">
                GET THE SIGNALS
            </button>
         </div>
      </section>
    </main>
  );
};

export default NewsletterPage;
