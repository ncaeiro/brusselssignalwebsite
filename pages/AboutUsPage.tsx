import React from 'react';

const AboutUsPage: React.FC = () => {
  return (
    <main className="flex-grow bg-white">
      {/* Hero Header Section */}
      <section className="bg-[#1a2a44] text-white py-20 lg:py-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[#EE6260]/10 skew-x-[-15deg] translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-1/4 h-full bg-blue-500/5 skew-x-[15deg] -translate-x-1/2"></div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight max-w-5xl">
            About Brussels Signal
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl font-medium leading-relaxed">
            Shaking up the status quo with news and commentary from the European Union's capital.
          </p>
        </div>
      </section>

      {/* Challenging the Status Quo Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
          <h2 className="text-[#EE6260] font-black text-2xl uppercase tracking-[0.3em] mb-4">Challenging the Status Quo</h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-700 leading-relaxed mb-8">
              Brussels Signal delivers reporting that questions prevailing ideas and policies, demands accountability from decision-makers, and counters the groupthink that shuts out critical voices on the questions confronting the Europe of today and tomorrow.
            </p>
            <p className="text-lg font-semibold text-[#1a2a44] mb-6">Several ideas inspire our approach:</p>
            <ul className="space-y-5 mb-8">
              <li className="flex items-start gap-4">
                <span className="text-[#EE6260] font-bold mt-1 text-xl leading-none">•</span>
                <span className="text-lg text-gray-700 leading-relaxed">
                  We are fundamentally sceptical of big government institutions unaccountable to their citizens. Just as all government should serve the people, the European Union should serve the citizens of Europe and remain true to the spirit and letter of the basic treaties.
                </span>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-[#EE6260] font-bold mt-1 text-xl leading-none">•</span>
                <span className="text-lg text-gray-700 leading-relaxed">
                  Ideas matter, Europe matters, and we aim to reinvigorate debate on the political, economic and cultural issues that confront today's Europe.
                </span>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-[#EE6260] font-bold mt-1 text-xl leading-none">•</span>
                <span className="text-lg text-gray-700 leading-relaxed">
                  Journalism should serve the public at large, concerned with the quality of life, the future of Europe and its people. We are not merely a news site. We provoke, we entertain, we provide cultural reference and a window into the events that shape our daily lives.
                </span>
              </li>
            </ul>
            <p className="text-lg text-gray-700 leading-relaxed">
              These ideas appeal to a broad audience, people like you who are looking for a challenging alternative to today's media echo chamber. Join us!
            </p>
          </div>
        </div>
      </section>

      {/* Press Freedom & Editorial Independence Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
          <h2 className="text-[#EE6260] font-black text-sm uppercase tracking-[0.3em] mb-4">Press Freedom & Editorial Independence</h2>
          <h3 className="text-4xl md:text-5xl font-bold text-[#1a2a44] mb-8 tracking-tight">On Press Freedom and Editorial Independence at Brussels Signal</h3>
          <div className="prose prose-lg max-w-none space-y-6">
            <p className="text-lg text-gray-700 leading-relaxed">
              We launched Brussels Signal in 2023 with a mission to refresh the landscape of news media in Europe, to challenge the status quo with reporting and commentary that questions prevailing ideas and policies, demands accountability from decision-makers, and counters the group think that shuts out critical voices. In today's media environment, press freedom and pluralism are as important as ever, and we aim to provide a credible alternative, free to encourage honest, open debate and candid discourse on new ideas and old, especially those that go against the grain.
            </p>

            <div>
              <h4 className="text-xl font-bold text-[#1a2a44] mb-3">Commitment to Independent Journalism</h4>
              <p className="text-lg text-gray-700 leading-relaxed">
                In pursuing that mission, we stand firm in our commitment at Brussels Signal to journalistic integrity and editorial independence. Editorial decisions are made in the newsroom by our editorial team – autonomously, guided solely by a dedication to truth, accuracy, and the public interest. No external influence—whether from political entities, advertisers, or other powerful interests—will compromise our editorial integrity. We are resolutely committed to challenging the status quo, questioning prevailing ideas, and demanding accountability from decision-makers across Europe.
              </p>
            </div>

            <div>
              <h4 className="text-xl font-bold text-[#1a2a44] mb-3">Upholding Our Values</h4>
              <p className="text-lg text-gray-700 leading-relaxed">
                Inspired by our core beliefs, we approach journalism with a healthy scepticism of big government institutions that lack accountability to their citizens. We believe that government, including the institutions of the European Union and its member state governments, must serve the people. Our reporting is driven by the conviction that ideas matter and that Europe's future hinges on open, vigorous debate on the political, economic, and cultural issues of our time.
              </p>
            </div>

            <div>
              <h4 className="text-xl font-bold text-[#1a2a44] mb-3">Accountability and Serving the Public Interest</h4>
              <p className="text-lg text-gray-700 leading-relaxed">
                We pledge to maintain transparency in our editorial processes and to hold ourselves accountable to our readers. We will correct our mistakes promptly and openly, ensuring that our audience can trust the information we provide. Journalism at Brussels Signal is more than the delivery of news; it is a service to the public, concerned with the quality of life and the future of Europe and its peoples. We provoke, we entertain, and we offer a cultural lens through which our readers can view the events that shape our daily lives. We are dedicated to providing a challenging alternative to the media echo chamber, offering diverse perspectives that enrich the public discourse.
              </p>
            </div>

            <div>
              <h4 className="text-xl font-bold text-[#1a2a44] mb-3">Our Independence, Your Trust</h4>
              <p className="text-lg text-gray-700 leading-relaxed">
                By affirming our editorial independence, we aim to build and maintain the trust of our readers. We believe that a free and independent press is essential to a healthy democracy – and to the future of Europe – and we are committed to upholding these principles in every piece of content we produce.
              </p>
            </div>

            <p className="text-lg text-gray-700 leading-relaxed font-medium italic">
              Join us in this endeavour, as we strive to reinvigorate the debate on Europe's most pressing issues and to serve as a beacon of independent thought in the crowded media landscape.
            </p>

            <p className="text-base text-gray-500 font-semibold">
              Patrick Egan, Publisher, Founder &amp; CEO, Remedia Europe
            </p>
          </div>
        </div>
      </section>

      {/* Publisher / Contact Section */}
      <section className="py-20 bg-[#1a2a44] text-white">
        <div className="container mx-auto px-4 lg:px-8 text-center max-w-4xl">
          <h3 className="text-3xl md:text-4xl font-bold mb-6">Brussels Signal is published by</h3>
          <p className="text-xl text-gray-300 mb-2 font-semibold">Remedia Europe SRL</p>
          <p className="text-gray-400 mb-1">Rue Montoyer 40</p>
          <p className="text-gray-400 mb-6">Brussels 1000</p>
          <p className="text-gray-300 font-semibold mb-2">Contact Us:</p>
          <a href="mailto:contact@brusselssignal.eu" className="text-[#EE6260] hover:text-white transition-colors block mb-1">
            contact@brusselssignal.eu
          </a>
          <p className="text-gray-400">+32 2 733 4450</p>
        </div>
      </section>
    </main>
  );
};

export default AboutUsPage;
