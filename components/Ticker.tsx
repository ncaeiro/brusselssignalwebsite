
import React from 'react';

const Ticker: React.FC = () => {
  const tickerItems = [
    "Poland rebuffs Trump suggestion that Russian drone incursion a 'possible accident'",
    "Nordic airports reopen as police probe mystery drones",
    "Belgium needs eight new nuclear plants, study shows",
    "Italian protesters hit the streets over Gaza crisis"
  ];

  return (
    <div className="bg-white border-b border-gray-200 shadow-sm py-2 overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 flex items-center whitespace-nowrap relative">
        {/* The 'LATEST' label with a solid background to hide text scrolling behind it */}
        <div className="relative z-10 bg-white pr-6 py-1 flex-shrink-0">
          <span className="bg-[#EE6260] text-white px-3 py-1 text-sm font-bold uppercase rounded-sm">LATEST</span>
        </div>
        
        {/* The scrolling marquee container */}
        <div className="overflow-hidden flex-1 relative">
          <div className="animate-marquee flex gap-12 text-sm font-medium">
            {tickerItems.map((item, index) => (
              <span key={index}>• {item}</span>
            ))}
            {/* Duplicate for seamless looping */}
            {tickerItems.map((item, index) => (
              <span key={`dup-${index}`}>• {item}</span>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          animation: marquee 40s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default Ticker;
