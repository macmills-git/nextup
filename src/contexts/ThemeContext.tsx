import { createContext, useContext, useState, useEffect, ReactNode, useCallback, useRef } from 'react';

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

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setIsTransitioning(true);
    // Add transition class to html for smooth color transitions
    document.documentElement.style.transition = 'background-color 0.4s ease, color 0.4s ease';
    document.body.style.transition = 'background-color 0.4s ease, color 0.4s ease';
    
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    
    setTimeout(() => {
      setIsTransitioning(false);
      document.documentElement.style.transition = '';
      document.body.style.transition = '';
    }, 400);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isTransitioning }}>
      <div className="theme-transition-wrapper">
        {children}
      </div>
    </ThemeContext.Provider>
  );
};
