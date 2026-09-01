import { researchLibrary } from '@/data/research';
import { accentAt } from '@/lib/theme-colors';

const themeSummaries = [
  {
    title: 'Finance',
    body: 'Tracks public finance flows, subsidies, and divestment campaigns targeting fossil fuel expansion.',
  },
  {
    title: 'Just transition pathways',
    body: 'Research on worker retraining, social protection, and community-led transition planning.',
  },
  {
    title: 'Ecological and social impacts',
    body: 'Documentation of environmental harm and community impacts from oil and gas operations.',
  },
];

export default function ThemesPage() {
  return (
    <div className="space-y-8">
      <div className="ggon-page-banner">
        <h1 className="text-2xl font-bold">Priority Themes</h1>
        <p className="mt-1">
          Curated summaries of key research areas — living documents updated quarterly by the Research Working Group.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {themeSummaries.map((theme, i) => {
          const accent = accentAt(i);
          return (
            <div
              key={theme.title}
              className="border border-[#dcdcdc] bg-white p-6 shadow-sm"
              style={{ borderTopWidth: 4, borderTopColor: accent.border }}
            >
              <h2 className="ggon-label text-lg" style={{ color: accent.text }}>
                {theme.title}
              </h2>
              <p className="mt-2 text-sm">{theme.body}</p>
              <p className="mt-4 text-xs font-medium" style={{ color: accent.text }}>
                {researchLibrary.filter((r) => r.category.includes(theme.title.split(' ')[0])).length} resources
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
