'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { ICON_INLINE, ICON_NAV, LayoutDashboard, LogIn, LogOut, publicNavIcons, UserPlus } from '@/lib/icons';
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
          {nav.map((item) => {
            const NavIcon = publicNavIcons[item.href];
            return (
            <Link
              key={item.href}
              href={item.href}
              className={
                pathname === item.href
                  ? onHome
                    ? 'text-white'
                    : 'text-[#1a6b7a] underline underline-offset-4'
                  : onHome
                    ? 'text-white/80 hover:text-white'
                    : 'text-[#7f7f7f] hover:text-[#1a6b7a]'
              }
            >
              <span className="inline-flex items-center gap-1.5">
                {NavIcon && <NavIcon size={ICON_NAV} strokeWidth={2} className="shrink-0" aria-hidden />}
                {tr(item.key)}
              </span>
            </Link>
            );
          })}
          {user && (
            <Link
              href="/dashboard"
              className={
                onHome
                  ? 'inline-flex items-center gap-1.5 bg-white/20 px-3 py-1.5 text-white hover:bg-white/30'
                  : 'inline-flex items-center gap-1.5 bg-[#1a6b7a] px-3 py-1.5 text-white hover:bg-[#145662]'
              }
            >
              <LayoutDashboard size={ICON_INLINE} strokeWidth={2} aria-hidden />
              {tr('memberWorkspace')} →
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
            <button type="button" onClick={() => setUser(null)} className="ggon-btn inline-flex items-center gap-1.5 !py-1 !text-xs">
              <LogOut size={ICON_INLINE} strokeWidth={2} aria-hidden />
              {tr('logout')}
            </button>
          ) : (
            <>
              <Link href="/login" className={`ggon-link inline-flex items-center gap-1.5 text-xs uppercase ${onHome ? '!text-white' : ''}`}>
                <LogIn size={ICON_INLINE} strokeWidth={2} aria-hidden />
                {tr('login')}
              </Link>
              <Link href="/register" className="ggon-btn ggon-btn-teal inline-flex items-center gap-1.5 !py-1 !text-xs">
                <UserPlus size={ICON_INLINE} strokeWidth={2} aria-hidden />
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
    administrator: 'bg-[#1a6b7a] text-white',
    editor: 'bg-[#e8f4f6] text-[#1a6b7a]',
    reviewer: 'bg-[#fef3e8] text-[#a34b12]',
    member: 'bg-[#e8f2ec] text-[#2d6a4f] ring-1 ring-[#2d6a4f]/30',
  };
  return (
    <span className={`px-2 py-0.5 text-xs font-bold uppercase tracking-wide ${colors[role]}`}>{role}</span>
  );
}
