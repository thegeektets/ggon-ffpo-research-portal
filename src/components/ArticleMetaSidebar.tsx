'use client';

import Link from 'next/link';
import type { ResearchItem } from '@/types';
import { accentAt, contentTypeAccentIndex } from '@/lib/theme-colors';

export function ArticleMetaSidebar({
  item,
  labels,
}: {
  item: ResearchItem;
  labels: {
    authors: string;
    organization: string;
    geography: string;
    industryChain: string;
    rwgPriorities: string;
    tags: string;
    workingGroups: string;
    subjects: string;
    browseCategory: string;
    articleDetails: string;
  };
}) {
  const accent = accentAt(contentTypeAccentIndex(item.contentType));

  return (
    <aside className="space-y-5 lg:sticky lg:top-6 lg:self-start">
      <div className="ggon-article-sidebar p-5" style={{ borderLeftColor: accent.border }}>
        <h2 className="ggon-label mb-4 text-sm">{labels.articleDetails}</h2>
        <dl className="space-y-4 text-sm">
          <div>
            <dt className="ggon-label text-xs text-[#7f7f7f]">{labels.authors}</dt>
            <dd className="mt-1 font-medium text-[#242424]">{item.authors.join(', ')}</dd>
          </div>
          <div>
            <dt className="ggon-label text-xs text-[#7f7f7f]">{labels.organization}</dt>
            <dd className="mt-1 text-[#242424]">{item.organization}</dd>
          </div>
          <div>
            <dt className="ggon-label text-xs text-[#7f7f7f]">{labels.geography}</dt>
            <dd className="mt-1 text-[#242424]">
              {item.geographicScope}
              {item.country ? ` · ${item.country}` : ''}
            </dd>
          </div>
          <div>
            <dt className="ggon-label text-xs text-[#7f7f7f]">{labels.industryChain}</dt>
            <dd className="mt-1 text-[#242424]">
              {item.industrySide} · {item.petroleumChain}
            </dd>
          </div>
          {item.workingGroups.length > 0 && (
            <div>
              <dt className="ggon-label text-xs text-[#7f7f7f]">{labels.workingGroups}</dt>
              <dd className="mt-1 text-[#242424]">{item.workingGroups.join(', ')}</dd>
            </div>
          )}
          {item.subjects.length > 0 && (
            <div>
              <dt className="ggon-label text-xs text-[#7f7f7f]">{labels.subjects}</dt>
              <dd className="mt-1 text-[#242424]">{item.subjects.join(', ')}</dd>
            </div>
          )}
        </dl>
      </div>

      {item.rwgPriorities.length > 0 && (
        <div className="border border-[#dcdcdc] bg-[#fafafa] p-5">
          <h2 className="ggon-section-title ggon-label mb-3 text-sm">{labels.rwgPriorities}</h2>
          <ul className="space-y-2 text-sm text-[#444]">
            {item.rwgPriorities.map((priority) => (
              <li key={priority} className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#1a6b7a]" aria-hidden />
                <span>{priority}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {item.tags.length > 0 && (
        <div className="border border-[#dcdcdc] bg-white p-5">
          <h2 className="ggon-section-title ggon-label mb-3 text-sm">{labels.tags}</h2>
          <div className="flex flex-wrap gap-2">
            {item.tags.map((tag, i) => {
              const tagAccent = accentAt(i + 1);
              return (
                <Link
                  key={tag}
                  href={`/library?q=${encodeURIComponent(tag)}`}
                  className="px-2 py-0.5 text-xs font-medium transition hover:opacity-80"
                  style={{ backgroundColor: tagAccent.bg, color: tagAccent.text }}
                >
                  {tag}
                </Link>
              );
            })}
          </div>
        </div>
      )}

      <Link
        href={`/library?category=${encodeURIComponent(item.category)}`}
        className="ggon-btn ggon-btn-teal block text-center text-sm"
      >
        {labels.browseCategory}
      </Link>
    </aside>
  );
}
