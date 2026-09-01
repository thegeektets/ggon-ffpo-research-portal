'use client';

import Link from 'next/link';
import type { Locale, ResearchItem } from '@/types';
import { accentAt, contentTypeAccentIndex } from '@/lib/theme-colors';

export function ResearchCard({ item, locale }: { item: ResearchItem; locale: Locale }) {
  const accent = accentAt(contentTypeAccentIndex(item.contentType));

  return (
    <article
      className="border border-[#dcdcdc] bg-white p-5 transition hover:shadow-md"
      style={{ borderLeftWidth: 4, borderLeftColor: accent.border }}
    >
      <div className="mb-2 flex flex-wrap gap-2 text-xs">
        <span
          className="px-2 py-0.5 font-bold uppercase tracking-wide"
          style={{ backgroundColor: accent.bg, color: accent.text }}
        >
          {item.contentType}
        </span>
        <span>{item.year}</span>
        <span>
          {item.geographicScope}
          {item.country ? ` · ${item.country}` : ''}
        </span>
      </div>
      <h3 className="text-lg font-bold text-[#242424]">
        <Link href={`/library/${item.slug}`} className="ggon-link hover:underline">
          {item.title[locale]}
        </Link>
      </h3>
      <p className="mt-2 line-clamp-3 text-sm">{item.summary[locale]}</p>
      <p className="mt-3 text-xs">
        {item.authors.join(', ')} · {item.organization}
      </p>
      <div className="mt-3 flex flex-wrap gap-1">
        {item.tags.slice(0, 4).map((tag, i) => {
          const tagAccent = accentAt(i + 1);
          return (
            <span
              key={tag}
              className="px-2 py-0.5 text-xs"
              style={{ backgroundColor: tagAccent.bg, color: tagAccent.text }}
            >
              {tag}
            </span>
          );
        })}
      </div>
    </article>
  );
}
