'use client';

import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import type { Locale, User } from '@/types';
import { t } from '@/lib/i18n';

interface AppContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  user: User | null;
  setUser: (u: User | null) => void;
  tr: (key: string) => string;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>('en');
  const [user, setUser] = useState<User | null>(null);

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      user,
      setUser,
      tr: (key: string) => t(locale, key),
    }),
    [locale, user],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
