import React, { useState } from 'react';
import { getAuthorPhoto } from '../src/utils.ts';

// Author newsletter data
const AUTHOR_NEWSLETTERS = [
  {
    name: 'Krzysztof Mularczyk',
    title: 'Eastern European Pulse',
    subtitle: 'Weekly insights from the East',
    description: 'In-depth analysis of Eastern European politics, EU relations, and geopolitical shifts from our senior correspondent.',
    frequency: 'Weekly',
    features: ['Eastern Europe coverage', 'EU-East relations', 'Geopolitical analysis']
  },
  {
    name: 'Carl Deconinck',
    title: 'The Transparency Report',
    subtitle: 'Investigative journalism',
    description: 'Investigative insights into EU institutions, lobbying activities, and transparency issues in European governance.',
    frequency: 'Bi-weekly',
    features: ['Investigative reports', 'Lobbying insights', 'Institutional transparency']
  },
  {
    name: 'Chris Gattringer',
    title: 'Digital Europe Digest',
    subtitle: 'Tech policy and trade',
    description: 'Expert coverage of tech policy, digital regulation, and trade developments shaping Europe\'s digital future.',
    frequency: 'Weekly',
    features: ['Tech policy updates', 'Digital regulation', 'Trade developments']
  },
  {
    name: 'Kevin Myers',
    title: 'Political Commentary Weekly',
    subtitle: 'Sharp political analysis',
    description: 'Sharp political commentary and analysis on European affairs, policy debates, and the issues that matter.',
    frequency: 'Weekly',
    features: ['Political commentary', 'Policy debates', 'EU affairs analysis']
  }
];

const NewslettersGridAuthorsPage: React.FC = () => {
  // State for first row (Observer + Decision-maker newsletters)
  const [mainEmail, setMainEmail] = useState('');
  const [selectedMainNewsletters, setSelectedMainNewsletters] = useState<string[]>([]);

  // State for second row (Author newsletters)
  const [authorEmail, setAuthorEmail] = useState('');
  const [selectedAuthorNewsletters, setSelectedAuthorNewsletters] = useState<string[]>([]);

  const toggleMainNewsletter = (id: string) => {
    setSelectedMainNewsletters(prev =>
      prev.includes(id) ? prev.filter(n => n !== id) : [...prev, id]
    );
  };

  const toggleAuthorNewsletter = (name: string) => {
    setSelectedAuthorNewsletters(prev =>
      prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]
    );
  };

  const handleMainSubscribe = () => {
    if (mainEmail && selectedMainNewsletters.length > 0) {
      alert(`Subscribed ${mainEmail} to: ${selectedMainNewsletters.join(', ')}`);
      setMainEmail('');
      setSelectedMainNewsletters([]);
    }
  };

  const handleAuthorSubscribe = () => {
    if (authorEmail && selectedAuthorNewsletters.length > 0) {
      alert(`Subscribed ${authorEmail} to: ${selectedAuthorNewsletters.join(', ')}`);
      setAuthorEmail('');
      setSelectedAuthorNewsletters([]);
    }
  };

  return (
    <main className="flex-grow bg-white">
      {/* Header Section */}
      <section className="bg-white py-12 border-b border-gray-200">
        <div className="container mx-auto px-4 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-[#1a2a44] mb-4">Our email Newsletters</h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Stay informed with Brussels Signal newsletters - from daily briefings to exclusive author insights, choose the newsletters that matter to you.
          </p>
        </div>
      </section>

      {/* Row 1: Observer + Decision-maker Newsletters (4 columns) */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-2xl font-bold text-[#1a2a44]">Signal Newsletters</h2>
            <span className="text-sm text-gray-500">Select newsletters to subscribe</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Brussels Calling Observer */}
            <div
              onClick={() => toggleMainNewsletter('brussels-calling-observer')}
              className={`bg-[#f5e6d3] rounded-lg shadow-md overflow-hidden cursor-pointer transition-all hover:shadow-lg ${
                selectedMainNewsletters.includes('brussels-calling-observer') ? 'ring-2 ring-[#EE6260]' : ''
              }`}
            >
              <div className="bg-[#1a2a44] text-white px-4 py-4 text-center">
                <div className="inline-flex items-center gap-2 mb-2 px-2 py-0.5 bg-white/10 rounded-full">
                  <svg className="w-3 h-3 text-[#EE6260]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                  <span className="text-[9px] font-black uppercase tracking-wider">Daily Brief</span>
                </div>
                <h3 className="text-lg font-bold">Brussels Calling</h3>
                <p className="text-xs text-white/80 mt-1">Essential news, views and analysis</p>
              </div>
              <div className="p-4 bg-[#f5e6d3]">
                <div className="flex items-start gap-3 mb-4">
                  <img
                    src={import.meta.env.BASE_URL + "images/newsletter-card-icon-1.png"}
                    alt="Brussels Calling"
                    className="w-12 h-auto flex-shrink-0"
                  />
                  <p className="text-sm text-gray-700 leading-relaxed">
                    Political news, views and analysis from the heart of the European Union, the latest news on all things EU
                  </p>
                </div>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-start gap-2">
                    <div className="mt-0.5 w-4 h-4 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <svg className="w-2.5 h-2.5 text-blue-600" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>
                    </div>
                    <span className="text-xs text-gray-700">Directly from EU institutions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-0.5 w-4 h-4 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <svg className="w-2.5 h-2.5 text-blue-600" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>
                    </div>
                    <span className="text-xs text-gray-700">Latest from industry lobbyists</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-0.5 w-4 h-4 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <svg className="w-2.5 h-2.5 text-blue-600" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>
                    </div>
                    <span className="text-xs text-gray-700">Key legislative updates</span>
                  </li>
                </ul>
                <div className="flex items-center justify-between pt-3 border-t border-[#e5d6c3]">
                  <span className="text-xs text-gray-500 font-medium">Free</span>
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                    selectedMainNewsletters.includes('brussels-calling-observer')
                      ? 'bg-[#EE6260] border-[#EE6260]'
                      : 'border-gray-400 bg-white'
                  }`}>
                    {selectedMainNewsletters.includes('brussels-calling-observer') && (
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                      </svg>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Signal Horizon Observer */}
            <div
              onClick={() => toggleMainNewsletter('signal-horizon-observer')}
              className={`bg-[#f5e6d3] rounded-lg shadow-md overflow-hidden cursor-pointer transition-all hover:shadow-lg ${
                selectedMainNewsletters.includes('signal-horizon-observer') ? 'ring-2 ring-[#EE6260]' : ''
              }`}
            >
              <div className="bg-[#1a2a44] text-white px-4 py-4 text-center">
                <div className="inline-flex items-center gap-2 mb-2 px-2 py-0.5 bg-white/10 rounded-full">
                  <svg className="w-3 h-3 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                  <span className="text-[9px] font-black uppercase tracking-wider">Weekly Strategy</span>
                </div>
                <h3 className="text-lg font-bold">Signal Horizon</h3>
                <p className="text-xs text-white/80 mt-1">Future trends shaping the EU</p>
              </div>
              <div className="p-4 bg-[#f5e6d3]">
                <div className="flex items-start gap-3 mb-4">
                  <img
                    src={import.meta.env.BASE_URL + "images/newsletter-card-icon-2.png"}
                    alt="Signal Horizon"
                    className="w-12 h-auto flex-shrink-0"
                  />
                  <p className="text-sm text-gray-700 leading-relaxed">
                    Exclusive weekly newsletter analyzing emerging trends and shifts in politics, technology, all the EU
                  </p>
                </div>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-start gap-2">
                    <div className="mt-0.5 w-4 h-4 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <svg className="w-2.5 h-2.5 text-blue-600" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>
                    </div>
                    <span className="text-xs text-gray-700">Long-form geopolitical analysis</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-0.5 w-4 h-4 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <svg className="w-2.5 h-2.5 text-blue-600" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>
                    </div>
                    <span className="text-xs text-gray-700">Deep dives into technology</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-0.5 w-4 h-4 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <svg className="w-2.5 h-2.5 text-blue-600" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>
                    </div>
                    <span className="text-xs text-gray-700">Cultural and societal trends</span>
                  </li>
                </ul>
                <div className="flex items-center justify-between pt-3 border-t border-[#e5d6c3]">
                  <span className="text-xs text-gray-500 font-medium">Free</span>
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                    selectedMainNewsletters.includes('signal-horizon-observer')
                      ? 'bg-[#EE6260] border-[#EE6260]'
                      : 'border-gray-400 bg-white'
                  }`}>
                    {selectedMainNewsletters.includes('signal-horizon-observer') && (
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                      </svg>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Brussels Calling Decision-maker */}
            <div
              onClick={() => toggleMainNewsletter('brussels-calling-premium')}
              className={`bg-[#f5e6d3] rounded-lg shadow-md overflow-hidden cursor-pointer transition-all hover:shadow-lg relative ${
                selectedMainNewsletters.includes('brussels-calling-premium') ? 'ring-2 ring-[#EE6260]' : ''
              }`}
            >
              {/* Premium Badge */}
              <div className="absolute top-2 right-2 z-10">
                <span className="px-2 py-0.5 bg-gradient-to-r from-amber-400 to-yellow-500 text-[#1a2a44] text-[8px] font-black uppercase tracking-wider rounded-full shadow">
                  Premium
                </span>
              </div>
              <div className="bg-[#1a2a44] text-white px-4 py-4 text-center">
                <div className="inline-flex items-center gap-2 mb-2 px-2 py-0.5 bg-white/10 rounded-full">
                  <svg className="w-3 h-3 text-[#EE6260]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                  <span className="text-[9px] font-black uppercase tracking-wider">Daily Brief</span>
                </div>
                <h3 className="text-lg font-bold">Brussels Calling</h3>
                <p className="text-xs text-white/80 mt-1">For policy makers and analysts</p>
              </div>
              <div className="p-4 bg-[#f5e6d3]">
                <div className="flex items-start gap-3 mb-4">
                  <img
                    src={import.meta.env.BASE_URL + "images/newsletter-card-icon-1.png"}
                    alt="Brussels Calling"
                    className="w-12 h-auto flex-shrink-0"
                  />
                  <p className="text-sm text-gray-700 leading-relaxed">
                    Political news, views and analysis from the heart of the European Union, the latest news on all things EU
                  </p>
                </div>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-start gap-2">
                    <div className="mt-0.5 w-4 h-4 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <svg className="w-2.5 h-2.5 text-blue-600" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>
                    </div>
                    <span className="text-xs text-gray-700">Executive briefings</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-0.5 w-4 h-4 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <svg className="w-2.5 h-2.5 text-blue-600" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>
                    </div>
                    <span className="text-xs text-gray-700">Policy impact analysis</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-0.5 w-4 h-4 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <svg className="w-2.5 h-2.5 text-blue-600" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>
                    </div>
                    <span className="text-xs text-gray-700">Strategic insights</span>
                  </li>
                </ul>
                <div className="flex items-center justify-between pt-3 border-t border-[#e5d6c3]">
                  <span className="text-xs text-amber-600 font-bold">Premium</span>
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                    selectedMainNewsletters.includes('brussels-calling-premium')
                      ? 'bg-[#EE6260] border-[#EE6260]'
                      : 'border-gray-400 bg-white'
                  }`}>
                    {selectedMainNewsletters.includes('brussels-calling-premium') && (
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                      </svg>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Signal Horizon Decision-maker */}
            <div
              onClick={() => toggleMainNewsletter('signal-horizon-premium')}
              className={`bg-[#f5e6d3] rounded-lg shadow-md overflow-hidden cursor-pointer transition-all hover:shadow-lg relative ${
                selectedMainNewsletters.includes('signal-horizon-premium') ? 'ring-2 ring-[#EE6260]' : ''
              }`}
            >
              {/* Premium Badge */}
              <div className="absolute top-2 right-2 z-10">
                <span className="px-2 py-0.5 bg-gradient-to-r from-amber-400 to-yellow-500 text-[#1a2a44] text-[8px] font-black uppercase tracking-wider rounded-full shadow">
                  Premium
                </span>
              </div>
              <div className="bg-[#1a2a44] text-white px-4 py-4 text-center">
                <div className="inline-flex items-center gap-2 mb-2 px-2 py-0.5 bg-white/10 rounded-full">
                  <svg className="w-3 h-3 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                  <span className="text-[9px] font-black uppercase tracking-wider">Weekly Strategy</span>
                </div>
                <h3 className="text-lg font-bold">Signal Horizon</h3>
                <p className="text-xs text-white/80 mt-1">Future trends shaping the EU</p>
              </div>
              <div className="p-4 bg-[#f5e6d3]">
                <div className="flex items-start gap-3 mb-4">
                  <img
                    src={import.meta.env.BASE_URL + "images/newsletter-card-icon-2.png"}
                    alt="Signal Horizon"
                    className="w-12 h-auto flex-shrink-0"
                  />
                  <p className="text-sm text-gray-700 leading-relaxed">
                    Exclusive weekly newsletter analyzing emerging trends and shifts in politics, technology, all the EU
                  </p>
                </div>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-start gap-2">
                    <div className="mt-0.5 w-4 h-4 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <svg className="w-2.5 h-2.5 text-blue-600" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>
                    </div>
                    <span className="text-xs text-gray-700">Strategic foresight reports</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-0.5 w-4 h-4 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <svg className="w-2.5 h-2.5 text-blue-600" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>
                    </div>
                    <span className="text-xs text-gray-700">Market intelligence</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-0.5 w-4 h-4 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <svg className="w-2.5 h-2.5 text-blue-600" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>
                    </div>
                    <span className="text-xs text-gray-700">Expert commentary</span>
                  </li>
                </ul>
                <div className="flex items-center justify-between pt-3 border-t border-[#e5d6c3]">
                  <span className="text-xs text-amber-600 font-bold">Premium</span>
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                    selectedMainNewsletters.includes('signal-horizon-premium')
                      ? 'bg-[#EE6260] border-[#EE6260]'
                      : 'border-gray-400 bg-white'
                  }`}>
                    {selectedMainNewsletters.includes('signal-horizon-premium') && (
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                      </svg>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Unified Subscription Form - Row 1 */}
          <div className="mt-8 bg-white rounded-lg shadow-md p-6">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="flex-grow w-full md:w-auto">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-4 h-4 text-[#EE6260]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                  <span className="text-sm font-bold text-[#1a2a44]">
                    Subscribe to selected newsletters ({selectedMainNewsletters.length} selected)
                  </span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={mainEmail}
                    onChange={(e) => setMainEmail(e.target.value)}
                    className="flex-grow px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 ring-[#EE6260] outline-none text-sm"
                  />
                  <button
                    onClick={handleMainSubscribe}
                    disabled={!mainEmail || selectedMainNewsletters.length === 0}
                    className={`px-6 py-3 font-bold text-sm rounded-lg transition flex-shrink-0 ${
                      mainEmail && selectedMainNewsletters.length > 0
                        ? 'bg-[#EE6260] text-white hover:bg-[#d44947]'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Row 2: Author Newsletters (4 columns) */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-2xl font-bold text-[#1a2a44]">Author Newsletters</h2>
            <span className="text-sm text-gray-500">Exclusive insights from our journalists</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {AUTHOR_NEWSLETTERS.map((author) => {
              const authorPhoto = getAuthorPhoto(author.name);
              const isSelected = selectedAuthorNewsletters.includes(author.name);

              return (
                <div
                  key={author.name}
                  onClick={() => toggleAuthorNewsletter(author.name)}
                  className={`bg-[#f5e6d3] rounded-lg shadow-md overflow-hidden cursor-pointer transition-all hover:shadow-lg ${
                    isSelected ? 'ring-2 ring-[#EE6260]' : ''
                  }`}
                >
                  {/* Author Header with Photo */}
                  <div className="bg-[#1a2a44] text-white px-4 py-4 text-center relative">
                    <div className="inline-flex items-center gap-2 mb-2 px-2 py-0.5 bg-white/10 rounded-full">
                      <svg className="w-3 h-3 text-[#EE6260]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                      </svg>
                      <span className="text-[9px] font-black uppercase tracking-wider">{author.frequency}</span>
                    </div>
                    <h3 className="text-lg font-bold">{author.title}</h3>
                    <p className="text-xs text-white/80 mt-1">{author.subtitle}</p>
                  </div>

                  {/* Newsletter Info */}
                  <div className="p-4 bg-[#f5e6d3]">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#1a2a44]/20 flex-shrink-0">
                        {authorPhoto ? (
                          <img
                            src={authorPhoto}
                            alt={author.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-400 flex items-center justify-center text-white text-lg font-bold">
                            {author.name.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[#1a2a44] mb-1">By {author.name}</p>
                        <p className="text-sm text-gray-700 leading-relaxed">
                          {author.description}
                        </p>
                      </div>
                    </div>

                    {/* Features */}
                    <ul className="space-y-2 mb-4">
                      {author.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <div className="mt-0.5 w-4 h-4 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                            <svg className="w-2.5 h-2.5 text-blue-600" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>
                          </div>
                          <span className="text-xs text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex items-center justify-between pt-3 border-t border-[#e5d6c3]">
                      <span className="text-xs text-gray-500 font-medium">Free</span>
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                        isSelected
                          ? 'bg-[#EE6260] border-[#EE6260]'
                          : 'border-gray-400 bg-white'
                      }`}>
                        {isSelected && (
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                          </svg>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Unified Subscription Form - Row 2 */}
          <div className="mt-8 bg-gray-50 rounded-lg shadow-md p-6">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="flex-grow w-full md:w-auto">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-4 h-4 text-[#EE6260]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                  <span className="text-sm font-bold text-[#1a2a44]">
                    Subscribe to author newsletters ({selectedAuthorNewsletters.length} selected)
                  </span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={authorEmail}
                    onChange={(e) => setAuthorEmail(e.target.value)}
                    className="flex-grow px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 ring-[#EE6260] outline-none text-sm"
                  />
                  <button
                    onClick={handleAuthorSubscribe}
                    disabled={!authorEmail || selectedAuthorNewsletters.length === 0}
                    className={`px-6 py-3 font-bold text-sm rounded-lg transition flex-shrink-0 ${
                      authorEmail && selectedAuthorNewsletters.length > 0
                        ? 'bg-[#EE6260] text-white hover:bg-[#d44947]'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
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
          <h3 className="text-3xl font-bold mb-4">Never miss a signal</h3>
          <p className="text-white/70 mb-8 max-w-2xl mx-auto">
            Join thousands of readers who trust Brussels Signal for independent European news, analysis, and expert commentary.
          </p>
          <button className="px-10 py-4 bg-[#EE6260] text-white font-bold text-sm uppercase tracking-wider rounded-lg hover:bg-[#d44947] transition shadow-xl">
            View All Newsletters
          </button>
        </div>
      </section>
    </main>
  );
};

export default NewslettersGridAuthorsPage;
