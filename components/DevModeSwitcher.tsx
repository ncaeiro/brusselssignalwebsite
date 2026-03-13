
import React from 'react';
import { useRegistrationGating, UserType } from '../src/RegistrationGatingContext.tsx';

const DevModeSwitcher: React.FC = () => {
  if (!import.meta.env.DEV) return null;

  const { userType, setUserType } = useRegistrationGating();

  const options: Array<{ label: string; value: UserType; color: string }> = [
    { label: 'Anonymous', value: 'anonymous', color: 'bg-gray-500' },
    { label: 'Registered Free', value: 'registered-free', color: 'bg-blue-500' },
    { label: 'Subscriber', value: 'subscriber', color: 'bg-green-600' },
  ];

  return (
    <div className="fixed bottom-4 right-4 z-[9999] bg-black/90 text-white rounded-xl p-3 shadow-2xl border border-white/10 min-w-[160px]">
      <p className="font-black text-[9px] uppercase tracking-[0.15em] text-yellow-400 mb-2.5">
        ⚙ DEV: User Type
      </p>
      <div className="flex flex-col gap-1.5">
        {options.map(opt => (
          <button
            key={opt.value}
            onClick={() => setUserType(opt.value)}
            className={`px-3 py-1.5 rounded text-left text-[11px] font-semibold transition-all ${
              userType === opt.value
                ? `${opt.color} text-white shadow-md`
                : 'bg-white/10 hover:bg-white/20 text-white/70'
            }`}
          >
            {userType === opt.value ? '● ' : '○ '}
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DevModeSwitcher;
