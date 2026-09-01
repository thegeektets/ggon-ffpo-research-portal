import Link from 'next/link';

export function Footer() {
  return (
    <footer className="mt-auto border-t-4 border-[#1a6b7a] bg-[#1c2b2e] text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10 text-sm md:flex-row md:justify-between">
        <div>
          <p className="ggon-label text-sm text-white">Global Gas and Oil Network (GGON)</p>
          <p className="mt-1 text-white/70">Fossil Fuel Phase-Out (FFPO) Research Portal — prototype sample</p>
        </div>
        <div className="flex flex-wrap gap-4 uppercase tracking-wide">
          <Link href="/about" className="text-white/80 hover:text-[#7ec8d4]">
            About
          </Link>
          <Link href="/ask-connect" className="text-white/80 hover:text-[#7ec8d4]">
            Contact
          </Link>
          <a
            href="https://www.dezari.co.ke"
            className="text-white/80 hover:text-[#7ec8d4]"
            target="_blank"
            rel="noreferrer"
          >
            Built by Dezari Ventures
          </a>
        </div>
      </div>
    </footer>
  );
}
