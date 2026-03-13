
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface HardConversionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const HardConversionModal: React.FC<HardConversionModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center bg-[#0a111a]/95 backdrop-blur-md animate-in fade-in duration-300">
      <div className="w-full max-w-2xl mx-auto px-8 text-center animate-in zoom-in-95 duration-300">
        {/* Logo */}
        <div className="mb-10">
          <img
            src={import.meta.env.BASE_URL + 'images/logo.png'}
            alt="Brussels Signal"
            className="h-9 mx-auto opacity-80"
          />
        </div>

        <p className="text-[#EE6260] text-[10px] font-black uppercase tracking-[0.2em] mb-4">
          YOU RELY ON BRUSSELS SIGNAL
        </p>

        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight font-serif">
          Unlock full access.
        </h1>

        <p className="text-gray-300 text-lg mb-10 max-w-lg mx-auto leading-relaxed">
          You've been reading Brussels Signal regularly. Support independent European journalism and get unlimited access to every article, analysis, and exclusive report.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
          <button
            onClick={() => { onClose(); navigate('/subscriptions'); }}
            className="bg-[#EE6260] hover:bg-[#d44947] text-white font-black text-sm py-4 px-12 rounded-md tracking-widest uppercase transition-colors shadow-2xl"
          >
            Become a Member →
          </button>
          <button
            onClick={onClose}
            className="text-white/40 hover:text-white/60 text-sm py-4 px-6 transition-colors"
          >
            Maybe later
          </button>
        </div>

        <p className="text-white/25 text-[11px]">Cancel anytime · No commitment</p>
      </div>
    </div>
  );
};

export default HardConversionModal;
