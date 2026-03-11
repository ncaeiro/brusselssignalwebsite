
import React, { useState, useEffect } from 'react';
import { useRegistrationGating } from '../src/RegistrationGatingContext.tsx';

const MONTHLY_THRESHOLD = 3;
const DISMISS_KEY = 'bs_progress_banner_dismissed';

const ArticleProgressBanner: React.FC = () => {
  const { articleCount30Days, isRegistered, openRegistrationWall } = useRegistrationGating();
  const [isDismissed, setIsDismissed] = useState(() => {
    try { return sessionStorage.getItem(DISMISS_KEY) === 'true'; } catch { return false; }
  });

  // Re-check if banner should reappear when count hits the limit
  useEffect(() => {
    if (articleCount30Days >= MONTHLY_THRESHOLD && isDismissed) {
      setIsDismissed(false);
      try { sessionStorage.removeItem(DISMISS_KEY); } catch {}
    }
  }, [articleCount30Days, isDismissed]);

  const handleDismiss = () => {
    setIsDismissed(true);
    try { sessionStorage.setItem(DISMISS_KEY, 'true'); } catch {}
  };

  if (isRegistered || articleCount30Days < 1 || isDismissed) return null;

  const count = Math.min(articleCount30Days, MONTHLY_THRESHOLD);
  const remaining = Math.max(0, MONTHLY_THRESHOLD - count);
  const isAtLimit = count >= MONTHLY_THRESHOLD;

  // Color theme scales from calm → urgent
  const theme = isAtLimit
    ? { bg: 'bg-[#991b1b]', bar: '#EE6260', text: 'text-red-100', pip: 'bg-[#EE6260]', pipEmpty: 'bg-red-900/60' }
    : count === 2
    ? { bg: 'bg-[#78350f]', bar: '#f59e0b', text: 'text-amber-100', pip: 'bg-amber-400', pipEmpty: 'bg-amber-900/50' }
    : { bg: 'bg-[#1a2a44]', bar: '#4a90d9', text: 'text-blue-100', pip: 'bg-blue-400', pipEmpty: 'bg-blue-900/50' };

  const fillPercent = (count / MONTHLY_THRESHOLD) * 100;

  return (
    <div className={`sticky top-0 z-40 ${theme.bg} shadow-md`}>
      {/* Thin fill bar at the very top */}
      <div className="h-[3px] bg-black/20 w-full">
        <div
          className="h-full transition-all duration-700 ease-out"
          style={{ width: `${fillPercent}%`, backgroundColor: theme.bar }}
        />
      </div>

      {/* Banner body */}
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 py-2.5 min-h-[44px]">

          {/* Left: meter + message */}
          <div className="flex items-center gap-3 min-w-0">
            {/* Pip meter */}
            <div className="flex items-center gap-1 shrink-0">
              {Array.from({ length: MONTHLY_THRESHOLD }).map((_, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-sm transition-all duration-500 ${
                    i < count ? theme.pip : theme.pipEmpty
                  }`}
                />
              ))}
            </div>

            {/* Message */}
            <p className={`text-xs font-semibold ${theme.text} leading-tight`}>
              {isAtLimit ? (
                <>
                  You've reached your <span className="font-black">free article limit</span> for this month.
                  <span className="hidden sm:inline"> Register free to keep reading.</span>
                </>
              ) : (
                <>
                  You've read{' '}
                  <span className="font-black">{count} of {MONTHLY_THRESHOLD}</span> free articles this month.
                  <span className="hidden sm:inline">
                    {' '}{remaining === 1
                      ? <span className="font-black text-current opacity-80">1 free read left.</span>
                      : <span className="opacity-80">{remaining} free reads left.</span>
                    }
                  </span>
                </>
              )}
            </p>
          </div>

          {/* Right: CTA + dismiss */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => openRegistrationWall()}
              className="bg-white/15 hover:bg-white/25 border border-white/25 text-white text-[11px] font-black uppercase tracking-wider px-3 py-1.5 rounded transition-all whitespace-nowrap flex items-center gap-1.5"
            >
              Register free
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Only allow dismissal if not at limit */}
            {!isAtLimit && (
              <button
                onClick={handleDismiss}
                className="text-white/40 hover:text-white/80 transition-colors p-1"
                aria-label="Dismiss"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default ArticleProgressBanner;
