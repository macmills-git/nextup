import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';

interface ThemeContextType {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({ theme: 'dark', toggleTheme: () => {} });

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [sweepVisible, setSweepVisible] = useState(false);
  const [sweepTheme, setSweepTheme] = useState<'dark' | 'light'>('light');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const toggleTheme = useCallback(() => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setSweepTheme(nextTheme);
    setSweepVisible(true);
    // Halfway through sweep, change actual theme
    setTimeout(() => {
      setTheme(nextTheme);
    }, 350);
    // Remove overlay after sweep completes
    setTimeout(() => {
      setSweepVisible(false);
    }, 700);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
      {sweepVisible && (
        <div
          className="fixed inset-0 z-[9999] pointer-events-none"
          style={{
            background: sweepTheme === 'dark' ? '#0B0B0F' : '#F8F9FB',
            animation: 'themeSweepLR 700ms ease-in-out forwards',
          }}
        />
      )}
    </ThemeContext.Provider>
  );
};
