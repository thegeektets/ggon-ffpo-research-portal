'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { researchLibrary } from '@/data/research';
import { useApp } from '@/context/AppContext';
import { wordCloudTags } from '@/lib/search';

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
  const { tr, locale } = useApp();
  const router = useRouter();
  const [q, setQ] = useState('');
  const cloud = wordCloudTags(researchLibrary);

  return (
    <div className="space-y-10">
      <section className="rounded-2xl bg-gradient-to-br from-emerald-900 to-emerald-700 px-6 py-12 text-white md:px-10">
        <p className="text-sm uppercase tracking-widest text-emerald-200">Global Gas and Oil Network</p>
        <h1 className="mt-2 max-w-2xl text-3xl font-bold md:text-4xl">{tr('tagline')}</h1>
        <p className="mt-4 max-w-xl text-emerald-100">
          A members-only hub consolidating research, analysis and narratives on the fossil fuel phase-out.
          Search with keywords and Boolean AND/OR operators.
        </p>
        <form
          className="mt-6 flex max-w-2xl flex-col gap-2 sm:flex-row"
          onSubmit={(e) => {
            e.preventDefault();
            router.push(`/library?q=${encodeURIComponent(q)}`);
          }}
        >
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={tr('searchPlaceholder')}
            className="flex-1 rounded-lg border-0 px-4 py-3 text-gray-900 shadow"
          />
          <button type="submit" className="rounded-lg bg-amber-400 px-6 py-3 font-semibold text-emerald-950">
            Search
          </button>
        </form>
        <p className="mt-2 text-xs text-emerald-200">
          Try: <code className="rounded bg-emerald-800 px-1">africa AND finance</code> or{' '}
          <code className="rounded bg-emerald-800 px-1">litigation OR legal</code>
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">{tr('wordCloud')}</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {cloud.map(({ tag, count }) => (
            <Link
              key={tag}
              href={`/library?q=${encodeURIComponent(tag)}`}
              className="rounded-full bg-white px-3 py-1 text-sm shadow-sm ring-1 ring-gray-200 hover:ring-emerald-400"
              style={{ fontSize: `${0.75 + count * 0.15}rem` }}
            >
              {tag}
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold">{tr('featuredThemes')}</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {themes.map((theme) => (
            <Link
              key={theme.title}
              href={theme.href}
              className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm hover:border-emerald-400"
            >
              <h3 className="font-semibold text-emerald-800">{theme.title}</h3>
              <p className="mt-1 text-sm text-gray-600">{theme.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="rounded-xl border border-amber-200 bg-amber-50 p-6">
        <h2 className="font-semibold text-amber-900">{tr('membersOnly')}</h2>
        <p className="mt-2 text-sm text-amber-800">
          Register to access the member directory, submit research, and use Ask & Connect. New registrations require
          admin approval.
        </p>
        <div className="mt-4 flex gap-3">
          <Link href="/register" className="rounded bg-emerald-700 px-4 py-2 text-sm font-medium text-white">
            {tr('register')}
          </Link>
          <Link href="/library" className="rounded border border-emerald-700 px-4 py-2 text-sm text-emerald-800">
            {tr('viewLibrary')}
          </Link>
        </div>
      </section>
    </div>
  );
}
