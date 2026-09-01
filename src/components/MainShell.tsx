'use client';

import { usePathname } from 'next/navigation';

export function MainShell({ children }: { children: React.ReactNode }) {
  const isHome = usePathname() === '/';
  return (
    <main className={isHome ? 'flex-1' : 'mx-auto w-full max-w-6xl flex-1 px-4 py-8'}>
      {children}
    </main>
  );
}
