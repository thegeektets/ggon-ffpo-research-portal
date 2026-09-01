import Link from 'next/link';

export function Footer() {
  return (
    <footer className="mt-auto border-t border-[#dcdcdc] bg-[#efefef]">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10 text-sm md:flex-row md:justify-between">
        <div>
          <p className="ggon-label text-sm">Global Gas and Oil Network (GGON)</p>
          <p className="mt-1">Fossil Fuel Phase-Out (FFPO) Research Portal — prototype sample</p>
        </div>
        <div className="flex flex-wrap gap-4 uppercase tracking-wide">
          <Link href="/about" className="ggon-link hover:underline">
            About
          </Link>
          <Link href="/ask-connect" className="ggon-link hover:underline">
            Contact
          </Link>
          <a href="https://www.dezari.co.ke" className="ggon-link hover:underline" target="_blank" rel="noreferrer">
            Built by Dezari Ventures
          </a>
        </div>
      </div>
    </footer>
  );
}
