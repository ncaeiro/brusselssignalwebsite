
import React, { createContext, useContext, useState, useCallback } from 'react';

interface ArticleRead {
  id: string;
  timestamp: number;
}

interface RegistrationGatingContextType {
  recordArticleRead: (articleId: string) => void;
  openRegistrationWall: (prefillEmail?: string) => void;
  isRegistrationWallOpen: boolean;
  closeRegistrationWall: () => void;
  prefillEmail: string;
  articleCount30Days: number;
  sessionCount: number;
  isRegistered: boolean;
  setRegistered: () => void;
}

const RegistrationGatingContext = createContext<RegistrationGatingContextType | null>(null);

const READS_KEY = 'bs_article_reads';
const WALL_SHOWN_KEY = 'bs_wall_shown_at';
const REGISTERED_KEY = 'bs_registered';
const SESSION_KEY = 'bs_session_reads';

const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;
const WALL_COOLDOWN_MS = 12 * 60 * 60 * 1000; // 12 hours between forced triggers

// Thresholds: show wall after 2 in same session OR 3 in 30 days
const SESSION_THRESHOLD = 2;
const MONTHLY_THRESHOLD = 3;

function getArticleReads(): ArticleRead[] {
  try {
    const raw = localStorage.getItem(READS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveArticleReads(reads: ArticleRead[]) {
  try {
    localStorage.setItem(READS_KEY, JSON.stringify(reads));
  } catch {}
}

function getSessionReads(): string[] {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveSessionReads(reads: string[]) {
  try {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(reads));
  } catch {}
}

function getIsRegistered(): boolean {
  try {
    return localStorage.getItem(REGISTERED_KEY) === 'true';
  } catch {
    return false;
  }
}

function get30DayCount(): number {
  const now = Date.now();
  return getArticleReads().filter(r => now - r.timestamp < THIRTY_DAYS_MS).length;
}

export const RegistrationGatingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isRegistrationWallOpen, setIsRegistrationWallOpen] = useState(false);
  const [prefillEmail, setPrefillEmail] = useState('');
  const [isRegistered, setIsRegisteredState] = useState(getIsRegistered);
  const [articleCount30Days, setArticleCount30Days] = useState(get30DayCount);
  const [sessionCount, setSessionCount] = useState(() => getSessionReads().length);

  const checkShouldShowWall = useCallback((newSessionCount: number, new30DayCount: number): boolean => {
    if (getIsRegistered()) return false;
    const wallShownAt = parseInt(localStorage.getItem(WALL_SHOWN_KEY) || '0', 10);
    if (Date.now() - wallShownAt < WALL_COOLDOWN_MS) return false;
    return newSessionCount >= SESSION_THRESHOLD || new30DayCount >= MONTHLY_THRESHOLD;
  }, []);

  const recordArticleRead = useCallback((articleId: string) => {
    if (getIsRegistered()) return;

    const now = Date.now();

    // --- Session tracking ---
    const sessionReads = getSessionReads();
    let newSessionCount = sessionReads.length;
    if (!sessionReads.includes(articleId)) {
      sessionReads.push(articleId);
      saveSessionReads(sessionReads);
      newSessionCount = sessionReads.length;
      setSessionCount(newSessionCount);
    }

    // --- 30-day tracking ---
    const reads = getArticleReads();
    const recentReads = reads.filter(r => now - r.timestamp < THIRTY_DAYS_MS);
    let new30DayCount = recentReads.length;
    if (!recentReads.some(r => r.id === articleId)) {
      recentReads.push({ id: articleId, timestamp: now });
      saveArticleReads(recentReads);
      new30DayCount = recentReads.length;
      setArticleCount30Days(new30DayCount);
    }

    // --- Trigger wall ---
    if (checkShouldShowWall(newSessionCount, new30DayCount)) {
      localStorage.setItem(WALL_SHOWN_KEY, String(now));
      setIsRegistrationWallOpen(true);
    }
  }, [checkShouldShowWall]);

  const openRegistrationWall = useCallback((email?: string) => {
    setPrefillEmail(email || '');
    setIsRegistrationWallOpen(true);
  }, []);

  const closeRegistrationWall = useCallback(() => {
    setIsRegistrationWallOpen(false);
  }, []);

  const setRegistered = useCallback(() => {
    try {
      localStorage.setItem(REGISTERED_KEY, 'true');
    } catch {}
    setIsRegisteredState(true);
    setIsRegistrationWallOpen(false);
    setPrefillEmail('');
  }, []);

  return (
    <RegistrationGatingContext.Provider value={{
      recordArticleRead,
      openRegistrationWall,
      isRegistrationWallOpen,
      closeRegistrationWall,
      prefillEmail,
      articleCount30Days,
      sessionCount,
      isRegistered,
      setRegistered,
    }}>
      {children}
    </RegistrationGatingContext.Provider>
  );
};

export const useRegistrationGating = (): RegistrationGatingContextType => {
  const ctx = useContext(RegistrationGatingContext);
  if (!ctx) throw new Error('useRegistrationGating must be used within RegistrationGatingProvider');
  return ctx;
};
