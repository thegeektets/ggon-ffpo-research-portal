'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { RoleBadge } from '@/components/Header';
import { useApp } from '@/context/AppContext';
import { localeLabels, locales } from '@/lib/i18n';
import { usePortalStore } from '@/lib/store';

const navItems = [
  { href: '/dashboard', key: 'workspaceHome' },
  { href: '/submit', key: 'submit' },
  { href: '/members', key: 'members' },
  { href: '/admin', key: 'admin', roles: ['owner', 'administrator', 'editor', 'reviewer'] as const },
];

export function WorkspaceShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, setUser, locale, setLocale, tr } = useApp();
  const { submissions } = usePortalStore();

  const adminQueueCount = submissions.filter(
    (s) => s.status === 'pending' || s.status === 'approved',
  ).length;

  if (!user) return <>{children}</>;

  return (
    <div className="ggon-workspace flex min-h-[calc(100vh-0px)] flex-1 bg-[#eef1f2]">
      <aside className="hidden w-60 shrink-0 flex-col border-r border-[#2a3f44] bg-[#1c2b2e] text-white md:flex">
        <div className="border-b border-white/10 px-5 py-6">
          <Link href="/dashboard" className="block">
            <Image
              src="/ggon-logo.png"
              alt="Global Gas & Oil Network"
              width={160}
              height={36}
              className="h-8 w-auto brightness-0 invert"
            />
          </Link>
          <p className="ggon-label mt-3 text-[10px] tracking-[0.2em] text-[#7ec8d4]">
            {tr('memberWorkspace')}
          </p>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-4">
          {navItems.map((item) => {
            if (item.roles && !item.roles.some((r) => r === user.role)) return null;
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-3 py-2.5 text-xs font-bold uppercase tracking-widest transition-colors ${
                  active
                    ? 'bg-[#1a6b7a] text-white'
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                <span className="flex items-center justify-between gap-2">
                  {tr(item.key)}
                  {item.href === '/admin' && adminQueueCount > 0 && (
                    <span className="rounded-full bg-[#a34b12] px-1.5 py-0.5 text-[9px] font-bold text-white">
                      {adminQueueCount}
                    </span>
                  )}
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-white/10 px-5 py-4">
          <Link
            href="/library"
            className="text-xs font-bold uppercase tracking-widest text-[#7ec8d4] hover:text-white"
          >
            {tr('browsePublicLibrary')} →
          </Link>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="border-b border-[#d5dde0] bg-white px-4 py-3 md:px-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <div className="md:hidden">
                <Link href="/dashboard" className="ggon-label text-xs text-[#1a6b7a]">
                  {tr('memberWorkspace')}
                </Link>
              </div>
              <div className="hidden h-6 w-px bg-[#dcdcdc] md:block" aria-hidden />
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-[#242424]">{user.name}</p>
                <p className="truncate text-xs text-[#7f7f7f]">{user.email}</p>
              </div>
              <RoleBadge role={user.role} />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <select
                value={locale}
                onChange={(e) => setLocale(e.target.value as typeof locale)}
                className="border border-[#dcdcdc] bg-white px-2 py-1 text-xs uppercase text-[#242424]"
                aria-label="Language"
              >
                {locales.map((l) => (
                  <option key={l} value={l}>
                    {localeLabels[l]}
                  </option>
                ))}
              </select>
              <Link href="/library" className="ggon-btn !py-1 !text-xs md:hidden">
                {tr('library')}
              </Link>
              <button type="button" onClick={() => setUser(null)} className="ggon-btn !py-1 !text-xs">
                {tr('logout')}
              </button>
            </div>
          </div>

          <nav className="mt-3 flex gap-2 overflow-x-auto md:hidden">
            {navItems.map((item) => {
              if (item.roles && !item.roles.some((r) => r === user.role)) return null;
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`shrink-0 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest ${
                    active ? 'bg-[#1a6b7a] text-white' : 'bg-[#eef1f2] text-[#242424]'
                  }`}
                >
                  <span className="inline-flex items-center gap-1">
                    {tr(item.key)}
                    {item.href === '/admin' && adminQueueCount > 0 && (
                      <span className="rounded-full bg-[#a34b12] px-1 text-[8px] font-bold text-white">
                        {adminQueueCount}
                      </span>
                    )}
                  </span>
                </Link>
              );
            })}
          </nav>
        </header>

        <main className="flex-1 px-4 py-6 md:px-8 md:py-8">{children}</main>
      </div>
    </div>
  );
}
