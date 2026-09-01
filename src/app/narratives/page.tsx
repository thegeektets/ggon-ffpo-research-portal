import { researchLibrary } from '@/data/research';
import Link from 'next/link';

export default function NarrativesPage() {
  const narratives = researchLibrary.filter((r) => r.category.includes('Narratives'));

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Narratives</h1>
      <p className="max-w-2xl text-gray-600">
        Stories and messaging frameworks from the Comms Working Group — aimed at reaching deeper understanding and
        mobilizing audiences for the fossil fuel phase-out.
      </p>
      <div className="space-y-4">
        {narratives.map((item) => (
          <Link
            key={item.id}
            href={`/library/${item.slug}`}
            className="block rounded-xl border bg-white p-6 shadow-sm hover:border-emerald-400"
          >
            <h2 className="text-lg font-semibold">{item.title.en}</h2>
            <p className="mt-2 text-sm text-gray-600">{item.summary.en}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
