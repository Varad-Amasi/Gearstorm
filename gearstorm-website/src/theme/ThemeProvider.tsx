import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

/* Theme type and hook live next to the provider so pages can toggle palettes. */
/* eslint-disable react-refresh/only-export-components */

export type Theme = 'dark' | 'light';

const STORAGE_KEY = 'gs-theme';

const ThemeContext = createContext<{
  theme: Theme;
  toggleTheme: () => void;
} | null>(null);

export const readDocumentTheme = (): Theme => {
  if (typeof document === 'undefined') {
    return 'dark';
  }
  return document.documentElement.classList.contains('light')
    ? 'light'
    : 'dark';
};

const applyTheme = (theme: Theme): void => {
  document.documentElement.classList.toggle('light', theme === 'light');
  document.documentElement.classList.toggle('dark', theme === 'dark');
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', theme === 'light' ? '#d9d0c4' : '#080810');
};

export const ThemeProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const [theme, setTheme] = useState<Theme>(readDocumentTheme);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const toggleTheme = useCallback((): void => {
    setTheme((current) => {
      const next: Theme = current === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        /* private mode */
      }
      applyTheme(next);
      return next;
    });
  }, []);

  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = (): { theme: Theme; toggleTheme: () => void } => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
