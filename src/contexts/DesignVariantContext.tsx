import { createContext, useContext, useState, ReactNode, useCallback } from 'react';

type DesignVariant = 'brutalist' | 'saas';

interface DesignVariantContextType {
  variant: DesignVariant;
  toggleVariant: () => void;
}

const DesignVariantContext = createContext<DesignVariantContextType>({
  variant: 'brutalist',
  toggleVariant: () => {},
});

export const useDesignVariant = () => useContext(DesignVariantContext);

export const DesignVariantProvider = ({ children }: { children: ReactNode }) => {
  const [variant, setVariant] = useState<DesignVariant>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('design-variant') as DesignVariant) || 'brutalist';
    }
    return 'brutalist';
  });

  const toggleVariant = useCallback(() => {
    const next = variant === 'brutalist' ? 'saas' : 'brutalist';
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        setVariant(next);
        localStorage.setItem('design-variant', next);
      });
    } else {
      setVariant(next);
      localStorage.setItem('design-variant', next);
    }
  }, [variant]);

  return (
    <DesignVariantContext.Provider value={{ variant, toggleVariant }}>
      {children}
    </DesignVariantContext.Provider>
  );
};
