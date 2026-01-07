import React, { useState, useEffect } from 'react';

const ReadingProgressBar: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const calculateScrollProgress = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;

      // Calculate the total scrollable distance
      const scrollableDistance = documentHeight - windowHeight;

      // Calculate progress percentage (0-100)
      const progress = scrollableDistance > 0
        ? (scrollTop / scrollableDistance) * 100
        : 0;

      setScrollProgress(Math.min(progress, 100));
    };

    // Calculate on mount
    calculateScrollProgress();

    // Add scroll event listener
    window.addEventListener('scroll', calculateScrollProgress);
    window.addEventListener('resize', calculateScrollProgress);

    // Cleanup
    return () => {
      window.removeEventListener('scroll', calculateScrollProgress);
      window.removeEventListener('resize', calculateScrollProgress);
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 w-full h-1 bg-gray-200/30 z-50"
      style={{ backdropFilter: 'blur(8px)' }}
    >
      <div
        className="h-full bg-gradient-to-r from-red-600 to-red-500 transition-all duration-150 ease-out shadow-sm"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
};

export default ReadingProgressBar;
