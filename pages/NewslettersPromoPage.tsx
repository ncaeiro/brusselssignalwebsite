import React, { useState } from 'react';

const NewslettersPromoPage: React.FC = () => {
  const [observerEmail, setObserverEmail] = useState('');
  const [decisionMakerEmail, setDecisionMakerEmail] = useState('');

  const handleObserverSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Observer newsletter subscription:', observerEmail);
    // Add subscription logic here
  };

  const handleDecisionMakerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Decision-maker newsletter subscription:', decisionMakerEmail);
    // Add subscription logic here
  };

  return (
    <main className="flex-grow bg-white">
      {/* Header Section */}
      <section className="bg-white py-16 border-b border-gray-200">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl text-center">
          <h1 className="text-5xl md:text-6xl font-black text-[#1a2a44] mb-6 tracking-tight">
            Our email Newsletters
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Stay informed with expert analysis and the most important European news,
            delivered directly to your inbox. Choose the newsletter that fits your needs.
          </p>
        </div>
      </section>

      {/* Observer Newsletters Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a2a44] mb-3">
              Observer Newsletters
            </h2>
            <p className="text-lg text-gray-600">
              For those who want to stay informed about European affairs
            </p>
          </div>

          <div className="space-y-8">
            {/* Brussels Calling Card */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Image Section */}
              <div className="relative h-80 md:h-auto overflow-hidden">
                <img
                  src={`${import.meta.env.BASE_URL}images/featured-article.png`}
                  alt="Brussels Calling Newsletter"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-red-600 text-white px-3 py-1 text-xs font-black uppercase tracking-widest rounded">
                    Daily
                  </span>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-8 md:p-10 flex flex-col justify-between">
                <div>
                  <h3 className="text-3xl font-bold text-[#1a2a44] mb-4">
                    Brussels Calling
                  </h3>
                  <p className="text-gray-700 text-base leading-relaxed mb-6">
                    Start your day with the must-read briefing for anyone interested in European politics.
                    We cut through the noise to bring you the stories that will define the day in the EU capital.
                  </p>

                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                      <span className="text-gray-700 text-sm">Daily updates from EU institutions</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                      <span className="text-gray-700 text-sm">Key legislative updates</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                      <span className="text-gray-700 text-sm">Curated reading list</span>
                    </li>
                  </ul>

                  <p className="text-xs text-gray-500 font-semibold mb-6">
                    Delivered every weekday at 08:30 CET
                  </p>
                </div>

                {/* Subscribe Form */}
                <form onSubmit={handleObserverSubmit} className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    value={observerEmail}
                    onChange={(e) => setObserverEmail(e.target.value)}
                    placeholder="Your email"
                    required
                    className="flex-grow px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent text-sm"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 bg-red-600 text-white font-bold text-xs uppercase tracking-wider rounded-md hover:bg-red-700 transition-colors whitespace-nowrap"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
            </div>

            {/* Signal Horizon Card - Observer */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
              <div className="grid md:grid-cols-2 gap-0">
                {/* Content Section */}
                <div className="p-8 md:p-10 flex flex-col justify-between order-2 md:order-1">
                  <div>
                    <h3 className="text-3xl font-bold text-[#1a2a44] mb-4">
                      Signal Horizon
                    </h3>
                    <p className="text-gray-700 text-base leading-relaxed mb-6">
                      Go beyond the headlines with our weekly strategic briefing. We explore the geopolitical trends,
                      technological shifts, and cultural signals that will shape the continent's future.
                    </p>

                    <ul className="space-y-3 mb-8">
                      <li className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                        </svg>
                        <span className="text-gray-700 text-sm">Long-form geopolitical analysis</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                        </svg>
                        <span className="text-gray-700 text-sm">Deep dives into emerging technology</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                        </svg>
                        <span className="text-gray-700 text-sm">Exclusive expert contributions</span>
                      </li>
                    </ul>

                    <p className="text-xs text-gray-500 font-semibold mb-6">
                      Delivered every Friday morning
                    </p>
                  </div>

                  {/* Subscribe Form */}
                  <form onSubmit={handleObserverSubmit} className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="email"
                      value={observerEmail}
                      onChange={(e) => setObserverEmail(e.target.value)}
                      placeholder="Your email"
                      required
                      className="flex-grow px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm"
                    />
                    <button
                      type="submit"
                      className="px-6 py-3 bg-blue-600 text-white font-bold text-xs uppercase tracking-wider rounded-md hover:bg-blue-700 transition-colors whitespace-nowrap"
                    >
                      Subscribe
                    </button>
                  </form>
                </div>

                {/* Image Section */}
                <div className="relative h-80 md:h-auto overflow-hidden order-1 md:order-2">
                  <img
                    src={`${import.meta.env.BASE_URL}images/featured-article.png`}
                    alt="Signal Horizon Newsletter"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-blue-600 text-white px-3 py-1 text-xs font-black uppercase tracking-widest rounded">
                      Weekly
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Decision-maker Newsletters Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a2a44] mb-3">
              Decision-maker Newsletters
            </h2>
            <p className="text-lg text-gray-600">
              In-depth strategic analysis for professionals and decision makers
            </p>
          </div>

          <div className="space-y-8">
            {/* Brussels Calling Card - Decision-maker */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
              <div className="grid md:grid-cols-2 gap-0">
                {/* Image Section */}
                <div className="relative h-80 md:h-auto overflow-hidden">
                  <img
                    src={`${import.meta.env.BASE_URL}images/featured-article.png`}
                    alt="Brussels Calling Newsletter"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-red-600 text-white px-3 py-1 text-xs font-black uppercase tracking-widest rounded">
                      Daily
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-8 md:p-10 flex flex-col justify-between">
                  <div>
                    <h3 className="text-3xl font-bold text-[#1a2a44] mb-4">
                      Brussels Calling
                    </h3>
                    <p className="text-gray-700 text-base leading-relaxed mb-6">
                      Start your day with the must-read briefing for anyone interested in European politics.
                      We cut through the noise to bring you the stories that will define the day in the EU capital.
                    </p>

                    <ul className="space-y-3 mb-8">
                      <li className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                        </svg>
                        <span className="text-gray-700 text-sm">Daily updates from EU institutions</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                        </svg>
                        <span className="text-gray-700 text-sm">Key legislative updates</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                        </svg>
                        <span className="text-gray-700 text-sm">Curated reading list</span>
                      </li>
                    </ul>

                    <p className="text-xs text-gray-500 font-semibold mb-6">
                      Delivered every weekday at 08:30 CET
                    </p>
                  </div>

                  {/* Subscribe Form */}
                  <form onSubmit={handleDecisionMakerSubmit} className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="email"
                      value={decisionMakerEmail}
                      onChange={(e) => setDecisionMakerEmail(e.target.value)}
                      placeholder="Your email"
                      required
                      className="flex-grow px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent text-sm"
                    />
                    <button
                      type="submit"
                      className="px-6 py-3 bg-red-600 text-white font-bold text-xs uppercase tracking-wider rounded-md hover:bg-red-700 transition-colors whitespace-nowrap"
                    >
                      Subscribe
                    </button>
                  </form>
                </div>
              </div>
            </div>

            {/* Signal Horizon Card - Decision-maker */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Content Section */}
              <div className="p-8 md:p-10 flex flex-col justify-between order-2 md:order-1">
                <div>
                  <h3 className="text-3xl font-bold text-[#1a2a44] mb-4">
                    Signal Horizon
                  </h3>
                  <p className="text-gray-700 text-base leading-relaxed mb-6">
                    Go beyond the headlines with our weekly strategic briefing. We explore the geopolitical trends,
                    technological shifts, and cultural signals that will shape the continent's future.
                  </p>

                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                      <span className="text-gray-700 text-sm">Long-form geopolitical analysis</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                      <span className="text-gray-700 text-sm">Deep dives into emerging technology</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                      <span className="text-gray-700 text-sm">Exclusive expert contributions</span>
                    </li>
                  </ul>

                  <p className="text-xs text-gray-500 font-semibold mb-6">
                    Delivered every Friday morning
                  </p>
                </div>

                {/* Subscribe Form */}
                <form onSubmit={handleDecisionMakerSubmit} className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    value={decisionMakerEmail}
                    onChange={(e) => setDecisionMakerEmail(e.target.value)}
                    placeholder="Your email"
                    required
                    className="flex-grow px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 bg-[#1a2a44] text-white font-bold text-xs uppercase tracking-wider rounded-md hover:bg-blue-900 transition-colors whitespace-nowrap"
                  >
                    Subscribe
                  </button>
                </form>
              </div>

              {/* Image Section */}
              <div className="relative h-80 md:h-auto overflow-hidden order-1 md:order-2">
                <img
                  src={`${import.meta.env.BASE_URL}images/featured-article.png`}
                  alt="Signal Horizon Newsletter"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-blue-600 text-white px-3 py-1 text-xs font-black uppercase tracking-widest rounded">
                    Weekly
                  </span>
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Subscribe Section */}
      <section className="py-16 bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
          <h3 className="text-3xl font-bold text-[#1a2a44] mb-12 text-center">
            Why subscribe to Brussels Signal?
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h4 className="text-lg font-bold text-[#1a2a44] mb-3">Independent Analysis</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                Unfiltered reporting that challenges the status quo in Brussels and beyond
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h4 className="text-lg font-bold text-[#1a2a44] mb-3">Time Efficiency</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                The most important stories curated and condensed into a single readable format
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
              </div>
              <h4 className="text-lg font-bold text-[#1a2a44] mb-3">Exclusive Insights</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                Signals and developments before they reach the mainstream press cycle
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-[#1a2a44] text-white text-center">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to stay informed?
          </h3>
          <p className="text-white/70 text-lg mb-8">
            Join thousands of European professionals who trust Brussels Signal for their daily news
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <a
              href="#observer"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-8 py-4 bg-red-600 text-white font-bold text-xs uppercase tracking-wider rounded-md hover:bg-red-700 transition-colors"
            >
              Subscribe Now
            </a>
            <a
              href="/subscriptions"
              className="px-8 py-4 bg-white text-[#1a2a44] font-bold text-xs uppercase tracking-wider rounded-md hover:bg-gray-100 transition-colors"
            >
              View Plans
            </a>
          </div>
          <p className="text-white/50 text-xs mt-6">
            Free to subscribe. Unsubscribe anytime with one click.
          </p>
        </div>
      </section>
    </main>
  );
};

export default NewslettersPromoPage;
