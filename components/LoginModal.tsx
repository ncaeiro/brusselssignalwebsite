
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToSignUp?: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onSwitchToSignUp }) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    onClose();
    navigate('/profile');
  };

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
      
      <div className="relative w-full max-w-md bg-[#1a2a44] rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/5 overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Grain/Texture Overlay Simulation */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]" />

        <div className="relative p-8 md:p-10 flex flex-col items-center">
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Logo */}
          <div className="mb-8">
            <img
              src={import.meta.env.BASE_URL + "images/logo.png"}
              alt="Brussels Signal"
              className="h-10 mx-auto"
            />
          </div>

          <p className="text-white text-sm text-center font-medium leading-relaxed mb-8 max-w-[280px]">
            Sign in to access your account, read premium content, and manage your Brussels Signal subscription.
          </p>

          <div className="w-full space-y-4 mb-6">
            <input 
              type="email" 
              placeholder="Your email" 
              className="w-full bg-[#24375a]/50 border border-white/10 rounded-md px-4 py-3.5 text-white placeholder:text-white/30 outline-none focus:ring-1 ring-red-500 transition-all text-sm"
            />
            <input 
              type="password" 
              placeholder="Your password" 
              className="w-full bg-[#24375a]/50 border border-white/10 rounded-md px-4 py-3.5 text-white placeholder:text-white/30 outline-none focus:ring-1 ring-red-500 transition-all text-sm"
            />
          </div>

          <button onClick={handleLogin} className="w-full bg-[#eb6761] hover:bg-[#e05650] text-white font-black text-lg py-4 rounded-md shadow-lg transition-transform active:scale-[0.98] mb-8">
            LOGIN NOW
          </button>

          <div className="w-full flex flex-col items-center">
            <span className="text-white/60 text-[10px] font-black uppercase tracking-[0.15em] mb-6">SIGN IN WITH SOCIAL MEDIA</span>
            
            <div className="flex gap-4 mb-8">
              <button className="w-12 h-12 bg-[#fdf2e9] rounded-full flex items-center justify-center hover:scale-105 transition-transform shadow-md">
                <span className="font-serif text-2xl text-[#1a2a44] font-bold">g</span>
              </button>
              <button className="w-12 h-12 bg-[#fdf2e9] rounded-full flex items-center justify-center hover:scale-105 transition-transform shadow-md">
                <svg className="w-6 h-6 text-[#1a2a44]" fill="currentColor" viewBox="0 0 384 512">
                    <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
                </svg>
              </button>
            </div>

            <div className="w-full h-px bg-white/10 mb-6" />

            <div className="text-center space-y-2 mb-8 px-4">
              <p className="text-[11px] text-white/70">
                Trouble signing in? <a href="#" className="text-white hover:underline underline-offset-2">Reset your password now.</a>
              </p>
              <p className="text-[11px] text-white/70">
                Don’t have an account? Join today for exclusive access.
              </p>
            </div>

            <button onClick={onSwitchToSignUp} className="w-full bg-[#4b5e85] hover:bg-[#586c96] text-white font-black text-sm py-4 rounded-md tracking-widest transition-colors">
              SIGN UP FOR FREE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
