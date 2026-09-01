'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useMemo, useState } from 'react';
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

  const results = useMemo(() => searchResearch(researchLibrary, filters, locale), [filters, locale]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Research Library</h1>
        <p className="text-gray-600">Full-text and Boolean search with rich metadata filters.</p>
      </div>
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          value={filters.q ?? ''}
          onChange={(e) => setFilters({ ...filters, q: e.target.value })}
          placeholder="Keywords… use AND / OR"
          className="flex-1 rounded-lg border border-gray-300 px-4 py-2"
        />
      </div>
      <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
        <FilterPanel filters={filters} onChange={setFilters} />
        <div>
          <p className="mb-4 text-sm text-gray-500">{results.length} results</p>
          <div className="grid gap-4">
            {results.map((item) => (
              <ResearchCard key={item.id} item={item} locale={locale} />
            ))}
            {results.length === 0 && (
              <p className="rounded-lg border border-dashed border-gray-300 p-8 text-center text-gray-500">
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
