'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Locale, ResearchItem } from '@/types';
import { usePortalStore } from '@/lib/store';
import { accentAt, contentTypeAccentIndex } from '@/lib/theme-colors';

export function ResearchCard({ item, locale }: { item: ResearchItem; locale: Locale }) {
  const accent = accentAt(contentTypeAccentIndex(item.contentType));
  const { getRichArticle } = usePortalStore();
  const coverImage = getRichArticle(item.slug)?.coverImage;

  return (
    <article
      className="overflow-hidden border border-[#dcdcdc] bg-white transition hover:shadow-md"
      style={{ borderLeftWidth: 4, borderLeftColor: accent.border }}
    >
      {coverImage && (
        <Link href={`/library/${item.slug}`} className="relative block h-40 w-full">
          <Image src={coverImage} alt="" fill className="object-cover" sizes="(max-width: 768px) 100vw, 400px" unoptimized={coverImage.startsWith('data:')} />
        </Link>
      )}
      <div className="p-5">
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
      </div>
    </article>
  );
}
