
import React from 'react';

interface SubscriptionPlansProps {
  onPlanSelect: () => void;
}

const SubscriptionPlans: React.FC<SubscriptionPlansProps> = ({ onPlanSelect }) => {
  const commonFeatures = [
    "Full access to daily news ad-free",
    "Unlimited access to premium articles",
    "Brussels Calling newsletter and premium newsletter",
    "Full commenting access on all articles"
  ];

  return (
    <main className="flex-grow bg-[#f8fafc]">
      {/* Hero Header Section */}
      <section className="bg-[#1a2a44] text-white py-20 lg:py-32 relative overflow-hidden">
        {/* Abstract background elements */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[#EE6260]/10 skew-x-[-15deg] translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-1/4 h-full bg-blue-500/5 skew-x-[15deg] -translate-x-1/2"></div>
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight max-w-5xl mx-auto">
                A Different Brussels Story Starts Here
            </h1>
            <p className="text-lg md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12 font-medium">
                Register for full access to daily news, plus explore premium reporting with a free trial.
            </p>
            <div className="flex justify-center gap-4">
                <div className="w-16 h-1 bg-[#EE6260]"></div>
                <div className="w-16 h-1 bg-white/20"></div>
                <div className="w-16 h-1 bg-white/20"></div>
            </div>
        </div>
      </section>

      {/* Main Pitch Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8 text-center mb-16">
            <h2 className="text-[#EE6260] font-black text-sm uppercase tracking-[0.3em] mb-4">More Access. More Insights. More Transparency.</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-[#1a2a44] mb-6 tracking-tight">Unlock a Different Brussels.</h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Choose your plan to get unlimited premium access and support independent journalism.
            </p>
        </div>

        <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                
                {/* Plan 1: The Curious Reader */}
                <div className="bg-white border border-gray-200 rounded-2xl p-8 flex flex-col shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <div className="mb-6">
                        <h4 className="text-xl font-bold text-[#1a2a44] mb-2">The Curious Reader</h4>
                        <p className="text-xs text-gray-500 font-medium h-10">Discover independent European coverage for one month</p>
                    </div>
                    <div className="flex items-baseline gap-1 mb-8">
                        <span className="text-5xl font-black text-[#1a2a44]">9,99€</span>
                        <span className="text-gray-400 font-bold">/month</span>
                    </div>
                    <ul className="space-y-4 mb-10 flex-grow">
                        {commonFeatures.map((f, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                                <svg className="w-5 h-5 text-[#EE6260] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                {f}
                            </li>
                        ))}
                    </ul>
                    <button 
                        onClick={onPlanSelect}
                        className="w-full py-4 border-2 border-[#1a2a44] text-[#1a2a44] font-black text-xs uppercase tracking-widest rounded-lg hover:bg-[#1a2a44] hover:text-white transition-all"
                    >
                        Unlock further insights
                    </button>
                </div>

                {/* Plan 2: The Insider */}
                <div className="bg-white border-2 border-[#EE6260] rounded-2xl p-8 flex flex-col shadow-2xl relative scale-105 z-10">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#EE6260] text-white px-6 py-1.5 text-[10px] font-black rounded-full uppercase tracking-[0.2em]">
                        Recommended
                    </div>
                    <div className="mb-6">
                        <h4 className="text-xl font-bold text-[#1a2a44] mb-2">The Insider</h4>
                        <p className="text-xs text-gray-500 font-medium h-10">Three months of unfiltered Brussels reporting</p>
                    </div>
                    <div className="flex items-baseline gap-1 mb-8">
                        <span className="text-5xl font-black text-[#1a2a44]">13,99€</span>
                        <span className="text-gray-400 font-bold">/3 months</span>
                    </div>
                    <ul className="space-y-4 mb-10 flex-grow">
                        {commonFeatures.map((f, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm text-gray-700 font-medium">
                                <svg className="w-5 h-5 text-[#EE6260] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                {f}
                            </li>
                        ))}
                    </ul>
                    <button 
                        onClick={onPlanSelect}
                        className="w-full py-4 bg-[#EE6260] text-white font-black text-xs uppercase tracking-widest rounded-lg hover:bg-[#d44947] transition-all shadow-lg"
                    >
                        Become an insider
                    </button>
                </div>

                {/* Plan 3: The Decision-Maker */}
                <div className="bg-white border border-gray-200 rounded-2xl p-8 flex flex-col shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <div className="mb-6">
                        <h4 className="text-xl font-bold text-[#1a2a44] mb-2">The Decision-Maker</h4>
                        <p className="text-xs text-gray-500 font-medium h-10">365 days of reporting that holds decision-makers accountable</p>
                    </div>
                    <div className="flex items-baseline gap-1 mb-8">
                        <span className="text-5xl font-black text-[#1a2a44]">89€</span>
                        <span className="text-gray-400 font-bold">/year</span>
                    </div>
                    <ul className="space-y-4 mb-10 flex-grow">
                        {commonFeatures.map((f, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                                <svg className="w-5 h-5 text-[#EE6260] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                {f}
                            </li>
                        ))}
                        <li className="flex items-start gap-3 text-sm text-[#EE6260] font-bold">
                            <svg className="w-5 h-5 text-[#EE6260] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                            Save 35% over monthly billing
                        </li>
                    </ul>
                    <button 
                        onClick={onPlanSelect}
                        className="w-full py-4 border-2 border-[#1a2a44] text-[#1a2a44] font-black text-xs uppercase tracking-widest rounded-lg hover:bg-[#1a2a44] hover:text-white transition-all"
                    >
                        Take the lead
                    </button>
                </div>
            </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 bg-gray-50 border-y border-gray-200">
        <div className="container mx-auto px-4 lg:px-8 text-center">
            <h4 className="text-xs font-black uppercase text-gray-400 tracking-[0.2em] mb-12">Trusted by Readers Worldwide</h4>
            <div className="flex flex-wrap justify-center gap-12 grayscale opacity-40">
                <div className="text-2xl font-black italic">POLITICO</div>
                <div className="text-2xl font-black">REMEDIA</div>
                <div className="text-2xl font-black">EURACTIV</div>
                <div className="text-2xl font-black">LE MONDE</div>
            </div>
        </div>
      </section>

      {/* FAQ Mini Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
            <h3 className="text-3xl font-bold text-center mb-12 font-serif">Frequently Asked Questions</h3>
            <div className="space-y-6">
                {[
                    { q: "Can I cancel my subscription at any time?", a: "Yes, you can manage your subscription easily from your account settings and cancel at any time without further obligation." },
                    { q: "How do I access premium content on mobile?", a: "Once you subscribe, simply sign in on any device to get full access to our mobile-optimized reporting." },
                    { q: "What payment methods do you accept?", a: "We accept all major credit cards, PayPal, and Apple/Google Pay for your convenience." }
                ].map((faq, i) => (
                    <div key={i} className="border-b border-gray-100 pb-6">
                        <h5 className="font-bold text-lg text-[#1a2a44] mb-2">{faq.q}</h5>
                        <p className="text-gray-600">{faq.a}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>
    </main>
  );
};

export default SubscriptionPlans;
