
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { NewsItem } from './types.ts';

interface FavoritesContextType {
  favorites: NewsItem[];
  addToFavorites: (article: NewsItem) => void;
  removeFromFavorites: (articleId: string) => void;
  isFavorited: (articleId: string) => boolean;
  toggleFavorite: (article: NewsItem) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

interface FavoritesProviderProps {
  children: ReactNode;
}

export const FavoritesProvider: React.FC<FavoritesProviderProps> = ({ children }) => {
  const [favorites, setFavorites] = useState<NewsItem[]>(() => {
    // Load favorites from localStorage on init
    const stored = localStorage.getItem('brusselssignal_favorites');
    return stored ? JSON.parse(stored) : [];
  });

  // Persist favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('brusselssignal_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (article: NewsItem) => {
    setFavorites(prev => {
      // Avoid duplicates
      if (prev.some(item => item.id === article.id)) {
        return prev;
      }
      return [...prev, article];
    });
  };

  const removeFromFavorites = (articleId: string) => {
    setFavorites(prev => prev.filter(item => item.id !== articleId));
  };

  const isFavorited = (articleId: string): boolean => {
    return favorites.some(item => item.id === articleId);
  };

  const toggleFavorite = (article: NewsItem) => {
    if (isFavorited(article.id)) {
      removeFromFavorites(article.id);
    } else {
      addToFavorites(article);
    }
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorited,
        toggleFavorite
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
