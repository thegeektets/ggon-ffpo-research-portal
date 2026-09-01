'use client';

import Image from 'next/image';
import Link from 'next/link';
import { articleImages as img } from '@/data/article-images';
import { priorityThemes } from '@/data/priority-themes';
import { researchLibrary } from '@/data/research';
import { useApp } from '@/context/AppContext';
import { locales } from '@/lib/i18n';
import { accentAt } from '@/lib/theme-colors';

const purposes = [
  {
    title: 'Centralise evidence',
    body: 'Bring research, policy briefs, case studies and trackers from across the GGON network into one searchable library.',
  },
  {
    title: 'Accelerate advocacy',
    body: 'Help campaigners and communicators find the right evidence, narratives and data — fast.',
  },
  {
    title: 'Reduce duplication',
    body: 'Stop member organisations repeating the same desk research. Share what already exists.',
  },
];

const features = [
  { title: 'Boolean search', body: 'Combine keywords with AND / OR to narrow large libraries quickly.' },
  { title: 'Rich metadata', body: 'Filter by geography, industry side, petroleum chain, RWG priorities and working groups.' },
  { title: 'Member workflow', body: 'Register, submit research, and connect with peers through Ask & Connect.' },
  { title: 'Reviewer roles', body: 'Editors and reviewers approve submissions before they appear in the public library.' },
  { title: 'Priority themes', body: 'Living summaries of key research areas, updated quarterly by the Research Working Group.' },
  { title: 'Multilingual UI', body: 'Interface available in English, French, Portuguese and Spanish.' },
];

const steps = [
  { step: '01', title: 'Discover', body: 'Search the library or browse priority themes and narratives.' },
  { step: '02', title: 'Filter', body: 'Narrow results by category, geography, content type and year.' },
  { step: '03', title: 'Read & cite', body: 'Open full articles with summaries, attachments and metadata for citation.' },
  { step: '04', title: 'Contribute', body: 'Members submit new research for reviewer approval and publication.' },
];

const techStack = ['Next.js', 'TypeScript', 'Tailwind CSS', 'Vercel'];

export default function AboutPage() {
  const { tr } = useApp();
  const publishedCount = researchLibrary.filter((r) => r.status === 'published').length;

  return (
    <div className="space-y-12">
      {/* Hero */}
      <section className="ggon-hero-dark relative min-h-[320px] overflow-hidden border border-[#dcdcdc] bg-[#1c1c1c]">
        <Image
          src={img.satellite}
          alt=""
          fill
          className="object-cover opacity-30"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a6b7a]/90 via-[#1c1c1c]/85 to-[#1c1c1c]/95" />
        <div className="relative grid gap-8 p-8 md:grid-cols-[1fr_auto] md:items-end md:p-12">
          <div>
            <p className="ggon-label text-sm text-[#7ec8d4]">Global Gas & Oil Network</p>
            <h1 className="mt-3 text-3xl font-bold leading-tight text-white md:text-4xl">
              About the FFPO Research Portal
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/85">
              A members hub consolidating research, analysis and narratives on the fossil fuel phase-out — built to help
              the network find evidence, share knowledge and strengthen collective advocacy.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-3 md:min-w-[320px]">
            {[
              { value: String(publishedCount), label: 'Resources' },
              { value: String(priorityThemes.length), label: 'Themes' },
              { value: String(locales.length), label: 'Languages' },
            ].map((stat) => (
                <div
                  key={stat.label}
                  className="border border-white/20 bg-white/10 px-4 py-3 text-center backdrop-blur-sm"
                >
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="ggon-label mt-1 text-xs text-white/70">{stat.label}</p>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Purpose */}
      <section>
        <h2 className="ggon-section-title ggon-label text-lg">Why this portal exists</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {purposes.map((item, i) => {
            const accent = accentAt(i);
            return (
              <div
                key={item.title}
                className="border border-[#dcdcdc] bg-white p-6"
                style={{ borderLeftWidth: 4, borderLeftColor: accent.border }}
              >
                <h3 className="ggon-label text-base" style={{ color: accent.text }}>
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed">{item.body}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* How it works */}
      <section className="ggon-section-teal p-8">
        <h2 className="ggon-section-title ggon-label text-lg">How it works</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((item, i) => {
            const accent = accentAt(i + 1);
            return (
              <div key={item.step} className="border border-[#dcdcdc] bg-white p-5">
                <p className="ggon-label text-2xl" style={{ color: accent.text }}>
                  {item.step}
                </p>
                <h3 className="mt-2 font-bold text-[#242424]">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed">{item.body}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Features */}
      <section>
        <h2 className="ggon-section-title ggon-label text-lg">What you can do here</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((item, i) => {
            const accent = accentAt(i);
            return (
              <div
                key={item.title}
                className="border border-[#dcdcdc] bg-[#fafafa] p-5 transition hover:bg-white hover:shadow-sm"
                style={{ borderTopWidth: 3, borderTopColor: accent.border }}
              >
                <h3 className="font-bold text-[#242424]">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed">{item.body}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Network + prototype */}
      <section className="grid gap-6 lg:grid-cols-2">
        <div className="border border-[#dcdcdc] bg-white p-6" style={{ borderLeftWidth: 4, borderLeftColor: '#2d6a4f' }}>
          <h2 className="ggon-section-title ggon-label text-lg">The network</h2>
          <p className="mt-4 text-sm leading-relaxed">
            The Global Gas and Oil Network (GGON) brings together organisations campaigning for a just and equitable
            fossil fuel phase-out. The Research Working Group curates priority themes, coordinates submissions, and
            maintains living summaries that reflect the state of evidence across the movement.
          </p>
          <p className="mt-4 text-sm leading-relaxed">
            This portal is designed for researchers, campaigners, communicators and member organisations who need
            reliable, citable evidence — not scattered Google Drive folders and email threads.
          </p>
        </div>

        <div className="border border-[#dcdcdc] bg-white p-6" style={{ borderLeftWidth: 4, borderLeftColor: '#c45c26' }}>
          <h2 className="ggon-section-title ggon-label text-lg">This prototype</h2>
          <p className="mt-4 text-sm leading-relaxed">
            Built by <strong className="text-[#242424]">Dezari Ventures Ltd</strong> as a working sample for the GGON
            FFPO Research Portal milestone demo. It demonstrates search, filters, registration, roles, submission workflow,
            and an admin dashboard using sample data.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {techStack.map((tech) => (
              <span key={tech} className="bg-[#e8f4f6] px-3 py-1 text-xs font-medium text-[#1a6b7a]">
                {tech}
              </span>
            ))}
          </div>
          <a
            href="https://www.dezari.co.ke"
            target="_blank"
            rel="noreferrer"
            className="ggon-link mt-5 inline-block text-sm font-medium hover:underline"
          >
            dezari.co.ke →
          </a>
        </div>
      </section>

      {/* CTAs */}
      <section className="ggon-hero-dark flex flex-col items-start justify-between gap-6 border border-[#dcdcdc] bg-gradient-to-r from-[#1a6b7a] to-[#2d6a4f] p-8 md:flex-row md:items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Ready to explore?</h2>
          <p className="mt-2 max-w-xl text-sm text-white/85">
            Browse the research library, explore priority themes, or register for member access.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/library" className="ggon-btn ggon-btn-primary inline-block border border-white/30">
            {tr('viewLibrary')}
          </Link>
          <Link href="/themes" className="ggon-btn inline-block bg-white/15 text-white hover:bg-white/25">
            {tr('themes')}
          </Link>
          <Link href="/register" className="ggon-btn ggon-btn-accent inline-block">
            {tr('register')}
          </Link>
        </div>
      </section>
    </div>
  );
}
