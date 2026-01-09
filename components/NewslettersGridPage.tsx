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
            <div className="bg-[#f5e6d3] rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              {/* Header */}
              <div className="bg-[#1a2a44] text-white px-6 py-5 text-center">
                <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 bg-white/10 rounded-full">
                  <svg className="w-4 h-4 text-[#EE6260]" fill="currentColor" viewBox="0 0 24 24">
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
                    <img
                      src={import.meta.env.BASE_URL + "images/newsletter-card-icon-1.png"}
                      alt="Brussels Calling"
                      className="w-16 h-auto"
                    />
                  </div>
                  <div>
                    <p className="text-gray-700 text-xl leading-relaxed mb-8">
                      Political news, views and analysis from the heart of the European Union, the latest news on all things EU
                    </p>
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        <div className="mt-1 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                          <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>
                        </div>
                        <span className="text-gray-700 font-medium">Directly from EU institutions</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="mt-1 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                          <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>
                        </div>
                        <span className="text-gray-700 font-medium">Latest from industry lobbyists</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="mt-1 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                          <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>
                        </div>
                        <span className="text-gray-700 font-medium">Key legislative updates</span>
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
                  <button className="px-6 py-3 bg-[#EE6260] text-white font-bold text-sm rounded-lg hover:bg-[#d44947] transition flex-shrink-0">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>

            {/* Signal Horizon Card */}
            <div className="bg-[#f5e6d3] rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              {/* Header */}
              <div className="bg-[#1a2a44] text-white px-6 py-5 text-center">
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
                    <img
                      src={import.meta.env.BASE_URL + "images/newsletter-card-icon-2.png"}
                      alt="Signal Horizon"
                      className="w-16 h-auto"
                    />
                  </div>
                  <div>
                    <p className="text-gray-700 text-xl leading-relaxed mb-8">
                      Exclusive weekly newsletter analyzing emerging trends and shifts in politics, technology, all the EU
                    </p>
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        <div className="mt-1 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                          <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>
                        </div>
                        <span className="text-gray-700 font-medium">Long-form geopolitical analysis</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="mt-1 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                          <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>
                        </div>
                        <span className="text-gray-700 font-medium">Deep dives into technology</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="mt-1 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                          <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>
                        </div>
                        <span className="text-gray-700 font-medium">Cultural and societal trends</span>
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
                  <button className="px-6 py-3 bg-[#EE6260] text-white font-bold text-sm rounded-lg hover:bg-[#d44947] transition flex-shrink-0">
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
          <div className="flex items-center gap-3 mb-8">
            <h2 className="text-3xl font-bold text-[#1a2a44]">Decision - maker Newsletters</h2>
            <span className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-amber-400 to-yellow-500 text-[#1a2a44] text-xs font-black uppercase tracking-wider rounded-full shadow-md">
              Premium
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Brussels Calling Decision Maker */}
            <div className="bg-[#f5e6d3] rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow relative">
              {/* Premium Corner Ribbon */}
              <div className="absolute top-0 right-0 overflow-hidden w-24 h-24 z-10">
                <div className="absolute top-0 right-0 w-32 h-8 bg-gradient-to-br from-amber-400 to-yellow-500 transform rotate-45 translate-x-8 translate-y-4 shadow-lg">
                  <span className="text-[#1a2a44] text-[9px] font-black uppercase tracking-wider flex items-center justify-center h-full">Premium</span>
                </div>
              </div>
              {/* Header */}
              <div className="bg-[#1a2a44] text-white px-6 py-5 text-center">
                <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 bg-white/10 rounded-full">
                  <svg className="w-4 h-4 text-[#EE6260]" fill="currentColor" viewBox="0 0 24 24">
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
                    <img
                      src={import.meta.env.BASE_URL + "images/newsletter-card-icon-1.png"}
                      alt="Brussels Calling"
                      className="w-16 h-auto"
                    />
                  </div>
                  <div>
                    <p className="text-gray-700 text-xl leading-relaxed mb-8">
                      Political news, views and analysis from the heart of the European Union, the latest news on all things EU
                    </p>
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        <div className="mt-1 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                          <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>
                        </div>
                        <span className="text-gray-700 font-medium">Executive briefings</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="mt-1 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                          <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>
                        </div>
                        <span className="text-gray-700 font-medium">Policy impact analysis</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="mt-1 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                          <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>
                        </div>
                        <span className="text-gray-700 font-medium">Strategic insights</span>
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
                  <button className="px-6 py-3 bg-[#EE6260] text-white font-bold text-sm rounded-lg hover:bg-[#d44947] transition flex-shrink-0">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>

            {/* Signal Horizon Decision Maker */}
            <div className="bg-[#f5e6d3] rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow relative">
              {/* Premium Corner Ribbon */}
              <div className="absolute top-0 right-0 overflow-hidden w-24 h-24 z-10">
                <div className="absolute top-0 right-0 w-32 h-8 bg-gradient-to-br from-amber-400 to-yellow-500 transform rotate-45 translate-x-8 translate-y-4 shadow-lg">
                  <span className="text-[#1a2a44] text-[9px] font-black uppercase tracking-wider flex items-center justify-center h-full">Premium</span>
                </div>
              </div>
              {/* Header */}
              <div className="bg-[#1a2a44] text-white px-6 py-5 text-center">
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
                    <img
                      src={import.meta.env.BASE_URL + "images/newsletter-card-icon-2.png"}
                      alt="Signal Horizon"
                      className="w-16 h-auto"
                    />
                  </div>
                  <div>
                    <p className="text-gray-700 text-xl leading-relaxed mb-8">
                      Exclusive weekly newsletter analyzing emerging trends and shifts in politics, technology, all the EU
                    </p>
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        <div className="mt-1 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                          <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>
                        </div>
                        <span className="text-gray-700 font-medium">Strategic foresight reports</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="mt-1 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                          <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>
                        </div>
                        <span className="text-gray-700 font-medium">Market intelligence</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="mt-1 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                          <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>
                        </div>
                        <span className="text-gray-700 font-medium">Expert commentary</span>
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
                  <button className="px-6 py-3 bg-[#EE6260] text-white font-bold text-sm rounded-lg hover:bg-[#d44947] transition flex-shrink-0">
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
          <button className="px-10 py-4 bg-[#EE6260] text-white font-bold text-sm uppercase tracking-wider rounded-lg hover:bg-[#d44947] transition shadow-xl">
            Subscribe Now
          </button>
        </div>
      </section>
    </main>
  );
};

export default NewslettersGridPage;
