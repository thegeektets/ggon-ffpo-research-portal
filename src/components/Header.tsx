'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
  const pathname = usePathname();
  const { user, setUser, locale, setLocale, tr } = useApp();
  const canAdmin = user && ['owner', 'administrator', 'editor', 'reviewer'].includes(user.role);
  const onHome = pathname === '/';

  return (
    <header
      className={
        onHome
          ? 'absolute inset-x-0 top-0 z-20 border-b border-white/10'
          : 'border-b border-[#efefef] bg-white'
      }
    >
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-5">
        <Link href="/" className="min-w-0 shrink-0">
          <Image
            src="/ggon-logo.png"
            alt="Global Gas & Oil Network"
            width={200}
            height={44}
            className={`h-9 w-auto ${onHome ? '' : 'brightness-0'}`}
            priority
          />
        </Link>
        <nav
          className={`flex flex-wrap items-center gap-4 text-xs font-bold uppercase tracking-widest ${
            onHome ? 'text-white' : 'text-[#242424]'
          }`}
        >
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={
                pathname === item.href
                  ? onHome
                    ? 'text-white'
                    : 'text-[#242424] underline underline-offset-4'
                  : onHome
                    ? 'text-white/80 hover:text-white'
                    : 'text-[#7f7f7f] hover:text-[#242424]'
              }
            >
              {tr(item.key)}
            </Link>
          ))}
          {user && (
            <>
              <Link
                href="/members"
                className={onHome ? 'text-white/80 hover:text-white' : 'text-[#7f7f7f] hover:text-[#242424]'}
              >
                {tr('members')}
              </Link>
              <Link
                href="/submit"
                className={onHome ? 'text-white/80 hover:text-white' : 'text-[#7f7f7f] hover:text-[#242424]'}
              >
                {tr('submit')}
              </Link>
            </>
          )}
          {canAdmin && (
            <Link
              href="/admin"
              className={onHome ? 'bg-white/20 px-2 py-1 text-white' : 'bg-[#efefef] px-2 py-1 text-[#242424]'}
            >
              {tr('admin')}
            </Link>
          )}
        </nav>
        <div className={`flex flex-wrap items-center gap-2 text-xs ${onHome ? 'text-white' : ''}`}>
          <select
            value={locale}
            onChange={(e) => setLocale(e.target.value as typeof locale)}
            className={`border px-2 py-1 text-xs uppercase ${
              onHome ? 'border-white/30 bg-black/30 text-white' : 'border-[#dcdcdc] bg-white text-[#242424]'
            }`}
            aria-label="Language"
          >
            {locales.map((l) => (
              <option key={l} value={l}>
                {localeLabels[l]}
              </option>
            ))}
          </select>
          {user ? (
            <button type="button" onClick={() => setUser(null)} className="ggon-btn !py-1 !text-xs">
              {tr('logout')}
            </button>
          ) : (
            <>
              <Link href="/login" className={`ggon-link text-xs uppercase ${onHome ? '!text-white' : ''}`}>
                {tr('login')}
              </Link>
              <Link href="/register" className="ggon-btn !py-1 !text-xs">
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
    owner: 'bg-[#242424] text-white',
    administrator: 'bg-[#dcdcdc] text-[#222]',
    editor: 'bg-[#efefef] text-[#242424]',
    reviewer: 'bg-[#efefef] text-[#242424]',
    member: 'bg-white text-[#7f7f7f] ring-1 ring-[#dcdcdc]',
  };
  return (
    <span className={`px-2 py-0.5 text-xs font-bold uppercase tracking-wide ${colors[role]}`}>{role}</span>
  );
}
