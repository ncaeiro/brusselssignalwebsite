
import React from 'react';
import { useRegistrationGating } from '../src/RegistrationGatingContext.tsx';

const InlineArticleBanner: React.FC = () => {
  const { isRegistered, openRegistrationWall } = useRegistrationGating();

  if (isRegistered) return null;

  return (
    <div className="my-10 not-prose">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 bg-[#f8fafc] border border-gray-200 border-l-4 border-l-[#EE6260] rounded-r-lg px-5 py-5 shadow-sm">

        {/* Icon */}
        <div className="shrink-0 hidden sm:flex w-10 h-10 rounded-full bg-[#1a2a44] items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 12h6" />
          </svg>
        </div>

        {/* Copy */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-[#1a2a44] leading-snug">
            Be part of the readers that follow Brussels beyond the headlines.
          </p>
          <p className="text-xs text-gray-500 mt-0.5">
            Free account · No credit card · Daily EU analysis
          </p>
        </div>

        {/* CTA */}
        <button
          onClick={() => openRegistrationWall()}
          className="shrink-0 inline-flex items-center gap-2 bg-[#EE6260] hover:bg-[#d44947] text-white text-xs font-black uppercase tracking-wider px-4 py-2.5 rounded transition-all active:scale-[0.98] whitespace-nowrap"
        >
          Register free
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default InlineArticleBanner;
