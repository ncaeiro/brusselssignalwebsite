
import React, { useState } from 'react';
import { useRegistrationGating } from '../src/RegistrationGatingContext.tsx';

const HomepageHeroStrip: React.FC = () => {
  const { isRegistered, openRegistrationWall } = useRegistrationGating();
  const [email, setEmail] = useState('');

  if (isRegistered) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    openRegistrationWall(email.trim() || undefined);
  };

  return (
    <div className="relative overflow-hidden rounded-lg my-8 bg-[#1a2a44]">
      {/* Subtle dot-grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Left red accent bar */}
      <div className="absolute left-0 inset-y-0 w-1 bg-[#EE6260]" />

      <div className="relative pl-6 pr-6 py-10 md:py-12">
        <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-12">

          {/* Left: copy */}
          <div className="flex-1 min-w-0">
            <span className="inline-block bg-[#EE6260]/20 border border-[#EE6260]/40 text-[#EE6260] text-[10px] font-black uppercase tracking-[0.15em] px-2.5 py-1 rounded mb-4">
              Free account
            </span>
            <h2 className="text-white text-2xl md:text-4xl lg:text-5xl font-black leading-tight mb-3">
              Stay ahead of Europe's biggest decisions.
            </h2>
            <p className="text-white/70 text-base md:text-lg leading-relaxed max-w-xl">
              Understand what Brussels decides and why it matters — independent reporting trusted by EU affairs professionals.
            </p>

            {/* Social proof row */}
            <div className="flex items-center gap-4 mt-4">
              <div className="flex -space-x-2">
                {['#4a90d9', '#6dbf8c', '#e8a838', '#c97bd4'].map((color, i) => (
                  <div
                    key={i}
                    className="w-7 h-7 rounded-full border-2 border-[#1a2a44] flex items-center justify-center text-[10px] font-bold text-white"
                    style={{ backgroundColor: color }}
                  >
                    {['EU', 'PL', 'BE', 'FR'][i]}
                  </div>
                ))}
              </div>
              <p className="text-white/45 text-xs">
                Joined by readers across <span className="text-white/70 font-semibold">27 EU member states</span>
              </p>
            </div>
          </div>

          {/* Right: email form */}
          <div className="shrink-0 w-full md:w-auto md:min-w-[320px]">
            <form onSubmit={handleSubmit} className="space-y-2.5">
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/35 outline-none focus:ring-2 focus:ring-[#EE6260]/60 focus:border-[#EE6260]/60 transition-all text-sm min-w-0"
                />
                <button
                  type="submit"
                  className="shrink-0 bg-[#EE6260] hover:bg-[#d44947] text-white font-black text-xs uppercase tracking-wider px-4 py-3 rounded-lg shadow-lg transition-all active:scale-[0.97] whitespace-nowrap"
                >
                  Register free
                </button>
              </div>
              <p className="text-white/35 text-[11px] text-center">
                No credit card · Cancel anytime · Free weekly EU analysis
              </p>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default HomepageHeroStrip;
