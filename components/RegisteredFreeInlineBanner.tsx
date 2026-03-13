
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRegistrationGating } from '../src/RegistrationGatingContext.tsx';

const RegisteredFreeInlineBanner: React.FC = () => {
  const navigate = useNavigate();
  const { userType } = useRegistrationGating();

  if (userType !== 'registered-free') return null;

  return (
    <div className="my-8 flex flex-col md:flex-row md:items-center justify-between gap-4 px-5 py-5 bg-[#f0f4f8] border-l-4 border-[#EE6260] rounded-r-md">
      <p className="text-sm text-[#1a2a44] leading-snug">
        You've read <strong>85% more EU politics</strong> than the average reader — go unlimited and never miss a story.
      </p>
      <button
        onClick={() => navigate('/subscriptions')}
        className="shrink-0 bg-[#EE6260] hover:bg-[#d44947] text-white font-black text-[11px] uppercase tracking-widest px-5 py-2.5 rounded-sm transition-colors"
      >
        Go Unlimited →
      </button>
    </div>
  );
};

export default RegisteredFreeInlineBanner;
