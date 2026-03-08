import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';

interface ThemeContextType {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  isTransitioning: boolean;
}

const ThemeContext = createContext<ThemeContextType>({ theme: 'dark', toggleTheme: () => {}, isTransitioning: false });

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('theme') as 'dark' | 'light') || 'dark';
    }
    return 'dark';
  });
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [slideDirection, setSlideDirection] = useState<'none' | 'slide'>('none');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setSlideDirection('slide');

    // Quick transition
    setTimeout(() => {
      setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    }, 150);

    setTimeout(() => {
      setIsTransitioning(false);
      setSlideDirection('none');
    }, 500);
  }, [isTransitioning]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isTransitioning }}>
      <div
        className="theme-transition-wrapper"
        style={{
          transition: slideDirection === 'slide' ? 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease' : 'none',
          transform: isTransitioning ? 'translateX(0)' : 'translateX(0)',
        }}
      >
        <div style={{
          animation: slideDirection === 'slide' ? 'themePush 0.5s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
        }}>
          {children}
        </div>
      </div>
    </ThemeContext.Provider>
  );
};
