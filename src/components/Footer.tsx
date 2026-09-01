import Link from 'next/link';

export function Footer() {
  return (
    <footer className="mt-auto border-t border-gray-200 bg-gray-50">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 text-sm text-gray-600 md:flex-row md:justify-between">
        <div>
          <p className="font-medium text-gray-900">Global Gas and Oil Network (GGON)</p>
          <p>Fossil Fuel Phase-Out (FFPO) Research Portal — prototype sample</p>
        </div>
        <div className="flex gap-4">
          <Link href="/about" className="hover:text-emerald-700">
            About
          </Link>
          <Link href="/ask-connect" className="hover:text-emerald-700">
            Contact
          </Link>
          <a href="https://www.dezari.co.ke" className="hover:text-emerald-700" target="_blank" rel="noreferrer">
            Built by Dezari Ventures
          </a>
        </div>
      </div>
    </footer>
  );
}
