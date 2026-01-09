import React from 'react';

const PartnerWithUsPage: React.FC = () => {
  return (
    <main className="flex-grow bg-white">
      {/* Hero Header Section */}
      <section className="bg-[#1a2a44] text-white py-20 lg:py-32 relative overflow-hidden">
        {/* Abstract background elements */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[#EE6260]/10 skew-x-[-15deg] translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-1/4 h-full bg-blue-500/5 skew-x-[15deg] -translate-x-1/2"></div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight max-w-5xl">
            Partner With Brussels Signal
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl font-medium leading-relaxed">
            Reach an engaged European audience that values independent thinking, accountability, and open debate.
          </p>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
          <h2 className="text-[#EE6260] font-black text-sm uppercase tracking-[0.3em] mb-4">Who We Are</h2>
          <h3 className="text-4xl md:text-5xl font-bold text-[#1a2a44] mb-6 tracking-tight">Who We Are</h3>
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-700 leading-relaxed mb-6">
              Brussels Signal is an independent European news platform launched in 2023 to challenge the status quo in media and public debate.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              We provide reporting and commentary that questions prevailing ideas and policies, demands accountability from decision-makers, and counters the groupthink that too often excludes critical voices from discussions shaping Europe's future.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Our audience turns to Brussels Signal because honest debate and reflection matters.
            </p>
          </div>
        </div>
      </section>

      {/* Partnership Opportunities Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-[#EE6260] font-black text-sm uppercase tracking-[0.3em] mb-4">Work With Us</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-[#1a2a44] mb-6 tracking-tight">Partnership Opportunities</h3>
          </div>

          <div className="space-y-12">
            {/* Advertising */}
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-gray-200">
              <div className="flex items-start gap-6">
                <div className="hidden md:flex w-16 h-16 bg-[#EE6260] rounded-full items-center justify-center flex-shrink-0">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="flex-grow">
                  <h4 className="text-2xl md:text-3xl font-bold text-[#1a2a44] mb-4">Advertising</h4>
                  <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                    We offer high-visibility advertising placements across our website, providing brands with access to a politically and culturally engaged readership.
                  </p>
                  <p className="text-gray-600 font-semibold mb-3">Formats include:</p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-3">
                      <span className="text-[#EE6260] font-bold mt-1">•</span>
                      <span>Display advertising</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#EE6260] font-bold mt-1">•</span>
                      <span>Section sponsorships</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#EE6260] font-bold mt-1">•</span>
                      <span>Premium placements alongside trusted journalism</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Newsletter Sponsorship */}
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-gray-200">
              <div className="flex items-start gap-6">
                <div className="hidden md:flex w-16 h-16 bg-[#EE6260] rounded-full items-center justify-center flex-shrink-0">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                </div>
                <div className="flex-grow">
                  <h4 className="text-2xl md:text-3xl font-bold text-[#1a2a44] mb-4">Newsletter Sponsorship</h4>
                  <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                    Feature your organisation in our newsletter, delivered directly to a dedicated subscriber base.
                  </p>
                  <p className="text-gray-600 font-semibold mb-3">Options include:</p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-3">
                      <span className="text-[#EE6260] font-bold mt-1">•</span>
                      <span>Newsletter sponsorship</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#EE6260] font-bold mt-1">•</span>
                      <span>Sponsored messages</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Subscriptions & Content Partnerships */}
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-gray-200">
              <div className="flex items-start gap-6">
                <div className="hidden md:flex w-16 h-16 bg-[#EE6260] rounded-full items-center justify-center flex-shrink-0">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="flex-grow">
                  <h4 className="text-2xl md:text-3xl font-bold text-[#1a2a44] mb-4">Subscriptions & Content Partnerships</h4>
                  <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                    We work with partners on clearly labelled sponsored content and subscription-based collaborations that align with our audience's interests and uphold our editorial standards.
                  </p>
                  <p className="text-gray-600 font-semibold mb-3">This includes:</p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-3">
                      <span className="text-[#EE6260] font-bold mt-1">•</span>
                      <span>Sponsored articles and interviews</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#EE6260] font-bold mt-1">•</span>
                      <span>Thematic content series</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#EE6260] font-bold mt-1">•</span>
                      <span>Long-form features</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-20 bg-[#1a2a44] text-white">
        <div className="container mx-auto px-4 lg:px-8 text-center max-w-4xl">
          <h3 className="text-3xl md:text-4xl font-bold mb-6">Ready to Partner With Us?</h3>
          <p className="text-xl text-gray-300 mb-10 leading-relaxed">
            Get in touch to discuss how we can work together to reach our engaged European audience.
          </p>
          <a
            href="mailto:partnerships@brusselssignal.eu"
            className="inline-block bg-[#EE6260] text-white px-10 py-4 font-black text-sm uppercase tracking-widest rounded hover:bg-[#d44947] transition-all shadow-lg"
          >
            Contact Us
          </a>
        </div>
      </section>
    </main>
  );
};

export default PartnerWithUsPage;
