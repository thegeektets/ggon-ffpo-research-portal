'use client';

import Link from 'next/link';
import { priorityThemes, resourceCountForTheme } from '@/data/priority-themes';
import { usePortalStore } from '@/lib/store';
import { accentAt } from '@/lib/theme-colors';

export default function ThemesPage() {
  const { researchLibrary } = usePortalStore();

  return (
    <div className="space-y-8">
      <div className="ggon-page-banner">
        <h1 className="text-2xl font-bold">Priority Themes</h1>
        <p className="mt-1">
          Curated summaries of key research areas — living documents updated quarterly by the Research Working Group.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {priorityThemes.map((theme, i) => {
          const accent = accentAt(i);
          const count = resourceCountForTheme(theme.category, researchLibrary);

          return (
            <Link
              key={theme.category}
              href={theme.href}
              className="group flex flex-col border border-[#dcdcdc] bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              style={{ borderTopWidth: 4, borderTopColor: accent.border }}
            >
              <h2 className="ggon-label text-lg transition group-hover:opacity-80" style={{ color: accent.text }}>
                {theme.title}
              </h2>
              <p className="mt-2 flex-1 text-sm">{theme.description}</p>
              <p className="mt-4 flex items-center justify-between text-xs font-medium" style={{ color: accent.text }}>
                <span>
                  {count} {count === 1 ? 'resource' : 'resources'}
                </span>
                <span className="ggon-label opacity-0 transition group-hover:opacity-100">View →</span>
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
