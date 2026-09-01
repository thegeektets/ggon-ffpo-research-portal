import { researchLibrary } from '@/data/research';

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
      <h1 className="text-2xl font-bold">Priority Themes</h1>
      <p className="text-gray-600">
        Curated summaries of key research areas — living documents updated quarterly by the Research Working Group.
      </p>
      <div className="grid gap-6 md:grid-cols-3">
        {themeSummaries.map((theme) => (
          <div key={theme.title} className="rounded-xl border bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-emerald-800">{theme.title}</h2>
            <p className="mt-2 text-sm text-gray-600">{theme.body}</p>
            <p className="mt-4 text-xs text-gray-500">
              {researchLibrary.filter((r) => r.category.includes(theme.title.split(' ')[0])).length} resources
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
