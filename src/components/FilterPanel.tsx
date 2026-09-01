'use client';

import { filterOptions } from '@/data/research';
import type { SearchFilters } from '@/types';

interface Props {
  filters: SearchFilters;
  onChange: (filters: SearchFilters) => void;
  onClearAll: () => void;
}

export function FilterPanel({ filters, onChange, onClearAll }: Props) {
  const set = (key: keyof SearchFilters, value: string) => {
    onChange({ ...filters, [key]: value || undefined });
  };

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

  return (
    <aside className="space-y-4 border border-[#dcdcdc] border-t-4 border-t-[#1a6b7a] bg-[#f5fafb] p-4">
      <h2 className="ggon-label text-sm">Filters</h2>
      {fields.map((field) => (
        <label key={field.key} className="block text-sm">
          <span className="mb-1 block text-gray-600">{field.label}</span>
          <select
            value={filters[field.key] ?? ''}
            onChange={(e) => set(field.key, e.target.value)}
            className="w-full rounded border border-gray-300 bg-white px-2 py-1.5 text-sm"
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
      <button
        type="button"
        onClick={onClearAll}
        className="ggon-btn w-full !text-xs"
      >
        View all articles
      </button>
    </aside>
  );
}
