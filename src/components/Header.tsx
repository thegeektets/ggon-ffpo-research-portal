'use client';

import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { localeLabels, locales } from '@/lib/i18n';
import type { UserRole } from '@/types';

const nav = [
  { href: '/', key: 'home' },
  { href: '/library', key: 'library' },
  { href: '/themes', key: 'themes' },
  { href: '/narratives', key: 'narratives' },
  { href: '/about', key: 'about' },
];

export function Header() {
  const { user, setUser, locale, setLocale, tr } = useApp();
  const canAdmin = user && ['owner', 'administrator', 'editor', 'reviewer'].includes(user.role);

  return (
    <header className="border-b border-emerald-900/20 bg-emerald-950 text-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4">
        <Link href="/" className="min-w-0">
          <p className="text-lg font-semibold tracking-tight">{tr('siteName')}</p>
          <p className="text-xs text-emerald-200">{tr('tagline')}</p>
        </Link>
        <nav className="flex flex-wrap items-center gap-3 text-sm">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-emerald-200">
              {tr(item.key)}
            </Link>
          ))}
          {user && (
            <>
              <Link href="/members" className="hover:text-emerald-200">
                {tr('members')}
              </Link>
              <Link href="/submit" className="hover:text-emerald-200">
                {tr('submit')}
              </Link>
              <Link href="/ask-connect" className="hover:text-emerald-200">
                {tr('askConnect')}
              </Link>
            </>
          )}
          {canAdmin && (
            <Link href="/admin" className="rounded bg-amber-500 px-2 py-1 text-xs font-medium text-emerald-950">
              {tr('admin')}
            </Link>
          )}
        </nav>
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <select
            value={locale}
            onChange={(e) => setLocale(e.target.value as typeof locale)}
            className="rounded border border-emerald-700 bg-emerald-900 px-2 py-1 text-white"
            aria-label="Language"
          >
            {locales.map((l) => (
              <option key={l} value={l}>
                {localeLabels[l]}
              </option>
            ))}
          </select>
          {user ? (
            <button
              type="button"
              onClick={() => setUser(null)}
              className="rounded border border-emerald-600 px-3 py-1 hover:bg-emerald-900"
            >
              {tr('logout')} ({user.name})
            </button>
          ) : (
            <>
              <Link href="/login" className="rounded border border-emerald-600 px-3 py-1 hover:bg-emerald-900">
                {tr('login')}
              </Link>
              <Link href="/register" className="rounded bg-emerald-500 px-3 py-1 font-medium text-emerald-950">
                {tr('register')}
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export function RoleBadge({ role }: { role: UserRole }) {
  const colors: Record<UserRole, string> = {
    owner: 'bg-purple-100 text-purple-800',
    administrator: 'bg-amber-100 text-amber-900',
    editor: 'bg-blue-100 text-blue-800',
    reviewer: 'bg-teal-100 text-teal-800',
    member: 'bg-gray-100 text-gray-700',
  };
  return <span className={`rounded px-2 py-0.5 text-xs font-medium capitalize ${colors[role]}`}>{role}</span>;
}
