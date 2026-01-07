import React from 'react';

const NewslettersGridPage: React.FC = () => {
  return (
    <main className="flex-grow bg-white">
      {/* Header Section */}
      <section className="bg-white py-12 border-b border-gray-200">
        <div className="container mx-auto px-4 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-[#1a2a44] mb-4">Our email Newsletters</h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Stay informed with Brussels Signal, which challenges the status quo and brings fresh perspectives straight to your inbox
          </p>
        </div>
      </section>

      {/* Observer Newsletters Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-3xl font-bold text-[#1a2a44] mb-8">Observer Newsletters</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Brussels Calling Card */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              {/* Header */}
              <div className="bg-[#1a2a44] text-white px-6 py-8 text-center">
                <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 bg-white/10 rounded-full">
                  <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                  <span className="text-[10px] font-black uppercase tracking-wider">Daily Brief</span>
                </div>
                <h3 className="text-2xl font-bold mb-2">Brussels Calling</h3>
                <p className="text-sm text-white/80">Essential news, views and analysis</p>
              </div>

              {/* Body */}
              <div className="p-6 bg-[#f5e6d3]">
                <div className="flex items-start gap-4 mb-6">
                  <div className="flex-shrink-0">
                    <svg className="w-12 h-12 text-[#1a2a44]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-700 text-sm leading-relaxed mb-4">
                      Political news, views and analysis from the heart of the European Union, the latest news on all things EU
                    </p>
                    <ul className="text-xs text-gray-600 space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 mt-0.5">•</span>
                        <span>Directly from EU institutions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 mt-0.5">•</span>
                        <span>Latest from industry lobbyists</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 mt-0.5">•</span>
                        <span>Key legislative updates</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="flex-grow px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 ring-red-500 outline-none text-sm"
                  />
                  <button className="px-6 py-3 bg-red-600 text-white font-bold text-sm rounded-lg hover:bg-red-700 transition flex-shrink-0">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>

            {/* Signal Horizon Card */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              {/* Header */}
              <div className="bg-[#1a2a44] text-white px-6 py-8 text-center">
                <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 bg-white/10 rounded-full">
                  <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                  <span className="text-[10px] font-black uppercase tracking-wider">Weekly Strategy</span>
                </div>
                <h3 className="text-2xl font-bold mb-2">Signal Horizon</h3>
                <p className="text-sm text-white/80">Future of trends shaping all the EU</p>
              </div>

              {/* Body */}
              <div className="p-6 bg-[#f5e6d3]">
                <div className="flex items-start gap-4 mb-6">
                  <div className="flex-shrink-0">
                    <svg className="w-12 h-12 text-[#1a2a44]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.364-6.364l-.707-.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M16.95 7.05a7 7 0 00-9.9 0m9.9 9.9a7 7 0 01-9.9 0"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-700 text-sm leading-relaxed mb-4">
                      Exclusive weekly newsletter analyzing emerging trends and shifts in politics, technology, all the EU
                    </p>
                    <ul className="text-xs text-gray-600 space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 mt-0.5">•</span>
                        <span>Long-form geopolitical analysis</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 mt-0.5">•</span>
                        <span>Deep dives into technology</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 mt-0.5">•</span>
                        <span>Cultural and societal trends</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="flex-grow px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 ring-red-500 outline-none text-sm"
                  />
                  <button className="px-6 py-3 bg-red-600 text-white font-bold text-sm rounded-lg hover:bg-red-700 transition flex-shrink-0">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Decision-maker Newsletters Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-3xl font-bold text-[#1a2a44] mb-8">Decision - maker Newsletters</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Brussels Calling Decision Maker */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              {/* Header */}
              <div className="bg-[#1a2a44] text-white px-6 py-8 text-center">
                <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 bg-white/10 rounded-full">
                  <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                  <span className="text-[10px] font-black uppercase tracking-wider">Daily Brief</span>
                </div>
                <h3 className="text-2xl font-bold mb-2">Brussels Calling</h3>
                <p className="text-sm text-white/80">Powering up aspects of European policy makers and analysts</p>
              </div>

              {/* Body */}
              <div className="p-6 bg-[#f5e6d3]">
                <div className="flex items-start gap-4 mb-6">
                  <div className="flex-shrink-0">
                    <svg className="w-12 h-12 text-[#1a2a44]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-700 text-sm leading-relaxed mb-4">
                      Political news, views and analysis from the heart of the European Union, the latest news on all things EU
                    </p>
                    <ul className="text-xs text-gray-600 space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 mt-0.5">•</span>
                        <span>Executive briefings</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 mt-0.5">•</span>
                        <span>Policy impact analysis</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 mt-0.5">•</span>
                        <span>Strategic insights</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="flex-grow px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 ring-red-500 outline-none text-sm"
                  />
                  <button className="px-6 py-3 bg-red-600 text-white font-bold text-sm rounded-lg hover:bg-red-700 transition flex-shrink-0">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>

            {/* Signal Horizon Decision Maker */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              {/* Header */}
              <div className="bg-[#1a2a44] text-white px-6 py-8 text-center">
                <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 bg-white/10 rounded-full">
                  <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                  <span className="text-[10px] font-black uppercase tracking-wider">Weekly Strategy</span>
                </div>
                <h3 className="text-2xl font-bold mb-2">Signal Horizon</h3>
                <p className="text-sm text-white/80">Future of trends shaping all the EU</p>
              </div>

              {/* Body */}
              <div className="p-6 bg-[#f5e6d3]">
                <div className="flex items-start gap-4 mb-6">
                  <div className="flex-shrink-0">
                    <svg className="w-12 h-12 text-[#1a2a44]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-700 text-sm leading-relaxed mb-4">
                      Exclusive weekly newsletter analyzing emerging trends and shifts in politics, technology, all the EU
                    </p>
                    <ul className="text-xs text-gray-600 space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 mt-0.5">•</span>
                        <span>Strategic foresight reports</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 mt-0.5">•</span>
                        <span>Market intelligence</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 mt-0.5">•</span>
                        <span>Expert commentary</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="flex-grow px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 ring-red-500 outline-none text-sm"
                  />
                  <button className="px-6 py-3 bg-red-600 text-white font-bold text-sm rounded-lg hover:bg-red-700 transition flex-shrink-0">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 bg-[#1a2a44] text-white text-center">
        <div className="container mx-auto px-4 lg:px-8">
          <h3 className="text-3xl font-bold mb-4">Stay ahead with Brussels Signal</h3>
          <p className="text-white/70 mb-8 max-w-2xl mx-auto">
            Join thousands of readers who trust us for independent European news and analysis
          </p>
          <button className="px-10 py-4 bg-red-600 text-white font-bold text-sm uppercase tracking-wider rounded-lg hover:bg-red-700 transition shadow-xl">
            Subscribe Now
          </button>
        </div>
      </section>
    </main>
  );
};

export default NewslettersGridPage;
