'use client';

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { use } from 'react';
import { researchLibrary } from '@/data/research';
import { useApp } from '@/context/AppContext';

export default function ResearchDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { locale } = useApp();
  const item = researchLibrary.find((r) => r.slug === slug);
  if (!item) notFound();

  return (
    <article className="max-w-3xl space-y-6">
      <Link href="/library" className="text-sm text-emerald-700 hover:underline">
        ← Back to library
      </Link>
      <div className="flex flex-wrap gap-2 text-sm text-gray-500">
        <span>{item.contentType}</span>
        <span>·</span>
        <span>{item.year}</span>
        <span>·</span>
        <span>{item.category}</span>
      </div>
      <h1 className="text-3xl font-bold">{item.title[locale]}</h1>
      <p className="text-lg text-gray-700">{item.summary[locale]}</p>
      <dl className="grid gap-3 rounded-lg bg-gray-50 p-4 text-sm sm:grid-cols-2">
        <div>
          <dt className="font-medium text-gray-500">Authors</dt>
          <dd>{item.authors.join(', ')}</dd>
        </div>
        <div>
          <dt className="font-medium text-gray-500">Organization</dt>
          <dd>{item.organization}</dd>
        </div>
        <div>
          <dt className="font-medium text-gray-500">Geography</dt>
          <dd>
            {item.geographicScope}
            {item.country ? ` (${item.country})` : ''}
          </dd>
        </div>
        <div>
          <dt className="font-medium text-gray-500">Industry / chain</dt>
          <dd>
            {item.industrySide} · {item.petroleumChain}
          </dd>
        </div>
        <div className="sm:col-span-2">
          <dt className="font-medium text-gray-500">RWG priorities</dt>
          <dd>{item.rwgPriorities.join('; ')}</dd>
        </div>
      </dl>
      {item.url && (
        <a href={item.url} target="_blank" rel="noreferrer" className="inline-block text-emerald-700 hover:underline">
          View original resource →
        </a>
      )}
    </article>
  );
}
