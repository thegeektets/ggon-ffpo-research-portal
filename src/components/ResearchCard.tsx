'use client';

import Link from 'next/link';
import type { Locale, ResearchItem } from '@/types';

export function ResearchCard({ item, locale }: { item: ResearchItem; locale: Locale }) {
  return (
    <article className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition hover:border-emerald-300 hover:shadow-md">
      <div className="mb-2 flex flex-wrap gap-2 text-xs text-gray-500">
        <span className="rounded bg-emerald-50 px-2 py-0.5 text-emerald-800">{item.contentType}</span>
        <span>{item.year}</span>
        <span>{item.geographicScope}{item.country ? ` · ${item.country}` : ''}</span>
      </div>
      <h3 className="text-lg font-semibold text-gray-900">
        <Link href={`/library/${item.slug}`} className="hover:text-emerald-700">
          {item.title[locale]}
        </Link>
      </h3>
      <p className="mt-2 line-clamp-3 text-sm text-gray-600">{item.summary[locale]}</p>
      <p className="mt-3 text-xs text-gray-500">
        {item.authors.join(', ')} · {item.organization}
      </p>
      <div className="mt-3 flex flex-wrap gap-1">
        {item.tags.slice(0, 4).map((tag) => (
          <span key={tag} className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}
