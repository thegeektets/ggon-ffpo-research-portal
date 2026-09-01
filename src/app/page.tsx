'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { researchLibrary } from '@/data/research';
import { useApp } from '@/context/AppContext';
import { wordCloudTags } from '@/lib/search';
import { accentAt } from '@/lib/theme-colors';

const themes = [
  { title: 'Finance', href: '/library?category=Finance', desc: 'Public finance, subsidies, and divestment' },
  {
    title: 'Just transition',
    href: '/library?category=Just+transition+pathways',
    desc: 'Workers, communities, and equitable phase-out',
  },
  {
    title: 'Policy & regulation',
    href: '/library?category=Policy+and+regulatory+updates',
    desc: 'National and international policy developments',
  },
  {
    title: 'Narratives',
    href: '/narratives',
    desc: 'Stories and messaging for the phase-out movement',
  },
  {
    title: 'Ecological impacts',
    href: '/library?category=Ecological+and+social+impacts',
    desc: 'Environmental and social consequences of extraction',
  },
  {
    title: 'Data & insights',
    href: '/library?category=Data+analysis+%26+strategic+insights',
    desc: 'Analysis, trackers, and strategic research',
  },
];

export default function HomePage() {
  const { tr } = useApp();
  const router = useRouter();
  const [q, setQ] = useState('');
  const cloud = wordCloudTags(researchLibrary);

  return (
    <div>
      <section className="ggon-hero-dark relative left-1/2 min-h-[520px] w-screen -translate-x-1/2 bg-[#1c1c1c]">
        <Image src="/hero.jpg" alt="" fill className="object-cover object-center opacity-60" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(26,107,122,0.35)] via-[rgba(28,28,28,0.55)] to-[rgba(28,28,28,0.75)]" />
        <div className="relative mx-auto flex max-w-3xl flex-col items-center px-4 pb-16 pt-28 text-center">
          <Image src="/ggon-logo.png" alt="Global Gas & Oil Network" width={320} height={70} className="mb-8 h-auto w-64 md:w-80" priority />
          <h1 className="ggon-label text-sm text-white/90 md:text-base">{tr('tagline')}</h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/80 md:text-base">
            A members-only hub consolidating research, analysis and narratives on the fossil fuel phase-out.
            Search with keywords and Boolean AND/OR operators.
          </p>
          <form
            className="mt-8 flex w-full max-w-lg flex-col gap-0 sm:flex-row"
            onSubmit={(e) => {
              e.preventDefault();
              router.push(`/library?q=${encodeURIComponent(q)}`);
            }}
          >
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={tr('searchPlaceholder')}
              className="ggon-input flex-1"
            />
            <button type="submit" className="ggon-btn ggon-btn-accent whitespace-nowrap">
              Search
            </button>
          </form>
          <p className="mt-3 text-xs text-white/60">
            Try: <code className="bg-black/30 px-1">africa AND finance</code> or{' '}
            <code className="bg-black/30 px-1">litigation OR legal</code>
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-12 px-4 py-12">
        <section>
          <h2 className="ggon-section-title ggon-label text-lg">{tr('wordCloud')}</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {cloud.map(({ tag, count }, i) => {
              const accent = accentAt(i);
              return (
                <Link
                  key={tag}
                  href={`/library?q=${encodeURIComponent(tag)}`}
                  className="px-3 py-1 text-sm font-medium transition hover:opacity-80"
                  style={{
                    fontSize: `${0.75 + count * 0.15}rem`,
                    backgroundColor: accent.bg,
                    color: accent.text,
                    borderLeft: `3px solid ${accent.border}`,
                  }}
                >
                  {tag}
                </Link>
              );
            })}
          </div>
        </section>

        <section>
          <h2 className="ggon-section-title ggon-label text-lg">{tr('featuredThemes')}</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {themes.map((theme, i) => {
              const accent = accentAt(i);
              return (
                <Link
                  key={theme.title}
                  href={theme.href}
                  className="border border-[#dcdcdc] bg-white p-5 transition hover:shadow-md"
                  style={{ borderLeftWidth: 4, borderLeftColor: accent.border }}
                >
                  <h3 className="ggon-label text-base" style={{ color: accent.text }}>
                    {theme.title}
                  </h3>
                  <p className="mt-2 text-sm">{theme.desc}</p>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="ggon-section-teal p-8">
          <h2 className="ggon-section-title ggon-label text-lg">{tr('membersOnly')}</h2>
          <p className="mt-3 max-w-2xl text-sm">
            Register to access the member directory, submit research, and use Ask & Connect. New registrations require
            admin approval.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/register" className="ggon-btn ggon-btn-teal inline-block">
              {tr('register')}
            </Link>
            <Link href="/library" className="ggon-btn ggon-btn-primary inline-block border border-[#1a6b7a]/30">
              {tr('viewLibrary')}
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
