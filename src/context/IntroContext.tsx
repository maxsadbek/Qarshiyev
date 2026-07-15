import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { INTRO_STORAGE_KEY } from '@/components/intro/constants';

interface IntroContextValue {
  /** Whether the intro overlay is currently blocking the page */
  isIntroActive: boolean;
  /** Whether the intro has finished (or was skipped) — triggers hero animations */
  isIntroComplete: boolean;
  /** Whether intro should play on this visit */
  shouldPlayIntro: boolean;
  /** Mark intro as started */
  startIntro: () => void;
  /** Mark intro as complete and persist to sessionStorage */
  completeIntro: () => void;
  /** Skip intro immediately */
  skipIntro: () => void;
}

const IntroContext = createContext<IntroContextValue | null>(null);

export const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const hasSeenIntro = (): boolean => {
  try {
    return sessionStorage.getItem(INTRO_STORAGE_KEY) === '1';
  } catch {
    return true;
  }
};

export const IntroProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const canPlay = !prefersReducedMotion() && !hasSeenIntro();

  const [shouldPlayIntro] = useState(canPlay);
  const [isIntroActive, setIsIntroActive] = useState(false);
  const [isIntroComplete, setIsIntroComplete] = useState(!canPlay);

  const startIntro = useCallback(() => {
    setIsIntroActive(true);
    setIsIntroComplete(false);
  }, []);

  const completeIntro = useCallback(() => {
    try {
      sessionStorage.setItem(INTRO_STORAGE_KEY, '1');
    } catch {
      /* silent */
    }
    setIsIntroActive(false);
    setIsIntroComplete(true);
  }, []);

  const skipIntro = useCallback(() => {
    completeIntro();
  }, [completeIntro]);

  const value = useMemo(
    () => ({
      isIntroActive,
      isIntroComplete,
      shouldPlayIntro,
      startIntro,
      completeIntro,
      skipIntro,
    }),
    [isIntroActive, isIntroComplete, shouldPlayIntro, startIntro, completeIntro, skipIntro],
  );

  return <IntroContext.Provider value={value}>{children}</IntroContext.Provider>;
};

export const useIntro = (): IntroContextValue => {
  const ctx = useContext(IntroContext);
  if (!ctx) {
    throw new Error('useIntro must be used within IntroProvider');
  }
  return ctx;
};
