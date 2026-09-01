'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useMemo, useState } from 'react';
import { FilterPanel } from '@/components/FilterPanel';
import { ResearchCard } from '@/components/ResearchCard';
import { researchLibrary } from '@/data/research';
import { useApp } from '@/context/AppContext';
import { filtersFromSearchParams, hasActiveFilters, libraryPathForFilters } from '@/lib/library-url';
import { searchResearch } from '@/lib/search';
import type { SearchFilters } from '@/types';

function LibraryContent() {
  const params = useSearchParams();
  const router = useRouter();
  const { locale, tr } = useApp();
  const [filters, setFilters] = useState<SearchFilters>(() => filtersFromSearchParams(params));

  useEffect(() => {
    setFilters(filtersFromSearchParams(params));
  }, [params]);

  const updateFilters = (next: SearchFilters) => {
    setFilters(next);
    router.replace(libraryPathForFilters(next), { scroll: false });
  };

  const clearAll = () => updateFilters({});

  const results = useMemo(() => searchResearch(researchLibrary, filters, locale), [filters, locale]);
  const filtered = hasActiveFilters(filters);

  return (
    <div className="space-y-6">
      <div className="ggon-page-banner">
        <h1 className="text-2xl font-bold">Research Library</h1>
        <p className="mt-1">Full-text and Boolean search with rich metadata filters.</p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          value={filters.q ?? ''}
          onChange={(e) => updateFilters({ ...filters, q: e.target.value || undefined })}
          placeholder="Keywords… use AND / OR"
          className="ggon-input flex-1 border border-[#dcdcdc]"
        />
        {filtered && (
          <button type="button" onClick={clearAll} className="ggon-btn ggon-btn-teal shrink-0 whitespace-nowrap">
            {tr('viewAllArticles')}
          </button>
        )}
      </div>

      {filtered && (
        <div className="flex flex-wrap items-center gap-2 border border-[#d4e8ec] bg-[#f5fafb] px-4 py-3 text-sm">
          <span className="text-[#444]">
            {tr('showingFiltered')}{' '}
            <strong className="text-[#1a6b7a]">{results.length}</strong>
          </span>
          {filters.q && (
            <span className="bg-white px-2 py-0.5 text-xs text-[#1a6b7a]">
              &ldquo;{filters.q}&rdquo;
            </span>
          )}
          {filters.category && (
            <span className="bg-white px-2 py-0.5 text-xs text-[#1a6b7a]">{filters.category}</span>
          )}
          <button type="button" onClick={clearAll} className="ggon-link ml-auto text-xs font-medium hover:underline">
            {tr('clearSearchAndFilters')} →
          </button>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
        <FilterPanel filters={filters} onChange={updateFilters} onClearAll={clearAll} />
        <div>
          <p className="mb-4 text-sm font-medium text-[#1a6b7a]">
            {results.length} {results.length === 1 ? 'result' : 'results'}
            {!filtered && ` · ${researchLibrary.length} total`}
          </p>
          <div className="grid gap-4">
            {results.map((item) => (
              <ResearchCard key={item.id} item={item} locale={locale} />
            ))}
            {results.length === 0 && (
              <div className="border border-dashed border-[#1a6b7a]/40 bg-[#e8f4f6]/50 p-8 text-center">
                <p>No research matches your search. Try broadening filters or using OR between terms.</p>
                <button type="button" onClick={clearAll} className="ggon-btn ggon-btn-teal mt-4">
                  {tr('viewAllArticles')}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LibraryPage() {
  return (
    <Suspense fallback={<p>Loading library…</p>}>
      <LibraryContent />
    </Suspense>
  );
}
