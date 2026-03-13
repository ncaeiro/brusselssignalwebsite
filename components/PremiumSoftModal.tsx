
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface PremiumSoftModalProps {
  isOpen: boolean;
  onClose: () => void;
  topic: string;
}

const PremiumSoftModal: React.FC<PremiumSoftModalProps> = ({ isOpen, onClose, topic }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      {/* Blurred backdrop */}
      <div className="absolute inset-0 bg-[#0a111a]/75 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-md bg-[#1a2a44] rounded-2xl shadow-[0_0_60px_rgba(0,0,0,0.5)] border border-white/10 p-8 md:p-10 animate-in zoom-in-95 duration-200">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Premium icon */}
        <div className="w-14 h-14 bg-[#EE6260] rounded-full flex items-center justify-center mb-6">
          <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </div>

        <p className="text-[10px] text-[#EE6260] font-black uppercase tracking-[0.15em] mb-3">
          PREMIUM CONTENT
        </p>
        <h2 className="text-2xl font-bold text-white mb-3 leading-snug">
          Unlock the full picture on {topic}.
        </h2>
        <p className="text-gray-300 text-sm mb-8 leading-relaxed">
          Subscribe now and get full, unlimited access to every premium article, analysis, and exclusive report — no limits, ever.
        </p>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => { onClose(); navigate('/subscriptions'); }}
            className="w-full bg-[#EE6260] hover:bg-[#d44947] text-white font-black text-sm py-4 rounded-md tracking-widest uppercase transition-colors shadow-lg"
          >
            Subscribe Now
          </button>
          <button
            onClick={onClose}
            className="w-full text-white/40 hover:text-white/70 text-xs py-2 transition-colors"
          >
            Continue reading
          </button>
        </div>
      </div>
    </div>
  );
};

export default PremiumSoftModal;
