import React, { createContext, useContext, useState, useEffect } from "react";

interface InitialLoadContextType {
  isLoading: boolean;
}

const InitialLoadContext = createContext<InitialLoadContextType>({
  isLoading: true,
});

export const InitialLoadProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Low fidelity skeleton loading state runs only on initial page load / refresh (2.5s duration)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <InitialLoadContext.Provider value={{ isLoading }}>
      {children}
    </InitialLoadContext.Provider>
  );
};

export const useInitialLoad = () => useContext(InitialLoadContext);

export default InitialLoadContext;
