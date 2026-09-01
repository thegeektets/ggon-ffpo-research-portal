'use client';

import { usePathname } from 'next/navigation';

export function MainShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const isArticle = pathname.startsWith('/library/') && pathname !== '/library';

  if (isHome || isArticle) {
    return <main className="flex-1">{children}</main>;
  }

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
      {children}
    </main>
  );
}
