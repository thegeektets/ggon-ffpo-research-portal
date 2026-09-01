import { researchLibrary } from '@/data/research';
import Link from 'next/link';
import { accentAt } from '@/lib/theme-colors';

export default function NarrativesPage() {
  const narratives = researchLibrary.filter((r) => r.category.includes('Narratives'));

  return (
    <div className="space-y-6">
      <div className="ggon-page-banner">
        <h1 className="text-2xl font-bold">Narratives</h1>
        <p className="mt-1 max-w-2xl">
          Stories and messaging frameworks from the Comms Working Group — aimed at reaching deeper understanding and
          mobilizing audiences for the fossil fuel phase-out.
        </p>
      </div>
      <div className="space-y-4">
        {narratives.map((item, i) => {
          const accent = accentAt(i + 2);
          return (
            <Link
              key={item.id}
              href={`/library/${item.slug}`}
              className="block border border-[#dcdcdc] bg-white p-6 transition hover:shadow-md"
              style={{ borderLeftWidth: 4, borderLeftColor: accent.border }}
            >
              <h2 className="text-lg font-semibold" style={{ color: accent.text }}>
                {item.title.en}
              </h2>
              <p className="mt-2 text-sm">{item.summary.en}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
