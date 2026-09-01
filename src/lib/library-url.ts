import type { SearchFilters } from '@/types';

const FILTER_KEYS: (keyof SearchFilters)[] = [
  'q',
  'geographicScope',
  'industrySide',
  'petroleumChain',
  'category',
  'contentType',
  'year',
  'rwgPriority',
  'workingGroup',
];

export function filtersFromSearchParams(params: URLSearchParams): SearchFilters {
  const filters: SearchFilters = {};
  for (const key of FILTER_KEYS) {
    const value = params.get(key);
    if (value) filters[key] = value;
  }
  return filters;
}

export function searchParamsFromFilters(filters: SearchFilters): URLSearchParams {
  const params = new URLSearchParams();
  for (const key of FILTER_KEYS) {
    const value = filters[key];
    if (value) params.set(key, value);
  }
  return params;
}

export function hasActiveFilters(filters: SearchFilters): boolean {
  return FILTER_KEYS.some((key) => Boolean(filters[key]?.trim()));
}

export function libraryPathForFilters(filters: SearchFilters): string {
  const params = searchParamsFromFilters(filters);
  const qs = params.toString();
  return qs ? `/library?${qs}` : '/library';
}
