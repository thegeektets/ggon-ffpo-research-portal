'use client';

import { usePathname } from 'next/navigation';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { MainShell } from '@/components/MainShell';
import { WorkspaceShell } from '@/components/WorkspaceShell';
import { useApp } from '@/context/AppContext';
import { isWorkspaceRoute } from '@/lib/workspace-routes';

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user } = useApp();
  const inWorkspace = isWorkspaceRoute(pathname) && user;

  if (inWorkspace) {
    return <WorkspaceShell>{children}</WorkspaceShell>;
  }

  return (
    <>
      <Header />
      <MainShell>{children}</MainShell>
      <Footer />
    </>
  );
}
