
import React, { useEffect } from 'react';

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
}

const SignUpModal: React.FC<SignUpModalProps> = ({ isOpen, onClose, onSwitchToLogin }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#0a111a]/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div 
        className="absolute inset-0" 
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-2xl bg-[#1a2a44] rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/5 overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Grain/Texture Overlay Simulation */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]" />

        <div className="relative p-6 md:p-8">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors z-10"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Logo */}
          <div className="mb-4 text-center">
            <img
              src={import.meta.env.BASE_URL + "images/logo.png"}
              alt="Brussels Signal"
              className="h-8 mx-auto"
            />
          </div>

          <h2 className="text-white text-base text-center font-medium leading-tight mb-6 max-w-xl mx-auto">
            Register for full access to daily news, plus explore premium reporting with a free trial.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column - Form */}
            <div className="space-y-3">
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="First Name"
                  className="w-1/2 bg-[#24375a]/50 border border-white/10 rounded-md px-3 py-2.5 text-white placeholder:text-white/30 outline-none focus:ring-1 ring-red-500 transition-all text-sm"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="w-1/2 bg-[#24375a]/50 border border-white/10 rounded-md px-3 py-2.5 text-white placeholder:text-white/30 outline-none focus:ring-1 ring-red-500 transition-all text-sm"
                />
              </div>
              <input
                type="email"
                placeholder="Email address"
                className="w-full bg-[#24375a]/50 border border-white/10 rounded-md px-3 py-2.5 text-white placeholder:text-white/30 outline-none focus:ring-1 ring-red-500 transition-all text-sm"
              />
              <input
                type="password"
                placeholder="Create password"
                className="w-full bg-[#24375a]/50 border border-white/10 rounded-md px-3 py-2.5 text-white placeholder:text-white/30 outline-none focus:ring-1 ring-red-500 transition-all text-sm"
              />
              <input
                type="password"
                placeholder="Confirm password"
                className="w-full bg-[#24375a]/50 border border-white/10 rounded-md px-3 py-2.5 text-white placeholder:text-white/30 outline-none focus:ring-1 ring-red-500 transition-all text-sm"
              />
              <button className="w-full bg-[#eb6761] hover:bg-[#e05650] text-white font-black text-base py-3 rounded-md shadow-lg transition-transform active:scale-[0.98]">
                SIGN UP FOR FREE
              </button>
            </div>

            {/* Right Column - Social & Legal */}
            <div className="flex flex-col justify-center items-center">
              <span className="text-white/60 text-[10px] font-black uppercase tracking-[0.15em] mb-4">SIGN UP WITH SOCIAL MEDIA</span>

              <div className="flex gap-4 mb-6">
                <button className="w-12 h-12 bg-[#fdf2e9] rounded-full flex items-center justify-center hover:scale-105 transition-transform shadow-md">
                  <span className="font-serif text-2xl text-[#1a2a44] font-bold">g</span>
                </button>
                <button className="w-12 h-12 bg-[#fdf2e9] rounded-full flex items-center justify-center hover:scale-105 transition-transform shadow-md">
                  <svg className="w-6 h-6 text-[#1a2a44]" fill="currentColor" viewBox="0 0 384 512">
                      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
                  </svg>
                </button>
              </div>

              <div className="w-full h-px bg-white/10 mb-4" />

              <div className="text-center space-y-2 px-4">
                <p className="text-[11px] text-white/70">
                  Already have an account? <button onClick={onSwitchToLogin} className="text-white hover:underline underline-offset-2">Click here to login</button>
                </p>
                <div className="pt-2 text-[9px] text-white/40 leading-relaxed uppercase tracking-widest font-bold">
                  By registering, you agree to our <a href="#" className="underline">T&Cs</a>.
                  <br />
                  You also give consent for your data to be managed in accordance with our <a href="#" className="underline">Privacy Policy</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpModal;
