'use client';

import { useMemo, useState } from 'react';
import { filterOptions } from '@/data/research';
import type { SearchFilters } from '@/types';

interface Props {
  filters: SearchFilters;
  onChange: (filters: SearchFilters) => void;
  onClearAll: () => void;
}

export function FilterPanel({ filters, onChange, onClearAll }: Props) {
  const [expanded, setExpanded] = useState(false);

  const set = (key: keyof SearchFilters, value: string) => {
    onChange({ ...filters, [key]: value || undefined });
  };

  const activeCount = useMemo(
    () =>
      Object.entries(filters).filter(([key, value]) => key !== 'q' && value !== undefined && value !== '').length,
    [filters],
  );

  const fields: { key: keyof SearchFilters; label: string; options: string[] }[] = [
    { key: 'geographicScope', label: 'Geographic scope', options: filterOptions.geographicScope },
    { key: 'industrySide', label: 'Industry side', options: filterOptions.industrySide },
    { key: 'petroleumChain', label: 'Petroleum chain', options: filterOptions.petroleumChain },
    { key: 'category', label: 'Category', options: filterOptions.category },
    { key: 'contentType', label: 'Content type', options: filterOptions.contentType },
    { key: 'rwgPriority', label: 'RWG priority', options: filterOptions.rwgPriorities },
    { key: 'workingGroup', label: 'Working group', options: filterOptions.workingGroups },
    { key: 'year', label: 'Year', options: filterOptions.years.map(String) },
  ];

  const panel = (
    <aside className="space-y-4 border border-[#dcdcdc] border-t-4 border-t-[#1a6b7a] bg-[#f5fafb] p-4 lg:block">
      <h2 className="ggon-label text-sm">Filters</h2>
      {fields.map((field) => (
        <label key={field.key} className="block text-sm">
          <span className="mb-1 block text-gray-600">{field.label}</span>
          <select
            value={filters[field.key] ?? ''}
            onChange={(e) => set(field.key, e.target.value)}
            className="w-full rounded border border-gray-300 bg-white px-2 py-2 text-sm"
          >
            <option value="">All</option>
            {field.options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </label>
      ))}
      <button type="button" onClick={onClearAll} className="ggon-btn w-full !text-xs">
        View all articles
      </button>
    </aside>
  );

  return (
    <div className="min-w-0">
      <button
        type="button"
        onClick={() => setExpanded((open) => !open)}
        className="ggon-btn ggon-btn-teal mb-3 flex w-full items-center justify-between !py-3 !text-xs lg:hidden"
        aria-expanded={expanded}
      >
        <span>
          {expanded ? 'Hide filters' : 'Show filters'}
          {activeCount > 0 && ` (${activeCount} active)`}
        </span>
        <span aria-hidden>{expanded ? '−' : '+'}</span>
      </button>
      <div className={expanded ? 'block' : 'hidden lg:block'}>{panel}</div>
    </div>
  );
}
