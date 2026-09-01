import type { Locale, ResearchItem, SearchFilters } from '@/types';

function tokenizeQuery(q: string): { terms: string[]; operator: 'AND' | 'OR' } {
  const upper = q.toUpperCase();
  if (upper.includes(' OR ')) {
    return { terms: q.split(/\s+OR\s+/i).map((t) => t.trim()).filter(Boolean), operator: 'OR' };
  }
  return { terms: q.split(/\s+AND\s+/i).map((t) => t.trim()).filter(Boolean), operator: 'AND' };
}

function matchesTerm(item: ResearchItem, term: string, locale: Locale): boolean {
  const haystack = [
    item.title[locale],
    item.summary[locale],
    ...item.authors,
    item.organization,
    ...item.tags,
    ...item.subjects,
    ...item.rwgPriorities,
    ...item.workingGroups,
    item.country ?? '',
  ]
    .join(' ')
    .toLowerCase();
  return haystack.includes(term.toLowerCase());
}

export function searchResearch(
  items: ResearchItem[],
  filters: SearchFilters,
  locale: Locale = 'en',
): ResearchItem[] {
  let results = items.filter((i) => i.status === 'published');

  if (filters.q?.trim()) {
    const { terms, operator } = tokenizeQuery(filters.q.trim());
    results = results.filter((item) => {
      const checks = terms.map((term) => matchesTerm(item, term, locale));
      return operator === 'OR' ? checks.some(Boolean) : checks.every(Boolean);
    });
  }

  if (filters.geographicScope) {
    results = results.filter((i) => i.geographicScope === filters.geographicScope);
  }
  if (filters.industrySide) {
    results = results.filter((i) => i.industrySide === filters.industrySide);
  }
  if (filters.petroleumChain) {
    results = results.filter((i) => i.petroleumChain === filters.petroleumChain);
  }
  if (filters.category) {
    results = results.filter((i) => i.category === filters.category);
  }
  if (filters.contentType) {
    results = results.filter((i) => i.contentType === filters.contentType);
  }
  if (filters.year) {
    results = results.filter((i) => String(i.year) === filters.year);
  }
  if (filters.rwgPriority) {
    results = results.filter((i) => i.rwgPriorities.includes(filters.rwgPriority!));
  }
  if (filters.workingGroup) {
    results = results.filter((i) => i.workingGroups.includes(filters.workingGroup!));
  }

  return results.sort((a, b) => b.year - a.year);
}

export function wordCloudTags(items: ResearchItem[]): { tag: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const item of items) {
    for (const tag of item.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 12);
}
