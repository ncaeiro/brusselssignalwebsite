
import React, { useState, useEffect, useRef } from 'react';
import { useRegistrationGating } from '../src/RegistrationGatingContext.tsx';

interface RegistrationWallProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
  prefillEmail?: string;
}

type Step = 'email' | 'complete';

const MONTHLY_THRESHOLD = 3;

const RegistrationWall: React.FC<RegistrationWallProps> = ({ isOpen, onClose, onSwitchToLogin, prefillEmail = '' }) => {
  const [step, setStep] = useState<Step>('email');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const { articleCount30Days, sessionCount, setRegistered } = useRegistrationGating();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // If an email was pre-filled from the homepage strip, skip to step 2
      if (prefillEmail) {
        setEmail(prefillEmail);
        setStep('complete');
      } else {
        setStep('email');
      }
      requestAnimationFrame(() => setIsVisible(true));
      setTimeout(() => emailRef.current?.focus(), 300);
    } else {
      setIsVisible(false);
      document.body.style.overflow = 'unset';
      setTimeout(() => {
        setStep('email');
        setEmail('');
        setFirstName('');
        setLastName('');
        setPassword('');
      }, 300);
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen, prefillEmail]);

  if (!isOpen) return null;

  const articlesRead = Math.max(articleCount30Days, sessionCount);
  const remaining = Math.max(0, MONTHLY_THRESHOLD - articlesRead);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) setStep('complete');
  };

  const handleCompleteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (firstName.trim() && password.trim()) {
      // TODO: wire up actual registration API
      setRegistered();
    }
  };

  return (
    <div
      className={`fixed inset-0 z-[200] flex items-center justify-center p-4 transition-all duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ backgroundColor: 'rgba(8, 14, 24, 0.85)', backdropFilter: 'blur(6px)' }}
    >
      {/* Backdrop click to dismiss */}
      <div className="absolute inset-0" onClick={onClose} />

      <div
        className={`relative w-full max-w-lg transition-all duration-300 ${
          isVisible ? 'translate-y-0 scale-100' : 'translate-y-4 scale-95'
        }`}
      >
        <div className="bg-[#1a2a44] rounded-2xl shadow-[0_0_80px_rgba(0,0,0,0.6)] border border-white/8 overflow-hidden">

          {/* Top accent bar */}
          <div className="h-1 bg-gradient-to-r from-[#EE6260] via-[#e84e4c] to-[#c94040]" />

          <div className="p-7 md:p-9">
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 text-white/30 hover:text-white/70 transition-colors"
              aria-label="Close"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Logo */}
            <div className="mb-6 flex justify-center">
              <img
                src={import.meta.env.BASE_URL + "images/logo.png"}
                alt="Brussels Signal"
                className="h-7"
              />
            </div>

            {step === 'email' ? (
              <EmailStep
                email={email}
                setEmail={setEmail}
                onSubmit={handleEmailSubmit}
                onSwitchToLogin={() => { onClose(); onSwitchToLogin(); }}
                articlesRead={articlesRead}
                remaining={remaining}
                emailRef={emailRef}
              />
            ) : (
              <CompleteStep
                email={email}
                firstName={firstName}
                setFirstName={setFirstName}
                lastName={lastName}
                setLastName={setLastName}
                password={password}
                setPassword={setPassword}
                onSubmit={handleCompleteSubmit}
                onSwitchToLogin={() => { onClose(); onSwitchToLogin(); }}
                onBack={() => setStep('email')}
              />
            )}
          </div>
        </div>

        {/* Step indicator */}
        <div className="flex justify-center gap-2 mt-4">
          <div className={`h-1.5 rounded-full transition-all duration-300 ${step === 'email' ? 'w-8 bg-[#EE6260]' : 'w-4 bg-white/30'}`} />
          <div className={`h-1.5 rounded-full transition-all duration-300 ${step === 'complete' ? 'w-8 bg-[#EE6260]' : 'w-4 bg-white/30'}`} />
        </div>
      </div>
    </div>
  );
};

/* ─── Step 1: Email Capture ─────────────────────────────────────────────── */

interface EmailStepProps {
  email: string;
  setEmail: (v: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onSwitchToLogin: () => void;
  articlesRead: number;
  remaining: number;
  emailRef: React.RefObject<HTMLInputElement>;
}

const EmailStep: React.FC<EmailStepProps> = ({
  email, setEmail, onSubmit, onSwitchToLogin, articlesRead, remaining, emailRef
}) => {
  const benefits = [
    { icon: '📰', text: 'Daily EU news, ad-free' },
    { icon: '📬', text: 'Exclusive weekly analysis' },
    { icon: '🔓', text: 'No credit card required' },
  ];

  return (
    <>
      {/* Article count nudge */}
      {articlesRead >= 2 && (
        <div className="mb-5 flex items-center gap-3 bg-white/5 border border-white/10 rounded-lg px-4 py-3">
          <div className="flex gap-1">
            {Array.from({ length: Math.min(articlesRead, 3) }).map((_, i) => (
              <div key={i} className="w-2 h-2 rounded-full bg-[#EE6260]" />
            ))}
            {Array.from({ length: Math.max(0, 3 - articlesRead) }).map((_, i) => (
              <div key={i} className="w-2 h-2 rounded-full bg-white/20" />
            ))}
          </div>
          <p className="text-xs text-white/70 font-medium">
            You've read <span className="text-white font-bold">{articlesRead} article{articlesRead !== 1 ? 's' : ''}</span> this month
            {remaining > 0 && <> · <span className="text-[#EE6260] font-bold">{remaining} free {remaining === 1 ? 'read' : 'reads'} left</span></>}
            {remaining === 0 && <> · <span className="text-[#EE6260] font-bold">Register free to continue</span></>}
          </p>
        </div>
      )}

      {/* Headline */}
      <h2 className="text-white text-2xl md:text-3xl font-black leading-tight mb-2 text-center">
        Stay ahead of Europe's biggest decisions
      </h2>
      <p className="text-white/60 text-sm text-center mb-6 leading-relaxed">
        Join professionals and policymakers who follow Brussels beyond the headlines.
      </p>

      {/* Benefits */}
      <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 mb-7">
        {benefits.map(b => (
          <span key={b.text} className="flex items-center gap-1.5 text-xs text-white/70">
            <span>{b.icon}</span>
            <span>{b.text}</span>
          </span>
        ))}
      </div>

      {/* Email form */}
      <form onSubmit={onSubmit} className="space-y-3">
        <div className="flex gap-2">
          <input
            ref={emailRef}
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Your email address"
            required
            className="flex-1 bg-white border border-gray-200 rounded-lg px-4 py-3 text-[#1a2a44] placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-[#EE6260]/60 focus:border-[#EE6260] transition-all text-sm"
          />
          <button
            type="submit"
            className="bg-[#EE6260] hover:bg-[#d44947] text-white font-black text-sm px-5 rounded-lg shadow-lg transition-all active:scale-95 whitespace-nowrap flex items-center gap-2"
          >
            Continue
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <p className="text-center text-[11px] text-white/40">
          Already have an account?{' '}
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="text-white/70 hover:text-white underline underline-offset-2 transition-colors"
          >
            Sign in here
          </button>
        </p>
      </form>
    </>
  );
};

/* ─── Step 2: Complete Registration ─────────────────────────────────────── */

interface CompleteStepProps {
  email: string;
  firstName: string;
  setFirstName: (v: string) => void;
  lastName: string;
  setLastName: (v: string) => void;
  password: string;
  setPassword: (v: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onSwitchToLogin: () => void;
  onBack: () => void;
}

const CompleteStep: React.FC<CompleteStepProps> = ({
  email, firstName, setFirstName, lastName, setLastName,
  password, setPassword, onSubmit, onSwitchToLogin, onBack
}) => (
  <>
    {/* Back arrow */}
    <button
      onClick={onBack}
      className="flex items-center gap-1.5 text-white/40 hover:text-white/80 text-xs font-bold uppercase tracking-widest mb-5 transition-colors"
    >
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
      </svg>
      Back
    </button>

    <h2 className="text-white text-2xl font-black leading-tight mb-1 text-center">
      Almost there
    </h2>
    <p className="text-white/50 text-sm text-center mb-6">
      Completing account for <span className="text-white/80 font-semibold">{email}</span>
    </p>

    <form onSubmit={onSubmit} className="space-y-4">
      <div className="flex gap-3">
        <div className="w-1/2 space-y-1.5">
          <label className="block text-[11px] font-bold text-white/50 uppercase tracking-wider">
            First name <span className="text-[#EE6260]">*</span>
          </label>
          <input
            type="text"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            placeholder="e.g. Marie"
            required
            className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-[#1a2a44] placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-[#EE6260]/60 focus:border-[#EE6260] transition-all text-sm"
          />
        </div>
        <div className="w-1/2 space-y-1.5">
          <label className="block text-[11px] font-bold text-white/50 uppercase tracking-wider">
            Last name
          </label>
          <input
            type="text"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            placeholder="e.g. Dupont"
            className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-[#1a2a44] placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-[#EE6260]/60 focus:border-[#EE6260] transition-all text-sm"
          />
        </div>
      </div>
      <div className="space-y-1.5">
        <label className="block text-[11px] font-bold text-white/50 uppercase tracking-wider">
          Password <span className="text-[#EE6260]">*</span>
          <span className="ml-1 normal-case text-white/30 font-normal tracking-normal">(min. 8 characters)</span>
        </label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Create a strong password"
          required
          minLength={8}
          className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-[#1a2a44] placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-[#EE6260]/60 focus:border-[#EE6260] transition-all text-sm"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-[#EE6260] hover:bg-[#d44947] text-white font-black text-sm py-3.5 rounded-lg shadow-lg transition-all active:scale-[0.99]"
      >
        CREATE FREE ACCOUNT
      </button>
    </form>

    <div className="mt-4 space-y-2 text-center">
      <p className="text-[11px] text-white/40">
        Already have an account?{' '}
        <button
          onClick={onSwitchToLogin}
          className="text-white/70 hover:text-white underline underline-offset-2 transition-colors"
        >
          Sign in here
        </button>
      </p>
      <p className="text-[10px] text-white/30 leading-relaxed uppercase tracking-wide font-bold">
        By registering, you agree to our{' '}
        <a href="#" className="underline hover:text-white/50 transition-colors">T&Cs</a>{' '}
        and{' '}
        <a href="#" className="underline hover:text-white/50 transition-colors">Privacy Policy</a>.
      </p>
    </div>
  </>
);

export default RegistrationWall;
