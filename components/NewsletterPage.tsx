import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NewsletterPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [subscribeToBrussels, setSubscribeToBrussels] = useState(true);
  const [subscribeToHorizon, setSubscribeToHorizon] = useState(true);

  const handleSubscribe = () => {
    navigate('/complete-account');
  };

  const canSubmit = true;

  return (
    <main className="flex-grow bg-white">
      {/* Hero Section */}
      <section className="bg-[#1a2a44] text-white py-20 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-500 via-transparent to-transparent"></div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 mb-6 px-3 py-1 bg-white/5 rounded-full border border-white/10">
            <svg className="w-4 h-4 text-[#EE6260]" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
            <span className="text-[10px] text-white font-black uppercase tracking-[0.2em]">STAY SIGNALED</span>
          </div>
          <h1 className="font-serif text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            The Signal in Your Inbox.
          </h1>
          <p className="text-lg md:text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed font-medium">
            Expert analysis and the most important European news, delivered exactly when you need it.
          </p>
        </div>
      </section>

      {/* Brussels Calling Section */}
      <section id="brussels-calling" className="py-24 border-b border-gray-100">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="w-full lg:w-1/2">
              <div className="relative aspect-[4/5] max-w-md mx-auto shadow-2xl rounded-xl overflow-hidden border-8 border-gray-100 transform -rotate-2 hover:rotate-0 transition-transform duration-500">
                <img
                  src={import.meta.env.BASE_URL + "images/brussels-calling-newsletter-mockup-1.png"}
                  className="w-full h-full object-cover object-top"
                  alt="Brussels Calling Newsletter Preview"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a2a44]/80 to-transparent flex flex-col justify-end p-8">
                  <h4 className="text-white font-serif text-3xl font-bold mb-2">Brussels Calling</h4>
                  <p className="text-white/80 text-sm">Your daily morning essential.</p>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <span className="text-[#EE6260] font-black text-xs uppercase tracking-[0.3em] mb-4 block">DAILY BRIEFING</span>
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
                      <svg className="w-3 h-3 text-[#EE6260]" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>
                    </div>
                    <span className="text-gray-700 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#subscribe"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#EE6260] text-white font-black text-xs uppercase tracking-widest rounded hover:bg-[#d44947] transition shadow"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                SUBSCRIBE FREE
              </a>
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
                <img
                  src={import.meta.env.BASE_URL + "images/signal-horizon-newsletter-mockup-1.png"}
                  className="w-full h-full object-cover object-top"
                  alt="Signal Horizon Newsletter Preview"
                />
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
              <a
                href="#subscribe"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#1a2a44] text-white font-black text-xs uppercase tracking-widest rounded hover:bg-[#24375a] transition shadow"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                SUBSCRIBE FREE
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Unified Subscribe Section */}
      <section id="subscribe" className="py-20 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 lg:px-8 max-w-2xl text-center">
          <svg className="w-8 h-8 text-[#EE6260] mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
          <h3 className="text-3xl font-bold text-[#1a2a44] mb-3 whitespace-nowrap">Register and get access to our newsletters for free</h3>
          <p className="text-gray-500 mb-8">Choose one or both — one email address is all you need.</p>

          {/* Newsletter toggles */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button
              onClick={() => setSubscribeToBrussels(!subscribeToBrussels)}
              className={`flex items-center gap-3 px-6 py-4 rounded-xl border-2 font-bold text-sm transition-all ${
                subscribeToBrussels
                  ? 'border-[#EE6260] bg-red-50 text-[#1a2a44]'
                  : 'border-gray-200 bg-white text-gray-400'
              }`}
            >
              <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                subscribeToBrussels ? 'bg-[#EE6260] border-[#EE6260]' : 'border-gray-300'
              }`}>
                {subscribeToBrussels && (
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>
                )}
              </div>
              <span>Brussels Calling</span>
              <span className="text-[10px] font-black uppercase tracking-wider text-gray-400">Daily</span>
            </button>

            <button
              onClick={() => setSubscribeToHorizon(!subscribeToHorizon)}
              className={`flex items-center gap-3 px-6 py-4 rounded-xl border-2 font-bold text-sm transition-all ${
                subscribeToHorizon
                  ? 'border-blue-500 bg-blue-50 text-[#1a2a44]'
                  : 'border-gray-200 bg-white text-gray-400'
              }`}
            >
              <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                subscribeToHorizon ? 'bg-blue-500 border-blue-500' : 'border-gray-300'
              }`}>
                {subscribeToHorizon && (
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>
                )}
              </div>
              <span>Signal Horizon</span>
              <span className="text-[10px] font-black uppercase tracking-wider text-gray-400">Weekly</span>
            </button>
          </div>

          {/* Single email input */}
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && canSubmit && handleSubscribe()}
              className="flex-grow px-4 py-4 rounded-xl border border-gray-300 focus:ring-2 ring-[#EE6260] outline-none text-sm"
            />
            <button
              onClick={handleSubscribe}
              className="px-8 py-4 font-black text-xs uppercase tracking-widest rounded-xl transition flex-shrink-0 bg-[#EE6260] text-white hover:bg-[#d44947] shadow-lg"
            >
              Subscribe
            </button>
          </div>
          <p className="text-[11px] text-gray-400 mt-4">Free. No spam. Unsubscribe anytime.</p>
        </div>
      </section>

      {/* Incentives Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-8">
          <h3 className="text-center font-serif text-4xl font-bold mb-16">Why register?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-[#EE6260]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.364-6.364l-.707-.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M12 7a5 5 0 015 5 5 5 0 01-5 5 5 5 0 01-5-5 5 5 0 015-5z"/></svg>
              </div>
              <h4 className="font-bold text-xl mb-4">Independent Analysis</h4>
              <p className="text-gray-600">Unfiltered reporting that challenges the status quo in Brussels and beyond.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-[#EE6260]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 2m6-2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              </div>
              <h4 className="font-bold text-xl mb-4">Time Efficiency</h4>
              <p className="text-gray-600">The most important stories curated and condensed into a single readable format.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-[#EE6260]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"/></svg>
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
          <h3 className="text-3xl font-bold mb-8">Register / Create your account</h3>
          <p className="text-white/60 mb-10 max-w-xl mx-auto">Get access to our newsletters for free. Join our growing community of readers today.</p>
          <a href="#subscribe" className="inline-block px-10 py-5 bg-[#EE6260] text-white font-black text-sm uppercase tracking-widest rounded hover:bg-[#d44947] transition shadow-xl">
            CREATE FREE ACCOUNT
          </a>
        </div>
      </section>
    </main>
  );
};

export default NewsletterPage;
