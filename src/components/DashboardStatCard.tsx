import Link from 'next/link';
import type { ReactNode } from 'react';

type DashboardStatCardProps = {
  value: number | string;
  label: string;
  icon: ReactNode;
  accent: { bg: string; text: string; border: string; solid: string };
  hint?: ReactNode;
  href?: string;
  hrefLabel?: string;
  featured?: boolean;
};

export function DashboardStatCard({
  value,
  label,
  icon,
  accent,
  hint,
  href,
  hrefLabel,
  featured,
}: DashboardStatCardProps) {
  return (
    <div
      className={`ggon-stat-card group relative overflow-hidden p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg ${
        featured ? 'ggon-stat-card-featured' : ''
      }`}
      style={
        featured
          ? {
              background: `linear-gradient(135deg, ${accent.bg} 0%, #fff 60%)`,
              borderColor: accent.border,
            }
          : undefined
      }
    >
      <div
        className="pointer-events-none absolute -right-4 -top-4 h-24 w-24 rounded-full opacity-20 transition-opacity group-hover:opacity-30"
        style={{ background: `radial-gradient(circle, ${accent.solid} 0%, transparent 70%)` }}
        aria-hidden
      />
      <div className="relative flex items-start justify-between gap-3">
        <div
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg shadow-sm"
          style={{ backgroundColor: accent.bg, color: accent.text }}
        >
          {icon}
        </div>
        <p className="ggon-label text-3xl leading-none" style={{ color: accent.solid }}>
          {value}
        </p>
      </div>
      <p className="relative mt-3 text-sm font-semibold text-[#242424]">{label}</p>
      {hint && <div className="relative mt-1 text-xs text-[#7f7f7f]">{hint}</div>}
      {href && hrefLabel && (
        <Link
          href={href}
          className="relative mt-2 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-widest transition-colors hover:underline"
          style={{ color: accent.text }}
        >
          {hrefLabel} →
        </Link>
      )}
    </div>
  );
}
