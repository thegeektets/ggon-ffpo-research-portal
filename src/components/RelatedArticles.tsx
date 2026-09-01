'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Locale, ResearchItem } from '@/types';
import { usePortalStore } from '@/lib/store';
import { accentAt, contentTypeAccentIndex } from '@/lib/theme-colors';

export function RelatedArticles({
  items,
  locale,
  title,
}: {
  items: ResearchItem[];
  locale: Locale;
  title: string;
}) {
  const { getRichArticle } = usePortalStore();
  if (items.length === 0) return null;

  return (
    <section className="ggon-section-teal mt-12 p-6 md:p-8">
      <h2 className="ggon-section-title ggon-label text-lg">{title}</h2>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {items.map((item, i) => {
          const accent = accentAt(contentTypeAccentIndex(item.contentType) + i);
          const cover = getRichArticle(item.slug)?.coverImage;
          return (
            <Link
              key={item.id}
              href={`/library/${item.slug}`}
              className="group flex overflow-hidden border border-[#dcdcdc] bg-white transition hover:shadow-md"
              style={{ borderLeftWidth: 4, borderLeftColor: accent.border }}
            >
              {cover && (
                <div className="relative hidden h-auto w-28 shrink-0 sm:block">
                  <Image src={cover} alt="" fill className="object-cover" sizes="112px" />
                </div>
              )}
              <div className="p-4">
                <p className="ggon-label text-xs" style={{ color: accent.text }}>
                  {item.contentType}
                </p>
                <h3 className="mt-1 font-bold text-[#242424] group-hover:text-[#1a6b7a]">{item.title[locale]}</h3>
                <p className="mt-2 line-clamp-2 text-sm">{item.summary[locale]}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
