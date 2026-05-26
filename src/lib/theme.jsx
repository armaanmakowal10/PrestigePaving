import React from 'react';

const STORAGE_KEY = 'prestige-theme';

const ThemeContext = React.createContext(null);

export function ThemeProvider({ children }) {
  const setTheme = React.useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, 'dark');
    } catch {
      /* ignore */
    }
    document.documentElement.dataset.theme = 'dark';
  }, []);

  const toggleTheme = React.useCallback(() => {}, []);

  React.useEffect(() => {
    document.body.classList.add('theme-dark');
    document.documentElement.dataset.theme = 'dark';
    try {
      localStorage.setItem(STORAGE_KEY, 'dark');
    } catch {
      /* ignore */
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme: 'dark', setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = React.useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return ctx;
}
