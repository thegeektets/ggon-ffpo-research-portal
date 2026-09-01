'use client';

import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { use } from 'react';
import { ArticleAttachments } from '@/components/ArticleAttachments';
import { ArticleBody } from '@/components/ArticleBody';
import { ArticleMetaSidebar } from '@/components/ArticleMetaSidebar';
import { RelatedArticles } from '@/components/RelatedArticles';
import { usePortalStore } from '@/lib/store';
import { useApp } from '@/context/AppContext';
import { accentAt, contentTypeAccentIndex } from '@/lib/theme-colors';

export default function ResearchDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { locale, tr } = useApp();
  const { researchLibrary, getRichArticle } = usePortalStore();
  const item = researchLibrary.find((r) => r.slug === slug);
  if (!item) notFound();

  const richContent = getRichArticle(slug);
  const accent = accentAt(contentTypeAccentIndex(item.contentType));
  const related = researchLibrary
    .filter((r) => r.slug !== slug && r.status === 'published')
    .filter((r) => r.category === item.category || r.contentType === item.contentType)
    .slice(0, 2);

  const sidebarLabels = {
    authors: tr('authors'),
    organization: tr('organization'),
    geography: tr('geography'),
    industryChain: tr('industryChain'),
    rwgPriorities: tr('rwgPriorities'),
    tags: tr('tags'),
    workingGroups: tr('workingGroups'),
    subjects: tr('subjects'),
    browseCategory: tr('browseCategory'),
    articleDetails: tr('articleDetails'),
  };

  return (
    <div>
      {/* Hero */}
      <header className="ggon-article-hero">
        {richContent ? (
          <>
            <Image
              src={richContent.coverImage}
              alt=""
              fill
              className="object-cover opacity-50"
            sizes="100vw"
            priority
            unoptimized={richContent.coverImage.startsWith('data:')}
          />
            <div className="ggon-article-hero-overlay absolute inset-0" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a6b7a] via-[#2d6a4f] to-[#1c1c1c]" />
        )}
        <div className="relative mx-auto flex min-h-[360px] max-w-6xl flex-col justify-end px-4 pb-10 pt-24">
          <Link
            href="/library"
            className="mb-6 inline-flex w-fit items-center gap-1 text-sm text-white/80 transition hover:text-white"
          >
            ← {tr('backToLibrary')}
          </Link>
          <div className="flex flex-wrap gap-2">
            <span
              className="ggon-label px-3 py-1 text-xs text-white"
              style={{ backgroundColor: accent.solid }}
            >
              {item.contentType}
            </span>
            <span className="ggon-label border border-white/30 bg-white/10 px-3 py-1 text-xs text-white">
              {item.year}
            </span>
            <span className="ggon-label border border-white/30 bg-white/10 px-3 py-1 text-xs text-white">
              {item.geographicScope}
              {item.country ? ` · ${item.country}` : ''}
            </span>
          </div>
          <h1 className="mt-4 max-w-4xl text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
            {item.title[locale]}
          </h1>
          <p className="mt-4 max-w-2xl text-sm text-white/85 md:text-base">
            {item.authors.join(', ')} · {item.organization}
          </p>
        </div>
      </header>

      {/* Content */}
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
          <div className="min-w-0 space-y-8">
            <div className="ggon-article-lead">
              <p className="ggon-label mb-2 text-xs text-[#1a6b7a]">{tr('summary')}</p>
              <p className="text-lg font-medium leading-relaxed text-[#333]">{item.summary[locale]}</p>
            </div>

            {richContent && <ArticleBody sections={richContent.body} locale={locale} />}

            {richContent && richContent.attachments.length > 0 && (
              <ArticleAttachments
                attachments={richContent.attachments}
                locale={locale}
                title={tr('downloads')}
                downloadLabel={tr('download')}
              />
            )}

            {item.url && (
              <div className="flex flex-wrap gap-3 border-t border-[#e0e0e0] pt-8">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="ggon-btn ggon-btn-accent inline-block"
                >
                  {tr('viewOriginal')} →
                </a>
                <Link href="/library" className="ggon-btn ggon-btn-primary inline-block border border-[#dcdcdc]">
                  {tr('backToLibrary')}
                </Link>
              </div>
            )}
          </div>

          <ArticleMetaSidebar item={item} labels={sidebarLabels} />
        </div>

        <RelatedArticles items={related} locale={locale} title={tr('relatedReading')} />
      </div>
    </div>
  );
}
