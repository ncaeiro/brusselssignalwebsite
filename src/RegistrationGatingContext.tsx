
import React, { createContext, useContext, useState, useCallback, useRef } from 'react';

export type UserType = 'anonymous' | 'registered-free' | 'subscriber';

interface ArticleRead {
  id: string;
  timestamp: number;
}

interface PremiumView {
  id: string;
  timestamp: number;
  category: string;
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
  // User type (dev switcher + registration flow)
  userType: UserType;
  setUserType: (type: UserType) => void;
  // Registered-free premium gating
  recordPremiumView: (articleId: string, category: string) => void;
  isPremiumSoftModalOpen: boolean;
  closePremiumSoftModal: () => void;
  premiumArticleTopic: string;
  isHardModalOpen: boolean;
  closeHardModal: () => void;
}

const RegistrationGatingContext = createContext<RegistrationGatingContextType | null>(null);

const READS_KEY = 'bs_article_reads';
const WALL_SHOWN_KEY = 'bs_wall_shown_at';
const REGISTERED_KEY = 'bs_registered';
const SESSION_KEY = 'bs_session_reads';
const USER_TYPE_KEY = 'bs_user_type';
const PREMIUM_VIEWS_KEY = 'bs_premium_views';
const SESSION_DAYS_KEY = 'bs_session_days';

const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;
const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;
const WALL_COOLDOWN_MS = 12 * 60 * 60 * 1000;

const SESSION_THRESHOLD = 2;
const MONTHLY_THRESHOLD = 3;
const HARD_MODAL_SESSION_DAYS = 3;
const HARD_MODAL_CATEGORY_COUNT = 3;

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

function getUserType(): UserType {
  try {
    const val = localStorage.getItem(USER_TYPE_KEY);
    if (val === 'registered-free' || val === 'subscriber') return val;
    return 'anonymous';
  } catch {
    return 'anonymous';
  }
}

function saveUserType(type: UserType) {
  try {
    localStorage.setItem(USER_TYPE_KEY, type);
  } catch {}
}

function getPremiumViews(): PremiumView[] {
  try {
    const raw = localStorage.getItem(PREMIUM_VIEWS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function savePremiumViews(views: PremiumView[]) {
  try {
    localStorage.setItem(PREMIUM_VIEWS_KEY, JSON.stringify(views));
  } catch {}
}

function getSessionDays(): string[] {
  try {
    const raw = localStorage.getItem(SESSION_DAYS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveSessionDays(days: string[]) {
  try {
    localStorage.setItem(SESSION_DAYS_KEY, JSON.stringify(days));
  } catch {}
}

function todayStr(): string {
  return new Date().toISOString().slice(0, 10);
}

export const RegistrationGatingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isRegistrationWallOpen, setIsRegistrationWallOpen] = useState(false);
  const [prefillEmail, setPrefillEmail] = useState('');
  const [isRegistered, setIsRegisteredState] = useState(getIsRegistered);
  const [articleCount30Days, setArticleCount30Days] = useState(get30DayCount);
  const [sessionCount, setSessionCount] = useState(() => getSessionReads().length);
  const [userType, setUserTypeState] = useState<UserType>(getUserType);
  const [isPremiumSoftModalOpen, setIsPremiumSoftModalOpen] = useState(false);
  const [premiumArticleTopic, setPremiumArticleTopic] = useState('');
  const [isHardModalOpen, setIsHardModalOpen] = useState(false);

  // Ref so callbacks always read current userType without re-creating them
  const userTypeRef = useRef<UserType>(userType);

  const setUserType = useCallback((type: UserType) => {
    saveUserType(type);
    userTypeRef.current = type;
    setUserTypeState(type);
    // Sync isRegistered state
    if (type === 'registered-free' || type === 'subscriber') {
      try { localStorage.setItem(REGISTERED_KEY, 'true'); } catch {}
      setIsRegisteredState(true);
    } else {
      try { localStorage.removeItem(REGISTERED_KEY); } catch {}
      setIsRegisteredState(false);
    }
  }, []);

  const checkShouldShowWall = useCallback((newSessionCount: number, new30DayCount: number): boolean => {
    if (getIsRegistered()) return false;
    const wallShownAt = parseInt(localStorage.getItem(WALL_SHOWN_KEY) || '0', 10);
    if (Date.now() - wallShownAt < WALL_COOLDOWN_MS) return false;
    return newSessionCount >= SESSION_THRESHOLD || new30DayCount >= MONTHLY_THRESHOLD;
  }, []);

  const recordArticleRead = useCallback((articleId: string) => {
    if (getIsRegistered()) return;

    const now = Date.now();

    const sessionReads = getSessionReads();
    let newSessionCount = sessionReads.length;
    if (!sessionReads.includes(articleId)) {
      sessionReads.push(articleId);
      saveSessionReads(sessionReads);
      newSessionCount = sessionReads.length;
      setSessionCount(newSessionCount);
    }

    const reads = getArticleReads();
    const recentReads = reads.filter(r => now - r.timestamp < THIRTY_DAYS_MS);
    let new30DayCount = recentReads.length;
    if (!recentReads.some(r => r.id === articleId)) {
      recentReads.push({ id: articleId, timestamp: now });
      saveArticleReads(recentReads);
      new30DayCount = recentReads.length;
      setArticleCount30Days(new30DayCount);
    }

    if (checkShouldShowWall(newSessionCount, new30DayCount)) {
      localStorage.setItem(WALL_SHOWN_KEY, String(now));
      setIsRegistrationWallOpen(true);
    }
  }, [checkShouldShowWall]);

  const recordPremiumView = useCallback((articleId: string, category: string) => {
    if (userTypeRef.current !== 'registered-free') return;

    const now = Date.now();

    // Filter to last 30 days
    const views = getPremiumViews().filter(v => now - v.timestamp < THIRTY_DAYS_MS);
    const alreadySeen = views.some(v => v.id === articleId);
    const isFirstEver = views.length === 0;

    if (!alreadySeen) {
      views.push({ id: articleId, timestamp: now, category });
      savePremiumViews(views);
    }

    // Track today as an active session day (7-day window)
    const days = getSessionDays().filter(d => {
      const dayTime = new Date(d).getTime();
      return now - dayTime < SEVEN_DAYS_MS;
    });
    const today = todayStr();
    if (!days.includes(today)) {
      days.push(today);
      saveSessionDays(days);
    }

    // Hard modal: ≥3 unique session days in 7 days OR ≥3 articles in same category
    const categoryCount = views.filter(v => v.category === category).length;
    if (days.length >= HARD_MODAL_SESSION_DAYS || categoryCount >= HARD_MODAL_CATEGORY_COUNT) {
      setIsHardModalOpen(true);
      return;
    }

    // Soft modal: first ever premium view this session
    if (isFirstEver && !alreadySeen) {
      setPremiumArticleTopic(category);
      setIsPremiumSoftModalOpen(true);
    }
  }, []);

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
      saveUserType('registered-free');
    } catch {}
    userTypeRef.current = 'registered-free';
    setIsRegisteredState(true);
    setUserTypeState('registered-free');
    setIsRegistrationWallOpen(false);
    setPrefillEmail('');
  }, []);

  const closePremiumSoftModal = useCallback(() => {
    setIsPremiumSoftModalOpen(false);
  }, []);

  const closeHardModal = useCallback(() => {
    setIsHardModalOpen(false);
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
      userType,
      setUserType,
      recordPremiumView,
      isPremiumSoftModalOpen,
      closePremiumSoftModal,
      premiumArticleTopic,
      isHardModalOpen,
      closeHardModal,
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
