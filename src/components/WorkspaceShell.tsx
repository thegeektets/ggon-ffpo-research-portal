'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { RoleBadge } from '@/components/Header';
import { useApp } from '@/context/AppContext';
import { localeLabels, locales } from '@/lib/i18n';
import { ICON_NAV, Library, workspaceNavIcons } from '@/lib/icons';
import {
  adminQueueCountForRole,
  canPublishSubmissions,
  canReviewSubmissions,
  isAwaitingPublish,
  isInReviewQueue,
} from '@/lib/permissions';
import { usePortalStore } from '@/lib/store';
import type { UserRole } from '@/types';

type NavItem = {
  href: string;
  key: string;
  roles?: readonly UserRole[];
};

const navItems: NavItem[] = [
  { href: '/dashboard', key: 'workspaceHome' },
  { href: '/submit', key: 'submit' },
  { href: '/members', key: 'members' },
  {
    href: '/admin',
    key: 'admin',
    roles: ['owner', 'administrator', 'editor', 'reviewer'],
  },
];

function adminNavLabel(role: UserRole, tr: (key: string) => string): string {
  if (canReviewSubmissions(role) && !canPublishSubmissions(role)) return tr('navReviews');
  if (canPublishSubmissions(role) && !canReviewSubmissions(role)) return tr('navPublishing');
  return tr('admin');
}

export function WorkspaceShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, setUser, locale, setLocale, tr } = useApp();
  const { submissions, registrations } = usePortalStore();

  const inReview = submissions.filter((s) => isInReviewQueue(s.status)).length;
  const awaitingPublish = submissions.filter((s) => isAwaitingPublish(s.status)).length;
  const pendingRegistrations = registrations.length;

  const queueCount = user
    ? adminQueueCountForRole(user.role, {
        inReview,
        awaitingPublish,
        pendingRegistrations,
      })
    : 0;

  if (!user) return <>{children}</>;

  return (
    <div className="ggon-workspace flex min-h-[calc(100vh-0px)] flex-1">
      <aside className="ggon-sidebar hidden w-64 shrink-0 flex-col text-white md:flex">
        <div className="relative border-b border-white/10 px-5 py-6">
          <Link href="/dashboard" className="block">
            <Image
              src="/ggon-logo.png"
              alt="Global Gas & Oil Network"
              width={160}
              height={36}
              className="h-8 w-auto brightness-0 invert"
            />
          </Link>
          <p className="ggon-label mt-3 text-[10px] tracking-[0.22em] text-[#a8dce4]">
            {tr('memberWorkspace')}
          </p>
        </div>

        <nav className="relative flex-1 space-y-1 px-3 py-5">
          {navItems.map((item) => {
            if (item.roles && !item.roles.some((r) => r === user.role)) return null;
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            const label = item.href === '/admin' ? adminNavLabel(user.role, tr) : tr(item.key);
            const NavIcon = workspaceNavIcons[item.href];
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`ggon-sidebar-link ${active ? 'ggon-sidebar-link-active' : ''}`}
              >
                {NavIcon && <NavIcon size={ICON_NAV} strokeWidth={1.75} className="shrink-0 opacity-90" />}
                <span className="flex flex-1 items-center justify-between gap-2">
                  {label}
                  {item.href === '/admin' && queueCount > 0 && (
                    <span className="rounded-full bg-[#c45c26] px-1.5 py-0.5 text-[9px] font-bold text-white shadow-sm">
                      {queueCount}
                    </span>
                  )}
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="relative space-y-4 border-t border-white/10 px-5 py-5">
          <Link
            href="/library"
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#a8dce4] transition-colors hover:text-white"
          >
            <Library size={ICON_NAV} strokeWidth={1.75} />
            {tr('browsePublicLibrary')} →
          </Link>
          <div className="rounded-lg bg-white/8 px-3 py-3 backdrop-blur-sm">
            <p className="truncate text-xs font-semibold text-white">{user.name}</p>
            <p className="mt-0.5 truncate text-[10px] text-white/60">{user.email}</p>
            <div className="mt-2">
              <RoleBadge role={user.role} />
            </div>
          </div>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="ggon-workspace-header px-4 py-3 md:px-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <div className="md:hidden">
                <Link href="/dashboard" className="flex items-center gap-2">
                  <Image
                    src="/ggon-logo.png"
                    alt="GGON"
                    width={100}
                    height={24}
                    className="h-6 w-auto brightness-0"
                  />
                </Link>
              </div>
              <div className="hidden min-w-0 md:block">
                <p className="truncate text-sm font-semibold text-[#242424]">{user.name}</p>
                <p className="truncate text-xs text-[#7f7f7f]">{user.email}</p>
              </div>
              <div className="hidden md:block">
                <RoleBadge role={user.role} />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <select
                value={locale}
                onChange={(e) => setLocale(e.target.value as typeof locale)}
                className="rounded border border-[#dcdcdc] bg-white px-2 py-1.5 text-xs uppercase text-[#242424] shadow-sm"
                aria-label="Language"
              >
                {locales.map((l) => (
                  <option key={l} value={l}>
                    {localeLabels[l]}
                  </option>
                ))}
              </select>
              <Link href="/library" className="ggon-btn !rounded !py-1.5 !text-xs md:hidden">
                {tr('library')}
              </Link>
              <button
                type="button"
                onClick={() => setUser(null)}
                className="ggon-btn !rounded !py-1.5 !text-xs"
              >
                {tr('logout')}
              </button>
            </div>
          </div>

          <nav className="mt-3 flex gap-2 overflow-x-auto pb-1 md:hidden">
            {navItems.map((item) => {
              if (item.roles && !item.roles.some((r) => r === user.role)) return null;
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              const label = item.href === '/admin' ? adminNavLabel(user.role, tr) : tr(item.key);
              const NavIcon = workspaceNavIcons[item.href];
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`ggon-mobile-nav-pill ${
                    active ? 'ggon-mobile-nav-pill-active' : 'ggon-mobile-nav-pill-inactive'
                  }`}
                >
                  {NavIcon && <NavIcon size={14} strokeWidth={1.75} />}
                  {label}
                  {item.href === '/admin' && queueCount > 0 && (
                    <span className="rounded-full bg-[#c45c26] px-1 text-[8px] font-bold text-white">
                      {queueCount}
                    </span>
                  )}
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
