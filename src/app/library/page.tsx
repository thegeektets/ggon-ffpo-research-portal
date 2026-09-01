'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useMemo, useState } from 'react';
import { FilterPanel } from '@/components/FilterPanel';
import { ResearchCard } from '@/components/ResearchCard';
import { researchLibrary } from '@/data/research';
import { useApp } from '@/context/AppContext';
import { searchResearch } from '@/lib/search';
import type { SearchFilters } from '@/types';

function LibraryContent() {
  const params = useSearchParams();
  const { locale } = useApp();
  const [filters, setFilters] = useState<SearchFilters>({
    q: params.get('q') ?? undefined,
    category: params.get('category') ?? undefined,
  });

  useEffect(() => {
    setFilters({
      q: params.get('q') ?? undefined,
      category: params.get('category') ?? undefined,
    });
  }, [params]);

  const results = useMemo(() => searchResearch(researchLibrary, filters, locale), [filters, locale]);

  return (
    <div className="space-y-6">
      <div className="ggon-page-banner">
        <h1 className="text-2xl font-bold">Research Library</h1>
        <p className="mt-1">Full-text and Boolean search with rich metadata filters.</p>
      </div>
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          value={filters.q ?? ''}
          onChange={(e) => setFilters({ ...filters, q: e.target.value })}
          placeholder="Keywords… use AND / OR"
          className="ggon-input flex-1 border border-[#dcdcdc]"
        />
      </div>
      <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
        <FilterPanel filters={filters} onChange={setFilters} />
        <div>
          <p className="mb-4 text-sm font-medium text-[#1a6b7a]">{results.length} results</p>
          <div className="grid gap-4">
            {results.map((item) => (
              <ResearchCard key={item.id} item={item} locale={locale} />
            ))}
            {results.length === 0 && (
              <p className="border border-dashed border-[#1a6b7a]/40 bg-[#e8f4f6]/50 p-8 text-center">
                No research matches your search. Try broadening filters or using OR between terms.
              </p>
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
